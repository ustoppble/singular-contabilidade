"""Modelos Pydantic compartilhados entre todos os agentes."""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class ScanDepth(str, Enum):
    QUICK = "quick"
    DEEP = "deep"


class TrendItem(BaseModel):
    """Output do Scout — uma trend descoberta."""

    topic: str
    title: str
    summary: str
    source_urls: list[str] = []
    relevance_keywords: list[str] = []
    discovered_at: datetime = Field(default_factory=datetime.utcnow)
    scan_depth: ScanDepth = ScanDepth.QUICK


class ThemeRecord(BaseModel):
    """Registro no banco do Curator."""

    id: Optional[str] = None
    title: str
    angle: str
    source_trend: str = ""
    status: str = "pending"
    relevance_score: float = 0.0
    week_number: int = 0
    year: int = 0
    produced_at: Optional[datetime] = None
    script_path: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class RankedTheme(BaseModel):
    """Output do Strategist — tema ranqueado com ângulo editorial."""

    theme: ThemeRecord
    editorial_angle: str
    hook_suggestion: str
    target_emotion: str
    relevance_score: float


class ReelsScript(BaseModel):
    """Output do Writer — roteiro completo de Reels."""

    theme_id: str = ""
    title: str
    hook: str
    contexto: str
    virada: str
    cta: str
    full_teleprompter: str = ""
    hashtags: list[str] = []
    estimated_duration_seconds: int = 50
    generated_at: datetime = Field(default_factory=datetime.utcnow)
