#!/usr/bin/env python3
"""
Content Machine — Orquestrador do pipeline de Reels.

Uso:
    python orchestrator.py --full [--depth quick|deep]
    python orchestrator.py --scout-only --depth deep
    python orchestrator.py --generate-only --input validated.json
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import tempfile
import tomllib
from datetime import datetime, timezone
from pathlib import Path

# Garante que os imports funcionem
ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv

load_dotenv(ROOT.parent / ".env")

from lib.logger import setup_logger

log = setup_logger("orchestrator")


def load_config() -> dict:
    with open(ROOT / "pipeline.toml", "rb") as f:
        return tomllib.load(f)


def run_agent(name: str, args: list[str]) -> int:
    """Executa um agente como subprocess."""
    script_map = {
        "scout": ROOT / "agents" / "scout.py",
        "curator_validate": ROOT / "agents" / "curator.py",
        "curator_register": ROOT / "agents" / "curator.py",
        "strategist": ROOT / "agents" / "strategist.py",
        "auditor": ROOT / "agents" / "auditor.py",
        "writer": ROOT / "agents" / "writer.py",
    }

    script = script_map.get(name)
    if not script:
        log.error(f"Agente desconhecido: {name}")
        return 1

    cmd = [sys.executable, str(script)] + args
    log.info(f">>> [{name}] {' '.join(cmd)}")

    result = subprocess.run(cmd, capture_output=True, text=True, cwd=str(ROOT))

    if result.stdout.strip():
        log.debug(f"[{name}] stdout: {result.stdout[:500]}")
    if result.stderr.strip():
        for line in result.stderr.strip().split("\n"):
            log.info(f"[{name}] {line}")

    if result.returncode != 0:
        log.error(f"[{name}] falhou com codigo {result.returncode}")
        if result.stderr:
            log.error(f"[{name}] stderr: {result.stderr[-1000:]}")

    return result.returncode


def run_full(depth: str = "quick") -> None:
    """Executa pipeline completo: Scout → Curator → Strategist → Writer → Curator."""
    config = load_config()
    now = datetime.now(timezone.utc)
    week = now.isocalendar()[1]
    year = now.year

    log.info(f"=== Content Machine — Semana {week}/{year} — depth={depth} ===")

    tmp = Path(tempfile.mkdtemp(prefix=f"reels-{year}w{week}-"))
    trends_file = str(tmp / "trends.json")
    validated_file = str(tmp / "validated.json")
    ranked_file = str(tmp / "ranked.json")
    audited_file = str(tmp / "audited.json")

    output_dir = str(ROOT / config["pipeline"]["output_dir"] / str(year) / f"semana-{week:02d}")

    try:
        # Step 1: Scout
        log.info("--- Step 1/6: Scout ---")
        rc = run_agent("scout", ["--depth", depth, "--output", trends_file])
        if rc != 0:
            log.error("Pipeline abortado no Scout")
            return

        # Step 2: Curator validate
        log.info("--- Step 2/6: Curator validate ---")
        rc = run_agent("curator_validate", ["validate", "--input", trends_file, "--output", validated_file])
        if rc != 0:
            log.error("Pipeline abortado no Curator validate")
            return

        # Step 3: Strategist
        log.info("--- Step 3/6: Strategist ---")
        rc = run_agent("strategist", ["--input", validated_file, "--output", ranked_file])
        if rc != 0:
            log.error("Pipeline abortado no Strategist")
            return

        # Step 4: Auditor (fact-checking)
        log.info("--- Step 4/6: Auditor ---")
        rc = run_agent("auditor", ["--input", ranked_file, "--output", audited_file])
        if rc != 0:
            log.error("Pipeline abortado no Auditor")
            return

        # Step 5: Writer (usa temas auditados)
        log.info("--- Step 5/6: Writer ---")
        rc = run_agent("writer", ["--input", audited_file, "--output-dir", output_dir])
        if rc != 0:
            log.error("Pipeline abortado no Writer")
            return

        # Step 6: Curator register
        meta_file = str(Path(output_dir) / "_produced_meta.json")
        if Path(meta_file).exists():
            log.info("--- Step 6/6: Curator register ---")
            rc = run_agent("curator_register", ["register", "--input", meta_file])
            if rc != 0:
                log.warning("Curator register falhou, dados salvos localmente")

        log.info(f"=== Pipeline concluido! Output em: {output_dir} ===")

    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def run_scout_only(depth: str = "deep") -> None:
    log.info(f"=== Scout Only — depth={depth} ===")
    run_agent("scout", ["--depth", depth])


def run_generate_only(input_path: str) -> None:
    config = load_config()
    now = datetime.now(timezone.utc)
    week = now.isocalendar()[1]
    year = now.year

    tmp = Path(tempfile.mkdtemp(prefix=f"reels-gen-"))
    ranked_file = str(tmp / "ranked.json")
    output_dir = str(ROOT / config["pipeline"]["output_dir"] / str(year) / f"semana-{week:02d}")

    try:
        # Strategist
        rc = run_agent("strategist", ["--input", input_path, "--output", ranked_file])
        if rc != 0:
            return

        # Writer
        run_agent("writer", ["--input", ranked_file, "--output-dir", output_dir])
        log.info(f"Output em: {output_dir}")

    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Content Machine — Reels Pipeline Orchestrator")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--full", action="store_true", help="Pipeline completo")
    group.add_argument("--scout-only", action="store_true", help="Apenas scan de trends")
    group.add_argument("--generate-only", metavar="INPUT", help="Gerar a partir de trends validadas")

    parser.add_argument("--depth", choices=["quick", "deep"], default="quick")
    args = parser.parse_args()

    if args.full:
        run_full(args.depth)
    elif args.scout_only:
        run_scout_only(args.depth)
    elif args.generate_only:
        run_generate_only(args.generate_only)


if __name__ == "__main__":
    main()
