#!/usr/bin/env python3
"""Strategist Agent — rankeia temas por relevancia pro avatar."""

from __future__ import annotations

import argparse
import json
import sys
import tomllib
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

from lib.logger import setup_logger
from lib.models import RankedTheme, ThemeRecord, TrendItem

log = setup_logger("strategist")

# Palavras-chave por dimensao de scoring
FEAR_KEYWORDS = [
    "fiscalizacao", "multa", "penalidade", "desenquadramento", "malha fina",
    "receita federal", "auditoria", "notificacao", "irregular", "divida",
    "debito", "cobranca", "bloqueio", "cnpj cancelado", "exclusao",
]

GAP_KEYWORDS = [
    "regra", "obrigacao", "prazo", "declaracao", "dasn", "das",
    "limite", "faturamento", "nota fiscal", "alvara", "mei", "simples",
    "tributacao", "imposto", "contribuicao", "inss", "contabilidade",
]

URGENCY_KEYWORDS = [
    "prazo", "vence", "ate dia", "ultimo dia", "nova lei", "mudanca",
    "2026", "2025", "aprovado", "sancionado", "vigencia", "obrigatorio",
    "a partir de", "entra em vigor",
]

ENGAGEMENT_KEYWORDS = [
    "ninguem conta", "pouca gente sabe", "segredo", "erro", "mito",
    "verdade", "cuidado", "atencao", "surpresa", "chocante", "gratuito",
    "economia", "dinheiro", "perder", "ganhar",
]


def _normalize(text: str) -> str:
    import unicodedata

    text = text.lower()
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    return text


def _keyword_score(text: str, keywords: list[str]) -> float:
    normalized = _normalize(text)
    matches = sum(1 for kw in keywords if kw in normalized)
    return min(matches / max(len(keywords) * 0.15, 1), 1.0)


def score_trend(trend: TrendItem, avatar: dict) -> float:
    """Score composto 0-1 por relevancia ao avatar."""
    text = f"{trend.title} {trend.summary}"

    fear_score = _keyword_score(text, FEAR_KEYWORDS)
    gap_score = _keyword_score(text, GAP_KEYWORDS)
    urgency_score = _keyword_score(text, URGENCY_KEYWORDS)
    engagement_score = _keyword_score(text, ENGAGEMENT_KEYWORDS)

    # Pesos conforme plano
    composite = (
        fear_score * 0.30
        + gap_score * 0.25
        + urgency_score * 0.20
        + engagement_score * 0.15
        + 0.10  # unicidade base (sem historico nesta fase)
    )
    return round(min(composite, 1.0), 3)


def _pick_emotion(trend: TrendItem) -> str:
    text = _normalize(f"{trend.title} {trend.summary}")
    if any(kw in text for kw in ["multa", "penalidade", "fiscalizacao", "irregular"]):
        return "medo"
    if any(kw in text for kw in ["ninguem conta", "segredo", "mito", "surpresa"]):
        return "surpresa"
    if any(kw in text for kw in ["prazo", "vence", "ultimo dia", "obrigatorio"]):
        return "urgencia"
    return "curiosidade"


def _generate_hook(trend: TrendItem, emotion: str) -> str:
    title = trend.title
    if emotion == "medo":
        return f"Voce pode estar em PERIGO com a Receita por causa disso: {title}"
    elif emotion == "surpresa":
        return f"Aposto que voce nao sabia disso sobre {title}"
    elif emotion == "urgencia":
        return f"ATENCAO MEI: o prazo esta acabando — {title}"
    return f"Isso pode mudar a vida do seu MEI: {title}"


def run(input_path: str, output_path: str | None = None) -> list[dict]:
    config_path = Path(__file__).resolve().parent.parent / "pipeline.toml"
    with open(config_path, "rb") as f:
        config = tomllib.load(f)

    strat_cfg = config["agents"]["strategist"]
    avatar = strat_cfg["avatar"]
    max_themes = strat_cfg.get("themes_per_week", 5)
    min_score = strat_cfg.get("min_relevance_score", 0.6)

    with open(input_path) as f:
        trends_raw = json.load(f)

    trends = [TrendItem(**t) for t in trends_raw]
    log.info(f"Recebidas {len(trends)} trends para ranking")

    # Score e rankear
    scored: list[tuple[TrendItem, float]] = []
    for trend in trends:
        s = score_trend(trend, avatar)
        log.info(f"  {s:.3f} | {trend.title}")
        scored.append((trend, s))

    scored.sort(key=lambda x: x[1], reverse=True)

    # Filtrar e limitar
    now = datetime.now(timezone.utc)
    week_num = now.isocalendar()[1]
    year = now.year

    ranked: list[RankedTheme] = []
    for trend, score in scored[:max_themes]:
        if score < min_score:
            continue

        emotion = _pick_emotion(trend)
        hook = _generate_hook(trend, emotion)

        theme_record = ThemeRecord(
            title=trend.title,
            angle=f"{emotion} — {trend.topic}",
            source_trend=trend.summary,
            status="approved",
            relevance_score=score,
            week_number=week_num,
            year=year,
        )

        ranked.append(
            RankedTheme(
                theme=theme_record,
                editorial_angle=f"{emotion} — {trend.topic}",
                hook_suggestion=hook,
                target_emotion=emotion,
                relevance_score=score,
            )
        )

    log.info(f"Selecionados {len(ranked)} temas (min score: {min_score})")

    result = [r.model_dump(mode="json") for r in ranked]

    if output_path:
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, "w") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
    else:
        print(json.dumps(result, ensure_ascii=False, indent=2))

    return result


def main() -> None:
    parser = argparse.ArgumentParser(description="Strategist Agent - Theme Ranking")
    parser.add_argument("--input", required=True)
    parser.add_argument("--output")
    args = parser.parse_args()
    run(args.input, args.output)


if __name__ == "__main__":
    main()
