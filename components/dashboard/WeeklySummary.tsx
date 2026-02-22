import type { ScriptFile } from "@/lib/content-reader";

interface WeeklySummaryProps {
  week: number;
  year: number;
  scripts: ScriptFile[];
}

export default function WeeklySummary({ week, year, scripts }: WeeklySummaryProps) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg text-text">
          Semana {week}/{year}
        </h3>
        <span className="text-xs text-text-muted bg-cream-dark px-3 py-1 rounded-full">
          {scripts.length} roteiro{scripts.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3">
        {scripts.map((script) => (
          <div
            key={script.slug}
            className="flex items-center gap-3 p-3 rounded-xl bg-cream/50 hover:bg-cream transition-colors"
          >
            <span className="shrink-0 w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold">
              {(script.frontmatter.relevance_score * 100).toFixed(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-text truncate">
                {script.frontmatter.title}
              </p>
              <p className="text-[11px] text-text-muted truncate">
                {script.sections.hook}
              </p>
            </div>
            <span className="shrink-0 text-[10px] text-text-light">
              {script.frontmatter.duration_estimate}
            </span>
          </div>
        ))}

        {scripts.length === 0 && (
          <p className="text-sm text-text-muted text-center py-4">
            Nenhum roteiro nesta semana
          </p>
        )}
      </div>
    </div>
  );
}
