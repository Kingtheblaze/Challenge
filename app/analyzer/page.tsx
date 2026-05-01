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
  Activity,
  Link as LinkIcon,
  Type,
  FileVideo
} from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyzerPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [step, setStep] = useState(0)
  
  // Input states
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [activeTab, setActiveTab] = useState("upload")
  const [platform, setPlatform] = useState("tiktok")

  const steps = [
    "Extracting video data...",
    `Dissecting ${platform} specific patterns...`,
    "Processing title engagement...",
    "Scanning visual hooks...",
    "Generating virality report..."
  ]

  // Mock result data generation
  const [dynamicResults, setDynamicResults] = useState<any>(null)

  const generateResults = () => {
    const isUrl = activeTab === "url"
    const hasLongTitle = title.length > 20
    
    const platformIntel: any = {
      tiktok: { hook: "Sound-sync alignment", growth: "High potential in 'For You' feed", advice: "Use trending audio overlays." },
      reels: { hook: "Visual transition speed", growth: "Strong Instagram Explore reach", advice: "Ensure 4:5 safe zones are clear." },
      shorts: { hook: "First 3-second retention", growth: "YouTube Algorithm favoritism", advice: "Loop the video for 'infinite' watch time." },
      video: { hook: "Storytelling arc", growth: "Steady long-term growth", advice: "Optimize thumbnail contrast." }
    }

    const intel = platformIntel[platform]

    setDynamicResults({
      score: 85 + Math.floor(Math.random() * 10),
      metrics: [
        { label: "Hook Strength", value: hasLongTitle ? 92 : 78, icon: Zap },
        { label: "Trend Velocity", value: isUrl ? 95 : 82, icon: Flame },
        { label: "Retention Floor", value: 88, icon: Timer },
        { label: "Viral Probability", value: 91, icon: BarChart3 }
      ],
      wins: [
        `Elite ${intel.hook} detected.`,
        "Color grading matches high-performing benchmarks.",
        `Strong alignment with ${platform} engagement signals.`
      ],
      fixes: [
        intel.advice,
        hasLongTitle ? "Shorten title to increase curiosity." : "Add more power words to your title.",
        "Increase contrast in the first 2 seconds."
      ]
    })
  }

  useEffect(() => {
    let interval: any
    if (isAnalyzing && step < steps.length) {
      interval = setInterval(() => {
        setStep(prev => prev + 1)
      }, 800)
    } else if (step === steps.length) {
      setTimeout(() => {
        generateResults()
        setIsAnalyzing(false)
        setShowResults(true)
        toast.success("Analysis Complete!", {
          description: `Personalized report for your ${platform} content is ready.`
        })
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isAnalyzing, step, platform])

  const handleAnalyze = () => {
    if (!title) {
      toast.error("Please enter a video title")
      return
    }
    if (activeTab === "upload" && !file) {
      toast.error("Please upload a video file")
      return
    }
    if (activeTab === "url" && !url) {
      toast.error("Please enter a video URL")
      return
    }

    setStep(0)
    setIsAnalyzing(true)
    setShowResults(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      toast.success(`Selected: ${e.target.files[0].name}`)
    }
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
              Select your platform and enter details for a custom-tuned virality scan.
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
                <div className="lg:col-span-2 space-y-10">
                  {/* Platform Selection */}
                  <div className="space-y-4">
                    <Label className="text-sm font-black uppercase tracking-widest text-primary">Target Platform</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["tiktok", "reels", "shorts", "video"].map((p) => (
                        <button
                          key={p}
                          onClick={() => setPlatform(p)}
                          className={`p-4 rounded-2xl border-2 transition-all font-black uppercase tracking-widest text-[10px] ${
                            platform === p 
                              ? "bg-primary border-primary text-white shadow-lg shadow-primary/30" 
                              : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title Input */}
                  <div className="space-y-4">
                    <Label htmlFor="title" className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <Type className="w-4 h-4" /> Video Title
                    </Label>
                    <Input 
                      id="title"
                      placeholder="Enter a catchy title for your video..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="h-16 rounded-2xl bg-white/5 border-white/10 px-8 text-xl font-bold focus:ring-primary/50"
                    />
                  </div>

                  {/* Multi-modal Tabs */}
                  <Tabs defaultValue="upload" onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-16 rounded-2xl bg-white/5 p-1 border border-white/10">
                      <TabsTrigger value="upload" className="rounded-xl font-black uppercase tracking-widest text-xs data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                        <FileVideo className="w-4 h-4 mr-2" /> Upload Video
                      </TabsTrigger>
                      <TabsTrigger value="url" className="rounded-xl font-black uppercase tracking-widest text-xs data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                        <LinkIcon className="w-4 h-4 mr-2" /> Paste URL
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="mt-6">
                      <Card className="border-dashed border-2 bg-card/20 hover:bg-primary/5 transition-all cursor-pointer group rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-16 flex flex-col items-center justify-center space-y-6 text-center relative">
                          <input 
                            type="file" 
                            accept="video/*" 
                            className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                            onChange={handleFileChange}
                          />
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center relative z-10"
                          >
                            <Upload className={`w-10 h-10 ${file ? 'text-green-500' : 'text-primary'}`} />
                          </motion.div>
                          <div className="space-y-2 relative z-10">
                            <h3 className="text-2xl font-black tracking-tight">
                              {file ? file.name : "Select your video file"}
                            </h3>
                            <p className="text-sm text-muted-foreground font-medium">MP4, MOV or WebM. Max 1GB.</p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="url" className="mt-6">
                      <div className="space-y-4">
                        <Label htmlFor="url" className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                          <LinkIcon className="w-4 h-4" /> Content URL
                        </Label>
                        <Input 
                          id="url"
                          placeholder="Paste TikTok, Reels, or YouTube URL..."
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="h-16 rounded-2xl bg-white/5 border-white/10 px-8 text-xl font-bold focus:ring-primary/50"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10"
              >
                {/* Result Header */}
                <div className="flex flex-col md:flex-row gap-10 items-center bg-card/40 backdrop-blur-xl border border-white/5 p-12 rounded-[3rem]">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="12" className="text-white/5" />
                      <motion.circle 
                        cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="12" 
                        strokeDasharray="552.92"
                        initial={{ strokeDashoffset: 552.92 }}
                        animate={{ strokeDashoffset: 552.92 - (552.92 * (dynamicResults?.score || 0)) / 100 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="text-primary"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-6xl font-black tracking-tighter">{dynamicResults?.score || 0}</span>
                      <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Virality</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-6 text-center md:text-left">
                    <div className="space-y-2">
                      <div className="text-sm font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" /> Report for: {title || "Untitled Content"}
                      </div>
                      <h2 className="text-4xl font-black tracking-tighter italic">Viral Apex Detected</h2>
                      <p className="text-lg text-muted-foreground font-medium">Your content has matched {dynamicResults?.score || 0}% of top-performing {platform} signals in your niche.</p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-black uppercase tracking-widest">High Retention</div>
                      <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">Elite Hook</div>
                      <div className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest">Ready to Scale</div>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid md:grid-cols-4 gap-6">
                  {dynamicResults?.metrics.map((metric: any, i: number) => (
                    <motion.div 
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 rounded-[2rem] glass-card border-white/5 space-y-4"
                    >
                      <metric.icon className="w-8 h-8 text-primary" />
                      <div className="space-y-1">
                        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">{metric.label}</p>
                        <p className="text-3xl font-black">{metric.value}%</p>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                  {/* Wins */}
                  <Card className="rounded-[2.5rem] glass-card border-white/5 overflow-hidden">
                    <CardHeader className="p-10 border-b border-white/5 bg-white/5">
                      <CardTitle className="text-2xl font-black flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500" /> Winning Attributes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 space-y-6">
                      {dynamicResults?.wins.map((win: string, i: number) => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-green-500/5 border border-green-500/10 text-sm font-bold items-start leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                          {win}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Fixes */}
                  <Card className="rounded-[2.5rem] glass-card border-white/5 overflow-hidden">
                    <CardHeader className="p-10 border-b border-white/5 bg-white/5">
                      <CardTitle className="text-2xl font-black flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-primary" /> Critical Optimizations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 space-y-6">
                      {dynamicResults?.fixes.map((fix: string, i: number) => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 text-sm font-bold items-start leading-relaxed">
                          <AlertCircle className="w-5 h-5 text-primary shrink-0" />
                          {fix}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col md:flex-row gap-6 pt-10">
                  <Button size="xl" className="flex-1 py-10 rounded-3xl font-black text-xl shadow-2xl shadow-primary/30 group" asChild>
                    <Link href="/upgrade">
                      Master the Algorithm
                      <Sparkles className="w-6 h-6 ml-3 group-hover:scale-125 transition-transform" />
                    </Link>
                  </Button>
                  <Button 
                    size="xl" 
                    variant="outline" 
                    className="flex-1 py-10 rounded-3xl font-black text-xl glass-card border-white/10 hover:bg-white/5 transition-all"
                    onClick={() => { setShowResults(false); setStep(0); }}
                  >
                    Analyze Another Video
                    <RefreshCw className="w-6 h-6 ml-3" />
                  </Button>
                </div>
              </motion.div>
            )
}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  )
}
