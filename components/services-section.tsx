"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Globe, Bot, Zap, Palette, PenTool } from "lucide-react"

const services = [
  {
    icon: Globe,
    label: "WEB & MOBILE ECOSYSTEMS",
    tag: "CORE",
    desc: "End-to-end product engineering — from architecture to deployment. We build scalable, high-performance systems that carry the weight of your ambition.",
    detail: ["Next.js / React Native", "Edge-first architecture", "Real-time systems", "API & microservices"],
    large: true,
  },
  {
    icon: Bot,
    label: "AUTONOMOUS AI AGENTS",
    tag: "AI",
    desc: "We integrate intelligence directly into your workflow. Custom LLM pipelines, retrieval systems, and automated decision engines.",
    detail: ["LLM orchestration", "RAG pipelines", "Tool-use agents"],
    large: false,
  },
  {
    icon: Zap,
    label: "RAPID PROTOTYPING",
    tag: "VELOCITY",
    desc: "From zero to live demo in days. Validate before you commit.",
    detail: ["MVP in 72 hours", "Investor-ready demos", "Iterative sprints"],
    large: false,
  },
  {
    icon: Palette,
    label: "UI/UX & DESIGN SYSTEMS",
    tag: "CRAFT",
    desc: "Interfaces that convert and systems that scale. Every pixel earns its place.",
    detail: ["Component libraries", "Figma → code", "Accessibility first"],
    large: false,
  },
  {
    icon: PenTool,
    label: "GRAPHIC & BRAND DESIGN",
    tag: "IDENTITY",
    desc: "Brand systems built to command presence. Logo, motion, print — all unified.",
    detail: ["Brand identity", "Motion graphics", "Print & digital"],
    large: false,
  },
]

function ServiceCard({ s, i, isInView }: { s: typeof services[0]; i: number; isInView: boolean }) {
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
      className={s.large ? "md:col-span-2 md:row-span-2" : ""}
      style={{ perspective: "800px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          transformStyle: "preserve-3d",
          height: "100%",
        }}
        className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03] p-6 md:p-7"
      >
        {/* Hover glow */}
        <div className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0, background: "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 50%, rgba(212,175,55,0.05) 100%)" }} />
        <div className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0, boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.35)" }} />

        {/* Tag + icon */}
        <div className="mb-4 flex items-center gap-3">
          <div className={`flex shrink-0 items-center justify-center border border-gold/25 bg-gold/5 transition-all duration-500 ${s.large ? "h-14 w-14" : "h-10 w-10"} ${hovered ? "border-gold/60 bg-gold/10 shadow-[0_0_16px_rgba(212,175,55,0.2)]" : ""}`}>
            <s.icon className={`text-gold ${s.large ? "h-7 w-7" : "h-5 w-5"}`} />
          </div>
          <span className="font-display text-[9px] tracking-[0.35em] text-gold/60">{s.tag}</span>
        </div>

        <h3 className={`mb-3 font-display tracking-[0.08em] text-silver ${s.large ? "text-xl md:text-2xl" : "text-sm md:text-base"}`}>
          {s.label}
        </h3>

        <p className={`font-serif leading-relaxed text-silver/70 ${s.large ? "text-base italic md:text-lg" : "text-sm italic"}`}>
          {s.desc}
        </p>

        <ul className={`flex flex-wrap gap-2 ${s.large ? "mt-6" : "mt-4"}`}>
          {s.detail.map(d => (
            <li key={d} className="rounded-sm border border-gold/15 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-gold/60">
              {d}
            </li>
          ))}
        </ul>

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
    <section id="services" className="relative py-32 px-6">
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-gold/[0.02] blur-[150px]" />
      <div className="mx-auto max-w-6xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-16 text-center">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.4em] text-gold/70">// WHAT WE BUILD</span>
          <h2 className="font-display text-3xl tracking-[0.08em] text-silver md:text-5xl lg:text-6xl">
            THE{" "}
            <motion.span className="inline-block text-gold"
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}>
              ARSENAL
            </motion.span>
          </h2>
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-4 max-w-xl font-serif text-base italic text-silver/60">
            Every service is a weapon. We deploy the right ones for your war.
          </motion.p>
        </motion.div>

        {/* Mobile: single column stack. Desktop: bento grid */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:grid-rows-2 md:gap-4"
          style={{ gridTemplateRows: "auto auto" }}>
          {services.map((s, i) => (
            <ServiceCard key={s.label} s={s} i={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
