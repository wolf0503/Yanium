# Yanium Website Redesign — Design Spec
**Date:** 2026-04-08
**Status:** Approved by founder
**Project:** `C:\projects\Yanium` (Next.js 14, Tailwind, Framer Motion, Three.js)

---

## 1. Brief

Full rebrand and redesign of the Yanium website — currently branded "EXONIC AI". The goal is a premium, animated, interactive landing page that closes enterprise and startup clients in Europe/USA on first impression.

**Positioning:** "Rolls Royce meets AI" — dark luxury + cosmic/infinite feel.
**Audience:** Enterprise clients and startups, first impression must be world-class.

---

## 2. Brand System

### Name & Identity
- **Company:** Yanium (parent/holding)
- **Logo:** Chemical element box — symbol `Yn`, number `71`, mass `288.07`
- **Corner brackets** (not rounded), inner radial glow, subtle pulse animation
- **Logo variants:** Standard (box + wordmark), Icon (box only), Inverted (gold-filled)

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `gold` | `#D4AF37` | Brand, logo, headings, borders, CTAs |
| `gold-light` | `#F5E06E` | Hover states, highlights |
| `cyan` | `#00F0FF` | AI/tech elements, metrics, terminal text, jets |
| `obsidian` | `#050505` | Background |
| `silver` | `#E0E0E0` | Body text |
| `silver-dim` | `rgba(224,224,224,0.5)` | Secondary text |

### Typography
| Role | Font | Style |
|---|---|---|
| Display / headings / logo | **Cinzel** | Regular 400, weight 700 for emphasis |
| Subheadings / taglines | **Cormorant Garamond** | Italic |
| Body / UI / labels | **Tenor Sans** | Regular |
| Terminal / code | **JetBrains Mono** | Keep for terminal section only |

**Letter-spacing:** logos 8–10px · labels 5–7px · body 0.5–1px
**NEVER USE:** Inter, Roboto, Arial, Space Grotesk, Bebas Neue

### Global Effects
- Noise texture overlay (keep existing, opacity 0.03)
- Custom cursor: small gold `#D4AF37` dot, leaves short cyan `#00F0FF` trail
- Smooth scroll (lerp-based, not snap)
- Scrollbar: gold `#D4AF37` thumb on obsidian track
- Text selection: gold/30% background
- Page load: existing neural loader → hero fade-in (keep)

---

## 3. Site Architecture

### Section Order
1. **Hero** — Black Hole Singularity
2. **Terminal** — Live Signal (CMD upgraded with metrics)
3. **Philosophy** — The Yanium Way (rename of Vibe Story)
4. **Services** — What We Build (rename of Capabilities)
5. **The Standard** — Legacy vs Yanium (Comparison upgrade)
6. **Ventures** — The Portfolio (rename of Labs)
7. **Manifesto** — We Deliver Outcomes
8. **The Gate** — By Invitation Only (Contact)

---

## 4. Section Specs

### 4.1 Navbar
- **Logo:** Yn element box (icon variant) + "YANIUM" wordmark in Cinzel
- **Logo animation:** Subtle border pulse glow on idle
- **Nav links:** Cinzel, tracking-widest, gold on hover with underline that draws in from left
- **Scrolled state:** Glass blur + gold bottom border (1px gradient)
- **Mobile:** Hamburger → full-screen overlay with staggered link entrance

### 4.2 Hero — Black Hole Singularity
**Visual:** Full-viewport animated black hole (canvas-based, Three.js or Canvas 2D)

**Canvas elements:**
- 320 twinkling stars (parallax with mouse — stars shift opposite to cursor, depth layers)
- 1,800 gold/amber disk particles orbiting with elliptical perspective (front/back halves)
- Photon ring: crisp `rgba(255,245,160,0.9)` line around event horizon (r=74px)
- 4 gravitational lensing rings, fading outward
- Cyan polar jets: particle columns + glow gradient beams
- Infalling matter: 120 gold particle streams spiraling inward
- Event horizon: pure `#000` circle, r=74px
- Pulse glow: entire disk breathes (sin wave, 3s period)

**Mouse interactions:**
- Cursor proximity to center → accretion disk spins faster, particles brighten
- Mouse move → star field parallax (3 depth layers at different speeds)
- Hover over canvas → pulse strength increases

**Yn Element Box:**
- Positioned above the singularity (translateY -220px from center)
- Corner bracket accents, gold border, inner `71 / Yn / YANIUM / 288.07`
- Subtle float animation (translateY 0→-8px, 4s ease-in-out loop)
- Fades in at 2s after load

**Headline (Cinzel):**
- Line 1: `WHERE INTELLIGENCE` (silver)
- Line 2: `COLLAPSES INTO POWER` (gold `#D4AF37`)
- Tagline below (Cormorant Garamond italic): "Premium AI-native development. Built for those who refuse to wait."
- Staggered fade-up entrance (0.5s, 0.8s, 1.1s delays)

**CTA:** `INITIATE PROTOCOL` — gold border, gold text, hover fills with gold/14%

**Scroll indicator:** "SCROLL TO EXPLORE" + animated gold line descending

