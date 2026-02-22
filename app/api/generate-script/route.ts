import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DEFAULT_PROMPT = `\
Voce eh um especialista em conteudo para redes sociais de um escritorio de contabilidade brasileiro.
O usuario vai enviar um texto bruto — pode ser um case de cliente, uma noticia, uma dica, um insight pessoal, uma historia.
Seu trabalho eh transformar esse texto em um roteiro de Reels para teleprompter em portugues brasileiro.

Publico-alvo: MEI (Microempreendedor Individual), faturamento R$50-150k/ano,
que tem medo da Receita Federal e nao domina as regras tributarias.

Formato OBRIGATORIO (use exatamente estes titulos de secao):

## HOOK (2 segundos - deve parar o scroll)
[Frase de impacto, pergunta provocativa ou fato chocante extraido do texto]

## CONTEXTO (10 segundos)
[Explique a situacao/case de forma simples, como se estivesse conversando com um amigo]

## VIRADA (informacao que surpreende)
[Fato contra-intuitivo, regra pouco conhecida ou "o que ninguem te conta" — extraia do texto ou complemente]

## CTA (chamada para acao)
[Convite direto para o diagnostico contabil gratuito — link na bio]

Regras:
- Tom conversacional, NAO formal
- Use "voce" e nao "o senhor"
- Frases curtas para leitura em teleprompter
- Inclua pelo menos 1 numero ou data especifica quando possivel
- Duracao total: 45-60 segundos de fala
- Ao final, sugira 5 hashtags relevantes em uma linha separada
- Mantenha a essencia e os dados do texto original
- Se o texto for um case pessoal, mantenha o tom de historia real

Retorne APENAS o roteiro no formato acima, sem explicacoes extras.`;

async function getSystemPrompt(): Promise<string> {
  try {
    const promptsFile = path.join(process.cwd(), "content-machine", "prompts.json");
    const raw = await fs.readFile(promptsFile, "utf-8");
    const prompts = JSON.parse(raw);
    return prompts.gerador || DEFAULT_PROMPT;
  } catch {
    return DEFAULT_PROMPT;
  }
}

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text || typeof text !== "string" || text.trim().length < 10) {
    return NextResponse.json(
      { error: "Texto muito curto. Envie pelo menos uma frase." },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY nao configurada." },
      { status: 500 }
    );
  }

  try {
    const systemPrompt = await getSystemPrompt();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: `Texto do usuario:\n\n${text.trim()}\n\nTransforme isso em um roteiro de Reels seguindo o formato.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: `Erro na API Anthropic: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const script = data.content?.[0]?.text || "";

    return NextResponse.json({ script });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao gerar roteiro." },
      { status: 500 }
    );
  }
}
