"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReelsTheme } from "@/lib/supabase-server";

const EMOTION_COLORS: Record<string, string> = {
  medo: "bg-red-50 text-red-700 border-red-200",
  surpresa: "bg-amber-50 text-amber-700 border-amber-200",
  urgencia: "bg-orange-50 text-orange-700 border-orange-200",
  curiosidade: "bg-blue-50 text-blue-700 border-blue-200",
};

interface KanbanCardProps {
  theme: ReelsTheme;
  onClick?: (theme: ReelsTheme) => void;
}

export default function KanbanCard({ theme, onClick }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: theme.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const emotion = theme.angle?.split("—")?.[0]?.trim() || "";
  const emotionClass =
    EMOTION_COLORS[emotion.toLowerCase()] ||
    "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        if (!isDragging && onClick) onClick(theme);
      }}
      className={`bg-white rounded-2xl p-4 border border-border shadow-sm cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isDragging ? "opacity-50 shadow-lg scale-105" : "hover:shadow-md"
      }`}
    >
      <h4 className="font-semibold text-text text-xs leading-snug line-clamp-2 mb-2">
        {theme.title}
      </h4>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-lg">
          {(theme.relevance_score * 100).toFixed(0)}%
        </span>
        {emotion && (
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${emotionClass}`}
          >
            {emotion}
          </span>
        )}
        <span className="text-text-light text-[10px]">
          Sem. {theme.week_number}/{theme.year}
        </span>
      </div>
    </div>
  );
}
