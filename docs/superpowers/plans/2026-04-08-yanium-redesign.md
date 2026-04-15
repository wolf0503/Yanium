# Yanium Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full rebrand + animated redesign of Yanium from EXONIC AI to a premium space-themed, interactive landing page.

**Architecture:** Single Next.js page. Canvas 2D for black hole hero. Framer Motion for scroll animations. New reusable primitives (MagneticCard, Odometer, BorderTrace, ParticleBurst) shared across sections.

**Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion, Canvas 2D, JetBrains Mono (terminal only), Cinzel + Cormorant Garamond + Tenor Sans (Google Fonts)

---

## File Map

**Create:**
- `components/blackhole-canvas.tsx`
- `components/magnetic-card.tsx`
- `components/odometer.tsx`
- `components/border-trace.tsx`
- `components/particle-burst.tsx`
- `components/philosophy-section.tsx`
- `components/services-section.tsx`
- `components/ventures-section.tsx`

**Modify:**
- `app/layout.tsx` — font swap
- `tailwind.config.ts` — gold token, font families
- `app/globals.css` — full CSS overhaul
- `app/page.tsx` — update imports
- `components/navbar.tsx` — Yn logo, gold, Cinzel
- `components/hero-section.tsx` — use BlackholeCanvas
- `components/neural-loader.tsx` — gold colors
- `components/star-field.tsx` — mouse parallax
- `components/cursor-glow.tsx` — gold dot + cyan trail
- `components/terminal-section.tsx` — Live Signal upgrade
- `components/comparison-section.tsx` — gold column, alternating anims
- `components/manifesto-section.tsx` — typewriter, border-trace, counter
- `components/footer-section.tsx` — particle burst, floating labels, Yanium brand

**Delete:**
- `components/neural-core.tsx`
- `components/vibe-story-section.tsx`
- `components/capabilities-section.tsx`
- `components/labs-section.tsx`

---

## Task 1: Font & Color Foundation

**Files:** `app/layout.tsx`, `tailwind.config.ts`

- [ ] **Replace layout.tsx**

```tsx
// app/layout.tsx
import React from "react"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Cinzel, Cormorant_Garamond, Tenor_Sans } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cinzel" })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600"], style: ["italic"], variable: "--font-cormorant" })
const tenor = Tenor_Sans({ subsets: ["latin"], weight: ["400"], variable: "--font-tenor" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: "Yanium | Velocity of Intelligence",
  description: "Premium AI-native development. Built for those who refuse to wait.",
}
export const viewport: Viewport = { themeColor: "#050505" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${cinzel.variable} ${cormorant.variable} ${tenor.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Replace tailwind.config.ts**

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        gold: "#D4AF37",
        "gold-light": "#F5E06E",
        cyan: "#00F0FF",
        silver: "#E0E0E0",
        obsidian: "#050505",
        "code-green": "#0FF043",
      },
      fontFamily: {
        display: ["var(--font-cinzel)"],
        serif: ["var(--font-cormorant)"],
        sans: ["var(--font-tenor)"],
        mono: ["var(--font-jetbrains)"],
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
```

- [ ] **Run dev server to verify fonts load**
```bash
cd C:/projects/Yanium && pnpm dev
```
Open `http://localhost:3000` — Cinzel should now be active on all headings.

- [ ] **Commit**
```bash
git add app/layout.tsx tailwind.config.ts
git commit -m "feat: swap fonts to Cinzel/Cormorant/Tenor, add gold color token"
```

---

## Task 2: Global CSS Overhaul

**Files:** `app/globals.css`

- [ ] **Replace globals.css entirely**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 2%;
    --foreground: 0 0% 88%;
    --card: 0 0% 5%;
    --card-foreground: 0 0% 88%;
    --popover: 0 0% 5%;
    --popover-foreground: 0 0% 88%;
    --primary: 43 65% 52%;
    --primary-foreground: 0 0% 2%;
    --secondary: 0 0% 10%;
    --secondary-foreground: 0 0% 88%;
    --muted: 0 0% 10%;
    --muted-foreground: 0 0% 55%;
    --accent: 0 0% 10%;
    --accent-foreground: 0 0% 88%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 100% / 0.08;
    --input: 0 0% 100% / 0.08;
    --ring: 43 65% 52%;
    --radius: 0.5rem;
  }
  * { @apply border-border; }
  body { background-color: #050505; color: #E0E0E0; cursor: none; }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
}

/* Noise texture */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* Scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #050505; }
::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.6); }

/* Selection */
::selection { background: rgba(212,175,55,0.25); color: #E0E0E0; }

/* Glass */
.glass {
  background: rgba(255,255,255,0.025);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
}

/* Gold pulse glow (buttons, logo) */
@keyframes pulse-glow-gold {
  0%, 100% { box-shadow: 0 0 15px rgba(212,175,55,0.3), 0 0 30px rgba(212,175,55,0.1); }
  50%       { box-shadow: 0 0 25px rgba(212,175,55,0.5), 0 0 50px rgba(212,175,55,0.2); }
}
.pulse-glow { animation: pulse-glow-gold 3s ease-in-out infinite; }

/* Terminal cursor */
@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
.terminal-cursor { animation: blink-cursor 1s step-end infinite; }

/* Float animation (Yn element box) */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}
.animate-float { animation: float 4s ease-in-out infinite; }

/* Status dot pulse */
@keyframes status-pulse {
  0%, 100% { transform: scale(1);   opacity: 1; }
  50%       { transform: scale(1.4); opacity: 0.5; }
}
.status-pulse { animation: status-pulse 2s ease-in-out infinite; }

/* Scanline sweep */
@keyframes scanline {
  0%   { top: 0%; opacity: 0.06; }
  100% { top: 100%; opacity: 0; }
}
.scanline {
  position: absolute;
  left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent);
  pointer-events: none;
  animation: scanline 4s linear infinite;
}

/* 3D tilt transition */
.tilt-card { transition: transform 0.15s ease; transform-style: preserve-3d; }

/* Smooth scroll */
html { scroll-behavior: smooth; }
```

- [ ] **Verify** — run `pnpm dev`, scrollbar should be gold, selection highlight gold.

- [ ] **Commit**
```bash
git add app/globals.css
git commit -m "feat: global CSS overhaul — gold palette, cursor:none, gold scrollbar"
```

---

## Task 3: BlackholeCanvas Component

**Files:** Create `components/blackhole-canvas.tsx`

- [ ] **Create the component**

```tsx
// components/blackhole-canvas.tsx
"use client"

import { useEffect, useRef, useCallback } from "react"

interface BlackholeCanvasProps {
  className?: string
}

