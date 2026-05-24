"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

// ─── Capability icons ────────────────────────────────────────────────────────

function IconAI() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="h-9 w-9 shrink-0">
      <circle cx="22" cy="22" r="3" fill="rgba(212,175,55,0.9)" />
      <ellipse cx="22" cy="22" rx="13" ry="5" stroke="rgba(212,175,55,0.65)" strokeWidth="0.9" />
      <ellipse cx="22" cy="22" rx="13" ry="5" stroke="rgba(212,175,55,0.4)" strokeWidth="0.9" transform="rotate(60 22 22)" />
      <ellipse cx="22" cy="22" rx="13" ry="5" stroke="rgba(212,175,55,0.4)" strokeWidth="0.9" transform="rotate(-60 22 22)" />
      <circle cx="35" cy="22" r="1.8" fill="rgba(212,175,55,0.7)" />
      <circle cx="9"  cy="22" r="1.2" fill="rgba(212,175,55,0.4)" />
    </svg>
  )
}

function IconEng() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="h-9 w-9 shrink-0">
      <polygon points="22,4 38,13 38,31 22,40 6,31 6,13"
        stroke="rgba(212,175,55,0.65)" strokeWidth="0.9" />
      <line x1="22" y1="4"  x2="22" y2="22" stroke="rgba(212,175,55,0.45)" strokeWidth="0.8" />
      <line x1="38" y1="13" x2="22" y2="22" stroke="rgba(212,175,55,0.45)" strokeWidth="0.8" />
      <line x1="6"  y1="13" x2="22" y2="22" stroke="rgba(212,175,55,0.45)" strokeWidth="0.8" />
      <circle cx="22" cy="22" r="2.2" fill="rgba(212,175,55,0.85)" />
    </svg>
  )
}

function IconVenture() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="h-9 w-9 shrink-0">
      <circle cx="22" cy="22" r="16" stroke="rgba(212,175,55,0.2)"  strokeWidth="0.8" />
      <circle cx="22" cy="22" r="10" stroke="rgba(212,175,55,0.45)" strokeWidth="0.8" />
      <circle cx="22" cy="22" r="4"  stroke="rgba(212,175,55,0.8)"  strokeWidth="0.9" />
      <circle cx="22" cy="22" r="1.5" fill="rgba(212,175,55,0.95)" />
      <ellipse cx="22" cy="22" rx="19" ry="6.5"
        stroke="rgba(212,175,55,0.28)" strokeWidth="0.7" transform="rotate(-18 22 22)" />
    </svg>
  )
}

function IconTeam() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="h-9 w-9 shrink-0">
      <path
        d="M22 3 L24 20 L41 22 L24 24 L22 41 L20 24 L3 22 L20 20 Z"
        stroke="rgba(212,175,55,0.7)" strokeWidth="0.9"
        fill="rgba(212,175,55,0.07)"
      />
      <path
        d="M22 10 L23.2 21 L34 22 L23.2 23 L22 34 L20.8 23 L10 22 L20.8 21 Z"
        stroke="rgba(212,175,55,0.35)" strokeWidth="0.6" fill="none"
      />
      <circle cx="22" cy="22" r="2" fill="rgba(212,175,55,0.7)" />
    </svg>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

