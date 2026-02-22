"use client";

import { useState, useCallback, useMemo } from "react";
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
import ScriptModal from "./ScriptModal";
import type { ReelsTheme } from "@/lib/supabase-server";
import type { ScriptFile } from "@/lib/content-reader";

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
  const map: ColumnMap = {
    script: [],
    approved: [],
    recorded: [],
    edited: [],
    posted: [],
  };

  for (const theme of themes) {
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

interface KanbanBoardProps {
  initialThemes: ReelsTheme[];
  weeks: { year: number; week: number }[];
}

export default function KanbanBoard({
  initialThemes,
  weeks,
}: KanbanBoardProps) {
  const [allThemes] = useState(initialThemes);
  const [selectedWeek, setSelectedWeek] = useState<string>("all");
  const [columns, setColumns] = useState<ColumnMap>(() =>
    buildColumnMap(initialThemes)
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedScript, setSelectedScript] = useState<ScriptFile | null>(null);
  const [loadingScript, setLoadingScript] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  // Filter columns by selected week
  const filteredColumns = useMemo(() => {
    if (selectedWeek === "all") return columns;

    const [year, week] = selectedWeek.split("-").map(Number);
    const filtered: ColumnMap = {
      script: [],
      approved: [],
      recorded: [],
      edited: [],
      posted: [],
    };

    for (const col of COLUMNS) {
      filtered[col.id] = columns[col.id].filter(
        (t) => t.year === year && t.week_number === week
      );
    }

    return filtered;
  }, [columns, selectedWeek]);

  const activeTheme = activeId
    ? Object.values(columns)
        .flat()
        .find((t) => t.id === activeId)
    : null;

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeCol = findColumn(columns, active.id as string);
      const overCol: ColumnId | null =
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

        const overIndex = overItems.findIndex(
          (t) => t.id === (over.id as string)
        );
        const insertIndex = overIndex >= 0 ? overIndex : overItems.length;

        overItems.splice(insertIndex, 0, moved);

        return { ...prev, [activeCol]: activeItems, [overCol!]: overItems };
      });
    },
    [columns]
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) return;

      const activeCol = findColumn(columns, active.id as string);
      if (!activeCol) return;

      if (
        active.id !== over.id &&
        findColumn(columns, over.id as string) === activeCol
      ) {
        setColumns((prev) => {
          const items = [...prev[activeCol]];
          const oldIndex = items.findIndex(
            (t) => t.id === (active.id as string)
          );
          const newIndex = items.findIndex(
            (t) => t.id === (over.id as string)
          );
          return {
            ...prev,
            [activeCol]: arrayMove(items, oldIndex, newIndex),
          };
        });
      }

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

  const handleCardClick = useCallback(async (theme: ReelsTheme) => {
    setLoadingScript(true);
    try {
      const params = new URLSearchParams({
        week: String(theme.week_number),
        year: String(theme.year),
        title: theme.title,
      });
      const res = await fetch(`/api/scripts?${params}`);
      if (res.ok) {
        const script: ScriptFile = await res.json();
        setSelectedScript(script);
      }
    } catch (err) {
      console.error("Falha ao carregar roteiro:", err);
    } finally {
      setLoadingScript(false);
    }
  }, []);

  return (
    <>
      {/* Week filter */}
      <div className="flex items-center gap-3 mb-6">
        <label className="text-text-muted text-sm">Semana:</label>
        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          className="bg-white border border-border rounded-xl px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/40"
        >
          <option value="all">Todas</option>
          {weeks.map((w) => (
            <option key={`${w.year}-${w.week}`} value={`${w.year}-${w.week}`}>
              Sem. {w.week}/{w.year}
            </option>
          ))}
        </select>

        {loadingScript && (
          <span className="text-text-light text-xs animate-pulse">
            Carregando roteiro...
          </span>
        )}
      </div>

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
              themes={filteredColumns[col.id]}
              onCardClick={handleCardClick}
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

      <ScriptModal
        script={selectedScript}
        onClose={() => setSelectedScript(null)}
      />
    </>
  );
}
