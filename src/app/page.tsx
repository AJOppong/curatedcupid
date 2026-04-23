"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BuilderProvider } from "@/context/BuilderContext";
import Navbar from "@/components/Navbar";
import {
  Heart, Star, Sparkles, ArrowRight, Gift, Camera,
  Clock, Shield, ChevronDown, Crown, Gem, Cake,
  Check, Phone, Mail, MapPin, MessageCircle,
  MessageSquare, User, Send
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

      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <SectionBadge icon={<Sparkles className="w-3 h-3" />} label="Luxury Gifts & Aesthetic Setups" />
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
        Luxury aesthetics for special moments and everyday surprises. Transform ordinary days into extraordinary memories for your loved ones.
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
  { icon: <Heart className="w-5 h-5" />, title: "Celebration Setups", desc: "Celebrate your love story or milestones with custom room designs featuring candles, balloons, and elegant décor", iconBg: "bg-pink-900/40", iconColor: "text-pink-400", dot: "#E91E8C" },
  { icon: <Cake className="w-5 h-5" />, title: "Birthday Surprises", desc: "Create unforgettable birthday moments for friends and family with themed decorations and personalized packages", iconBg: "bg-teal-900/40", iconColor: "text-teal-400", dot: "#14B8A6" },
  { icon: <Gem className="w-5 h-5" />, title: "Proposal & Engagement", desc: "Make your big moment perfect with luxury setups, professional photography coordination, and stunning ambiance", iconBg: "bg-amber-900/40", iconColor: "text-amber-400", dot: "#F59E0B", cardGlow: true },
  { icon: <Gift className="w-5 h-5" />, title: "Curated Gift Boxes", desc: "Handpicked premium gift collections delivered beautifully packaged for your special someone, friend or family", iconBg: "bg-rose-900/40", iconColor: "text-rose-400", dot: "#F43F5E" },
  { icon: <Sparkles className="w-5 h-5" />, title: "Special Milestones", desc: "From graduations to reunions, we craft extraordinary moments for every important chapter in your life", iconBg: "bg-cyan-900/40", iconColor: "text-cyan-400", dot: "#06B6D4" },
  { icon: <Crown className="w-5 h-5" />, title: "Premium Add-ons", desc: "Enhance any package with live music, professional photography, gourmet service, and exclusive extras", iconBg: "bg-violet-900/40", iconColor: "text-violet-400", dot: "#8B5CF6" },
];

function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionBadge icon={<Sparkles className="w-3 h-3" />} label="Our Services" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">Making Every Day Extraordinary</h2>
          <p className="mt-3 text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            From special milestones to "just because" moments, we transform any day into a dream experience
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
    id: "el-capo",
    icon: <Crown className="w-5 h-5" />,
    name: "EL CAPO",
    price: "GH₵250",
    tag: null,
    features: ["Raffaello Chocolates", "Jewelry", "Wine", "Valentine's Day Card"],
    featured: false,
  },
  {
    id: "non-anchora",
    icon: <Heart className="w-5 h-5" />,
    name: "NON ANCHORA",
    price: "GH₵350",
    tag: null,
    features: ["Raffaello Chocolates", "Jewelry", "Wallet", "Wine", "Valentine's Day Card"],
    featured: false,
  },
  {
    id: "fuori-orario",
    icon: <Sparkles className="w-5 h-5" />,
    name: "FUORI ORARIO",
    price: "GH₵500",
    tag: null,
    features: ["Raffaello Chocolates", "Jewelry", "Wallet", "Wine", "Custom Slippers", "Custom Handwritten Letter"],
    featured: false,
  },
  {
    id: "il-devoto",
    icon: <Star className="w-5 h-5" />,
    name: "IL DEVOTO",
    price: "GH₵700",
    tag: "Most Popular",
    features: ["Raffaello Chocolates", "Jewelry", "Wallet", "Wine", "Custom Slippers", "Nike Slides", "Custom Handwritten Letter"],
    featured: true,
  },
  {
    id: "re-del-mio",
    icon: <Crown className="w-5 h-5" />,
    name: "RE DEL MIO",
    price: "GH₵830",
    tag: null,
    features: ["Raffaello Chocolates", "Jewelry", "Wallet", "Wine", "Custom Slippers", "Nike Slides", "Shirt", "Custom Handwritten Letter"],
    featured: false,
  },
  {
    id: "perche-sei-mio",
    icon: <Gem className="w-5 h-5" />,
    name: "PERCHÉ SEI MIO",
    price: "GH₵1,400",
    tag: null,
    features: ["Ferrero Rocher Chocolates", "Jewelry", "Wallet", "Wine", "Custom Slippers", "David Beckham Designer Perfume", "Nike Slides", "Shirt", "Custom Handwritten Letter"],
    featured: false,
  },
  {
    id: "oltre-leternita",
    icon: <Crown className="w-5 h-5" />,
    name: "OLTRE L’ETERNITÀ",
    price: "GH₵2,000",
    tag: "Premium",
    features: ["Ferrero Rocher Chocolates", "Jewelry", "Wallet", "Wine", "Custom Slippers", "Nike Slides", "David Beckham Designer Perfume", "Shirt", "Food Basket", "Oxford Shoes", "Custom Handwritten Letter"],
    featured: false,
  },
];

