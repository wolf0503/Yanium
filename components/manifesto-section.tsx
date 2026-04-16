"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Layers, Zap, Cpu, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const pillars = [
  {
    icon: Layers,
    number: "01",
    title: "FULL COVERAGE",
    desc: "1663°C — lutetium doesn't break under heat. Neither do we. We cover every layer so nothing falls through between teams, disciplines, or handoffs. Gaps kill products. We don't leave gaps.",
  },
  {
    icon: Zap,
    number: "02",
    title: "SPEED AS STRUCTURE",
    desc: "Slow execution isn't careful. It's expensive. We compress timelines until your advantage becomes irreversible. Speed is not a feature. It's the architecture.",
  },
  {
    icon: Cpu,
    number: "03",
    title: "AI IS THE BASELINE",
    desc: "Every build we ship is AI-augmented. Not because it's trending — because it's faster, smarter, and scales better than the alternative. We don't add AI on top. We build from it.",
  },
  {
    icon: Users,
    number: "04",
    title: "PARTNERS, NOT VENDORS",
    desc: "Element 71 was discovered by three minds working independently toward the same truth. We operate like that with our clients — aligned to the same outcome, moving at the same velocity.",
  },
]

const TYPEWRITER_TEXT = "OUTCOMES"

function TypewriterWord({ trigger }: { trigger: boolean }) {
  const [shown, setShown] = useState("")
  useEffect(() => {
    if (!trigger) return
    let i = 0
    const iv = setInterval(() => {
      i++
      setShown(TYPEWRITER_TEXT.slice(0, i))
      if (i >= TYPEWRITER_TEXT.length) clearInterval(iv)
    }, 80)
    return () => clearInterval(iv)
  }, [trigger])
  return (
    <span className="text-gold">
      {shown}
      {shown.length < TYPEWRITER_TEXT.length && trigger && (
        <span className="terminal-cursor inline-block h-[0.85em] w-[0.08em] translate-y-[0.1em] bg-gold" />
      )}
    </span>
  )
}

function PillarCard({ p, i }: { p: { icon: LucideIcon; number: string; title: string; desc: string }; i: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center text-center"
      style={{ willChange: "transform" }}>

      {/* Number — always visible, glows on hover */}
      <motion.span
        className="mb-2 font-display font-bold leading-none select-none"
        style={{
          fontSize: "clamp(5rem,12vw,8rem)",
          color: hovered ? "rgba(212,175,55,0.35)" : "rgba(212,175,55,0.18)",
          textShadow: hovered ? "0 0 60px rgba(212,175,55,0.5), 0 0 20px rgba(212,175,55,0.3)" : "none",
          transition: "color 0.4s ease, text-shadow 0.4s ease",
        }}>
        {p.number}
      </motion.span>

      {/* Icon */}
      <div className={`mb-5 flex h-14 w-14 items-center justify-center border transition-all duration-500 ${
        hovered
          ? "border-gold/65 bg-gold/12 shadow-[0_0_24px_rgba(212,175,55,0.25)]"
          : "border-gold/25 bg-gold/5"
      }`}>
        <p.icon className="h-6 w-6 text-gold" />
      </div>

      <h3 className="mb-3 font-display text-lg tracking-[0.12em] text-silver md:text-xl">{p.title}</h3>
      <p className="max-w-xs font-serif text-sm italic leading-relaxed text-silver/70">{p.desc}</p>

      {/* Animated underline */}
      <div className="mt-5 overflow-hidden" style={{ width: "60px", height: "1px" }}>
        <motion.div
          className="h-full bg-gradient-to-r from-gold/60 to-gold/20"
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "0%" } : { x: "-100%" }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

export function ManifestoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="manifesto" className="relative py-32 px-6">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.025] blur-[160px]" />
      <div className="mx-auto max-w-6xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-4 inline-block font-display text-[10px] text-gold/70">
            // PROPERTIES OF Yn
          </motion.span>
          <h2 className="font-display text-3xl tracking-[0.08em] text-silver md:text-5xl lg:text-6xl">
            WE DO NOT BILL HOURS.
            <br />
            WE DELIVER{" "}<TypewriterWord trigger={isInView} />.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <PillarCard key={p.number} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
