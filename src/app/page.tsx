"use client";

import { motion, type Transition } from "framer-motion";
import Link from "next/link";
import { BuilderProvider } from "@/context/BuilderContext";
import Navbar from "@/components/Navbar";
import {
  Heart, Star, Sparkles, ArrowRight,
  Flower2, Gift, Camera, Clock, Shield, ChevronDown
} from "lucide-react";

// —— Fade-up animation helper ——
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" } as Transition,
});

// —— Hero ——
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#9b87f5]/6 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-[#F2B8C6]/8 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[#D4AF37]/6 blur-[80px]" />
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#F2B8C6]/20 text-xs text-[#F2B8C6] mb-8"
      >
        <Sparkles className="w-3 h-3" />
        Luxury Romance Experiences
        <Sparkles className="w-3 h-3" />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-4xl"
      >
        Love, crafted{" "}
        <span className="bg-gradient-to-r from-[#F2B8C6] via-[#D4AF37] to-[#9b87f5] bg-clip-text text-transparent">
          perfectly
        </span>
        {" "}for you.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-6 text-white/50 text-lg max-w-xl leading-relaxed"
      >
        Build bespoke romantic experiences from scratch — room setups, surprise packages, and custom luxuries, all tailored to your moment.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
      >
        <Link
          href="/builder"
          className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F2B8C6] to-[#c994ac] text-[#0B0B0F] font-semibold text-sm shadow-[0_0_30px_rgba(242,184,198,0.4)] hover:shadow-[0_0_50px_rgba(242,184,198,0.6)] transition-all hover:-translate-y-1"
        >
          Start Your Surprise
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="#services"
          className="flex items-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 text-white/70 text-sm hover:border-[#F2B8C6]/30 hover:text-white transition-all"
        >
          Explore Services
        </Link>
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-16 flex items-center gap-6 text-white/30 text-xs"
      >
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
            ))}
          </div>
          <span>4.9/5 rating</span>
        </div>
        <div className="w-px h-4 bg-white/10" />
        <span>200+ experiences delivered</span>
        <div className="w-px h-4 bg-white/10" />
        <span>Lagos & Abuja</span>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 text-white/20"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}

// —— Services ——
const services = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Room Aesthetics",
    desc: "We transform any space into an unforgettable romantic scene — lights, petals, candles, and more.",
    color: "from-[#F2B8C6]/15 to-transparent",
    border: "border-[#F2B8C6]/20",
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Surprise Packages",
    desc: "Fully curated secret experiences delivered to your loved one. We handle every detail.",
    color: "from-[#D4AF37]/15 to-transparent",
    border: "border-[#D4AF37]/20",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Custom Setups",
    desc: "Pick and choose exactly what you want. Build your dream setup item by item.",
    color: "from-[#9b87f5]/15 to-transparent",
    border: "border-[#9b87f5]/20",
  },
];

function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="text-[#F2B8C6] text-xs font-medium uppercase tracking-widest mb-3">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Experiences designed to{" "}
            <span className="bg-gradient-to-r from-[#F2B8C6] to-[#9b87f5] bg-clip-text text-transparent">wow</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -8 }}
              className={`relative glass border ${s.border} rounded-3xl p-8 overflow-hidden group transition-all duration-300`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center text-[#F2B8C6] mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// —— Gallery ——
const galleryItems = [
  { emoji: "🌹", label: "Rose Petal Room", tag: "Most Loved" },
  { emoji: "✨", label: "LED Fairy Light Setup", tag: "Trending" },
  { emoji: "🎂", label: "Birthday Surprise", tag: "Popular" },
  { emoji: "🕯️", label: "Candlelit Dinner", tag: "Romantic" },
  { emoji: "💐", label: "Flower Bouquet Spread", tag: "Classic" },
  { emoji: "🎁", label: "Luxury Gift Box", tag: "Premium" },
];

function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="text-[#F2B8C6] text-xs font-medium uppercase tracking-widest mb-3">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Moments we&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F2B8C6] bg-clip-text text-transparent">created</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.label}
              {...fadeUp(i * 0.08)}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group glass border border-white/8 rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-square flex items-center justify-center text-6xl bg-gradient-to-br from-[#F2B8C6]/5 to-[#9b87f5]/5 relative">
                <span className="group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <span className="text-xs text-[#F2B8C6] font-medium">{item.tag}</span>
                    <p className="text-white text-sm font-medium">{item.label}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.3)} className="text-center mt-12">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F2B8C6] to-[#c994ac] text-[#0B0B0F] font-semibold text-sm shadow-[0_0_30px_rgba(242,184,198,0.3)] hover:shadow-[0_0_50px_rgba(242,184,198,0.5)] hover:-translate-y-1 transition-all"
          >
            Build Your Package <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// —— Why Us ——
const reasons = [
  { icon: <Flower2 className="w-5 h-5" />, title: "Fresh & Premium", desc: "Only the finest flowers, chocolates, and decor selected for every setup." },
  { icon: <Clock className="w-5 h-5" />, title: "On-Time Delivery", desc: "We arrive early to ensure everything is perfectly set before you do." },
  { icon: <Shield className="w-5 h-5" />, title: "Fully Managed", desc: "We handle every detail so you can focus on the moment." },
  { icon: <Camera className="w-5 h-5" />, title: "Photo-Ready Setups", desc: "Every arrangement is designed to be camera-worthy and Instagram perfect." },
];

function WhyUs() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[100px]" />
      </div>
      <div className="max-w-6xl mx-auto relative">
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="text-[#F2B8C6] text-xs font-medium uppercase tracking-widest mb-3">Why Curated Cupid</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Serious about your{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F2B8C6] bg-clip-text text-transparent">special moment</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -6 }}
              className="glass border border-white/8 rounded-2xl p-6 text-center hover:border-[#D4AF37]/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-[#D4AF37] mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-shadow">
                {r.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{r.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// —— CTA Banner ——
function CTABanner() {
  return (
    <section className="py-24 px-6">
      <motion.div
        {...fadeUp()}
        className="max-w-3xl mx-auto glass border border-[#F2B8C6]/15 rounded-3xl p-12 text-center relative overflow-hidden shadow-[0_0_80px_rgba(242,184,198,0.08)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#F2B8C6]/5 via-transparent to-[#9b87f5]/5 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-4xl mb-4">💝</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to create magic?
          </h2>
          <p className="text-white/50 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Start building your personalized romantic experience today. Transparent pricing, no hidden fees — just love.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#F2B8C6] to-[#c994ac] text-[#0B0B0F] font-bold text-sm shadow-[0_0_30px_rgba(242,184,198,0.4)] hover:shadow-[0_0_50px_rgba(242,184,198,0.6)] hover:-translate-y-1 transition-all"
          >
            <Heart className="w-4 h-4 fill-current" />
            Build Your Package
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// —— Footer ——
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F2B8C6] to-[#9b87f5] flex items-center justify-center">
            <Heart className="w-3 h-3 text-white fill-white" />
          </div>
          <span className="font-semibold text-white/60">Curated<span className="text-[#F2B8C6]">Cupid</span></span>
        </div>
        <p>© {new Date().getFullYear()} Curated Cupid. All rights reserved.</p>
        <p>Made with 💕 in Lagos</p>
      </div>
    </footer>
  );
}

// —— Page ——
export default function HomePage() {
  return (
    <BuilderProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <WhyUs />
        <CTABanner />
      </main>
      <Footer />
    </BuilderProvider>
  );
}
