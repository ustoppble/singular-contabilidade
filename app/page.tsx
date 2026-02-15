import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Provas from '@/components/Provas'
import Historia from '@/components/Historia'
import Oferta from '@/components/Oferta'
import Fechamento from '@/components/Fechamento'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Provas />
        <Historia />
        <Oferta />
        <Fechamento />
      </main>
      <Footer />
    </>
  )
}
