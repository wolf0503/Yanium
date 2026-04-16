"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Layers, Bot, Palette } from "lucide-react"

const pillars = [
  {
    icon: Layers,
    tag: "Yn-01 · CORE STRUCTURE",
    label: "FULL-STACK PRODUCT ENGINEERING",
    pillarNum: "BUILD",
    desc: "We build complete digital products from architecture to deployment. Web platforms, mobile apps, APIs, real-time systems — engineered to scale from day one. Frontend to backend. No layer outsourced. No gaps between teams.",
    detail: [
      "Web Applications (Next.js, React, Vue)",
      "Mobile Apps (React Native, iOS, Android)",
      "Backend Systems & APIs",
      "Microservices & Real-Time Architecture",
      "Database Design & Optimization",
      "DevOps, CI/CD & Cloud Infrastructure",
      "QA Engineering & Automated Testing",
    ],
    callout: "Yn-175 · Production Grade · Stable Under Pressure",
  },
  {
    icon: Bot,
    tag: "Yn-02 · INTELLIGENT SYSTEMS",
    label: "AI AUTOMATION FOR BUSINESS",
    pillarNum: "AUTOMATE",
    desc: "We replace manual workflows with intelligent systems. Custom AI agents, LLM pipelines, automated decision engines, and deep integrations into your existing operations. Built for real business outcomes — not demos. Not prototypes. Production.",
    detail: [
      "Custom AI Agents & Assistants",
      "Business Process Automation",
      "LLM Integration & Fine-Tuning",
      "RAG Pipelines & Knowledge Systems",
      "Multi-Agent Workflows",
      "CRM, ERP & Third-Party Integrations",
      "Automated Reporting & Analytics Pipelines",
    ],
    callout: "Yn · 71 · The Intelligence Layer Your Competitors Don't Have Yet",
  },
  {
    icon: Palette,
    tag: "Yn-03 · SURFACE LAYER",
    label: "DESIGN, BRAND & IDENTITY",
    pillarNum: "CRAFT",
    desc: "Great technology without great design is invisible. We handle the full visual layer — UI/UX systems, component libraries, brand identity, motion graphics, and print. Every surface. Every pixel. Every impression.",
    detail: [
      "UI/UX Design & Prototyping",
      "Design Systems & Component Libraries",
      "Brand Identity & Visual Language",
      "Motion Graphics & Animation",
      "Figma → Production Code",
      "Print & Digital Collateral",
      "Graphic Design",
    ],
    callout: "CRAFT · The surface that makes the system undeniable",
  },
]

function PillarCard({ s, i, isInView }: { s: typeof pillars[0]; i: number; isInView: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    setTilt({ x: -dy * 6, y: dx * 6 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      style={{ perspective: "800px" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          transformStyle: "preserve-3d",
        }}
        className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03] p-7">
        {/* Hover glow */}
        <div className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0, background: "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 50%, rgba(212,175,55,0.05) 100%)" }} />
        <div className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0, boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.35)" }} />

        {/* Pillar number + icon */}
        <div className="mb-5 flex items-start justify-between">
          <div className={`flex h-12 w-12 items-center justify-center border transition-all duration-500 ${hovered ? "border-gold/60 bg-gold/10" : "border-gold/25 bg-gold/5"}`}>
            <s.icon className="h-6 w-6 text-gold" />
          </div>
          <span className="font-display text-4xl font-bold text-gold/15 select-none">{s.pillarNum}</span>
        </div>

        <p className="mb-1 font-mono text-[9px] tracking-[0.3em] text-gold/55">{s.tag}</p>
        <h3 className="mb-3 font-display text-lg tracking-[0.08em] text-silver md:text-xl">{s.label}</h3>
        <p className="mb-5 font-serif text-sm italic leading-relaxed text-silver/70">{s.desc}</p>

        <ul className="mb-5 flex flex-wrap gap-2">
          {s.detail.map(d => (
            <li key={d} className="rounded-sm border border-gold/15 px-2 py-1 font-mono text-[9px] tracking-[0.1em] text-gold/55">
              {d}
            </li>
          ))}
        </ul>

        <div className="border-t border-white/[0.08] pt-4">
          <span className="font-mono text-[9px] tracking-[0.15em] text-silver/35">{s.callout}</span>
        </div>

        {/* Corner accents */}
        <span className="pointer-events-none absolute -left-[2px] -top-[2px] h-4 w-4 border-l border-t transition-all duration-500"
          style={{ borderColor: hovered ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.2)" }} />
        <span className="pointer-events-none absolute -bottom-[2px] -right-[2px] h-4 w-4 border-b border-r transition-all duration-500"
          style={{ borderColor: hovered ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.2)" }} />
      </motion.div>
    </div>
  )
}

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="relative py-12 px-6 md:py-32">
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-gold/[0.02] blur-[150px]" />
      <div className="mx-auto max-w-6xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-16 text-center">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.4em] text-gold/70">// OXIDATION STATE +3 · THREE FORCES · ONE SYSTEM</span>
          <h2 className="font-display text-3xl tracking-[0.08em] text-silver md:text-5xl lg:text-6xl">
            THREE PILLARS.{" "}
            <motion.span className="inline-block text-gold"
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}>
              EVERY LAYER.
            </motion.span>
          </h2>
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-4 max-w-xl font-serif text-base italic text-silver/60">
            Lutetium&apos;s oxidation state is always +3 — stable, unified, never varies.
            Yanium operates the same way. Three forces. Every engagement. One system.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {pillars.map((s, i) => (
            <PillarCard key={s.pillarNum} s={s} i={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
