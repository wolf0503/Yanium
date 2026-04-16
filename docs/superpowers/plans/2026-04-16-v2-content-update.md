# Yanium v2 Content Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all website copy with the v2 content spec while preserving all animations, color palette, and typography.

**Architecture:** Update content strings in-place within existing components. Add three new section components (how-we-work, who-we-work-with, team). Wire new sections into page.tsx with SectionDividers.

**Tech Stack:** Next.js, React, TypeScript, Framer Motion, Tailwind CSS

---

### Task 1: Update Navbar

**Files:**
- Modify: `components/navbar.tsx`

- [ ] **Step 1: Replace navLinks array and add CTA button**

In `components/navbar.tsx`, replace the `navLinks` array (lines 6–14) and add a Book a Call CTA in the desktop nav:

```tsx
const navLinks = [
  { label: "WHAT WE ARE", href: "#philosophy" },
  { label: "SERVICES",    href: "#services" },
  { label: "HOW WE WORK", href: "#how-we-work" },
  { label: "VENTURES",    href: "#ventures" },
  { label: "TEAM",        href: "#team" },
  { label: "WORK WITH US",href: "#contact" },
]
```

In the desktop nav `div` (line 63–71), after the links map, add the CTA button before the closing `</div>`:

```tsx
<a href="#contact"
  className="ml-2 border border-gold/50 bg-gold/[0.07] px-5 py-2 font-display text-[10px] tracking-[0.25em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/[0.18]">
  BOOK A CALL
</a>
```

Also add it to the mobile menu (after the last `motion.a` link, before the closing `</motion.div>`):

```tsx
<motion.a href="#contact"
  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
  transition={{ delay: navLinks.length * 0.07, ease: [0.22, 1, 0.36, 1] }}
  onClick={() => setMobileOpen(false)}
  className="border border-gold/50 bg-gold/[0.07] px-8 py-3 font-display text-sm tracking-[0.3em] text-gold transition-colors hover:bg-gold/[0.18]">
  BOOK A CALL
</motion.a>
```

- [ ] **Step 2: Commit**

```bash
git add components/navbar.tsx
git commit -m "content(nav): update links and add Book a Call CTA"
```

---

### Task 2: Update Hero Section

**Files:**
- Modify: `components/hero-section.tsx`

- [ ] **Step 1: Replace headline words, ambient tag, subline, CTAs, add element callout and stats strip**

Replace the entire file content:

```tsx
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
      <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-24 text-center md:pt-28">
        <motion.span
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 font-display text-[10px] tracking-[0.5em] text-gold/70">
          // Yn · ELEMENT 71 · YANIUM · 288.07
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

        {/* Element callout */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-sm font-mono text-[10px] leading-relaxed tracking-[0.15em] text-gold/60 md:max-w-md">
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
          transition={{ duration: 0.7, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4">
          <a href="#contact"
            className="pulse-glow inline-block border border-gold/55 bg-gold/[0.07] px-10 py-4 font-display text-xs tracking-[0.35em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/[0.18] hover:shadow-[0_0_32px_rgba(212,175,55,0.3)]">
            BOOK A DISCOVERY CALL
          </a>
          <a href="#services"
            className="inline-block border border-silver/20 px-10 py-4 font-display text-xs tracking-[0.35em] text-silver/60 transition-all duration-300 hover:border-silver/50 hover:text-silver">
            EXPLORE THE ARSENAL
          </a>
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
```

- [ ] **Step 2: Commit**

```bash
git add components/hero-section.tsx
git commit -m "content(hero): v2 headline, subline, element callout, stats strip, dual CTAs"
```

---

### Task 3: Update Terminal Section (The Signal)

**Files:**
- Modify: `components/terminal-section.tsx`

- [ ] **Step 1: Replace LINES data array with element data points**

Replace lines 9–20 in `components/terminal-section.tsx`:

