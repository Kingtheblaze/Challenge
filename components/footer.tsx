"use client"

import Link from "next/link"
import { TrendingUp, Twitter, Instagram, Github } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="font-black tracking-tighter text-2xl">Go <span className="text-primary">Viral</span></span>
            </Link>
            <p className="text-muted-foreground font-medium max-w-sm">
              The ultimate AI arsenal for the next generation of content creators. 
              Master the algorithm and build your legacy.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Platform</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link href="/analyzer" className="text-muted-foreground hover:text-white transition-colors">Analyzer</Link></li>
              <li><Link href="/upgrade" className="text-muted-foreground hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">API Docs</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Legal</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm font-bold text-muted-foreground">
            © {currentYear} Go Viral AI. All rights reserved. Built for the Elite.
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            All Systems Operational
          </div>
        </div>
      </div>
    </footer>
  )
}
