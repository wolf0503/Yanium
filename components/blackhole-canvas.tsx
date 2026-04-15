"use client"
import { useEffect, useRef, useCallback } from "react"

export function BlackholeCanvas({ className = "" }: { className?: string }) {
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
    let cx = W / 2, cy = H / 2

    // All distances scale off the smallest dimension — keeps circle perfect on every screen
    const buildScene = () => {
      const BASE = Math.min(W, H)
      const EH = Math.round(BASE * 0.155)
      const DISK_MIN = BASE * 0.19
      const DISK_RANGE = BASE * 0.54

      const PARALLAX = [0.022, 0.013, 0.005]
      const stars = Array.from({ length: 280 }, () => ({
        x: Math.random(), y: Math.random(),
        r: Math.random() * 1.1 + 0.2,
        a: Math.random() * 0.55 + 0.15,
        tw: Math.random() * Math.PI * 2,
        twS: 0.006 + Math.random() * 0.014,
        layer: Math.floor(Math.random() * 3),
      }))

      const DISK_COUNT = Math.min(1600, Math.round(W * H / 900))
      const disk = Array.from({ length: DISK_COUNT }, () => {
        const band = Math.random()
        return {
          r: DISK_MIN + band * DISK_RANGE,
          theta: Math.random() * Math.PI * 2,
          speed: (0.15 + (1 - band) * 0.18) * (Math.random() > 0.5 ? 1 : -1) * 0.6,
          band, size: 0.8 + Math.random() * 2.2,
          alpha: 0.45 + Math.random() * 0.55,
          hue: 40 + band * 22, sat: 72 + (1 - band) * 28, lit: 82 - band * 38,
        }
      })

      const STREAM_COUNT = 100
      const streams = Array.from({ length: STREAM_COUNT }, (_, i) => ({
        angle: (i / STREAM_COUNT) * Math.PI * 2,
        r: BASE * (0.38 + Math.random() * 0.45),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        alpha: 0.12 + Math.random() * 0.3,
      }))

      const JET_Y_MAX = BASE * 0.82
      const jets = Array.from({ length: 180 }, () => ({
        side: Math.random() > 0.5 ? 1 : -1,
        x: (Math.random() - 0.5) * EH * 0.24,
        y: EH + Math.random() * JET_Y_MAX,
        speed: 1.0 + Math.random() * 2.2,
        alpha: 0.35 + Math.random() * 0.55,
        size: 0.7 + Math.random() * 1.6,
        drift: (Math.random() - 0.5) * 0.4,
        yMax: JET_Y_MAX,
      }))

      return { EH, DISK_MIN, DISK_RANGE, stars, disk, streams, jets }
    }

    let scene = buildScene()
    let t = 0

    const draw = () => {
      t += 0.008
      const { EH, stars, disk, streams, jets } = scene
      const pulse = Math.sin(t * 0.7) * 0.5 + 0.5
      const prox = mouseRef.current.proximity
      const mx = mouseRef.current.x / W - 0.5
      const my = mouseRef.current.y / H - 0.5

      ctx.clearRect(0, 0, W, H)

      // Deep space background
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.8)
      bg.addColorStop(0, "rgba(6,3,1,1)")
      bg.addColorStop(0.4, "rgba(4,2,3,1)")
      bg.addColorStop(1, "rgba(1,1,2,1)")
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

      // Stars with parallax
      for (const s of stars) {
        s.tw += s.twS
        const a = s.a * (0.5 + 0.5 * Math.sin(s.tw))
        ctx.beginPath()
        ctx.arc(
          s.x * W - mx * W * PARALLAX[s.layer],
          s.y * H - my * H * PARALLAX[s.layer],
          s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill()
      }

      // Outer nebula glow
      const og = ctx.createRadialGradient(cx, cy, EH * 1.2, cx, cy, EH * 7)
      og.addColorStop(0, `rgba(212,175,55,${0.09 + pulse * 0.05 + prox * 0.04})`)
      og.addColorStop(0.4, `rgba(140,90,10,${0.04 + pulse * 0.02})`)
      og.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = og; ctx.fillRect(0, 0, W, H)

      // Infalling streams (behind disk)
      for (const s of streams) {
        s.progress += s.speed * (1 + prox * 0.5)
        if (s.progress > 1) s.progress = 0
        const r = s.r * (1 - s.progress)
        ctx.beginPath()
        ctx.arc(
          cx + Math.cos(s.angle + t * 0.08) * r,
          cy + Math.sin(s.angle + t * 0.08) * r * 0.32,
          0.9, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,175,55,${s.alpha * s.progress * 0.65})`; ctx.fill()
      }

      // Disk — back half (behind event horizon)
      for (const p of disk) {
        p.theta += p.speed * 0.016 * (1 + prox * 0.35)
        const x = cx + Math.cos(p.theta) * p.r
        const y = cy + Math.sin(p.theta) * p.r * 0.28
        if (Math.sin(p.theta) > 0) continue
        ctx.beginPath()
        ctx.arc(x, y, p.size * ((1 - p.band) * 0.6 + 0.4), 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},${p.sat}%,${p.lit}%,${p.alpha * 0.5})`; ctx.fill()
      }

      // Polar jets (particles)
      for (const j of jets) {
        j.y -= j.speed
        if (j.y < 0) { j.y = EH + Math.random() * j.yMax; j.x = (Math.random() - 0.5) * scene.EH * 0.24 }
        const fade = 1 - j.y / j.yMax
        ctx.beginPath()
        ctx.arc(cx + j.x + Math.sin(t + j.y * 0.05) * j.drift * 3, cy - j.y * j.side, j.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,220,255,${j.alpha * fade * 0.55})`; ctx.fill()
      }

      // Jet glow columns
      for (const side of [-1, 1]) {
        const jg = ctx.createLinearGradient(cx, cy, cx, cy - side * EH * 4.5)
        jg.addColorStop(0, "rgba(0,240,255,0)")
        jg.addColorStop(0.08, `rgba(0,240,255,${0.10 + pulse * 0.05})`)
        jg.addColorStop(0.5, "rgba(60,200,255,0.04)")
        jg.addColorStop(1, "rgba(0,240,255,0)")
        ctx.save(); ctx.beginPath()
        ctx.ellipse(cx, cy, EH * 0.18, EH * 4.5, 0, 0, Math.PI * 2)
        ctx.fillStyle = jg; ctx.fill(); ctx.restore()
      }

      // Event horizon (black circle — always circular)
      ctx.save()
      ctx.beginPath(); ctx.arc(cx, cy, EH, 0, Math.PI * 2)
      ctx.fillStyle = "#000"; ctx.fill()
      ctx.restore()

      // Re-fill event horizon on top of disk back
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, EH - 1, 0, Math.PI * 2)
      ctx.fillStyle = "#000"; ctx.fill(); ctx.restore()

      // Disk — front half (in front of event horizon)
      for (const p of disk) {
        const x = cx + Math.cos(p.theta) * p.r
        const y = cy + Math.sin(p.theta) * p.r * 0.28
        if (Math.sin(p.theta) <= 0) continue
        const fade = Math.min(1, Math.abs(x - cx) / (p.r * 0.6 + 1))
        ctx.beginPath(); ctx.arc(x, y, p.size * ((1 - p.band) * 0.5 + 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},${p.sat}%,${p.lit}%,${p.alpha * fade})`; ctx.fill()
      }

      // Disk glow halo
      ctx.save()
      ctx.scale(1, 0.3); ctx.translate(0, (cy / 0.3) * (1 - 0.3))
      const dg = ctx.createRadialGradient(cx, cy, EH * 0.8, cx, cy, EH * 5.2)
      dg.addColorStop(0, `rgba(255,230,80,${0.045 + pulse * 0.028})`)
      dg.addColorStop(0.18, `rgba(212,175,55,${0.055 + pulse * 0.035})`)
      dg.addColorStop(0.55, "rgba(160,100,10,0.018)")
      dg.addColorStop(1, "rgba(0,0,0,0)")
      ctx.beginPath(); ctx.arc(cx, cy, EH * 5.2, 0, Math.PI * 2)
      ctx.fillStyle = dg; ctx.fill(); ctx.restore()

      // Edge vignette
      const vig = ctx.createRadialGradient(cx, cy, Math.min(W, H) * 0.28, cx, cy, Math.min(W, H) * 0.82)
      vig.addColorStop(0, "rgba(0,0,0,0)")
      vig.addColorStop(1, "rgba(0,0,0,0.75)")
      ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H)

      // ── PHOTON RING — drawn LAST so nothing overdraws it ──────────────────
      // Outer halo glow (radial gradient fill around EH)
      const haloG = ctx.createRadialGradient(cx, cy, EH * 0.85, cx, cy, EH * 1.6)
      haloG.addColorStop(0,   `rgba(255,244,100,${0.5 + pulse * 0.2})`)
      haloG.addColorStop(0.4, `rgba(212,175,55,${0.25 + pulse * 0.1})`)
      haloG.addColorStop(1,   "rgba(0,0,0,0)")
      ctx.beginPath(); ctx.arc(cx, cy, EH * 1.6, 0, Math.PI * 2)
      ctx.fillStyle = haloG; ctx.fill()

      // Bright ring stroke with shadow glow
      ctx.save()
      ctx.shadowColor = "rgba(255,220,50,1)"
      ctx.shadowBlur = 28
      ctx.beginPath(); ctx.arc(cx, cy, EH + EH * 0.07, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255,250,140,${0.92 + pulse * 0.08})`
      ctx.lineWidth = 5; ctx.stroke()
      ctx.restore()

      // Refill event horizon center so ring stays outside it
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, EH - 1, 0, Math.PI * 2)
      ctx.fillStyle = "#000"; ctx.fill(); ctx.restore()
    }

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      cx = W / 2; cy = H / 2
      scene = buildScene()
    }

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY
      const dx = e.clientX - cx, dy = e.clientY - cy
      mouseRef.current.proximity = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / (Math.min(W, H) * 0.38))
    }

    // Use setInterval as primary driver — runs even in background/throttled tabs
    const intervalId = setInterval(draw, 33)
    frameRef.current = 0
    window.addEventListener("resize", onResize)
    window.addEventListener("mousemove", onMove)
    return () => {
      clearInterval(intervalId)
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  useEffect(() => { const cleanup = init(); return cleanup }, [init])

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} />
}
