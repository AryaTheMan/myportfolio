import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { navLinks } from '../data/portfolioData.js'
import { useTheme } from '../hooks/useTheme.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import Magnetic from './Magnetic.jsx'

const sectionIds = navLinks.map((link) => link.href.replace('#', ''))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const activeId = useActiveSection(sectionIds)
  const navigate = useNavigate()
  const pendingTargetRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // If a nav link was clicked while the menu was open, the body scroll-lock
  // effect above would swallow its scrollIntoView — wait until the menu
  // closes and the lock is released, then scroll to the pending target next
  // frame. Must run AFTER the overflow effect above (declaration order).
  useEffect(() => {
    if (mobileOpen) return
    const pending = pendingTargetRef.current
    if (!pending) return
    pendingTargetRef.current = null
    const rafId = requestAnimationFrame(() => {
      if (pending.isConnected) {
        pending.scrollIntoView({ behavior: 'smooth' })
      }
    })
    return () => cancelAnimationFrame(rafId)
  }, [mobileOpen])

  // If the viewport grows to desktop size while the menu is open (e.g.
  // rotating a tablet or resizing), close it so the body scroll-lock is
  // released and the page isn't stuck unscrollable.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => {
      if (e.matches) setMobileOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      if (mobileOpen) {
        // Menu closing releases the body scroll-lock; defer the scroll so
        // it isn't swallowed (handled in the effect above).
        pendingTargetRef.current = el
        setMobileOpen(false)
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // We're on a non-home page (e.g. a project gallery) — head home
      // first and let ScrollManager scroll to the section.
      setMobileOpen(false)
      navigate(`/${href}`)
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/90 dark:bg-bg-dark/90 shadow-soft dark:shadow-soft-dark border-b border-border dark:border-border-dark'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-content items-center justify-between container-px py-4">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-heading text-lg font-bold tracking-tight"
          >
            Aryaman<span className="text-accent dark:text-accent-dark">.</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.replace('#', '')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'text-ink dark:text-ink-dark'
                      : 'text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-black/[0.05] dark:bg-white/[0.08]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors duration-200"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Magnetic strength={0.2} className="hidden md:inline-block">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-flex items-center rounded-full bg-ink dark:bg-ink-dark text-bg dark:text-bg-dark px-4 py-2 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Let’s talk
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-ink dark:text-ink-dark hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors duration-200"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[45] bg-bg dark:bg-bg-dark md:hidden"
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="flex h-full flex-col justify-center items-center gap-8 container-px"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading text-3xl font-semibold text-ink dark:text-ink-dark"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.08 + navLinks.length * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 inline-flex items-center rounded-full bg-ink dark:bg-ink-dark text-bg dark:text-bg-dark px-6 py-3 text-sm font-semibold"
              >
                Let’s talk
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
