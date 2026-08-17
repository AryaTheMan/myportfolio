import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <Reveal
      variant="up"
      className={`flex flex-col gap-4 max-w-2xl ${alignment}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-accent dark:text-accent-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-accent dark:bg-accent-dark" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-muted dark:text-muted-dark leading-relaxed text-balance">
          {description}
        </p>
      )}
    </Reveal>
  )
}
