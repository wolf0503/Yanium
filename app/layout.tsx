import React from "react"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Cinzel, Cormorant_Garamond, Tenor_Sans } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cinzel" })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600"], style: ["italic"], variable: "--font-cormorant" })
const tenor = Tenor_Sans({ subsets: ["latin"], weight: ["400"], variable: "--font-tenor" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: "Yanium — Full-Stack AI & Product Engineering · Yerevan, Armenia",
  description: "Yanium builds web apps, mobile products, and AI automation systems for startups, businesses, and enterprise. Full-stack team. No gaps. Based in Yerevan, Armenia.",
  openGraph: {
    title: "Yanium — The Element Missing From Your Stack.",
    description: "Web · Mobile · AI Automation · DevOps · QA · Design. One team. Every layer. Yerevan, Armenia.",
  },
  keywords: ["AI automation company Armenia", "full-stack development Yerevan", "AI agents business", "Next.js development", "mobile app development", "product engineering", "DevOps Armenia"],
}
export const viewport: Viewport = { themeColor: "#050505" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${cinzel.variable} ${cormorant.variable} ${tenor.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
