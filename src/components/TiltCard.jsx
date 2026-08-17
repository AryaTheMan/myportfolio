import { useEffect, useRef } from 'react'

/**
 * TiltCard — 3D perspective tilt toward the pointer.
 *
 * - Rotates the card toward the pointer (rotateX / rotateY) on an eased
 *   rAF loop.
 * - Disabled for touch pointers and `prefers-reduced-motion`, so those
 *   users simply get a static card.
 */
export default function TiltCard({ children, maxTilt = 6, className = '' }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const finePointer = window.matchMedia('(pointer: fine)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reduceMotion.matches) return

    let rafId = 0
    let targetRX = 0
    let targetRY = 0
    let rx = 0
    let ry = 0

    const loop = () => {
      rx += (targetRX - rx) * 0.14
      ry += (targetRY - ry) * 0.14
      card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
      if (Math.abs(targetRX - rx) > 0.01 || Math.abs(targetRY - ry) > 0.01) {
        rafId = requestAnimationFrame(loop)
      } else {
        rafId = 0
      }
    }

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      targetRY = (px - 0.5) * maxTilt * 2
      targetRX = (0.5 - py) * maxTilt * 2
      if (!rafId) rafId = requestAnimationFrame(loop)
    }

    const onLeave = () => {
      targetRX = 0
      targetRY = 0
      // The loop may have already converged and stopped — restart it so
      // the card actually eases back to flat.
      if (!rafId) rafId = requestAnimationFrame(loop)
    }

    card.addEventListener('pointermove', onMove, { passive: true })
    card.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(rafId)
      card.removeEventListener('pointermove', onMove)
      card.removeEventListener('pointerleave', onLeave)
      card.style.transform = ''
    }
  }, [maxTilt])

  return (
    <div ref={cardRef} className={`relative rounded-2xl [transform-style:preserve-3d] ${className}`}>
      {children}
    </div>
  )
}
