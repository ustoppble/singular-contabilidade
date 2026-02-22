import type { ScriptFile } from "@/lib/content-reader";

const EMOTION_COLORS: Record<string, string> = {
  medo: "bg-red-50 text-red-700 border-red-200",
  surpresa: "bg-amber-50 text-amber-700 border-amber-200",
  urgencia: "bg-orange-50 text-orange-700 border-orange-200",
  curiosidade: "bg-blue-50 text-blue-700 border-blue-200",
};

interface ScriptCardProps {
  script: ScriptFile;
  onClick?: () => void;
}

export default function ScriptCard({ script, onClick }: ScriptCardProps) {
  const { frontmatter, sections } = script;
  const emotionClass =
    EMOTION_COLORS[frontmatter.emotion] ||
    "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-250 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-text text-sm leading-snug line-clamp-2">
          {frontmatter.title}
        </h3>
        <span className="shrink-0 bg-secondary/10 text-secondary text-xs font-bold px-2 py-1 rounded-lg">
          {(frontmatter.relevance_score * 100).toFixed(0)}%
        </span>
      </div>

      <p className="text-text-muted text-xs line-clamp-2 mb-4">
        {sections.hook}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${emotionClass}`}
        >
          {frontmatter.emotion}
        </span>
        <span className="text-text-light text-[10px]">
          {frontmatter.duration_estimate}
        </span>
        <span className="text-text-light text-[10px]">
          Sem. {frontmatter.week}/{frontmatter.year}
        </span>
      </div>
    </button>
  );
}
