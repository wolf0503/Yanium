"use client"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Code2, Cpu, Workflow, Zap } from "lucide-react"
import { MagneticCard } from "@/components/magnetic-card"

const pillars = [
  { icon: Code2,    label: "HUMAN INTENT",    desc: "We define the business logic, the strategy, and the architecture." },
  { icon: Cpu,      label: "AI EXECUTION",    desc: "Our AI engines handle infrastructure, boilerplate, and scaling." },
  { icon: Workflow, label: "HYBRID WORKFLOW", desc: "The fusion of human creativity and machine precision." },
  { icon: Zap,      label: "10x VELOCITY",    desc: "Ship production-grade systems in days, not quarters." },
]

export function PhilosophySection() {
  const sectionRef = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-32 px-6">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-gold/[0.03] blur-[140px]" />

      <div className="mx-auto max-w-5xl">
        {/* Parallax heading */}
        <motion.div ref={ref} style={{ y: headingY }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.7em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-4 inline-block font-display text-[10px] text-gold/70">
            // THE YANIUM WAY
          </motion.span>
          <h2 className="font-display text-3xl tracking-[0.08em] md:text-5xl lg:text-6xl">
            {["CODE", "IS", "A", "COMMODITY."].map((w, i) => (
              <motion.span key={i} className="mr-[0.3em] inline-block text-silver"
                initial={{ opacity: 0, y: 28, rotateX: -40 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                {w}
              </motion.span>
            ))}
            <br />
            {["LOGIC", "IS", "THE"].map((w, i) => (
              <motion.span key={i} className="mr-[0.3em] inline-block text-silver"
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.55 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                {w}
              </motion.span>
            ))}
            <motion.span className="mr-[0.3em] inline-block text-shimmer"
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}>
              LEVERAGE.
            </motion.span>
          </h2>
        </motion.div>

        {/* Glass quote */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="glass mx-auto mb-20 max-w-3xl rounded-lg p-8 md:p-12"
          style={{ willChange: "transform" }}>
          <p className="font-serif text-base italic leading-relaxed text-silver/80 md:text-lg md:leading-8">
            The old way of development is a bottleneck. We&apos;ve replaced manual labor with{" "}
            <span className="font-semibold not-italic text-gold">Vibe Coding</span> — a Human-AI hybrid workflow
            that allows us to focus on <span className="not-italic text-silver">your business logic</span> while our
            AI engines handle the infrastructure. We don&apos;t just write code; we{" "}
            <span className="not-italic text-silver">orchestrate intelligence</span>.
          </p>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
          <div className="mt-6 flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-code-green status-pulse" />
            <span className="font-sans text-xs tracking-[0.2em] text-silver/50">HUMAN-AI HYBRID DEVELOPMENT PROTOCOL</span>
          </div>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {pillars.map((p, i) => (
            <MagneticCard key={p.label}>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-center text-center"
                style={{ willChange: "transform" }}>
                <div className="mb-4 flex h-14 w-14 items-center justify-center border border-gold/25 bg-gold/5 transition-all duration-500 group-hover:border-gold/60 group-hover:bg-gold/12 group-hover:shadow-[0_0_24px_rgba(212,175,55,0.22)]">
                  <p.icon className="h-6 w-6 text-gold transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h4 className="mb-2 font-display text-[10px] tracking-[0.3em] text-gold">{p.label}</h4>
                <p className="max-w-[180px] font-sans text-sm leading-relaxed text-silver/70">{p.desc}</p>
              </motion.div>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  )
}