export function BlackholeCanvas({ className = "" }: BlackholeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, proximity: 0 })
  const frameRef = useRef<number>(0)

  const init = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    let cx = W / 2
    let cy = H / 2

    // Stars — 3 parallax layers
    const STAR_COUNT = 320
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.6 + 0.2,
      tw: Math.random() * Math.PI * 2,
      twS: 0.008 + Math.random() * 0.012,
      layer: Math.floor(Math.random() * 3),
    }))
    const PARALLAX = [0.022, 0.013, 0.005]

    // Disk particles
    const DISK_COUNT = 1800
    const disk = Array.from({ length: DISK_COUNT }, () => {
      const band = Math.random()
      return {
        r: 90 + band * 260,
        theta: Math.random() * Math.PI * 2,
        speed: (0.18 + (1 - band) * 0.14) * (Math.random() > 0.5 ? 1 : -1) * 0.6,
        band,
        size: 0.5 + Math.random() * 1.6,
        alpha: 0.3 + Math.random() * 0.7,
        hue: 42 + band * 20,
        sat: 70 + (1 - band) * 30,
        lit: 80 - band * 35,
      }
    })

    // Infalling streams
    const streams = Array.from({ length: 120 }, (_, i) => ({
      angle: (i / 120) * Math.PI * 2,
      r: 200 + Math.random() * 300,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      alpha: 0.15 + Math.random() * 0.35,
    }))

    // Jet particles
    const jets = Array.from({ length: 200 }, () => ({
      side: Math.random() > 0.5 ? 1 : -1,
      x: (Math.random() - 0.5) * 18,
      y: 80 + Math.random() * 400,
      speed: 1.2 + Math.random() * 2.5,
      alpha: 0.4 + Math.random() * 0.6,
      size: 0.8 + Math.random() * 1.8,
      drift: (Math.random() - 0.5) * 0.5,
    }))

    const EH_R = 74
    let t = 0

    const draw = () => {
      t += 0.008
      const pulse = Math.sin(t * 0.7) * 0.5 + 0.5
      const mx = mouseRef.current.x / W - 0.5
      const my = mouseRef.current.y / H - 0.5
      const prox = mouseRef.current.proximity

      ctx.clearRect(0, 0, W, H)

      // bg
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H))
      bg.addColorStop(0, "rgba(8,4,2,1)")
      bg.addColorStop(0.35, "rgba(4,2,4,1)")
      bg.addColorStop(1, "rgba(1,1,2,1)")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // stars with parallax
      stars.forEach(s => {
        s.tw += s.twS
        const a = s.a * (0.5 + 0.5 * Math.sin(s.tw))
        const px = s.x * W - mx * W * PARALLAX[s.layer]
        const py = s.y * H - my * H * PARALLAX[s.layer]
        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${a})`
        ctx.fill()
      })

      // outer glow
      const og = ctx.createRadialGradient(cx, cy, 80, cx, cy, 500)
      og.addColorStop(0, `rgba(212,175,55,${0.06 + pulse * 0.04 + prox * 0.04})`)
      og.addColorStop(0.4, `rgba(100,60,10,${0.03})`)
      og.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = og
      ctx.fillRect(0, 0, W, H)

      // infalling streams
      streams.forEach(s => {
        s.progress += s.speed * (1 + prox * 0.5)
        if (s.progress > 1) s.progress = 0
        const r = s.r * (1 - s.progress)
        const ix = cx + Math.cos(s.angle + t * 0.1) * r
        const iy = cy + Math.sin(s.angle + t * 0.1) * r * 0.32
        ctx.beginPath()
        ctx.arc(ix, iy, 0.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,175,55,${s.alpha * s.progress * 0.7})`
        ctx.fill()
      })

      // disk back half
      disk.forEach(p => {
        p.theta += p.speed * 0.016 * (1 + prox * 0.4)
        const x = cx + Math.cos(p.theta) * p.r
        const y = cy + Math.sin(p.theta) * p.r * 0.3
        if (Math.sin(p.theta) > 0) return
        const depth = (1 - p.band) * 0.6 + 0.4
        ctx.beginPath()
        ctx.arc(x, y, p.size * depth, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},${p.sat}%,${p.lit}%,${p.alpha * 0.55})`
        ctx.fill()
      })

      // jet particles
      jets.forEach(j => {
        j.y -= j.speed
        if (j.y < 0) { j.y = 80 + Math.random() * 300; j.x = (Math.random() - 0.5) * 18 }
        const jy = cy - j.y * j.side
        const jx = cx + j.x + Math.sin(t + j.y * 0.05) * j.drift * 3
        ctx.beginPath()
        ctx.arc(jx, jy, j.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,240,255,${j.alpha * (1 - j.y / 400) * 0.6})`
        ctx.fill()
      })

      // jet glow columns
      for (const side of [-1, 1]) {
        const jg = ctx.createLinearGradient(cx, cy, cx, cy - side * 340)
        jg.addColorStop(0, "rgba(0,240,255,0)")
        jg.addColorStop(0.1, `rgba(0,240,255,${0.12 + pulse * 0.06})`)
        jg.addColorStop(0.5, "rgba(80,220,255,0.06)")
        jg.addColorStop(1, "rgba(0,240,255,0)")
        ctx.save()
        ctx.beginPath()
        ctx.ellipse(cx, cy, 14, 340, 0, 0, Math.PI * 2)
        ctx.fillStyle = jg
        ctx.fill()
        ctx.restore()
      }

      // event horizon (behind lensing)
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, EH_R, 0, Math.PI * 2)
      ctx.fillStyle = "#000"
      ctx.fill()
      ctx.restore()

      // lensing rings
      for (let ring = 3; ring >= 0; ring--) {
        const ra = (0.6 - ring * 0.12) * (0.85 + pulse * 0.15 + prox * 0.1)
        const rg = ctx.createRadialGradient(cx, cy, EH_R - 2, cx, cy, EH_R + 18 + ring * 8)
        rg.addColorStop(0, `rgba(255,240,140,${ra})`)
        rg.addColorStop(0.3, `rgba(212,175,55,${ra * 0.7})`)
        rg.addColorStop(0.7, `rgba(180,120,20,${ra * 0.3})`)
        rg.addColorStop(1, "rgba(0,0,0,0)")
        ctx.beginPath()
        ctx.arc(cx, cy, EH_R + 6 + ring * 5, 0, Math.PI * 2)
        ctx.strokeStyle = rg
        ctx.lineWidth = 4 - ring * 0.5
        ctx.stroke()
      }

      // photon ring
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, EH_R + 4, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255,245,160,${0.7 + pulse * 0.3})`
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.restore()

      // re-mask event horizon
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, EH_R - 1, 0, Math.PI * 2)
      ctx.fillStyle = "#000"
      ctx.fill()
      ctx.restore()

      // disk front half
      disk.forEach(p => {
        const x = cx + Math.cos(p.theta) * p.r
        const y = cy + Math.sin(p.theta) * p.r * 0.3
        if (Math.sin(p.theta) <= 0) return
        const depth = (1 - p.band) * 0.5 + 0.5
        const fade = Math.max(0, Math.abs(x - cx) / (p.r + 1))
        ctx.beginPath()
        ctx.arc(x, y, p.size * depth, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},${p.sat}%,${p.lit}%,${p.alpha * fade})`
        ctx.fill()
      })

      // disk glow band
      const dg = ctx.createRadialGradient(cx, cy, 60, cx, cy, 380)
      dg.addColorStop(0, `rgba(255,230,80,${0.04 + pulse * 0.03})`)
      dg.addColorStop(0.15, `rgba(212,175,55,${0.06 + pulse * 0.04})`)
      dg.addColorStop(0.5, "rgba(160,100,10,0.025)")
      dg.addColorStop(1, "rgba(0,0,0,0)")
      ctx.save()
      ctx.scale(1, 0.32)
      ctx.translate(0, (cy / 0.32) * (1 - 0.32))
      ctx.beginPath()
      ctx.arc(cx, cy, 380, 0, Math.PI * 2)
      ctx.fillStyle = dg
      ctx.fill()
      ctx.restore()

      // vignette
      const vig = ctx.createRadialGradient(cx, cy, H * 0.3, cx, cy, H * 0.9)
      vig.addColorStop(0, "rgba(0,0,0,0)")
      vig.addColorStop(1, "rgba(0,0,0,0.8)")
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      frameRef.current = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      cx = W / 2; cy = H / 2
    }
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      mouseRef.current.proximity = Math.max(0, 1 - dist / (Math.min(W, H) * 0.4))
    }

    frameRef.current = requestAnimationFrame(draw)
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const cleanup = init()
    return cleanup
  }, [init])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 h-full w-full ${className}`}
    />
  )
}
```

