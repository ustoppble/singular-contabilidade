import type { Metadata } from 'next'
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const dmSerif = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: '400',
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Diagnóstico Estratégico do MEI | Singular Contabilidade',
  description:
    'Descubra a verdade sobre o seu MEI antes da Receita Federal. Análise completa de faturamento, situação fiscal e orientação clara por apenas R$ 187.',
  openGraph: {
    title: 'Diagnóstico Estratégico do MEI | Singular Contabilidade',
    description:
      'Descubra a verdade sobre o seu MEI antes da Receita Federal. Análise completa por apenas R$ 187.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSerif.variable} ${jakarta.variable} antialiased`}>{children}</body>
    </html>
  )
}
