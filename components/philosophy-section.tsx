"use client"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { MagneticCard } from "@/components/magnetic-card"

const pillars = [
  { number: "71", label: "ATOMIC NUMBER", sub: "The missing element" },
  { number: "175", label: "STABLE ISOTOPE", sub: "Production grade" },
  { number: "1663", label: "MELTING POINT °C", sub: "Won't break" },
  { number: "+3", label: "OXIDATION STATE", sub: "Three forces" },
  { number: "104", label: "NEUTRON COUNT", sub: "The invisible core" },
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
            // ELEMENT DATA · Yn · 71
          </motion.span>
          <h2 className="font-display text-3xl tracking-[0.08em] md:text-5xl lg:text-6xl">
            {["NOT", "AN", "AGENCY."].map((w, i) => (
              <motion.span key={i} className="mr-[0.3em] inline-block text-silver"
                initial={{ opacity: 0, y: 28, rotateX: -40 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                {w}
              </motion.span>
            ))}
            <br />
            {["NOT", "A", "FREELANCER."].map((w, i) => (
              <motion.span key={i} className="mr-[0.3em] inline-block text-silver"
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.55 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                {w}
              </motion.span>
            ))}
            <br />
            <motion.span className="mr-[0.3em] inline-block text-shimmer"
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}>
              A NEW ELEMENT ENTIRELY.
            </motion.span>
          </h2>
        </motion.div>

        {/* Glass quote */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="glass mx-auto mb-12 max-w-3xl rounded-lg p-8 md:p-12"
          style={{ willChange: "transform" }}>
          <p className="font-serif text-base italic leading-relaxed text-silver/80 md:text-lg md:leading-8">
            In 1907, element 71 was discovered simultaneously by{" "}
            <span className="font-semibold not-italic text-gold">three scientists on three continents</span>.
            No one could hold it back. Some things are inevitable.
          </p>
          <p className="mt-6 font-serif text-base italic leading-relaxed text-silver/80 md:text-lg md:leading-8">
            Yanium is that kind of force. A full-spectrum technology company built in{" "}
            <span className="not-italic text-silver">Yerevan, Armenia</span> — covering AI automation,
            web, mobile, backend, DevOps, QA, design, and brand identity under one roof with{" "}
            <span className="not-italic text-silver">zero handoff gaps</span>.
          </p>
          <p className="mt-6 font-serif text-base italic leading-relaxed text-silver/80 md:text-lg md:leading-8">
            We work with startups, established businesses, and enterprise clients. We build our own ventures.
            We take on elite freelance engagements. We form long-term technical partnerships.
          </p>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
          <div className="mt-6 flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-code-green status-pulse" />
            <span className="font-sans text-xs tracking-[0.2em] text-silver/50">ONE ELEMENT. EVERY COMPOUND YOU NEED.</span>
          </div>
        </motion.div>

        {/* Element property strip */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {pillars.map((p, i) => (
            <MagneticCard key={p.label}>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-center text-center"
                style={{ willChange: "transform" }}>
                <div className="mb-3 flex h-14 w-full items-center justify-center border border-gold/20 bg-gold/5 transition-all duration-500 group-hover:border-gold/50 group-hover:bg-gold/10">
                  <span className="font-display text-2xl font-bold text-gold">{p.number}</span>
                </div>
                <h4 className="mb-1 font-display text-[9px] tracking-[0.2em] text-silver/70">{p.label}</h4>
                <p className="font-mono text-[8px] tracking-[0.15em] text-silver/40">{p.sub}</p>
              </motion.div>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  )
}
