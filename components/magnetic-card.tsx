"use client"
import { useRef } from "react"

export function MagneticCard({ children, className = "", strength = 0.12 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * strength}px,${(e.clientY - rect.top - rect.height / 2) * strength}px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)" }
  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
      {children}
    </div>
  )
}
