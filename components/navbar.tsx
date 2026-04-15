"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "SIGNAL",     href: "#terminal" },
  { label: "PHILOSOPHY", href: "#philosophy" },
  { label: "SERVICES",   href: "#services" },
  { label: "STANDARD",   href: "#comparison" },
  { label: "VENTURES",   href: "#ventures" },
  { label: "MANIFESTO",  href: "#manifesto" },
  { label: "THE GATE",   href: "#contact" },
]

function YnLogo() {
  return (
    <a href="#hero" className="group flex items-center gap-3">
      <div className="relative flex h-9 w-9 shrink-0 flex-col items-center justify-center border border-gold/55 bg-gold/8 transition-all duration-500 group-hover:border-gold group-hover:bg-gold/15"
        style={{ boxShadow: "0 0 12px rgba(212,175,55,0.1)" }}>
        <span className="pointer-events-none absolute -left-[2px] -top-[2px] h-2 w-2 border-l border-t border-gold" />
        <span className="pointer-events-none absolute -bottom-[2px] -right-[2px] h-2 w-2 border-b border-r border-gold" />
        <span className="font-display absolute left-[4px] top-[3px] text-[6px] leading-none text-gold/60">71</span>
        <span className="font-display text-base font-bold leading-none text-gold">Yn</span>
        <span className="font-display text-[5px] leading-none text-gold/60">288.07</span>
      </div>
      <span className="font-display text-xl tracking-[0.25em] text-silver transition-colors duration-300 group-hover:text-gold">YANIUM</span>
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
            ? "border-b border-gold/15 py-3 shadow-[0_4px_32px_rgba(0,0,0,0.7)]"
            : "py-5"
        }`}
        style={{
          background: scrolled
            ? "rgba(5,5,5,0.92)"
            : "rgba(5,5,5,0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <YnLogo />
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(link => (
              <a key={link.label} href={link.href}
                className="group relative font-display text-[10px] tracking-[0.25em] text-silver/80 transition-colors duration-300 hover:text-gold">
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
