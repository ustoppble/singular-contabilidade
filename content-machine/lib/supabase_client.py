"""Cliente Supabase para o Curator."""

from __future__ import annotations

import os
from datetime import datetime, timezone

from supabase import create_client, Client

from .models import ThemeRecord


class SupabaseStore:
    TABLE = "reels_themes"

    def __init__(self) -> None:
        url = os.environ["SUPABASE_URL"]
        key = os.environ["SUPABASE_SERVICE_KEY"]
        self.client: Client = create_client(url, key)

    def insert_theme(self, theme: ThemeRecord) -> str:
        data = {
            "title": theme.title,
            "angle": theme.angle,
            "source_trend": theme.source_trend,
            "status": theme.status,
            "relevance_score": theme.relevance_score,
            "week_number": theme.week_number,
            "year": theme.year,
        }
        resp = self.client.table(self.TABLE).upsert(data, on_conflict="title,week_number,year").execute()
        row = resp.data[0]
        return row["id"]

    def find_similar_titles(self, title: str) -> list[ThemeRecord]:
        """Busca temas com titulo similar usando pg_trgm."""
        resp = (
            self.client.table(self.TABLE)
            .select("*")
            .execute()
        )
        return [self._row_to_theme(r) for r in resp.data]

    def get_themes_by_week(self, year: int, week: int) -> list[ThemeRecord]:
        resp = (
            self.client.table(self.TABLE)
            .select("*")
            .eq("year", year)
            .eq("week_number", week)
            .execute()
        )
        return [self._row_to_theme(r) for r in resp.data]

    def mark_produced(self, theme_id: str, script_path: str) -> None:
        self.client.table(self.TABLE).update({
            "status": "produced",
            "script_path": script_path,
            "produced_at": datetime.now(timezone.utc).isoformat(),
        }).eq("id", theme_id).execute()

    def get_all_titles(self) -> list[str]:
        resp = self.client.table(self.TABLE).select("title").execute()
        return [r["title"] for r in resp.data]

    def _row_to_theme(self, row: dict) -> ThemeRecord:
        return ThemeRecord(
            id=row.get("id"),
            title=row["title"],
            angle=row["angle"],
            source_trend=row.get("source_trend", ""),
            status=row.get("status", "pending"),
            relevance_score=row.get("relevance_score", 0.0),
            week_number=row.get("week_number", 0),
            year=row.get("year", 0),
            script_path=row.get("script_path"),
        )
