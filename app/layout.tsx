import React from "react"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Cinzel, Cormorant_Garamond, Tenor_Sans } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cinzel" })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600"], style: ["italic"], variable: "--font-cormorant" })
const tenor = Tenor_Sans({ subsets: ["latin"], weight: ["400"], variable: "--font-tenor" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: "Yanium | Velocity of Intelligence",
  description: "Premium AI-native development. Built for those who refuse to wait.",
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
