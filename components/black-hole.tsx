"use client"
import React from "react"

// ─── Helper ────────────────────────────────────────────────────────────────
const s = (n: number) => `min(${n}vw, ${n}vh)`

// Deterministic pseudo-random (no Math.random() = stable SSR/CSR)
function dr(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

// ─── Equatorial horizon rings — tilted star rings like a flat orbital plane ──
// These spin with rotateX perspective so they appear as ellipses/horizontal bands
const HORIZON_RINGS = [
  { size: 62,  count: 24, speed: 18,  dir:  1, tiltX: 70, starSz: 2.0, opacity: 0.90, r: 255, g: 240, b: 150 },
  { size: 82,  count: 32, speed: 30,  dir: -1, tiltX: 72, starSz: 1.6, opacity: 0.65, r: 255, g: 255, b: 220 },
  { size: 106, count: 42, speed: 50,  dir:  1, tiltX: 74, starSz: 1.2, opacity: 0.40, r: 230, g: 245, b: 255 },
]

// ─── Five Keplerian orbital bands ─────────────────────────────────────────
const BANDS = [
  { containerSize: 72,  rMin: 44, rMax: 50, count: 14, speed: 20,  dir:  1, r: 255, g: 238, b: 140, oMin: 0.80, oMax: 1.0,  szMin: 1.8, szMax: 3.0 },
  { containerSize: 98,  rMin: 40, rMax: 50, count: 24, speed: 36,  dir: -1, r: 255, g: 252, b: 210, oMin: 0.55, oMax: 0.85, szMin: 1.3, szMax: 2.2 },
  { containerSize: 126, rMin: 36, rMax: 50, count: 34, speed: 58,  dir:  1, r: 255, g: 255, b: 255, oMin: 0.35, oMax: 0.60, szMin: 0.9, szMax: 1.8 },
  { containerSize: 158, rMin: 32, rMax: 50, count: 44, speed: 88,  dir: -1, r: 220, g: 235, b: 255, oMin: 0.15, oMax: 0.35, szMin: 0.6, szMax: 1.4 },
  { containerSize: 196, rMin: 26, rMax: 50, count: 55, speed: 130, dir:  1, r: 200, g: 218, b: 255, oMin: 0.06, oMax: 0.18, szMin: 0.4, szMax: 1.0 },
]

export function BlackHole() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">

      {/* ── Gravitational lensing halo ────────────────────────────────── */}
      <div style={{
        position:     "absolute",
        width:  s(78), height: s(78),
        borderRadius: "50%",
        background:   "radial-gradient(circle, transparent 32%, rgba(212,175,55,0.07) 50%, rgba(180,110,10,0.04) 68%, transparent 84%)",
        animation:    "bhLens 6s ease-in-out infinite",
      }} />

      {/* ── Equatorial horizon rings — flat orbital plane with tilt ─────── */}
      {HORIZON_RINGS.map((ring, ri) => (
        <div key={`h${ri}`} style={{ position: "absolute", perspective: "500px" }}>
          <div style={{
            width:        s(ring.size),
            height:       s(ring.size),
            borderRadius: "50%",
            transform:    `rotateX(${ring.tiltX}deg)`,
            animation:    `bhOrbit${ring.dir > 0 ? "CW" : "CCW"} ${ring.speed}s linear infinite`,
          }}>
            {Array.from({ length: ring.count }, (_, i) => {
              const angle = (i / ring.count) * Math.PI * 2
              const lx    = 50 + 50 * Math.cos(angle)
              const ly    = 50 + 50 * Math.sin(angle)
              const twinkleDelay = -((i * 0.41) % 5).toFixed(1)
              return (
                <div key={i} style={{
                  position:     "absolute",
                  width:        `${ring.starSz}px`,
                  height:       `${ring.starSz}px`,
                  borderRadius: "50%",
                  background:   `rgba(${ring.r},${ring.g},${ring.b},${ring.opacity})`,
                  boxShadow:    `0 0 ${ring.starSz * 4}px rgba(${ring.r},${ring.g},${ring.b},${(ring.opacity * 0.55).toFixed(2)})`,
                  left:         `${lx}%`,
                  top:          `${ly}%`,
                  transform:    "translate(-50%,-50%)",
                  animation:    `bhTwinkle ${2.8 + (i % 4) * 0.65}s ease-in-out infinite ${twinkleDelay}s`,
                }} />
              )
            })}
          </div>
        </div>
      ))}

      {/* ── Keplerian star bands ───────────────────────────────────────── */}
      {BANDS.map((band, bi) =>
        <div
          key={bi}
          style={{
            position:     "absolute",
            width:  s(band.containerSize),
            height: s(band.containerSize),
            borderRadius: "50%",
            animation:    `bhOrbit${band.dir > 0 ? "CW" : "CCW"} ${band.speed}s linear infinite`,
          }}
        >
          {Array.from({ length: band.count }, (_, i) => {
            const seed    = bi * 1000 + i
            const rFrac   = band.rMin + (band.rMax - band.rMin) * dr(seed)
            const angle   = (i / band.count) * Math.PI * 2 + dr(seed + 0.5) * 0.6
            const lx      = 50 + rFrac * Math.cos(angle)
            const ly      = 50 + rFrac * Math.sin(angle)
            const opacity = band.oMin + (band.oMax - band.oMin) * dr(seed + 1)
            const size    = band.szMin + (band.szMax - band.szMin) * dr(seed + 2)
            const twinkleDelay = -(dr(seed + 3) * 6).toFixed(2)
            const twinkleDur   = (2.2 + dr(seed + 4) * 4.5).toFixed(1)
            const rr = Math.round(band.r)
            const gg = Math.round(band.g)
            const bb = Math.round(band.b)
            return (
              <div
                key={i}
                style={{
                  position:     "absolute",
                  width:        `${size}px`,
                  height:       `${size}px`,
                  borderRadius: "50%",
                  background:   `rgba(${rr},${gg},${bb},${opacity.toFixed(2)})`,
                  boxShadow:    `0 0 ${(size * 3.5).toFixed(1)}px rgba(${rr},${gg},${bb},${(opacity * 0.6).toFixed(2)})`,
                  left:         `${lx}%`,
                  top:          `${ly}%`,
                  transform:    "translate(-50%,-50%)",
                  animation:    `bhTwinkle ${twinkleDur}s ease-in-out infinite ${twinkleDelay}s`,
                }}
              />
            )
          })}
        </div>
      )}

      {/* ── Relativistic jets + photon ring + event horizon ──────────── */}
      <div style={{
        position:      "absolute",
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
      }}>
        {/* Jet top */}
        <div style={{
          width:        s(2.4),
          height:       s(28),
          background:   "linear-gradient(to top, rgba(60,200,255,0.60) 0%, rgba(130,235,255,0.30) 50%, transparent 100%)",
          borderRadius: "50% 50% 0 0",
          filter:       "blur(4px)",
          animation:    "bhJet 3.5s ease-in-out infinite",
        }} />

        {/* Photon ring wrapper */}
        <div style={{ position: "relative", width: s(30), height: s(30), flexShrink: 0 }}>
          {/* Outer glow */}
          <div style={{
            position:     "absolute", inset: "-14%",
            borderRadius: "50%",
            background:   "radial-gradient(circle, transparent 38%, rgba(212,175,55,0.25) 58%, transparent 80%)",
            animation:    "bhPhoton 3.8s ease-in-out infinite",
          }} />

          {/* Einstein arc — lensed back-disk */}
          <div style={{
            position:     "absolute", inset: "-8%",
            borderRadius: "50%",
            border:       "6px solid transparent",
            borderTop:    "6px solid rgba(255,190,50,0.70)",
            borderLeft:   "3px solid rgba(255,155,30,0.28)",
            borderRight:  "3px solid rgba(255,155,30,0.28)",
            filter:       "blur(3px)",
            transform:    "rotateZ(-12deg)",
            animation:    "bhEinstein 7s ease-in-out infinite",
          }} />

          {/* Photon ring */}
          <div style={{
            position:     "absolute", inset: 0,
            borderRadius: "50%",
            border:       "2px solid rgba(255,248,155,0.92)",
            boxShadow:    "0 0 16px 3px rgba(255,225,60,0.65), 0 0 46px 8px rgba(212,175,55,0.28), inset 0 0 10px rgba(255,220,60,0.15)",
            animation:    "bhPhoton 3.8s ease-in-out infinite",
          }} />

          {/* Inner shadow ring */}
          <div style={{
            position:     "absolute", inset: "6%",
            borderRadius: "50%",
            border:       "1px solid rgba(212,175,55,0.22)",
            boxShadow:    "inset 0 0 20px rgba(0,0,0,0.98)",
          }} />

          {/* Event horizon */}
          <div style={{
            position:     "absolute", inset: "9%",
            borderRadius: "50%",
            background:   "radial-gradient(circle at 36% 36%, #090909 0%, #000 60%)",
            boxShadow:    "0 0 55px 22px rgba(0,0,0,1), 0 0 0 3px #000",
          }} />
        </div>

        {/* Jet bottom */}
        <div style={{
          width:        s(2.4),
          height:       s(28),
          background:   "linear-gradient(to bottom, rgba(60,200,255,0.60) 0%, rgba(130,235,255,0.30) 50%, transparent 100%)",
          borderRadius: "0 0 50% 50%",
          filter:       "blur(4px)",
          animation:    "bhJet 3.5s ease-in-out infinite 1.75s",
        }} />
      </div>

    </div>
  )
}
