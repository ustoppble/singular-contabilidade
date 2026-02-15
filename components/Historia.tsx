'use client'

import Image from 'next/image'

// Ícones SVG inline
const IconUser = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
)

const IconEye = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const IconExclamation = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
)

const IconLightbulb = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>
)

const blocos = [
  {
    icon: IconUser,
    titulo: 'Quem sou eu',
    texto: 'Meu nome é Luiza, sou sócia proprietária do Singular Contabilidade. Cresci dentro desse escritório — minha mãe fundou há',
    destaque: '30 anos',
    continuacao: '. Hoje trabalho principalmente com planejamento tributário de empresas maiores.',
  },
  {
    icon: IconEye,
    titulo: 'O que eu percebi',
    texto: 'Ao longo de 10 anos de atuação, percebi algo preocupante: o MEI era sempre quem',
    destaque: 'MAIS precisava de ajuda',
    continuacao: '... e quem MENOS tinha acesso a orientação adequada. Empresas grandes têm diagnósticos, auditorias, relatórios. Mas o MEI? Fica navegando no escuro.',
  },
  {
    icon: IconExclamation,
    titulo: 'O problema real',
    textoCompleto: true,
    conteudo: [
      { tipo: 'texto', valor: 'Mesmo quando eu dava ' },
      { tipo: 'strong', valor: '2 horas de consultoria gratuita' },
      { tipo: 'texto', valor: ' para um amigo MEI... uma semana depois as mesmas dúvidas voltavam. E pior: a internet está ' },
      { tipo: 'strong', valor: 'CHEIA de informação errada' },
      { tipo: 'texto', valor: '.' },
    ],
    callout: {
      texto: 'Eu vi amigos aplicando "jeitinhos" que viram online.',
      resultado: 'Multas de R$ 40 mil, R$ 100 mil... chegamos a atender um MEI com débito de mais de R$ 220 mil.',
    },
  },
  {
    icon: IconLightbulb,
    titulo: 'A sacada',
    texto: 'Foi aí que eu pensei: empresas grandes têm diagnósticos regulares. Por que o MEI não podia ter isso também? Não uma consultoria genérica. Mas um',
    destaque: 'DIAGNÓSTICO TÉCNICO',
    continuacao: ', com os números reais da empresa. Preto no branco.',
  },
]

export default function Historia() {
  return (
    <section id="historia" className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image */}
          <div className="relative lg:sticky lg:top-32 max-lg:order-1">
            <div className="rounded-3xl overflow-hidden">
              <Image
                src="/foto2.png"
                alt="Luiza - Singular Contabilidade"
                width={800}
                height={600}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            {/* Badge */}
            <div className="absolute -bottom-5 -right-5 bg-secondary text-primary p-6 rounded-2xl">
              <div className="font-display text-5xl leading-none">30</div>
              <div className="text-sm">anos de mercado</div>
            </div>
          </div>

          {/* Content */}
          <div className="max-lg:order-2">
            <span className="inline-block text-xs text-secondary uppercase tracking-[0.15em] font-semibold mb-4">
              Quem está por trás
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] mb-12">
              Por que eu criei esse diagnóstico
            </h2>

            {/* Blocos com ícones */}
            <div className="space-y-10">
              {blocos.map((bloco, index) => (
                <div key={index} className="flex gap-5">
                  {/* Ícone */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <bloco.icon className="w-6 h-6 text-secondary" />
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-secondary mb-3">
                      {bloco.titulo}
                    </h3>

                    {bloco.textoCompleto ? (
                      <>
                        <p className="text-white/85 leading-relaxed mb-4">
                          {bloco.conteudo?.map((parte, i) =>
                            parte.tipo === 'strong' ? (
                              <strong key={i} className="text-white font-semibold">{parte.valor}</strong>
                            ) : (
                              <span key={i}>{parte.valor}</span>
                            )
                          )}
                        </p>
                        {bloco.callout && (
                          <div className="bg-white/10 rounded-xl p-5 border-l-4 border-secondary">
                            <p className="text-white/70 text-sm mb-2">{bloco.callout.texto}</p>
                            <p className="text-white font-semibold">
                              Resultado? <span className="text-secondary">{bloco.callout.resultado}</span>
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-white/85 leading-relaxed">
                        {bloco.texto}
                        {bloco.destaque && (
                          <span className="text-secondary font-bold"> {bloco.destaque}</span>
                        )}
                        {bloco.continuacao}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bloco de destaque final */}
            <div className="mt-12 bg-gradient-to-r from-secondary/20 to-secondary/5 rounded-2xl p-8 border border-secondary/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center">
                    <span className="font-display text-2xl text-secondary">4M</span>
                  </div>
                </div>
                <div>
                  <p className="text-xl text-white font-semibold mb-2">
                    Só em 2025, mais de <span className="text-secondary">4 MILHÕES</span> de MEIs foram excluídos do regime.
                  </p>
                  <p className="text-white/70">
                    A maioria não fez isso por opção — foi por falta de conhecimento. E essas exclusões geram dívidas que vão carregar pro resto da vida.
                  </p>
                  <p className="text-secondary font-semibold mt-3">
                    Porque dívida com a Receita Federal NÃO CADUCA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
