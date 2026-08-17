import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, FileDown, ChevronDown } from 'lucide-react'
import { heroTitles } from '../data/portfolioData.js'
import Magnetic from './Magnetic.jsx'

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % heroTitles.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

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
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Subtle ambient backdrop — restrained, no heavy gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[32.5rem] w-[32.5rem] -translate-x-1/2 rounded-full bg-accent/[0.06] dark:bg-accent-dark/[0.10] blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-16 container-px lg:grid-cols-[1.1fr_0.9fr]">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border dark:border-border-dark px-3.5 py-1.5 text-xs font-medium text-muted dark:text-muted-dark"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Open to internships, research &amp; collaboration
          </motion.p>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-balance"
            aria-label="Aryaman Bhattacharjee"
          >
            {/* First and last name on separate lines — plain text, no effects */}
            <span className="block">Aryaman</span>
            <span className="block">Bhattacharjee</span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 h-9 sm:h-10 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={heroTitles[titleIndex]}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="block text-xl sm:text-2xl font-heading font-semibold text-accent dark:text-accent-dark"
              >
                {heroTitles[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lg text-muted dark:text-muted-dark leading-relaxed text-balance"
          >
            Building intelligent software solutions that solve real-world problems through AI, automation, and data-driven insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#work"
                onClick={(e) => scrollTo(e, '#work')}
                className="group inline-flex items-center gap-2 rounded-full bg-ink dark:bg-ink-dark px-6 py-3.5 text-sm font-semibold text-bg dark:text-bg-dark transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                View Work
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-border dark:border-border-dark px-6 py-3.5 text-sm font-semibold text-ink dark:text-ink-dark transition-colors duration-200 hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
              >
                <FileDown size={16} />
                Resume
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}profile.jpeg`}
              alt="Aryaman Bhattacharjee — portrait"
              width={280}
              height={280}
              className="h-52 w-52 sm:h-64 sm:w-64 lg:h-[17.5rem] lg:w-[17.5rem] rounded-full object-cover ring-4 ring-bg dark:ring-bg-dark shadow-hover dark:shadow-hover-dark"
            />
            {/* Decorative dashed ring, echoes the old placeholder avatar */}
            <span
              className="pointer-events-none absolute -inset-1.5 rounded-full border-2 border-dashed border-accent/40 dark:border-accent-dark/50"
              aria-hidden="true"
            />
            <span className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-bg dark:bg-bg-dark ring-4 ring-bg dark:ring-bg-dark">
              <span className="h-3.5 w-3.5 rounded-full bg-emerald-500" />
            </span>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => scrollTo(e, '#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted dark:text-muted-dark"
        aria-label="Scroll to About section"
      >
        <span className="text-[0.6875rem] font-medium tracking-[0.14em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  )
}