function Packages() {
  return (
    <section id="packages" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionBadge icon={<Sparkles className="w-3 h-3" />} label="Package Pricing" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">Select Your Gift</h2>
          <p className="mt-3 text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            Thoughtfully curated packages designed to deliver pure joy, no matter the day
          </p>
        </motion.div>

        {/* Packages Grid */}
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
              }`}
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
                <Link href={`/builder?package=${encodeURIComponent(pkg.name)}`}>
                  {pkg.featured ? (
                    <div className="btn-pink-gradient text-center py-3 rounded-xl text-white text-sm font-semibold cursor-pointer hover:scale-[1.02] hover:opacity-90 transition-all">
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
            Passionate about making <span className="text-gradient-pink">every moment count</span>
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

            {/* Social handles */}
            <div className="bg-[#12101F]/80 border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-semibold text-sm">Follow Our Magic</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { 
                    name: "WhatsApp", 
                    icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>, 
                    color: "bg-green-500/10 text-green-400 border-green-500/20", 
                    link: "https://wa.me/2349010000000" 
                  },
                  { 
                    name: "TikTok", 
                    icon: <path d="M12.525.02c1.31-.032 2.612.019 3.847.156.085 1.561.566 3.022 1.634 4.125.954.916 2.213 1.493 3.513 1.611v3.91c-1.124-.044-2.217-.333-3.21-.837-.84-.439-1.55-.992-2.106-1.632v6.643c0 1.258-.233 2.451-.676 3.528-.466 1.134-1.164 2.115-2.05 2.915a8.706 8.706 0 01-3.228 1.86 9.475 9.475 0 01-3.32.585c-1.137-.008-2.247-.218-3.284-.622a8.625 8.625 0 01-2.73-1.66 8.525 8.525 0 01-1.893-2.525A8.344 8.344 0 01.32 14.542a8.318 8.318 0 01.597-3.12 8.441 8.441 0 011.59-2.615 8.525 8.525 0 012.353-1.82c1.021-.518 2.148-.795 3.33-.807v4.025c-1.157.066-2.14.593-2.784 1.423-.534.693-.787 1.464-.787 2.274 0 .394.054.764.156 1.108.118.396.3.754.544 1.056.24.298.54.54.887.712.347.172.73.258 1.144.258.423 0 .81-.086 1.157-.258a2.53 2.53 0 00.895-.712c.245-.302.433-.66.55-1.056.113-.376.17-.775.17-1.18V0h3.53z"/>, 
                    color: "bg-white/5 text-white border-white/10", 
                    link: "https://tiktok.com/@curatedcupid" 
                  },
                  { 
                    name: "Snapchat", 
                    icon: <path d="M12.016.03C11.555.03 11.23.111 11.02.213c-.322.158-.553.473-.706.969-.142.457-.306.63-.585.733-.284.103-.78.103-1.252-.083-.4-.158-.934-.338-1.527-.338-.853 0-1.554.407-1.874 1.085-.145.311-.205.656-.205 1.04 0 .565.132.883.279 1.13.208.35.532.55.952.55.263 0 .553-.08.795-.213.342-.188.468-.34.615-.466.155-.13.345-.251.656-.251.34 0 .57.143.766.452.2.316.326.837.326 1.637 0 .806-.126 1.327-.326 1.644-.195.311-.426.455-.766.455-.311 0-.5.122-.656.25-.147.127-.273.28-.615.468a1.645 1.645 0 01-.795.21c-.42 0-.744.204-.952.553-.147.247-.279.564-.279 1.13 0 .383.06.728.205 1.037.32.678 1.02 1.088 1.874 1.088.593 0 1.127-.18 1.527-.338.471-.186.968-.186 1.252-.083.28.103.443.276.585.733.153.496.384.811.706.969.21.102.535.183.996.183.46 0 .786-.081.996-.183.322-.158.553-.473.706-.969.142-.457.306-.63.585-.733.284-.103.78-.103 1.252.083.4.158.934.338 1.527.338.853 0 1.554-.407 1.874-1.085.145-.311.205-.656.205-1.04 0-.565-.132-.883-.279-1.13-.208-.35-.532-.55-.952-.55-.263 0-.553.08-.795.213-.342.188-.468.34-.615.466-.155.13-.345.251-.656.251-.34 0-.57-.143-.766-.452-.2-.316-.326-.837-.326-1.637 0-.806.126-1.327.326-1.644.195-.311.426-.455.766-.455.311 0 .5-.122.656-.25.147-.127.273-.28-.615-.468a1.645 1.645 0 01-.795-.21c-.42 0-.744-.204-.952-.553-.147-.247-.279-.564-.279-1.13 0-.383-.06-.728-.205-1.037-.32-.678-1.02-1.088-1.874-1.088-.593 0-1.127.18-1.527.338-.471.186-.968.186-1.252.083-.28.103-.443.276-.585.733-.153.496-.384.811-.706.969-.21.102-.535.183-.996.183z"/>, 
                    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", 
                    link: "https://snapchat.com/add/curatedcupid" 
                  },
                  { 
                    name: "Instagram", 
                    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.741 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.384 1.078 2.126 1.384c.766.296 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384s1.078-1.384 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.306-.788-.718-1.459-1.384-2.126s-1.384-1.078-2.126-1.384c-.765-.296-1.636-.499-2.913-.558C15.667.014 15.259 0 12 0m0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324M12 16a4.162 4.162 0 110-8.324A4.162 4.162 0 0112 16m6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881"/>, 
                    color: "bg-pink-500/10 text-pink-400 border-pink-500/20", 
                    link: "https://instagram.com/curatedcupid" 
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 flex items-center justify-center rounded-xl border hover:scale-110 transition-all ${social.color}`}
                    title={social.name}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
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

