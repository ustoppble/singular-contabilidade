import Image from 'next/image'

const blocos = [
  {
    texto:
      'Meu nome é Luiza, sou sócia proprietária do Singular Contabilidade. Cresci dentro desse escritório — minha mãe fundou há 30 anos. Hoje trabalho principalmente com planejamento tributário de empresas maiores, que tributam pelo lucro presumido e lucro real.',
  },
  {
    texto:
      'Mas sabe o que eu comecei a perceber ao longo desses 10 anos de atuação? O MEI era sempre quem MAIS precisava de ajuda... e quem MENOS tinha acesso a orientação adequada. As empresas grandes que eu atendo têm diagnósticos regulares, auditorias, relatórios. Mas o MEI? O MEI fica navegando no escuro.',
  },
  {
    texto:
      'Mesmo quando eu sentava e dava 2 horas de consultoria gratuita para um amigo MEI... uma semana depois as mesmas dúvidas voltavam. Não era falta de boa vontade — era falta de DADOS CONCRETOS na mão. E pior: a internet está CHEIA de informação errada. Eu vi amigos aplicando "jeitinhos" que viram online. Resultado? Multas de 40 mil, 100 mil... chegamos a atender um MEI com débito de mais de 220 mil reais com a Receita.',
  },
  {
    texto:
      'Foi aí que eu tive uma sacada: empresas grandes têm diagnósticos regulares. Por que o MEI não podia ter isso também? Não uma consultoria genérica que a pessoa esquece. Mas um DIAGNÓSTICO TÉCNICO, com os números reais da empresa. Preto no branco.',
  },
  {
    texto:
      'Só em 2025, mais de 4 MILHÕES de MEIs foram excluídos do regime. A maioria não fez isso por opção — foi por falta de conhecimento. E essas exclusões geram dívidas que essas pessoas vão carregar pro resto da vida. Porque dívida com a Receita Federal NÃO CADUCA.',
    destaque: true,
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
          {/* Image - sticky on desktop */}
          <div className="relative lg:sticky lg:top-32">
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
          <div>
            <span className="inline-block text-xs text-secondary uppercase tracking-[0.15em] font-semibold mb-4">
              Quem está por trás
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] mb-10">
              Por que eu criei esse diagnóstico
            </h2>

            <div className="space-y-8">
              {blocos.map((bloco, index) => (
                <p
                  key={index}
                  className={`text-lg leading-[1.9] ${
                    bloco.destaque
                      ? 'text-white bg-white/10 p-6 rounded-2xl border-l-4 border-secondary'
                      : 'text-white/85'
                  }`}
                >
                  {bloco.texto}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
