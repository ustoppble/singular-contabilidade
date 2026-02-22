#!/usr/bin/env python3
"""Auditor Agent — verifica veracidade factual dos temas antes da produção."""

from __future__ import annotations

import argparse
import json
import sys
import tomllib
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

from lib.logger import setup_logger
from lib.models import RankedTheme
from lib.perplexity_client import PerplexityClient

log = setup_logger("auditor")

VERIFICATION_PROMPT = """\
Voce eh um fact-checker especializado em legislacao tributaria brasileira, \
especialmente MEI, Simples Nacional e Receita Federal.

Analise a seguinte afirmacao e responda APENAS com um JSON:
{{
  "verified": true ou false,
  "status": "confirmado" ou "nao_confirmado" ou "parcialmente_correto" ou "projeto_de_lei",
  "correction": "correcao se necessario, ou null",
  "sources": ["url1", "url2"],
  "confidence": 0.0 a 1.0,
  "notes": "explicacao breve do que esta certo ou errado"
}}

REGRAS CRITICAS:
- Se eh um PROJETO DE LEI que ainda NAO foi aprovado, status = "projeto_de_lei" e verified = false
- Se a informacao eh factualmente correta e JA ESTA EM VIGOR, verified = true
- Se tem numeros/datas errados, status = "parcialmente_correto" e inclua a correcao
- Se eh completamente falso, verified = false com explicacao
- SEMPRE inclua as fontes (URLs) que comprovam sua verificacao
- Retorne APENAS o JSON, sem texto adicional\
"""


class AuditorClient:
    def __init__(self) -> None:
        self.pplx = PerplexityClient()

    def verify_theme(self, theme: RankedTheme) -> dict:
        """Verifica um tema e retorna resultado da auditoria."""
        claim = (
            f"Titulo: {theme.theme.title}\n"
            f"Angulo: {theme.editorial_angle}\n"
            f"Contexto: {theme.theme.source_trend}\n"
        )

        import httpx
        import os
        import time

        headers = {
            "Authorization": f"Bearer {os.environ['PERPLEXITY_API_KEY']}",
            "Content-Type": "application/json",
        }

        payload = {
            "model": "sonar-pro",
            "messages": [
                {"role": "system", "content": VERIFICATION_PROMPT},
                {"role": "user", "content": f"Verifique esta informacao:\n\n{claim}"},
            ],
            "max_tokens": 1000,
            "temperature": 0.1,
            "return_citations": True,
        }

        for attempt in range(3):
            try:
                with httpx.Client(timeout=60) as client:
                    resp = client.post(
                        "https://api.perplexity.ai/chat/completions",
                        headers=headers,
                        json=payload,
                    )
                    resp.raise_for_status()

                data = resp.json()
                content = data["choices"][0]["message"]["content"]

                # Extrair JSON
                content = content.strip()
                if content.startswith("```"):
                    content = content.split("\n", 1)[1]
                    content = content.rsplit("```", 1)[0]
                content = content.strip()

                result = json.loads(content)

                # Adicionar citations da API se disponiveis
                citations = data.get("citations", [])
                if citations and not result.get("sources"):
                    result["sources"] = citations

                return result

            except Exception as e:
                if attempt < 2:
                    time.sleep(2 ** (attempt + 1))
                    continue
                log.error(f"Falha ao verificar: {e}")
                return {
                    "verified": False,
                    "status": "erro_verificacao",
                    "correction": None,
                    "sources": [],
                    "confidence": 0.0,
                    "notes": f"Erro na verificacao: {e}",
                }


def run(input_path: str, output_path: str | None = None) -> list[dict]:
    with open(input_path) as f:
        ranked_raw = json.load(f)

    themes = [RankedTheme(**r) for r in ranked_raw]
    log.info(f"Auditando {len(themes)} temas")

    auditor = AuditorClient()
    approved: list[dict] = []
    rejected: list[dict] = []

    for theme in themes:
        log.info(f"Verificando: {theme.theme.title}")
        result = auditor.verify_theme(theme)

        status = result.get("status", "")
        verified = result.get("verified", False)
        confidence = result.get("confidence", 0.0)

        log.info(
            f"  -> {status} | verified={verified} | confidence={confidence:.2f}"
        )

        if result.get("notes"):
            log.info(f"     Notas: {result['notes']}")

        # Adicionar resultado da auditoria ao tema
        theme_dict = theme.model_dump(mode="json")
        theme_dict["audit"] = result

        if verified and confidence >= 0.6:
            # Tema verificado — incluir fontes e possivel correcao
            if result.get("correction"):
                theme_dict["theme"]["source_trend"] = (
                    f"{theme.theme.source_trend}\n\n"
                    f"CORRECAO DO AUDITOR: {result['correction']}"
                )
            theme_dict["sources"] = result.get("sources", [])
            approved.append(theme_dict)
            log.info(f"  APROVADO")
        elif status == "parcialmente_correto" and confidence >= 0.7:
            # Parcialmente correto com alta confianca — corrigir e aprovar
            if result.get("correction"):
                theme_dict["theme"]["source_trend"] = (
                    f"{theme.theme.source_trend}\n\n"
                    f"CORRECAO DO AUDITOR: {result['correction']}"
                )
            theme_dict["sources"] = result.get("sources", [])
            approved.append(theme_dict)
            log.info(f"  APROVADO COM CORRECAO")
        else:
            rejected.append(theme_dict)
            log.info(f"  REJEITADO: {result.get('notes', 'sem detalhes')}")

    log.info(
        f"Auditoria: {len(approved)} aprovados, {len(rejected)} rejeitados "
        f"de {len(themes)} temas"
    )

    if output_path:
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, "w") as f:
            json.dump(approved, f, ensure_ascii=False, indent=2)

        # Salvar rejeitados para referencia
        rejected_path = output_path.replace(".json", "_rejected.json")
        with open(rejected_path, "w") as f:
            json.dump(rejected, f, ensure_ascii=False, indent=2)
        log.info(f"Rejeitados salvos em: {rejected_path}")
    else:
        print(json.dumps(approved, ensure_ascii=False, indent=2))

    return approved


def main() -> None:
    parser = argparse.ArgumentParser(description="Auditor Agent - Fact Checking")
    parser.add_argument("--input", required=True)
    parser.add_argument("--output")
    args = parser.parse_args()
    run(args.input, args.output)


if __name__ == "__main__":
    main()
