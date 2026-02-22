"use client";

import { useState } from "react";

export default function PipelineStatus() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [depth, setDepth] = useState<"quick" | "deep">("quick");

  async function runPipeline() {
    setRunning(true);
    setLogs(["Iniciando pipeline..."]);

    try {
      const res = await fetch("/api/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ depth }),
      });
      const data = await res.json();

      if (data.success) {
        setLogs((prev) => [...prev, ...data.logs, "Pipeline concluido!"]);
      } else {
        setLogs((prev) => [...prev, `Erro: ${data.error}`]);
      }
    } catch (err) {
      setLogs((prev) => [...prev, `Erro de conexao: ${err}`]);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 className="font-display text-lg text-text mb-4">
          Executar Pipeline
        </h3>

        <div className="flex items-center gap-4 mb-4">
          <div>
            <label className="block text-xs text-text-muted mb-1 font-medium">
              Profundidade
            </label>
            <select
              value={depth}
              onChange={(e) => setDepth(e.target.value as "quick" | "deep")}
              className="bg-cream border border-border rounded-xl px-4 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-secondary/30"
              disabled={running}
            >
              <option value="quick">Semanal (quick)</option>
              <option value="deep">Mensal (deep)</option>
            </select>
          </div>
        </div>

        <button
          onClick={runPipeline}
          disabled={running}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-250 ${
            running
              ? "bg-border text-text-muted cursor-not-allowed"
              : "bg-secondary text-primary hover:bg-accent hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          }`}
        >
          {running ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.42 31.42" />
              </svg>
              Executando...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Rodar Pipeline
            </>
          )}
        </button>
      </div>

      {/* Logs */}
      {logs.length > 0 && (
        <div className="bg-primary rounded-2xl p-6">
          <h4 className="text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Output
          </h4>
          <div className="font-mono text-xs text-white/80 space-y-1 max-h-80 overflow-y-auto">
            {logs.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}

      {/* Pipeline Steps Info */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 className="font-display text-lg text-text mb-4">
          Etapas do Pipeline
        </h3>
        <div className="space-y-3">
          {[
            { step: "Scout", desc: "Busca trends via Perplexity API", icon: "1" },
            { step: "Curator", desc: "Valida duplicatas no banco", icon: "2" },
            { step: "Strategist", desc: "Rankeia por relevancia ao avatar", icon: "3" },
            { step: "Writer", desc: "Gera roteiros via Claude API", icon: "4" },
            { step: "Curator", desc: "Registra temas produzidos", icon: "5" },
          ].map((item) => (
            <div key={item.icon} className="flex items-center gap-3 p-3 rounded-xl bg-cream/50">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                {item.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-text">{item.step}</p>
                <p className="text-[11px] text-text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
