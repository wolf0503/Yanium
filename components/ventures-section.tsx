"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Shield, TrendingUp, Activity } from "lucide-react"

const ventures = [
  {
    icon: Shield,
    code: "Yn-V01 · CV SENTINEL",
    title: "CV Sentinel",
    desc: "CV Sentinel analyzes career trajectories, tracks job market signals, and delivers actionable intelligence to help professionals make smarter, faster moves. Built for people who treat their career like an asset.",
    status: "COMING SOON · Yn-175",
    statusColor: "silver" as const,
    stat: { label: "Status", value: "In Development", sub: "" },
  },
  {
    icon: TrendingUp,
    code: "Yn-V02 · ROI SENTINEL",
    title: "ROI Sentinel",
    desc: "ROI Sentinel indexes property data, forecasts market movements, and surfaces high-ROI opportunities before they become obvious to everyone else. Data-driven. Local-first. Built for serious investors.",
    status: "BETA · Yn-175",
    statusColor: "gold" as const,
    stat: { label: "Status", value: "In Development", sub: "" },
  },
  {
    icon: Activity,
    code: "Yn-V03 · MYZRA",
    title: "Myzra",
    desc: "Myzra applies the training principles of elite athletes to personal performance — structured, data-driven, and built for people who operate at high intensity and refuse to leave performance on the table.",
    status: "R&D · Yn-176",
    statusColor: "silver" as const,
    stat: { label: "Status", value: "v2.0", sub: "in development" },
  },
]

function VentureCard({ v, i, isParentInView }: { v: typeof ventures[0]; i: number; isParentInView: boolean }) {
  const [hovered, setHovered] = useState(false)

  const statusCls = {
    green:  "border-code-green/40 bg-code-green/10 text-code-green",
    gold:   "border-gold/40 bg-gold/10 text-gold",
    silver: "border-silver/25 bg-silver/5 text-silver/55",
  }[v.statusColor]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={isParentInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group glass relative overflow-hidden rounded-lg p-6 transition-all duration-500"
      style={{
        willChange: "transform",
        boxShadow: hovered ? "0 0 40px rgba(212,175,55,0.08), inset 0 0 0 1px rgba(212,175,55,0.2)" : "inset 0 0 0 1px rgba(255,255,255,0.06)",
        transition: "box-shadow 0.4s ease",
      }}>
      {/* Hover gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Status badge */}
      <div className="absolute right-4 top-4 flex items-center gap-2">
        {v.statusColor === "green" && (
          <span className="h-1.5 w-1.5 rounded-full bg-code-green status-pulse" />
        )}
        <span className={`rounded-sm border px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] ${statusCls}`}>
          {v.status}
        </span>
      </div>

      <div className="relative z-10">
        {/* Icon */}
        <div className={`mb-5 flex h-12 w-12 items-center justify-center border transition-all duration-500 ${
          hovered ? "border-gold/55 bg-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.18)]" : "border-gold/20 bg-gold/5"
        }`}>
          <v.icon className="h-5 w-5 text-gold" />
        </div>

        {/* Code label */}
        <p className="mb-1 font-mono text-[9px] tracking-[0.28em] text-gold/55">{v.code}</p>

        {/* Title */}
        <h3 className="mb-2 font-display text-xl tracking-[0.08em] text-silver">{v.title}</h3>

        {/* Description */}
        <p className="mb-6 font-serif text-sm italic leading-relaxed text-silver/70">{v.desc}</p>

        {/* Stat / status block */}
        <div className="border-t border-white/8 pt-5">
          <p className="mb-1 font-mono text-[9px] tracking-[0.2em] text-silver/40">{v.stat.label}</p>
          <div className="flex items-baseline gap-2">
            <span className={`font-display tracking-wide text-gold ${v.stat.sub ? "text-3xl" : "text-base"}`}>{v.stat.value}</span>
            {v.stat.sub && <span className="font-mono text-[10px] text-silver/35">{v.stat.sub}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function VenturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="ventures" className="relative py-32 px-6">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-gold/[0.018] blur-[130px]" />
      <div className="mx-auto max-w-6xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
            transition={{ duration: 1 }}
            className="mb-4 inline-block font-display text-[10px] text-gold/70">
            // INTERNAL COMPOUNDS · BUILT BY Yn
          </motion.span>
          <h2 className="mb-4 font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
            THE <span className="text-gold">VENTURES</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto max-w-xl font-serif text-base italic leading-relaxed text-silver/65">
            Our ventures are proof of vision. Built in-house using the same workflow, standards,
            and speed we bring to every client engagement.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {ventures.map((v, i) => (
            <VentureCard key={v.code} v={v} i={i} isParentInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
