"use client";

import { motion, type Transition } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BuilderProvider } from "@/context/BuilderContext";
import Navbar from "@/components/Navbar";
import {
  Heart, Star, Sparkles, ArrowRight,
  Gift, Camera, Clock, Shield, ChevronDown,
  Crown, Gem, Cake
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" } as Transition,
});

// ── Hero ──────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#E91E8C]/6 blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-[#7C3AED]/8 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#E91E8C]/5 blur-[80px]" />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#E91E8C]/20 text-xs text-white/70 mb-8"
      >
        <Sparkles className="w-3 h-3 text-[#E91E8C]" />
        Premium Romance Experiences
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] max-w-4xl"
      >
        Curated<span className="text-[#E91E8C]">Cupid</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-6 text-white/50 text-base md:text-lg max-w-lg leading-relaxed"
      >
        Transform ordinary moments into extraordinary memories with our luxury romantic room aesthetics and curated surprise packages
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
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#E91E8C] text-white font-semibold text-sm shadow-[0_0_30px_rgba(233,30,140,0.5)] hover:shadow-[0_0_50px_rgba(233,30,140,0.7)] hover:-translate-y-1 transition-all"
        >
          <Heart className="w-4 h-4 fill-white" />
          Explore Experiences
        </Link>
        <Link
          href="/builder"
          className="flex items-center gap-2 px-8 py-3.5 rounded-full glass border border-white/10 text-white/80 text-sm hover:border-[#E91E8C]/40 hover:text-white transition-all"
        >
          <Gift className="w-4 h-4" />
          View Packages
        </Link>
      </motion.div>

      {/* Gallery preview cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="mt-16 grid grid-cols-3 gap-4 max-w-3xl w-full"
      >
        {[
          { src: "/gallery-room.png", label: "Romantic Rooms", fallback: "🌹" },
          { src: "/gallery-birthday.png", label: "Elegant Celebrations", fallback: "🎂" },
          { src: null, label: "Surprise Setups", fallback: "🎁" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            whileHover={{ scale: 1.03, y: -4 }}
            className="glass border border-white/8 rounded-2xl overflow-hidden relative aspect-[4/3]"
          >
            {item.src ? (
              <Image src={item.src} alt={item.label} fill className="object-cover opacity-70" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E91E8C]/10 to-[#7C3AED]/10 text-4xl">
                {item.fallback}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12]/90 to-transparent" />
            <p className="absolute bottom-3 left-3 text-white text-xs font-medium">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex items-center gap-6 text-white/30 text-xs"
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
        <div className="w-px h-4 bg-white/10 hidden md:block" />
        <span className="hidden md:block">Lagos & Abuja</span>
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

// ── Services ─────────────────────────────────────────
const occasions = [
  { icon: <Heart className="w-5 h-5" />, title: "Anniversary Setups", desc: "Celebrate your love story with custom romantic room designs featuring candles, rose petals, and elegant décor", color: "#E91E8C" },
  { icon: <Cake className="w-5 h-5" />, title: "Birthday Surprises", desc: "Create unforgettable birthday moments with themed decorations, balloons, and personalized celebration packages", color: "#7C3AED" },
  { icon: <Gem className="w-5 h-5" />, title: "Proposal Planning", desc: "Make your proposal perfect with luxury setups, professional photography coordination, and stunning ambiance", color: "#D4AF37" },
  { icon: <Gift className="w-5 h-5" />, title: "Curated Gift Boxes", desc: "Handpicked premium gift collections delivered beautifully packaged for your special someone", color: "#E91E8C" },
  { icon: <Sparkles className="w-5 h-5" />, title: "Special Occasions", desc: "From graduations to date nights, we craft extraordinary moments for every milestone in your relationship", color: "#7C3AED" },
  { icon: <Crown className="w-5 h-5" />, title: "Premium Add-ons", desc: "Enhance any package with live music, professional photography, champagne service, and exclusive extras", color: "#D4AF37" },
];

function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#E91E8C]/20 text-xs text-white/60 mb-5">
            <Sparkles className="w-3 h-3 text-[#E91E8C]" /> Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Occasions We Create
          </h2>
          <p className="mt-3 text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            From intimate moments to grand celebrations, we specialize in transforming spaces into dream experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {occasions.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp(i * 0.08)}
              whileHover={{ y: -6 }}
              className="glass border border-white/6 rounded-2xl p-6 group hover:border-white/12 transition-all relative overflow-hidden"
            >
              {/* Corner dot accent */}
              <div className="absolute top-5 right-5 w-2 h-2 rounded-full" style={{ backgroundColor: s.color, boxShadow: `0 0 8px ${s.color}` }} />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                {s.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Gallery ──────────────────────────────────────────
const galleryItems = [
  { src: "/gallery-room.png", label: "Romantic Candlelit Setup", tag: "Anniversary" },
  { src: "/gallery-birthday.png", label: "Luxury Bedroom Design", tag: "Celebration" },
  { src: null, emoji: "💝", label: "Elegant Interior", tag: "Romance" },
  { src: null, emoji: "🌹", label: "Rose Petal Trail", tag: "Proposal" },
  { src: null, emoji: "🥂", label: "Champagne Setup", tag: "VIP" },
  { src: null, emoji: "✨", label: "LED Light Display", tag: "Trending" },
];

function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#E91E8C]/20 text-xs text-white/60 mb-5">
            <Camera className="w-3 h-3 text-[#E91E8C]" /> Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Magical Moments
          </h2>
          <p className="mt-3 text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            Explore our portfolio of unforgettable experiences we&apos;ve created for couples and loved ones
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.label}
              {...fadeUp(i * 0.07)}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group glass border border-white/6 rounded-2xl overflow-hidden cursor-pointer relative"
            >
              <div className="aspect-[4/3] relative">
                {item.src ? (
                  <Image src={item.src} alt={item.label} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E91E8C]/8 to-[#7C3AED]/8 text-5xl">
                    {item.emoji}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#E91E8C]/20 border border-[#E91E8C]/30 text-[#E91E8C] text-[10px] font-medium mb-1">
                    {item.tag}
                  </span>
                  <p className="text-white text-xs font-medium">{item.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.3)} className="text-center mt-12">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#E91E8C] text-white font-semibold text-sm shadow-[0_0_25px_rgba(233,30,140,0.4)] hover:shadow-[0_0_40px_rgba(233,30,140,0.6)] hover:-translate-y-1 transition-all"
          >
            Build Your Package <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── Why Us ────────────────────────────────────────────
const reasons = [
  { icon: <Heart className="w-5 h-5" />, title: "Fresh & Premium", desc: "Only the finest flowers, chocolates, and decor selected for every setup." },
  { icon: <Clock className="w-5 h-5" />, title: "On-Time Delivery", desc: "We arrive early to ensure everything is perfectly set before you do." },
  { icon: <Shield className="w-5 h-5" />, title: "Fully Managed", desc: "We handle every detail so you can focus on the moment." },
  { icon: <Camera className="w-5 h-5" />, title: "Photo-Ready Setups", desc: "Every arrangement is designed to be camera-worthy and Instagram perfect." },
];

function WhyUs() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/6 blur-[100px]" />
      </div>
      <div className="max-w-6xl mx-auto relative">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#E91E8C]/20 text-xs text-white/60 mb-5">
            <Sparkles className="w-3 h-3 text-[#E91E8C]" /> Why Curated Cupid
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Serious about your <span className="text-[#E91E8C]">special moment</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -6 }}
              className="glass border border-white/6 rounded-2xl p-6 text-center hover:border-[#E91E8C]/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E91E8C]/10 flex items-center justify-center text-[#E91E8C] mx-auto mb-4 group-hover:bg-[#E91E8C]/20 group-hover:shadow-[0_0_20px_rgba(233,30,140,0.3)] transition-all">
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

