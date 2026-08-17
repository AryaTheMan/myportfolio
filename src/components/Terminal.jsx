import { useEffect, useRef, useState } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { applyRandomAccent } from '../data/accentPalettes.js'
import {
  skillGroups,
  projects,
  socialLinks,
  experience,
  processSteps,
  testimonials,
  aboutContent,
} from '../data/portfolioData.js'

const WELCOME = [
  'aryaman@portfolio:~$ _',
  '',
  'Welcome to aryaman-os 1.0 (AI edition).',
  '',
  'Type `help` to list commands, or jump straight in:',
  '  `joke`  `guess`  `rps`  `theme`  `neofetch`',
]

const JOKES = [
  'Why do programmers prefer dark mode? Because light attracts bugs.',
  'There are only 10 kinds of people: those who understand binary and those who don\u2019t.',
  'Why did the developer go broke? Because he used up all his cache.',
  'A SQL query walks into a bar, sees two tables, and asks: \u201CCan I join you?\u201D',
  'How many programmers does it take to change a light bulb? None \u2014 that\u2019s a hardware problem.',
  'I would tell you a UDP joke, but you might not get it.',
  'Why do Java developers wear glasses? Because they can\u2019t C#.',
  'The best thing about a boolean is that even when you\u2019re wrong, you\u2019re only off by a bit.',
  'Why was the JavaScript developer sad? Because he didn\u2019t know how to null his feelings.',
  'Debugging: being the detective in a crime movie where you\u2019re also the murderer.',
  'My code works and I have no idea why. Zero errors, zero explanation.',
  'Hardware is the part you can kick. Software is the part you can only curse at.',
]

const NEOFETCH = [
  '  \u2726 aryaman-os 1.0 (AI edition) \u2726',
  '  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
  '  OS:        aryaman-os 1.0 (AI edition)',
  '  Host:      portfolio \u2014 VIT Chennai',
  '  Kernel:    gemini-2.0-hardened',
  '  Shell:     bash 5.2.26',
  '  Theme:     dynamic \u2014 type `theme` to switch',
  '  Uptime:    too long, still going',
  '  CPU:       neural core @ 4.2 GHz',
  '  Memory:    100% curiosity, 0% patience',
]

const QUICK_COMMANDS = ['help', 'joke', 'guess', 'rps', 'theme', 'neofetch']

