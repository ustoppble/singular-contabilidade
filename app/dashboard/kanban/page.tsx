import { getKanbanThemes } from "@/lib/supabase-server";
import { getWeeks } from "@/lib/content-reader";
import KanbanBoard from "@/components/dashboard/KanbanBoard";

export const dynamic = "force-dynamic";

export default async function KanbanPage() {
  const [themes, weeks] = await Promise.all([getKanbanThemes(), getWeeks()]);

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-text">Kanban</h1>
        <p className="text-text-muted text-sm mt-1">
          Acompanhe o progresso dos roteiros ate a publicacao
        </p>
      </div>

      <KanbanBoard
        initialThemes={themes}
        weeks={weeks.map((w) => ({ year: w.year, week: w.week }))}
      />
    </div>
  );
}
