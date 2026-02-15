const casos = [
  {
    resultado: 'Economia de R$ 8.000',
    texto:
      'Lucas nos procurou achando que teria que virar Simples Nacional e pagar impostos retroativos do ano inteiro. Com o diagnóstico detalhado, descobrimos uma possibilidade totalmente LEGAL: reorganizar as operações para ele ultrapassar só em janeiro do ano seguinte. Resultado? R$ 8.000 economizados só de impostos.',
    nome: 'Lucas Soares',
    cargo: 'Consultor de TI',
  },
  {
    resultado: '+2 anos como MEI',
    texto:
      'Muriel controlava o faturamento direitinho. Sempre dentro do limite. Mas quando fizemos o diagnóstico completo, descobrimos que ela estava prestes a desenquadrar pelo LIMITE DE COMPRAS. Quase ninguém sabe que MEI tem limite de compras. Com planejamento adequado, mantivemos ela como MEI por MAIS 2 ANOS.',
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
              className="bg-cream rounded-3xl p-10 relative"
            >
              {/* Quote mark */}
              <div className="absolute top-8 right-8 font-display text-7xl text-accent leading-none">
                &ldquo;
              </div>

              {/* Result badge - mais proeminente */}
              <div className="inline-flex items-center gap-2 px-5 py-3 bg-success/15 text-success rounded-full text-base font-bold mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
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
                {caso.resultado}
              </div>

              <p className="text-lg leading-relaxed text-text mb-8">{caso.texto}</p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {caso.nome.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-lg">{caso.nome}</div>
                  <div className="text-text-muted">{caso.cargo}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
