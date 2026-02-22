import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso | Singular Contabilidade',
  description: 'Termos de Uso da Singular Contabilidade',
}

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-primary text-white py-6">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <Link href="/" className="font-display text-[1.75rem] text-white inline-block">
            Singular<span className="text-secondary">.</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="w-full max-w-[800px] mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl text-primary mb-8">Termos de Uso</h1>

        <div className="prose prose-lg max-w-none text-text-muted space-y-6">
          <p className="text-sm text-text-light">Última atualização: Fevereiro de 2025</p>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar o site da <strong>Singular Contabilidade</strong>, inscrita no
              CNPJ sob o nº <strong>16.949.837/0001-11</strong>, com sede em Porto Alegre, RS, você
              declara que leu, compreendeu e concorda com estes Termos de Uso.
            </p>
            <p>
              Caso não concorde com qualquer disposição destes Termos, solicitamos que não utilize
              nosso site ou serviços.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">2. Descrição dos Serviços</h2>
            <p>
              A Singular Contabilidade oferece serviços de consultoria e assessoria contábil,
              incluindo mas não se limitando a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Diagnóstico Estratégico do MEI</li>
              <li>Análise de faturamento e situação fiscal</li>
              <li>Orientação para regularização junto à Receita Federal</li>
              <li>Assessoria contábil e fiscal</li>
              <li>Planejamento tributário</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">3. Uso do Site</h2>
            <p>
              O usuário compromete-se a utilizar o site de forma ética e em conformidade com a
              legislação vigente, abstendo-se de:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Utilizar o site para fins ilícitos ou não autorizados</li>
              <li>Tentar acessar áreas restritas do sistema sem autorização</li>
              <li>Transmitir vírus, malware ou qualquer código de natureza destrutiva</li>
              <li>Coletar informações de outros usuários sem consentimento</li>
              <li>Reproduzir, duplicar ou copiar conteúdo do site sem autorização</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">4. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo presente no site, incluindo textos, imagens, logotipos, design e
              materiais, é de propriedade exclusiva da Singular Contabilidade ou de seus
              licenciadores, sendo protegido pela legislação brasileira de propriedade intelectual.
            </p>
            <p>
              É vedada a reprodução, distribuição ou modificação de qualquer conteúdo sem prévia
              autorização por escrito.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">5. Contratação de Serviços</h2>
            <p>
              A contratação de serviços oferecidos pela Singular Contabilidade está sujeita a
              condições específicas, que serão apresentadas no momento da contratação.
            </p>
            <p>
              Os preços e condições de pagamento são aqueles vigentes no momento da contratação,
              podendo ser alterados sem aviso prévio para novas contratações.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">6. Limitação de Responsabilidade</h2>
            <p>
              A Singular Contabilidade não se responsabiliza por:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Decisões tomadas pelo usuário com base nas informações disponibilizadas no site</li>
              <li>Eventuais danos decorrentes do uso inadequado do site ou serviços</li>
              <li>Interrupções no funcionamento do site por motivos técnicos ou de força maior</li>
              <li>Conteúdo de sites de terceiros que possam ser acessados através de links</li>
            </ul>
            <p>
              As orientações prestadas através do Diagnóstico Estratégico do MEI são de caráter
              informativo e não substituem o acompanhamento profissional contínuo.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">7. Garantia e Devolução</h2>
            <p>
              Conforme indicado na oferta do serviço, oferecemos garantia incondicional de 7 dias
              para o Diagnóstico Estratégico do MEI. Caso não esteja satisfeito, basta solicitar
              o reembolso dentro do prazo.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">8. Privacidade</h2>
            <p>
              O tratamento de dados pessoais é regido pela nossa{' '}
              <Link href="/privacidade" className="text-primary hover:text-primary-light underline">
                Política de Privacidade
              </Link>
              , que integra estes Termos de Uso.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">9. Alterações nos Termos</h2>
            <p>
              A Singular Contabilidade reserva-se o direito de modificar estes Termos de Uso a
              qualquer momento, mediante publicação da versão atualizada em nosso site. O uso
              continuado do site após alterações implica aceitação dos novos termos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">10. Legislação e Foro</h2>
            <p>
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil.
              Fica eleito o foro da Comarca de Porto Alegre, RS, para dirimir quaisquer
              controvérsias decorrentes destes Termos, com renúncia a qualquer outro, por
              mais privilegiado que seja.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">11. Contato</h2>
            <p>
              Para dúvidas sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <p>
              <strong>Singular Contabilidade</strong><br />
              CNPJ: 16.949.837/0001-11<br />
              E-mail: contato@singularcontabilidade.com.br<br />
              Localização: Porto Alegre, RS
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Voltar ao início
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="w-full max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-white/50 text-sm">
            &copy; 2025 Singular Contabilidade. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