- [ ] **Verify** — import in a test page, confirm canvas renders without TS errors:
```bash
pnpm build 2>&1 | head -30
```

- [ ] **Commit**
```bash
git add components/blackhole-canvas.tsx
git commit -m "feat: add BlackholeCanvas component with parallax stars, disk, jets"
```

---

## Task 4: Utility Primitives

**Files:** Create `magnetic-card.tsx`, `odometer.tsx`, `border-trace.tsx`, `particle-burst.tsx`

- [ ] **Create magnetic-card.tsx**

```tsx
// components/magnetic-card.tsx
"use client"
import { useRef } from "react"

interface Props { children: React.ReactNode; className?: string; strength?: number }

export function MagneticCard({ children, className = "", strength = 0.12 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate(${x}px,${y}px)`
  }
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)"
  }
  return (
    <div ref={ref} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
      {children}
    </div>
  )
}
```

- [ ] **Create odometer.tsx**

```tsx
// components/odometer.tsx
"use client"
import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"

interface Props { target: number; duration?: number; suffix?: string; decimals?: number }

export function Odometer({ target, duration = 2000, suffix = "", decimals = 0 }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const startTime = Date.now()
    let frame: number
    const tick = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) { frame = requestAnimationFrame(tick) }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target, duration, decimals])

  return <span ref={ref}>{decimals > 0 ? value.toFixed(decimals) : Math.round(value)}{suffix}</span>
}
```

- [ ] **Create border-trace.tsx**

```tsx
// components/border-trace.tsx
"use client"
import { useRef } from "react"
import { useInView } from "framer-motion"

interface Props { children: React.ReactNode; className?: string; color?: string; duration?: number }

export function BorderTrace({ children, className = "", color = "#D4AF37", duration = 1.5 }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <rect x="0.5" y="0.5" width="99%" height="99%" fill="none"
          stroke={color} strokeOpacity="0.5" strokeWidth="1"
          strokeDasharray="2000" strokeDashoffset={isInView ? 0 : 2000}
          style={{ transition: `stroke-dashoffset ${duration}s cubic-bezier(0.22,1,0.36,1)` }}
        />
      </svg>
      {children}
    </div>
  )
}
```

- [ ] **Create particle-burst.tsx**

```tsx
// components/particle-burst.tsx
"use client"
import { useEffect, useRef } from "react"

interface Props { trigger: boolean; onComplete?: () => void }

export function ParticleBurst({ trigger, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!trigger) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    const cx = canvas.width / 2, cy = canvas.height / 2

    const particles = Array.from({ length: 60 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 4
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: 1, decay: 0.015 + Math.random() * 0.02,
        size: 2 + Math.random() * 3,
        color: Math.random() > 0.3 ? "#D4AF37" : "#00F0FF",
      }
    })

    let frame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      particles.forEach(p => {
        if (p.life <= 0) return
        alive = true
        p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.life -= p.decay
        ctx.globalAlpha = p.life
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })
      ctx.globalAlpha = 1
      if (alive) { frame = requestAnimationFrame(animate) } else { onComplete?.() }
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [trigger, onComplete])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
}
```

- [ ] **Type-check**
```bash
pnpm build 2>&1 | grep -E "error|Error" | head -20
```

- [ ] **Commit**
```bash
git add components/magnetic-card.tsx components/odometer.tsx components/border-trace.tsx components/particle-burst.tsx
git commit -m "feat: add MagneticCard, Odometer, BorderTrace, ParticleBurst primitives"
```

---

## Task 5: Custom Cursor + Star Field Parallax

**Files:** `components/cursor-glow.tsx`, `components/star-field.tsx`

- [ ] **Replace cursor-glow.tsx**

```tsx
// components/cursor-glow.tsx
"use client"
import { useEffect, useRef } from "react"

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const TRAIL = 10
    const trail = Array.from({ length: TRAIL }, (_, i) => {
      const el = document.createElement("div")
      el.style.cssText = `position:fixed;pointer-events:none;z-index:9998;
        width:${Math.max(1.5, 3.5 - i * 0.2)}px;height:${Math.max(1.5, 3.5 - i * 0.2)}px;
        border-radius:50%;background:#00F0FF;
        opacity:${((TRAIL - i) / TRAIL) * 0.5};
        transform:translate(-50%,-50%);`
      document.body.appendChild(el)
      return el
    })

    let positions = Array<{ x: number; y: number }>(TRAIL).fill({ x: 0, y: 0 })
    let frame: number

    const loop = () => {
      positions = [posRef.current, ...positions.slice(0, TRAIL - 1)]
      trail.forEach((el, i) => {
        const p = positions[i] ?? positions[0]
        el.style.left = p.x + "px"
        el.style.top = p.y + "px"
      })
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px"
        dotRef.current.style.top = e.clientY + "px"
      }
    }
    document.addEventListener("mousemove", onMove)
    return () => {
      document.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(frame)
      trail.forEach(el => el.remove())
    }
  }, [])

  return (
    <div ref={dotRef} className="pointer-events-none fixed z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
      style={{ boxShadow: "0 0 8px #D4AF37", left: 0, top: 0 }} />
  )
}
```

- [ ] **Replace star-field.tsx** — the BlackholeCanvas already renders stars with parallax, so StarField is now a lightweight fallback for non-hero sections (used as a subtle fixed background). Replace with a simpler version that doesn't duplicate canvas elements:

```tsx
// components/star-field.tsx
// Stars are handled inside BlackholeCanvas for the hero.
// This component is intentionally empty — kept for import compatibility.
export function StarField() { return null }
```

- [ ] **Verify cursor** — run `pnpm dev`, move mouse, gold dot and cyan trail should appear.

- [ ] **Commit**
```bash
git add components/cursor-glow.tsx components/star-field.tsx
git commit -m "feat: gold dot cursor with cyan trail, simplify StarField"
```

---

## Task 6: Navbar Rebrand

**Files:** `components/navbar.tsx`

- [ ] **Replace navbar.tsx**

```tsx
// components/navbar.tsx
"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "SIGNAL",     href: "#terminal" },
  { label: "PHILOSOPHY", href: "#philosophy" },
  { label: "SERVICES",   href: "#services" },
  { label: "STANDARD",   href: "#comparison" },
  { label: "VENTURES",   href: "#ventures" },
  { label: "MANIFESTO",  href: "#manifesto" },
  { label: "THE GATE",   href: "#contact" },
]

