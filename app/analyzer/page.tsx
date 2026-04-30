"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
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
  ArrowRight
} from "lucide-react"
import { toast } from "sonner"

export default function AnalyzerPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
      setScore(84)
      toast.success("Analysis complete!")
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Virality Analyzer</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your content and let our AI models predict its performance across social platforms.
            </p>
          </div>

          {!showResults ? (
            /* Upload Section */
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <Card className="lg:col-span-2 border-dashed border-2 bg-card/30 hover:bg-card/50 transition-colors cursor-pointer group">
                <CardContent className="p-16 flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Drag & Drop your video</h3>
                    <p className="text-muted-foreground">MP4, MOV or WebM. Max 100MB.</p>
                  </div>
                  <Button size="lg" variant="secondary" className="px-8">Select File</Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Analysis Parameters
                    </CardTitle>
                    <CardDescription>Configure how AI analyzes your content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Platform Target</span>
                        <span className="text-primary">TikTok/Reels</span>
                      </div>
                      <div className="flex gap-2">
                        {['TikTok', 'Reels', 'Shorts'].map(p => (
                          <div key={p} className="flex-1 text-center py-2 text-xs rounded-md bg-secondary border border-border">
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Analysis Depth</span>
                        <span className="text-primary">Premium</span>
                      </div>
                      <Slider defaultValue={[75]} max={100} step={1} />
                    </div>
                    <Button 
                      className="w-full py-6 text-lg font-bold" 
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <span className="flex items-center gap-2">
                          <Zap className="w-5 h-5 animate-pulse fill-primary" />
                          Analyzing...
                        </span>
                      ) : (
                        "Run Analysis"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Main Score Card */}
                <Card className="md:col-span-1 bg-gradient-to-br from-primary/10 to-background border-primary/20">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl uppercase tracking-widest text-muted-foreground">Virality Score</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center pb-8">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="96"
                          cy="96"
                          r="80"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="12"
                          className="text-secondary"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="80"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="12"
                          strokeDasharray={502.4}
                          strokeDashoffset={502.4 * (1 - score / 100)}
                          strokeLinecap="round"
                          className="text-primary transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-6xl font-black">{score}</span>
                        <span className="text-sm font-bold text-primary">ELITE</span>
                      </div>
                    </div>
                    <p className="mt-6 text-center text-muted-foreground px-4">
                      Your content has a high probability of reaching the "Explore" page.
                    </p>
                  </CardContent>
                </Card>

                {/* Breakdown Cards */}
                <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                  {[
                    { icon: Timer, label: "Hook Strength", value: 92, color: "text-blue-500", desc: "First 3 seconds are extremely engaging." },
                    { icon: MessageCircle, label: "Caption Impact", value: 78, color: "text-purple-500", desc: "Captions are clear but could use more emojis." },
                    { icon: BarChart3, label: "Visual Pacing", value: 85, color: "text-green-500", desc: "Cuts are perfectly timed to the audio." },
                    { icon: Flame, label: "Trend Alignment", value: 64, color: "text-orange-500", desc: "Using a moderately trending audio track." },
                  ].map((stat) => (
                    <Card key={stat.label} className="bg-card/50">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <div className={`p-2 rounded-lg bg-secondary ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                          </div>
                          <span className="text-2xl font-bold">{stat.value}%</span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold">{stat.label}</h4>
                          <Progress value={stat.value} className="h-2" />
                          <p className="text-xs text-muted-foreground pt-1">{stat.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Actionable Feedback */}
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      What's Working
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "The lighting in the opening shot is professional and clean.",
                      "The use of high-contrast text overlays keeps attention.",
                      "The audio volume is perfectly balanced with the voiceover."
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10 text-sm">
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      Suggested Edits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "Trim the intro by 0.5s to get to the 'hook' faster.",
                      "Add a call-to-action (CTA) in the middle of the video.",
                      "Use a more trending hashtag set (e.g., #creatorlife, #viral)."
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10 text-sm">
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center pt-8">
                <Button size="lg" variant="outline" className="gap-2" onClick={() => setShowResults(false)}>
                  Start New Analysis
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
