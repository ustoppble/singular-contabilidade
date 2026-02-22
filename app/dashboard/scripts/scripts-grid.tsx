"use client";

import { useState } from "react";
import type { ScriptFile } from "@/lib/content-reader";
import ScriptCard from "@/components/dashboard/ScriptCard";
import ScriptModal from "@/components/dashboard/ScriptModal";

interface Props {
  scripts: ScriptFile[];
}

export default function ScriptsGrid({ scripts: initialScripts }: Props) {
  const [scripts, setScripts] = useState(initialScripts);
  const [selected, setSelected] = useState<ScriptFile | null>(null);

  function handleDelete(slug: string) {
    setScripts((prev) => prev.filter((s) => s.slug !== slug));
    setSelected(null);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scripts.map((script) => (
          <ScriptCard
            key={script.slug}
            script={script}
            onClick={() => setSelected(script)}
          />
        ))}
      </div>

      {scripts.length === 0 && (
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <p className="text-text-muted text-sm">
            Nenhum roteiro gerado. Execute o pipeline primeiro.
          </p>
        </div>
      )}

      <ScriptModal
        script={selected}
        onClose={() => setSelected(null)}
        onDelete={handleDelete}
      />
    </>
  );
}
