import { useEffect, useRef } from 'react'
import { skillGroups } from '../data/portfolioData.js'

// Everything the marquee scrolls through, straight from the skills data so
// there's a single source of truth. Duplicated once so the seamless wrap
// (translate by half the track width) tiles without a visible seam.
const items = skillGroups.flatMap((group) => group.skills.map((skill) => skill.name))
const loop = [...items, ...items]

// One full loop of the track (half its width) in the same 28s the old CSS
// keyframe used, so the default speed is identical to before.
const LOOP_SECONDS = 28
// While hovered, ease down to this fraction of full speed — slow, but it
// never fully stops.
const HOVER_SPEED = 0.2

export default function TechMarquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Re-measure the content width whenever it can change — async fonts
    // (Sora/Inter) load after mount, and the window can resize. Otherwise the
    // seamless wrap point goes stale and a visible seam appears.
    let half = 0
    let baseSpeed = 0
    const measure = () => {
      half = track.scrollWidth / 2 // width of one copy of the content
      baseSpeed = half / LOOP_SECONDS // px per second at full speed
    }
    measure()
    document.fonts?.ready?.then(measure)
    window.addEventListener('resize', measure)

    let x = 0
    let speed = 0
    let hovered = false
    let rafId = 0
    let last = performance.now()

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      // Ease the speed toward the target (full speed ↔ hover speed) so the
      // slowdown and resume feel like a glide, not a snap.
      const target = hovered ? baseSpeed * HOVER_SPEED : baseSpeed
      speed += (target - speed) * (1 - Math.exp(-dt * 5))

      x -= speed * dt
      // Seamless wrap: once a full copy has scrolled past, jump back by its
      // width — visually indistinguishable from the CSS -50% loop.
      if (-x >= half) x += half
      track.style.transform = `translate3d(${x}px, 0, 0)`

      rafId = requestAnimationFrame(frame)
    }

    const onEnter = () => {
      hovered = true
    }
    const onLeave = () => {
      hovered = false
    }

    track.addEventListener('mouseenter', onEnter)
    track.addEventListener('mouseleave', onLeave)
    rafId = requestAnimationFrame(frame)

    return () => {
      track.removeEventListener('mouseenter', onEnter)
      track.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-border dark:border-border-dark bg-card/60 dark:bg-card-dark/60 py-5"
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {loop.map((name, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap font-heading text-sm font-semibold text-muted dark:text-muted-dark"
          >
            <span className="pr-3">{name}</span>
            <span className="pr-8">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent dark:bg-accent-dark" />
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
