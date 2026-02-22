import { NextRequest, NextResponse } from "next/server";
import { getScripts } from "@/lib/content-reader";

export const dynamic = "force-dynamic";

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