// ── CTA Banner ────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-24 px-6">
      <motion.div
        {...fadeUp()}
        className="max-w-3xl mx-auto glass border border-[#E91E8C]/15 rounded-3xl p-12 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#E91E8C]/6 via-transparent to-[#7C3AED]/6 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#E91E8C]/10 blur-[60px]" />
        <div className="relative z-10">
          <div className="text-5xl mb-4">💝</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to create magic?
          </h2>
          <p className="text-white/50 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Start building your personalized romantic experience today. Transparent pricing, no hidden fees — just love.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#E91E8C] text-white font-bold text-sm shadow-[0_0_30px_rgba(233,30,140,0.5)] hover:shadow-[0_0_50px_rgba(233,30,140,0.7)] hover:-translate-y-1 transition-all"
          >
            <Heart className="w-4 h-4 fill-white" />
            Start Your Surprise
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E91E8C] to-[#7C3AED] flex items-center justify-center">
            <Heart className="w-3 h-3 text-white fill-white" />
          </div>
          <span className="font-semibold text-white/60">Curated<span className="text-[#E91E8C]">Cupid</span></span>
        </div>
        <p>© {new Date().getFullYear()} Curated Cupid. All rights reserved.</p>
        <p>Made with 💕 in Lagos</p>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────
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
