import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently most relevant in the viewport
 * so the navbar can highlight the matching link.
 *
 * A section becomes active the moment its top edge crosses a line 30% down
 * the viewport, and it stays active until the next section crosses that
 * line. Near the bottom of the page the final section is always active.
 * While the hero is on screen nothing is active (the hero is not in the nav).
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const update = () => {
      const line = window.innerHeight * 0.3
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2

      if (nearBottom) {
        setActiveId(elements[elements.length - 1].id)
        return
      }

      let current = ''
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) {
          current = el.id
        }
      }
      setActiveId(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')])

  return activeId
}
