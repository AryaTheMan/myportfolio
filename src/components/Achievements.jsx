import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, CheckCircle2, GraduationCap, Zap, Award, Sparkles, Landmark } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { stats, achievements } from '../data/portfolioData.js'

const achievementIcons = [Trophy, GraduationCap, Zap, Award, Sparkles, Landmark]

/**
 * Counts up from 0 to `value` once the element scrolls into view.
 * Numbers only — any suffix ("+") is rendered separately.
 */
function CountUp({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1100
    const start = performance.now()
    let raf
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic — fast start, gentle landing
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="font-heading text-4xl font-bold tracking-tight tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="section-py">
      <div className="mx-auto max-w-content container-px">
        <SectionHeading
          eyebrow="Achievements"
          title="Milestones, certifications & recognition."
          description="A mix of shipped AI products, hands-on learning and the events that shaped how I build."
        />

        {/* Stats band */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} variant="up" delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-6 text-center transition-shadow duration-300 hover:shadow-card dark:hover:shadow-card-dark">
                <CountUp value={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm font-semibold text-ink dark:text-ink-dark">{stat.label}</p>
                <p className="mt-1 text-xs text-muted dark:text-muted-dark">{stat.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Achievements grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, i) => {
            const Icon = achievementIcons[i % achievementIcons.length]
            return (
              <Reveal key={item.id} variant="up" delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group h-full rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-7 shadow-soft dark:shadow-soft-dark transition-shadow duration-300 hover:shadow-hover dark:hover:shadow-hover-dark"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 dark:bg-accent-dark/15 text-accent dark:text-accent-dark">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <h3 className="flex items-start gap-2 text-base font-semibold text-ink dark:text-ink-dark">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 flex-none text-accent dark:text-accent-dark"
                      strokeWidth={2}
                    />
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted dark:text-muted-dark">
                    {item.description}
                  </p>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
