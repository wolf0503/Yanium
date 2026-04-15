"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function SectionDivider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20px" })

  return (
    <div ref={ref} className="mx-auto max-w-5xl px-6 py-1">
      <div className="relative h-px overflow-visible">
        {/* Base line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 origin-center bg-gradient-to-r from-transparent via-gold/18 to-transparent"
        />
        {/* Scan dot */}
        <motion.div
          initial={{ left: "0%", opacity: 0 }}
          animate={isInView ? { left: ["0%", "100%"], opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-gold/60"
          style={{ boxShadow: "0 0 6px rgba(212,175,55,0.8)" }}
        />
      </div>
    </div>
  )
}
