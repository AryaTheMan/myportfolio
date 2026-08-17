import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, Layers, Sparkles, LineChart, Code2 } from 'lucide-react'
import ProjectThumb from './placeholders/ProjectThumb.jsx'
import TiltCard from './TiltCard.jsx'

// Icons for the project categories currently in use — anything unknown falls
// back to the generic Layers icon below.
const categoryIcons = {
  'Generative AI | EdTech': Sparkles,
  'FinTech | AI': LineChart,
  'Web Development': Code2,
}

export default function ProjectCard({ project }) {
  const Icon = categoryIcons[project.category] ?? Layers

  return (
    <TiltCard className="h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="group h-full rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark overflow-hidden shadow-soft dark:shadow-soft-dark hover:shadow-hover dark:hover:shadow-hover-dark transition-shadow duration-300"
      >
        <div className="relative h-56 overflow-hidden">
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectThumb accent={project.accent} pattern={project.pattern} icon={Icon} className="h-full" />
          </motion.div>
          <span className="absolute top-4 left-4 rounded-full bg-white dark:bg-card-dark px-3 py-1 text-xs font-semibold text-ink dark:text-ink-dark shadow-soft dark:shadow-soft-dark">
            {project.category}
          </span>
          <span className="absolute top-4 right-4 rounded-full bg-black/60 dark:bg-white/10 px-2.5 py-1 text-xs font-medium text-white">
            {project.year}
          </span>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-1.5">{project.title}</h3>
            <p className="text-sm text-muted dark:text-muted-dark leading-relaxed">{project.description}</p>
          </div>

          <div className="flex flex-col gap-1.5 text-xs text-muted dark:text-muted-dark">
            <div className="flex gap-1.5">
              <span className="font-semibold text-ink dark:text-ink-dark">Role:</span>
              <span>{project.role}</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <span className="font-semibold text-ink dark:text-ink-dark">Tools:</span>
              <span>{project.tools.join(' · ')}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink dark:bg-ink-dark text-bg dark:text-bg-dark px-4 py-2 text-xs font-semibold transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]"
            >
              <Eye size={13} />
              Details
            </Link>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  )
}
