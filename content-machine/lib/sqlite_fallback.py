"""SQLite fallback local para o Curator."""

from __future__ import annotations

import sqlite3
from datetime import datetime, timezone
from pathlib import Path

from .models import ThemeRecord


class SQLiteStore:
    def __init__(self, db_path: str) -> None:
        Path(db_path).parent.mkdir(parents=True, exist_ok=True)
        self.conn = sqlite3.connect(db_path)
        self.conn.row_factory = sqlite3.Row
        self._init_schema()

    def _init_schema(self) -> None:
        self.conn.executescript("""
            CREATE TABLE IF NOT EXISTS reels_themes (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                angle TEXT NOT NULL,
                source_trend TEXT DEFAULT '',
                status TEXT DEFAULT 'pending',
                relevance_score REAL DEFAULT 0.0,
                week_number INTEGER NOT NULL,
                year INTEGER NOT NULL,
                produced_at TEXT,
                script_path TEXT,
                created_at TEXT NOT NULL
            );
            CREATE INDEX IF NOT EXISTS idx_themes_status ON reels_themes(status);
            CREATE INDEX IF NOT EXISTS idx_themes_week ON reels_themes(year, week_number);
        """)
        self.conn.commit()

    def insert_theme(self, theme: ThemeRecord) -> None:
        self.conn.execute(
            """INSERT OR REPLACE INTO reels_themes
               (id, title, angle, source_trend, status, relevance_score,
                week_number, year, produced_at, script_path, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                theme.id,
                theme.title,
                theme.angle,
                theme.source_trend,
                theme.status,
                theme.relevance_score,
                theme.week_number,
                theme.year,
                theme.produced_at.isoformat() if theme.produced_at else None,
                theme.script_path,
                datetime.now(timezone.utc).isoformat(),
            ),
        )
        self.conn.commit()

    def get_all_titles(self) -> list[str]:
        rows = self.conn.execute("SELECT title FROM reels_themes").fetchall()
        return [r["title"] for r in rows]

    def mark_produced(self, theme_id: str, script_path: str) -> None:
        self.conn.execute(
            "UPDATE reels_themes SET status = 'produced', script_path = ?, produced_at = ? WHERE id = ?",
            (script_path, datetime.now(timezone.utc).isoformat(), theme_id),
        )
        self.conn.commit()

    def close(self) -> None:
        self.conn.close()
