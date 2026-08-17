import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, Calendar, Wrench } from 'lucide-react'
import Reveal from './Reveal.jsx'
import ProjectThumb from './placeholders/ProjectThumb.jsx'
import { projects } from '../data/portfolioData.js'

/**
 * Renders an image from the project's hardcoded gallery data. If the path
 * is missing or fails to load (404), falls back to the generated SVG art so
 * the page never shows a broken image icon.
 */
function GalleryImage({ src, alt, accent, pattern, className = '' }) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed

  if (showPlaceholder) {
    return (
      <div className={`relative h-full w-full overflow-hidden rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark ${className}`}>
        <ProjectThumb accent={accent} pattern={pattern} className="h-full" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover rounded-2xl border border-border dark:border-border-dark ${className}`}
    />
  )
}

export default function ProjectGallery() {
  const { projectId } = useParams()
  const index = projects.findIndex((p) => p.id === projectId)
  const project = index === -1 ? null : projects[index]
  const prev = index > 0 ? projects[index - 1] : null
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : null

  useEffect(() => {
    document.title = project
      ? `${project.title} — Aryaman Bhattacharjee`
      : 'Project not found — Aryaman Bhattacharjee'
    return () => {
      document.title = 'Aryaman Bhattacharjee — AI Developer & Python Developer'
    }
  }, [project])

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-24 pb-24">
        <div className="text-center container-px">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Project not found</h1>
          <p className="text-muted dark:text-muted-dark mb-8">
            That project doesn&rsquo;t exist — or hasn&rsquo;t been published yet.
          </p>
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 rounded-full bg-ink dark:bg-ink-dark text-bg dark:text-bg-dark px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </div>
      </main>
    )
  }

  const gallery = project.gallery ?? []
  const heroSrc = gallery[0]?.images?.[0]

  return (
    <main className="pt-28 pb-24">
      <div className="mx-auto max-w-content container-px">
        {/* Back link */}
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark transition-colors duration-200 mb-10"
        >
          <ArrowLeft size={16} />
          All projects
        </Link>

        {/* Header */}
        <Reveal variant="up" className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="rounded-full border border-border dark:border-border-dark bg-card dark:bg-card-dark px-3.5 py-1.5 text-xs font-medium text-muted dark:text-muted-dark">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border dark:border-border-dark bg-card dark:bg-card-dark px-3.5 py-1.5 text-xs font-medium text-muted dark:text-muted-dark">
              <Calendar size={12} />
              {project.year}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.08] text-balance">
            {project.title}
          </h1>
          <p className="mt-5 text-lg text-muted dark:text-muted-dark leading-relaxed text-balance">
            {project.description}
          </p>
          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink dark:bg-ink-dark text-bg dark:text-bg-dark px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Visit repository
              <ArrowUpRight size={16} />
            </a>
          )}
        </Reveal>

        {/* Hero image / placeholder art */}
        <Reveal variant="scale" delay={0.08} className="mt-10 h-64 sm:h-80 lg:h-[26.25rem]">
          <GalleryImage
            src={heroSrc}
            alt={`${project.title} — hero image`}
            accent={project.accent}
            pattern={project.pattern}
          />
        </Reveal>

        {/* Meta cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-5">
            <Briefcase size={17} className="mb-3 text-accent dark:text-accent-dark" strokeWidth={1.75} />
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted dark:text-muted-dark mb-1.5">
              Role
            </p>
            <p className="text-sm font-medium text-ink dark:text-ink-dark leading-snug">{project.role}</p>
          </div>
          <div className="rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-5">
            <Wrench size={17} className="mb-3 text-accent dark:text-accent-dark" strokeWidth={1.75} />
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted dark:text-muted-dark mb-1.5">
              Tools
            </p>
            <p className="text-sm font-medium text-ink dark:text-ink-dark leading-snug">
              {project.tools.join(' · ')}
            </p>
          </div>
          <div className="rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-5">
            <Calendar size={17} className="mb-3 text-accent dark:text-accent-dark" strokeWidth={1.75} />
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted dark:text-muted-dark mb-1.5">
              Year
            </p>
            <p className="text-sm font-medium text-ink dark:text-ink-dark leading-snug">{project.year}</p>
          </div>
        </div>

        {/* Gallery sections: text + images, hardcoded in portfolioData.js */}
        <div className="mt-16 flex flex-col gap-16">
          {gallery.map((section, i) => (
            <Reveal key={i} variant="up" delay={0.05} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
              <div className={section.images?.length ? '' : 'lg:col-span-2'}>
                <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                <div className="flex flex-col gap-4">
                  {section.paragraphs.map((paragraph, pi) => (
                    <p key={pi} className="text-base text-ink dark:text-ink-dark leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {section.images?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.images.map((src, ii) => (
                    <div
                      key={ii}
                      className={`${section.images.length > 1 ? 'h-52' : 'sm:col-span-2 h-64'}`}
                    >
                      <GalleryImage
                        src={src}
                        alt={`${project.title} — ${section.heading} ${ii + 1}`}
                        accent={project.accent}
                        pattern={project.pattern}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal variant="up" className="mt-20 rounded-2xl border border-border dark:border-border-dark bg-card/40 dark:bg-card-dark/30 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1.5">Like what you see?</h2>
            <p className="text-sm text-muted dark:text-muted-dark">
              More AI-powered products in the pipeline — let&rsquo;s talk.
            </p>
          </div>
          <Link
            to="/#contact"
            className="inline-flex flex-none items-center gap-2 rounded-full bg-ink dark:bg-ink-dark text-bg dark:text-bg-dark px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Get in touch
          </Link>
        </Reveal>

        {/* Prev / next project */}
        <nav className="mt-14 flex flex-col sm:flex-row items-stretch justify-between gap-4 border-t border-border dark:border-border-dark pt-10">
          {prev ? (
            <Link
              to={`/projects/${prev.id}`}
              className="group flex flex-col gap-1 rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-5 hover:shadow-card dark:hover:shadow-card-dark transition-shadow duration-300"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted dark:text-muted-dark group-hover:text-ink dark:group-hover:text-ink-dark transition-colors duration-200">
                <ArrowLeft size={13} />
                Previous project
              </span>
              <span className="text-base font-semibold">{prev.title}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" aria-hidden="true" />
          )}
          {next ? (
            <Link
              to={`/projects/${next.id}`}
              className="group flex flex-col gap-1 rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-5 sm:text-right hover:shadow-card dark:hover:shadow-card-dark transition-shadow duration-300"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted dark:text-muted-dark sm:justify-end group-hover:text-ink dark:group-hover:text-ink-dark transition-colors duration-200">
                Next project
                <ArrowRight size={13} />
              </span>
              <span className="text-base font-semibold">{next.title}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" aria-hidden="true" />
          )}
        </nav>
      </div>
    </main>
  )
}
