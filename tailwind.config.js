/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#FAFAFA',
          dark: '#0A0A0C',
        },
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#131316',
        },
        border: {
          DEFAULT: '#E7E7EA',
          dark: '#232327',
        },
        ink: {
          DEFAULT: '#111827',
          dark: '#F5F5F7',
        },
        muted: {
          DEFAULT: '#6B7280',
          dark: '#9BA1AC',
        },
        // The accent family is driven at runtime by CSS variables set in
        // src/data/accentPalettes.js (a random palette per page load).
        // Stored as RGB triplets so Tailwind can resolve opacity modifiers
        // like `bg-accent/10` through the <alpha-value> placeholder.
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          dark: 'rgb(var(--accent-dark) / <alpha-value>)',
        },
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        // 75rem = 1200px at the 16px base, 1600px once the desktop scale
        // (~1.33x root font) kicks in — the content column widens with it
        // so the sides stop feeling empty on large laptops.
        content: '75rem',
      },
      boxShadow: {
        // rem-based so shadows scale with the desktop root-font bump, keeping
        // the whole site's look faithful to the ~1.33x zoom we mimic.
        soft: '0 0.125rem 0.5rem rgba(17, 24, 39, 0.04), 0 0.0625rem 0.125rem rgba(17, 24, 39, 0.04)',
        card: '0 0.25rem 1rem rgba(17, 24, 39, 0.06), 0 0.0625rem 0.1875rem rgba(17, 24, 39, 0.04)',
        hover: '0 0.75rem 2rem rgba(17, 24, 39, 0.10), 0 0.125rem 0.375rem rgba(17, 24, 39, 0.06)',
        'soft-dark': '0 0.125rem 0.5rem rgba(0, 0, 0, 0.24), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2)',
        'card-dark': '0 0.25rem 1.25rem rgba(0, 0, 0, 0.36)',
        'hover-dark': '0 1rem 2.5rem rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
