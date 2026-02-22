-- Content Machine: Migration para Supabase
-- Execute no SQL Editor do Supabase Dashboard
-- Projeto: jzkuuymhnrnnnrwkmrih

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS public.reels_themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    angle TEXT NOT NULL,
    source_trend TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'approved', 'produced', 'rejected')),
    relevance_score REAL DEFAULT 0.0,
    week_number INTEGER NOT NULL,
    year INTEGER NOT NULL,
    produced_at TIMESTAMPTZ,
    script_path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reels_themes_status ON public.reels_themes(status);
CREATE INDEX IF NOT EXISTS idx_reels_themes_week ON public.reels_themes(year, week_number);
CREATE INDEX IF NOT EXISTS idx_reels_themes_title_trgm ON public.reels_themes USING gin (title gin_trgm_ops);

ALTER TABLE public.reels_themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_full_access" ON public.reels_themes
    FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION update_reels_themes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reels_themes_updated_at
    BEFORE UPDATE ON public.reels_themes
    FOR EACH ROW
    EXECUTE FUNCTION update_reels_themes_updated_at();