### 4.3 Terminal — Live Signal
**Concept:** Full CMD terminal window with both dramatic narrative lines AND live metrics delivered as terminal output.

**Terminal header:**
- macOS-style dots (red/yellow/green)
- Path: `yanium://vibe-engine v1.0`

**Terminal lines (type in sequence, JetBrains Mono, cyan text):**
```
> INITIALIZING: Yanium_Intelligence_Engine
> SYSTEM_MODE: Rapid_Architecting
> SCANNING: Client_Ecosystem...
> CLIENTS_SERVED: ▓▓▓▓▓▓▓▓░░  24 [VERIFIED]
> AVG_DELIVERY_TIME: ▓▓▓▓░░░░░░  12 days  [10x industry avg]
> PROJECTS_SHIPPED: ▓▓▓▓▓▓░░░░  38 [PRODUCTION]
> UPTIME_GUARANTEE: ▓▓▓▓▓▓▓▓▓░  99.98%
> STATUS: All_systems_operational
> VERDICT: Legacy firms take quarters. We take days.
> PROTOCOL: Outcome-based. No excuses. No hourly billing.
```

**Animations:**
- Lines type one by one (25ms per character)
- Progress bars (`▓▓▓▓░░`) fill left to right before the number appears
- Metric numbers count up (odometer) as the bar fills
- `[VERIFIED]`, `[PRODUCTION]` tags flash gold on appear
- After all lines done: cursor blinks, then a subtle scanline sweeps the terminal

**Section label (Cinzel):** `// PROOF OF EXECUTION` above, `THE SIGNAL` as heading

### 4.4 Philosophy — The Yanium Way
**Heading (Cinzel):** `CODE IS A COMMODITY.` / `LOGIC IS THE LEVERAGE.` (gold)
**Subheading tag:** `// THE YANIUM WAY`

**Quote block (glass card):**
- Cormorant Garamond italic body text
- Gold accent line at bottom
- Green live dot + "HUMAN-AI HYBRID DEVELOPMENT PROTOCOL"

**Four pillars (grid):**
- Icons in gold-bordered square (not rounded)
- Labels in Cinzel, descriptions in Tenor Sans
- **Magnetic hover:** pillar cards follow cursor by 4–6px (CSS transform)
- **Icon border glow** on hover: gold box-shadow pulses in

**Scroll animations:**
- Quote block slides up + fades in
- Pillar items stagger in (0.12s between each)
- Heading: word-by-word reveal

### 4.5 Services — What We Build
**Heading (Cinzel):** `WHAT WE BUILD`
**Subheading tag:** `// CORE SERVICES`

**Bento grid (3-col, 2-row):**

| Card | Title | Mini Animation |
|---|---|---|
| Large (2×2) | Web & Mobile Ecosystems | Animated network graph nodes connecting |
| Small | Autonomous AI Agents | Pulsing neural node cluster |
| Small | UI/UX & Design Systems | Rotating grid of colored squares |
| Small | Rapid Prototyping | Progress bar filling, resetting |
| Small | Graphic & Brand Design | Color palette swatches cycling |

**Card interactions:**
- 3D tilt on hover: `perspective(800px) rotateX/Y` up to 8deg, following cursor
- Gradient border sweeps around card clockwise on hover (CSS conic-gradient animation)
- Hover: mini animation activates (idle when not hovered)
- Gold tag label top-right

### 4.6 The Standard — Legacy vs Yanium
**Heading (Cinzel):** `LEGACY` (silver/40%) `VS.` `YANIUM` (gold)
**Subheading tag:** `// THE STANDARD`

**Table upgrades:**
- Yanium column header: gold dot + gold text + permanent left gold border on cells
- LEGACY column: red/40% dot
- Rows animate in alternating from left/right on scroll (not all from same direction)
- Row hover: full row gets `rgba(212,175,55,0.04)` wash + gold left border flash
- Check/X icons: animate in with a scale bounce on row reveal

**Bottom tagline:** "THE OLD GUARD IS OBSOLETE. THE FRONTIER IS HERE." — Tenor Sans, silver/30%

### 4.7 Ventures — The Portfolio
**Heading (Cinzel):** `THE VENTURES`
**Subheading tag:** `// INTERNAL PORTFOLIO`
**Subtitle:** "We don't just build for others. We build the future of our own portfolio."

**Cards (3 col):**
- SkillInjected (ACTIVE — green pulse dot)
- ROI Sentinel (BETA — cyan pulse dot)
- Myzra (R&D — dim dot)

**Upgrades per card:**
- Status dot: CSS keyframe pulse animation (scale 1→1.4→1, opacity 1→0.5→1)
- Metric bar: horizontal bar that animates width on scroll enter
- Unique subtle background pattern per card on hover (dots / lines / hexagons)
- Hover: card lifts `translateY(-4px)` + gold border

### 4.8 Manifesto — We Deliver Outcomes
**Heading (Cinzel):** `WE DO NOT BILL HOURS.` / `WE DELIVER` `OUTCOMES.` (gold)