function YnLogo() {
  return (
    <a href="#hero" className="flex items-center gap-3 group">
      {/* Element box */}
      <div className="relative flex h-9 w-9 flex-col items-center justify-center border border-gold/50 bg-gold/5 pulse-glow transition-all duration-500 group-hover:border-gold group-hover:bg-gold/10">
        {/* Corner brackets */}
        <span className="pointer-events-none absolute -left-[2px] -top-[2px] h-2 w-2 border-l border-t border-gold" />
        <span className="pointer-events-none absolute -bottom-[2px] -right-[2px] h-2 w-2 border-b border-r border-gold" />
        <span className="font-display text-[7px] leading-none text-gold/50" style={{ letterSpacing: "0.05em", position: "absolute", top: 3, left: 4 }}>71</span>
        <span className="font-display text-base font-bold leading-none text-gold" style={{ letterSpacing: "0.05em" }}>Yn</span>
        <span className="font-display text-[5px] leading-none text-gold/60" style={{ letterSpacing: "0.15em" }}>288.07</span>
      </div>
      {/* Wordmark */}
      <span className="font-display text-xl tracking-[0.25em] text-silver transition-colors duration-300 group-hover:text-gold" style={{ letterSpacing: "0.25em" }}>
        YANIUM
      </span>
    </a>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3 border-b border-gold/10" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <YnLogo />
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(link => (
              <a key={link.label} href={link.href}
                className="group relative font-display text-[10px] tracking-[0.25em] text-silver/50 transition-colors duration-300 hover:text-gold"
                style={{ letterSpacing: "0.25em" }}>
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)}
            className="text-silver/60 transition-colors hover:text-gold md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            className="glass fixed inset-x-0 top-16 z-40 flex flex-col items-center gap-7 py-10 md:hidden">
            {navLinks.map((link, i) => (
              <motion.a key={link.label} href={link.href}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMobileOpen(false)}
                className="font-display text-sm tracking-[0.25em] text-silver/70 transition-colors hover:text-gold">
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Commit**
```bash
git add components/navbar.tsx
git commit -m "feat: rebrand navbar — Yn element box logo, Cinzel, gold hover"
```

---

## Task 7: Hero Section

**Files:** `components/hero-section.tsx`, `components/neural-loader.tsx`

- [ ] **Replace hero-section.tsx**

```tsx
// components/hero-section.tsx
"use client"
import { motion } from "framer-motion"
import { BlackholeCanvas } from "@/components/blackhole-canvas"

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <BlackholeCanvas className="z-0" />

      {/* Yn element box — floats above singularity */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="animate-float pointer-events-none absolute left-1/2 top-1/2 z-10"
        style={{ transform: "translate(-50%, calc(-50% - 220px))" }}
      >
        <div className="relative flex h-[72px] w-[72px] flex-col items-center justify-center border border-gold/55 bg-gold/3"
          style={{ boxShadow: "0 0 20px rgba(212,175,55,0.15), inset 0 0 20px rgba(212,175,55,0.03)" }}>
          <span className="pointer-events-none absolute -left-[2px] -top-[2px] h-[10px] w-[10px] border-l-[1.5px] border-t-[1.5px] border-gold" />
          <span className="pointer-events-none absolute -bottom-[2px] -right-[2px] h-[10px] w-[10px] border-b-[1.5px] border-r-[1.5px] border-gold" />
          <span className="font-display absolute left-[7px] top-[5px] text-[8px] leading-none text-gold/55" style={{ letterSpacing: "0.1em" }}>71</span>
          <span className="font-display text-[28px] font-bold leading-none text-gold" style={{ letterSpacing: "0.05em" }}>Yn</span>
          <span className="font-display text-[6px] leading-none text-gold/65" style={{ letterSpacing: "0.2em" }}>YANIUM</span>
          <span className="font-display absolute bottom-[5px] text-[6px] leading-none text-gold/45" style={{ letterSpacing: "0.1em" }}>288.07</span>
        </div>
      </motion.div>

      {/* Text overlay */}
      <div className="relative z-10 mt-60 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 font-display text-[10px] tracking-[0.5em] text-gold/50">
          // VELOCITY OF INTELLIGENCE
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl tracking-[0.15em] md:text-6xl lg:text-7xl" style={{ letterSpacing: "0.15em" }}>
          <span className="text-silver">WHERE INTELLIGENCE</span>
          <br />
          <span className="text-gold">COLLAPSES INTO POWER</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl font-serif text-base italic leading-relaxed text-silver/45 md:text-lg">
          Premium AI-native development. Built for those who refuse to wait.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10">
          <a href="#contact"
            className="pulse-glow inline-block border border-gold/50 bg-gold/6 px-10 py-4 font-display text-xs tracking-[0.35em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/14"
            style={{ letterSpacing: "0.35em" }}>
            INITIATE PROTOCOL
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-20 flex flex-col items-center gap-2">
          <span className="font-sans text-[9px] tracking-[0.35em] text-silver/25">SCROLL TO EXPLORE</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-px bg-gradient-to-b from-gold/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Update neural-loader.tsx** — swap cyan references to gold:
  - Find all `#00F0FF` / `cyan` color references in the file and replace with `#D4AF37` / `gold`
  - Find all `rgba(0,240,255` and replace with `rgba(212,175,55`

- [ ] **Delete neural-core.tsx**
```bash
rm "C:/projects/Yanium/components/neural-core.tsx"
```

- [ ] **Verify hero** — run `pnpm dev`, confirm black hole renders, Yn box floats, text fades in.

- [ ] **Commit**
```bash
git add components/hero-section.tsx components/neural-loader.tsx
git rm components/neural-core.tsx
git commit -m "feat: black hole hero with Yn element box, Cinzel headlines, gold CTA"
```

---

## Task 8: Terminal — Live Signal

**Files:** `components/terminal-section.tsx`

- [ ] **Replace terminal-section.tsx**

```tsx
// components/terminal-section.tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

type LineType = "simple" | "metric"

interface SimpleLine { type: "simple"; text: string; color?: "cyan" | "gold"; delay: number }
interface MetricLine {
  type: "metric"; prefix: string; filled: number; total: number
  value: number; unit: string; tag: string; tagColor: "gold" | "cyan"; delay: number
}
type TerminalLineData = SimpleLine | MetricLine

const LINES: TerminalLineData[] = [
  { type: "simple", text: "> INITIALIZING: Yanium_Intelligence_Engine", delay: 0 },
  { type: "simple", text: "> SYSTEM_MODE: Rapid_Architecting", delay: 1000 },
  { type: "simple", text: "> SCANNING: Client_Ecosystem...", delay: 2000 },
  { type: "metric", prefix: "> CLIENTS_SERVED:", filled: 8, total: 10, value: 24, unit: "", tag: "[VERIFIED]", tagColor: "gold", delay: 3200 },
  { type: "metric", prefix: "> AVG_DELIVERY_TIME:", filled: 4, total: 10, value: 12, unit: " days", tag: "[10x avg]", tagColor: "cyan", delay: 4600 },
  { type: "metric", prefix: "> PROJECTS_SHIPPED:", filled: 6, total: 10, value: 38, unit: "", tag: "[PRODUCTION]", tagColor: "gold", delay: 6000 },
  { type: "metric", prefix: "> UPTIME_GUARANTEE:", filled: 9, total: 10, value: 99.98, unit: "%", tag: "[SLA]", tagColor: "cyan", delay: 7400 },
  { type: "simple", text: "> STATUS: All_systems_operational", color: "gold", delay: 8800 },
  { type: "simple", text: "> VERDICT: Legacy firms take quarters. We take days.", delay: 10000 },
  { type: "simple", text: "> PROTOCOL: Outcome-based. No excuses. No hourly billing.", delay: 11400 },
]

function useTyping(text: string, startMs: number, isVisible: boolean, charDelay = 22) {
  const [shown, setShown] = useState("")
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!isVisible) return
    const t = setTimeout(() => {
      let i = 0
      const iv = setInterval(() => {
        i++
        setShown(text.slice(0, i))
        if (i >= text.length) { clearInterval(iv); setDone(true) }
      }, charDelay)
      return () => clearInterval(iv)
    }, startMs)
    return () => clearTimeout(t)
  }, [isVisible, text, startMs, charDelay])
  return { shown, done }
}

function SimpleTerminalLine({ line, isVisible }: { line: SimpleLine; isVisible: boolean }) {
  const { shown, done } = useTyping(line.text, line.delay, isVisible)
  if (!shown) return null
  return (
    <div className="flex items-center">
      <span className={`font-mono text-sm ${line.color === "gold" ? "text-gold" : "text-cyan/80"}`}>{shown}</span>
      {!done && <span className="terminal-cursor ml-0.5 inline-block h-4 w-2 bg-cyan/70" />}
    </div>
  )
}

function MetricTerminalLine({ line, isVisible }: { line: MetricLine; isVisible: boolean }) {
  const [phase, setPhase] = useState<"idle" | "prefix" | "bar" | "value" | "tag">("idle")
  const [prefix, setPrefix] = useState("")
  const [barFilled, setBarFilled] = useState(0)
  const [displayVal, setDisplayVal] = useState(0)
  const [showTag, setShowTag] = useState(false)

  useEffect(() => {
    if (!isVisible) return
    const t = setTimeout(() => {
      // Phase 1: type prefix
      setPhase("prefix")
      let pi = 0
      const piv = setInterval(() => {
        pi++
        setPrefix(line.prefix.slice(0, pi))
        if (pi >= line.prefix.length) {
          clearInterval(piv)
          // Phase 2: fill bar
          setPhase("bar")
          let bi = 0
          const biv = setInterval(() => {
            bi++
            setBarFilled(bi)
            if (bi >= line.filled) {
              clearInterval(biv)
              // Phase 3: count value
              setPhase("value")
              const start = Date.now()
              const dur = 800
              const riv = setInterval(() => {
                const p = Math.min((Date.now() - start) / dur, 1)
                const eased = 1 - Math.pow(1 - p, 3)
                setDisplayVal(parseFloat((eased * line.value).toFixed(line.value % 1 !== 0 ? 2 : 0)))
                if (p >= 1) {
                  clearInterval(riv)
                  setDisplayVal(line.value)
                  // Phase 4: tag
                  setTimeout(() => { setShowTag(true); setPhase("tag") }, 200)
                }
              }, 16)
            }
          }, 60)
        }
      }, 22)
    }, line.delay)
    return () => clearTimeout(t)
  }, [isVisible, line])

  if (!prefix && phase === "idle") return null

  const bar = "▓".repeat(barFilled) + "░".repeat(line.total - barFilled)

  return (
    <div className="flex flex-wrap items-center gap-x-2 font-mono text-sm">
      <span className="text-cyan/80">{prefix}</span>
      {phase !== "prefix" && <span className="text-gold/70">{bar}</span>}
      {phase === "value" || phase === "tag" ? (
        <span className="text-silver">{displayVal}{line.unit}</span>
      ) : null}
      {showTag && (
        <span className={`text-xs font-bold ${line.tagColor === "gold" ? "text-gold" : "text-cyan"}`}>
          {line.tag}
        </span>
      )}
    </div>
  )
}

export function TerminalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="terminal" className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center">
          <span className="mb-4 font-display text-[10px] tracking-[0.4em] text-gold/50">// PROOF OF EXECUTION</span>
          <h2 className="mb-12 text-center font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
            THE <span className="text-gold">SIGNAL</span>
          </h2>

          <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative w-full max-w-3xl overflow-hidden rounded-lg">

            {/* Scanline */}
            {isInView && <div className="scanline" />}

            {/* Terminal header */}
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-green-500/60" />
              <span className="ml-3 font-mono text-xs text-silver/25">yanium://vibe-engine v1.0</span>
            </div>

            {/* Terminal body */}
            <div className="flex min-h-[320px] flex-col gap-3 p-6">
              <div className="mb-2 font-mono text-xs text-silver/20">// YANIUM ENGINE v1.0 — LIVE</div>
              {LINES.map((line, i) =>
                line.type === "simple"
                  ? <SimpleTerminalLine key={i} line={line} isVisible={isInView} />
                  : <MetricTerminalLine key={i} line={line} isVisible={isInView} />
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Verify** — scroll to terminal section, confirm lines type in sequence with bar fills and counters.

- [ ] **Commit**
```bash
git add components/terminal-section.tsx
git commit -m "feat: terminal Live Signal — metric bars, odometer counters, gold tags"
```

---

## Task 9: Philosophy Section

**Files:** Create `components/philosophy-section.tsx`

- [ ] **Create philosophy-section.tsx**

```tsx
// components/philosophy-section.tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, Cpu, Workflow, Zap } from "lucide-react"
import { MagneticCard } from "@/components/magnetic-card"

const pillars = [
  { icon: Code2, label: "HUMAN INTENT",   desc: "We define the business logic, the strategy, and the architecture." },
  { icon: Cpu,   label: "AI EXECUTION",   desc: "Our AI engines handle infrastructure, boilerplate, and scaling." },
  { icon: Workflow, label: "HYBRID WORKFLOW", desc: "The fusion of human creativity and machine precision." },
  { icon: Zap,   label: "10x VELOCITY",   desc: "Ship production-grade systems in days, not quarters." },
]

const words1 = "CODE IS A COMMODITY.".split(" ")
const words2 = "LOGIC IS THE LEVERAGE.".split(" ")

export function PhilosophySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="philosophy" className="relative py-32 px-6">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-gold/[0.02] blur-[120px]" />
      <div className="mx-auto max-w-5xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.4em] text-gold/50">// THE YANIUM WAY</span>
          <h2 className="font-display text-3xl tracking-[0.08em] text-silver md:text-5xl lg:text-6xl">
            {words1.map((w, i) => (
              <motion.span key={i} className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}>{w}</motion.span>
            ))}
            <br />
            {words2.map((w, i) => (
              <motion.span key={i} className={`inline-block mr-[0.3em] ${w === "LEVERAGE." ? "text-gold" : ""}`}
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}>{w}</motion.span>
            ))}
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="glass mx-auto mb-20 max-w-3xl rounded-lg p-8 md:p-12">
          <p className="font-serif text-base italic leading-relaxed text-silver/70 md:text-lg md:leading-8">
            The old way of development is a bottleneck. We&apos;ve replaced manual labor with{" "}
            <span className="font-semibold not-italic text-gold">Vibe Coding</span> — a Human-AI hybrid workflow
            that allows us to focus on <span className="not-italic text-silver">your business logic</span> while our
            AI engines handle the infrastructure. We don&apos;t just write code; we{" "}
            <span className="not-italic text-silver">orchestrate intelligence</span>.
          </p>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
          <div className="mt-6 flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-code-green status-pulse" />
            <span className="font-sans text-xs tracking-[0.2em] text-silver/35">HUMAN-AI HYBRID DEVELOPMENT PROTOCOL</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {pillars.map((p, i) => (
            <MagneticCard key={p.label}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center border border-gold/20 bg-gold/5 transition-all duration-500 group-hover:border-gold/50 group-hover:bg-gold/10 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                  <p.icon className="h-6 w-6 text-gold" />
                </div>
                <h4 className="mb-2 font-display text-[10px] tracking-[0.3em] text-gold">{p.label}</h4>
                <p className="max-w-[200px] font-sans text-sm leading-relaxed text-silver/50">{p.desc}</p>
              </motion.div>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Commit**
```bash
git add components/philosophy-section.tsx
git commit -m "feat: Philosophy section — word reveal, magnetic pillar cards, gold accents"
```

---

## Task 10: Services Section

**Files:** Create `components/services-section.tsx`

- [ ] **Create services-section.tsx**

```tsx
// components/services-section.tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Globe, Brain, Zap, Layers, Palette } from "lucide-react"

const services = [
  {
    icon: Globe, title: "WEB & MOBILE ECOSYSTEMS",
    desc: "High-performance platforms engineered for scale. We architect full-stack products that think, adapt, and outperform.",
    tag: "ECOSYSTEMS", span: "md:col-span-2 md:row-span-2",
  },
  {
    icon: Brain, title: "AUTONOMOUS AI AGENTS",
    desc: "AI that thinks, learns, and executes. Self-evolving systems that turn data into decisions.",
    tag: "AI-NATIVE", span: "",
  },
  {
    icon: Zap, title: "RAPID PROTOTYPING",
    desc: "From concept to production in days, not sprints. Vibe coding at maximum velocity.",
    tag: "VELOCITY", span: "",
  },
  {
    icon: Layers, title: "UI/UX & DESIGN SYSTEMS",
    desc: "Interfaces that command attention. Design systems that scale without compromise.",
    tag: "DESIGN", span: "",
  },
  {
    icon: Palette, title: "GRAPHIC & BRAND DESIGN",
    desc: "Visual identities that own their space. Premium creative direction for premium companies.",
    tag: "BRAND", span: "",
  },
]

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`
  }
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)"
  }
  return (
    <div ref={ref} className={`tilt-card ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  )
}

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mb-16 text-center">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.4em] text-gold/50">// CORE SERVICES</span>
          <h2 className="font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
            WHAT WE <span className="text-gold">BUILD</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {services.map((s, i) => (
            <TiltCard key={s.title} className={s.span}>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group glass relative flex h-full flex-col justify-between overflow-hidden rounded-lg p-8">
                {/* Sweep border on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(212,175,55,0.12) 25%, transparent 50%)", animation: "none" }} />
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-gold/20 bg-gold/5 transition-all duration-300 group-hover:border-gold/50 group-hover:shadow-[0_0_12px_rgba(212,175,55,0.2)]">
                      <s.icon className="h-5 w-5 text-gold" />
                    </div>
                    <span className="font-sans text-[9px] tracking-[0.3em] text-gold/50">{s.tag}</span>
                  </div>
                  <h3 className="mb-3 font-display text-xl tracking-[0.08em] text-silver md:text-2xl">{s.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-silver/50">{s.desc}</p>
                </div>
                <div className="relative z-10 mt-6 h-px w-full bg-gradient-to-r from-gold/20 to-transparent" />
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Commit**
```bash
git add components/services-section.tsx
git commit -m "feat: Services section — 3D tilt cards, gold accents, bento grid"
```

---

## Task 11: Comparison Upgrade

**Files:** `components/comparison-section.tsx`

- [ ] **Replace comparison-section.tsx**

```tsx
// components/comparison-section.tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { X, Check } from "lucide-react"

const rows = [
  { cat: "DEVELOPMENT SPEED",  legacy: "Months per milestone",           yanium: "Days to production" },
  { cat: "PRICING MODEL",      legacy: "Hourly billing / time-based",    yanium: "Result-based / outcome-driven" },
  { cat: "WORKFLOW",           legacy: "Manual coding, slow iteration",   yanium: "AI-native, vibe coding hybrid" },
  { cat: "TEAM STRUCTURE",     legacy: "Large teams, slow coordination",  yanium: "Lean operators + AI engines" },
  { cat: "TECHNOLOGY",         legacy: "Outdated stacks, legacy debt",    yanium: "Cutting-edge, AI-augmented" },
  { cat: "SCALABILITY",        legacy: "Rebuild to scale",                yanium: "Architected for scale from day one" },
]

export function ComparisonSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="comparison" className="relative py-32 px-6">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-gold/[0.02] blur-[100px]" />
      <div className="mx-auto max-w-5xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mb-16 text-center">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.4em] text-gold/50">// THE STANDARD</span>
          <h2 className="font-display text-4xl tracking-[0.1em] md:text-5xl lg:text-6xl">
            <span className="text-silver/40">LEGACY</span> <span className="text-silver">VS.</span>{" "}
            <span className="text-gold">YANIUM</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="glass overflow-hidden rounded-lg">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-white/5 px-6 py-4">
            <span className="font-sans text-[9px] tracking-[0.3em] text-silver/25">METRIC</span>
            <div className="flex items-center gap-2 px-4">
              <div className="h-2 w-2 rounded-full bg-red-400/40" />
              <span className="font-sans text-[9px] tracking-[0.25em] text-silver/35">LEGACY FIRMS</span>
            </div>
            <div className="flex items-center gap-2 px-4">
              <div className="h-2 w-2 rounded-full bg-gold status-pulse" />
              <span className="font-sans text-[9px] tracking-[0.25em] text-gold">YANIUM</span>
            </div>
          </div>

          <div className="px-6">
            {rows.map((row, i) => (
              <motion.div key={row.cat}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-3 items-center border-b border-white/5 py-5 transition-colors duration-300 hover:bg-gold/[0.04]">
                <span className="font-sans text-[10px] tracking-[0.15em] text-silver/55">{row.cat}</span>
                <div className="flex items-center gap-2 px-4">
                  <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.09, type: "spring", stiffness: 300 }}>
                    <X className="hidden h-3.5 w-3.5 shrink-0 text-red-400/60 md:block" />
                  </motion.div>
                  <span className="font-sans text-xs leading-relaxed text-silver/40">{row.legacy}</span>
                </div>
                <div className="flex items-center gap-2 border-l border-gold/10 px-4">
                  <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.09, type: "spring", stiffness: 300 }}>
                    <Check className="hidden h-3.5 w-3.5 shrink-0 text-gold md:block" />
                  </motion.div>
                  <span className="font-sans text-xs leading-relaxed text-gold/80">{row.yanium}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 text-center font-sans text-[10px] tracking-[0.25em] text-silver/25">
          THE OLD GUARD IS OBSOLETE. THE FRONTIER IS HERE.
        </motion.p>
      </div>
    </section>
  )
}
```

- [ ] **Commit**
```bash
git add components/comparison-section.tsx
git commit -m "feat: Comparison — alternating row anims, YANIUM gold column, bounce icons"
```

---

## Task 12: Ventures Section

**Files:** Create `components/ventures-section.tsx`

- [ ] **Create ventures-section.tsx**

```tsx
// components/ventures-section.tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, TrendingUp, Activity } from "lucide-react"

