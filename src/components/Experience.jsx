import { Briefcase } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { experience } from '../data/portfolioData.js'

export default function Experience() {
  return (
    <section id="experience" className="section-py bg-card/40 dark:bg-card-dark/30">
      <div className="mx-auto max-w-content container-px">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked and what I learned."
        />

        <div className="mt-14 relative max-w-3xl">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border dark:bg-border-dark" aria-hidden="true" />

          <div className="flex flex-col gap-10">
            {experience.map((item, i) => (
              <Reveal key={item.id} variant="left" delay={i * 0.1} className="relative flex gap-6">
                <div className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-bg dark:bg-bg-dark border-2 border-accent dark:border-accent-dark text-accent dark:text-accent-dark">
                  <Briefcase size={16} strokeWidth={2} />
                </div>

                <div className="flex-1 rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-6 shadow-soft dark:shadow-soft-dark">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                    <h3 className="text-lg font-semibold">{item.role}</h3>
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-accent dark:text-accent-dark">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-muted dark:text-muted-dark mb-3">{item.org}</p>
                  <p className="text-sm leading-relaxed text-ink dark:text-ink-dark mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-bg dark:bg-bg-dark border border-border dark:border-border-dark px-3 py-1 text-xs font-medium text-muted dark:text-muted-dark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
