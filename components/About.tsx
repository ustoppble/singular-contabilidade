import Image from 'next/image'

const values = [
  'Transparência total',
  'Atendimento humano',
  'Visão estratégica',
  'Tecnologia atual',
]

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden">
              <Image
                src="/foto2.png"
                alt="Escritório Singular Contabilidade"
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
          <div>
            <span className="inline-block text-xs text-secondary uppercase tracking-[0.15em] font-semibold mb-4">
              Sobre nós
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] mb-6">
              Contabilidade que entende de negócio
            </h2>

            <p className="text-lg leading-relaxed text-white/85 mb-6">
              Fundada há mais de 30 anos, a Singular nasceu com uma missão clara: ser mais do
              que um escritório de contabilidade. Queremos ser parceiros estratégicos dos
              nossos clientes.
            </p>

            <p className="text-lg leading-relaxed text-white/85 mb-10">
              Combinamos experiência sólida com visão moderna. Enquanto muitos escritórios
              apenas cumprem obrigações, nós buscamos oportunidades: economia tributária,
              organização financeira e clareza para decisões.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value) => (
                <div key={value} className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-secondary flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-[0.9375rem] text-white/90">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
