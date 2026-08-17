import { useEffect, useState } from 'react'
import { ThemeContext } from './theme-context.js'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  let stored = null
  try {
    stored = window.localStorage.getItem('ab-theme')
  } catch {
    // localStorage unavailable — fall through to system preference
  }
  if (stored === 'light' || stored === 'dark') return stored
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    window.localStorage.setItem('ab-theme', theme)

    // Keep the browser chrome (theme-color) in sync with the active theme
    const metaThemeColor = document.getElementById('theme-color')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0A0A0C' : '#FAFAFA')
    }
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
