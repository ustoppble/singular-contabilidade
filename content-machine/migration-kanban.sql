-- Kanban: Adiciona novos status para rastreamento pos-roteiro
-- Execute no SQL Editor do Supabase Dashboard

-- Remove constraint antigo e adiciona com novos status
ALTER TABLE public.reels_themes DROP CONSTRAINT IF EXISTS reels_themes_status_check;

ALTER TABLE public.reels_themes ADD CONSTRAINT reels_themes_status_check
    CHECK (status IN ('pending', 'approved', 'produced', 'rejected', 'script', 'recorded', 'edited', 'posted'));

-- Migra roteiros existentes com status 'produced' para 'script' (coluna Roteiro do Kanban)
-- Descomente a linha abaixo se quiser migrar automaticamente:
-- UPDATE public.reels_themes SET status = 'script' WHERE status = 'produced';
