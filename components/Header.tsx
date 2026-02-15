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
            <Link href="#" className="font-display text-[1.75rem] text-primary">
              Singular<span className="text-secondary">.</span>
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
