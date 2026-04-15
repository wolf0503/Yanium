"use client"
import { useEffect, useRef } from "react"

export function ParticleBurst({ trigger, onComplete }: { trigger: boolean; onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!trigger) return
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext("2d"); if (!ctx) return
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight
    const cx = canvas.width / 2, cy = canvas.height / 2
    const particles = Array.from({ length: 60 }, () => {
      const angle = Math.random() * Math.PI * 2, speed = 2 + Math.random() * 4
      return { x: cx, y: cy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, decay: 0.015 + Math.random() * 0.02, size: 2 + Math.random() * 3, color: Math.random() > 0.3 ? "#D4AF37" : "#00F0FF" }
    })
    let frame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      particles.forEach(p => {
        if (p.life <= 0) return; alive = true
        p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.life -= p.decay
        ctx.globalAlpha = p.life; ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = p.color; ctx.fill()
      })
      ctx.globalAlpha = 1
      if (alive) { frame = requestAnimationFrame(animate) } else { onComplete?.() }
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [trigger, onComplete])
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
}