```tsx
const LINES: LineData[] = [
  { type: "simple", text: "> INITIALIZING: Yanium_Element_Engine", delay: 0 },
  { type: "simple", text: "> ATOMIC_NUMBER: 71 · YANIUM · RARE_EARTH", delay: 1000 },
  { type: "simple", text: "> SCANNING: Element_Properties...", delay: 2000 },
  { type: "metric", prefix: "> MELTING_POINT:", filled: 9, total: 10, value: 1663, unit: "°C", tag: "[WON'T BREAK]", tagColor: "gold", delay: 3200 },
  { type: "metric", prefix: "> STABLE_ISOTOPE:", filled: 8, total: 10, value: 175, unit: "", tag: "[PRODUCTION GRADE]", tagColor: "gold", delay: 4600 },
  { type: "metric", prefix: "> NEUTRON_COUNT:", filled: 7, total: 10, value: 104, unit: "", tag: "[INVISIBLE CORE]", tagColor: "cyan", delay: 6000 },
  { type: "metric", prefix: "> ISOTOPE_PURITY:", filled: 9, total: 10, value: 97.4, unit: "%", tag: "[HIRING STANDARD]", tagColor: "cyan", delay: 7400 },
  { type: "simple", text: "> STATUS: Element_71_Complete", color: "gold", delay: 8800 },
  { type: "simple", text: "> VERDICT: The last rare earth. The one that completes the series.", delay: 10000 },
  { type: "simple", text: "> PROTOCOL: Full-spectrum. No gaps. One element.", delay: 11400 },
]
```

Also update the section heading tag and title. Replace line 106–109:

```tsx
<span className="mb-4 font-display text-[10px] tracking-[0.4em] text-gold/70">// ELEMENT DATA · Yn · 71</span>
<h2 className="mb-12 text-center font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
  ELEMENT <span className="text-gold">PROPERTIES</span>
</h2>
```

And update the terminal window title (line 117):
```tsx
<span className="ml-3 font-mono text-xs text-silver/40">yanium://element-71 · Yn · 288.07</span>
```

And the terminal header comment (line 121):
```tsx
<div className="mb-2 font-mono text-xs text-silver/35">// ELEMENT 71 · LUTETIUM DATA — LIVE</div>
```

- [ ] **Step 2: Commit**

```bash
git add components/terminal-section.tsx
git commit -m "content(terminal): update Signal section with element data points"
```

---

### Task 4: Update Philosophy → "What We Are" Section

**Files:**
- Modify: `components/philosophy-section.tsx`

- [ ] **Step 1: Replace heading tag, headline words, glass quote body, pillars, add element property strip**

Replace the entire file:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/philosophy-section.tsx
git commit -m "content(what-we-are): v2 copy, element data strip, 1907 origin story"
```

---

### Task 5: Update Services Section — 3 Pillars

**Files:**
- Modify: `components/services-section.tsx`

- [ ] **Step 1: Replace services data with 3 pillars and update rendering**

Replace the entire file:

```tsx
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
    <section id="services" className="relative py-32 px-6">
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
```

- [ ] **Step 2: Commit**

```bash
git add components/services-section.tsx
git commit -m "content(services): restructure to 3 pillars (BUILD/AUTOMATE/CRAFT)"
```

---

### Task 6: Create How We Work Section

**Files:**
- Create: `components/how-we-work-section.tsx`

- [ ] **Step 1: Create new component**

```tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    num: "01",
    label: "DISCOVER",
    body: "One call. Zero fluff. We map your business goals, technical constraints, and success metrics before a single line of code is written.",
    timeline: "Day 1.",
  },
  {
    num: "02",
    label: "ARCHITECT",
    body: "Strategy, stack selection, system design. We present a clear technical blueprint — reviewed and agreed — before execution begins.",
    timeline: "Days 2–4.",
  },
  {
    num: "03",
    label: "EXECUTE",
    body: "Fast, focused sprints. AI handles the repetitive layers. Humans handle the logic that matters. You see progress daily, not quarterly.",
    timeline: "Weeks, not months.",
  },
  {
    num: "04",
    label: "OPERATE",
    body: "We don't disappear after launch. DevOps, QA, monitoring, iteration — we stay in the system as long as you need us.",
    timeline: "Ongoing.",
  },
]

