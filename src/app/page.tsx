"use client";

import { motion, type Transition } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BuilderProvider } from "@/context/BuilderContext";
import Navbar from "@/components/Navbar";
import {
  Heart, Star, Sparkles, ArrowRight, Gift, Camera,
  Clock, Shield, ChevronDown, Crown, Gem, Cake,
  Check, Phone, Mail, MapPin, MessageCircle
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" } as Transition,
});

function SectionBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full section-badge text-xs mb-5">
      <span className="text-purple-300">{icon}</span>
      {label}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#E91E8C]/5 blur-[150px]" />
        <div className="absolute top-1/3 left-1/5 w-80 h-80 rounded-full bg-purple-900/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/5 w-64 h-64 rounded-full bg-[#E91E8C]/8 blur-[80px]" />
      </div>

      {/* Badge */}
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <SectionBadge icon={<Sparkles className="w-3 h-3" />} label="Premium Romance Experiences" />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-6xl md:text-8xl font-bold leading-[1.0] max-w-4xl"
      >
        <span className="text-gradient-pink">Curated Cupid</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-6 text-white/50 text-base md:text-lg max-w-lg leading-relaxed"
      >
        Transform ordinary moments into extraordinary memories with our luxury romantic room aesthetics and curated surprise packages
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
      >
        <Link
          href="/builder"
          className="btn-pink-gradient flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm hover:scale-105 hover:-translate-y-0.5 transition-all duration-200"
        >
          <Heart className="w-4 h-4 fill-white" />
          Explore Experiences
        </Link>
        <Link
          href="#packages"
          className="flex items-center gap-2 px-8 py-3.5 rounded-full glass border border-white/10 text-white/70 text-sm hover:border-white/20 hover:text-white transition-all"
        >
          <Gift className="w-4 h-4" />
          View Packages
        </Link>
      </motion.div>

      {/* Hero Preview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="mt-16 grid grid-cols-3 gap-3 max-w-3xl w-full"
      >
        {[
          { src: "/gallery-room.png", label: "Romantic Rooms" },
          { src: "/gallery-birthday.png", label: "Elegant Celebrations" },
          { src: "/gallery-elegant.png", label: "Surprise Setups" },
        ].map((item) => (
          <motion.div
            key={item.label}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-2xl aspect-[3/4] border border-white/6"
          >
            <Image src={item.src} alt={item.label} fill className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0914] via-transparent to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
        className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/30 text-xs"
      >
        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />)}
          <span className="ml-1">4.9/5 rating</span>
        </div>
        <div className="w-px h-4 bg-white/10" />
        <span>200+ experiences delivered</span>
        <div className="w-px h-4 bg-white/10" />
        <span>Ayeduase - Kumasi</span>
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 text-white/15">
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}

// ── Occasions We Create ───────────────────────────────
const occasions = [
  { icon: <Heart className="w-5 h-5" />, title: "Anniversary Setups", desc: "Celebrate your love story with custom romantic room designs featuring candles, rose petals, and elegant décor", iconBg: "bg-pink-900/40", iconColor: "text-pink-400", dot: "#E91E8C" },
  { icon: <Cake className="w-5 h-5" />, title: "Birthday Surprises", desc: "Create unforgettable birthday moments with themed decorations, balloons, and personalized celebration packages", iconBg: "bg-teal-900/40", iconColor: "text-teal-400", dot: "#14B8A6" },
  { icon: <Gem className="w-5 h-5" />, title: "Proposal Planning", desc: "Make your proposal perfect with luxury setups, professional photography coordination, and stunning ambiance", iconBg: "bg-amber-900/40", iconColor: "text-amber-400", dot: "#F59E0B", cardGlow: true },
  { icon: <Gift className="w-5 h-5" />, title: "Curated Gift Boxes", desc: "Handpicked premium gift collections delivered beautifully packaged for your special someone", iconBg: "bg-rose-900/40", iconColor: "text-rose-400", dot: "#F43F5E" },
  { icon: <Sparkles className="w-5 h-5" />, title: "Special Occasions", desc: "From graduations to date nights, we craft extraordinary moments for every milestone in your relationship", iconBg: "bg-cyan-900/40", iconColor: "text-cyan-400", dot: "#06B6D4" },
  { icon: <Crown className="w-5 h-5" />, title: "Premium Add-ons", desc: "Enhance any package with live music, professional photography, champagne service, and exclusive extras", iconBg: "bg-violet-900/40", iconColor: "text-violet-400", dot: "#8B5CF6" },
];

function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionBadge icon={<Sparkles className="w-3 h-3" />} label="Our Services" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">Occasions We Create</h2>
          <p className="mt-3 text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            From intimate moments to grand celebrations, we specialize in transforming spaces into dream experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {occasions.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp(i * 0.08)}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative rounded-2xl p-6 border border-white/5 overflow-hidden group transition-all ${
                s.cardGlow
                  ? "bg-gradient-to-br from-amber-950/60 to-yellow-950/30"
                  : "bg-[#12101F]/80"
              }`}
            >
              {/* Corner dot */}
              <div className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.dot, boxShadow: `0 0 10px ${s.dot}80` }} />
              {/* Subtle hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ background: `radial-gradient(circle at 20% 20%, ${s.dot}08, transparent 60%)` }} />

              <div className={`w-10 h-10 rounded-xl ${s.iconBg} ${s.iconColor} flex items-center justify-center mb-5 relative z-10`}>
                {s.icon}
              </div>
              <h3 className="text-white font-semibold mb-2 relative z-10">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed relative z-10">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Packages ──────────────────────────────────────────
const packages = [
  {
    id: "rose-starter",
    icon: <Heart className="w-5 h-5" />,
    name: "Rose Starter",
    price: "GH₵15,000",
    tag: null,
    features: ["Rose petal trail", "2 pillar candles", "Personalized love note", "1-hour setup"],
    featured: false,
  },
  {
    id: "sweet-surprise",
    icon: <Gift className="w-5 h-5" />,
    name: "Sweet Surprise",
    price: "GH₵28,000",
    tag: null,
    features: ["Everything in Rose Starter", "Balloon arrangement", "LED fairy lights", "Chocolates & treats"],
    featured: false,
  },
  {
    id: "essential-romance",
    icon: <Sparkles className="w-5 h-5" />,
    name: "Essential Romance",
    price: "GH₵45,000",
    tag: null,
    features: ["Rose petals arrangement", "Scented candles setup", "Romantic lighting", "Personalized message card", "2-hour setup window", "Photo opportunities"],
    featured: false,
  },
  {
    id: "luxury-experience",
    icon: <Crown className="w-5 h-5" />,
    name: "Luxury Experience",
    price: "GH₵85,000",
    tag: "Most Popular",
    features: ["Everything in Essential", "Premium floral arrangements", "Champagne & chocolates", "Balloon installations", "LED neon custom sign", "Professional photography (1hr)", "Music playlist curation", "4-hour setup window"],
    featured: true,
  },
  {
    id: "grand-affair",
    icon: <Star className="w-5 h-5" />,
    name: "Grand Affair",
    price: "GH₵120,000",
    tag: null,
    features: ["Everything in Luxury", "Designer floral installations", "Gourmet dinner arrangement", "Premium champagne selection", "Full-day coordination"],
    featured: false,
  },
  {
    id: "ultimate-celebration",
    icon: <Gem className="w-5 h-5" />,
    name: "Ultimate Celebration",
    price: "GH₵175,000",
    tag: null,
    features: ["Everything in Grand Affair", "Live musician (2hrs)", "Full photography package", "Videography highlights", "Spa package vouchers", "All-day setup & support"],
    featured: false,
  },
  {
    id: "royal-diamond",
    icon: <Crown className="w-5 h-5" />,
    name: "Royal Diamond",
    price: "GH₵250,000",
    tag: "Premium",
    features: ["Everything in Ultimate", "Exclusive venue styling", "Custom floral installations", "Dual photographers", "Drone footage", "Dedicated event coordinator", "VIP afterparty setup"],
    featured: false,
  },
];

function Packages() {
  return (
    <section id="packages" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionBadge icon={<Sparkles className="w-3 h-3" />} label="Pricing Packages" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">Choose Your Experience</h2>
          <p className="mt-3 text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            Thoughtfully crafted packages designed to create magical moments that last a lifetime
          </p>
          {/* Most Popular pill */}
          <div className="mt-5 inline-flex">
            <div className="btn-pink-gradient px-4 py-1.5 rounded-full text-white text-xs font-semibold">
              Most Popular → Luxury Experience
            </div>
          </div>
        </motion.div>

        {/* Packages Grid: 3 cols, rows of 3-3-1(centered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              {...fadeUp(i * 0.07)}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className={`relative rounded-2xl border overflow-hidden flex flex-col ${
                pkg.featured
                  ? "border-[#E91E8C]/40 bg-gradient-to-b from-[#1A0E1A] to-[#0F0C1A] shadow-[0_0_40px_rgba(233,30,140,0.15)]"
                  : "border-white/5 bg-[#12101F]/80"
              } ${i === 6 ? "md:col-start-1 lg:col-start-2" : ""}`}
            >
              {/* Top tag */}
              {pkg.tag && (
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold ${
                  pkg.tag === "Most Popular"
                    ? "btn-pink-gradient text-white"
                    : "bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]"
                }`}>
                  {pkg.tag}
                </div>
              )}

              <div className="p-7 flex flex-col h-full">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  pkg.featured ? "bg-[#E91E8C]/20 text-[#E91E8C]" : "bg-white/5 text-white/60"
                }`}>
                  {pkg.icon}
                </div>

                {/* Name & Price */}
                <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                <div className="mt-1 mb-5">
                  <span className="text-3xl font-bold text-white">{pkg.price}</span>
                  <span className="text-white/40 text-sm ml-1">/ event</span>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.featured ? "text-[#E91E8C]" : "text-white/30"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href="/builder">
                  {pkg.featured ? (
                    <div className="btn-pink-gradient text-center py-3 rounded-xl text-white text-sm font-semibold cursor-pointer hover:scale-[1.02] transition-transform">
                      Book This Package
                    </div>
                  ) : (
                    <div className="text-center py-3 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:border-white/20 hover:text-white transition-all cursor-pointer">
                      Book This Package
                    </div>
                  )}
                </Link>
              </div>
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
  { src: "/gallery-elegant.png", label: "Elegant Interior", tag: "Romance" },
  { src: null, emoji: "🌹", label: "Rose Petal Trail", tag: "Proposal" },
  { src: null, emoji: "🥂", label: "Champagne Setup", tag: "VIP" },
  { src: null, emoji: "✨", label: "LED Light Display", tag: "Trending" },
];

