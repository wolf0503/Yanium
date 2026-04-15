"use client"
import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Node { x: number; y: number; vx: number; vy: number; size: number; alpha: number; phase: number; speed: number }

export function NeuralLoader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"loading" | "revealing">("loading")
  const nodesRef = useRef<Node[]>([])
  const animRef = useRef<number>(0)
  const NODE_COUNT = 120
  const CONNECTION_DIST = 130

  const initNodes = useCallback((w: number, h: number) => {
    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
      size: 0.8 + Math.random() * 2.0, alpha: 0.2 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2, speed: 0.5 + Math.random() * 1.5,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext("2d"); if (!ctx) return
    canvas.width = window.innerWidth; canvas.height = window.innerHeight
    initNodes(canvas.width, canvas.height)
    const w = canvas.width, h = canvas.height

    const animate = (time: number) => {
      const t = time * 0.001
      ctx.clearRect(0, 0, w, h)
      const nodes = nodesRef.current
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        n.x = Math.max(0, Math.min(w, n.x)); n.y = Math.max(0, Math.min(h, n.y))
      }
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(212,175,55,${(1 - dist / CONNECTION_DIST) * 0.25})`; ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        const a = n.alpha * (0.5 + 0.5 * Math.sin(t * n.speed + n.phase))
        ctx.beginPath(); ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,175,55,${a})`; ctx.fill()
        if (a > 0.4) { ctx.beginPath(); ctx.arc(n.x, n.y, n.size * 4, 0, Math.PI * 2); ctx.fillStyle = `rgba(212,175,55,${a * 0.05})`; ctx.fill() }
      }
      const pr = 40 + Math.sin(t * 2) * 15, pa = 0.08 + Math.sin(t * 2) * 0.04
      ctx.beginPath(); ctx.arc(w / 2, h / 2, pr, 0, Math.PI * 2); ctx.strokeStyle = `rgba(212,175,55,${pa})`; ctx.lineWidth = 1; ctx.stroke()
      ctx.beginPath(); ctx.arc(w / 2, h / 2, pr * 1.6, 0, Math.PI * 2); ctx.strokeStyle = `rgba(212,175,55,${pa * 0.5})`; ctx.lineWidth = 0.5; ctx.stroke()
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [initNodes])

  useEffect(() => {
    let current = 0
    const iv = setInterval(() => {
      current += Math.random() * 8 + 2
      if (current >= 100) {
        current = 100; clearInterval(iv)
        setTimeout(() => { setPhase("revealing"); setTimeout(() => onComplete(), 800) }, 400)
      }
      setProgress(Math.min(current, 100))
    }, 120)
    return () => clearInterval(iv)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div key="loader" initial={{ opacity: 1 }} animate={{ opacity: phase === "revealing" ? 0 : 1 }}
        transition={{ duration: 0.8 }} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ backgroundColor: "#050505" }}>
        <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex flex-col items-center gap-3">
            <div className="font-display text-4xl tracking-[0.25em] text-gold md:text-5xl">YANIUM</div>
            <div className="font-mono text-xs tracking-[0.3em] text-silver/40">INITIALIZING INTELLIGENCE ENGINE</div>
          </motion.div>
          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-64 overflow-hidden bg-silver/10 md:w-80">
              <motion.div className="h-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg,rgba(212,175,55,0.1),rgba(212,175,55,0.8))", boxShadow: "0 0 12px rgba(212,175,55,0.4)" }} transition={{ duration: 0.1 }} />
            </div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-gold/60">{Math.floor(progress)}% LOADED</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            {[{ t: "> YANIUM_ENGINE: Online", p: 15 }, { t: "> NEURAL_MESH: Connected", p: 40 }, { t: "> LOGIC_CORE: Calibrating", p: 65 }, { t: "> SYSTEMS: Ready", p: 85 }].map(s => (
              <motion.div key={s.t} initial={{ opacity: 0 }} animate={{ opacity: progress > s.p ? 0.5 : 0 }} className="font-mono text-[10px] tracking-wider text-code-green/60">{s.t}</motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