const ventures = [
  {
    icon: Shield, code: "SKILL_INJECTED", title: "SkillInjected",
    desc: "Global esports player profile & tournament platform. Targeting the competitive gaming ecosystem.",
    status: "ACTIVE", statusColor: "code-green", metricLabel: "Discord communities reached", metricPct: 72,
    bgPattern: "radial-gradient(circle at 20% 80%, rgba(15,240,67,0.04) 0%, transparent 50%)",
  },
  {
    icon: TrendingUp, code: "ROI_SENTINEL", title: "ROI Sentinel",
    desc: "Predictive real-estate intelligence for the Armenian market. 3.2M data points analyzed.",
    status: "BETA", statusColor: "cyan", metricLabel: "Data points indexed", metricPct: 58,
    bgPattern: "radial-gradient(circle at 80% 20%, rgba(0,240,255,0.04) 0%, transparent 50%)",
  },
  {
    icon: Activity, code: "MYZRA", title: "Myzra",
    desc: "Champion-logic health & performance protocol. Sports/gym ecosystem with neural mapping.",
    status: "R&D", statusColor: "silver", metricLabel: "Protocol modules complete", metricPct: 35,
    bgPattern: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 50%)",
  },
]

export function VenturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="ventures" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mb-16 text-center">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.4em] text-gold/50">// INTERNAL PORTFOLIO</span>
          <h2 className="mb-4 font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
            THE <span className="text-gold">VENTURES</span>
          </h2>
          <p className="mx-auto max-w-xl font-serif text-base italic leading-relaxed text-silver/40">
            We don&apos;t just build for others. We build the future of our own portfolio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ventures.map((v, i) => (
            <motion.div key={v.code} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group glass relative overflow-hidden rounded-lg p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30">
              {/* Unique bg pattern */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: v.bgPattern }} />

              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center border border-gold/20 bg-gold/5">
                    <v.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full bg-${v.statusColor} status-pulse`} />
                    <span className={`font-sans text-[9px] tracking-[0.2em] text-${v.statusColor}`}>{v.status}</span>
                  </div>
                </div>

                <div className="mb-2 font-sans text-[9px] tracking-[0.2em] text-gold/50">{v.code}</div>
                <h3 className="mb-2 font-display text-2xl tracking-[0.08em] text-silver">{v.title}</h3>
                <p className="mb-5 font-sans text-sm leading-relaxed text-silver/45">{v.desc}</p>

                {/* Metric bar */}
                <div className="border-t border-white/5 pt-4">
                  <div className="mb-2 flex justify-between">
                    <span className="font-sans text-[9px] tracking-[0.1em] text-silver/30">{v.metricLabel}</span>
                    <span className="font-sans text-[9px] text-gold/60">{v.metricPct}%</span>
                  </div>
                  <div className="h-[2px] w-full rounded-full bg-white/5">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold"
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: `${v.metricPct}%` } : { width: "0%" }}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.2, ease: [0.22, 1, 0.36, 1] }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Commit**
```bash
git add components/ventures-section.tsx
git commit -m "feat: Ventures section — pulse dots, metric bars, hover bg patterns"
```

---

## Task 13: Manifesto Upgrade

**Files:** `components/manifesto-section.tsx`

- [ ] **Replace manifesto-section.tsx**

```tsx
// components/manifesto-section.tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Crosshair, Cpu, ShieldCheck } from "lucide-react"
import { BorderTrace } from "@/components/border-trace"

const pillars = [
  { icon: Crosshair, number: "01", title: "SPEED AS A WEAPON", desc: "If you aren't first, you're last. We compress timelines until the competition is irrelevant." },
  { icon: Cpu,       number: "02", title: "AI-NATIVE DEVELOPMENT", desc: "We speak the language of the machine. Every line of code is augmented by autonomous intelligence." },
  { icon: ShieldCheck, number: "03", title: "UNCOMPROMISING LOGIC", desc: "Code is a commodity; intelligence is the edge. We engineer systems that think beyond their instructions." },
]

function TypewriterWord({ text, isInView, delay = 0, className = "" }: { text: string; isInView: boolean; delay?: number; className?: string }) {
  const [shown, setShown] = useState("")
  useEffect(() => {
    if (!isInView) return
    const t = setTimeout(() => {
      let i = 0
      const iv = setInterval(() => {
        i++; setShown(text.slice(0, i))
        if (i >= text.length) clearInterval(iv)
      }, 60)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(t)
  }, [isInView, text, delay])
  return <span className={className}>{shown}</span>
}

export function ManifestoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="manifesto" className="relative py-32 px-6">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.02] blur-[150px]" />
      <div className="mx-auto max-w-6xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mb-20 text-center">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.4em] text-gold/50">// THE MANIFESTO</span>
          <h2 className="font-display text-3xl tracking-[0.08em] text-silver md:text-5xl lg:text-6xl">
            <span className="block">WE DO NOT BILL HOURS.</span>
            <span className="block">
              WE DELIVER{" "}
              <TypewriterWord text="OUTCOMES." isInView={isInView} delay={800} className="text-gold" />
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
          {pillars.map((p, i) => (
            <motion.div key={p.number} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }} className="group flex flex-col items-center text-center">
              <span className="mb-6 font-display text-6xl font-bold text-gold/10 md:text-8xl">
                <TypewriterWord text={p.number} isInView={isInView} delay={400 + i * 200} />
              </span>
              <BorderTrace className="mb-6 flex h-14 w-14 items-center justify-center bg-gold/5 transition-all duration-500 group-hover:bg-gold/10 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                <p.icon className="h-6 w-6 text-gold" />
              </BorderTrace>
              <h3 className="mb-4 font-display text-xl tracking-[0.1em] text-silver">{p.title}</h3>
              <p className="max-w-xs font-sans text-sm leading-relaxed text-silver/50">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Commit**
```bash
git add components/manifesto-section.tsx
git commit -m "feat: Manifesto — typewriter OUTCOMES, BorderTrace icons, staggered reveal"
```

---

## Task 14: Gate / Footer Upgrade

**Files:** `components/footer-section.tsx`

- [ ] **Replace footer-section.tsx**

```tsx
// components/footer-section.tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { ParticleBurst } from "@/components/particle-burst"

interface FloatFieldProps {
  id: string; label: string; type?: string; rows?: number; required?: boolean
  value: string; onChange: (v: string) => void; delay?: number; isInView: boolean
}

function FloatField({ id, label, type = "text", rows, required, value, onChange, delay = 0, isInView }: FloatFieldProps) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0
  const Tag = rows ? "textarea" : "input"

  return (
    <motion.div className="relative" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}>
      <label htmlFor={id}
        className={`pointer-events-none absolute left-4 font-sans text-xs tracking-[0.15em] text-silver/40 transition-all duration-300 ${
          lifted ? "-top-2.5 text-[9px] text-gold/70" : "top-3.5"
        }`}>
        {label}
      </label>
      <Tag id={id} type={type} required={required} value={value} rows={rows}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className={`w-full rounded-sm border bg-white/5 px-4 pt-5 pb-2 font-sans text-sm text-silver outline-none transition-all duration-300 ${
          rows ? "resize-none" : ""
        } ${focused ? "border-gold/50 shadow-[0_0_12px_rgba(212,175,55,0.12)]" : "border-white/8"}`}
      />
    </motion.div>
  )
}

export function FooterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [form, setForm] = useState({ name: "", email: "", ambition: "" })
  const [submitting, setSubmitting] = useState(false)
  const [burst, setBurst] = useState(false)
  const [done, setDone] = useState(false)
  const [typewritten, setTypewritten] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setBurst(true) }, 1200)
  }

  const handleBurstComplete = useCallback(() => {
    setDone(true)
    let i = 0
    const text = "PROTOCOL INITIATED"
    const iv = setInterval(() => {
      i++; setTypewritten(text.slice(0, i))
      if (i >= text.length) clearInterval(iv)
    }, 60)
  }, [])

  return (
    <footer id="contact" className="relative py-32 px-6">
      <div className="mx-auto mb-20 h-px max-w-4xl bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="mx-auto max-w-4xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center">
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.4em] text-gold/50">// INQUIRY GATE</span>
          <h2 className="mb-4 font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
            BY <span className="text-gold">INVITATION</span> ONLY
          </h2>
          <p className="mx-auto mb-16 max-w-lg font-serif text-base italic leading-relaxed text-silver/45">
            We accept a limited number of high-stakes projects. Make your case.
          </p>
        </motion.div>

        {!done ? (
          <motion.form initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }} onSubmit={handleSubmit}
            className="glass relative mx-auto max-w-xl overflow-hidden rounded-lg p-8">
            {burst && <ParticleBurst trigger={burst} onComplete={handleBurstComplete} />}
            <div className="flex flex-col gap-6">
              <FloatField id="name" label="NAME" required value={form.name}
                onChange={v => setForm(p => ({ ...p, name: v }))} delay={0.3} isInView={isInView} />
              <FloatField id="email" label="EMAIL" type="email" required value={form.email}
                onChange={v => setForm(p => ({ ...p, email: v }))} delay={0.4} isInView={isInView} />
              <FloatField id="ambition" label="YOUR AMBITION / TARGET ROI" rows={4} required value={form.ambition}
                onChange={v => setForm(p => ({ ...p, ambition: v }))} delay={0.5} isInView={isInView} />
              <motion.button type="submit" disabled={submitting}
                initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="pulse-glow group mt-2 flex items-center justify-center gap-3 border border-gold/50 bg-gold/8 px-8 py-4 font-sans text-xs tracking-[0.3em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/16 disabled:opacity-50">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <>SUBMIT INQUIRY <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass mx-auto max-w-xl rounded-lg p-12 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border border-gold/30 bg-gold/10">
              <div className="h-3 w-3 rounded-full bg-gold" />
            </div>
            <h3 className="mb-2 font-display text-2xl tracking-[0.1em] text-gold">{typewritten}</h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="font-sans text-sm text-silver/45">
              Protocol initiated. We will review and respond within 48 hours.
            </motion.p>
          </motion.div>
        )}

        {/* Footer bottom */}
        <div className="mt-20 flex flex-col items-center gap-6 border-t border-white/5 pt-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-6 w-6 flex-col items-center justify-center border border-gold/40 bg-gold/5">
              <span className="pointer-events-none absolute -left-[1.5px] -top-[1.5px] h-[6px] w-[6px] border-l border-t border-gold/60" />
              <span className="pointer-events-none absolute -bottom-[1.5px] -right-[1.5px] h-[6px] w-[6px] border-b border-r border-gold/60" />
              <span className="font-display text-xs font-bold leading-none text-gold" style={{ letterSpacing: "0.05em" }}>Yn</span>
            </div>
            <span className="font-display text-sm tracking-[0.25em] text-silver/35">YANIUM</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-sans text-[9px] tracking-[0.2em] text-silver/20">VELOCITY OF INTELLIGENCE</span>
            <span className="text-silver/10">|</span>
            <span className="font-sans text-[9px] tracking-[0.2em] text-silver/20">{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Commit**
```bash
git add components/footer-section.tsx
git commit -m "feat: Gate — floating labels, particle burst submit, Yanium footer brand"
```

---

## Task 15: Neural Loader Gold Update

**Files:** `components/neural-loader.tsx`

- [ ] **Read the file, then replace all cyan color references with gold:**
  - `#00F0FF` → `#D4AF37`
  - `rgba(0,240,255` → `rgba(212,175,55`
  - `cyan` (Tailwind classes) → `gold`

- [ ] **Verify** — reload page, loader should pulse gold before revealing hero.

- [ ] **Commit**
```bash
git add components/neural-loader.tsx
git commit -m "feat: neural loader — gold color palette"
```

---

## Task 16: Page Assembly + Cleanup

**Files:** `app/page.tsx`

- [ ] **Replace page.tsx**

```tsx
// app/page.tsx
"use client"
import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TerminalSection } from "@/components/terminal-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { ServicesSection } from "@/components/services-section"
import { ComparisonSection } from "@/components/comparison-section"
import { VenturesSection } from "@/components/ventures-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { FooterSection } from "@/components/footer-section"
import { CursorGlow } from "@/components/cursor-glow"
import { StarField } from "@/components/star-field"
import { NeuralLoader } from "@/components/neural-loader"
import { SectionDivider } from "@/components/section-divider"

export default function Page() {
  const [loaded, setLoaded] = useState(false)
  const handleLoadComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <NeuralLoader onComplete={handleLoadComplete} />}
      <main className="relative min-h-screen overflow-x-hidden bg-obsidian"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <StarField />
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
          <ComparisonSection />
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

- [ ] **Delete old section files**
```bash
rm "C:/projects/Yanium/components/vibe-story-section.tsx"
rm "C:/projects/Yanium/components/capabilities-section.tsx"
rm "C:/projects/Yanium/components/labs-section.tsx"
```

- [ ] **Full build check**
```bash
pnpm build 2>&1 | tail -20
```
Expected: no TypeScript errors, build succeeds.

- [ ] **Final visual check** — run `pnpm dev`, scroll through every section:
  1. Gold cursor + cyan trail visible
  2. Hero black hole animates at 60fps
  3. Yn element box floats above singularity
  4. Navbar shows YANIUM in Cinzel + Yn logo
  5. Terminal types metrics with bar fills
  6. Philosophy magnetic cards follow cursor
  7. Services 3D tilt on hover
  8. Comparison alternating row reveals, gold YANIUM column
  9. Ventures pulse dots + metric bars animate
  10. Manifesto typewriter OUTCOMES, border-trace icons
  11. Gate floating labels + gold focus glow
  12. Submit triggers particle burst, then PROTOCOL INITIATED typewriter
  13. No "EXONIC AI" visible anywhere

- [ ] **Commit**
```bash
git add app/page.tsx
git rm components/vibe-story-section.tsx components/capabilities-section.tsx components/labs-section.tsx
git commit -m "feat: assemble full Yanium site — all sections wired, old files removed"
```

---

## Self-Review

**Spec coverage:**
- ✅ Full rebrand EXONIC AI → YANIUM
- ✅ Cinzel/Cormorant Garamond/Tenor Sans fonts
- ✅ Gold primary, cyan secondary
- ✅ Black hole hero with parallax stars, disk, jets, Yn box
- ✅ Terminal Live Signal with metric bars and odometer
- ✅ Philosophy: word reveal, magnetic cards
- ✅ Services: 3D tilt, bento grid
- ✅ Comparison: alternating anims, gold column, bounce icons
- ✅ Ventures: pulse dots, metric bars, unique hover patterns
- ✅ Manifesto: typewriter OUTCOMES, BorderTrace, pillar number reveals
- ✅ Gate: floating labels, gold focus glow, particle burst, typewriter success
- ✅ Custom gold cursor + cyan trail
- ✅ Gold scrollbar, gold selection highlight
- ✅ Scanline effect in terminal

**Placeholder scan:** No TBDs or vague steps. Every step has exact commands or complete code.

**Type consistency:**
- `BlackholeCanvas` used consistently in `hero-section.tsx`
- `MagneticCard` wraps pillar items in `philosophy-section.tsx`
- `BorderTrace` wraps icons in `manifesto-section.tsx`
- `ParticleBurst` used in `footer-section.tsx` with `trigger` + `onComplete` props matching the definition
- `Odometer` not directly used (odometer logic inlined in terminal for tighter coupling) — consistent
