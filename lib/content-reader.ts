import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const REELS_DIR = path.join(
  process.cwd(),
  "content-machine",
  "output",
  "reels"
);

export interface ScriptFile {
  slug: string;
  frontmatter: {
    title: string;
    theme_id: string;
    week: number;
    year: number;
    relevance_score: number;
    emotion: string;
    angle: string;
    duration_estimate: string;
    generated_at: string;
  };
  content: string;
  sections: {
    hook: string;
    contexto: string;
    virada: string;
    cta: string;
  };
  sources: string[];
}

export async function getWeeks(): Promise<
  { year: number; week: number; path: string }[]
> {
  const weeks: { year: number; week: number; path: string }[] = [];

  try {
    const years = await fs.readdir(REELS_DIR);
    for (const year of years) {
      const yearPath = path.join(REELS_DIR, year);
      const stat = await fs.stat(yearPath);
      if (!stat.isDirectory()) continue;

      const weekDirs = await fs.readdir(yearPath);
      for (const weekDir of weekDirs) {
        const match = weekDir.match(/^semana-(\d+)$/);
        if (!match) continue;
        weeks.push({
          year: parseInt(year),
          week: parseInt(match[1]),
          path: path.join(yearPath, weekDir),
        });
      }
    }
  } catch {
    // Directory doesn't exist yet
  }

  return weeks.sort((a, b) => b.year - a.year || b.week - a.week);
}

export async function getScripts(
  year: number,
  week: number
): Promise<ScriptFile[]> {
  const weekDir = path.join(REELS_DIR, String(year), `semana-${String(week).padStart(2, "0")}`);
  const scripts: ScriptFile[] = [];

  try {
    const files = await fs.readdir(weekDir);
    for (const file of files) {
      if (!file.endsWith(".md") || file.startsWith("_") || file === "RESUMO.md")
        continue;

      const raw = await fs.readFile(path.join(weekDir, file), "utf-8");
      const { data, content } = matter(raw);

      scripts.push({
        slug: file.replace(".md", ""),
        frontmatter: data as ScriptFile["frontmatter"],
        content,
        sections: parseSections(content),
        sources: extractSources(content),
      });
    }
  } catch {
    // Week directory doesn't exist
  }

  return scripts.sort(
    (a, b) => b.frontmatter.relevance_score - a.frontmatter.relevance_score
  );
}

export async function getAllScripts(): Promise<ScriptFile[]> {
  const weeks = await getWeeks();
  const all: ScriptFile[] = [];
  for (const w of weeks) {
    const scripts = await getScripts(w.year, w.week);
    all.push(...scripts);
  }
  return all;
}

function parseSections(content: string): ScriptFile["sections"] {
  const sections = { hook: "", contexto: "", virada: "", cta: "" };
  let current = "";
  const lines: string[] = [];

  for (const line of content.split("\n")) {
    const lower = line.toLowerCase().trim();
    if (lower.startsWith("## hook")) {
      if (current) sections[current as keyof typeof sections] = lines.join("\n").trim();
      current = "hook";
      lines.length = 0;
    } else if (lower.startsWith("## contexto") || lower.startsWith("## context")) {
      if (current) sections[current as keyof typeof sections] = lines.join("\n").trim();
      current = "contexto";
      lines.length = 0;
    } else if (lower.startsWith("## virada") || lower.startsWith("## twist")) {
      if (current) sections[current as keyof typeof sections] = lines.join("\n").trim();
      current = "virada";
      lines.length = 0;
    } else if (lower.startsWith("## cta")) {
      if (current) sections[current as keyof typeof sections] = lines.join("\n").trim();
      current = "cta";
      lines.length = 0;
    } else {
      lines.push(line);
    }
  }
  if (current) sections[current as keyof typeof sections] = lines.join("\n").trim();

  return sections;
}

function extractSources(content: string): string[] {
  const sources: string[] = [];
  let inSources = false;

  for (const line of content.split("\n")) {
    if (line.toLowerCase().trim().startsWith("## fontes")) {
      inSources = true;
      continue;
    }
    if (inSources) {
      const match = line.match(/^-\s+(https?:\/\/\S+)/);
      if (match) {
        sources.push(match[1]);
      } else if (line.trim().startsWith("##")) {
        break;
      }
    }
  }

  return sources;
}