const timelines = [
  { label: "MVP build", value: "2–4 weeks" },
  { label: "AI automation rollout", value: "1–3 weeks" },
  { label: "Enterprise platform", value: "6–12 weeks" },
  { label: "Brand identity system", value: "1–2 weeks" },
]

export function HowWeWorkSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="how-we-work" className="relative py-32 px-6">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[450px] w-[450px] rounded-full bg-gold/[0.025] blur-[140px]" />
      <div className="mx-auto max-w-5xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.7em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-4 inline-block font-display text-[10px] text-gold/70">
            // Yn-PROTOCOL · VIBE ENGINEERING
          </motion.span>
          <h2 className="font-display text-3xl tracking-[0.08em] text-silver md:text-5xl lg:text-6xl">
            HUMAN INTELLIGENCE.
            <br />
            <span className="text-gold">MACHINE VELOCITY.</span>
          </h2>
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-5 max-w-xl font-serif text-base italic text-silver/60">
            We run a Human-AI hybrid workflow we call Vibe Engineering. Our specialists own the
            architecture, business logic, and strategy. Our AI systems handle scaffolding,
            boilerplate, and iteration cycles.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div key={s.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-500 hover:border-gold/25 hover:bg-gold/[0.03]">
              <span className="mb-4 block font-display text-4xl font-bold text-gold/15 select-none">{s.num}</span>
              <p className="mb-1 font-mono text-[9px] tracking-[0.3em] text-gold/60">// {s.num} · {s.label}</p>
              <p className="mb-4 font-serif text-sm italic leading-relaxed text-silver/70">{s.body}</p>
              <div className="border-t border-white/[0.06] pt-3">
                <span className="font-mono text-[9px] tracking-[0.15em] text-silver/35">{s.timeline}</span>
              </div>
              <span className="pointer-events-none absolute -left-[2px] -top-[2px] h-4 w-4 border-l border-t border-gold/20 transition-all duration-500 group-hover:border-gold/45" />
              <span className="pointer-events-none absolute -bottom-[2px] -right-[2px] h-4 w-4 border-b border-r border-gold/20 transition-all duration-500 group-hover:border-gold/45" />
            </motion.div>
          ))}
        </div>

        {/* Timeline reference */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass rounded-lg p-8">
          <p className="mb-5 font-mono text-[9px] tracking-[0.3em] text-silver/40">// TYPICAL TIMELINES</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {timelines.map((t, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="font-serif text-sm italic text-silver/60">{t.label}</span>
                <span className="font-display text-base tracking-[0.1em] text-gold">{t.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-white/[0.06] pt-5">
            <span className="font-mono text-[10px] tracking-[0.15em] text-silver/30">
              1663°C — Lutetium&apos;s melting point. The highest of any rare earth. We operate at that temperature.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/how-we-work-section.tsx
git commit -m "feat(how-we-work): new section with 4-step process and timeline reference"
```

---

### Task 7: Update Comparison Section

**Files:**
- Modify: `components/comparison-section.tsx`

- [ ] **Step 1: Replace comparisonRows (6→8 rows) and update footer text**

Replace lines 6–13 (`comparisonRows` array):

```tsx
const comparisonRows = [
  { category: "COVERAGE",        legacy: "One discipline per agency",          frontier: "Full-stack: web, mobile, AI, DevOps, QA, design, brand" },
  { category: "SPEED",           legacy: "Months per milestone",               frontier: "Days to production" },
  { category: "PRICING",         legacy: "Hourly billing, unpredictable costs", frontier: "Result-based, outcome-driven" },
  { category: "AI CAPABILITY",   legacy: "Bolted on or outsourced",            frontier: "Core to every build" },
  { category: "WORKFLOW",        legacy: "Manual coding, slow iteration",       frontier: "Vibe Engineering — Human-AI hybrid" },
  { category: "TEAM STRUCTURE",  legacy: "Large teams, slow coordination",      frontier: "Lean specialists + AI engines" },
  { category: "AFTER LAUNCH",    legacy: "Handoff and disappear",               frontier: "Ongoing partnership available" },
  { category: "SCALABILITY",     legacy: "Rebuild to scale",                    frontier: "Architected for scale from day one" },
  { category: "ENGAGEMENT TYPES",legacy: "Agency or freelancer",                frontier: "Both — plus long-term partnership" },
]
```

Update the section tag (line ~55):
```tsx
className="mb-4 inline-block font-display text-[10px] text-gold/70">
// LEGACY vs Yn
```

Update the heading (line ~58–73). Replace the `<h2>` block:
```tsx
<h2 className="font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
  <motion.span
    initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="inline-block text-silver/40">THE OLD GUARD
  </motion.span>
  <br />
  <motion.span
    initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.35 }}
    className="inline-block text-shimmer">IS OBSOLETE.
  </motion.span>