const capabilities = [
  { Icon: IconAI,      title: "AI AUTOMATION",        desc: "Intelligent systems that work while you scale." },
  { Icon: IconEng,     title: "PRODUCT ENGINEERING",  desc: "From idea to infra — we engineer what moves you forward." },
  { Icon: IconVenture, title: "VENTURE BUILDING",     desc: "We co-build, invest, and scale high-impact ventures." },
  { Icon: IconTeam,    title: "ELITE TEAM",           desc: "Operators, builders, and thinkers — aligned to ship." },
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

const CAP_H  = 164   // px — capability strip height
const STAT_H = 40    // px — stats strip height

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: "100svh", background: "#050505" }}
    >

      {/* ══════════════════════════════════════════════════════════
          LAYER 1 — PLANET VISUAL
      ══════════════════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 1 }}>

        {/* Hair-line vertical light shaft */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: 1,
            height: "36%",
            background: "linear-gradient(to bottom, transparent, rgba(255,255,200,0.95) 45%, rgba(212,175,55,0.6) 75%, transparent)",
          }}
        />

        {/* Wide corona bloom above sphere */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "min(52vw,460px)",
            height: "28%",
            background: "radial-gradient(ellipse at top, rgba(255,250,170,0.6) 0%, rgba(212,175,55,0.32) 32%, rgba(212,175,55,0.06) 68%, transparent 88%)",
            filter: "blur(16px)",
          }}
        />

        {/* Orbital ring (SVG ellipse) */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{ width: "min(94vw,840px)", marginTop: "-3%" }}
        >
          <svg viewBox="0 0 840 840" fill="none" style={{ width: "100%", height: "auto" }}>
            <ellipse cx="420" cy="380" rx="408" ry="132"
              stroke="rgba(212,175,55,0.16)" strokeWidth="1" transform="rotate(-10 420 380)" />
            <ellipse cx="420" cy="380" rx="408" ry="132"
              stroke="rgba(212,175,55,0.06)" strokeWidth="5" transform="rotate(-10 420 380)" />
          </svg>
        </div>

        {/* Planet sphere */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width:  "min(70vw,660px)",
            height: "min(70vw,660px)",
            borderRadius: "50%",
            marginTop: "-8%",
            background: [
              "radial-gradient(circle at 50% 20%,",
              "  rgba(56,38,10,0.95) 0%,",
              "  rgba(20,13,4,0.98) 28%,",
              "  rgba(7,4,2,1) 58%,",
              "  #000 100%)",
            ].join(""),
            boxShadow: [
              "0 0 0 1px rgba(212,175,55,0.07)",
              "0 0 90px rgba(212,175,55,0.13)",
              "0 0 200px rgba(212,175,55,0.05)",
              "inset 0 0 70px rgba(0,0,0,0.55)",
            ].join(","),
          }}
        >
          {/* North-pole glow burst */}
          <div style={{
            position: "absolute",
            top: "-6px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "58%",
            height: "30%",
            background: "radial-gradient(ellipse at top, rgba(255,255,215,0.98) 0%, rgba(255,228,90,0.82) 16%, rgba(212,175,55,0.42) 42%, transparent 70%)",
            filter: "blur(9px)",
          }} />

          {/* Rim-light halo */}
          <div style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            boxShadow: "0 0 55px rgba(212,175,55,0.2), inset 0 0 35px rgba(212,175,55,0.04)",
          }} />

          {/* Surface micro-texture */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: [
              "radial-gradient(circle at 28% 32%, rgba(255,215,80,0.05) 0%, transparent 38%)",
              "radial-gradient(circle at 72% 68%, rgba(140,95,18,0.04) 0%, transparent 32%)",
            ].join(","),
          }} />
        </div>

        {/* Soft vignette from mid-screen down */}
        <div
          className="absolute inset-x-0"
          style={{
            top: "48%",
            bottom: 0,
            background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.65) 45%, #050505 100%)",
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
          className="mb-2 font-display text-[10px] tracking-[0.4em] text-silver/62 sm:text-[12px]"
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
            className="group flex items-center justify-center gap-2 border border-gold/58 bg-gold/[0.10] px-8 py-3.5 font-display text-[10px] tracking-[0.3em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/[0.20]"
            style={{ boxShadow: "0 0 32px rgba(212,175,55,0.11)" }}
          >
            BOOK A DISCOVERY CALL
            <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#services"
            className="group flex items-center justify-center gap-2 border border-white/14 bg-white/[0.025] px-8 py-3.5 font-display text-[10px] tracking-[0.3em] text-silver/55 transition-all duration-300 hover:border-white/28 hover:text-silver/88"
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
        className="absolute inset-x-0 bottom-0 border-t border-gold/10"
        style={{
          height: CAP_H,
          zIndex: 10,
          background: "rgba(6,5,3,0.93)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div className="grid h-full grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ Icon, title, desc }, i) => (
            <div
              key={title}
              className={`flex h-full items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-gold/[0.03] ${
                // i=0,2: left column — always border-r
                // i=1: right column on mobile, 2nd column on desktop — border only on desktop
                // i=3: always last — no border
                i === 3 ? "" : i === 1 ? "lg:border-r lg:border-gold/10" : "border-r border-gold/10"
              }`}
            >
              <Icon />
              <div className="text-left">
                <div className="mb-1 font-display text-[9px] tracking-[0.22em] text-gold/82">
                  {title}
                </div>
                <div className="font-mono text-[9px] leading-relaxed text-silver/38">
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
