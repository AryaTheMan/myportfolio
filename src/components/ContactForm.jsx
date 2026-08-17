import { useState } from 'react'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { formspreeEndpoint, socialLinks } from '../data/portfolioData.js'

const inputClasses =
  'w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-200 focus:border-accent-dark'

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      // Formspree accepts CORS requests from any origin, so this works in
      // local dev, on a preview server and in production alike.
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setValues({ name: '', email: '', message: '' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex h-full min-h-[18.75rem] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-dark/15 text-accent-dark">
          <CheckCircle2 size={22} />
        </span>
        <div>
          <p className="text-base font-semibold text-white">Message sent</p>
          <p className="mt-1 text-sm text-white/60">
            Thanks for reaching out — I'll get back to you soon.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-sm font-medium text-white/70 underline-offset-4 hover:text-white hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4">
      {/* Formspree honeypot — hidden from humans, catches bots (Formspree
          silently discards submissions where this is filled in). */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-white/50">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            placeholder="Ada Lovelace"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-white/50">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            placeholder="ada@example.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-white/50">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={values.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell me about the project…"
          className={`${inputClasses} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="flex items-center gap-2 text-sm text-[#f87171]" role="alert">
          <AlertCircle size={15} />
          Something went wrong — you can also email me directly at{' '}
          <a href={`mailto:${socialLinks.email}`} className="font-medium underline underline-offset-2">
            {socialLinks.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-accent-dark dark:text-bg-dark"
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  )
}
