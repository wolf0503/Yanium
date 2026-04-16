"use client"
import { useEffect, useRef } from "react"

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return
    const TRAIL = 10
    const trail = Array.from({ length: TRAIL }, (_, i) => {
      const el = document.createElement("div")
      const s = Math.max(1.5, 3.5 - i * 0.2)
      el.style.cssText = `position:fixed;pointer-events:none;z-index:9998;width:${s}px;height:${s}px;border-radius:50%;background:#00F0FF;opacity:${((TRAIL - i) / TRAIL) * 0.5};transform:translate(-50%,-50%);left:0;top:0;`
      document.body.appendChild(el)
      return el
    })
    let positions = Array<{ x: number; y: number }>(TRAIL).fill({ x: 0, y: 0 })
    let frame: number
    const loop = () => {
      positions = [{ ...posRef.current }, ...positions.slice(0, TRAIL - 1)]
      trail.forEach((el, i) => { const p = positions[i] ?? positions[0]; el.style.left = p.x + "px"; el.style.top = p.y + "px" })
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) { dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px" }
    }
    document.addEventListener("mousemove", onMove)
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(frame); trail.forEach(el => el.remove()) }
  }, [])

  return (
    <div ref={dotRef} className="cursor-glow pointer-events-none fixed z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
      style={{ boxShadow: "0 0 8px #D4AF37", left: 0, top: 0 }} />
  )
}
