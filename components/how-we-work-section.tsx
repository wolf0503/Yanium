"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    num: "01",
    label: "DISCOVER",
    body: "One call. Zero fluff. We map your business goals, technical constraints, and success metrics before a single line of code is written.",
    timeline: "Day 1.",
  },
  {
    num: "02",
    label: "ARCHITECT",
    body: "Strategy, stack selection, system design. We present a clear technical blueprint — reviewed and agreed — before execution begins.",
    timeline: "Days 2–4.",
  },
  {
    num: "03",
    label: "EXECUTE",
    body: "Fast, focused sprints. AI handles the repetitive layers. Humans handle the logic that matters. You see progress daily, not quarterly.",
    timeline: "Weeks, not months.",
  },
  {
    num: "04",
    label: "OPERATE",
    body: "We don't disappear after launch. DevOps, QA, monitoring, iteration — we stay in the system as long as you need us.",
    timeline: "Ongoing.",
  },
]

const timelines = [
  { label: "MVP build", value: "2–4 weeks" },
  { label: "AI automation rollout", value: "1–3 weeks" },
  { label: "Enterprise platform", value: "6–12 weeks" },
  { label: "Brand identity system", value: "1–2 weeks" },
]

export function HowWeWorkSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="how-we-work" className="relative py-12 px-6 md:py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[450px] w-[450px] rounded-full bg-gold/[0.025] blur-[140px]" />
      <div className="mx-auto max-w-5xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.7em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-4 inline-block font-display text-[10px] text-gold/70">
            // Yn-PROTOCOL · VIBE ENGINEERING
          </motion.span>
          <h2 className="font-display text-3xl tracking-[0.08em] text-silver md:text-5xl lg:text-6xl">
            HUMAN INTELLIGENCE.
            <br />
            <span className="text-gold">MACHINE VELOCITY.</span>
          </h2>
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-5 max-w-xl font-serif text-base italic text-silver/60">
            We run a Human-AI hybrid workflow we call Vibe Engineering. Our specialists own the
            architecture, business logic, and strategy. Our AI systems handle scaffolding,
            boilerplate, and iteration cycles.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div key={s.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-500 hover:border-gold/25 hover:bg-gold/[0.03]">
              <span className="mb-4 block font-display text-4xl font-bold text-gold/15 select-none">{s.num}</span>
              <p className="mb-1 font-mono text-[9px] tracking-[0.3em] text-gold/60">// {s.num} · {s.label}</p>
              <p className="mb-4 font-serif text-sm italic leading-relaxed text-silver/70">{s.body}</p>
              <div className="border-t border-white/[0.06] pt-3">
                <span className="font-mono text-[9px] tracking-[0.15em] text-silver/35">{s.timeline}</span>
              </div>
              <span className="pointer-events-none absolute -left-[2px] -top-[2px] h-4 w-4 border-l border-t border-gold/20 transition-all duration-500 group-hover:border-gold/45" />
              <span className="pointer-events-none absolute -bottom-[2px] -right-[2px] h-4 w-4 border-b border-r border-gold/20 transition-all duration-500 group-hover:border-gold/45" />
            </motion.div>
          ))}
        </div>

        {/* Timeline reference */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass rounded-lg p-8">
          <p className="mb-5 font-mono text-[9px] tracking-[0.3em] text-silver/40">// TYPICAL TIMELINES</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {timelines.map((t, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="font-serif text-sm italic text-silver/60">{t.label}</span>
                <span className="font-display text-base tracking-[0.1em] text-gold">{t.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-white/[0.06] pt-5">
            <span className="font-mono text-[10px] tracking-[0.15em] text-silver/30">
              1663°C — Lutetium&apos;s melting point. The highest of any rare earth. We operate at that temperature.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
