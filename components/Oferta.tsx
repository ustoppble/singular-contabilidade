'use client'

// Ícones SVG consistentes
const IconBook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
)

const IconAcademic = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
)

const IconRocket = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
)

const IconChart = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
)

const IconChat = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
  </svg>
)

const IconShield = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
)

const IconCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const entregaImediata = [
  {
    titulo: 'Aula 1: Limites e Riscos do MEI',
    icon: IconAcademic,
    itens: [
      'Limite anual de R$ 81.000 e a regra dos 20%',
      'Quando ocorre desenquadramento (não é só faturamento!)',
      'Como funciona fiscalização retroativa',
      'Por que o faturamento REAL é essencial',
    ],
  },
  {
    titulo: 'Aula 2: Como Organizar seu MEI para o Próximo Nível',
    icon: IconRocket,
    itens: [
      'Separação entre dinheiro da empresa e pessoal',
      'Como organizar compras e despesas',
      'Como acompanhar seu faturamento mês a mês',
      'Como evitar surpresas no final do ano',
    ],
  },
]

const diagnosticoItens = [
  'Análise completa do faturamento (com e sem nota fiscal)',
  'Apuração com base bancária (conta PJ do último ano)',
  'Verificação da situação fiscal na Receita Federal',
  'Verificação cadastral municipal (para prestadores de serviço)',
  'Emissão do CCMEI atualizado',
  'Classificação da atividade + orientação para emissão de NF',
  'Relatório completo com diagnóstico e próximos passos',
  'Planilha de controle do MEI para você nunca mais ficar no escuro',
]

export default function Oferta() {
  return (
    <section id="oferta" className="py-24 bg-white">
      <div className="w-full max-w-[900px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs text-secondary uppercase tracking-[0.15em] font-semibold mb-4">
            A solução
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] mb-6">
            Diagnóstico Estratégico do MEI
          </h2>
          <p className="text-text-muted text-lg max-w-[600px] mx-auto">
            Tudo que você precisa para descobrir a verdade sobre seu MEI antes da Receita Federal
          </p>
        </div>

        {/* Card principal */}
        <div className="bg-cream rounded-3xl p-8 md:p-12 border-2 border-border">

          {/* BLOCO 1 - Entrega Imediata */}
          <div className="mb-12 pb-12 border-b border-border">
            <h3 className="font-display text-2xl mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <IconBook className="w-5 h-5 text-white" />
              </div>
              Acesso imediato após a compra
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {entregaImediata.map((aula) => (
                <div key={aula.titulo} className="bg-white rounded-2xl p-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <aula.icon className="w-4 h-4 text-secondary" />
                    </div>
                    {aula.titulo}
                  </h4>
                  <ul className="space-y-3">
                    {aula.itens.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-text-muted">
                        <span className="text-secondary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* BLOCO 2 - Diagnóstico Personalizado */}
          <div className="mb-12 pb-12 border-b border-border">
            <div className="bg-primary text-white rounded-2xl p-8">
              <h3 className="font-display text-2xl mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <IconChart className="w-5 h-5 text-white" />
                </div>
                Diagnóstico Personalizado
              </h3>
              <p className="text-white/70 mb-8 text-sm">
                Entregue em até 7 dias úteis — nossa equipe dedica pelo menos 1 hora de trabalho especializado analisando SEUS dados
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {diagnosticoItens.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <IconCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BLOCO 3 - Suporte */}
          <div className="mb-12 pb-12 border-b border-border">
            <div className="flex items-start gap-4 bg-white rounded-2xl p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <IconChat className="w-6 h-6 text-primary" />
              </div>
              <p className="text-lg text-text">
                <strong>5 dias úteis de suporte via WhatsApp</strong> após a entrega para tirar todas as suas dúvidas sobre o relatório.
              </p>
            </div>
          </div>

          {/* BLOCO 4 - Preço (destaque principal) */}
          <div className="mb-12 pb-12 border-b border-border">
            <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-10 text-center text-white relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/20 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/10 rounded-full" />

              <p className="text-white/80 mb-6 max-w-[500px] mx-auto relative z-10">
                Se esse diagnóstico custasse R$ 1.000, ainda seria barato comparado ao custo de descobrir tarde.
              </p>

              <div className="mb-2 relative z-10">
                <span className="text-white/60 text-lg line-through mr-3">R$ 497</span>
                <span className="font-display text-6xl md:text-8xl text-white">R$ 187</span>
              </div>

              <p className="text-secondary font-semibold text-lg relative z-10">
                Menos do que você paga de DAS em 3 meses
              </p>
            </div>
          </div>

          {/* BLOCO 5 - Garantia */}
          <div className="mb-12">
            <div className="bg-success/10 rounded-2xl p-8 border border-success/20">
              <h4 className="font-display text-xl mb-4 flex items-center gap-3 text-success">
                <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                  <IconShield className="w-5 h-5 text-success" />
                </div>
                Garantia de 7 dias sem risco
              </h4>
              <p className="text-text leading-relaxed">
                Você recebe <strong>IMEDIATAMENTE</strong> as 2 aulas estratégicas. Se por <strong>QUALQUER motivo</strong> não quiser mais fazer o diagnóstico completo, tem <strong>7 DIAS</strong> para solicitar cancelamento. Reembolso de 100%. Sem perguntas. Sem burocracia.
              </p>
            </div>
          </div>

          {/* CTA Principal */}
          <div className="text-center">
            <a
              href="https://pay.hotmart.com/SEULINK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-secondary text-primary text-xl font-bold rounded-xl hover:bg-accent hover:-translate-y-1 hover:shadow-xl transition-all duration-250"
            >
              Quero meu Diagnóstico por R$ 187
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

            <p className="text-text-light text-sm mt-4">
              Pagamento seguro via Hotmart
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
