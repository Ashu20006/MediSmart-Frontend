import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AIChatbot } from "@/components/chatbot/ai-chatbot"
import "./globals.css"

export const metadata: Metadata = {
  title: "MediSmart - Smart Healthcare System",
  description: "Premium healthcare platform for patients and doctors",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <AIChatbot />
        <Analytics />
      </body>
    </html>
  )
}
