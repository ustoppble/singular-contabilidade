import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Singular Contabilidade',
  description: 'Política de Privacidade da Singular Contabilidade',
}

export default function PoliticaPrivacidade() {
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
        <h1 className="text-3xl md:text-4xl text-primary mb-8">Política de Privacidade</h1>

        <div className="prose prose-lg max-w-none text-text-muted space-y-6">
          <p className="text-sm text-text-light">Última atualização: Fevereiro de 2025</p>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">1. Informações Gerais</h2>
            <p>
              A presente Política de Privacidade contém informações sobre coleta, uso, armazenamento,
              tratamento e proteção dos dados pessoais dos usuários e visitantes do site da
              <strong> Singular Contabilidade</strong>, inscrita no CNPJ sob o nº <strong>16.949.837/0001-11</strong>,
              com sede em Porto Alegre, RS.
            </p>
            <p>
              Esta Política de Privacidade aplica-se a todos os usuários e visitantes e integra os
              Termos de Uso do site da Singular Contabilidade.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">2. Coleta de Dados</h2>
            <p>
              Os dados pessoais do usuário são coletados das seguintes formas:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Formulários de contato:</strong> quando você preenche formulários em nosso site,
                coletamos os dados informados, como nome, e-mail, telefone e mensagem.
              </li>
              <li>
                <strong>Contratação de serviços:</strong> ao contratar nossos serviços, coletamos dados
                necessários para a prestação do serviço contábil.
              </li>
              <li>
                <strong>Cookies e tecnologias similares:</strong> utilizamos cookies para melhorar a
                experiência de navegação e coletar informações de uso do site.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">3. Uso dos Dados</h2>
            <p>
              Os dados pessoais coletados são utilizados para:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prestação dos serviços contratados</li>
              <li>Envio de comunicações relacionadas aos serviços</li>
              <li>Atendimento de solicitações e dúvidas</li>
              <li>Cumprimento de obrigações legais e regulatórias</li>
              <li>Melhoria dos nossos serviços e experiência do usuário</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">4. Compartilhamento de Dados</h2>
            <p>
              A Singular Contabilidade não compartilha, vende ou aluga dados pessoais de seus clientes
              e usuários a terceiros para fins comerciais, exceto:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Quando necessário para cumprimento de obrigações legais</li>
              <li>Com órgãos governamentais para fins de cumprimento de obrigações fiscais e contábeis</li>
              <li>Com prestadores de serviços essenciais para a operação do negócio, mediante contratos de confidencialidade</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">5. Armazenamento e Segurança</h2>
            <p>
              Os dados pessoais coletados são armazenados em ambiente seguro, observando padrões
              de segurança e confidencialidade. O acesso aos dados é restrito a profissionais
              autorizados, comprometidos com a confidencialidade das informações.
            </p>
            <p>
              Os dados são mantidos pelo tempo necessário para cumprir as finalidades para as
              quais foram coletados, incluindo o cumprimento de obrigações legais.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">6. Direitos do Titular</h2>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Confirmar a existência de tratamento de dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Solicitar a portabilidade dos dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">7. Cookies</h2>
            <p>
              Utilizamos cookies para melhorar a experiência de navegação. Cookies são pequenos
              arquivos de texto armazenados no seu dispositivo que nos ajudam a entender como
              você utiliza nosso site.
            </p>
            <p>
              Você pode configurar seu navegador para recusar cookies ou alertá-lo quando um
              cookie estiver sendo enviado. No entanto, algumas funcionalidades do site podem
              não funcionar corretamente sem cookies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">8. Alterações nesta Política</h2>
            <p>
              A Singular Contabilidade reserva-se o direito de modificar esta Política de
              Privacidade a qualquer momento, mediante publicação da versão atualizada em
              nosso site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl text-primary mt-8 mb-4">9. Contato</h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade,
              entre em contato conosco:
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
