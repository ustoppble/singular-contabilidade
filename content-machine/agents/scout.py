#!/usr/bin/env python3
"""Scout Agent — descobre trends via Perplexity API."""

from __future__ import annotations

import argparse
import json
import sys
import tomllib
from pathlib import Path

# Permite rodar como script standalone
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

from lib.logger import setup_logger
from lib.models import ScanDepth, TrendItem
from lib.perplexity_client import PerplexityClient


def load_config() -> dict:
    config_path = Path(__file__).resolve().parent.parent / "pipeline.toml"
    with open(config_path, "rb") as f:
        return tomllib.load(f)


def deduplicate(trends: list[TrendItem], threshold: float = 0.7) -> list[TrendItem]:
    """Remove trends com titulos muito similares (Jaccard em tokens)."""
    seen: list[set[str]] = []
    unique: list[TrendItem] = []

    for t in trends:
        tokens = set(t.title.lower().split())
        is_dup = False
        for s in seen:
            if not tokens or not s:
                continue
            jaccard = len(tokens & s) / len(tokens | s)
            if jaccard >= threshold:
                is_dup = True
                break
        if not is_dup:
            seen.append(tokens)
            unique.append(t)

    return unique


def run(depth: str, output_path: str | None = None) -> list[dict]:
    log = setup_logger("scout")
    config = load_config()
    scan_depth = ScanDepth.DEEP if depth == "deep" else ScanDepth.QUICK

    topics = config["agents"]["scout"]["topics"]["queries"]
    max_per_topic = config["agents"]["scout"].get("max_results_per_topic", 5)

    log.info(f"Iniciando scan {scan_depth.value} com {len(topics)} topicos")

    client = PerplexityClient()
    all_trends: list[TrendItem] = []

    for topic in topics:
        log.info(f"Buscando: {topic}")
        try:
            trends = client.search_trends(topic, scan_depth)
            all_trends.extend(trends[:max_per_topic])
            log.info(f"  -> {len(trends)} trends encontradas")
        except Exception as e:
            log.error(f"  -> Erro: {e}")
            continue

    # Deduplicar
    before = len(all_trends)
    all_trends = deduplicate(all_trends)
    log.info(f"Dedup: {before} -> {len(all_trends)} trends unicas")

    result = [t.model_dump(mode="json") for t in all_trends]

    if output_path:
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, "w") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        log.info(f"Output salvo em {output_path}")
    else:
        print(json.dumps(result, ensure_ascii=False, indent=2))

    return result


def main() -> None:
    parser = argparse.ArgumentParser(description="Scout Agent - Trend Discovery")
    parser.add_argument("--depth", choices=["quick", "deep"], default="quick")
    parser.add_argument("--output", help="Caminho para salvar JSON output")
    args = parser.parse_args()
    run(args.depth, args.output)


if __name__ == "__main__":
    main()
