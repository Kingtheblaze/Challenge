"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CreditCard, LogOut, Trash2, Sparkles, User, Settings, ShieldAlert, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useSubscription } from "@/contexts/subscription-context"
import { toast } from "sonner"
import { motion } from "framer-motion"

interface ProfileClientProps {
  user: {
    id: string
    email: string
  }
}

export function ProfileClient({ user }: ProfileClientProps) {
  const { isPro, tier, downgradeToFree } = useSubscription()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isDowngrading, setIsDowngrading] = useState(false)
  const [showDowngradeDialog, setShowDowngradeDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await fetch("/api/auth/signout", { method: "POST" })
    } catch (error) {
      console.error("Logout error:", error)
    }
    window.location.href = "/"
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch("/api/account/delete", { method: "POST" })
      if (!response.ok) throw new Error("Failed to delete account")
      window.location.href = "/"
    } catch (error) {
      toast.error("Failed to delete account.")
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handleDowngrade = async () => {
    setIsDowngrading(true)
    try {
      await downgradeToFree()
      setShowDowngradeDialog(false)
      toast.success("Downgraded to Free plan.")
    } catch (error) {
      toast.error("Failed to downgrade.")
    } finally {
      setIsDowngrading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navigation />

      <main className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center"
              >
                <User className="w-10 h-10 text-primary" />
              </motion.div>
              <div className="space-y-1">
                <h1 className="text-5xl font-black tracking-tighter">Account <span className="text-gradient">Settings</span></h1>
                <p className="text-xl text-muted-foreground font-medium">{user.email}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="rounded-2xl font-black py-8 px-8 glass-card border-white/10 hover:bg-destructive/10 hover:text-destructive transition-all"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="w-5 h-5 mr-3" />
              {isLoggingOut ? "Signing out..." : "Sign Out"}
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Subscription Management */}
            <Card className="rounded-[2.5rem] glass-card border-white/5 overflow-hidden flex flex-col">
              <CardHeader className="p-10 border-b border-white/5 bg-white/5">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                  Subscription
                </CardTitle>
                <CardDescription className="text-base font-medium">Manage your plan and billing.</CardDescription>
              </CardHeader>
              <CardContent className="p-10 flex-1 space-y-8">
                <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5">
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Current Plan</p>
                    <p className="text-2xl font-black flex items-center gap-2">
                      {isPro ? (
                        <>
                          <Sparkles className="w-5 h-5 text-primary" />
                          Pro Creator
                        </>
                      ) : (
                        "Starter Free"
                      )}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${isPro ? 'bg-green-500/10 text-green-500' : 'bg-white/10 text-muted-foreground'}`}>
                    {isPro ? 'Active' : 'Basic'}
                  </div>
                </div>

                {isPro ? (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="text-sm font-bold opacity-70">Your pro benefits are active. Dominating the algorithm!</p>
                      <ul className="space-y-2">
                        {["Unlimited Analyses", "Elite Hooks", "Competitor Intel"].map(b => (
                          <li key={b} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                            <Zap className="w-3 h-3 text-primary fill-primary" /> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <AlertDialog open={showDowngradeDialog} onOpenChange={setShowDowngradeDialog}>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" className="text-muted-foreground font-bold hover:text-destructive transition-colors">
                          Cancel Subscription
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-[2rem] glass-card border-white/10">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-2xl font-black">Pause your growth?</AlertDialogTitle>
                          <AlertDialogDescription className="text-base font-medium">
                            Downgrading to Free will immediately limit your analysis depth and frequency. You'll lose access to elite hook data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl font-bold">Keep Pro</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) => { e.preventDefault(); handleDowngrade(); }}
                            disabled={isDowngrading}
                            className="rounded-xl font-bold bg-destructive text-white hover:bg-destructive/90"
                          >
                            {isDowngrading ? "Processing..." : "Confirm Downgrade"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-sm font-bold opacity-70">Upgrade now to unlock the full potential of your content.</p>
                    <Button size="xl" className="w-full rounded-2xl font-black py-8 shadow-2xl shadow-primary/30" asChild>
                      <Link href="/upgrade">Level Up to Pro</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="rounded-[2.5rem] glass-card border-white/5 overflow-hidden flex flex-col">
              <CardHeader className="p-10 border-b border-white/5 bg-white/5">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <Settings className="w-6 h-6 text-muted-foreground" />
                  System & Safety
                </CardTitle>
                <CardDescription className="text-base font-medium">Security and data management.</CardDescription>
              </CardHeader>
              <CardContent className="p-10 flex-1 space-y-8">
                <div className="space-y-4">
                   <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Account Data</h4>
                   <p className="text-sm font-medium leading-relaxed">
                     Your data is encrypted and stored securely. We never share your video content or analysis results with third parties.
                   </p>
                </div>

                <div className="pt-4 space-y-4">
                  <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start py-8 rounded-2xl border-destructive/20 text-destructive hover:bg-destructive/10 bg-transparent font-black transition-all"
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-5 h-5 mr-4" />
                        Delete Account Permanently
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-[2rem] glass-card border-destructive/20">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black flex items-center gap-3 text-destructive">
                          <ShieldAlert className="w-8 h-8" />
                          Final Warning
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-base font-medium space-y-4">
                          <p>This action is irreversible. All your analysis history, saved hooks, and subscription data will be wiped from our neural clusters.</p>
                          <p className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive font-black">
                            Are you absolutely sure?
                          </p>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl font-bold">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => { e.preventDefault(); handleDeleteAccount(); }}
                          disabled={isDeleting}
                          className="rounded-xl font-bold bg-destructive text-white hover:bg-destructive/90"
                        >
                          {isDeleting ? "Deleting..." : "Permanently Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
