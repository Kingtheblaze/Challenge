"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  TrendingUp, 
  Search, 
  MessageSquare, 
  Video, 
  Sparkles, 
  Zap, 
  ArrowRight,
  BarChart2,
  Users,
  Globe
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: TrendingUp,
      title: "Virality Score",
      description: "Advanced AI models predict your content's reach before you hit publish.",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Video,
      title: "Hook Analysis",
      description: "Frame-by-frame breakdown of your first 3 seconds to ensure viewer retention.",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: MessageSquare,
      title: "Caption Magic",
      description: "Generate high-conversion captions and the perfect mix of trending hashtags.",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: Search,
      title: "Market Intel",
      description: "Real-time comparison against trending content in your specific niche.",
      color: "from-green-500/20 to-emerald-500/20",
    },
  ]

  const stats = [
    { label: "Creators", value: "50K+", icon: Users },
    { label: "Videos Analyzed", value: "2M+", icon: BarChart2 },
    { label: "Success Rate", value: "85%", icon: Zap },
    { label: "Global Reach", value: "120+", icon: Globe },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] -right-[10%] w-[50%] h-[50%] bg-accent/20 blur-[100px] rounded-full"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              The Future of Content Creation
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-balance"
            >
              Master the <br />
              <span className="text-gradient">Algorithm</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl sm:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto"
            >
              Go Viral uses advanced neural networks to analyze your content's potential, 
              providing actionable insights to turn every post into a trending masterpiece.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center pt-6"
            >
              <Button size="xl" className="group px-10 py-8 text-xl rounded-2xl shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all hover:scale-105 active:scale-95 bg-primary hover:bg-primary/90" asChild>
                <Link href="/analyzer" className="flex items-center gap-3">
                  Analyze Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="px-10 py-8 text-xl rounded-2xl glass-card transition-all hover:bg-secondary/50 border-white/10" asChild>
                <Link href="/upgrade">See Pro Benefits</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 glass border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-primary opacity-70" />
                </div>
                <div className="text-4xl sm:text-5xl font-black text-gradient">{stat.value}</div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title} 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative p-10 rounded-[2.5rem] glass-card overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black tracking-tight">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
                <Link href="/analyzer" className="flex items-center gap-2 text-primary font-bold hover:underline underline-offset-4">
                  Explore Feature <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Social Proof Section */}
      <section className="container mx-auto px-6 py-32 bg-primary/5 border-y border-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Trusted by the world's <br />top content teams.</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="text-3xl font-black">TIKTOK</div>
             <div className="text-3xl font-black">INSTAGRAM</div>
             <div className="text-3xl font-black">YOUTUBE</div>
             <div className="text-3xl font-black">SNAPCHAT</div>
          </div>
        </div>
      </section>

      {/* CTA Card */}
      <section className="container mx-auto px-6 py-40">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto p-16 md:p-24 rounded-[4rem] bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient border border-white/20 text-center space-y-12 relative overflow-hidden group shadow-[0_0_100px_rgba(var(--primary-rgb),0.3)]"
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-5xl md:text-8xl font-black leading-none tracking-tighter text-white relative z-10">
            Your Viral Journey <br />Starts Here.
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-bold relative z-10">
            Join the elite circle of creators who have mastered the art of virality.
          </p>
          <div className="pt-8 relative z-10">
            <Button size="xl" className="px-16 py-10 text-2xl font-black rounded-3xl bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all shadow-2xl" asChild>
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
