'use client'

const casos = [
  {
    resultado: 'R$ 8.000',
    subtitulo: 'economizados em impostos',
    contexto: 'Lucas nos procurou achando que teria que virar Simples Nacional e pagar impostos retroativos do ano inteiro.',
    solucao: 'Com o diagnóstico detalhado, descobrimos uma possibilidade totalmente',
    destaque: 'LEGAL',
    continuacao: ': reorganizar as operações para ele ultrapassar só em janeiro do ano seguinte.',
    conclusao: 'Resultado? R$ 8.000 economizados só de impostos.',
    nome: 'Lucas Soares',
    cargo: 'Consultor de TI',
  },
  {
    resultado: '+2 anos',
    subtitulo: 'continuando como MEI',
    contexto: 'Muriel controlava o faturamento direitinho. Sempre dentro do limite.',
    solucao: 'Mas quando fizemos o diagnóstico completo, descobrimos que ela estava prestes a desenquadrar pelo',
    destaque: 'LIMITE DE COMPRAS',
    continuacao: '. Quase ninguém sabe que MEI tem limite de compras.',
    conclusao: 'Com planejamento adequado, mantivemos ela como MEI por MAIS 2 ANOS.',
    nome: 'Muriel Pistor',
    cargo: 'Loja de Artesanato',
  },
]

export default function Provas() {
  return (
    <section id="provas" className="py-24 bg-white">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <span className="inline-block text-xs text-secondary uppercase tracking-[0.15em] font-semibold mb-4">
            Casos reais
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] mb-6">
            Veja o que acontece quando você descobre a tempo
          </h2>
          <p className="text-text-muted text-lg">
            Esses dois não são exceção. Eles são a <strong className="text-text font-semibold">REGRA</strong>. A maioria dos MEIs está nessa situação agora mesmo.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {casos.map((caso) => (
            <div
              key={caso.nome}
              className="bg-cream rounded-3xl overflow-hidden"
            >
              {/* Header com resultado */}
              <div className="bg-success/10 p-8 border-b border-success/20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display text-4xl text-success">{caso.resultado}</div>
                    <div className="text-success/80 text-sm">{caso.subtitulo}</div>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-8">
                {/* Quote mark */}
                <div className="font-display text-6xl text-accent leading-none mb-4">
                  &ldquo;
                </div>

                {/* Contexto */}
                <p className="text-text-muted leading-relaxed mb-4">
                  {caso.contexto}
                </p>

                {/* Solução com destaque */}
                <p className="text-text leading-relaxed mb-4">
                  {caso.solucao}{' '}
                  <span className="bg-secondary/20 text-primary font-bold px-2 py-0.5 rounded">
                    {caso.destaque}
                  </span>
                  {caso.continuacao}
                </p>

                {/* Conclusão */}
                <p className="text-success font-semibold text-lg">
                  {caso.conclusao}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {caso.nome.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{caso.nome}</div>
                    <div className="text-text-muted text-sm">{caso.cargo}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
