"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const clients = [
  {
    tag: "// STARTUPS & FOUNDERS",
    body: "You have an idea and a deadline. We move fast, validate quickly, and build products that survive contact with real users. MVP to launch. Zero overhead.",
  },
  {
    tag: "// BUSINESSES & OPERATORS",
    body: "You have operations that leak efficiency. We automate the manual, integrate the disconnected, and build systems that compound your advantage over time.",
  },
  {
    tag: "// ENTERPRISE & PARTNERS",
    body: "You need a reliable technical partner embedded in your operation. Aligned to your stack, your standards, your goals. We work as an extension of your team — not a vendor.",
  },
]

export function WhoWeWorkWithSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="who-we-work-with" className="relative py-12 px-6 md:py-32">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-gold/[0.02] blur-[130px]" />
      <div className="mx-auto max-w-5xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.7em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-4 inline-block font-display text-[10px] text-gold/70">
            // COMPOUNDS · Yn REACTS WITH
          </motion.span>
          <h2 className="font-display text-3xl tracking-[0.08em] text-silver md:text-5xl lg:text-6xl">
            EVERY CLIENT TYPE.
            <br />
            <span className="text-gold">ONE STANDARD.</span>
          </h2>
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-5 max-w-xl font-serif text-base italic text-silver/60">
            Like lutetium forming stable compounds with any element it meets —
            Yanium adapts to your context without compromising the core.
          </motion.p>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {clients.map((c, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-500 hover:border-gold/25 hover:bg-gold/[0.03]">
              <p className="mb-4 font-mono text-[9px] tracking-[0.25em] text-gold/60">{c.tag}</p>
              <p className="font-serif text-sm italic leading-relaxed text-silver/70">{c.body}</p>
              <span className="pointer-events-none absolute -left-[2px] -top-[2px] h-4 w-4 border-l border-t border-gold/20 transition-all duration-500 group-hover:border-gold/45" />
              <span className="pointer-events-none absolute -bottom-[2px] -right-[2px] h-4 w-4 border-b border-r border-gold/20 transition-all duration-500 group-hover:border-gold/45" />
            </motion.div>
          ))}
        </div>

        {/* Freelance callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="glass mb-10 rounded-lg p-6 text-center">
          <p className="mb-1 font-mono text-[9px] tracking-[0.25em] text-silver/40">// FREELANCE ENGAGEMENTS</p>
          <p className="font-serif text-sm italic text-silver/65">
            Need elite execution on a specific build?
            We take select freelance projects when the challenge is worth it.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col items-center gap-4">
          <p className="font-serif text-sm italic text-silver/50">Not sure which fits? Let&apos;s find out.</p>
          <a href="#contact"
            className="pulse-glow border border-gold/50 bg-gold/[0.07] px-10 py-4 font-display text-xs tracking-[0.35em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/[0.18] hover:shadow-[0_0_32px_rgba(212,175,55,0.3)]">
            BOOK A CALL
          </a>
        </motion.div>
      </div>
    </section>
  )
}
