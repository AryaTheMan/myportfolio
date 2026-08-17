/**
 * Abstract, generative-style thumbnail used in place of a real project
 * screenshot. Pattern + accent are derived per-project so the grid of
 * cards reads as varied and intentional rather than repeated stock art.
 */
export default function ProjectThumb({ accent = '#047857', pattern = 'grid', icon: Icon, className = '' }) {
  const patternId = `pattern-${pattern}-${accent.replace('#', '')}`

  const renderPattern = () => {
    if (pattern === 'dots') {
      return (
        <pattern id={patternId} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill={accent} opacity="0.35" />
        </pattern>
      )
    }
    // default: grid
    return (
      <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke={accent} strokeWidth="1" opacity="0.25" />
      </pattern>
    )
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          {renderPattern()}
          <linearGradient id={`fade-${patternId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.10" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#fade-${patternId})`} />
        <rect width="400" height="300" fill={`url(#${patternId})`} />
        <circle cx="330" cy="60" r="90" fill={accent} opacity="0.08" />
        <circle cx="40" cy="260" r="70" fill={accent} opacity="0.06" />
      </svg>

      {Icon && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-card-dark shadow-soft dark:shadow-soft-dark"
            style={{ color: accent }}
          >
            <Icon size={28} strokeWidth={1.75} />
          </div>
        </div>
      )}
    </div>
  )
}
