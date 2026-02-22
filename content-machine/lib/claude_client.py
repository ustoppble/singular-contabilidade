"""Cliente para a API da Anthropic (Claude)."""

from __future__ import annotations

import json
import os

import anthropic

from .models import RankedTheme, ReelsScript


SYSTEM_PROMPT = """\
Voce eh um especialista em conteudo para redes sociais de um escritorio de contabilidade brasileiro.
Escreva um roteiro de Reels em portugues brasileiro para teleprompter.

Publico-alvo: MEI (Microempreendedor Individual), faturamento R$50-150k/ano,
que tem medo da Receita Federal e nao domina as regras tributarias.

Formato OBRIGATORIO (use exatamente estes titulos de secao):

## HOOK (2 segundos - deve parar o scroll)
[Frase de impacto, pergunta provocativa ou fato chocante]

## CONTEXTO (10 segundos)
[Explique o tema de forma simples, como se estivesse conversando com um amigo]

## VIRADA (informacao que surpreende)
[Fato contra-intuitivo, regra pouco conhecida ou "o que ninguem te conta"]

## CTA (chamada para acao)
[Convite direto para o diagnostico contabil gratuito — link na bio]

Regras:
- Tom conversacional, NAO formal
- Use "voce" e nao "o senhor"
- Frases curtas para leitura em teleprompter
- Inclua pelo menos 1 numero ou data especifica quando possivel
- Duracao total: 45-60 segundos de fala
- Ao final, sugira 5 hashtags relevantes em uma linha separada

Retorne APENAS o roteiro no formato acima, sem explicacoes extras.\
"""


class ClaudeClient:
    def __init__(self, model: str = "claude-sonnet-4-20250514", temperature: float = 0.7, max_tokens: int = 1500) -> None:
        self.client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens

    def generate_script(self, theme: RankedTheme) -> ReelsScript:
        user_msg = (
            f"Tema: {theme.theme.title}\n"
            f"Angulo editorial: {theme.editorial_angle}\n"
            f"Sugestao de hook: {theme.hook_suggestion}\n"
            f"Emocao-alvo: {theme.target_emotion}\n"
            f"Contexto da trend: {theme.theme.source_trend}\n\n"
            "Gere o roteiro completo seguindo o formato."
        )

        response = self.client.messages.create(
            model=self.model,
            max_tokens=self.max_tokens,
            temperature=self.temperature,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_msg}],
        )

        content = response.content[0].text
        sections = self._parse_sections(content)
        hashtags = self._extract_hashtags(content)

        return ReelsScript(
            theme_id=theme.theme.id or "",
            title=theme.theme.title,
            hook=sections.get("hook", ""),
            contexto=sections.get("contexto", ""),
            virada=sections.get("virada", ""),
            cta=sections.get("cta", ""),
            full_teleprompter=content,
            hashtags=hashtags,
            estimated_duration_seconds=50,
        )

    def _parse_sections(self, text: str) -> dict[str, str]:
        sections: dict[str, str] = {}
        current_key = ""
        current_lines: list[str] = []

        for line in text.split("\n"):
            lower = line.lower().strip()
            if lower.startswith("## hook"):
                if current_key:
                    sections[current_key] = "\n".join(current_lines).strip()
                current_key = "hook"
                current_lines = []
            elif lower.startswith("## contexto") or lower.startswith("## context"):
                if current_key:
                    sections[current_key] = "\n".join(current_lines).strip()
                current_key = "contexto"
                current_lines = []
            elif lower.startswith("## virada") or lower.startswith("## twist"):
                if current_key:
                    sections[current_key] = "\n".join(current_lines).strip()
                current_key = "virada"
                current_lines = []
            elif lower.startswith("## cta"):
                if current_key:
                    sections[current_key] = "\n".join(current_lines).strip()
                current_key = "cta"
                current_lines = []
            else:
                current_lines.append(line)

        if current_key:
            sections[current_key] = "\n".join(current_lines).strip()

        return sections

    def _extract_hashtags(self, text: str) -> list[str]:
        hashtags = []
        for word in text.split():
            if word.startswith("#") and len(word) > 1:
                hashtags.append(word.rstrip(".,;"))
        return hashtags[:7]
