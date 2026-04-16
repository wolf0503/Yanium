"use client"
import { motion } from "framer-motion"
import { BlackholeCanvas } from "@/components/blackhole-canvas"
import { BlackHole } from "@/components/black-hole"

const headline1 = "THE ELEMENT MISSING".split("")
const headline2 = "FROM YOUR STACK.".split("")

const statsStrip = [
  { top: "Yn · 71", bottom: "MISSING ELEMENT" },
  { top: "1907 · THREE MINDS", bottom: "CONVERGENCE OF FORCES" },
  { top: "Yn-175 · STABLE", bottom: "PRODUCTION GRADE" },
  { top: "1663°C · WON'T BREAK", bottom: "BUILT FOR PRESSURE" },
]

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <BlackholeCanvas className="z-0" />
      <BlackHole />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-40 bg-gradient-to-b from-transparent to-obsidian" />

      {/* TOP — ambient tag + headline */}
      <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-24 pb-32 text-center md:pt-28 md:pb-40">
        <motion.span
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 font-display text-[10px] tracking-[0.5em] text-gold/70">
          // Yn · ELEMENT 71 · YANIUM · 288.07
        </motion.span>

        <h1 className="font-display leading-tight tracking-[0.1em] text-[1.5rem] sm:text-[2.2rem] md:text-[3.2rem] lg:text-[4.2rem] xl:text-[5rem]">
          <span className="block text-silver">
            {headline1.map((ch, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.6 + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block whitespace-pre">
                {ch}
              </motion.span>
            ))}
          </span>
          <span className="block text-gold">
            {headline2.map((ch, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 1.05 + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block whitespace-pre">
                {ch}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Element callout */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 hidden max-w-sm font-mono text-[10px] leading-relaxed tracking-[0.15em] text-gold/60 sm:block md:max-w-md">
          Yn — Atomic Number 71. The last rare earth element.<br />
          The one that completes the series. That&apos;s not a coincidence.
        </motion.p>
      </div>

      {/* BOTTOM — subheadline + CTAs + stats strip + scroll indicator */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-5 px-6 pb-10 text-center md:pb-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-sm font-serif text-sm italic leading-relaxed text-silver/70 md:max-w-md md:text-base">
          Yanium is a full-spectrum AI and product engineering company.
          We build, automate, and scale — across every layer, from first line to final deploy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#contact"
              className="pulse-glow inline-block border border-gold/55 bg-gold/[0.07] px-10 py-4 font-display text-xs tracking-[0.35em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/[0.18] hover:shadow-[0_0_32px_rgba(212,175,55,0.3)]">
              BOOK A DISCOVERY CALL
            </a>
            <a href="#services"
              className="inline-block border border-silver/20 px-10 py-4 font-display text-xs tracking-[0.35em] text-silver/60 transition-all duration-300 hover:border-silver/50 hover:text-silver">
              EXPLORE THE ARSENAL
            </a>
          </div>
        </motion.div>

        {/* Floating stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {statsStrip.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span className="font-mono text-[9px] tracking-[0.2em] text-gold/70">{s.top}</span>
              <span className="font-mono text-[8px] tracking-[0.18em] text-silver/35">{s.bottom}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="flex flex-col items-center gap-2">
          <span className="font-sans text-[9px] tracking-[0.35em] text-silver/35">SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-gold/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
