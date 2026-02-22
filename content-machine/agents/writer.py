#!/usr/bin/env python3
"""Writer Agent — gera roteiros de Reels via Claude API."""

from __future__ import annotations

import argparse
import json
import re
import sys
import tomllib
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

from lib.claude_client import ClaudeClient
from lib.logger import setup_logger
from lib.models import RankedTheme, ReelsScript

log = setup_logger("writer")


def _slugify(text: str) -> str:
    import unicodedata

    text = unicodedata.normalize("NFKD", text.lower())
    text = "".join(c for c in text if not unicodedata.combining(c))
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")[:60]


def _script_to_markdown(script: ReelsScript, theme: RankedTheme, sources: list[str] | None = None) -> str:
    hashtags_str = " ".join(script.hashtags) if script.hashtags else ""
    sources_str = ""
    if sources:
        sources_lines = "\n".join(f"- {url}" for url in sources)
        sources_str = f"\n\n---\n\n## Fontes\n{sources_lines}"

    return f"""---
title: "{script.title}"
theme_id: "{script.theme_id}"
week: {theme.theme.week_number}
year: {theme.theme.year}
relevance_score: {theme.relevance_score}
emotion: "{theme.target_emotion}"
angle: "{theme.editorial_angle}"
duration_estimate: "{script.estimated_duration_seconds}s"
generated_at: "{script.generated_at.isoformat()}"
---

{script.full_teleprompter}

---
{hashtags_str}{sources_str}
"""


def run(input_path: str, output_dir: str | None = None) -> list[dict]:
    config_path = Path(__file__).resolve().parent.parent / "pipeline.toml"
    with open(config_path, "rb") as f:
        config = tomllib.load(f)

    writer_cfg = config["agents"]["writer"]
    client = ClaudeClient(
        model=writer_cfg.get("model", "claude-sonnet-4-20250514"),
        temperature=writer_cfg.get("temperature", 0.7),
        max_tokens=writer_cfg.get("max_tokens", 1500),
    )

    with open(input_path) as f:
        ranked_raw = json.load(f)

    # O input pode vir do auditor (com campo "sources") ou do strategist
    themes: list[RankedTheme] = []
    sources_map: dict[int, list[str]] = {}
    for i, item in enumerate(ranked_raw):
        sources_map[i] = item.pop("sources", [])
        item.pop("audit", None)  # Remover dados de auditoria do model
        themes.append(RankedTheme(**item))

    log.info(f"Gerando roteiros para {len(themes)} temas")

    # Definir diretorio de output
    now = datetime.now(timezone.utc)
    week_num = now.isocalendar()[1]
    year = now.year

    if output_dir:
        # output_dir do orchestrator já inclui year/semana-XX
        week_dir = Path(output_dir)
    else:
        base_dir = Path(__file__).resolve().parent.parent / "output" / "reels"
        week_dir = base_dir / str(year) / f"semana-{week_num:02d}"
    week_dir.mkdir(parents=True, exist_ok=True)

    scripts: list[ReelsScript] = []
    produced_meta: list[dict] = []

    for i, theme in enumerate(themes):
        log.info(f"Gerando: {theme.theme.title}")
        sources = sources_map.get(i, [])
        try:
            script = client.generate_script(theme)
            scripts.append(script)

            # Salvar markdown com fontes
            slug = _slugify(theme.theme.title)
            md_path = week_dir / f"{slug}.md"
            md_path.write_text(_script_to_markdown(script, theme, sources), encoding="utf-8")
            log.info(f"  -> Salvo: {md_path} ({len(sources)} fontes)")

            # Metadata para registro no curator
            produced_meta.append({
                "id": script.theme_id or None,
                "title": theme.theme.title,
                "angle": theme.editorial_angle,
                "source_trend": theme.theme.source_trend,
                "status": "produced",
                "relevance_score": theme.relevance_score,
                "week_number": week_num,
                "year": year,
                "script_path": str(md_path),
                "produced_at": now.isoformat(),
            })

        except Exception as e:
            log.error(f"  -> Erro ao gerar roteiro: {e}")
            continue

    # Gerar resumo semanal
    _generate_weekly_summary(week_dir, themes, scripts)

    # Salvar metadata para o curator registrar
    meta_path = week_dir / "_produced_meta.json"
    with open(meta_path, "w") as f:
        json.dump(produced_meta, f, ensure_ascii=False, indent=2)

    log.info(f"Pipeline Writer concluido: {len(scripts)}/{len(themes)} roteiros gerados")
    print(json.dumps(produced_meta, ensure_ascii=False, indent=2))

    return produced_meta


def _generate_weekly_summary(
    week_dir: Path,
    themes: list[RankedTheme],
    scripts: list[ReelsScript],
) -> None:
    now = datetime.now(timezone.utc)
    lines = [
        f"# Resumo Semanal — Semana {now.isocalendar()[1]}/{now.year}",
        f"",
        f"**Gerado em:** {now.strftime('%d/%m/%Y %H:%M')} UTC",
        f"**Roteiros produzidos:** {len(scripts)}/{len(themes)}",
        f"",
        f"## Temas",
        f"",
    ]

    for i, theme in enumerate(themes, 1):
        slug = _slugify(theme.theme.title)
        score = theme.relevance_score
        lines.append(f"{i}. **{theme.theme.title}** (score: {score:.2f})")
        lines.append(f"   - Angulo: {theme.editorial_angle}")
        lines.append(f"   - Emocao: {theme.target_emotion}")
        lines.append(f"   - Arquivo: [{slug}.md](./{slug}.md)")
        lines.append("")

    (week_dir / "RESUMO.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Writer Agent - Script Generation")
    parser.add_argument("--input", required=True)
    parser.add_argument("--output-dir")
    args = parser.parse_args()
    run(args.input, args.output_dir)


if __name__ == "__main__":
    main()
