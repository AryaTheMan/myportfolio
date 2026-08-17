import { useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme.js'

/**
 * Interactive particle network background.
 *
 * - Fixed behind all content (`-z-10`), `pointer-events-none`, so nothing
 *   blocks clicks or text selection.
 * - Nodes drift and connect when close; the cursor repels nearby nodes and
 *   lights up short lines to them. Clicking the canvas fires a punchy
 *   "burst" — repulsion spikes to 4x strength across 2.5x the radius, then
 *   snaps back to normal over ~0.3s.
 * - Parallax: each particle has a depth, so the field splits into layers
 *   that drift at different rates with scroll (eased for smoothness) —
 *   closer particles move more, which sells the depth.
 * - Theme-aware: the particle color eases between the light/dark palettes
 *   each frame, so the background crossfades in sync with the site's
 *   0.35s theme transition instead of snapping.
 * - Performance: DPR-capped canvas, density scales with viewport size,
 *   the rAF loop pauses when the tab is hidden, slows to ~10fps while the
 *   visitor is idle (no scroll/pointer), wrapped positions are computed
 *   once per frame, and alpha is applied via `globalAlpha` instead of
 *   allocating a new rgba() string per primitive.
 */

const FALLBACK_PALETTES = {
  light: { r: 4, g: 120, b: 87 },
  dark: { r: 52, g: 211, b: 153 },
}

// The accent palette is picked randomly on every load (see
// accentPalettes.js) and applied to CSS variables before React renders, so
// resolve it from those variables once and fall back to emerald if missing.
let PALETTES = null

function readAccentTriplet(name) {
  if (typeof document === 'undefined') return null
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const [r, g, b] = raw.split(/\s+/).map(Number)
  if (raw && [r, g, b].every((n) => Number.isFinite(n))) {
    return { r, g, b }
  }
  return null
}

function getPalettes() {
  if (!PALETTES) {
    PALETTES = {
      light: readAccentTriplet('--accent') || FALLBACK_PALETTES.light,
      dark: readAccentTriplet('--accent-dark') || FALLBACK_PALETTES.dark,
    }
  }
  return PALETTES
}

const LINK_DISTANCE = 130
const MOUSE_RADIUS = 150
// Clicking fires a burst: at the moment of the click, repulsion scales to
// 4x strength across 2.5x the radius, then snaps back over BURST_DURATION ms
// along a sharp cubic falloff so it feels punchy rather than floaty.
const BURST_DURATION = 300
const PARALLAX_FACTOR = 0.16
// When the visitor goes idle the animation doesn't stop — it gently eases
// from 60fps down to IDLE_FRAME_INTERVAL over IDLE_RAMP ms, and never drops
// below ~24fps so the drift stays visibly alive.
const IDLE_TIMEOUT = 2500 // ms of inactivity before the slowdown begins
const IDLE_RAMP = 1500 // ms to ease from 60fps down to the idle rate
const IDLE_FRAME_INTERVAL = 28 // ms between draws while fully idle (~35fps)

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const paletteTarget = useRef(getPalettes()[theme])

  // Keep the target palette in a ref so the (mount-once) animation loop can
  // ease toward it without restarting on every theme change.
  useEffect(() => {
    paletteTarget.current = getPalettes()[theme]
  }, [theme])

  // The accent can change mid-session (e.g. the terminal's `theme` command),
  // so re-read the CSS variables when that happens — the draw loop's easing
  // crossfades the particles to the new colour.
  useEffect(() => {
    const onAccentChange = () => {
      PALETTES = null // invalidate the memo so getPalettes() re-reads the vars
      paletteTarget.current = getPalettes()[theme]
    }
    window.addEventListener('accentchange', onAccentChange)
    return () => window.removeEventListener('accentchange', onAccentChange)
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    let width = 0
    let height = 0
    let rafId = 0
    let running = false
    let last = performance.now()
    let lastActivity = performance.now()
    let particles = []
    let scrollY = window.scrollY || 0
    let parallax = scrollY * PARALLAX_FACTOR // eased scroll offset, updated each frame
    // Wrapped screen positions, recomputed once per frame and reused by the
    // connection loop (avoids an O(n²) repeat of the modulo math).
    let xs = []
    let ys = []

    // Current color, eased toward paletteTarget.current every frame
    const palette = { ...paletteTarget.current }
    const mouse = { x: -9999, y: -9999 }
    let burstAt = -Infinity // timestamp of the last click burst

    const random = (min, max) => min + Math.random() * (max - min)

    function spawnParticles() {
      const count = Math.min(180, Math.max(40, Math.round((width * height) / 12000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        baseVx: random(-0.1, 0.1),
        baseVy: random(-0.1, 0.1),
        vx: 0,
        vy: 0,
        r: random(1.1, 2.2),
        depth: random(0.45, 1.35), // parallax depth — closer particles drift more
      }))
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      spawnParticles()
      // Resizing clears the canvas — repaint the static frame in reduced-motion mode
      if (reduceMotion) draw(1)
    }

    function draw(dt) {
      const target = paletteTarget.current
      const k = 1 - Math.exp(-dt * 4) // time constant ~0.25s, matches theme fade
      palette.r += (target.r - palette.r) * k
      palette.g += (target.g - palette.g) * k
      palette.b += (target.b - palette.b) * k

      const isDark = target === PALETTES.dark
      const lineMax = isDark ? 0.16 : 0.1
      const fillAlpha = isDark ? 0.7 : 0.55
      const cursorLinkMax = isDark ? 0.28 : 0.22

      ctx.clearRect(0, 0, width, height)

      // Ease the scroll offset so the background glides instead of stepping
      parallax += (scrollY * PARALLAX_FACTOR - parallax) * (1 - Math.exp(-dt * 3))

      // One wrapped position per particle per frame — reused by both the
      // connection loop and the node/mouse pass instead of recomputed in the
      // inner loop.
      const n = particles.length
      xs = new Array(n)
      ys = new Array(n)
      for (let i = 0; i < n; i++) {
        const p = particles[i]
        xs[i] = p.x
        ys[i] = ((p.y - parallax * p.depth) % height + height) % height
      }

      // Connections between nearby particles (single strokeStyle + globalAlpha
      // instead of a new rgba() string per line)
      ctx.strokeStyle = `rgba(${palette.r | 0}, ${palette.g | 0}, ${palette.b | 0}, 1)`
      ctx.lineWidth = 1
      for (let i = 0; i < n; i++) {
        const px = xs[i]
        const py = ys[i]
        for (let j = i + 1; j < n; j++) {
          const dx = px - xs[j]
          const dy = py - ys[j]
          if (dx * dx + dy * dy < LINK_DISTANCE * LINK_DISTANCE) {
            const dist = Math.sqrt(dx * dx + dy * dy)
            ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * lineMax
            ctx.beginPath()
            ctx.moveTo(px, py)
            ctx.lineTo(xs[j], ys[j])
            ctx.stroke()
          }
        }
      }

      // Burst intensity: 1 right after a click, falls off sharply over
      // BURST_DURATION (cubic ease-out so the peak doesn't linger). At the
      // peak the radius is 2.5x and the strength 4x.
      const burstT = (performance.now() - burstAt) / BURST_DURATION
      const burst = burstT >= 1 ? 0 : (1 - burstT) * (1 - burstT) * (1 - burstT)
      const radius = MOUSE_RADIUS * (1 + 1.5 * burst)
      const strengthScale = 1 + 3 * burst

      ctx.fillStyle = `rgba(${palette.r | 0}, ${palette.g | 0}, ${palette.b | 0}, 1)`
      for (let i = 0; i < n; i++) {
        const p = particles[i]
        const px = xs[i]
        const py = ys[i]
        const dxm = px - mouse.x
        const dym = py - mouse.y
        const dm2 = dxm * dxm + dym * dym

        if (dm2 < radius * radius && dm2 > 0.01) {
          const dm = Math.sqrt(dm2)
          // Repel: push away from the cursor, strongest at its centre
          const push = (radius - dm) / radius
          const strength = 0.05 * strengthScale * push
          p.vx += (dxm / dm) * strength
          p.vy += (dym / dm) * strength

          // Faint line from particle to the cursor
          ctx.globalAlpha = (1 - dm / radius) * cursorLinkMax
          ctx.beginPath()
          ctx.moveTo(px, py)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }

        // Gently recover toward the base drift velocity after a push
        p.vx += (p.baseVx - p.vx) * 0.02
        p.vy += (p.baseVy - p.vy) * 0.02

        p.x += p.vx
        p.y += p.vy

        const margin = 40
        if (p.x < -margin) p.x = width + margin
        else if (p.x > width + margin) p.x = -margin
        if (p.y < -margin) p.y = height + margin
        else if (p.y > height + margin) p.y = -margin

        // Depth cues: nearer particles render slightly larger and brighter
        const depthScale = 0.8 + p.depth * 0.35
        ctx.globalAlpha = Math.min(1, fillAlpha * depthScale)
        ctx.beginPath()
        ctx.arc(px, py, p.r * depthScale, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    function frame(now) {
      // Idle handling: after IDLE_TIMEOUT with no activity, ramp the redraw
      // interval from 60fps up to IDLE_FRAME_INTERVAL over IDLE_RAMP ms — so
      // the slowdown feels like a gentle calm-down rather than a sudden
      // freeze, and the field never looks fully stopped. Activity resets
      // lastActivity, snapping the loop straight back to full speed.
      const idleTime = now - lastActivity
      const ramp = Math.min(Math.max((idleTime - IDLE_TIMEOUT) / IDLE_RAMP, 0), 1)
      const interval = ramp * IDLE_FRAME_INTERVAL
      if (now - last < interval) {
        rafId = requestAnimationFrame(frame)
        return
      }
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      draw(dt)
      rafId = requestAnimationFrame(frame)
    }

    function start() {
      if (running) return
      running = true
      last = performance.now()
      rafId = requestAnimationFrame(frame)
    }

    function stop() {
      running = false
      cancelAnimationFrame(rafId)
    }

    function onVisibilityChange() {
      if (document.hidden) stop()
      else if (!reduceMotion) start()
    }

    function onPointerMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
      lastActivity = performance.now()
      if (!running && !reduceMotion) start()
    }

    function onPointerDown(e) {
      // Fire the burst at the click point (same as the cursor position)
      mouse.x = e.clientX
      mouse.y = e.clientY
      burstAt = performance.now()
      lastActivity = performance.now()
      if (!running && !reduceMotion) start()
    }

    function onPointerUp(e) {
      // Don't leave a stuck repulsion point after a touch ends
      if (e.pointerType !== 'mouse') {
        mouse.x = -9999
        mouse.y = -9999
      }
      lastActivity = performance.now()
    }

    function onPointerOut(e) {
      // Cursor left the window
      if (!e.relatedTarget) {
        mouse.x = -9999
        mouse.y = -9999
      }
    }

    function onScroll() {
      scrollY = window.scrollY
      lastActivity = performance.now()
      if (!running && !reduceMotion) start()
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointerout', onPointerOut)
    document.addEventListener('visibilitychange', onVisibilityChange)

    // In reduced-motion mode resize() already painted the static frame;
    // otherwise kick off the animation loop.
    if (!reduceMotion) start()

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointerout', onPointerOut)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
