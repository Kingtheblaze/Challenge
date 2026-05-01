"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Menu, X, Sparkles, TrendingUp, BarChart2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useSubscription } from "@/contexts/subscription-context"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const pathname = usePathname()
  const { user, isLoading } = useAuth()
  const { isPro } = useSubscription()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Analyzer", href: "/analyzer", icon: BarChart2 },
    { name: "Pricing", href: "/upgrade", icon: Sparkles },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="font-black tracking-tighter text-2xl">Go <span className="text-primary">Viral</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-black uppercase tracking-widest transition-all hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-foreground/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-6 w-px bg-white/10" />

            {!isLoading && (
              <div className="flex items-center gap-6">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className={`p-2 rounded-xl transition-all border ${
                        pathname === "/profile" 
                          ? "bg-primary/10 border-primary/20 text-primary" 
                          : "border-transparent hover:bg-white/5"
                      }`}
                    >
                      <User className="w-5 h-5" />
                    </Link>
                    {!isPro && (
                      <Button size="sm" className="rounded-xl font-black uppercase tracking-wider px-6" asChild>
                        <Link href="/upgrade">Go Pro</Link>
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="text-sm font-black uppercase tracking-widest hover:text-primary transition-colors">
                      Sign In
                    </Link>
                    <Button size="lg" className="rounded-xl font-black uppercase tracking-wider px-8 shadow-xl shadow-primary/20" asChild>
                      <Link href="/auth/signup">Join Now</Link>
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 rounded-xl bg-white/5 border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-white/5"
          >
            <div className="container mx-auto px-6 py-10 flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-2xl font-black tracking-tighter ${
                    pathname === link.href ? "text-primary" : "text-foreground/70"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px w-full bg-white/5" />
              {!isLoading && (
                <div className="flex flex-col gap-6">
                  {user ? (
                    <>
                      <Link
                        href="/profile"
                        className="text-2xl font-black tracking-tighter"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Button size="xl" className="w-full rounded-2xl font-black py-8" asChild>
                        <Link href="/upgrade">Upgrade to Pro</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className="text-2xl font-black tracking-tighter"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Button size="xl" className="w-full rounded-2xl font-black py-8 shadow-2xl shadow-primary/20" asChild>
                        <Link href="/auth/signup">Get Started</Link>
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
