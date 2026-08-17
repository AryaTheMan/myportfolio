import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'
import ContactForm from './ContactForm.jsx'
import { socialLinks } from '../data/portfolioData.js'

export default function Contact() {
  return (
    <section id="contact" className="section-py selectable">
      <div className="mx-auto max-w-content container-px">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink dark:bg-card-dark px-8 py-14 sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-[18.75rem] w-[37.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-dark/25 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available for internships, research &amp; collaborations
                </span>

                <h2 className="mt-6 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white text-balance">
                  Have a project in mind? Let’s build something people enjoy using.
                </h2>

                <p className="mt-5 text-base sm:text-lg text-white/60 max-w-md text-balance">
                  Whether it’s an AI project, a software build, a research idea, an innovation challenge or an open-source contribution — I’d love to hear about it.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <a
                      href={`mailto:${socialLinks.email}`}
                      className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
                    >
                      <Mail size={16} />
                      Email Me
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                    >
                      <Linkedin size={16} />
                      LinkedIn
                      <ArrowUpRight size={13} className="opacity-60" />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                    >
                      <Github size={16} />
                      GitHub
                      <ArrowUpRight size={13} className="opacity-60" />
                    </a>
                  </Magnetic>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
