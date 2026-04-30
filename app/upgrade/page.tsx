"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles, Zap, Shield, TrendingUp, Search, MessageSquare } from "lucide-react"
import { useSubscription } from "@/contexts/subscription-context"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

export default function UpgradePage() {
  const { isPro, tier, upgradeToPro, downgradeToFree, isLoading: subLoading } = useSubscription()
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
      await upgradeToPro()
      toast.success("Welcome to Pro! You now have access to all features.")
      router.push("/upgrade/success")
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

  // Show current subscription if Pro
  if (isPro && !subLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center px-4 py-16 min-h-[calc(100vh-80px)]">
          <div className="max-w-2xl w-full">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="mb-6 flex justify-center">
                <CheckCircle className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-5xl font-light tracking-tight mb-4">
                You're a <span className="font-semibold text-primary">Pro</span> Creator
              </h1>
              <p className="text-xl text-muted-foreground font-light">
                Thank you for upgrading! You have unlimited access to Go Viral's AI models.
              </p>
            </div>

            {/* Current Plan Card */}
            <div className="border-2 border-primary rounded-2xl p-8 bg-card/50 mb-8 shadow-xl shadow-primary/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-primary font-medium mb-1">Current Plan</div>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Pro Creator Plan
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Status</div>
                  <div className="font-medium text-green-500">Active</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-medium mb-3">Your Pro benefits:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Unlimited virality analyses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Deep hook & pacing analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Competitor content comparison
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Priority processing for video uploads
                  </li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/analyzer">Go to Analyzer</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleDowngrade}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Downgrade to Free"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show pricing for free users
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex items-center justify-center px-4 py-16 min-h-[calc(100vh-80px)]">
        <div className="max-w-5xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold tracking-tight mb-4">
              Scale Your <span className="text-primary italic">Reach</span>
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Choose the plan that's right for your content strategy. Unlock the full power of Go Viral.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Free Plan */}
            <div className="border border-border rounded-[2rem] p-10 bg-card/50 transition-all hover:bg-card/80">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-muted-foreground mb-4">Starter</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black">$0</span>
                  <span className="text-muted-foreground font-medium">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-muted-foreground font-medium">
                  <CheckCircle className="w-5 h-5 text-muted-foreground/30" />
                  3 analyses per month
                </li>
                <li className="flex items-center gap-3 text-muted-foreground font-medium">
                  <CheckCircle className="w-5 h-5 text-muted-foreground/30" />
                  Basic virality score
                </li>
                <li className="flex items-center gap-3 text-muted-foreground font-medium">
                  <CheckCircle className="w-5 h-5 text-muted-foreground/30" />
                  Standard analysis speed
                </li>
                <li className="flex items-center gap-3 text-muted-foreground font-medium opacity-50">
                  <Shield className="w-5 h-5" />
                  No hook analysis
                </li>
              </ul>

              <Button variant="outline" className="w-full py-6 rounded-xl" disabled>
                Current Plan
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="relative border-2 border-primary rounded-[2rem] p-10 bg-card/80 shadow-2xl shadow-primary/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                Most Popular
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Pro Creator
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black">$29</span>
                  <span className="text-muted-foreground font-medium">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-bold">
                  <Zap className="w-5 h-5 text-primary fill-primary/20" />
                  Unlimited virality analyses
                </li>
                <li className="flex items-center gap-3 font-bold">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Deep hook & pacing analysis
                </li>
                <li className="flex items-center gap-3 font-bold">
                  <Search className="w-5 h-5 text-primary" />
                  Competitor content comparison
                </li>
                <li className="flex items-center gap-3 font-bold">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Smart caption & hashtag generator
                </li>
              </ul>

              <Button
                className="w-full py-6 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                size="lg"
                onClick={handleUpgrade}
                disabled={isProcessing || authLoading || subLoading}
              >
                {isProcessing ? "Processing..." : "Upgrade to Pro"}
              </Button>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground font-medium">This is a demo. No real payment is processed.</p>
            <div className="flex justify-center gap-8 opacity-50 grayscale">
              <Shield className="w-8 h-8" />
              <CheckCircle className="w-8 h-8" />
              <Zap className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
