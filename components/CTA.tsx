export default function CTA() {
  return (
    <section id="contato" className="py-24 bg-gradient-to-br from-cream to-cream-dark">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="bg-primary rounded-3xl p-12 md:p-24 text-center relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(196,163,90,0.1)_0%,transparent_50%)] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-white mb-6">
              Pronto para ter clareza sobre seu negócio?
            </h2>
            <p className="text-white/80 text-lg max-w-[600px] mx-auto mb-10">
              Agende uma conversa sem compromisso. Vamos entender sua situação e mostrar como
              podemos ajudar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5551999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-primary font-semibold rounded-lg hover:bg-accent hover:-translate-y-0.5 hover:shadow-lg transition-all duration-250"
              >
                Falar pelo WhatsApp
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </a>
              <a
                href="mailto:contato@singularcontabilidade.com.br"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-250"
              >
                Enviar email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
