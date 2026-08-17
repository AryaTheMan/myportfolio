import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Keeps scroll position sane across route changes and page loads.
 *
 * Lives inside the keyed animated route wrapper, so it remounts on every
 * navigation and its logic runs exactly once — after the new page has
 * mounted (i.e. after the exit animation finishes):
 * - On a plain route change, jumps straight to the top of the new page.
 * - When the URL carries a hash (e.g. navigating home with /#about),
 *   smooth-scrolls to that section once the target page has mounted.
 *
 * Runs before paint (layout effect) so the jump happens before the user
 * sees the new page. (The browser's native scroll restoration on reload is
 * disabled at module scope in main.jsx.)
 */
export default function ScrollManager() {
  const { hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      const rafId = requestAnimationFrame(() => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return
        }
        window.scrollTo({ top: 0, behavior: 'instant' })
      })
      return () => cancelAnimationFrame(rafId)
    }

    // Always pass an explicit behavior so the jump is instant even though
    // no CSS-level scroll-behavior is set on `html`.
    window.scrollTo({ top: 0, behavior: 'instant' })
    // Intentionally runs only on mount — the keyed wrapper remounts this
    // component on every route change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
