"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, TrendingUp, Activity } from "lucide-react";

const projects = [
  {
    icon: Shield,
    code: "CV_SENTINEL",
    title: "CV Sentinel",
    description: "AI Career Tracking & ROI Analytics.",
    status: "ACTIVE",
    metrics: "12K+ profiles analyzed",
  },
  {
    icon: TrendingUp,
    code: "ROI_SENTINEL",
    title: "ROI Sentinel",
    description: "Predictive Real-Estate Intelligence for the Armenian Market.",
    status: "BETA",
    metrics: "3.2M data points",
  },
  {
    icon: Activity,
    code: "MYZRA",
    title: "Myzra",
    description: "Champion-Logic Health & Performance Protocol.",
    status: "R&D",
    metrics: "Neural mapping v2",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
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
      className="group glass relative overflow-hidden rounded-lg p-6 transition-all duration-500 hover:scale-[1.02] hover:border-cyan/40"
    >
      {/* Glow on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-cyan/20 bg-cyan/5">
            <project.icon className="h-5 w-5 text-cyan" />
          </div>
          <span
            className={`rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.2em] ${
              project.status === "ACTIVE"
                ? "border border-code-green/30 bg-code-green/10 text-code-green"
                : project.status === "BETA"
                  ? "border border-cyan/30 bg-cyan/10 text-cyan"
                  : "border border-silver/20 bg-silver/5 text-silver/50"
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Code name */}
        <div className="mb-2 font-mono text-xs tracking-[0.2em] text-cyan/50">
          {project.code}
        </div>

        <h3 className="mb-2 font-display text-2xl tracking-[0.08em] text-silver">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-silver/50">
          {project.description}
        </p>

        {/* Metrics */}
        <div className="flex items-center gap-2 border-t border-white/5 pt-4">
          <div className="h-1.5 w-1.5 rounded-full bg-cyan/50" />
          <span className="font-mono text-xs text-silver/30">
            {project.metrics}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function LabsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="labs" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-xs tracking-[0.4em] text-cyan/60">
            {"// INTERNAL PROJECTS"}
          </span>
          <h2 className="mb-4 font-display text-4xl tracking-[0.1em] text-silver md:text-5xl lg:text-6xl">
            THE <span className="text-cyan">INCUBATOR</span>
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-silver/50">
            We don{"'"}t just build for others. We build the future of our own
            portfolio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.code} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
