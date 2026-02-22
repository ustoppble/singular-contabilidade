"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import type { ReelsTheme } from "@/lib/supabase-server";

const COLUMNS = [
  { id: "script", title: "Roteiro", colorClass: "bg-secondary/10" },
  { id: "approved", title: "Aprovado", colorClass: "bg-emerald-50" },
  { id: "recorded", title: "Gravado", colorClass: "bg-blue-50" },
  { id: "edited", title: "Editado", colorClass: "bg-amber-50" },
  { id: "posted", title: "Postado", colorClass: "bg-success/10" },
] as const;

type ColumnId = (typeof COLUMNS)[number]["id"];

type ColumnMap = Record<ColumnId, ReelsTheme[]>;

function buildColumnMap(themes: ReelsTheme[]): ColumnMap {
  const map: ColumnMap = { script: [], approved: [], recorded: [], edited: [], posted: [] };

  for (const theme of themes) {
    // "produced" from pipeline maps to "script" column
    const status =
      theme.status === "produced" ? "script" : (theme.status as ColumnId);
    if (status in map) {
      map[status].push(theme);
    }
  }

  return map;
}

function findColumn(columns: ColumnMap, themeId: string): ColumnId | null {
  for (const [col, themes] of Object.entries(columns)) {
    if (themes.some((t) => t.id === themeId)) return col as ColumnId;
  }
  return null;
}

export default function KanbanBoard({
  initialThemes,
}: {
  initialThemes: ReelsTheme[];
}) {
  const [columns, setColumns] = useState<ColumnMap>(() =>
    buildColumnMap(initialThemes)
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const activeTheme = activeId
    ? Object.values(columns)
        .flat()
        .find((t) => t.id === activeId)
    : null;

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeCol = findColumn(columns, active.id as string);
    // over.id can be a column id or a card id
    let overCol: ColumnId | null =
      (over.id as string) in columns
        ? (over.id as ColumnId)
        : findColumn(columns, over.id as string);

    if (!activeCol || !overCol || activeCol === overCol) return;

    setColumns((prev) => {
      const activeItems = [...prev[activeCol]];
      const overItems = [...prev[overCol!]];
      const activeIndex = activeItems.findIndex(
        (t) => t.id === (active.id as string)
      );
      const [moved] = activeItems.splice(activeIndex, 1);

      // Find insertion index
      const overIndex = overItems.findIndex(
        (t) => t.id === (over.id as string)
      );
      const insertIndex = overIndex >= 0 ? overIndex : overItems.length;

      overItems.splice(insertIndex, 0, moved);

      return { ...prev, [activeCol]: activeItems, [overCol!]: overItems };
    });
  }, [columns]);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) return;

      const activeCol = findColumn(columns, active.id as string);
      if (!activeCol) return;

      // Same column reorder
      if (active.id !== over.id && findColumn(columns, over.id as string) === activeCol) {
        setColumns((prev) => {
          const items = [...prev[activeCol]];
          const oldIndex = items.findIndex((t) => t.id === (active.id as string));
          const newIndex = items.findIndex((t) => t.id === (over.id as string));
          return { ...prev, [activeCol]: arrayMove(items, oldIndex, newIndex) };
        });
      }

      // Persist status change to Supabase
      try {
        await fetch("/api/kanban", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: active.id, status: activeCol }),
        });
      } catch (err) {
        console.error("Falha ao salvar status:", err);
      }
    },
    [columns]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            colorClass={col.colorClass}
            themes={columns[col.id]}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTheme ? (
          <div className="rotate-3">
            <KanbanCard theme={activeTheme} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
