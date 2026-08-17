import { Link } from 'react-router-dom'
import { Home, SquareTerminal } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* Ambient accent glow, mirrors the Hero */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[26.25rem] w-[26.25rem] -translate-x-1/2 rounded-full bg-accent/[0.06] dark:bg-accent-dark/[0.10] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-content px-6 pb-20 text-center sm:px-8 lg:px-12">
        <p className="inline-flex items-center gap-2 rounded-full border border-border dark:border-border-dark px-3.5 py-1.5 font-mono text-xs font-medium text-muted dark:text-muted-dark">
          <SquareTerminal size={13} className="text-accent dark:text-accent-dark" />
          exit code: 404
        </p>

        <h1 className="mt-6 font-heading text-7xl font-bold tracking-tight sm:text-8xl">
          4
          <span className="text-accent dark:text-accent-dark">0</span>
          4
        </h1>

        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-5 text-left font-mono text-sm leading-relaxed">
          <p className="text-white/40">
            <span className="text-accent dark:text-accent-dark">$</span> find / --name="this-page" --all
          </p>
          <p className="text-[#f87171]">error: this page does not exist (or is still being compiled)</p>
        </div>

        <p className="mx-auto mt-6 max-w-md text-base text-muted dark:text-muted-dark text-balance">
          The page you're after has moved, vanished, or never shipped. Let's get you back to something that works.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink dark:bg-ink-dark px-6 py-3.5 text-sm font-semibold text-bg dark:text-bg-dark transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
        >
          <Home size={16} />
          Back to home
        </Link>
      </div>
    </section>
  )
}
