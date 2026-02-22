import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function getISOWeek(date: Date): number {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((d.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}

export async function POST(req: NextRequest) {
  const { script, title } = await req.json();

  if (!script || typeof script !== "string") {
    return NextResponse.json(
      { error: "Roteiro vazio." },
      { status: 400 }
    );
  }

  const now = new Date();
  const year = now.getFullYear();
  const week = getISOWeek(now);

  // Extrair titulo da primeira linha do hook ou usar o fornecido
  let finalTitle = title;
  if (!finalTitle) {
    const hookMatch = script.match(/## HOOK[^\n]*\n+(.+)/i);
    finalTitle = hookMatch?.[1]?.slice(0, 80) || "Roteiro manual";
  }

  // Extrair hashtags
  const hashtags: string[] = [];
  for (const word of script.split(/\s+/)) {
    if (word.startsWith("#") && word.length > 1 && !word.startsWith("##")) {
      hashtags.push(word.replace(/[.,;]+$/, ""));
    }
  }

  const slug = slugify(finalTitle);

  // Montar frontmatter
  const frontmatter = [
    "---",
    `title: "${finalTitle.replace(/"/g, '\\"')}"`,
    `theme_id: ""`,
    `week: ${week}`,
    `year: ${year}`,
    `relevance_score: 0.8`,
    `emotion: "curiosidade"`,
    `angle: "case — gerado manualmente"`,
    `duration_estimate: "50s"`,
    `generated_at: "${now.toISOString()}"`,
    "---",
    "",
  ].join("\n");

  const hashtagLine = hashtags.length > 0 ? `\n\n---\n${hashtags.join(" ")}` : "";
  const fullContent = frontmatter + script + hashtagLine + "\n";

  // Salvar no diretorio da semana atual
  const weekDir = path.join(
    process.cwd(),
    "content-machine",
    "output",
    "reels",
    String(year),
    `semana-${String(week).padStart(2, "0")}`
  );

  await fs.mkdir(weekDir, { recursive: true });

  const filePath = path.join(weekDir, `${slug}.md`);

  // Evitar sobrescrever
  try {
    await fs.access(filePath);
    // Arquivo ja existe, adicionar sufixo
    const uniquePath = path.join(weekDir, `${slug}-${Date.now()}.md`);
    await fs.writeFile(uniquePath, fullContent, "utf-8");
    return NextResponse.json({
      success: true,
      path: uniquePath,
      week,
      year,
    });
  } catch {
    // Arquivo nao existe, salvar normalmente
    await fs.writeFile(filePath, fullContent, "utf-8");
    return NextResponse.json({
      success: true,
      path: filePath,
      week,
      year,
    });
  }
}
