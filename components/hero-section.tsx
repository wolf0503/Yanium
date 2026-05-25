"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

// ─── Capability icons ────────────────────────────────────────────────────────

function IconAI() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="h-10 w-10 shrink-0">
      <circle cx="22" cy="22" r="3.5" fill="rgba(212,175,55,0.95)" />
      <ellipse cx="22" cy="22" rx="14" ry="5.5" stroke="rgba(212,175,55,0.65)" strokeWidth="0.9" />
      <ellipse cx="22" cy="22" rx="14" ry="5.5" stroke="rgba(212,175,55,0.40)" strokeWidth="0.9" transform="rotate(60 22 22)" />
      <ellipse cx="22" cy="22" rx="14" ry="5.5" stroke="rgba(212,175,55,0.40)" strokeWidth="0.9" transform="rotate(-60 22 22)" />
      <circle cx="36" cy="22" r="2"   fill="rgba(212,175,55,0.75)" />
      <circle cx="8"  cy="22" r="1.4" fill="rgba(212,175,55,0.45)" />
    </svg>
  )
}

function IconEng() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="h-10 w-10 shrink-0">
      {/* Isometric cube — top face */}
      <polygon points="22,5 37,13.5 22,22 7,13.5"
        stroke="rgba(212,175,55,0.65)" strokeWidth="0.9" fill="rgba(212,175,55,0.04)" />
      {/* Left face */}
      <polygon points="7,13.5 22,22 22,39 7,30.5"
        stroke="rgba(212,175,55,0.42)" strokeWidth="0.9" fill="rgba(212,175,55,0.02)" />
      {/* Right face */}
      <polygon points="37,13.5 37,30.5 22,39 22,22"
        stroke="rgba(212,175,55,0.52)" strokeWidth="0.9" fill="rgba(212,175,55,0.03)" />
      {/* Top face inner lines */}
      <line x1="22" y1="5"     x2="22" y2="22"    stroke="rgba(212,175,55,0.22)" strokeWidth="0.6" />
      <line x1="14.5" y1="9.3" x2="29.5" y2="17.8" stroke="rgba(212,175,55,0.18)" strokeWidth="0.6" />
    </svg>
  )
}

function IconVenture() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="h-10 w-10 shrink-0">
      <circle cx="22" cy="22" r="17"  stroke="rgba(212,175,55,0.20)" strokeWidth="0.8" />
      <circle cx="22" cy="22" r="11"  stroke="rgba(212,175,55,0.45)" strokeWidth="0.8" />
      <circle cx="22" cy="22" r="4.5" stroke="rgba(212,175,55,0.80)" strokeWidth="0.9" />
      <circle cx="22" cy="22" r="1.8" fill="rgba(212,175,55,0.98)" />
      <ellipse cx="22" cy="22" rx="20" ry="7"
        stroke="rgba(212,175,55,0.28)" strokeWidth="0.7" transform="rotate(-18 22 22)" />
    </svg>
  )
}

function IconTeam() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="h-10 w-10 shrink-0">
      <path
        d="M22 3 L24.2 20 L41 22 L24.2 24 L22 41 L19.8 24 L3 22 L19.8 20 Z"
        stroke="rgba(212,175,55,0.70)" strokeWidth="0.9" fill="rgba(212,175,55,0.06)"
      />
      <path
        d="M22 11 L23.4 21 L33 22 L23.4 23 L22 33 L20.6 23 L12 22 L20.6 21 Z"
        stroke="rgba(212,175,55,0.35)" strokeWidth="0.6" fill="none"
      />
      <circle cx="22" cy="22" r="2.2" fill="rgba(212,175,55,0.75)" />
    </svg>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

const capabilities = [
  { Icon: IconAI,      title: "AI AUTOMATION",       desc: "Intelligent systems that work while you scale." },
  { Icon: IconEng,     title: "PRODUCT ENGINEERING", desc: "From idea to infra — we engineer what moves you forward." },
  { Icon: IconVenture, title: "VENTURE BUILDING",    desc: "We co-build, invest, and scale high-impact ventures." },
  { Icon: IconTeam,    title: "ELITE TEAM",          desc: "Operators, builders, and thinkers — aligned to ship." },
]

const statsItems = [
  { kind: "text",  label: "Yn · 71 · ELEMENT" },
  { kind: "plus" },
  { kind: "text",  label: "BUILT FOR PRESSURE" },
  { kind: "badge" },
  { kind: "text",  label: "CONVERGENCE OF FORCES" },
  { kind: "plus" },
  { kind: "text",  label: "EST. 1907" },
] as const

// ─── Component ───────────────────────────────────────────────────────────────

