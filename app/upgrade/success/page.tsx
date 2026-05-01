"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle, Sparkles, Rocket, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function UpgradeSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-6 py-24 relative overflow-hidden">
        {/* Confetti-like background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-[20%] left-[20%] w-4 h-4 bg-primary rounded-full"
          />
          <motion.div 
            animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute top-[30%] right-[25%] w-3 h-3 bg-accent rounded-full"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center space-y-10 relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4" />
            Elite Status Confirmed
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
              Welcome to the <span className="text-gradient">Pro Circle</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto">
              Your account has been upgraded to Pro Creator. You now have unlimited neural analysis cycles.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex justify-center"
          >
            <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 shadow-2xl relative group">
              <div className="absolute inset-0 bg-primary/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <CheckCircle className="w-24 h-24 text-primary relative z-10" />
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
            <Button size="xl" className="rounded-2xl px-12 py-8 font-black text-lg gap-3 shadow-2xl shadow-primary/30 group" asChild>
              <Link href="/analyzer">
                <Rocket className="w-6 h-6" />
                Go to Analyzer
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="rounded-2xl px-12 py-8 font-black text-lg glass-card border-white/10" asChild>
              <Link href="/profile">View My Dashboard</Link>
            </Button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