// ── Command output builder ──────────────────────────────────────────────────
// Returns { out: string[] } and optionally starts a game: { game: 'guess' | 'rps' }
function buildResponse(command, history) {
  const lower = command.trim().toLowerCase()

  // Commands with arguments first (`echo` with no args echoes an empty line,
  // just like the real shell)
  if (lower.startsWith('echo')) {
    return { out: [command.trim().slice(5)] }
  }

  switch (lower) {
    case 'help':
      return {
        out: [
          'Available commands:',
          '  \u2500\u2500 explore \u2500\u2500',
          '    about, whoami, skills, projects, experience, process,',
          '    testimonials, education, contact, ls, pwd',
          '  \u2500\u2500 play \u2500\u2500',
          '    joke, coin, guess, rps',
          '  \u2500\u2500 system \u2500\u2500',
          '    neofetch, uname, uptime, ping, date, echo, history, banner',
          '  \u2500\u2500 theme \u2500\u2500',
          '    theme   \u2014 switch the whole site\u2019s accent colour',
          '  \u2500\u2500 misc \u2500\u2500',
          '    clear, sudo, exit',
        ],
      }
    case 'about':
      return {
        out: [
          'A Computer Science student building AI-powered products:',
          'generative AI, Python and data-driven insights \u2014',
          'happiest at the intersection of AI and real problems.',
        ],
      }
    case 'whoami':
      return {
        out: [
          'Aryaman Bhattacharjee \u2014 Computer Science @ VIT Chennai.',
          'AI \u00B7 Machine learning \u00B7 Software development.',
        ],
      }
    case 'skills':
      return {
        out: skillGroups.map((group) => `${group.title}: ${group.skills.map((s) => s.name).join(', ')}`),
      }
    case 'projects':
      return { out: projects.map((p) => `  ${p.title} \u2014 ${p.category}`) }
    case 'experience':
      return {
        out: experience.map((x) => `  ${x.role} @ ${x.org} (${x.period})\n      ${x.tags.join(' \u00B7 ')}`),
      }
    case 'process':
      return {
        out: processSteps.map((s) => `  ${s.id}. ${s.title} \u2014 ${s.description}`),
      }
    case 'testimonials':
      return {
        out: testimonials.map((t) => `  \u201C${t.quote}\u201D\n      \u2014 ${t.name}, ${t.role}`),
      }
    case 'education':
      return { out: aboutContent.facts.map((f) => `  ${f.label}: ${f.value}`) }
    case 'contact':
      return {
        out: [
          `  email    ${socialLinks.email}`,
          `  linkedin ${socialLinks.linkedin}`,
          `  github   ${socialLinks.github}`,
        ],
      }
    case 'ls':
      return { out: ['about.md  skills/  projects/  experience/  process/  contact.md'] }
    case 'pwd':
      return { out: ['/home/aryaman/portfolio'] }
    case 'banner':
      return { out: WELCOME }
    case 'history':
      return {
        out: history.length
          ? history.map((c, i) => `  ${String(i + 1).padStart(2, '0')}  ${c}`)
          : ['No commands run yet \u2014 type `help` to get started.'],
      }
    case 'date':
      return { out: [new Date().toString()] }
    case 'neofetch':
      return { out: NEOFETCH }
    case 'uname':
      return { out: ['aryaman-os 1.0.0 (AI edition)'] }
    case 'uptime':
      return { out: ['up forever, still loading\u2026'] }
    case 'ping':
      return { out: ['ping aryaman.dev \u2014 42 ms (it\u2019s always 42)'] }
    case 'joke':
      return { out: [JOKES[Math.floor(Math.random() * JOKES.length)]] }
    case 'coin':
      return { out: [`coin flip: ${Math.random() < 0.5 ? 'heads' : 'tails'}`] }
    case 'guess':
      return {
        game: 'guess',
        out: [
          "I'm thinking of a number between 1 and 10.",
          'Type your guess \u2014 or `quit` to give up.',
        ],
      }
    case 'rps':
      return {
        game: 'rps',
        out: [
          'Let\u2019s play rock-paper-scissors.',
          'Type rock, paper or scissors (r / p / s works too) \u2014 or `quit`.',
        ],
      }
    case 'theme': {
      const name = applyRandomAccent()
      return {
        out: [
          `Accent switched to ${name}.`,
          'The whole site just recoloured \u2014 scroll and enjoy.',
        ],
      }
    }
    case 'sudo':
      return {
        out: [
          'sudo: permission denied \u2014 nice try.',
          '(the kernel logs everything, by the way)',
        ],
      }
    case 'exit':
      return {
        out: ['exit: there is no leaving /home/aryaman.', '(nice try though)'],
      }
    default:
      return { out: [`command not found: ${command.trim()} \u2014 type \`help\` to list commands.`] }
  }
}

