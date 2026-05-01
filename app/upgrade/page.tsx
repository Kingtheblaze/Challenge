"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Check, Zap, Sparkles, Star, Shield, Rocket, ArrowRight, TrendingUp, Search, MessageSquare, CheckCircle } from "lucide-react"
import { useSubscription } from "@/contexts/subscription-context"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function UpgradePage() {
  const { isPro, upgradeToPro, downgradeToFree, isLoading: subLoading } = useSubscription()
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleUpgrade = async () => {
    if (!user) {
      router.push("/auth/signup?returnUrl=/upgrade")
      return
    }

    setIsProcessing(true)
    try {
      router.push("/checkout")
    } catch (error) {
      toast.error("Failed to upgrade. Please try again.")
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDowngrade = async () => {
    setIsProcessing(true)
    try {
      await downgradeToFree()
      toast.success("You've been downgraded to the Free plan.")
    } catch (error) {
      toast.error("Failed to downgrade. Please try again.")
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (isPro && !subLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        <Navigation />
        <main className="container mx-auto px-6 py-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center"
              >
                <div className="p-6 rounded-full bg-primary/10 border border-primary/20">
                  <CheckCircle className="w-16 h-16 text-primary" />
                </div>
              </motion.div>
              <h1 className="text-5xl font-black tracking-tighter">
                You're a <span className="text-gradient">Pro</span> Creator
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                Thank you for being part of the elite circle. You have full access to our neural models.
              </p>
            </div>

            <Card className="rounded-[2.5rem] glass-card border-primary/50 shadow-[0_0_50px_rgba(var(--primary-rgb),0.1)] overflow-hidden">
              <CardHeader className="p-10 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-primary">Current Status</p>
                    <CardTitle className="text-3xl font-black flex items-center gap-3">
                      <TrendingUp className="w-6 h-6" />
                      Pro Creator Plan
                    </CardTitle>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-xs font-black uppercase tracking-widest">
                    Active
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Premium Benefits Active:</h4>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Unlimited Analyses",
                    "Elite Hook Breakdown",
                    "Competitor Intel",
                    "Smart Caption Gen",
                    "Priority Processing",
                    "Direct Support"
                  ].map(benefit => (
                    <li key={benefit} className="flex items-center gap-3 text-sm font-bold">
                      <Check className="w-4 h-4 text-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-10 bg-white/5 flex flex-col sm:flex-row gap-4">
                <Button size="xl" className="flex-1 rounded-2xl font-black py-8" asChild>
                  <Link href="/analyzer">Back to Analyzer</Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="flex-1 rounded-2xl font-black py-8 glass-card border-white/10 hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={handleDowngrade}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Downgrade Plan"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navigation />
      
      <main className="container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-black uppercase tracking-widest"
            >
              <Star className="w-4 h-4 fill-primary" />
              Scale Your Reach
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black tracking-tighter"
            >
              Dominate the <span className="text-gradient">Algorithm</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium"
            >
              Choose the plan that fits your ambition. From solo creators to global agencies.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="h-full flex flex-col rounded-[2.5rem] glass-card border-white/10 transition-all hover:scale-[1.02]">
                <CardHeader className="p-10 space-y-4">
                  <div className="space-y-1">
                    <CardTitle className="text-3xl font-black tracking-tight text-muted-foreground">Starter</CardTitle>
                    <CardDescription className="text-base font-medium">Perfect for testing the waters.</CardDescription>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black">₹0</span>
                    <span className="text-xl text-muted-foreground font-bold">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="px-10 flex-1 space-y-5">
                  {[
                    "3 Analyses per month",
                    "Basic Virality Score",
                    "Standard Speed",
                    "Community Access"
                  ].map(f => (
                    <div key={f} className="flex items-center gap-4 text-sm font-bold opacity-70">
                      <Check className="w-4 h-4 text-muted-foreground" /> {f}
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="p-10">
                  <Button size="xl" variant="outline" className="w-full py-8 text-lg font-black rounded-2xl cursor-default opacity-50">Current Plan</Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Pro Plan */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-xl">
                  Most Popular
                </div>
              </div>
              <Card className="h-full flex flex-col rounded-[2.5rem] glass-card border-primary/50 shadow-[0_0_40px_rgba(var(--primary-rgb),0.2)] transition-all hover:scale-[1.02]">
                <CardHeader className="p-10 space-y-4">
                  <div className="space-y-1">
                    <CardTitle className="text-3xl font-black tracking-tight flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-primary" />
                      Pro Creator
                    </CardTitle>
                    <CardDescription className="text-base font-medium">Everything you need to dominate.</CardDescription>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black">₹2,499</span>
                    <span className="text-xl text-muted-foreground font-bold">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="px-10 flex-1 space-y-5">
                  {[
                    "Unlimited Analyses",
                    "Elite Hook Breakdown",
                    "Competitor Intel",
                    "Viral Trend Alerts",
                    "Priority Processing",
                    "Custom AI Tuning"
                  ].map(f => (
                    <div key={f} className="flex items-center gap-4 text-sm font-bold">
                      <Zap className="w-4 h-4 text-primary fill-primary/20" /> {f}
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="p-10">
                  <Button 
                    size="xl" 
                    className="w-full py-8 text-lg font-black rounded-2xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 group"
                    onClick={handleUpgrade}
                    disabled={isProcessing || authLoading || subLoading}
                  >
                    {isProcessing ? "Processing..." : "Level Up Now"}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Agency Plan */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="h-full flex flex-col rounded-[2.5rem] glass-card border-white/10 transition-all hover:scale-[1.02]">
                <CardHeader className="p-10 space-y-4">
                  <div className="space-y-1">
                    <CardTitle className="text-3xl font-black tracking-tight text-white">Agency</CardTitle>
                    <CardDescription className="text-base font-medium">Scale your empire.</CardDescription>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black">₹8,999</span>
                    <span className="text-xl text-muted-foreground font-bold">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="px-10 flex-1 space-y-5">
                  {[
                    "10 Team Seats",
                    "API Access",
                    "White-label Reports",
                    "Dedicated Manager",
                    "Bulk Analysis",
                    "Early Feature Access"
                  ].map(f => (
                    <div key={f} className="flex items-center gap-4 text-sm font-bold">
                      <Star className="w-4 h-4 text-accent" /> {f}
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="p-10">
                  <Button size="xl" variant="outline" className="w-full py-8 text-lg font-black rounded-2xl glass-card border-white/10">Contact Sales</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>

          <div className="pt-10 flex flex-wrap justify-center gap-10 opacity-50 grayscale">
            <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest"><Shield className="w-5 h-5" /> Secure Checkout</div>
            <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest"><Rocket className="w-5 h-5" /> Instant Activation</div>
            <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest"><Zap className="w-5 h-5" /> 24/7 Priority Support</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
