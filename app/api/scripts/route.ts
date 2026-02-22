import { NextRequest, NextResponse } from "next/server";
import { getScripts } from "@/lib/content-reader";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const REELS_DIR = path.join(
  process.cwd(),
  "content-machine",
  "output",
  "reels"
);

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const week = searchParams.get("week");
  const year = searchParams.get("year");
  const title = searchParams.get("title");

  if (!week || !year) {
    return NextResponse.json(
      { error: "week e year sao obrigatorios" },
      { status: 400 }
    );
  }

  try {
    const scripts = await getScripts(parseInt(year), parseInt(week));

    if (title) {
      const script = scripts.find(
        (s) =>
          s.frontmatter.title.toLowerCase().trim() ===
          title.toLowerCase().trim()
      );
      if (!script) {
        return NextResponse.json(
          { error: "Script nao encontrado" },
          { status: 404 }
        );
      }
      return NextResponse.json(script);
    }

    return NextResponse.json(scripts);
  } catch (error) {
    console.error("Scripts GET error:", error);
    return NextResponse.json(
      { error: "Falha ao buscar scripts" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const slug = searchParams.get("slug");
  const week = searchParams.get("week");
  const year = searchParams.get("year");

  if (!slug || !week || !year) {
    return NextResponse.json(
      { error: "slug, week e year sao obrigatorios" },
      { status: 400 }
    );
  }

  const filePath = path.join(
    REELS_DIR,
    year,
    `semana-${String(week).padStart(2, "0")}`,
    `${slug}.md`
  );

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Arquivo nao encontrado" },
      { status: 404 }
    );
  }
}
