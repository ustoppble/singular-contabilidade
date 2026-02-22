"use client";

import { useState } from "react";
import type { ScriptFile } from "@/lib/content-reader";
import ScriptCard from "@/components/dashboard/ScriptCard";
import ScriptModal from "@/components/dashboard/ScriptModal";

interface Props {
  scripts: ScriptFile[];
}

export default function OverviewScripts({ scripts }: Props) {
  const [selected, setSelected] = useState<ScriptFile | null>(null);

  return (
    <div>
      <h3 className="font-display text-lg text-text mb-4">Ultimos Roteiros</h3>
      <div className="space-y-3">
        {scripts.slice(0, 5).map((script) => (
          <ScriptCard
            key={script.slug}
            script={script}
            onClick={() => setSelected(script)}
          />
        ))}
        {scripts.length === 0 && (
          <div className="bg-white rounded-2xl border border-border p-8 text-center">
            <p className="text-text-muted text-sm">Nenhum roteiro gerado ainda</p>
          </div>
        )}
      </div>
      <ScriptModal script={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
