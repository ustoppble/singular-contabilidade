'use client'

const entregaImediata = [
  {
    titulo: 'Aula 1: Limites e Riscos do MEI',
    emoji: '🎓',
    itens: [
      'Limite anual de R$ 81.000 e a regra dos 20%',
      'Quando ocorre desenquadramento (não é só faturamento!)',
      'Como funciona fiscalização retroativa',
      'Por que o faturamento REAL é essencial',
    ],
  },
  {
    titulo: 'Aula 2: Como Organizar seu MEI para o Próximo Nível',
    emoji: '🚀',
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
              <span className="text-3xl">📚</span>
              Acesso imediato após a compra
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {entregaImediata.map((aula) => (
                <div key={aula.titulo} className="bg-white rounded-2xl p-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <span>{aula.emoji}</span>
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
                <span className="text-3xl">📊</span>
                Diagnóstico Personalizado
              </h3>
              <p className="text-white/70 mb-8 text-sm">
                Entregue em até 7 dias úteis — nossa equipe dedica pelo menos 1 hora de trabalho especializado analisando SEUS dados
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {diagnosticoItens.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5"
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
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BLOCO 3 - Suporte */}
          <div className="mb-12 pb-12 border-b border-border">
            <div className="flex items-start gap-4 bg-white rounded-2xl p-6">
              <span className="text-3xl">💬</span>
              <p className="text-lg text-text">
                <strong>5 dias úteis de suporte via WhatsApp</strong> após a entrega para tirar todas as suas dúvidas sobre o relatório.
              </p>
            </div>
          </div>

          {/* BLOCO 4 - Preço */}
          <div className="text-center mb-12 pb-12 border-b border-border">
            <p className="text-text-muted mb-8 max-w-[500px] mx-auto">
              Se esse diagnóstico custasse R$ 1.000, ainda seria barato comparado ao custo de descobrir tarde.
            </p>

            <div className="mb-4">
              <span className="font-display text-6xl md:text-7xl text-primary">R$ 187</span>
              <span className="text-2xl text-text-muted">,00</span>
            </div>

            <p className="text-text-muted">
              Menos do que você paga de DAS em 3 meses
            </p>
          </div>

          {/* BLOCO 5 - Garantia */}
          <div className="mb-12">
            <div className="bg-success/10 rounded-2xl p-8 border border-success/20">
              <h4 className="font-display text-xl mb-4 flex items-center gap-3 text-success">
                <span className="text-3xl">🛡️</span>
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
