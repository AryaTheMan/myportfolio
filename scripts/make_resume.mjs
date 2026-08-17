#!/usr/bin/env node
/**
 * Generates public/resume.pdf — a placeholder resume that mirrors the site's
 * content. Replaces the old scripts/make_resume.py (which required reportlab);
 * this version runs anywhere with Node, no Python needed.
 *
 * Usage:
 *   npm run gen:resume
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH = path.join(__dirname, '..', 'public', 'resume.pdf')

// ── Palette (mirrors tailwind.config.js) ──────────────────────────
const INK = rgb(17 / 255, 24 / 255, 39 / 255) // #111827
const MUTED = rgb(107 / 255, 114 / 255, 128 / 255) // #6B7280
const ACCENT = rgb(4 / 255, 120 / 255, 87 / 255) // #047857
const BORDER = rgb(231 / 255, 231 / 255, 234 / 255) // #E7E7EA

const PAGE_W = 612 // Letter
const PAGE_H = 792
const MARGIN_X = 50
const MARGIN_Y = 50
const CONTENT_W = PAGE_W - MARGIN_X * 2

// ── Content (mirrors src/data/portfolioData.js) ───────────────────
const NAME = 'Aryaman Bhattacharjee'
const TAGLINE = 'AI Developer · Python Developer · Generative AI Enthusiast'
const CONTACT =
  'bhattacharjeearyaman2@gmail.com  |  linkedin.com/in/aryaman-bhattacharjee-b618822ba  |  github.com/AryaTheMan'

const ABOUT =
  'Computer Science student passionate about Artificial Intelligence, Machine Learning, Software ' +
  'Engineering and Product Development. Experienced in building AI-powered applications using ' +
  'Python, Streamlit, Generative AI APIs and modern development tools. Interested in creating ' +
  'practical solutions in EdTech, FinTech and intelligent automation.'

const EXPERIENCE = [
  {
    role: 'AI Tools Workshop',
    org: 'be10x',
    period: '2025',
    desc:
      'Hands-on workshop covering NotebookLM, Claude, Julius AI, Wispr Flow, ChatGPT and Custom GPTs — ' +
      'practical AI tools for productivity, research, automation and development.',
  },
  {
    role: 'Machine Learning Workshop — MIND MEETS MACHINE',
    org: 'PRODINNO Club, VIT Chennai',
    period: '2025',
    desc:
      'Machine learning fundamentals, data analytics, Python for ML, AI applications and intelligent systems.',
  },
  {
    role: 'Delegate — Ethiopia · United Nations General Assembly',
    org: 'VIT Chennai Intra MUN 2026',
    period: '2026',
    desc:
      'Represented Ethiopia on the agenda of the Suez Crisis (1956), developing public speaking, ' +
      'negotiation, diplomacy, research and critical-thinking skills.',
  },
]

const PROJECTS = [
  ['AI Multi-Document Valuation Assistant (2025)', 'AI-powered answer-sheet evaluation assistant — processes syllabi, question papers, guidelines and answer scripts with Google Gemini to generate marks, feedback and insights via an interactive dashboard.'],
  ['Personal Finance Intelligence Platform (2025)', 'Financial management system with expense tracking, budget analysis, portfolio analytics and market insights — powered by Python, Streamlit and yFinance.'],
  ['AI Developer Portfolio (2026)', 'This portfolio website — a responsive single-page site with an interactive terminal, particle background, custom cursor and dark mode, built with React, Vite, Tailwind CSS and Framer Motion.'],
]

const SKILL_COLUMNS = [
  ['Programming', 'Python, C, C++'],
  ['AI & Data', 'Generative AI, Machine Learning, Prompt Engineering, Data Analysis'],
  ['Frameworks, Tools & Domains', 'Streamlit, Google GenAI SDK, Git, GitHub, VS Code, NotebookLM, Claude, Julius AI'],
]

const EDUCATION = ['B.Tech, Computer Science', 'VIT Chennai']

// ── Helpers ────────────────────────────────────────────────────────
const wrapText = (text, font, size, maxWidth) => {
  const words = text.split(/\s+/)
  const lines = []
  let current = ''
  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (font.widthOfTextAtSize(test, size) > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}

async function main() {
  const doc = await PDFDocument.create()
  const page = doc.addPage([PAGE_W, PAGE_H])
  const regular = await doc.embedFont(StandardFonts.Helvetica)
  const bold = await doc.embedFont(StandardFonts.HelveticaBold)
  const oblique = await doc.embedFont(StandardFonts.HelveticaOblique)

  let y = PAGE_H - MARGIN_Y

  const text = (str, { font = regular, size = 10, color = INK, x = MARGIN_X, spacing = 0 } = {}) => {
    page.drawText(str, { x, y, size, font, color })
    y -= size + spacing
  }

  const paragraph = (str, { font = regular, size = 9.7, color = INK, x = MARGIN_X, maxWidth = CONTENT_W, spacing = 0, leading = 4 } = {}) => {
    for (const line of wrapText(str, font, size, maxWidth)) {
      page.drawText(line, { x, y, size, font, color })
      y -= size + leading
    }
    if (spacing) y -= spacing
  }

  const rule = (thickness = 1, color = BORDER, gap = 6) => {
    y -= gap
    page.drawLine({
      start: { x: MARGIN_X, y },
      end: { x: PAGE_W - MARGIN_X, y },
      thickness,
      color,
    })
    y -= gap
  }

  const sectionTitle = (title) => {
    y -= 14
    page.drawText(title, { x: MARGIN_X, y, size: 11.5, font: bold, color: INK })
    y -= 6
    rule(0.75, BORDER, 6)
  }

  // Header
  text(NAME, { font: bold, size: 24, color: INK, spacing: 2 })
  text(TAGLINE, { size: 12, color: ACCENT, spacing: 10 })
  text(CONTACT, { size: 9.5, color: MUTED, spacing: 4 })
  rule(1, BORDER, 10)

  // About
  sectionTitle('ABOUT')
  paragraph(ABOUT, { leading: 4 })

  // Experience
  sectionTitle('EXPERIENCE')
  for (const item of EXPERIENCE) {
    text(`${item.role}  —  ${item.org}`, { font: bold, size: 10.5, color: INK, spacing: 2 })
    text(item.period, { font: oblique, size: 9.5, color: MUTED, spacing: 4 })
    paragraph(item.desc, { leading: 4, spacing: 8 })
  }

  // Projects
  sectionTitle('SELECTED PROJECTS')
  for (const [title, desc] of PROJECTS) {
    const parts = wrapText(`${title} — ${desc}`, regular, 9.7, CONTENT_W)
    page.drawText(parts[0], { x: MARGIN_X, y, size: 9.7, font: bold, color: INK })
    y -= 13
    for (const line of parts.slice(1)) {
      page.drawText(line, { x: MARGIN_X, y, size: 9.7, font: regular, color: INK })
      y -= 13
    }
    y -= 4
  }

  // Skills (three columns)
  sectionTitle('SKILLS')
  const colW = CONTENT_W / 3
  const colX = (i) => MARGIN_X + i * colW
  let colY = y
  for (let i = 0; i < SKILL_COLUMNS.length; i++) {
    const [title, skills] = SKILL_COLUMNS[i]
    page.drawText(title, { x: colX(i), y: colY, size: 9.7, font: bold, color: INK })
    y = colY - 13
    paragraph(skills, { x: colX(i), maxWidth: colW - 8, leading: 3 })
  }
  y = Math.min(colY, y)

  // Education
  sectionTitle('EDUCATION')
  text(EDUCATION[0], { font: bold, size: 10.5, color: INK, spacing: 2 })
  text(EDUCATION[1], { font: oblique, size: 9.5, color: MUTED })

  const bytes = await doc.save()
  fs.writeFileSync(OUT_PATH, bytes)
  console.log(`Resume PDF generated → ${OUT_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
