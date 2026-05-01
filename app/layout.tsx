import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { SubscriptionProvider } from "@/contexts/subscription-context"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Go Viral | AI-Powered Content Virality Analyzer",
  description: "Predict your content's success with AI. Analyze hooks, captions, and trends to maximize your reach on TikTok, Reels, and YouTube Shorts.",
  keywords: ["AI", "Virality", "Content Creator", "TikTok", "Reels", "Shorts", "Social Media Marketing"],
  authors: [{ name: "Go Viral AI Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased selection:bg-primary/30 selection:text-primary`}>
        <AuthProvider>
          <SubscriptionProvider>
            {children}
            <Toaster position="top-center" expand={true} richColors />
          </SubscriptionProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
