"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { label: "WHAT WE ARE", href: "#philosophy" },
  { label: "SERVICES",    href: "#services" },
  { label: "HOW WE WORK", href: "#how-we-work" },
  { label: "VENTURES",    href: "#ventures" },
  { label: "TEAM",        href: "#team" },
  { label: "CONTACT",     href: "#contact" },
]

function YnLogo() {
  return (
    <a href="#hero" className="group flex items-center gap-3">
      <Image
        src="/logo-icon.png"
        alt="Yanium"
        width={36}
        height={36}
        className="shrink-0 transition-opacity duration-300 group-hover:opacity-75"
        priority
      />
      <Image
        src="/logo-wordmark.png"
        alt="YANIUM"
        width={110}
        height={22}
        className="hidden md:block object-contain transition-opacity duration-300 group-hover:opacity-75"
        priority
      />
    </a>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    fn()
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-400 ${
          scrolled
            ? "border-b border-gold/15 py-2.5 shadow-[0_4px_32px_rgba(0,0,0,0.7)]"
            : "py-3.5 md:py-5"
        }`}
        style={{
          background: scrolled
            ? "rgba(5,5,5,0.92)"
            : "rgba(5,5,5,0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <YnLogo />
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(link => (
              <a key={link.label} href={link.href}
                className="group relative font-display text-[10px] tracking-[0.25em] text-silver/80 transition-colors duration-300 hover:text-gold">
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a href="#contact"
              className="ml-2 border border-gold/50 bg-gold/[0.07] px-5 py-2 font-display text-[10px] tracking-[0.25em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/[0.18]">
              BOOK A CALL
            </a>
          </div>
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)}
            className="text-silver/80 transition-colors hover:text-gold md:hidden" aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 overflow-hidden md:hidden"
            style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}>
            {navLinks.map((link, i) => (
              <motion.a key={link.label} href={link.href}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setMobileOpen(false)}
                className="font-display text-sm tracking-[0.3em] text-silver/85 transition-colors hover:text-gold">
                {link.label}
              </motion.a>
            ))}
            <motion.a href="#contact"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setMobileOpen(false)}
              className="border border-gold/50 bg-gold/[0.07] px-8 py-3 font-display text-sm tracking-[0.3em] text-gold transition-colors hover:bg-gold/[0.18]">
              BOOK A CALL
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