**Cinematic treatment:**
- Heading enters word by word with stagger
- `OUTCOMES` types itself character by character in gold after rest of heading is visible
- Pillar number (01, 02, 03) counts from `00` upward on scroll enter
- Pillar card border: SVG stroke-dashoffset animation traces the border on reveal
- Icon box glows gold on hover

### 4.9 The Gate — By Invitation Only
**Heading (Cinzel):** `BY` `INVITATION` (gold) `ONLY`
**Subtitle (Cormorant Garamond italic):** "We accept a limited number of high-stakes projects. Make your case."

**Form upgrades:**
- Fields slide in sequentially (0, 0.1s, 0.2s stagger) as section enters viewport
- Input focus: gold border glow animates in (box-shadow expand)
- Label: lifts and shrinks to top of field on focus (floating label)
- Submit button: same pulse-glow as hero CTA

**Submit success:**
- Replace form with animated reveal
- Gold particle burst (canvas mini-animation, 60 particles explode outward)
- "PROTOCOL INITIATED" types in Cinzel
- "We will review and respond within 48 hours." fades in below

### 4.10 Footer
- Yn icon box (small) + "YANIUM" wordmark
- Tagline: "VELOCITY OF INTELLIGENCE" · Year
- Gold/cyan gradient line at top of footer
- Social links (if any) with hover gold glow

---

## 5. Technical Implementation

### Font Setup (layout.tsx)
Replace `Inter` + `Bebas Neue` with:
- `Cinzel` (400, 700) — Google Fonts
- `Cormorant_Garamond` (400 italic, 600 italic) — Google Fonts
- `Tenor_Sans` (400) — Google Fonts
- Keep `JetBrains_Mono` for terminal section

### Tailwind Token Updates (tailwind.config.ts)
```ts
colors: {
  gold:     '#D4AF37',
  'gold-light': '#F5E06E',
  cyan:     '#00F0FF',
  silver:   '#E0E0E0',
  obsidian: '#050505',
  'code-green': '#0FF043',
}
fontFamily: {
  display: ['var(--font-cinzel)'],
  serif:   ['var(--font-cormorant)'],
  sans:    ['var(--font-tenor)'],
  mono:    ['var(--font-jetbrains)'],
}
```

### CSS Updates (globals.css)
- Replace all cyan pulse-glow animations with gold equivalents
- Add `pulse-glow-gold` keyframe
- Add magnetic-card utility classes
- Add custom cursor styles
- Update scrollbar to gold
- Add `border-trace` animation (SVG stroke-dashoffset)
- Update `::selection` to gold

### Component Changes
| Component | Change |
|---|---|
| `navbar.tsx` | Logo: Yn box + YANIUM, fonts, gold hover states |
| `hero-section.tsx` | Remove old NeuralCore, add black hole canvas component |
| `neural-core.tsx` | Delete — replaced by blackhole canvas |
| `neural-loader.tsx` | Update colors to gold |
| `terminal-section.tsx` | Add metric lines with progress bars + odometer |
| `vibe-story-section.tsx` | Rename → `philosophy-section.tsx`, magnetic cards, word reveal |
| `capabilities-section.tsx` | Rename → `services-section.tsx`, 3D tilt, mini animations, border trace |
| `comparison-section.tsx` | Alternating row animation, gold column, bounce check/X |
| `labs-section.tsx` | Rename → `ventures-section.tsx`, pulse dots, metric bars |
| `manifesto-section.tsx` | Typewriter OUTCOMES, border-trace reveal, number counter |
| `footer-section.tsx` | Particle burst submit, floating labels, updated branding |
| `cursor-glow.tsx` | Replace with gold dot + cyan trail cursor |
| `star-field.tsx` | Keep but make parallax-aware (mouse position) |

### New Components
- `blackhole-canvas.tsx` — Canvas 2D black hole with all particle systems
- `magnetic-card.tsx` — Reusable wrapper for magnetic hover effect
- `odometer.tsx` — Animated number counter (0 → target on scroll enter)
- `border-trace.tsx` — SVG animated border reveal wrapper
- `particle-burst.tsx` — Canvas mini-animation for form submit

### Dependencies
All already installed: `framer-motion`, `three`, `@react-three/fiber` — no new packages needed.
Black hole uses Canvas 2D (not Three.js) for performance.

---

## 6. Scope Boundaries

**In scope:**
- Full rebrand (EXONIC AI → YANIUM everywhere)
- All font replacements
- All color replacements (cyan → gold primary)
- All section renames and copy updates
- All animations and interactions listed above
- New black hole hero component

**Out of scope:**
- Backend / form submission (keep simulated)
- Multi-page routing (single page)
- CMS integration
- Mobile-specific animations (mobile gets simplified versions via `useReducedMotion`)

---

## 7. Success Criteria

1. No reference to "EXONIC AI" remains anywhere
2. Cinzel/Cormorant Garamond/Tenor Sans load and render correctly
3. Black hole animates at 60fps on desktop
4. All scroll-triggered animations fire exactly once on enter
5. Terminal metrics type in sequence with progress bars
6. Form submit shows particle burst + success state
7. Custom gold cursor visible and smooth
8. Site passes visual review: feels premium, space-themed, "Rolls Royce meets AI"
