import React from "react";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL("https://yanium.com"),
  title: "Yanium — Full-Stack AI & Product Engineering · Yerevan, Armenia",
  description:
    "Yanium builds web apps, mobile products, and AI automation systems for startups, businesses, and enterprise. Full-stack team. No gaps. Based in Yerevan, Armenia.",
  openGraph: {
    title: "Yanium — The Element Missing From Your Stack.",
    description:
      "Web · Mobile · AI Automation · DevOps · QA · Design. One team. Every layer. Yerevan, Armenia.",
    images: [{ url: "/logo-icon.png", width: 1080, height: 1080, alt: "Yanium" }],
  },
  icons: {
    icon: "/logo-icon.png",
    apple: "/logo-icon.png",
    shortcut: "/logo-icon.png",
  },
  keywords: [
    "AI automation company Armenia",
    "full-stack development Yerevan",
    "AI agents business",
    "Next.js development",
    "mobile app development",
    "product engineering",
    "DevOps Armenia",
  ],
};
export const viewport: Viewport = { themeColor: "#050505", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,300,400,500,600,700&display=swap"
        />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
