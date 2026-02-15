const testimonials = [
  {
    result: 'R$ 8.000 economizados',
    text: 'Achava que teria que pagar muito mais imposto. Com a análise da Singular, descobrimos uma forma legal de reorganizar meu faturamento e economizar. Fez diferença real no meu bolso.',
    name: 'Lucas Soares',
    role: 'Consultor de TI',
  },
  {
    result: '+2 anos como MEI',
    text: 'Controlava meu faturamento certinho, mas não sabia que MEI tinha limite de compras. A Singular me mostrou o risco e planejamos juntos. Continuo como MEI há 2 anos graças a eles.',
    name: 'Muriel Pistor',
    role: 'Loja de artesanato',
  },
]

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-cream">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-24">
          <span className="inline-block text-xs text-secondary uppercase tracking-[0.15em] font-semibold mb-4">
            Depoimentos
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] mb-6">O que nossos clientes dizem</h2>
          <p className="text-text-muted text-lg">
            Histórias reais de empresários que encontraram na Singular o suporte que precisavam.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-3xl p-10 relative"
            >
              {/* Quote mark */}
              <div className="absolute top-8 right-8 font-display text-7xl text-accent leading-none">
                &ldquo;
              </div>

              {/* Result badge */}
              <span className="inline-block px-4 py-2 bg-success/10 text-success rounded-full text-sm font-semibold mb-6">
                {testimonial.result}
              </span>

              <p className="text-lg leading-relaxed text-text mb-8">{testimonial.text}</p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-light to-primary" />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-text-muted">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
