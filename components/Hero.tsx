'use client'

import Image from 'next/image'

export default function Hero() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <section className="min-h-screen flex items-center pt-[140px] bg-gradient-to-br from-cream to-cream-dark relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute -top-[30%] -right-[15%] w-[60%] h-[120%] bg-[radial-gradient(ellipse,rgba(196,163,90,0.1)_0%,transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Content */}
          <div className="relative z-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm text-text-muted mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 stroke-secondary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
              <span>Escritório com 30+ anos de mercado</span>
            </div>

            <h1 className="text-[clamp(2.5rem,5vw,4rem)] mb-8 tracking-tight">
              Descubra a verdade sobre o seu MEI{' '}
              <em className="italic text-primary-light">antes da Receita Federal</em>
            </h1>

            <p className="text-xl text-text-muted mb-10 max-w-[520px] leading-relaxed">
              Para você saber exatamente se está tudo certo... Se ultrapassou algum limite sem perceber... E qual caminho precisa seguir para resolver. Mesmo que nunca tenha feito um controle financeiro adequado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a
                href="#oferta"
                onClick={(e) => handleSmoothScroll(e, '#oferta')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-primary font-semibold rounded-lg hover:bg-accent hover:-translate-y-0.5 hover:shadow-lg transition-all duration-250"
              >
                Quero meu diagnóstico
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
              <a
                href="#como-funciona"
                onClick={(e) => handleSmoothScroll(e, '#como-funciona')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-250"
              >
                Ver como funciona
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 pt-8 border-t border-border">
              {[
                { value: '30+', label: 'anos de mercado' },
                { value: 'R$ 187', label: 'investimento' },
                { value: '7 dias', label: 'para entrega' },
              ].map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="font-display text-[2.5rem] text-primary leading-none">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-muted mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2 max-w-[500px] mx-auto lg:mx-0">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/fotoprincipal.jpg"
                alt="Luiza - Singular Contabilidade"
                width={800}
                height={1000}
                className="w-full aspect-[4/5] object-cover"
                priority
              />
            </div>

            {/* Floating card 1 */}
            <div className="absolute top-[15%] -right-5 bg-white rounded-2xl p-4 shadow-lg animate-float">
              <div className="text-xs text-text-muted mb-1">Economia média</div>
              <div className="font-display text-2xl text-success">R$ 8.000</div>
            </div>

            {/* Floating card 2 */}
            <div className="absolute bottom-[20%] -left-8 bg-white rounded-2xl p-4 shadow-lg animate-float-delayed">
              <div className="text-xs text-text-muted mb-1">Clientes satisfeitos</div>
              <div className="font-display text-2xl text-primary">98%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
