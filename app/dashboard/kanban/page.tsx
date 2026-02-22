import { getKanbanThemes } from "@/lib/supabase-server";
import KanbanBoard from "@/components/dashboard/KanbanBoard";

export const dynamic = "force-dynamic";

export default async function KanbanPage() {
  const themes = await getKanbanThemes();

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-text">Kanban</h1>
        <p className="text-text-muted text-sm mt-1">
          Acompanhe o progresso dos roteiros ate a publicacao
        </p>
      </div>

      <KanbanBoard initialThemes={themes} />
    </div>
  );
}
