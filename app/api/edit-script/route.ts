import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export async function POST(req: NextRequest) {
  const { slug, week, year, sections } = await req.json();

  if (!slug || !week || !year || !sections) {
    return NextResponse.json(
      { error: "Parametros obrigatorios: slug, week, year, sections." },
      { status: 400 }
    );
  }

  const weekDir = path.join(
    process.cwd(),
    "content-machine",
    "output",
    "reels",
    String(year),
    `semana-${String(week).padStart(2, "0")}`
  );

  const filePath = path.join(weekDir, `${slug}.md`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter } = matter(raw);

    // Rebuild content from edited sections
    const headerMap: Record<string, string> = {
      hook: "## HOOK (2 segundos - deve parar o scroll)",
      contexto: "## CONTEXTO (10 segundos)",
      virada: "## VIRADA (informacao que surpreende)",
      cta: "## CTA (chamada para acao)",
    };

    const sectionOrder = ["hook", "contexto", "virada", "cta"];
    const parts = sectionOrder
      .filter((k) => sections[k])
      .map((k) => `${headerMap[k]}\n${sections[k]}`);

    const newContent = parts.join("\n\n");

    // Rebuild full file with original frontmatter
    const newFile = matter.stringify(newContent + "\n", frontmatter);

    await fs.writeFile(filePath, newFile, "utf-8");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Arquivo nao encontrado." },
      { status: 404 }
    );
  }
}
