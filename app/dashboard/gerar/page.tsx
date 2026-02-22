"use client";

import { useState } from "react";

const SECTION_LABELS: Record<string, { label: string; color: string }> = {
  hook: { label: "HOOK (2s)", color: "text-red-600 bg-red-50" },
  contexto: { label: "CONTEXTO (10s)", color: "text-blue-600 bg-blue-50" },
  virada: { label: "VIRADA", color: "text-amber-600 bg-amber-50" },
  cta: { label: "CTA", color: "text-green-600 bg-green-50" },
};

function parseSections(raw: string) {
  const sections: { key: string; text: string }[] = [];
  let currentKey = "";
  const lines: string[] = [];

  for (const line of raw.split("\n")) {
    const lower = line.toLowerCase().trim();
    if (lower.startsWith("## hook")) {
      if (currentKey) sections.push({ key: currentKey, text: lines.join("\n").trim() });
      currentKey = "hook";
      lines.length = 0;
    } else if (lower.startsWith("## contexto") || lower.startsWith("## context")) {
      if (currentKey) sections.push({ key: currentKey, text: lines.join("\n").trim() });
      currentKey = "contexto";
      lines.length = 0;
    } else if (lower.startsWith("## virada") || lower.startsWith("## twist")) {
      if (currentKey) sections.push({ key: currentKey, text: lines.join("\n").trim() });
      currentKey = "virada";
      lines.length = 0;
    } else if (lower.startsWith("## cta")) {
      if (currentKey) sections.push({ key: currentKey, text: lines.join("\n").trim() });
      currentKey = "cta";
      lines.length = 0;
    } else {
      lines.push(line);
    }
  }
  if (currentKey) sections.push({ key: currentKey, text: lines.join("\n").trim() });

  return sections;
}

function extractHashtags(raw: string): string[] {
  const tags: string[] = [];
  for (const word of raw.split(/\s+/)) {
    if (word.startsWith("#") && word.length > 1) {
      tags.push(word.replace(/[.,;]+$/, ""));
    }
  }
  return tags.slice(0, 7);
}

export default function GerarPage() {
  const [text, setText] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<{ week: number; year: number } | null>(null);

  async function handleGenerate() {
    if (text.trim().length < 10) {
      setError("Escreva pelo menos uma frase para gerar o roteiro.");
      return;
    }

    setLoading(true);
    setError("");
    setScript("");

    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao gerar roteiro.");
        return;
      }

      setScript(data.script);
      // Init editable sections
      const map: Record<string, string> = {};
      for (const s of parseSections(data.script)) {
        map[s.key] = s.text;
      }
      setEditingSections(map);
      setSaved(null);
    } catch {
      setError("Erro de conexao. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/save-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script }),
      });
      const data = await res.json();
      if (res.ok) {
        setSaved({ week: data.week, year: data.year });
      } else {
        setError(data.error || "Erro ao salvar.");
      }
    } catch {
      setError("Erro ao salvar roteiro.");
    } finally {
      setSaving(false);
    }
  }

  const [editingSections, setEditingSections] = useState<Record<string, string>>({});

  // Sync editing sections when script changes
  const sections = script ? parseSections(script) : [];
  const hashtags = script ? extractHashtags(script) : [];

  function initEditing() {
    const map: Record<string, string> = {};
    for (const s of parseSections(script)) {
      map[s.key] = s.text;
    }
    setEditingSections(map);
  }

  function updateSection(key: string, value: string) {
    setEditingSections((prev) => ({ ...prev, [key]: value }));
    // Rebuild full script from edited sections
    const updated = { ...editingSections, [key]: value };
    const sectionOrder = ["hook", "contexto", "virada", "cta"];
    const headerMap: Record<string, string> = {
      hook: "## HOOK (2 segundos - deve parar o scroll)",
      contexto: "## CONTEXTO (10 segundos)",
      virada: "## VIRADA (informacao que surpreende)",
      cta: "## CTA (chamada para acao)",
    };
    const parts = sectionOrder
      .filter((k) => updated[k] !== undefined)
      .map((k) => `${headerMap[k]}\n${updated[k]}`);
    // Preserve hashtags at the end
    const tagLine = hashtags.join(" ");
    const rebuilt = parts.join("\n\n") + (tagLine ? `\n\n${tagLine}` : "");
    setScript(rebuilt);
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-text">Gerar Roteiro</h1>
        <p className="text-text-muted text-sm mt-1">
          Cole seu texto e gere um roteiro de Reels automaticamente
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
          <label className="block text-sm font-medium text-text mb-2">
            Seu texto
          </label>
          <p className="text-text-muted text-xs mb-4">
            Cole um case de cliente, noticia, insight, dica — qualquer texto que
            voce quer transformar em Reels.
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ex: Tenho um case pra compartilhar — um cliente MEI que faturou R$95 mil no ano, mas nao sabia que precisava declarar o DASN-SIMEI..."
            rows={12}
            className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary resize-none"
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-text-light text-xs">
              {text.length} caracteres
            </span>
            <button
              onClick={handleGenerate}
              disabled={loading || text.trim().length < 10}
              className="px-6 py-2.5 bg-secondary text-white text-sm font-medium rounded-xl hover:bg-secondary/90 transition-all duration-250 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Gerando...
                </>
              ) : (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Gerar Roteiro
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-red-600 text-xs bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>

        {/* Output */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-text">Roteiro Gerado</h2>
            {script && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="text-xs text-text-muted hover:text-secondary transition-all flex items-center gap-1.5"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {copied ? "Copiado!" : "Copiar"}
                </button>
                {saved ? (
                  <span className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Semana {saved.week}/{saved.year}
                  </span>
                ) : (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="text-xs text-white bg-primary hover:bg-primary/90 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    {saving ? "Salvando..." : "Adicionar a semana"}
                  </button>
                )}
              </div>
            )}
          </div>

          {!script && !loading && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-border mb-3"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <p className="text-text-muted text-sm">
                O roteiro aparecera aqui
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg
                className="animate-spin w-8 h-8 text-secondary mb-3"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <p className="text-text-muted text-sm">Gerando roteiro...</p>
            </div>
          )}

          {script && sections.length > 0 && (
            <div className="space-y-5">
              {sections.map((section, i) => {
                const meta = SECTION_LABELS[section.key];
                if (!meta) return null;

                return (
                  <div key={i}>
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-2 ${meta.color}`}
                    >
                      {meta.label}
                    </span>
                    <textarea
                      value={editingSections[section.key] ?? section.text}
                      onChange={(e) => updateSection(section.key, e.target.value)}
                      rows={Math.max(3, (editingSections[section.key] ?? section.text).split("\n").length + 1)}
                      className="w-full text-text text-[15px] leading-relaxed bg-transparent border border-transparent hover:border-border focus:border-secondary/30 focus:bg-cream/30 rounded-lg px-2 py-1.5 resize-none transition-all focus:outline-none"
                    />
                  </div>
                );
              })}

              {hashtags.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-1.5">
                    {hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-secondary bg-secondary/10 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
