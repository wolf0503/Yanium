"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cpu, Workflow, Zap } from "lucide-react";

const pillars = [
  {
    icon: Code2,
    label: "HUMAN INTENT",
    description: "We define the business logic, the strategy, and the architecture.",
  },
  {
    icon: Cpu,
    label: "AI EXECUTION",
    description: "Our AI engines handle infrastructure, boilerplate, and scaling.",
  },
  {
    icon: Workflow,
    label: "HYBRID WORKFLOW",
    description: "The fusion of human creativity and machine precision.",
  },
  {
    icon: Zap,
    label: "10x VELOCITY",
    description: "Ship production-grade systems in days, not quarters.",
  },
];

function PillarItem({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col items-center text-center"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-cyan/20 bg-cyan/5 transition-all duration-500 group-hover:border-cyan/40 group-hover:bg-cyan/10 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
        <pillar.icon className="h-6 w-6 text-cyan" />
      </div>
      <h4 className="mb-2 font-mono text-xs tracking-[0.3em] text-cyan">
        {pillar.label}
      </h4>
      <p className="max-w-[200px] text-sm leading-relaxed text-silver/50">
        {pillar.description}
      </p>
    </motion.div>
  );
}

export function VibeStorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan/[0.02] blur-[120px]" />

      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-xs tracking-[0.4em] text-cyan/60">
            {"// THE VIBE CODING STORY"}
          </span>
          <h2 className="mb-6 font-display text-3xl tracking-[0.08em] text-silver md:text-5xl lg:text-6xl">
            <span className="text-balance">
              CODE IS A COMMODITY.
              <br />
              <span className="text-cyan">LOGIC</span> IS THE LEVERAGE.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="glass mx-auto mb-20 max-w-3xl rounded-lg p-8 md:p-12"
        >
          <p className="text-base leading-relaxed text-silver/70 md:text-lg md:leading-8">
            The old way of development is a bottleneck. We{"'"}ve replaced manual
            labor with <span className="font-semibold text-cyan">Vibe Coding</span>
            {" "}&mdash; a Human-AI hybrid workflow that allows us to focus on{" "}
            <span className="text-silver">your business logic</span> while our AI
            engines handle the infrastructure. We don{"'"}t just write code; we{" "}
            <span className="text-silver">orchestrate intelligence</span>.
          </p>

          {/* Accent line */}
          <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-cyan/30 via-cyan/10 to-transparent" />

          <div className="mt-6 flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-code-green" />
            <span className="font-mono text-xs tracking-[0.2em] text-silver/40">
              HUMAN-AI HYBRID DEVELOPMENT PROTOCOL
            </span>
          </div>
        </motion.div>

        {/* Four pillars */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {pillars.map((pillar, i) => (
            <PillarItem key={pillar.label} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
