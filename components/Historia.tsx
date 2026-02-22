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

export default function Historia() {
  return (
    <section id="historia" className="bg-primary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero da seção - Imagem + Intro */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Imagem - 2 colunas */}
            <div className="lg:col-span-2 relative">
              <div className="rounded-3xl overflow-hidden">
                <Image
                  src="/foto2.png"
                  alt="Luiza - Singular Contabilidade"
                  width={500}
                  height={600}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 bg-secondary text-primary p-5 rounded-2xl shadow-xl">
                <div className="font-display text-4xl leading-none">30</div>
                <div className="text-sm">anos de mercado</div>
              </div>
            </div>

            {/* Intro - 3 colunas */}
            <div className="lg:col-span-3">
              <span className="inline-block text-xs text-secondary uppercase tracking-[0.15em] font-semibold mb-4">
                Quem está por trás
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] mb-6">
                Por que eu criei esse diagnóstico
              </h2>
              <p className="text-xl text-white/90 leading-relaxed mb-6">
                Meu nome é <strong className="text-white">Luiza</strong>, sou sócia proprietária do Singular Contabilidade. Cresci dentro desse escritório — minha mãe fundou há <span className="text-secondary font-semibold">30 anos</span>.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                Hoje trabalho principalmente com planejamento tributário de empresas maiores. Mas ao longo de 10 anos percebi algo preocupante...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline de blocos */}
      <div className="relative z-10 pb-24">
        <div className="w-full max-w-[900px] mx-auto px-6">

          {/* Bloco 1 - O que percebi */}
          <div className="flex gap-6 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <IconEye className="w-6 h-6 text-secondary" />
              </div>
              <div className="w-px h-full bg-white/20 mt-4" />
            </div>
            <div className="flex-1 pb-8">
              <h3 className="font-semibold text-lg text-secondary mb-3">O que eu percebi</h3>
              <p className="text-white/85 leading-relaxed">
                O MEI era sempre quem <span className="text-secondary font-bold">MAIS precisava de ajuda</span>... e quem MENOS tinha acesso a orientação adequada. Empresas grandes têm diagnósticos, auditorias, relatórios. Mas o MEI? Fica navegando no escuro.
              </p>
            </div>
          </div>

          {/* Bloco 2 - O problema real */}
          <div className="flex gap-6 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <IconExclamation className="w-6 h-6 text-secondary" />
              </div>
              <div className="w-px h-full bg-white/20 mt-4" />
            </div>
            <div className="flex-1 pb-8">
              <h3 className="font-semibold text-lg text-secondary mb-3">O problema real</h3>
              <p className="text-white/85 leading-relaxed mb-4">
                Mesmo quando eu dava <strong className="text-white">2 horas de consultoria gratuita</strong> para um amigo MEI... uma semana depois as mesmas dúvidas voltavam. E pior: a internet está <strong className="text-white">CHEIA de informação errada</strong>.
              </p>
              <div className="bg-white/10 rounded-xl p-6 border-l-4 border-secondary">
                <p className="text-white/70 mb-2">Eu vi amigos aplicando "jeitinhos" que viram online.</p>
                <p className="text-white text-lg font-semibold">
                  Resultado? <span className="text-secondary">Multas de R$ 40 mil, R$ 100 mil... chegamos a atender um MEI com débito de mais de R$ 220 mil.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bloco 3 - A sacada */}
          <div className="flex gap-6 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <IconLightbulb className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-secondary mb-3">A sacada</h3>
              <p className="text-white/85 leading-relaxed">
                Foi aí que eu pensei: empresas grandes têm diagnósticos regulares. Por que o MEI não podia ter isso também? Não uma consultoria genérica. Mas um <span className="text-secondary font-bold">DIAGNÓSTICO TÉCNICO</span>, com os números reais da empresa. Preto no branco.
              </p>
            </div>
          </div>

          {/* Bloco destaque final */}
          <div className="bg-gradient-to-r from-secondary/20 to-secondary/5 rounded-2xl p-8 border border-secondary/30 mt-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center">
                  <span className="font-display text-3xl text-secondary">4M</span>
                </div>
              </div>
              <div>
                <p className="text-2xl text-white font-semibold mb-3">
                  Só em 2025, mais de <span className="text-secondary">4 MILHÕES</span> de MEIs foram excluídos do regime.
                </p>
                <p className="text-white/70 mb-4">
                  A maioria não fez isso por opção — foi por falta de conhecimento. E essas exclusões geram dívidas que vão carregar pro resto da vida.
                </p>
                <p className="text-secondary font-bold text-lg">
                  Porque dívida com a Receita Federal NÃO CADUCA.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
