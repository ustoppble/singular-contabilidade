import { getAllScripts } from "@/lib/content-reader";
import ScriptsGrid from "./scripts-grid";

export const dynamic = "force-dynamic";

export default async function ScriptsPage() {
  const scripts = await getAllScripts();

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-text">Roteiros</h1>
        <p className="text-text-muted text-sm mt-1">
          Todos os roteiros de Reels gerados
        </p>
      </div>

      <ScriptsGrid scripts={scripts} />
    </div>
  );
}
