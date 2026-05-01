"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Upload, 
  Sparkles, 
  Zap, 
  BarChart3, 
  MessageCircle, 
  Timer, 
  Flame,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Search,
  RefreshCw,
  Eye,
  Activity
} from "lucide-react"
import { toast } from "sonner"

export default function AnalyzerPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [step, setStep] = useState(0)

  const steps = [
    "Extracting frames...",
    "Analyzing hook sequence...",
    "Evaluating caption engagement...",
    "Comparing with trending content...",
    "Generating virality report..."
  ]

  useEffect(() => {
    let interval: any
    if (isAnalyzing && step < steps.length) {
      interval = setInterval(() => {
        setStep(prev => prev + 1)
      }, 800)
    } else if (step === steps.length) {
      setTimeout(() => {
        setIsAnalyzing(false)
        setShowResults(true)
        setScore(88)
        toast.success("Analysis Complete!", {
          description: "Your content has elite viral potential."
        })
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isAnalyzing, step])

  const handleAnalyze = () => {
    setStep(0)
    setIsAnalyzing(true)
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navigation />
      
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-2"
            >
              <Activity className="w-8 h-8" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black tracking-tighter"
            >
              Neural <span className="text-gradient">Analyzer</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium"
            >
              Harness the power of billion-parameter models to dissect your content and dominate social feeds.
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {!showResults && !isAnalyzing ? (
              <motion.div 
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid lg:grid-cols-3 gap-10 items-start"
              >
                <Card className="lg:col-span-2 border-dashed border-2 bg-card/20 hover:bg-primary/5 transition-all cursor-pointer group rounded-[2.5rem] overflow-hidden">
                  <CardContent className="p-20 flex flex-col items-center justify-center space-y-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center relative z-10"
                    >
                      <Upload className="w-12 h-12 text-primary" />
                    </motion.div>
                    <div className="space-y-3 relative z-10">
                      <h3 className="text-3xl font-black tracking-tight">Drop your masterpiece</h3>
                      <p className="text-lg text-muted-foreground font-medium">MP4, MOV or WebM. Max 1GB.</p>
                    </div>
                    <Button size="xl" variant="secondary" className="px-12 rounded-2xl font-bold relative z-10">Select File</Button>
                  </CardContent>
                </Card>

                <div className="space-y-8">
                  <Card className="rounded-[2rem] glass-card border-white/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl font-black">
                        <Sparkles className="w-6 h-6 text-primary" />
                        Parameters
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                          <span>Target Platform</span>
                        </div>
                        <div className="flex gap-2 p-1 bg-secondary/50 rounded-xl">
                          {['TikTok', 'Reels', 'Shorts'].map(p => (
                            <button key={p} className={`flex-1 py-3 text-xs font-black rounded-lg transition-all ${p === 'TikTok' ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/5'}`}>
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                          <span>Analysis Depth</span>
                          <span className="text-primary">ULTRA</span>
                        </div>
                        <Slider defaultValue={[90]} max={100} step={1} className="py-2" />
                      </div>
                      <Button 
                        size="xl"
                        className="w-full py-8 text-xl font-black rounded-2xl shadow-xl shadow-primary/30" 
                        onClick={handleAnalyze}
                      >
                        Launch Analysis
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ) : isAnalyzing ? (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center space-y-12 py-20"
              >
                <div className="relative w-40 h-40">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-16 h-16 text-primary animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-black tracking-tight">{steps[step] || "Finalizing..."}</h3>
                  <div className="w-80 h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(step / steps.length) * 100}%` }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="grid md:grid-cols-3 gap-10">
                  {/* Main Score Card */}
                  <Card className="md:col-span-1 glass-card border-primary/30 shadow-[0_0_50px_rgba(var(--primary-rgb),0.15)] rounded-[3rem] overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                    <CardHeader className="text-center relative z-10 pt-10">
                      <CardTitle className="text-sm font-black uppercase tracking-[0.3em] text-primary">Viral Probability</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center pb-12 relative z-10">
                      <div className="relative w-56 h-56 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="112" cy="112" r="95" fill="none" stroke="currentColor" strokeWidth="15" className="text-white/5" />
                          <motion.circle
                            cx="112" cy="112" r="95" fill="none" stroke="currentColor" strokeWidth="15"
                            strokeDasharray={596.6}
                            initial={{ strokeDashoffset: 596.6 }}
                            animate={{ strokeDashoffset: 596.6 * (1 - score / 100) }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                            strokeLinecap="round"
                            className="text-primary"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, type: "spring" }}
                            className="text-8xl font-black tracking-tighter"
                          >
                            {score}
                          </motion.span>
                          <span className="text-xs font-black tracking-[0.4em] text-primary/80">PREMIUM</span>
                        </div>
                      </div>
                      <div className="mt-8 px-6 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-xs font-black uppercase tracking-widest mb-4">
                          <ShieldCheck className="w-4 h-4" /> High Confidence
                        </div>
                        <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                          Your content aligns with 94% of top-performing videos in your category.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Breakdown Cards */}
                  <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
                    {[
                      { icon: Timer, label: "Hook Retention", value: 96, color: "text-cyan-500", desc: "First 2.4s are visually arresting." },
                      { icon: MessageCircle, label: "CTA Strength", value: 72, color: "text-purple-500", desc: "Solid CTA, but try positioning it earlier." },
                      { icon: Eye, label: "Visual Clarity", value: 89, color: "text-emerald-500", desc: "Excellent contrast and subject focus." },
                      { icon: Flame, label: "Trend Velocity", value: 91, color: "text-orange-500", desc: "Perfectly timed with #trending audio." },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      >
                        <Card className="glass-card h-full hover:bg-white/[0.07] transition-all border-white/5 rounded-[2rem]">
                          <CardContent className="p-8 space-y-6">
                            <div className="flex justify-between items-center">
                              <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} border border-white/5 shadow-xl`}>
                                <stat.icon className="w-6 h-6" />
                              </div>
                              <span className="text-3xl font-black">{stat.value}%</span>
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-lg font-black tracking-tight">{stat.label}</h4>
                              <Progress value={stat.value} className="h-3 rounded-full bg-white/5" />
                              <p className="text-sm text-muted-foreground font-medium pt-2">{stat.desc}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="grid lg:grid-cols-2 gap-10 pt-8">
                   <Card className="rounded-[2.5rem] glass-card border-green-500/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-3 text-2xl font-black">
                        <CheckCircle2 className="w-7 h-7 text-green-500" />
                        Winning Attributes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4">
                      {[
                        "Elite frame composition: 1/3 grid rule followed perfectly.",
                        "Dynamic lighting: High subject-to-background contrast found.",
                        "Audio sync: Key visual cuts occur exactly on beat drops.",
                        "Text accessibility: High readability score for mobile screens."
                      ].map((item, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                          key={i} 
                          className="flex gap-4 p-4 rounded-2xl bg-green-500/5 border border-green-500/10 text-sm font-bold"
                        >
                          <div className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                          {item}
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="rounded-[2.5rem] glass-card border-orange-500/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-3 text-2xl font-black">
                        <AlertCircle className="w-7 h-7 text-orange-500" />
                        Critical Optimizations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4">
                      {[
                        "Move the main caption 20px higher to avoid UI occlusion.",
                        "Brighten the final 5 seconds to maintain viewer energy.",
                        "Use high-velocity transitions between 00:04 and 00:08.",
                        "Incorporate the 'Viral Red' highlight in your first text overlay."
                      ].map((item, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                          key={i} 
                          className="flex gap-4 p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 text-sm font-bold"
                        >
                          <div className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                          {item}
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-6 pt-12">
                  <Button size="xl" className="rounded-2xl px-12 py-8 font-black gap-3 shadow-2xl shadow-primary/30" onClick={() => setShowResults(false)}>
                    <RefreshCw className="w-6 h-6" />
                    New Analysis
                  </Button>
                  <Button size="xl" variant="outline" className="rounded-2xl px-12 py-8 font-black gap-3 glass-card border-white/10" asChild>
                    <Link href="/upgrade">
                      <Sparkles className="w-6 h-6 text-primary" />
                      Get Pro Reports
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  )
}
