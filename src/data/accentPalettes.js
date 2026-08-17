/**
 * Fixed set of primary-accent palettes.
 *
 * On every page load the site picks one of these at random and applies it to
 * CSS variables on <html>. Tailwind's `accent` colour family
 * (tailwind.config.js) and the base styles in index.css consume those
 * variables, so the whole site re-themes with zero extra CSS.
 *
 * Each shade is stored as an RGB triplet (space separated) because Tailwind
 * compiles `rgb(var(--accent) / <alpha-value>)`, which is what enables
 * opacity modifiers like `bg-accent/10` and `text-accent/60`.
 */

export const ACCENT_PALETTES = [
  {
    name: 'Emerald',
    accent: [4, 120, 87], // #047857
    dark: [52, 211, 153], // #34D399
  },
  {
    name: 'Blue',
    accent: [29, 78, 216], // #1D4ED8
    dark: [96, 165, 250], // #60A5FA
  },
  {
    name: 'Indigo',
    accent: [67, 56, 202], // #4338CA
    dark: [129, 140, 248], // #818CF8
  },
  {
    name: 'Violet',
    accent: [109, 40, 217], // #6D28D9
    dark: [167, 139, 250], // #A78BFA
  },
  {
    name: 'Rose',
    accent: [190, 18, 60], // #BE123C
    dark: [251, 113, 133], // #FB7185
  },
  {
    name: 'Amber',
    accent: [180, 83, 9], // #B45309
    dark: [251, 191, 36], // #FBBF24
  },
  {
    name: 'Teal',
    accent: [15, 118, 110], // #0F766E
    dark: [45, 212, 191], // #2DD4BF
  },
  {
    name: 'Cyan',
    accent: [14, 116, 144], // #0E7490
    dark: [34, 211, 238], // #22D3EE
  },
]

// Remembers the last palette used so a reload never lands on the same colour
// twice in a row (mirrors how the theme is stored under `ab-theme`).
const ACCENT_STORAGE_KEY = 'ab-accent'

/**
 * Pick a palette at random — never the one shown on the previous load — and
 * set it as the site's accent via CSS variables.
 *
 * Runs in src/main.jsx before React renders, so the very first paint already
 * uses the chosen colour — no flash of a default. The chosen palette name is
 * persisted in localStorage so the next load picks a different one.
 *
 * Returns the name of the applied palette (the terminal's `theme` command
 * uses it to report the new colour).
 */
export function applyRandomAccent() {
  if (typeof document === 'undefined') return null

  const lastAccent = readLastAccent()
  const pool = ACCENT_PALETTES.filter((p) => p.name !== lastAccent)
  // Fall back to the full set only if filtering left nothing (e.g. a
  // single-colour palette was configured).
  const source = pool.length > 0 ? pool : ACCENT_PALETTES
  const palette = source[Math.floor(Math.random() * source.length)]

  const root = document.documentElement
  root.style.setProperty('--accent', palette.accent.join(' '))
  root.style.setProperty('--accent-dark', palette.dark.join(' '))

  storeLastAccent(palette.name)

  // Let runtime consumers (e.g. the particle background) know the accent
  // changed mid-session, so they can re-read the variables.
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('accentchange'))
  }

  return palette.name
}

function readLastAccent() {
  try {
    return window.localStorage.getItem(ACCENT_STORAGE_KEY)
  } catch {
    // localStorage unavailable (or this isn't a browser) — treat as no memory
    return null
  }
}

function storeLastAccent(name) {
  try {
    window.localStorage.setItem(ACCENT_STORAGE_KEY, name)
  } catch {
    // localStorage unavailable — the next load just picks at random
  }
}
