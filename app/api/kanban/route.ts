import { NextRequest, NextResponse } from "next/server";
import { getKanbanThemes, updateThemeStatus } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const themes = await getKanbanThemes();
    return NextResponse.json(themes);
  } catch (error) {
    console.error("Kanban GET error:", error);
    return NextResponse.json(
      { error: "Falha ao buscar temas" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "id e status sao obrigatorios" },
        { status: 400 }
      );
    }

    const validStatuses = ["script", "approved", "recorded", "edited", "posted", "produced"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Status invalido. Use: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    await updateThemeStatus(id, status);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Kanban PATCH error:", error);
    return NextResponse.json(
      { error: "Falha ao atualizar status" },
      { status: 500 }
    );
  }
}
