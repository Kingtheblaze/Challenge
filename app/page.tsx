import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Sparkles, Zap, TrendingUp, Search, MessageSquare, Video } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: TrendingUp,
      title: "Virality Score",
      description: "Get a 0-100 score on your content's potential to go viral based on AI analysis.",
    },
    {
      icon: Video,
      title: "Hook Analysis",
      description: "Analyze the first 3 seconds of your video to ensure maximum viewer retention.",
    },
    {
      icon: MessageSquare,
      title: "Caption Optimization",
      description: "AI-generated captions and hashtag recommendations tailored for reach.",
    },
    {
      icon: Search,
      title: "Competitor Comparison",
      description: "Compare your content against top-performing videos in your niche.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-accent/20 blur-[100px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="container mx-auto px-6 py-16 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-1000">
              <Sparkles className="w-4 h-4" />
              Revolutionize Your Content Strategy
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-balance leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Go Viral with <span className="text-primary italic">AI Precision</span>
            </h1>
            <p className="text-lg sm:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              Upload your video or post and let AI score its viral potential, explain what works, 
              and suggest edits to maximize reach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
              <Button size="lg" className="px-10 py-8 text-xl rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95" asChild>
                <Link href="/analyzer">Analyze Content Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-10 py-8 text-xl rounded-2xl backdrop-blur-sm transition-all hover:bg-secondary/50" asChild>
                <Link href="/upgrade">View Pro Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Engineered for Virality</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI models are trained on millions of high-performing posts to give you actionable feedback.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="group relative flex flex-col gap-4 p-8 rounded-3xl bg-card/50 border border-border/50 transition-all hover:border-primary/50 hover:bg-card/80 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/20 group-hover:scale-110">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-6 py-24 bg-secondary/10">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold opacity-70 uppercase tracking-widest">Powered By</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["Next.js 16", "React 19", "OpenAI GPT-4o", "Claude 3.5 Sonnet", "Supabase", "Framer Motion"].map((tech) => (
              <div key={tech} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-background border border-border shadow-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium text-sm">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-32 relative">
        <div className="max-w-5xl mx-auto p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-primary/20 via-background to-accent/10 border border-primary/20 text-center space-y-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">Ready to break the <br/><span className="text-primary underline decoration-primary/30 underline-offset-8">Algorithm?</span></h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Join 50,000+ creators using Go Viral to scale their reach and build their brand.
          </p>
          <Button size="lg" className="px-12 py-8 text-xl rounded-2xl hover:scale-105 transition-transform" asChild>
            <Link href="/auth/signup">Get Started for Free</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
