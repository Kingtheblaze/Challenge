"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { ShieldCheck, CreditCard, Lock, Sparkles, Rocket } from "lucide-react"
import { useSubscription } from "@/contexts/subscription-context"
import { toast } from "sonner"

export default function CheckoutPage() {
  const router = useRouter()
  const { upgradeToPro } = useSubscription()
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    try {
      await upgradeToPro()
      toast.success("Payment Successful!", {
        description: "Your account has been upgraded to Pro Creator status."
      })
      router.push("/upgrade/success")
    } catch (error) {
      toast.error("Upgrade failed, but payment was simulated.")
      router.push("/upgrade/success") // Still redirect for demo purposes
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Order Summary */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl font-black tracking-tighter italic">Secure <span className="text-gradient">Checkout</span></h1>
              <p className="text-xl text-muted-foreground font-medium">Finalize your upgrade to unlock the full power of Go Viral Neural Models.</p>
            </motion.div>

            <Card className="rounded-[2.5rem] glass-card border-white/5 overflow-hidden">
              <CardHeader className="p-10 border-b border-white/5 bg-white/5">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-black flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-primary" /> Order Summary
                  </CardTitle>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Merchant: Go Viral AI Platform</span>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <div className="space-y-1">
                    <p className="text-lg font-black">Pro Creator Plan</p>
                    <p className="text-sm text-muted-foreground font-medium">Monthly Subscription</p>
                  </div>
                  <p className="text-2xl font-black">₹2,499.00</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-bold opacity-70">
                    <span>Subtotal</span>
                    <span>₹2,499.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold opacity-70">
                    <span>GST (0%)</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black pt-4 border-t border-white/5">
                    <span>Total Due</span>
                    <span className="text-primary">₹2,499.00</span>
                  </div>
                </div>

                {/* Business Details */}
                <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">Official Merchant Details</p>
                  <div className="grid grid-cols-2 gap-4 text-[11px] font-bold">
                    <div className="text-muted-foreground">Entity:</div>
                    <div>Go Viral AI Solutions</div>
                    <div className="text-muted-foreground">UPI ID:</div>
                    <div className="text-primary tracking-tight">goviral.ai@okaxis</div>
                    <div className="text-muted-foreground">Reg No:</div>
                    <div>GV-AI-IND-2024</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-6 opacity-50 px-6">
              <ShieldCheck className="w-10 h-10" />
              <div className="text-xs font-black uppercase tracking-widest leading-relaxed">
                SSL Secure Connection. Your data is encrypted and never stored on our servers.
              </div>
            </div>
          </div>

          {/* Right Side: Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-[2.5rem] glass-card border-primary/20 shadow-[0_0_50px_rgba(var(--primary-rgb),0.1)] overflow-hidden">
              <CardHeader className="p-10 border-b border-white/5">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-primary" /> Payment Method
                </CardTitle>
                <CardDescription className="text-base font-medium">Enter your payment details to activate Pro status.</CardDescription>
              </CardHeader>
              <CardContent className="p-10">
                <form onSubmit={handlePayment} className="space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="card-name" className="text-xs font-black uppercase tracking-widest text-primary">Cardholder Name</Label>
                    <Input id="card-name" placeholder="ALEX CREATOR" className="h-14 rounded-xl bg-white/5 border-white/10 px-6 font-bold" required />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="card-number" className="text-xs font-black uppercase tracking-widest text-primary">Card Number</Label>
                    <div className="relative">
                      <Input id="card-number" placeholder="4242 4242 4242 4242" className="h-14 rounded-xl bg-white/5 border-white/10 px-6 font-bold" required />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label htmlFor="exp" className="text-xs font-black uppercase tracking-widest text-primary">Expiry Date</Label>
                      <Input id="exp" placeholder="MM/YY" className="h-14 rounded-xl bg-white/5 border-white/10 px-6 font-bold" required />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="cvv" className="text-xs font-black uppercase tracking-widest text-primary">CVV</Label>
                      <div className="relative">
                        <Input id="cvv" placeholder="123" className="h-14 rounded-xl bg-white/5 border-white/10 px-6 font-bold" required />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      size="xl" 
                      className="w-full py-10 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 group"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing Encryption..." : "Complete Upgrade"}
                      <Rocket className="w-6 h-6 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                    <p className="text-center text-[10px] font-black text-muted-foreground mt-6 uppercase tracking-widest">
                      By clicking above, you agree to our terms of service and instant activation policy.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
