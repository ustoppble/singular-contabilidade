"use client";

import { useState, useEffect } from "react";

const PROMPT_META: Record<string, { label: string; description: string }> = {
  gerador: {
    label: "Gerador de Roteiros",
    description: "Prompt usado quando voce cola um texto e clica em Gerar Roteiro.",
  },
  pipeline: {
    label: "Pipeline Automatico",
    description: "Prompt usado pelo pipeline quando gera roteiros a partir de trends.",
  },
};

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("gerador");

  useEffect(() => {
    fetch("/api/prompts")
      .then((r) => r.json())
      .then((data) => {
        setPrompts(data);
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prompts),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-2xl text-text">Prompts</h1>
          <p className="text-text-muted text-sm mt-1">Carregando...</p>
        </div>
      </div>
    );
  }

  const meta = PROMPT_META[activeTab];

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-text">Prompts</h1>
        <p className="text-text-muted text-sm mt-1">
          Edite os prompts usados na geracao de roteiros
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        {Object.entries(PROMPT_META).map(([key, m]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
              activeTab === key
                ? "bg-primary text-white"
                : "text-text-muted hover:bg-black/5"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-sm font-medium text-text">{meta.label}</h2>
          <p className="text-text-muted text-xs mt-1">{meta.description}</p>
        </div>

        <textarea
          value={prompts[activeTab] || ""}
          onChange={(e) =>
            setPrompts((prev) => ({ ...prev, [activeTab]: e.target.value }))
          }
          rows={20}
          className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-sm text-text font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary resize-y"
        />

        <div className="flex items-center justify-between mt-4">
          <div>
            {saved && (
              <span className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Salvo com sucesso
              </span>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-secondary text-white text-sm font-medium rounded-xl hover:bg-secondary/90 transition-all duration-250 disabled:opacity-40 flex items-center gap-2"
          >
            {saving ? "Salvando..." : "Salvar Prompt"}
          </button>
        </div>
      </div>
    </div>
  );
}
