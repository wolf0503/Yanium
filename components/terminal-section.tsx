"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

type SimpleLine = { type: "simple"; text: string; color?: "cyan" | "gold"; delay: number }
type MetricLine = { type: "metric"; prefix: string; filled: number; total: number; value: number; unit: string; tag: string; tagColor: "gold" | "cyan"; delay: number }
type LineData = SimpleLine | MetricLine

const LINES: LineData[] = [
  { type: "simple", text: "> INITIALIZING: Yanium_Intelligence_Engine", delay: 0 },
  { type: "simple", text: "> SYSTEM_MODE: Rapid_Architecting", delay: 1000 },
  { type: "simple", text: "> SCANNING: Client_Ecosystem...", delay: 2000 },
  { type: "metric", prefix: "> CLIENTS_SERVED:", filled: 8, total: 10, value: 24, unit: "", tag: "[VERIFIED]", tagColor: "gold", delay: 3200 },
  { type: "metric", prefix: "> AVG_DELIVERY_TIME:", filled: 4, total: 10, value: 12, unit: " days", tag: "[10x avg]", tagColor: "cyan", delay: 4600 },
  { type: "metric", prefix: "> PROJECTS_SHIPPED:", filled: 6, total: 10, value: 38, unit: "", tag: "[PRODUCTION]", tagColor: "gold", delay: 6000 },
  { type: "metric", prefix: "> UPTIME_GUARANTEE:", filled: 9, total: 10, value: 99.98, unit: "%", tag: "[SLA]", tagColor: "cyan", delay: 7400 },
  { type: "simple", text: "> STATUS: All_systems_operational", color: "gold", delay: 8800 },
  { type: "simple", text: "> VERDICT: Legacy firms take quarters. We take days.", delay: 10000 },
  { type: "simple", text: "> PROTOCOL: Outcome-based. No excuses. No hourly billing.", delay: 11400 },
]

function useTyping(text: string, startMs: number, visible: boolean) {
  const [shown, setShown] = useState("")
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => {
      let i = 0
      const iv = setInterval(() => { i++; setShown(text.slice(0, i)); if (i >= text.length) { clearInterval(iv); setDone(true) } }, 22)
      return () => clearInterval(iv)
    }, startMs)
    return () => clearTimeout(t)
  }, [visible, text, startMs])
  return { shown, done }
}

function SimpleLine({ line, visible }: { line: SimpleLine; visible: boolean }) {
  const { shown, done } = useTyping(line.text, line.delay, visible)
  if (!shown) return null
  return (
    <div className="flex items-center">
      <span className={`font-mono text-sm ${line.color === "gold" ? "text-gold" : "text-cyan/90"}`}>{shown}</span>
      {!done && <span className="terminal-cursor ml-0.5 inline-block h-4 w-2 bg-cyan/80" />}
    </div>
  )
}

function MetricLine({ line, visible }: { line: MetricLine; visible: boolean }) {
  const [prefix, setPrefix] = useState("")
  const [barFilled, setBarFilled] = useState(0)
  const [val, setVal] = useState(0)
  const [showTag, setShowTag] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => {
      setStarted(true)
      let pi = 0
      const piv = setInterval(() => {
        pi++; setPrefix(line.prefix.slice(0, pi))
        if (pi >= line.prefix.length) {
          clearInterval(piv)
          let bi = 0
          const biv = setInterval(() => {
            bi++; setBarFilled(bi)
            if (bi >= line.filled) {
              clearInterval(biv)
              const start = Date.now(), dur = 800
              const riv = setInterval(() => {
                const p = Math.min((Date.now() - start) / dur, 1)
                const v = parseFloat(((1 - Math.pow(1 - p, 3)) * line.value).toFixed(line.value % 1 !== 0 ? 2 : 0))
                setVal(v)
                if (p >= 1) { clearInterval(riv); setVal(line.value); setTimeout(() => setShowTag(true), 200) }
              }, 16)
            }
          }, 60)
        }
      }, 22)
    }, line.delay)
    return () => clearTimeout(t)
  }, [visible, line])

  if (!started) return null
  const bar = "▓".repeat(barFilled) + "░".repeat(line.total - barFilled)

  return (
    <div className="flex flex-wrap items-center gap-x-2 font-mono text-sm">
      <span className="text-cyan/90">{prefix}</span>
      {barFilled > 0 && <span className="text-gold/80">{bar}</span>}
      {barFilled >= line.filled && <span className="text-silver">{val}{line.unit}</span>}
      {showTag && <span className={`text-xs font-bold ${line.tagColor === "gold" ? "text-gold" : "text-cyan"}`}>{line.tag}</span>}
    </div>
  )
}

export function TerminalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="terminal" className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col items-center">
          <span className="mb-4 font-display text-[10px] tracking-[0.4em] text-gold/70">// PROOF OF EXECUTION</span>
          <h2 className="mb-12 text-center font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
            THE <span className="text-gold">SIGNAL</span>
          </h2>
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }} className="glass relative w-full max-w-3xl overflow-hidden rounded-lg">
            {isInView && <div className="scanline" />}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-silver/40">yanium://vibe-engine v1.0</span>
            </div>
            <div className="flex min-h-[320px] flex-col gap-3 p-6">
              <div className="mb-2 font-mono text-xs text-silver/35">// YANIUM ENGINE v1.0 — LIVE</div>
              {LINES.map((line, i) =>
                line.type === "simple"
                  ? <SimpleLine key={i} line={line} visible={isInView} />
                  : <MetricLine key={i} line={line} visible={isInView} />
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
