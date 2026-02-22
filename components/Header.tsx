'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hideBar, setHideBar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setHideBar(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <>
      {/* Barra de urgência - fixa com hide on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] bg-primary text-white text-center py-2 px-4 text-sm transition-transform duration-300 ${
          hideBar ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <span className="opacity-90">
          A Receita pode fiscalizar os últimos <strong>5 anos</strong>. Você sabe se está tudo certo?
        </span>
      </div>

      <header
        className={`fixed left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border py-4 transition-all duration-300 ${
          scrolled ? 'shadow-md' : ''
        } ${hideBar ? 'top-0' : 'top-[36px]'}`}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link href="#" className="flex items-center">
              <svg
                className="h-8 w-auto fill-primary"
                viewBox="0 0 1674.01 310.97"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Singular Contabilidade"
              >
                <g>
                  <path d="M168.14 218.06c-6.3 10.63-15.65 19.15-28.02 25.57-12.38 6.43-27.44 9.64-45.19 9.64s-33.17-2.98-46.94-8.94c-13.78-5.95-24.81-14.54-33.1-25.75C6.6 207.38 1.87 194.3.71 179.35h52.54c1.16 10.04 5.19 18.38 12.08 25.05 6.89 6.65 16.05 9.98 27.5 9.98 10.28 0 18.16-2.74 23.65-8.23 5.49-5.48 8.23-12.55 8.23-21.2 0-7.7-2.22-14.07-6.65-19.09-4.44-5.02-10.04-9.05-16.81-12.09-6.78-3.03-16.11-6.53-28.02-10.5-15.41-5.14-28.03-10.22-37.84-15.25-9.81-5.01-18.16-12.31-25.05-21.89C3.44 96.57 0 84.07 0 68.65c0-21.24 7.65-38 22.94-50.26C38.24 6.13 58.5 0 83.72 0s47 6.3 62.53 18.92c15.53 12.61 24.34 29.43 26.45 50.44h-53.25c-1.4-8.87-5.14-16.16-11.21-21.89-6.08-5.72-14.36-8.58-24.87-8.58-9.11 0-16.46 2.4-22.07 7.18-5.61 4.79-8.41 11.74-8.41 20.84 0 7.24 2.16 13.26 6.48 18.04 4.32 4.79 9.81 8.7 16.46 11.74 6.65 3.04 15.7 6.42 27.15 10.16 15.88 5.61 28.78 10.86 38.71 15.76 9.92 4.9 18.39 12.26 25.4 22.07 7.01 9.81 10.51 22.66 10.51 38.53 0 12.62-3.15 24.24-9.46 34.86Z"/>
                  <path d="M264.4 3.5v247.32h-49.39V3.5h49.39Z"/>
                  <path d="M521.63 250.82h-49.39L361.54 82.68v168.14h-49.39V3.5h49.39l110.7 169.55V3.5h49.39v247.32Z"/>
                  <path d="M756.3 23.3c19.85 14.83 32.58 34.86 38.18 60.07h-51.84c-4.9-11.2-12.67-20.14-23.3-26.8-10.63-6.65-23.18-9.98-37.66-9.98s-26.86 3.27-37.83 9.81c-10.98 6.54-19.5 15.88-25.57 28.02-6.07 12.15-9.11 26.39-9.11 42.74 0 25.92 6.95 46.12 20.84 60.6 13.89 14.48 32.87 21.71 56.92 21.71 17.74 0 32.98-5.25 45.71-15.76 12.73-10.51 20.96-25.1 24.7-43.78h-83.73v-35.39h125.06v47.65c-3.5 16.35-10.34 31.41-20.49 45.19-10.16 13.78-23.47 24.81-39.94 33.1-16.46 8.29-35.33 12.43-56.57 12.43-24.29 0-45.71-5.31-64.28-15.94-18.56-10.62-32.93-25.45-43.09-44.49-10.16-19.03-15.24-40.81-15.24-65.33s5.08-46.3 15.24-65.33 24.46-33.92 42.91-44.66c18.45-10.74 39.81-16.12 64.1-16.12 30.13 0 55.11 7.42 74.97 22.25Z"/>
                  <path d="M883.6 3.5v145.03c0 19.39 4.26 33.92 12.79 43.62 8.52 9.69 20.84 14.54 36.96 14.54s28.08-4.84 36.61-14.54c8.52-9.69 12.79-24.23 12.79-43.62V3.5h49.04v145.03c0 22.89-4.26 42.21-12.79 57.97-8.52 15.76-20.32 27.5-35.38 35.21-15.06 7.7-32.17 11.56-51.32 11.56-29.66 0-53.37-8.88-71.11-26.63-17.75-17.74-26.62-43.78-26.62-78.12V3.5h49.04Z"/>
                  <path d="M1127.16 212.99h83.02v37.83h-132.41V3.5h49.39v209.48Z"/>
                  <path d="M1396.4 201.07h-99.14l-17.51 49.75h-52.2L1318.64 6.3h56.4l90.73 244.52h-52.2l-17.17-49.75Zm-13.31-37.48L1346.66 59.2l-36.43 104.39h72.86Z"/>
                  <path d="m1619.37 250.82-57.8-96.34h-21.72v96.34h-49.39V3.5h94.23c28.72 0 50.62 7.01 65.68 21.02 15.07 14.01 22.59 32.46 22.59 55.34 0 18.68-5.2 34.33-15.58 46.94-10.39 12.62-25.4 21.02-45.02 25.22l61.64 98.79h-54.64Zm-79.52-130.31h40.63c28.26 0 42.39-12.49 42.39-37.48 0-11.91-3.44-21.19-10.33-27.85-6.89-6.66-17.57-9.99-32.05-9.99h-40.63v75.32Z"/>
                  <path d="M1674.01 303.15v7.82H0v-7.82h1674.01z"/>
                </g>
              </svg>
            </Link>

            <nav className="flex items-center gap-12">
              <ul className="hidden md:flex gap-8">
                {[
                  { href: '#provas', label: 'Casos reais' },
                  { href: '#historia', label: 'Sobre' },
                  { href: '#oferta', label: 'Oferta' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-[0.9375rem] font-medium text-text-muted hover:text-primary transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-250 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#oferta"
                onClick={(e) => handleSmoothScroll(e, '#oferta')}
                className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-primary font-semibold rounded-lg hover:bg-accent hover:-translate-y-0.5 hover:shadow-lg transition-all duration-250 text-sm"
              >
                Quero meu diagnóstico
              </a>

              <button className="md:hidden p-2" aria-label="Menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
