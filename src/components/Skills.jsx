import { motion } from 'framer-motion'
import { Code2, BrainCircuit, Layers, Wrench, Rocket } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { skillGroups } from '../data/portfolioData.js'

const groupIcons = { programming: Code2, ai: BrainCircuit, frameworks: Layers, tools: Wrench, domains: Rocket }

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const chipVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const levelStyles = {
  Expert: 'bg-emerald-500',
  Advanced: 'bg-amber-500',
  Intermediate: 'bg-sky-500',
}

export default function Skills() {
  return (
    <section id="skills" className="section-py bg-card/40 dark:bg-card-dark/30">
      <div className="mx-auto max-w-content container-px">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I reach for."
          description="From Python to prompt engineering to production dashboards — the toolkit I use to ship AI-powered products."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => {
            const Icon = groupIcons[group.id]
            return (
              <Reveal key={group.id} variant="up" delay={gi * 0.1}>
                <div className="h-full rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-8 shadow-soft dark:shadow-soft-dark transition-shadow duration-300 hover:shadow-card dark:hover:shadow-card-dark">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 dark:bg-accent-dark/15 text-accent dark:text-accent-dark">
                      <Icon size={19} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-xl font-semibold">{group.title}</h3>
                  </div>
                  <p className="text-sm text-muted dark:text-muted-dark mb-6 leading-relaxed">
                    {group.description}
                  </p>

                  <motion.div
                    className="flex flex-wrap gap-2.5"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {group.skills.map((skill) => (
                      <motion.span
                        key={skill.name}
                        variants={chipVariants}
                        title={skill.level}
                        className="inline-flex items-center gap-2 rounded-full border border-border dark:border-border-dark bg-bg dark:bg-bg-dark px-3.5 py-2 text-sm font-medium text-ink dark:text-ink-dark transition-colors duration-200 hover:border-accent/40 dark:hover:border-accent-dark/50"
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 flex-none rounded-full ${levelStyles[skill.level] ?? 'bg-muted dark:bg-muted-dark'}`}
                        />
                        {skill.name}
                        <span className="text-[0.625rem] font-semibold uppercase tracking-wide text-muted dark:text-muted-dark">
                          {skill.level}
                        </span>
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
