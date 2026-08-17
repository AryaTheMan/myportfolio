import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { applyRandomAccent } from './data/accentPalettes.js'
import './index.css'

// Pick a random primary accent before React renders so the first paint
// (including the loading screen) already uses it — no flash of a default.
applyRandomAccent()

// Also set inline in index.html <head> (before the deferred bundle runs) so
// the browser never restores the scroll position on reload. This module-scope
// repeat is a harmless guard for any environment where the inline script was
// skipped. ScrollManager handles scrolling on route changes.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