const CAP_H  = 116
const STAT_H = 32

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: "100svh", background: "#050505" }}
    >

      {/* ══════════════════════════════════════════════════════════
          LAYER 1 — PLANET BACKGROUND IMAGE
      ══════════════════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 1 }}>

        {/* Planet render — full bleed, anchored to top center */}
        <Image
          src="/bg_planet.png"
          alt=""
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center top" }}
        />

        {/* Left edge fade into site bg */}
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: "10%", background: "linear-gradient(to right, #050505 0%, transparent 100%)" }}
        />
        {/* Right edge fade */}
        <div
          className="absolute inset-y-0 right-0"
          style={{ width: "10%", background: "linear-gradient(to left, #050505 0%, transparent 100%)" }}
        />
        {/* Bottom fade into main content */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "40%",
            background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.72) 50%, #050505 100%)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 2 — SIDE DECORATIONS
      ══════════════════════════════════════════════════════════ */}

      {/* Left — dots + SCROLL */}
      <div
        className="pointer-events-none absolute left-6 hidden flex-col items-center gap-2 lg:flex"
        style={{ zIndex: 10, top: "28%", bottom: `${CAP_H + STAT_H}px` }}
      >
        <div className="flex flex-col gap-1.5">
          {[0,1,2].map(i => <div key={i} className="h-1 w-1 rounded-full bg-gold/40" />)}
        </div>
        <div className="h-16 w-px bg-gradient-to-b from-gold/35 to-transparent" />
        <span
          className="font-mono text-[8px] tracking-[0.5em] text-silver/28"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          SCROLL
        </span>
        <svg className="mt-1" viewBox="0 0 10 16" fill="none" width="10" height="16">
          <line x1="5" y1="0" x2="5" y2="11" stroke="rgba(212,175,55,0.25)" strokeWidth="0.8" />
          <path d="M2 8.5 L5 12.5 L8 8.5" stroke="rgba(212,175,55,0.45)" strokeWidth="0.9" fill="none" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Right — dots + EXPLORE */}
      <div
        className="pointer-events-none absolute right-6 hidden flex-col items-center gap-2 lg:flex"
        style={{ zIndex: 10, top: "28%", bottom: `${CAP_H + STAT_H}px` }}
      >
        <div className="flex flex-col gap-1.5">
          {[0,1,2].map(i => <div key={i} className="h-1 w-1 rounded-full bg-gold/40" />)}
        </div>
        <div className="h-16 w-px bg-gradient-to-b from-gold/35 to-transparent" />
        <span
          className="font-mono text-[8px] tracking-[0.5em] text-silver/28"
          style={{ writingMode: "vertical-rl" }}
        >
          EXPLORE
        </span>
        <svg className="mt-1" viewBox="0 0 10 16" fill="none" width="10" height="16">
          <line x1="5" y1="0" x2="5" y2="11" stroke="rgba(212,175,55,0.25)" strokeWidth="0.8" />
          <path d="M2 8.5 L5 12.5 L8 8.5" stroke="rgba(212,175,55,0.45)" strokeWidth="0.9" fill="none" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 3 — CORNER PANELS
      ══════════════════════════════════════════════════════════ */}

      {/* Top-left: Yn Element badge */}
      <div className="absolute hidden lg:block" style={{ top: 86, left: 28, zIndex: 10 }}>
        <div
          className="border border-gold/22 bg-black/50 px-3 py-2.5 backdrop-blur-sm"
          style={{ boxShadow: "0 0 24px rgba(212,175,55,0.06)" }}
        >
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-gold/30" />
              <div className="absolute inset-[4px] rounded-full border border-gold/18" />
              <div className="h-2 w-2 rounded-full bg-gold/70" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold leading-none text-gold">
                Yn <span className="text-[10px] text-gold/55">71</span>
              </div>
              <div className="mt-0.5 font-mono text-[8px] tracking-[0.3em] text-silver/30">ELEMENT</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top-right: Atomic number panel */}
      <div className="absolute hidden lg:block" style={{ top: 86, right: 28, zIndex: 10 }}>
        <div
          className="border border-gold/22 bg-black/50 px-4 py-2.5 backdrop-blur-sm"
          style={{ boxShadow: "0 0 24px rgba(212,175,55,0.06)" }}
        >
          <div className="mb-1 font-mono text-[8px] tracking-[0.3em] text-silver/30">ATOMIC NUMBER</div>
          <div className="flex items-end gap-3">
            <div className="font-display text-[2.6rem] font-bold leading-none text-gold/90">71</div>
            <svg className="mb-1 shrink-0" viewBox="0 0 36 36" fill="none" width="28" height="28">
              <circle cx="18" cy="18" r="3.5" fill="rgba(212,175,55,0.85)" />
              <ellipse cx="18" cy="18" rx="14" ry="5.5" stroke="rgba(212,175,55,0.55)" strokeWidth="0.9" />
              <ellipse cx="18" cy="18" rx="14" ry="5.5" stroke="rgba(212,175,55,0.30)" strokeWidth="0.9" transform="rotate(60 18 18)" />
              <ellipse cx="18" cy="18" rx="14" ry="5.5" stroke="rgba(212,175,55,0.30)" strokeWidth="0.9" transform="rotate(-60 18 18)" />
              <circle cx="32" cy="18" r="1.8" fill="rgba(212,175,55,0.70)" />
            </svg>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 4 — HERO CONTENT
      ══════════════════════════════════════════════════════════ */}
      <div
        className="relative flex flex-col items-center justify-center px-4 text-center"
        style={{
          zIndex: 10,
          minHeight: `calc(100svh - ${CAP_H + STAT_H}px)`,
          paddingTop: "10vh",
          paddingBottom: "2vh",
        }}
      >
        {/* YANIUM wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5"
        >
          <Image
            src="/logo-wordmark.png"
            alt="YANIUM"
            width={800}
            height={160}
            priority
            className="w-[min(80vw,740px)] h-auto"
            style={{ filter: "drop-shadow(0 0 55px rgba(212,175,55,0.38))", height: "auto" }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2 font-display text-[10px] tracking-[0.45em] text-silver/62 sm:text-[12px]"
        >
          THE ELEMENT MISSING FROM{" "}
          <span className="text-gold">YOUR STACK.</span>
        </motion.p>

        {/* Sparkle separator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.62 }}
          className="mb-6 flex items-center gap-2"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold/30" />
          <span className="text-[9px] leading-none text-gold/70">✦</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold/30" />
        </motion.div>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-md font-serif text-sm leading-loose text-silver/55"
        >
          Yanium is a full-spectrum AI and product engineering company.{" "}
          <br className="hidden sm:block" />
          We build, automate, and scale — across every layer,{" "}
          <br className="hidden sm:block" />
          from first line to final deploy.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.96, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#contact"
            className="group flex items-center justify-center gap-2 border border-gold/60 bg-gold/[0.12] px-8 py-3.5 font-display text-[10px] tracking-[0.3em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/[0.22]"
            style={{ boxShadow: "0 0 32px rgba(212,175,55,0.13)" }}
          >
            BOOK A DISCOVERY CALL
            <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#services"
            className="group flex items-center justify-center gap-2 border border-white/16 bg-white/[0.028] px-8 py-3.5 font-display text-[10px] tracking-[0.3em] text-silver/58 transition-all duration-300 hover:border-white/30 hover:text-silver/90"
          >
            EXPLORE THE ARSENAL
            <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 5 — STATS STRIP
      ══════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 hidden items-center justify-center border-t border-b border-gold/8 md:flex"
        style={{ bottom: CAP_H, height: STAT_H, zIndex: 10 }}
      >
        {statsItems.map((item, i) => {
          if (item.kind === "badge") return (
            <div key={i} className="flex h-full items-center justify-center border-x border-gold/8 px-6">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/48 bg-gold/[0.07]">
                <span className="font-display text-[7px] font-bold tracking-wider text-gold">YN</span>
              </div>
            </div>
          )
          if (item.kind === "plus") return (
            <svg key={i} className="mx-3 shrink-0" viewBox="0 0 12 12" fill="none" width="10" height="10">
              <line x1="6" y1="0" x2="6" y2="12" stroke="rgba(212,175,55,0.45)" strokeWidth="0.8" />
              <line x1="0" y1="6" x2="12" y2="6" stroke="rgba(212,175,55,0.45)" strokeWidth="0.8" />
            </svg>
          )
          return (
            <span key={i} className="px-4 font-mono text-[8px] tracking-[0.28em] text-silver/22">
              {item.label}
            </span>
          )
        })}
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 6 — CAPABILITY STRIP
      ══════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 bottom-0 border-t border-gold/12"
        style={{
          height: CAP_H,
          zIndex: 10,
          background: "rgba(6,5,3,0.94)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div className="grid h-full grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ Icon, title, desc }, i) => (
            <div
              key={title}
              className={`flex h-full items-center gap-4 px-5 py-3 transition-colors duration-300 hover:bg-gold/[0.03] ${
                i === 3 ? "" : i === 1 ? "lg:border-r lg:border-gold/12" : "border-r border-gold/12"
              }`}
            >
              <Icon />
              <div className="text-left">
                <div className="mb-1 font-display text-[9px] tracking-[0.22em] text-gold/85">
                  {title}
                </div>
                <div className="font-mono text-[9px] leading-relaxed text-silver/40">
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
