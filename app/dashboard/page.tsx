import { getStats } from "@/lib/supabase-server";
import { getAllScripts, getWeeks, getScripts } from "@/lib/content-reader";
import StatsCard from "@/components/dashboard/StatsCard";
import WeeklySummary from "@/components/dashboard/WeeklySummary";
import OverviewScripts from "./overview-scripts";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, weeks] = await Promise.all([getStats(), getWeeks()]);

  const latestWeek = weeks[0];
  const latestScripts = latestWeek
    ? await getScripts(latestWeek.year, latestWeek.week)
    : [];

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-text">Dashboard</h1>
        <p className="text-text-muted text-sm mt-1">
          Visao geral da producao de conteudo
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Total Roteiros"
          value={stats.totalScripts}
          accent
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          }
        />
        <StatsCard
          label="Esta Semana"
          value={stats.thisWeekScripts}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
        />
        <StatsCard
          label="Score Medio"
          value={`${(stats.avgScore * 100).toFixed(0)}%`}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          }
        />
        <StatsCard
          label="Trends Pendentes"
          value={stats.pendingTrends}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          }
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Summary */}
        {latestWeek && (
          <WeeklySummary
            week={latestWeek.week}
            year={latestWeek.year}
            scripts={latestScripts}
          />
        )}

        {/* Recent Scripts */}
        <OverviewScripts scripts={latestScripts} />
      </div>
    </div>
  );
}
