import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export interface ReelsTheme {
  id: string;
  title: string;
  angle: string;
  source_trend: string | null;
  status: "pending" | "approved" | "produced" | "rejected" | "script" | "recorded" | "edited" | "posted";
  relevance_score: number;
  week_number: number;
  year: number;
  produced_at: string | null;
  script_path: string | null;
  created_at: string;
  updated_at: string;
}

export async function getThemes(filters?: {
  status?: string;
  week?: number;
  year?: number;
  limit?: number;
}): Promise<ReelsTheme[]> {
  let query = supabase
    .from("reels_themes")
    .select("*")
    .order("relevance_score", { ascending: false });

  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.week) query = query.eq("week_number", filters.week);
  if (filters?.year) query = query.eq("year", filters.year);
  if (filters?.limit) query = query.limit(filters.limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data as ReelsTheme[]) || [];
}

export async function getStats() {
  const { data: all } = await supabase
    .from("reels_themes")
    .select("id, status, relevance_score, week_number, year");

  const themes = all || [];
  const now = new Date();
  const currentWeek = getISOWeek(now);
  const currentYear = now.getFullYear();

  const produced = themes.filter((t) => t.status === "produced");
  const thisWeek = produced.filter(
    (t) => t.week_number === currentWeek && t.year === currentYear
  );
  const avgScore =
    produced.length > 0
      ? produced.reduce((sum, t) => sum + t.relevance_score, 0) /
        produced.length
      : 0;
  const pending = themes.filter((t) => t.status === "pending").length;

  return {
    totalScripts: produced.length,
    thisWeekScripts: thisWeek.length,
    avgScore: Math.round(avgScore * 100) / 100,
    pendingTrends: pending,
  };
}

const KANBAN_STATUSES = ["produced", "script", "approved", "recorded", "edited", "posted"];

export async function getKanbanThemes(): Promise<ReelsTheme[]> {
  const { data, error } = await supabase
    .from("reels_themes")
    .select("*")
    .in("status", KANBAN_STATUSES)
    .order("relevance_score", { ascending: false });

  if (error) throw error;
  return (data as ReelsTheme[]) || [];
}

export async function updateThemeStatus(
  id: string,
  status: string
): Promise<void> {
  const { error } = await supabase
    .from("reels_themes")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
}

function getISOWeek(date: Date): number {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((d.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}