</h2>
```

Add a subline after the `</h2>` closing tag (before `</motion.div>`):
```tsx
<motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
  transition={{ duration: 0.8, delay: 0.5 }}
  className="mx-auto mt-4 max-w-md font-serif text-sm italic text-silver/50">
  Element 71 was the last rare earth to be isolated.
  Everyone thought the series was complete. It wasn&apos;t.
</motion.p>
```

Update the footer text (line ~101–105):
```tsx
className="mt-10 text-center font-mono text-[10px] tracking-[0.25em] text-silver/30">
  ONE ELEMENT. EVERY COMPOUND YOU NEED.
```

- [ ] **Step 2: Commit**

```bash
git add components/comparison-section.tsx
git commit -m "content(comparison): add 3 rows, update headline, footer to v2"
```

---

### Task 8: Create Who We Work With Section

**Files:**
- Create: `components/who-we-work-with-section.tsx`

- [ ] **Step 1: Create new component**

```tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const clients = [
  {
    tag: "// STARTUPS & FOUNDERS",
    body: "You have an idea and a deadline. We move fast, validate quickly, and build products that survive contact with real users. MVP to launch. Zero overhead.",
  },
  {
    tag: "// BUSINESSES & OPERATORS",
    body: "You have operations that leak efficiency. We automate the manual, integrate the disconnected, and build systems that compound your advantage over time.",
  },
  {
    tag: "// ENTERPRISE & PARTNERS",
    body: "You need a reliable technical partner embedded in your operation. Aligned to your stack, your standards, your goals. We work as an extension of your team — not a vendor.",
  },
]

