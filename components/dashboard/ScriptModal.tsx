"use client";

import { useEffect, useState } from "react";
import type { ScriptFile } from "@/lib/content-reader";

const SECTION_ICONS: Record<string, { label: string; color: string }> = {
  hook: { label: "HOOK (2s)", color: "text-red-600 bg-red-50" },
  contexto: { label: "CONTEXTO (10s)", color: "text-blue-600 bg-blue-50" },
  virada: { label: "VIRADA", color: "text-amber-600 bg-amber-50" },
  cta: { label: "CTA", color: "text-green-600 bg-green-50" },
};

interface ScriptModalProps {
  script: ScriptFile | null;
  onClose: () => void;
  onDelete?: (slug: string) => void;
}

export default function ScriptModal({ script, onClose, onDelete }: ScriptModalProps) {
  const [editing, setEditing] = useState(false);
  const [editedSections, setEditedSections] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (script) {
      setEditedSections({ ...script.sections });
      setEditing(false);
      setSaveStatus("idle");
      setConfirmDelete(false);
    }
  }, [script]);

  if (!script) return null;

  const { frontmatter, sections } = script;

  function handleEdit() {
    setEditing(true);
    setEditedSections({ ...sections });
  }

  function handleCancel() {
    setEditing(false);
    setEditedSections({ ...sections });
    setSaveStatus("idle");
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/edit-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: script!.slug,
          week: frontmatter.week,
          year: frontmatter.year,
          sections: editedSections,
        }),
      });
      if (res.ok) {
        setSaveStatus("saved");
        setEditing(false);
        // Update the script sections in-place
        script!.sections.hook = editedSections.hook || "";
        script!.sections.contexto = editedSections.contexto || "";
        script!.sections.virada = editedSections.virada || "";
        script!.sections.cta = editedSections.cta || "";
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      const res = await fetch(
        `/api/scripts?slug=${encodeURIComponent(script!.slug)}&week=${frontmatter.week}&year=${frontmatter.year}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        onDelete?.(script!.slug);
        onClose();
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  const displaySections = editing ? editedSections : sections;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative bg-cream rounded-3xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-cream/95 backdrop-blur-sm p-6 pb-4 border-b border-border z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-xl text-text leading-snug">
                {frontmatter.title}
              </h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
                <span>Sem. {frontmatter.week}/{frontmatter.year}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>{frontmatter.duration_estimate}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="text-secondary font-semibold">
                  Score: {(frontmatter.relevance_score * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {!editing ? (
                <>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className={`h-8 flex items-center justify-center rounded-full transition-all text-xs px-2 ${
                    confirmDelete
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "hover:bg-black/5 text-text-muted"
                  }`}
                  title="Deletar"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  {confirmDelete && <span className="ml-1">{deleting ? "..." : "Confirmar?"}</span>}
                </button>
                <button
                  onClick={handleEdit}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-all text-text-muted"
                  title="Editar"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="text-xs text-text-muted hover:text-text px-3 py-1.5 rounded-lg hover:bg-black/5 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="text-xs text-white bg-secondary hover:bg-secondary/90 px-3 py-1.5 rounded-lg transition-all disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {saving ? "Salvando..." : "Salvar"}
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-all text-text-muted"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {saveStatus === "saved" && (
            <p className="text-xs text-green-600 bg-green-50 rounded-lg px-3 py-1.5 mt-3">
              Roteiro salvo com sucesso.
            </p>
          )}
          {saveStatus === "error" && (
            <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-1.5 mt-3">
              Erro ao salvar. Tente novamente.
            </p>
          )}
        </div>

        {/* Teleprompter */}
        <div className="p-6 space-y-5">
          {(["hook", "contexto", "virada", "cta"] as const).map((key) => {
            const meta = SECTION_ICONS[key];
            const text = displaySections[key];
            if (!text && !editing) return null;

            return (
              <div key={key}>
                <span
                  className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-2 ${meta.color}`}
                >
                  {meta.label}
                </span>
                {editing ? (
                  <textarea
                    value={editedSections[key] || ""}
                    onChange={(e) =>
                      setEditedSections((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    rows={Math.max(3, (editedSections[key] || "").split("\n").length + 1)}
                    className="w-full text-text text-[15px] leading-relaxed bg-white border border-border focus:border-secondary/40 rounded-lg px-3 py-2 resize-none transition-all focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                ) : (
                  <p className="text-text text-[15px] leading-relaxed whitespace-pre-line">
                    {text}
                  </p>
                )}
              </div>
            );
          })}

          {/* Angulo */}
          {frontmatter.angle && (
            <div className="pt-4 border-t border-border">
              <p className="text-text-light text-xs">
                <span className="font-medium text-text-muted">Angulo:</span>{" "}
                {frontmatter.angle}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
