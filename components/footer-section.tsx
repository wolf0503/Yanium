"use client"
import React, { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"

const inputClass = "w-full rounded-sm border border-white/15 bg-white/[0.06] px-4 py-3 font-sans text-sm text-silver outline-none transition-colors focus:border-gold/50 placeholder:text-silver/30"

export function FooterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [form, setForm] = useState({ name: "", email: "", ambition: "" })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1500)
  }

  return (
    <footer id="contact" className="relative py-32 px-6">
      <div className="mx-auto mb-20 h-px max-w-4xl bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="mx-auto max-w-4xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.4em] text-gold/70">// INQUIRY GATE</span>
          <h2 className="mb-4 font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
            BY <span className="text-gold">INVITATION</span> ONLY
          </h2>
          <p className="mx-auto mb-16 max-w-lg font-serif text-base italic leading-relaxed text-silver/65">
            We accept a limited number of high-stakes projects. Make your case.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit} className="glass mx-auto max-w-xl rounded-lg p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-mono text-[10px] tracking-[0.25em] text-silver/55">// NAME</label>
                <input id="name" type="text" required value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className={inputClass} placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-[10px] tracking-[0.25em] text-silver/55">// EMAIL</label>
                <input id="email" type="email" required value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className={inputClass} placeholder="your@email.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ambition" className="font-mono text-[10px] tracking-[0.25em] text-silver/55">// TARGET ROI / AMBITION</label>
                <textarea id="ambition" required rows={4} value={form.ambition}
                  onChange={e => setForm(p => ({ ...p, ambition: e.target.value }))}
                  className={`${inputClass} resize-none`}
                  placeholder="Describe your project vision and expected outcomes..." />
              </div>
              <button type="submit" disabled={submitting}
                className="pulse-glow group mt-2 flex items-center justify-center gap-3 border border-gold/50 bg-gold/[0.08] px-8 py-4 font-display text-xs tracking-[0.35em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/[0.18] disabled:opacity-50">
                {submitting
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <>SUBMIT INQUIRY <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                }
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass mx-auto max-w-xl rounded-lg p-12 text-center">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center border border-gold/35 bg-gold/8">
              <div className="h-2 w-2 rounded-full bg-gold status-pulse" />
            </div>
            <h3 className="mb-2 font-display text-2xl tracking-[0.1em] text-silver">INQUIRY RECEIVED</h3>
            <p className="font-mono text-xs tracking-[0.15em] text-silver/50">PROTOCOL INITIATED</p>
            <p className="mt-3 font-serif text-sm italic text-silver/60">We will review and respond within 48 hours.</p>
          </motion.div>
        )}

        <div className="mt-20 flex flex-col items-center gap-4 border-t border-white/8 pt-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-7 w-7 items-center justify-center border border-gold/45 bg-gold/5">
              <span className="pointer-events-none absolute -left-[1.5px] -top-[1.5px] h-2 w-2 border-l border-t border-gold/65" />
              <span className="pointer-events-none absolute -bottom-[1.5px] -right-[1.5px] h-2 w-2 border-b border-r border-gold/65" />
              <span className="font-display text-xs font-bold leading-none text-gold">Yn</span>
            </div>
            <span className="font-display text-sm tracking-[0.25em] text-silver/60">YANIUM</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <span className="font-mono text-[9px] tracking-[0.2em] text-silver/30">VELOCITY OF INTELLIGENCE</span>
            <span className="hidden text-silver/15 md:inline">|</span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-silver/30">YEREVAN, ARMENIA</span>
            <span className="hidden text-silver/15 md:inline">|</span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-silver/30">{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
