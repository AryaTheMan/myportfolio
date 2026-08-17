import { useEffect, useRef } from 'react'

/**
 * Magnetic — pulls its children toward the cursor while hovered.
 *
 * - Wraps a button/link in a translating span, so the child keeps its own
 *   hover transforms (scale, etc.) without conflicting.
 * - Only active on fine pointers and when motion is allowed — touch
 *   devices and `prefers-reduced-motion` get the plain, static element.
 */
export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const finePointer = window.matchMedia('(pointer: fine)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reduceMotion.matches) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`
    }

    const onLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)'
    }

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.style.transform = ''
    }
  }, [strength])

  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </span>
  )
}
