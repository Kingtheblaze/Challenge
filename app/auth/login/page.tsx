"use client"

import type React from "react"
import { supabase } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Sparkles, ArrowRight, Github } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [returnUrl, setReturnUrl] = useState<string | null>(null)
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setReturnUrl(params.get('returnUrl'))
    }
  }, [])

  useEffect(() => {
    if (!authLoading && user) {
      const destination = returnUrl || "/"
      router.push(destination)
    }
  }, [user, authLoading, returnUrl, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      window.location.href = returnUrl || "/"
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-accent/10 blur-[100px] rounded-full animate-pulse" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl relative z-10"
        >
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              Creator Authentication
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">Welcome <span className="text-gradient">Back</span></h1>
            <p className="text-lg text-muted-foreground font-medium">Continue your journey to the trending page.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="p-10 rounded-[3rem] glass-card border-white/5 shadow-2xl"
          >
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="creator@goviral.ai"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 rounded-xl bg-white/5 border-white/10 px-6 font-bold focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password</Label>
                    <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 rounded-xl bg-white/5 border-white/10 px-6 font-bold"
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-sm font-bold text-destructive"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-4">
                <Button 
                  type="submit" 
                  size="xl" 
                  className="w-full h-16 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 group" 
                  disabled={isLoading}
                >
                  {isLoading ? "Synchronizing..." : "Sign In to Dashboard"}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <div className="flex items-center gap-4 py-2">
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">or</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <Button variant="outline" size="xl" className="w-full h-16 rounded-2xl font-black glass-card border-white/10" disabled>
                  <Github className="w-5 h-5 mr-3" />
                  Continue with GitHub
                </Button>
              </div>

              <p className="text-center text-sm font-bold text-muted-foreground">
                New to Go Viral?{" "}
                <Link
                  href={returnUrl ? `/auth/signup?returnUrl=${encodeURIComponent(returnUrl)}` : "/auth/signup"}
                  className="text-primary hover:underline"
                >
                  Create Creator Account
                </Link>
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
