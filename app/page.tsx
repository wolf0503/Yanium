"use client"
import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TerminalSection } from "@/components/terminal-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { ServicesSection } from "@/components/services-section"
import { HowWeWorkSection } from "@/components/how-we-work-section"
import { ComparisonSection } from "@/components/comparison-section"
import { WhoWeWorkWithSection } from "@/components/who-we-work-with-section"
import { TeamSection } from "@/components/team-section"
import { VenturesSection } from "@/components/ventures-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { FooterSection } from "@/components/footer-section"
import { CursorGlow } from "@/components/cursor-glow"
import { NeuralLoader } from "@/components/neural-loader"
import { SectionDivider } from "@/components/section-divider"
import { SpaceBackground } from "@/components/space-background"

export default function Page() {
  const [loaded, setLoaded] = useState(false)
  const handleLoadComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <NeuralLoader onComplete={handleLoadComplete} />}
      <main
        className="relative min-h-screen overflow-x-hidden bg-obsidian"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <SpaceBackground />
        <CursorGlow />
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <SectionDivider />
          <TerminalSection />
          <SectionDivider />
          <PhilosophySection />
          <SectionDivider />
          <ServicesSection />
          <SectionDivider />
          <HowWeWorkSection />
          <SectionDivider />
          <ComparisonSection />
          <SectionDivider />
          <WhoWeWorkWithSection />
          <SectionDivider />
          <TeamSection />
          <SectionDivider />
          <VenturesSection />
          <SectionDivider />
          <ManifestoSection />
          <FooterSection />
        </div>
      </main>
    </>
  )
}
