"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { X, Check } from "lucide-react"

const comparisonRows = [
  { category: "DEVELOPMENT SPEED",  legacy: "Months per milestone",           frontier: "Days to production" },
  { category: "PRICING MODEL",      legacy: "Hourly billing / time-based",    frontier: "Result-based / outcome-driven" },
  { category: "WORKFLOW",           legacy: "Manual coding, slow iteration",   frontier: "AI-native, vibe coding hybrid" },
  { category: "TEAM STRUCTURE",     legacy: "Large teams, slow coordination",  frontier: "Lean operators + AI engines" },
  { category: "TECHNOLOGY",         legacy: "Outdated stacks, legacy debt",    frontier: "Cutting-edge, AI-augmented" },
  { category: "SCALABILITY",        legacy: "Rebuild to scale",                frontier: "Architected for scale from day one" },
]

function ComparisonRow({ row, index }: { row: typeof comparisonRows[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20px" })
  const isEven = index % 2 === 0

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-3 items-start gap-2 border-b border-white/[0.06] py-5 transition-colors duration-300 hover:bg-gold/[0.025] md:items-center">
      <div className="pr-2">
        <span className="font-mono text-[9px] tracking-[0.2em] text-silver/65 md:text-[10px]">{row.category}</span>
      </div>
      <div className="flex items-start gap-2 px-2 md:items-center">
        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400/70 md:mt-0" />
        <span className="text-xs leading-relaxed text-silver/50 md:text-sm">{row.legacy}</span>
      </div>
      <div className="flex items-start gap-2 px-2 md:items-center">
        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold md:mt-0" />
        <span className="text-xs font-medium leading-relaxed text-gold/90 md:text-sm">{row.frontier}</span>
      </div>
    </motion.div>
  )
}

export function ComparisonSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="comparison" className="relative py-32 px-6">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-gold/[0.02] blur-[130px]" />
      <div className="mx-auto max-w-5xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
            transition={{ duration: 1 }}
            className="mb-4 inline-block font-display text-[10px] text-gold/70">
            // THE STANDARD
          </motion.span>
          <h2 className="font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block text-silver/40">LEGACY
            </motion.span>
            <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mx-3 inline-block">VS.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block text-shimmer">YANIUM
            </motion.span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="glass overflow-hidden rounded-lg"
          style={{ willChange: "transform" }}>
          <div className="grid grid-cols-3 gap-2 border-b border-white/10 px-4 py-4 md:px-6">
            <span className="font-mono text-[9px] tracking-[0.3em] text-silver/45 md:text-[10px]">METRIC</span>
            <div className="flex items-center gap-2 px-2">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/50" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-silver/45 md:text-[10px]">LEGACY FIRMS</span>
            </div>
            <div className="flex items-center gap-2 px-2">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold status-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-gold md:text-[10px]">YANIUM</span>
            </div>
          </div>
          <div className="px-4 md:px-6">
            {comparisonRows.map((row, i) => (
              <ComparisonRow key={row.category} row={row} index={i} />
            ))}
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 text-center font-mono text-[10px] tracking-[0.25em] text-silver/30">
          THE OLD GUARD IS OBSOLETE. THE FRONTIER IS HERE.
        </motion.p>
      </div>
    </section>
  )
}
