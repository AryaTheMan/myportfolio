import { useEffect, useRef, useState } from 'react'

/**
 * Custom cursor — a shape that cycles on every click.
 *
 * - Desktop only: enabled when the device has a fine pointer; disabled for
 *   touch devices and when `prefers-reduced-motion` is set (native cursor
 *   stays in those cases).
 * - The current shape (square → triangle → circle → star → diamond → plus)
 *   tracks the pointer exactly; every click advances to the next shape with
 *   a quick pop. Only the scale eases (grows over interactive elements,
 *   contracts while pressing).
 * - `pointer-events-none` and the `.custom-cursor` class (which sets
 *   `cursor: none`) mean it never blocks clicks or doubles up with the OS
 *   cursor.
 * - The animation loop/listeners are started and stopped by the same
 *   function that toggles `enabled`, so toggling `prefers-reduced-motion`
 *   (or pointer mode) at runtime works in both directions.
 */

// ── Tuning knobs ──────────────────────────────────────────────
// Shape feedback scale on hover / while pressing
const HOVER_SCALE = 1.3
const PRESS_SCALE = 0.8
// Scale popped to momentarily when the shape changes on click
const POP_SCALE = 1.6

// Shapes drawn inside a 24×24 viewBox, centred on the cursor. All inherit
// the accent stroke + faint fill from the wrapping <g>.
const SHAPES = [
  <rect key="square" x="5" y="5" width="14" height="14" rx="2" vectorEffect="non-scaling-stroke" />,
  <polygon key="triangle" points="12,4.5 21,19 3,19" vectorEffect="non-scaling-stroke" />,
  <circle key="circle" cx="12" cy="12" r="7" vectorEffect="non-scaling-stroke" />,
  <polygon
    key="star"
    points="12,2.5 14.2,9 21,9.1 15.5,13.1 17.6,19.7 12,15.7 6.4,19.7 8.5,13.1 3,9.1 9.8,9"
    vectorEffect="non-scaling-stroke"
  />,
  <polygon key="diamond" points="12,3.5 20.5,12 12,20.5 3.5,12" vectorEffect="non-scaling-stroke" />,
  <path key="plus" d="M12 5v14M5 12h14" vectorEffect="non-scaling-stroke" />,
]

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [shapeIndex, setShapeIndex] = useState(0)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const pos = { x: -100, y: -100 }
    let hovering = false
    let pressing = false
    let hasMoved = false
    let running = false
    let rafId = 0
    let scale = 1

    const render = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`
      }
    }

    const onPointerMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      // Only hide the native cursor once the custom one has a real position
      if (!hasMoved) {
        hasMoved = true
        document.documentElement.classList.add('custom-cursor')
      }
      // Position tracks the pointer exactly — no easing needed here, so just
      // reposition; the rAF loop is only for scale feedback.
      render()
    }

    const onPointerOver = (e) => {
      hovering = Boolean(e.target.closest?.(INTERACTIVE_SELECTOR))
      ensureRunning()
    }

    const onPointerDown = (e) => {
      if (e.button !== 0) return
      pressing = true
      // Cycle the cursor shape on every primary click, with a pop
      setShapeIndex((i) => (i + 1) % SHAPES.length)
      scale = POP_SCALE
      ensureRunning()
    }

    const onPointerUp = () => {
      pressing = false
      ensureRunning()
    }

    const onPointerOut = (e) => {
      // Pointer left the window — tuck the cursor away instantly and
      // remember to snap back on re-entry
      if (!e.relatedTarget) {
        hovering = false
        pressing = false
        pos.x = -100
        pos.y = -100
        scale = 1
        render()
      }
    }

    const frame = () => {
      // Only the scale eases — the shape itself tracks the pointer exactly
      const target = pressing ? PRESS_SCALE : hovering ? HOVER_SCALE : 1
      scale += (target - scale) * 0.16
      render()
      // Once the scale has settled, stop the loop until the next pointer
      // event so the page isn't burning a frame every ~16ms forever.
      if (Math.abs(scale - target) < 0.01) {
        rafId = 0
        return
      }
      rafId = requestAnimationFrame(frame)
    }

    const ensureRunning = () => {
      // Only ever called while the listeners are attached; start the loop
      // back up if it has settled and stopped (rafId reset to 0).
      if (rafId === 0) rafId = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerover', onPointerOver, { passive: true })
      window.addEventListener('pointerdown', onPointerDown, { passive: true })
      window.addEventListener('pointerup', onPointerUp, { passive: true })
      window.addEventListener('pointerout', onPointerOut, { passive: true })
      ensureRunning()
    }

    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(rafId)
      rafId = 0
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerover', onPointerOver)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointerout', onPointerOut)
    }

    const updateEnabled = () => {
      const on = finePointer.matches && !reduceMotion.matches
      setEnabled(on)
      if (on) {
        start()
      } else {
        hasMoved = false
        scale = 1
        pos.x = -100
        pos.y = -100
        document.documentElement.classList.remove('custom-cursor')
        stop()
      }
    }

    updateEnabled()
    finePointer.addEventListener('change', updateEnabled)
    reduceMotion.addEventListener('change', updateEnabled)

    return () => {
      stop()
      finePointer.removeEventListener('change', updateEnabled)
      reduceMotion.removeEventListener('change', updateEnabled)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <svg
      ref={cursorRef}
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="pointer-events-none fixed left-0 top-0 z-[200] h-5 w-5 -ml-2.5 -mt-2.5 overflow-visible text-accent dark:text-accent-dark will-change-transform [filter:drop-shadow(0_0_5px_rgb(var(--accent)/0.4))] dark:[filter:drop-shadow(0_0_5px_rgb(var(--accent-dark)/0.4))]"
      style={{ transform: 'translate(-100px, -100px) scale(1)' }}
    >
      <g
        fill="currentColor"
        fillOpacity={0.08}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {SHAPES[shapeIndex]}
      </g>
    </svg>
  )
}
