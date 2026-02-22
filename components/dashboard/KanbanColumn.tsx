"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import KanbanCard from "./KanbanCard";
import type { ReelsTheme } from "@/lib/supabase-server";

interface KanbanColumnProps {
  id: string;
  title: string;
  colorClass: string;
  themes: ReelsTheme[];
  onCardClick?: (theme: ReelsTheme) => void;
}

export default function KanbanColumn({
  id,
  title,
  colorClass,
  themes,
  onCardClick,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      className={`flex flex-col min-w-[280px] w-[280px] rounded-2xl ${
        isOver ? "ring-2 ring-secondary/40" : ""
      }`}
    >
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-t-2xl ${colorClass}`}
      >
        <h3 className="font-semibold text-sm text-text">{title}</h3>
        <span className="text-text-muted text-xs bg-white/60 px-2 py-0.5 rounded-full font-medium">
          {themes.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 bg-cream-dark/50 rounded-b-2xl p-3 space-y-3 min-h-[200px]"
      >
        <SortableContext
          items={themes.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {themes.map((theme) => (
            <KanbanCard key={theme.id} theme={theme} onClick={onCardClick} />
          ))}
        </SortableContext>

        {themes.length === 0 && (
          <p className="text-text-light text-xs text-center py-8">
            Nenhum item
          </p>
        )}
      </div>
    </div>
  );
}