// ── Reviews ──────────────────────────────────────────
const initialReviews = [
  { name: "Sarah K.", role: "Anniversary Surprise", text: "The attention to detail was incredible. My husband was speechless! They made our regular Tuesday feel like a fairy tale.", rating: 5 },
  { name: "Michael O.", role: "Birthday Setup", text: "Fast, professional, and absolutely stunning. The room vibe was exactly what I wanted. Highly recommended!", rating: 5 },
  { name: "Emily B.", role: "Just Because", text: "I wanted to surprise my bestie for no reason, and Curated Cupid delivered! The gift box was so thoughtful.", rating: 5 },
];

function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", role: "Client", text: "", rating: 5 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.name && newReview.text) {
      setReviews([newReview, ...reviews]);
      setShowForm(false);
      setNewReview({ name: "", role: "Client", text: "", rating: 5 });
    }
  };

  return (
    <section id="reviews" className="py-24 px-6 bg-gradient-to-b from-transparent to-[#E91E8C]/5">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionBadge icon={<MessageSquare className="w-3 h-3" />} label="Testimonials" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">Loved by Our Clients</h2>
          <p className="mt-3 text-white/40 text-sm max-w-md mx-auto">
            Real stories from people who experienced the magic of Curated Cupid
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {reviews.map((rev, i) => (
              <motion.div
                key={rev.name + i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass border border-white/5 p-8 rounded-3xl relative"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < rev.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-white/10"}`} 
                    />
                  ))}
                </div>
                <p className="text-white/70 text-sm italic mb-6 leading-relaxed">"{rev.text}"</p>
                <div>
                  <p className="text-white font-bold text-sm">{rev.name}</p>
                  <p className="text-[#E91E8C] text-[10px] font-bold uppercase tracking-widest">{rev.role}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div {...fadeUp(0.4)} className="mt-12 text-center">
          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)}
              className="glass border border-white/10 px-8 py-4 rounded-full text-white/60 hover:text-white hover:border-[#E91E8C]/50 hover:bg-[#E91E8C]/5 text-sm font-bold transition-all"
            >
              Share Your Experience
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto glass border border-white/10 p-8 rounded-3xl text-left"
            >
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#E91E8C]" /> Share Your Story
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-white/40 text-xs font-bold uppercase tracking-wider">Your Name</label>
                    <input 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E8C]/40 transition-all"
                      value={newReview.name}
                      onChange={e => setNewReview({...newReview, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-white/40 text-xs font-bold uppercase tracking-wider">Rating</label>
                    <div className="flex gap-2 py-2">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className="transition-transform hover:scale-125"
                        >
                          <Star className={`w-5 h-5 ${star <= newReview.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-white/20"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 text-xs font-bold uppercase tracking-wider">Your Thoughts</label>
                  <textarea 
                    required
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E91E8C]/40 transition-all resize-none"
                    placeholder="Tell us about your surprise experience..."
                    value={newReview.text}
                    onChange={e => setNewReview({...newReview, text: e.target.value})}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit"
                    className="flex-1 btn-pink-gradient py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Post Review
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 rounded-xl glass border border-white/10 text-white/40 text-sm font-bold hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
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
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Make someone smile today</h2>
        <p className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Start building your personalized surprise experience. Transparent pricing, handcrafted details — just pure joy.
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
              Luxury celebration experiences crafted with care for every special chapter in your story.
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
        <Gallery />
        <WhyUs />
        <Reviews />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
    </BuilderProvider>
  );
}
