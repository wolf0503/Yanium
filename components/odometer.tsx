"use client"
import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"

export function Odometer({ target, duration = 2000, suffix = "", decimals = 0 }: { target: number; duration?: number; suffix?: string; decimals?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!isInView) return
    const start = Date.now()
    let frame: number
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      setValue(parseFloat(((1 - Math.pow(1 - p, 3)) * target).toFixed(decimals)))
      if (p < 1) { frame = requestAnimationFrame(tick) }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target, duration, decimals])
  return <span ref={ref}>{decimals > 0 ? value.toFixed(decimals) : Math.round(value)}{suffix}</span>
}
