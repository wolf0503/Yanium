"use client"
import { motion } from "framer-motion"
import { BlackholeCanvas } from "@/components/blackhole-canvas"
import { BlackHole } from "@/components/black-hole"

const headline1 = "WHERE INTELLIGENCE".split("")
const headline2 = "COLLAPSES INTO POWER".split("")

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <BlackholeCanvas className="z-0" />

      {/* ── Black Hole — full astrophysical animation, CSS-driven ── */}
      <BlackHole />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-40 bg-gradient-to-b from-transparent to-obsidian" />

      {/* TOP — headline, floating above the black hole */}
      <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-24 text-center md:pt-28">
        <motion.span
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 font-display text-[10px] tracking-[0.5em] text-gold/70">
          // VELOCITY OF INTELLIGENCE
        </motion.span>

        <h1 className="font-display leading-tight tracking-[0.1em]"
          style={{ fontSize: "clamp(1.7rem, 5vw, 4.2rem)" }}>
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
      </div>

      {/* BOTTOM — tagline + CTA + scroll indicator */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-5 px-6 pb-10 text-center md:pb-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-sm font-serif text-sm italic leading-relaxed text-silver/70 md:max-w-md md:text-base">
          Premium AI-native development. Built for those who refuse to wait.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}>
          <a href="#contact"
            className="pulse-glow inline-block border border-gold/55 bg-gold/[0.07] px-10 py-4 font-display text-xs tracking-[0.35em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/[0.18] hover:shadow-[0_0_32px_rgba(212,175,55,0.3)]">
            INITIATE PROTOCOL
          </a>
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
