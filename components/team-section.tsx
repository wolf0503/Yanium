"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const disciplines = [
  {
    category: "// ENGINEERING",
    roles: [
      { title: "Frontend Engineers",   stack: "React · Next.js · Vue · TypeScript" },
      { title: "Backend Engineers",    stack: "Node.js · Python · APIs · Microservices" },
      { title: "Mobile Engineers",     stack: "React Native · iOS · Android" },
      { title: "Full-Stack Engineers", stack: "End-to-end product ownership" },
    ],
  },
  {
    category: "// INTELLIGENCE",
    roles: [
      { title: "AI Engineers",          stack: "LLM pipelines · Agents · RAG · Fine-tuning" },
      { title: "Automation Architects", stack: "Business process · Workflow design" },
    ],
  },
  {
    category: "// INFRASTRUCTURE",
    roles: [
      { title: "DevOps Engineers", stack: "CI/CD · Cloud · Docker · Kubernetes" },
      { title: "QA Engineers",     stack: "Automated testing · Performance · Security" },
    ],
  },
  {
    category: "// CRAFT",
    roles: [
      { title: "UI/UX Designers",  stack: "Product design · Prototyping · Systems" },
      { title: "Brand Designers",  stack: "Identity · Motion · Print · Digital" },
    ],
  },
]

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="team" className="relative py-32 px-6">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-gold/[0.018] blur-[130px]" />
      <div className="mx-auto max-w-5xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.7em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-4 inline-block font-display text-[10px] text-gold/70">
            // Yn · 104 NEUTRONS · THE FORCE YOU DON&apos;T SEE
          </motion.span>
          <h2 className="font-display text-3xl tracking-[0.08em] text-silver md:text-5xl lg:text-6xl">
            104 NEUTRONS.
            <br />
            <span className="text-gold">THE CORE THAT HOLDS IT TOGETHER.</span>
          </h2>
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-5 max-w-xl font-serif text-base italic text-silver/60">
            In lutetium&apos;s nucleus, 104 neutrons do the invisible work.
            No one sees them. Everything depends on them.
            Yanium is built the same way.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass mb-10 overflow-hidden rounded-lg">
          <div className="grid grid-cols-1 divide-y divide-white/[0.05] md:grid-cols-2 md:divide-x md:divide-y-0">
            {disciplines.map((d, di) => (
              <div key={di} className="p-7">
                <p className="mb-5 font-mono text-[9px] tracking-[0.3em] text-gold/60">{d.category}</p>
                <div className="flex flex-col gap-4">
                  {d.roles.map((r, ri) => (
                    <motion.div key={ri}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + di * 0.1 + ri * 0.06 }}
                      className="flex flex-col gap-0.5">
                      <span className="font-display text-sm tracking-[0.08em] text-silver">{r.title}</span>
                      <span className="font-mono text-[9px] tracking-[0.12em] text-silver/40">{r.stack}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-3 text-center">
          <p className="max-w-xl font-serif text-sm italic leading-relaxed text-silver/55">
            We don&apos;t list headcounts. We list capabilities. Every specialist on a Yanium project
            is exactly where they need to be — not assigned by availability, but matched by expertise.
          </p>
          <span className="font-mono text-[9px] tracking-[0.2em] text-silver/30">
            Yn-175 — the stable isotope. 97.4% pure. That&apos;s our hiring standard.
          </span>
        </motion.div>
      </div>
    </section>
  )
}
