'use client'

// Ícones SVG consistentes (mesmo padrão do Oferta.tsx)
const IconXCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const IconExclamation = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
)

const IconCheckCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const alternativas = [
  {
    icone: IconXCircle,
    titulo: 'Ignorar tudo',
    texto:
      'Continuar achando que está tudo certo. Seguir controlando "mais ou menos" o faturamento. E torcer para não estar entre os 4 milhões de MEIs que são excluídos todo ano. Torcer para não receber aquela notificação da Receita Federal daqui 2, 3 anos cobrando retroativo.',
    rodape: 'Você já viu onde isso pode levar.',
    estilo: 'neutro',
    order: 'order-2 md:order-1',
  },
  {
    icone: IconExclamation,
    titulo: 'Tentar sozinho',
    texto:
      'Pesquisar na internet. Assistir vídeos no YouTube. Talvez pagar uma consultoria avulsa de 1 hora. O problema? Sem os SEUS números na mão, sem análise da SUA situação específica, orientação genérica não resolve. E tem MUITA informação errada na internet.',
    rodape: 'Lembra da cliente dos 40 mil de multa?',
    estilo: 'intermediario',
    order: 'order-3 md:order-2',
  },
  {
    icone: IconCheckCircle,
    titulo: 'Garantir seu diagnóstico',
    texto:
      'Investir R$ 187 e ter nas suas mãos: análise completa da SUA situação real, clareza sobre SEUS riscos específicos, caminho claro do que VOCÊ precisa fazer, planilha para nunca mais ficar no escuro, e suporte para tirar todas as dúvidas.',
    destaque: 'Com 7 dias de garantia para decidir com calma.',
    rodape: 'Qual dessas parece mais segura para você?',
    estilo: 'destacado',
    order: 'order-1 md:order-3',
  },
]

export default function Fechamento() {
  return (
    <section id="fechamento" className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs text-secondary uppercase tracking-[0.15em] font-semibold mb-4">
            Sua decisão
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)]">
            Agora você tem 3 alternativas
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {alternativas.map((alt) => (
            <div
              key={alt.titulo}
              className={`rounded-2xl p-8 flex flex-col ${alt.order} ${
                alt.estilo === 'destacado'
                  ? 'bg-white text-text border-4 border-secondary shadow-xl md:scale-105'
                  : alt.estilo === 'intermediario'
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-white/5 border border-white/10 opacity-80'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                alt.estilo === 'destacado'
                  ? 'bg-success/20'
                  : alt.estilo === 'intermediario'
                  ? 'bg-secondary/20'
                  : 'bg-white/10'
              }`}>
                <alt.icone className={`w-6 h-6 ${
                  alt.estilo === 'destacado'
                    ? 'text-success'
                    : alt.estilo === 'intermediario'
                    ? 'text-secondary'
                    : 'text-white/60'
                }`} />
              </div>

              <h3
                className={`font-display text-2xl mb-4 ${
                  alt.estilo === 'destacado' ? 'text-primary' : 'text-white'
                }`}
              >
                {alt.titulo}
              </h3>

              <p
                className={`leading-relaxed mb-6 flex-grow ${
                  alt.estilo === 'destacado' ? 'text-text-muted' : 'text-white/80'
                }`}
              >
                {alt.texto}
              </p>

              {alt.destaque && (
                <p className="text-success font-semibold mb-4 bg-success/10 px-4 py-2 rounded-lg">
                  {alt.destaque}
                </p>
              )}

              <p
                className={`text-sm pt-4 border-t ${
                  alt.estilo === 'destacado'
                    ? 'border-border text-primary font-semibold'
                    : 'border-white/10 text-white/60 italic'
                }`}
              >
                {alt.rodape}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <a
            href="https://pay.hotmart.com/SEULINK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-secondary text-primary text-xl font-bold rounded-xl hover:bg-accent hover:-translate-y-1 hover:shadow-xl transition-all duration-250"
          >
            Quero descobrir a verdade sobre meu MEI
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>

          <p className="text-white/60 text-sm mt-4">
            Por apenas R$ 187 • Garantia de 7 dias • Entrega em até 7 dias úteis
          </p>

          <p className="text-white/80 text-lg mt-12 max-w-[700px] mx-auto leading-relaxed">
            Nos próximos 7 dias úteis, você vai ter em mãos a verdade sobre seu MEI. E vai poder dormir tranquilo sabendo exatamente onde está. <strong className="text-secondary">Antes da Receita Federal aparecer.</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
