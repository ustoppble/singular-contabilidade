import PipelineStatus from "@/components/dashboard/PipelineStatus";

export default function PipelinePage() {
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-text">Pipeline</h1>
        <p className="text-text-muted text-sm mt-1">
          Controle e execucao do pipeline de conteudo
        </p>
      </div>

      <PipelineStatus />
    </div>
  );
}
