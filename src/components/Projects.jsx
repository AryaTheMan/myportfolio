import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'
import { projects } from '../data/portfolioData.js'

const categories = ['All', ...new Set(projects.map((p) => p.category))]
const countFor = (category) =>
  category === 'All' ? projects.length : projects.filter((p) => p.category === category).length

export default function Projects() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="work" className="section-py">
      <div className="mx-auto max-w-content container-px">
        <SectionHeading
          eyebrow="Featured Work"
          title="A few projects worth showing."
          description="AI-powered products in EdTech and FinTech — each one built to solve a real problem end to end."
        />

        <Reveal variant="up" delay={0.05} className="mt-10">
          <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter projects by category">
            {categories.map((category) => {
              const isActive = category === active
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                    isActive
                      ? 'bg-accent text-white dark:bg-accent-dark dark:text-bg-dark shadow-card dark:shadow-card-dark'
                      : 'border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:border-accent/40 dark:hover:border-accent-dark/50'
                  }`}
                >
                  {category}
                  <span className={`text-xs ${isActive ? 'opacity-80' : 'opacity-50'}`}>{countFor(category)}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