export default function Terminal() {
  const [lines, setLines] = useState(() => WELCOME.map((text) => ({ type: 'out', text })))
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [game, setGame] = useState(null) // null | { type: 'guess', secret, attempts } | { type: 'rps' }
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  // Keep the newest output in view
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const pushOut = (texts) => {
    setLines((prev) => [...prev, ...texts.map((text) => ({ type: 'out', text }))])
  }

  // Routes typed input while a game is active
  function handleGameInput(text) {
    const lower = text.trim().toLowerCase()
    const isQuit = ['quit', 'exit', 'stop', 'giveup', 'give up'].includes(lower)
    if (isQuit) {
      const reveal = game.type === 'guess' ? ` (the number was ${game.secret})` : ''
      setGame(null)
      return [`Alright, quitting${reveal}.`]
    }
    if (game.type === 'guess') {
      if (!/^\d+$/.test(text.trim())) {
        return ['Type a number between 1 and 10 \u2014 or `quit`.']
      }
      const guess = Number(text.trim())
      if (guess < 1 || guess > 10) {
        return ['Out of range \u2014 pick a number between 1 and 10.']
      }
      const attempts = game.attempts + 1
      if (guess === game.secret) {
        setGame(null)
        return [
          `Correct! \uD83C\uDF89 It took you ${attempts} ${attempts === 1 ? 'guess' : 'guesses'}.`,
          'Type `guess` to play again.',
        ]
      }
      setGame({ ...game, attempts })
      return [
        guess < game.secret ? `Higher than ${guess}.` : `Lower than ${guess}.`,
        `  (attempt ${attempts})`,
      ]
    }
    // rps
    const moves = {
      rock: 'rock',
      paper: 'paper',
      scissors: 'scissors',
      r: 'rock',
      p: 'paper',
      s: 'scissors',
    }
    const move = moves[lower]
    if (!move) {
      return ['Type rock, paper or scissors \u2014 or `quit`.']
    }
    const options = ['rock', 'paper', 'scissors']
    const ai = options[Math.floor(Math.random() * options.length)]
    let result
    if (move === ai) {
      result = "It's a tie!"
    } else if (
      (move === 'rock' && ai === 'scissors') ||
      (move === 'paper' && ai === 'rock') ||
      (move === 'scissors' && ai === 'paper')
    ) {
      result = 'You win! \uD83C\uDF89'
    } else {
      result = 'I win. Better luck next round.'
    }
    return [`  You: ${move}  |  Me: ${ai}`, result, 'Type again \u2014 or `quit`.']
  }

  const execute = (rawText, { force = false } = {}) => {
    const text = rawText.trim()
    if (!text) return

    setLines((prev) => [...prev, { type: 'cmd', text }])
    setHistory((prev) => [...prev, text])
    setInput('')
    setHistoryIndex(-1)

    // A game in progress swallows typed input until `quit` (force bypasses
    // this for the quick-command chips, which always start something new).
    if (game && !force) {
      pushOut(handleGameInput(text))
      return
    }

    if (text.toLowerCase() === 'clear') {
      setLines([{ type: 'out', text: 'aryaman@portfolio:~$ _' }])
      return
    }

    const response = buildResponse(text, history)
    if (response.game === 'guess') {
      setGame({ type: 'guess', secret: 1 + Math.floor(Math.random() * 10), attempts: 0 })
    } else if (response.game === 'rps') {
      setGame({ type: 'rps' })
    }
    if (response.out) pushOut(response.out)
  }

  // Chips always launch their command, bailing out of any active game first
  const runQuick = (command) => {
    if (game) {
      const reveal = game.type === 'guess' ? ` (the number was ${game.secret})` : ''
      setGame(null)
      pushOut([`Leaving the game${reveal}.`])
    }
    execute(command, { force: true })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    execute(input)
  }

  // Arrow up/down walk through the command history
  const handleKeyDown = (e) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
    e.preventDefault()
    if (history.length === 0) return
    let idx = historyIndex
    if (e.key === 'ArrowUp') {
      idx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
    } else {
      idx = historyIndex === -1 ? -1 : Math.min(history.length - 1, historyIndex + 1)
      if (idx === history.length - 1 && historyIndex === history.length - 1) idx = -1
    }
    setHistoryIndex(idx)
    setInput(idx === -1 ? '' : history[idx])
  }

  return (
    <Reveal variant="up" className="mt-20">
      {/* Caption + quick-run chips */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-accent dark:text-accent-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-accent dark:bg-accent-dark" />
            Try the terminal
          </p>
          <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-bold">
            Explore from the shell
          </h3>
          <p className="mt-1.5 text-sm text-muted dark:text-muted-dark">
            Type <code className="font-mono text-ink dark:text-ink-dark">help</code> to see everything — or tap a shortcut:
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_COMMANDS.map((command) => (
            <button
              key={command}
              type="button"
              onClick={() => runQuick(command)}
              className="rounded-full border border-border dark:border-border-dark bg-card dark:bg-card-dark px-3.5 py-1.5 font-mono text-xs font-medium text-muted dark:text-muted-dark transition-all duration-200 hover:border-accent/50 dark:hover:border-accent-dark/60 hover:text-ink dark:hover:text-ink-dark active:scale-[0.97]"
            >
              {command}
            </button>
          ))}
        </div>
      </div>

      <div
        className="overflow-hidden rounded-2xl border border-border dark:border-border-dark bg-[#0b0e14] shadow-card dark:shadow-card-dark"
        aria-label="Interactive terminal \u2014 type a command and press Enter"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#11151d] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 inline-flex items-center gap-2 font-mono text-xs text-white/50">
            <TerminalIcon size={13} />
            aryaman@portfolio: ~
            {game && <span className="ml-2 text-accent-dark">[{game.type} running]</span>}
          </span>
        </div>

        {/* Output */}
        <div ref={bodyRef} className="h-72 overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed sm:h-96 sm:text-[0.9375rem]">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {line.type === 'cmd' ? (
                <span className="text-white/90">
                  <span className="text-accent-dark">$ </span>
                  {line.text}
                </span>
              ) : (
                <span className={line.text.startsWith('command not found') ? 'text-[#f87171]' : 'text-white/55'}>
                  {line.text}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Input line */}
        <form
          onSubmit={handleSubmit}
          onClick={() => inputRef.current?.focus()}
          className="flex items-center gap-2 border-t border-white/10 px-5 py-3 font-mono text-sm sm:text-[0.9375rem]"
        >
          <span className="text-accent-dark">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal command"
            className="flex-1 bg-transparent text-white/90 caret-accent-dark outline-none placeholder:text-white/25"
            placeholder={game ? 'type `quit` to leave the game' : 'type `help` \u2014 or `joke`'}
          />
        </form>
      </div>
    </Reveal>
  )
}
