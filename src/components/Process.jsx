import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { processSteps } from '../data/portfolioData.js'

export default function Process() {
  return (
    <section id="process" className="section-py">
      <div className="mx-auto max-w-content container-px">
        <SectionHeading
          eyebrow="My Process"
          title="How an idea becomes something real."
          description="Six stages, in order — each one exists to catch what the last one couldn't."
        />

        <div className="mt-16 relative">
          {/* Connecting line — desktop only, sits behind the numbered nodes */}
          <div className="hidden lg:block absolute left-0 right-0 top-6 h-px bg-border dark:bg-border-dark" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-12">
            {processSteps.map((step, i) => (
              <Reveal key={step.id} variant="up" delay={i * 0.07} className="relative flex flex-col items-start lg:items-center lg:text-center">
                <div className="relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-full bg-bg dark:bg-bg-dark border-2 border-ink dark:border-ink-dark font-heading text-sm font-bold">
                  {step.id}
                </div>
                <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted dark:text-muted-dark leading-relaxed lg:max-w-[11.25rem]">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
