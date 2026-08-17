# Aryaman Bhattacharjee — Portfolio

A premium, minimalist portfolio site for an AI developer — generative AI, Python, machine learning and data-driven products. Built with React, Vite, Tailwind CSS and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## Tech stack

- **React 18** + **Vite 5** — fast dev server, optimized production build
- **Tailwind CSS 3** — utility-first styling, custom design tokens in `tailwind.config.js`
- **Framer Motion** — scroll reveals, hover states, page-load sequence, mobile menu transitions
- **Lucide React** — icon set

## Project structure

```
├── public/
│   ├── favicon.svg
│   └── resume.pdf          # placeholder resume, regenerate via scripts/make_resume.mjs
├── src/
│   ├── components/
│   │   ├── placeholders/   # ProjectThumb.jsx — generated SVG placeholder art
│   │   ├── Navbar.jsx, Hero.jsx, About.jsx, Skills.jsx, Projects.jsx,
│   │   │   ProjectCard.jsx, ProjectGallery.jsx (per-project page at /projects/:id),
│   │   │   Experience.jsx, Process.jsx, Testimonials.jsx, Contact.jsx, Footer.jsx,
│   │   │   LoadingScreen.jsx, BackToTop.jsx, ScrollManager.jsx, Reveal.jsx, SectionHeading.jsx
│   ├── context/             # ThemeContext (dark mode) + theme-context.js
│   ├── hooks/                # useTheme, useActiveSection (scroll-spy for nav)
│   ├── data/portfolioData.js # ALL site copy lives here — edit this file to update content
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── scripts/make_resume.mjs    # regenerates public/resume.pdf (run: npm run gen:resume)
├── tailwind.config.js
├── vite.config.js
└── netlify.toml
```

## Editing content

Everything text-based — your name, titles, about paragraph, skills, projects, experience, process steps, testimonials, and social links — lives in **`src/data/portfolioData.js`**. Edit that one file to update the site; you don't need to touch the components themselves for content changes.

### Project gallery pages

Each project in `portfolioData.js` can carry a `gallery` array — the text and images shown on its own page at `/projects/<id>` (reachable via the **Details** button on the project card). A gallery entry looks like:

```js
gallery: [
  {
    heading: 'Section title',
    paragraphs: ['Some text…', 'More text…'],
    images: ['/projects/smart-parking-system/photo.jpg'],
  },
],
```

Drop image files into `public/projects/<project-id>/` and reference them with absolute paths like `/projects/ai-multi-document-valuation-assistant/photo.jpg`. If an image path is missing or the file doesn't exist yet, the page shows the generated SVG placeholder art instead — so nothing ever looks broken while you're filling the gallery in.

## Placeholder art

Project thumbnails are generated as inline SVG (`src/components/placeholders/ProjectThumb.jsx`) so there are no broken-image icons and zero image-loading cost until you add real screenshots. The hero portrait now uses a real photo at `public/profile.jpeg` — swap that file to change it. When adding real project screenshots, swap `<ProjectThumb />` for an `<img>` tag — remember to add `loading="lazy"` to any image below the fold.

## Replacing the résumé

`public/resume.pdf` is a generated placeholder that mirrors the site's content. Replace it with your real résumé (keep the filename `resume.pdf`, or update the `href` in `src/components/Hero.jsx`). To regenerate the placeholder after editing `portfolioData.js`:

```bash
npm run gen:resume
```

(No Python/reportlab needed — it uses [pdf-lib](https://pdf-lib.js.org/) under the hood.)

## Features

- Dark mode with system-preference detection and persistence (toggle in the navbar)
- Sticky navbar — transparent at the top, solid on scroll, with active-section highlighting and smooth-scroll links
- Mobile menu with staggered entrance animation
- Scroll-triggered reveal animations throughout (fade-up, scale, slide)
- Loading screen on first paint
- Back-to-top button
- Per-project gallery pages (`/projects/:id`) with hardcoded text + images (see above)
- Fully responsive, from 375px phones to ultra-wide desktops
- Keyboard-focus states and `prefers-reduced-motion` support

## Deploying to Netlify

Routing uses `react-router-dom`. `netlify.toml` already redirects all paths to `index.html`, so deep links like `/projects/smart-parking-system` work in production. (Vite's dev server handles this automatically in `npm run dev`.)

This project is pre-configured for Netlify (`netlify.toml`):

1. Push this project to a GitHub/GitLab/Bitbucket repo, or drag-and-drop the `dist/` folder (after running `npm run build`) into Netlify's dashboard.
2. If connecting a repo: build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).
3. Deploy.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge — last 2 versions).