function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionBadge icon={<Camera className="w-3 h-3" />} label="Our Work" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">Magical Moments</h2>
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
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-white/5 bg-[#12101F] cursor-pointer"
            >
              {item.src ? (
                <Image src={item.src} alt={item.label} fill className="object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-[#E91E8C]/8 to-purple-900/20">
                  {item.emoji}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0914]/95 via-[#0A0914]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E91E8C]/20 border border-[#E91E8C]/30 text-[#FF6BB5] text-[10px] font-medium mb-1.5">
                  {item.tag}
                </span>
                <p className="text-white text-sm font-medium">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.3)} className="text-center mt-12">
          <Link href="/builder" className="inline-flex items-center gap-2 btn-pink-gradient px-8 py-3.5 rounded-full text-white font-semibold text-sm hover:scale-105 hover:-translate-y-0.5 transition-all">
            Build Your Package <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── Why Us ────────────────────────────────────────────
const reasons = [
  { icon: <Heart className="w-5 h-5" />, title: "Fresh & Premium", desc: "Only the finest flowers, chocolates, and decor selected for every setup.", color: "#E91E8C" },
  { icon: <Clock className="w-5 h-5" />, title: "On-Time Delivery", desc: "We arrive early to ensure everything is perfectly set before you do.", color: "#14B8A6" },
  { icon: <Shield className="w-5 h-5" />, title: "Fully Managed", desc: "We handle every detail so you can focus on the moment.", color: "#8B5CF6" },
  { icon: <Camera className="w-5 h-5" />, title: "Photo-Ready Setups", desc: "Every arrangement is designed to be camera-worthy and Instagram perfect.", color: "#F59E0B" },
];

function WhyUs() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-950/40 blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionBadge icon={<Sparkles className="w-3 h-3" />} label="Why Curated Cupid" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Serious about your <span className="text-gradient-pink">special moment</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="bg-[#12101F]/80 border border-white/5 rounded-2xl p-6 text-center group hover:border-white/10 transition-all"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110"
                style={{ background: `${r.color}18`, color: r.color, boxShadow: `0 0 0 0 ${r.color}00` }}>
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

// ── Contact ───────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionBadge icon={<MessageCircle className="w-3 h-3" />} label="Get In Touch" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">Let&apos;s Create Your Moment</h2>
          <p className="mt-3 text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            Ready to create something magical? Reach out and we&apos;ll make it happen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 space-y-6">
            <div className="bg-[#12101F]/80 border border-white/5 rounded-2xl p-6 space-y-5">
              <h3 className="text-white font-semibold text-lg">Contact Details</h3>
              {[
                { icon: <Phone className="w-4 h-4" />, label: "Phone", value: "+234 901 000 0000" },
                { icon: <Mail className="w-4 h-4" />, label: "Email", value: "hello@curatedcupid.com" },
                { icon: <MapPin className="w-4 h-4" />, label: "Location", value: "Ayeduase - Kumasi, Ghana" },
                { icon: <Clock className="w-4 h-4" />, label: "Hours", value: "Mon–Sun, 8am – 9pm" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E91E8C]/12 text-[#E91E8C] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white/30 text-xs mb-0.5">{item.label}</p>
                    <p className="text-white text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/2349010000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-600/20 border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-600/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-3">
            <div className="bg-[#12101F]/80 border border-white/5 rounded-2xl p-7">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-white/40 text-xs">Your Name</label>
                    <input type="text" placeholder="e.g. Amara Johnson" className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#E91E8C]/50 focus:shadow-[0_0_12px_rgba(233,30,140,0.1)] transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-white/40 text-xs">Phone / WhatsApp</label>
                    <input type="tel" placeholder="e.g. 08012345678" className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#E91E8C]/50 focus:shadow-[0_0_12px_rgba(233,30,140,0.1)] transition-all" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 text-xs">Email Address</label>
                  <input type="email" placeholder="your@email.com" className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#E91E8C]/50 focus:shadow-[0_0_12px_rgba(233,30,140,0.1)] transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 text-xs">Event Date (Approx.)</label>
                  <input type="date" className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E91E8C]/50 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 text-xs">Message</label>
                  <textarea rows={4} placeholder="Tell us about your dream setup..." className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#E91E8C]/50 focus:shadow-[0_0_12px_rgba(233,30,140,0.1)] transition-all resize-none" />
                </div>
                <button type="submit" className="w-full btn-pink-gradient text-white font-semibold py-3.5 rounded-xl text-sm hover:scale-[1.01] transition-transform">
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-20 px-6">
      <motion.div
        {...fadeUp()}
        className="max-w-3xl mx-auto relative overflow-hidden rounded-3xl border border-[#E91E8C]/15 p-12 text-center"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(233,30,140,0.12), transparent 60%), #12101F" }}
      >
        <div className="text-5xl mb-4">💝</div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to create magic?</h2>
        <p className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Start building your personalized romantic experience today. Transparent pricing, no hidden fees — just love.
        </p>
        <Link href="/builder" className="inline-flex items-center gap-2 btn-pink-gradient px-10 py-4 rounded-full text-white font-bold text-sm hover:scale-105 hover:-translate-y-1 transition-all">
          <Heart className="w-4 h-4 fill-white" />
          Start Your Surprise
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full btn-pink-gradient flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="font-bold text-white">Curated<span className="text-gradient-pink">Cupid</span></span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Luxury romantic experiences crafted with love for every special moment in your story.
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">Quick Links</p>
            <div className="space-y-2">
              {["Services", "Packages", "Gallery", "Contact"].map((l) => (
                <Link key={l} href={`#${l.toLowerCase()}`} className="block text-white/30 text-sm hover:text-[#E91E8C] transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">Contact</p>
            <div className="space-y-2 text-white/30 text-sm">
              <p>+234 901 000 0000</p>
              <p>hello@curatedcupid.com</p>
              <p>Ayeduase - Kumasi, Ghana</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-white/20 text-xs">
          <p>© {new Date().getFullYear()} Curated Cupid. All rights reserved.</p>
          <p>Made with 💕 in Kumasi</p>
        </div>
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
        <Packages />
        <Gallery />
        <WhyUs />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
    </BuilderProvider>
  );
}
