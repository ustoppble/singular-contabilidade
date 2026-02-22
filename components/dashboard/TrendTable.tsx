import type { ReelsTheme } from "@/lib/supabase-server";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-blue-50 text-blue-700",
  produced: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
};

interface TrendTableProps {
  themes: ReelsTheme[];
}

export default function TrendTable({ themes }: TrendTableProps) {
  if (themes.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-12 text-center">
        <p className="text-text-muted text-sm">Nenhuma trend encontrada</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-cream/50">
              <th className="text-left px-5 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">
                Tema
              </th>
              <th className="text-left px-5 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">
                Angulo
              </th>
              <th className="text-center px-5 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">
                Score
              </th>
              <th className="text-center px-5 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">
                Semana
              </th>
              <th className="text-center px-5 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {themes.map((theme) => (
              <tr
                key={theme.id}
                className="border-b border-border/50 hover:bg-cream/30 transition-colors"
              >
                <td className="px-5 py-4 font-medium text-text max-w-xs">
                  <p className="line-clamp-1">{theme.title}</p>
                </td>
                <td className="px-5 py-4 text-text-muted max-w-[200px]">
                  <p className="line-clamp-1">{theme.angle}</p>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="bg-secondary/10 text-secondary text-xs font-bold px-2 py-1 rounded-lg">
                    {(theme.relevance_score * 100).toFixed(0)}%
                  </span>
                </td>
                <td className="px-5 py-4 text-center text-text-muted">
                  {theme.week_number}/{theme.year}
                </td>
                <td className="px-5 py-4 text-center">
                  <span
                    className={`text-[10px] font-semibold uppercase px-2 py-1 rounded-full ${
                      STATUS_STYLES[theme.status] || ""
                    }`}
                  >
                    {theme.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
