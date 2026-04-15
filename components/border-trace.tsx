"use client"
import { useRef } from "react"
import { useInView } from "framer-motion"

export function BorderTrace({ children, className = "", color = "#D4AF37", duration = 1.5 }: { children: React.ReactNode; className?: string; color?: string; duration?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <rect x="0.5" y="0.5" width="99%" height="99%" fill="none"
          stroke={color} strokeOpacity="0.5" strokeWidth="1"
          strokeDasharray="2000" strokeDashoffset={isInView ? 0 : 2000}
          style={{ transition: `stroke-dashoffset ${duration}s cubic-bezier(0.22,1,0.36,1)` }} />
      </svg>
      {children}
    </div>
  )
}
