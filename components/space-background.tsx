"use client"
import { useEffect, useRef } from "react"

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    // Static twinkling stars
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.2 + Math.random() * 1.1,
      baseAlpha: 0.09 + Math.random() * 0.39,
      speed: 0.3 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
    }))

    // Drifting neural nodes
    const nodes = Array.from({ length: 32 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }))

    const CONN_DIST = 160
    let animId = 0
    let lastTime = 0
    const FPS = 30

    const draw = (time: number) => {
      animId = requestAnimationFrame(draw)
      if (time - lastTime < 1000 / FPS) return
      lastTime = time
      const t = time * 0.001

      ctx.clearRect(0, 0, W, H)

      // Twinkling stars
      for (const s of stars) {
        const a = s.baseAlpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220,220,235,${a})`
        ctx.fill()
      }

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
        n.x = Math.max(0, Math.min(W, n.x))
        n.y = Math.max(0, Math.min(H, n.y))
      }

      // Neural connections
      ctx.lineWidth = 0.4
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONN_DIST) {
            const a = (1 - dist / CONN_DIST) * 0.055
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(212,175,55,${a})`
            ctx.stroke()
          }
        }
      }

      // Node dots
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(212,175,55,0.12)"
        ctx.fill()
      }
    }

    animId = requestAnimationFrame(draw)

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 h-full w-full"
      style={{ zIndex: 0, pointerEvents: "none" }}
    />
  )
}
