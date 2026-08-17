import { useNavigate } from 'react-router-dom'
import { Mail, Linkedin, Github } from 'lucide-react'
import { navLinks, socialLinks } from '../data/portfolioData.js'

export default function Footer() {
  const year = new Date().getFullYear()
  const navigate = useNavigate()

  const scrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/${href}`)
    }
  }

  return (
    <footer className="selectable border-t border-border dark:border-border-dark">
      <div className="mx-auto max-w-content container-px py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="font-heading text-lg font-bold">
              Aryaman<span className="text-accent dark:text-accent-dark">.</span>
            </a>
            <p className="mt-2 text-sm text-muted dark:text-muted-dark max-w-xs">
              AI, automation &amp; data-driven products — building software that solves real-world problems.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${socialLinks.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:border-ink/30 dark:hover:border-ink-dark/30 transition-colors duration-200"
            >
              <Mail size={15} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:border-ink/30 dark:hover:border-ink-dark/30 transition-colors duration-200"
            >
              <Linkedin size={15} />
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:border-ink/30 dark:hover:border-ink-dark/30 transition-colors duration-200"
            >
              <Github size={15} />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border dark:border-border-dark flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted dark:text-muted-dark">
            © {year} Aryaman Bhattacharjee. All rights reserved.
          </p>
          <p className="text-xs text-muted dark:text-muted-dark">
            Designed &amp; built with React, Tailwind CSS and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  )
}
