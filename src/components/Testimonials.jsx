import { Quote } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { testimonials } from '../data/portfolioData.js'

function initialsFor(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Testimonials() {
  return (
    <section className="section-py bg-card/40 dark:bg-card-dark/30">
      <div className="mx-auto max-w-content container-px">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say about working together."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} variant="up" delay={i * 0.1}>
              <div className="h-full flex flex-col rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-7 shadow-soft dark:shadow-soft-dark">
                <Quote size={22} className="text-accent dark:text-accent-dark mb-4" strokeWidth={1.75} />
                <p className="flex-1 text-sm leading-relaxed text-ink dark:text-ink-dark text-balance">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 dark:bg-accent-dark/15 text-accent dark:text-accent-dark font-heading text-xs font-bold">
                    {initialsFor(t.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink dark:text-ink-dark">{t.name}</p>
                    <p className="text-xs text-muted dark:text-muted-dark">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
