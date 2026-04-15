"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Brain, Zap } from "lucide-react";

const capabilities = [
  {
    icon: Globe,
    title: "INTELLIGENT WEB / MOBILE",
    description:
      "High-performance ecosystems engineered for scale. We architect full-stack platforms that think, adapt, and outperform.",
    tag: "ECOSYSTEMS",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    icon: Brain,
    title: "AUTONOMOUS AGENTS",
    description:
      "AI that thinks, learns, and executes. Self-evolving systems that turn data into decisions without human bottlenecks.",
    tag: "AI-NATIVE",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Zap,
    title: "VIBE WORKFLOWS",
    description:
      "Rapid prototyping for market dominance. From concept to production in hours, not sprints.",
    tag: "VELOCITY",
    span: "md:col-span-1 md:row-span-1",
  },
];

function CapabilityCard({
  item,
  index,
}: {
  item: (typeof capabilities)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group glass relative flex flex-col justify-between overflow-hidden rounded-lg p-8 transition-all duration-500 hover:scale-[1.02] hover:border-cyan/40 ${item.span}`}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-cyan/20 bg-cyan/5">
            <item.icon className="h-5 w-5 text-cyan" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.3em] text-cyan/50">
            {item.tag}
          </span>
        </div>

        <h3 className="mb-3 font-display text-2xl tracking-[0.08em] text-silver md:text-3xl">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-silver/50">
          {item.description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="relative z-10 mt-6">
        <div className="h-[1px] w-full bg-gradient-to-r from-cyan/20 to-transparent" />
      </div>
    </motion.div>
  );
}

export function CapabilitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="capabilities" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-xs tracking-[0.4em] text-cyan/60">
            {"// CORE CAPABILITIES"}
          </span>
          <h2 className="font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
            THE <span className="text-cyan">LOGIC</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {capabilities.map((item, i) => (
            <CapabilityCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
