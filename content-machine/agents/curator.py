#!/usr/bin/env python3
"""Curator Agent — banco de temas e checagem de duplicatas."""

from __future__ import annotations

import argparse
import json
import sys
import tomllib
from difflib import SequenceMatcher
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

from lib.logger import setup_logger
from lib.models import ThemeRecord, TrendItem
from lib.sqlite_fallback import SQLiteStore

log = setup_logger("curator")


def load_config() -> dict:
    config_path = Path(__file__).resolve().parent.parent / "pipeline.toml"
    with open(config_path, "rb") as f:
        return tomllib.load(f)


def _normalize(text: str) -> str:
    """Normaliza texto para comparacao."""
    import unicodedata

    text = text.lower().strip()
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    return text


def _is_similar(a: str, b: str, threshold: float) -> bool:
    return SequenceMatcher(None, _normalize(a), _normalize(b)).ratio() >= threshold


def _get_stores(config: dict):
    """Retorna (supabase_store | None, sqlite_store)."""
    curator_cfg = config["agents"]["curator"]
    sqlite_path = str(Path(__file__).resolve().parent.parent / curator_cfg["sqlite_path"])
    sqlite = SQLiteStore(sqlite_path)

    supabase = None
    try:
        from lib.supabase_client import SupabaseStore

        supabase = SupabaseStore()
        log.info("Supabase conectado")
    except Exception as e:
        log.warning(f"Supabase indisponivel, usando SQLite: {e}")

    return supabase, sqlite


def validate(input_path: str, output_path: str | None = None) -> list[dict]:
    """Filtra trends removendo duplicatas do banco."""
    config = load_config()
    threshold = config["agents"]["curator"].get("dedup_similarity_threshold", 0.80)

    with open(input_path) as f:
        trends_raw = json.load(f)

    trends = [TrendItem(**t) for t in trends_raw]
    supabase, sqlite = _get_stores(config)

    # Coletar titulos existentes
    existing_titles: list[str] = sqlite.get_all_titles()
    if supabase:
        try:
            existing_titles.extend(supabase.get_all_titles())
        except Exception as e:
            log.warning(f"Erro ao buscar titulos do Supabase: {e}")

    existing_titles = list(set(existing_titles))
    log.info(f"Base de comparacao: {len(existing_titles)} temas existentes")

    # Filtrar duplicatas
    validated: list[TrendItem] = []
    for trend in trends:
        is_dup = any(_is_similar(trend.title, t, threshold) for t in existing_titles)
        if is_dup:
            log.info(f"  DUPLICATA: {trend.title}")
        else:
            validated.append(trend)

    log.info(f"Validacao: {len(trends)} -> {len(validated)} trends originais")

    result = [t.model_dump(mode="json") for t in validated]

    if output_path:
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, "w") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
    else:
        print(json.dumps(result, ensure_ascii=False, indent=2))

    sqlite.close()
    return result


def register(input_path: str) -> None:
    """Registra temas produzidos no banco."""
    config = load_config()
    supabase, sqlite = _get_stores(config)

    with open(input_path) as f:
        themes_raw = json.load(f)

    for item in themes_raw:
        theme = ThemeRecord(**item)
        sqlite.insert_theme(theme)
        if supabase:
            try:
                if theme.id:
                    supabase.mark_produced(theme.id, theme.script_path or "")
                else:
                    supabase.insert_theme(theme)
            except Exception as e:
                log.warning(f"Erro ao registrar no Supabase: {e}")

        log.info(f"Registrado: {theme.title}")

    sqlite.close()
    log.info(f"{len(themes_raw)} temas registrados")


def main() -> None:
    parser = argparse.ArgumentParser(description="Curator Agent - Dedup & Registry")
    sub = parser.add_subparsers(dest="command", required=True)

    val = sub.add_parser("validate")
    val.add_argument("--input", required=True)
    val.add_argument("--output")

    reg = sub.add_parser("register")
    reg.add_argument("--input", required=True)

    args = parser.parse_args()

    if args.command == "validate":
        validate(args.input, args.output)
    elif args.command == "register":
        register(args.input)


if __name__ == "__main__":
    main()