export function WhoWeWorkWithSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="who-we-work-with" className="relative py-32 px-6">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-gold/[0.02] blur-[130px]" />
      <div className="mx-auto max-w-5xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.7em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-4 inline-block font-display text-[10px] text-gold/70">
            // COMPOUNDS · Yn REACTS WITH
          </motion.span>
          <h2 className="font-display text-3xl tracking-[0.08em] text-silver md:text-5xl lg:text-6xl">
            EVERY CLIENT TYPE.
            <br />
            <span className="text-gold">ONE STANDARD.</span>
          </h2>
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-5 max-w-xl font-serif text-base italic text-silver/60">
            Like lutetium forming stable compounds with any element it meets —
            Yanium adapts to your context without compromising the core.
          </motion.p>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {clients.map((c, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-500 hover:border-gold/25 hover:bg-gold/[0.03]">
              <p className="mb-4 font-mono text-[9px] tracking-[0.25em] text-gold/60">{c.tag}</p>
              <p className="font-serif text-sm italic leading-relaxed text-silver/70">{c.body}</p>
              <span className="pointer-events-none absolute -left-[2px] -top-[2px] h-4 w-4 border-l border-t border-gold/20 transition-all duration-500 group-hover:border-gold/45" />
              <span className="pointer-events-none absolute -bottom-[2px] -right-[2px] h-4 w-4 border-b border-r border-gold/20 transition-all duration-500 group-hover:border-gold/45" />
            </motion.div>
          ))}
        </div>

        {/* Freelance callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="glass mb-10 rounded-lg p-6 text-center">
          <p className="mb-1 font-mono text-[9px] tracking-[0.25em] text-silver/40">// FREELANCE ENGAGEMENTS</p>
          <p className="font-serif text-sm italic text-silver/65">
            Need elite execution on a specific build?
            We take select freelance projects when the challenge is worth it.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col items-center gap-4">
          <p className="font-serif text-sm italic text-silver/50">Not sure which fits? Let&apos;s find out.</p>
          <a href="#contact"
            className="pulse-glow border border-gold/50 bg-gold/[0.07] px-10 py-4 font-display text-xs tracking-[0.35em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/[0.18] hover:shadow-[0_0_32px_rgba(212,175,55,0.3)]">
            BOOK A CALL
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/who-we-work-with-section.tsx
git commit -m "feat(who-we-work-with): new section with 3 client types and freelance callout"
```

---

### Task 9: Create Team Section

**Files:**
- Create: `components/team-section.tsx`

- [ ] **Step 1: Create new component**

```tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const disciplines = [
  {
    category: "// ENGINEERING",
    roles: [
      { title: "Frontend Engineers",   stack: "React · Next.js · Vue · TypeScript" },
      { title: "Backend Engineers",    stack: "Node.js · Python · APIs · Microservices" },
      { title: "Mobile Engineers",     stack: "React Native · iOS · Android" },
      { title: "Full-Stack Engineers", stack: "End-to-end product ownership" },
    ],
  },
  {
    category: "// INTELLIGENCE",
    roles: [
      { title: "AI Engineers",             stack: "LLM pipelines · Agents · RAG · Fine-tuning" },
      { title: "Automation Architects",    stack: "Business process · Workflow design" },
    ],
  },
  {
    category: "// INFRASTRUCTURE",
    roles: [
      { title: "DevOps Engineers", stack: "CI/CD · Cloud · Docker · Kubernetes" },
      { title: "QA Engineers",     stack: "Automated testing · Performance · Security" },
    ],
  },
  {
    category: "// CRAFT",
    roles: [
      { title: "UI/UX Designers",   stack: "Product design · Prototyping · Systems" },
      { title: "Brand Designers",   stack: "Identity · Motion · Print · Digital" },
    ],
  },
]

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="team" className="relative py-32 px-6">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-gold/[0.018] blur-[130px]" />
      <div className="mx-auto max-w-5xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.7em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-4 inline-block font-display text-[10px] text-gold/70">
            // Yn · 104 NEUTRONS · THE FORCE YOU DON'T SEE
          </motion.span>
          <h2 className="font-display text-3xl tracking-[0.08em] text-silver md:text-5xl lg:text-6xl">
            104 NEUTRONS.
            <br />
            <span className="text-gold">THE CORE THAT HOLDS IT TOGETHER.</span>
          </h2>
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-5 max-w-xl font-serif text-base italic text-silver/60">
            In lutetium&apos;s nucleus, 104 neutrons do the invisible work.
            No one sees them. Everything depends on them.
            Yanium is built the same way.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass mb-10 overflow-hidden rounded-lg">
          <div className="grid grid-cols-1 divide-y divide-white/[0.05] md:grid-cols-2 md:divide-x md:divide-y-0">
            {disciplines.map((d, di) => (
              <div key={di} className="p-7">
                <p className="mb-5 font-mono text-[9px] tracking-[0.3em] text-gold/60">{d.category}</p>
                <div className="flex flex-col gap-4">
                  {d.roles.map((r, ri) => (
                    <motion.div key={ri}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + di * 0.1 + ri * 0.06 }}
                      className="flex flex-col gap-0.5">
                      <span className="font-display text-sm tracking-[0.08em] text-silver">{r.title}</span>
                      <span className="font-mono text-[9px] tracking-[0.12em] text-silver/40">{r.stack}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-3 text-center">
          <p className="max-w-xl font-serif text-sm italic leading-relaxed text-silver/55">
            We don&apos;t list headcounts. We list capabilities. Every specialist on a Yanium project
            is exactly where they need to be — not assigned by availability, but matched by expertise.
          </p>
          <span className="font-mono text-[9px] tracking-[0.2em] text-silver/30">
            Yn-175 — the stable isotope. 97.4% pure. That&apos;s our hiring standard.
          </span>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/team-section.tsx
git commit -m "feat(team): new section with discipline grid and nucleus metaphor"
```

---

### Task 10: Update Ventures Section

**Files:**
- Modify: `components/ventures-section.tsx`

- [ ] **Step 1: Update section tag, subline, venture descriptions, and status badge labels**

Replace the `ventures` array (lines 6–34):

```tsx
const ventures = [
  {
    icon: Shield,
    code: "Yn-V01 · CV SENTINEL",
    title: "CV Sentinel",
    desc: "CV Sentinel analyzes career trajectories, tracks job market signals, and delivers actionable intelligence to help professionals make smarter, faster moves. Built for people who treat their career like an asset.",
    status: "ACTIVE · Yn-175",
    statusColor: "green" as const,
    stat: { label: "Profiles Analyzed", value: "12,000+", sub: "and growing" },
  },
  {
    icon: TrendingUp,
    code: "Yn-V02 · ROI SENTINEL",
    title: "ROI Sentinel",
    desc: "ROI Sentinel indexes property data, forecasts market movements, and surfaces high-ROI opportunities before they become obvious to everyone else. Data-driven. Local-first. Built for serious investors.",
    status: "BETA · Yn-175",
    statusColor: "gold" as const,
    stat: { label: "Data Points Indexed", value: "3.2M+", sub: "indexed" },
  },
  {
    icon: Activity,
    code: "Yn-V03 · MYZRA",
    title: "Myzra",
    desc: "Myzra applies the training principles of elite athletes to personal performance — structured, data-driven, and built for people who operate at high intensity and refuse to leave performance on the table.",
    status: "R&D · Yn-176",
    statusColor: "silver" as const,
    stat: { label: "Neural Map", value: "v2.0", sub: "in development" },
  },
]
```

Update the section tag (line ~111):
```tsx
className="mb-4 inline-block font-display text-[10px] text-gold/70">
// INTERNAL COMPOUNDS · BUILT BY Yn
```

Update the section subtitle (line ~124):
```tsx
className="mx-auto max-w-xl font-serif text-base italic leading-relaxed text-silver/65">
Our ventures are proof of method. Built with the same workflow, standards, and speed
we bring to every client engagement. No external funding required. No excuses accepted.
```

- [ ] **Step 2: Commit**

```bash
git add components/ventures-section.tsx
git commit -m "content(ventures): update descriptions, badges to Yn-175/Yn-176 notation"
```

---

### Task 11: Update Manifesto Section

**Files:**
- Modify: `components/manifesto-section.tsx`

- [ ] **Step 1: Replace pillars array with 4 v2 principles**

Replace the `pillars` array (lines 7–26) and update imports:

```tsx
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
```

Update the manifesto section tag (line ~119):
```tsx
className="mb-4 inline-block font-display text-[10px] text-gold/70">
// PROPERTIES OF Yn
```

Update the grid to handle 4 pillars (line ~128):
```tsx
<div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
```

- [ ] **Step 2: Commit**

```bash
git add components/manifesto-section.tsx
git commit -m "content(manifesto): update to 4 v2 principles, add PARTNERS pillar"
```

---

### Task 12: Update Footer / Contact Section

**Files:**
- Modify: `components/footer-section.tsx`

- [ ] **Step 1: Update contact heading, body, form fields, and footer info**

Replace the entire file:

```tsx
"use client"
import React, { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"

const inputClass = "w-full rounded-sm border border-white/15 bg-white/[0.06] px-4 py-3 font-sans text-sm text-silver outline-none transition-colors focus:border-gold/50 placeholder:text-silver/30"

const serviceOptions = [
  "Web or Mobile Product",
  "AI Automation",
  "Full-Stack Development",
  "Design & Brand",
  "Technical Partnership",
  "Freelance Engagement",
  "Something else",
]

export function FooterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [form, setForm] = useState({ name: "", company: "", email: "", service: "", goal: "" })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1500)
  }

  const navLinks = ["Services", "Ventures", "Team", "How We Work", "Book a Call"]

  return (
    <footer id="contact" className="relative py-32 px-6">
      <div className="mx-auto mb-20 h-px max-w-4xl bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="mx-auto max-w-4xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.4em] text-gold/70">// INITIATE REACTION · Work With Yn</span>
          <h2 className="mb-4 font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
            LET&apos;S BUILD SOMETHING
            <br />
            <span className="text-gold">WORTH BUILDING.</span>
          </h2>
          <p className="mx-auto mb-16 max-w-lg font-serif text-base italic leading-relaxed text-silver/65">
            We take on a focused number of engagements at a time.
            Tell us what you&apos;re working on — we&apos;ll respond within 24 hours.
            No pitch decks. No sales calls. Just a real conversation.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit} className="glass mx-auto max-w-xl rounded-lg p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-mono text-[10px] tracking-[0.25em] text-silver/55">// NAME *</label>
                <input id="name" type="text" required value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className={inputClass} placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="font-mono text-[10px] tracking-[0.25em] text-silver/55">// COMPANY / PROJECT *</label>
                <input id="company" type="text" required value={form.company}
                  onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                  className={inputClass} placeholder="Company or project name" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-[10px] tracking-[0.25em] text-silver/55">// EMAIL *</label>
                <input id="email" type="email" required value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className={inputClass} placeholder="your@email.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="service" className="font-mono text-[10px] tracking-[0.25em] text-silver/55">// WHAT DO YOU NEED? *</label>
                <select id="service" required value={form.service}
                  onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                  className={`${inputClass} appearance-none`}
                  style={{ background: "rgba(255,255,255,0.06)" }}>
                  <option value="" disabled style={{ background: "#050505" }}>Select a service...</option>
                  {serviceOptions.map(o => (
                    <option key={o} value={o} style={{ background: "#050505" }}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="goal" className="font-mono text-[10px] tracking-[0.25em] text-silver/55">// TELL US ABOUT YOUR GOAL *</label>
                <textarea id="goal" required rows={4} value={form.goal}
                  onChange={e => setForm(p => ({ ...p, goal: e.target.value }))}
                  className={`${inputClass} resize-none`}
                  placeholder="What are you building, what's the timeline, what does success look like?" />
              </div>
              <button type="submit" disabled={submitting}
                className="pulse-glow group mt-2 flex items-center justify-center gap-3 border border-gold/50 bg-gold/[0.08] px-8 py-4 font-display text-xs tracking-[0.35em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/[0.18] disabled:opacity-50">
                {submitting
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <>INITIATE REACTION <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                }
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass mx-auto max-w-xl rounded-lg p-12 text-center">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center border border-gold/35 bg-gold/8">
              <div className="h-2 w-2 rounded-full bg-gold status-pulse" />
            </div>
            <h3 className="mb-2 font-display text-2xl tracking-[0.1em] text-silver">REACTION INITIATED</h3>
            <p className="font-mono text-xs tracking-[0.15em] text-silver/50">INQUIRY RECEIVED</p>
            <p className="mt-3 font-serif text-sm italic text-silver/60">We will review and respond within 24 hours.</p>
          </motion.div>
        )}

        {/* Below-form direct contact */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center">
          <p className="mb-3 font-serif text-sm italic text-silver/40">Prefer to talk directly?</p>
          <a href="#contact"
            className="font-mono text-[10px] tracking-[0.2em] text-gold/60 underline decoration-gold/30 underline-offset-4 transition-colors hover:text-gold">
            SCHEDULE A CALL →
          </a>
        </motion.div>

        {/* Trust strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <span className="font-mono text-[9px] tracking-[0.2em] text-silver/30">Yn · Response within 24hrs</span>
          <span className="hidden text-silver/15 md:inline">·</span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-silver/30">Yerevan, Armenia</span>
          <span className="hidden text-silver/15 md:inline">·</span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-silver/30">Global delivery</span>
        </div>

        {/* Footer bottom */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/8 pt-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-7 w-7 items-center justify-center border border-gold/45 bg-gold/5">
              <span className="pointer-events-none absolute -left-[1.5px] -top-[1.5px] h-2 w-2 border-l border-t border-gold/65" />
              <span className="pointer-events-none absolute -bottom-[1.5px] -right-[1.5px] h-2 w-2 border-b border-r border-gold/65" />
              <span className="font-display text-xs font-bold leading-none text-gold">Yn</span>
            </div>
            <span className="font-display text-sm tracking-[0.25em] text-silver/60">YANIUM</span>
          </div>
          <p className="font-serif text-xs italic text-silver/35">The Missing Element.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {navLinks.map(l => (
              <a key={l} href={l === "Book a Call" ? "#contact" : `#${l.toLowerCase().replace(/ /g, "-")}`}
                className="font-mono text-[9px] tracking-[0.2em] text-silver/30 transition-colors hover:text-silver/60">
                {l}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="font-mono text-[9px] tracking-[0.2em] text-silver/25">© {new Date().getFullYear()} Yanium. Yerevan, Armenia.</span>
            <span className="hidden text-silver/15 md:inline">·</span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-silver/25">The element that completes your stack.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/footer-section.tsx
git commit -m "content(footer): v2 contact section with company field, dropdown, 24hr response"
```

---

### Task 13: Wire New Sections into page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Import and add new sections in v2 order**

Replace the entire file:

```tsx
"use client"
import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TerminalSection } from "@/components/terminal-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { ServicesSection } from "@/components/services-section"
import { HowWeWorkSection } from "@/components/how-we-work-section"
import { ComparisonSection } from "@/components/comparison-section"
import { WhoWeWorkWithSection } from "@/components/who-we-work-with-section"
import { TeamSection } from "@/components/team-section"
import { VenturesSection } from "@/components/ventures-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { FooterSection } from "@/components/footer-section"
import { CursorGlow } from "@/components/cursor-glow"
import { NeuralLoader } from "@/components/neural-loader"
import { SectionDivider } from "@/components/section-divider"
import { SpaceBackground } from "@/components/space-background"

export default function Page() {
  const [loaded, setLoaded] = useState(false)
  const handleLoadComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <NeuralLoader onComplete={handleLoadComplete} />}
      <main
        className="relative min-h-screen overflow-x-hidden bg-obsidian"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <SpaceBackground />
        <CursorGlow />
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <SectionDivider />
          <TerminalSection />
          <SectionDivider />
          <PhilosophySection />
          <SectionDivider />
          <ServicesSection />
          <SectionDivider />
          <HowWeWorkSection />
          <SectionDivider />
          <ComparisonSection />
          <SectionDivider />
          <WhoWeWorkWithSection />
          <SectionDivider />
          <TeamSection />
          <SectionDivider />
          <VenturesSection />
          <SectionDivider />
          <ManifestoSection />
          <FooterSection />
        </div>
      </main>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat(page): wire 3 new sections (how-we-work, who-we-work-with, team)"
```

---

### Task 14: Update SEO Metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update title, description, and OG tags**

In `app/layout.tsx`, find the `metadata` export and replace:

```tsx
export const metadata: Metadata = {
  title: "Yanium — Full-Stack AI & Product Engineering · Yerevan, Armenia",
  description: "Yanium builds web apps, mobile products, and AI automation systems for startups, businesses, and enterprise. Full-stack team. No gaps. Based in Yerevan, Armenia.",
  openGraph: {
    title: "Yanium — The Element Missing From Your Stack.",
    description: "Web · Mobile · AI Automation · DevOps · QA · Design. One team. Every layer. Yerevan, Armenia.",
  },
  keywords: ["AI automation company Armenia", "full-stack development Yerevan", "AI agents business", "Next.js development", "mobile app development", "product engineering", "DevOps Armenia"],
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "content(seo): update title, description, OG tags to v2"
```
