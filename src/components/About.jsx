import { GraduationCap, Target, Sparkles } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import Terminal from './Terminal.jsx'
import { aboutContent } from '../data/portfolioData.js'

const icons = [GraduationCap, Target, Sparkles]

export default function About() {
  return (
    <section id="about" className="section-py">
      <div className="mx-auto max-w-content container-px">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="About"
            title="Turning ideas into intelligent software."
            description="AI, automation and data-driven products — built to solve real problems."
          />

          <Reveal variant="up" delay={0.1} className="flex flex-col gap-8">
            <p className="text-lg leading-relaxed text-ink dark:text-ink-dark text-balance">
              {aboutContent.paragraph}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {aboutContent.facts.map((fact, i) => {
                const Icon = icons[i % icons.length]
                return (
                  <div
                    key={fact.label}
                    className="rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-5"
                  >
                    <Icon size={18} className="mb-3 text-accent dark:text-accent-dark" strokeWidth={1.75} />
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted dark:text-muted-dark mb-1.5">
                      {fact.label}
                    </p>
                    <p className="text-sm font-medium text-ink dark:text-ink-dark leading-snug">
                      {fact.value}
                    </p>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>

        <Terminal />
      </div>
    </section>
  )
}
