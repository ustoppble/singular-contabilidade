"""Cliente para a API da Perplexity (sonar/sonar-pro)."""

from __future__ import annotations

import json
import os
import time

import httpx

from .models import ScanDepth, TrendItem


class PerplexityClient:
    BASE_URL = "https://api.perplexity.ai/chat/completions"

    def __init__(self) -> None:
        self.api_key = os.environ["PERPLEXITY_API_KEY"]
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    def search_trends(self, topic: str, depth: ScanDepth) -> list[TrendItem]:
        model = "sonar-pro" if depth == ScanDepth.DEEP else "sonar"

        system_prompt = (
            "Voce eh um pesquisador especialista em tendencias sobre MEI, "
            "Simples Nacional e tributacao de pequenas empresas no Brasil. "
            "Retorne APENAS um JSON array com objetos contendo: "
            '"title" (titulo da trend), "summary" (resumo em 2-3 frases), '
            '"source_urls" (lista de URLs fonte), "keywords" (lista de palavras-chave). '
            "Maximo 5 resultados. Foque em novidades recentes, mudancas de legislacao, "
            "prazos importantes e informacoes que surpreendem o MEI comum. "
            "Responda em portugues brasileiro."
        )

        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Quais as tendencias e novidades mais recentes sobre: {topic}"},
            ],
            "max_tokens": 2000,
            "temperature": 0.3,
            "return_citations": True,
        }

        for attempt in range(3):
            try:
                with httpx.Client(timeout=60) as client:
                    resp = client.post(self.BASE_URL, headers=self.headers, json=payload)
                    resp.raise_for_status()

                data = resp.json()
                content = data["choices"][0]["message"]["content"]

                # Extrair JSON do conteudo (pode vir com markdown)
                content = content.strip()
                if content.startswith("```"):
                    content = content.split("\n", 1)[1]
                    content = content.rsplit("```", 1)[0]
                content = content.strip()

                items_raw = json.loads(content)
                trends = []
                for item in items_raw:
                    trends.append(
                        TrendItem(
                            topic=topic,
                            title=item.get("title", ""),
                            summary=item.get("summary", ""),
                            source_urls=item.get("source_urls", []),
                            relevance_keywords=item.get("keywords", []),
                            scan_depth=depth,
                        )
                    )
                return trends

            except (httpx.HTTPError, json.JSONDecodeError, KeyError) as e:
                if attempt < 2:
                    time.sleep(2 ** (attempt + 1))
                    continue
                raise RuntimeError(f"Perplexity API falhou apos 3 tentativas: {e}") from e

        return []
