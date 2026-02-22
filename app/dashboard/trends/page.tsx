import { getThemes } from "@/lib/supabase-server";
import TrendTable from "@/components/dashboard/TrendTable";

export const dynamic = "force-dynamic";

export default async function TrendsPage() {
  const themes = await getThemes({ limit: 100 });

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-text">Trends</h1>
        <p className="text-text-muted text-sm mt-1">
          Temas descobertos e rastreados pelo pipeline
        </p>
      </div>

      <TrendTable themes={themes} />
    </div>
  );
}
