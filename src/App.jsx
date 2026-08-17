import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import ScrollManager from './components/ScrollManager.jsx'
import ParticleBackground from './components/ParticleBackground.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TechMarquee from './components/TechMarquee.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Achievements from './components/Achievements.jsx'
import Process from './components/Process.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'

// Non-initial routes are code-split so the first paint ships less JavaScript:
// the project gallery and 404 page only load when actually visited.
const ProjectGallery = lazy(() => import('./components/ProjectGallery.jsx'))
const NotFound = lazy(() => import('./components/NotFound.jsx'))

function HomePage() {
  return (
    <main>
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <ScrollManager />
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:projectId" element={<ProjectGallery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Keep the loading screen brief and consistent, rather than tied
    // strictly to network timing, so the reveal always feels intentional.
    const timer = setTimeout(() => setIsLoading(false), 1100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Warm the code-split gallery chunk once the browser is idle, so opening
    // a project page never waits on a network fetch (project cards are the
    // most likely next stop on the homepage).
    const rafId = requestAnimationFrame(() => {
      import('./components/ProjectGallery.jsx').catch(() => {})
    })
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // The loading screen briefly locks body overflow, which can swallow
      // the initial scroll-to-top (ScrollManager runs while it's hidden)
      // and let the browser's restored position — e.g. mid-page at
      // "Featured Work" — win. Reset once the lock lifts.
      const { hash } = window.location
      if (hash) {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
  }, [isLoading])

  return (
    <MotionConfig reducedMotion="user">
      <ParticleBackground />
      <CustomCursor />
      <LoadingScreen isLoading={isLoading} />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}
