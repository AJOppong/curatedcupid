"use client";

import { motion, type Transition, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BuilderProvider, useBuilder } from "@/context/BuilderContext";
import { useTheme } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import { flowerItems, predefinedPackages } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { useState, useEffect, useRef } from "react";
import {
  Heart, Star, Sparkles, ArrowRight, Gift, Camera,
  Clock, Shield, ChevronDown, Crown, Gem, Cake,
  Check, Phone, Mail, MapPin, MessageCircle,
  MessageSquare, Play, Flower2, Plus, X, Video, Wine, Music, Ghost
} from "lucide-react";



const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" } as Transition,
});

function PreorderBanner() {
  const { activeTheme } = useTheme();
  if (!activeTheme?.end_date) return null;
  const endDate = new Date(activeTheme.end_date);
  const now = new Date();
  if (endDate <= now) return null;
  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const formatted = endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="inline-flex items-center justify-center gap-3 py-2 px-6 rounded-full text-xs font-semibold text-white shadow-lg mb-6"
      style={{ background: "linear-gradient(90deg, #E91E8C, #7C3AED)" }}
    >
      <Clock className="w-4 h-4 flex-shrink-0" />
      <span>
        Pre-order closes on <strong>{formatted}</strong> — only{' '}
        <strong>{daysLeft} day{daysLeft !== 1 ? 's' : ''}</strong> left!
      </span>
    </motion.div>
  );
}

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
  const { activeTheme } = useTheme();
  const content = activeTheme?.hero_text || { title: "Curated Cupid", desc: "For every chapter, every person, every reason. We transform any day into a dream experience.", accent: "every person" };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden"
      style={{ background: "var(--hero-bg, var(--background))" }}
    >
      {/* Decorative blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[var(--primary)] opacity-[0.06] blur-[120px]" />
        <div className="absolute top-1/4 right-1/5 w-64 h-64 rounded-full bg-[var(--secondary)] opacity-[0.08] blur-[90px]" />
        <div className="absolute bottom-1/4 left-1/5 w-56 h-56 rounded-full bg-[var(--primary-light)] opacity-[0.06] blur-[80px]" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <SectionBadge icon={<Sparkles className="w-3 h-3" />} label="Luxury Gifts & Event Setups" />
      </motion.div>

      <PreorderBanner />

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-5xl md:text-8xl lg:text-9xl font-accent leading-tight md:leading-tight mb-6 max-w-4xl font-serif text-[var(--text-main)] pb-4"
      >
        <span className="text-gradient-pink pb-4 pr-4 block lg:inline-block">Curated Cupid</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-6 text-[var(--text-muted)] text-base md:text-lg max-w-lg leading-relaxed"
      >
        {content.desc.split(content.accent)[0]}
        <span className="font-accent text-[var(--primary)] text-2xl">{content.accent}</span>
        {content.desc.split(content.accent)[1]}
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
          className="flex items-center gap-2 px-8 py-3.5 rounded-full glass border border-[var(--border)] text-[var(--text-muted)] text-sm hover:border-[var(--border)] hover:text-[var(--text-main)] transition-all"
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
          { src: "/gallery-room.png", label: "Event Setups" },
          { src: "/gallery-birthday.png", label: "Celebrations" },
          { src: "/gallery-elegant.png", label: "Surprise Packages" },
        ].map((item) => (
          <motion.div
            key={item.label}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-2xl aspect-[3/4] border border-[var(--border)]"
          >
            <Image src={item.src} alt={item.label} fill className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0914] via-transparent to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-[var(--text-main)] text-xs font-medium">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 text-[var(--text-main)]/15">
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}

// ── Occasions We Create ───────────────────────────────
const occasions = [
  { icon: <Heart className="w-5 h-5" />, title: "Celebrations & Milestones", desc: "Anniversaries, Birthdays, Proposals, Engagements, Graduations, Reunions, Date Nights, or 'Just Because' moments.", iconBg: "bg-pink-900/40", iconColor: "text-pink-400", dot: "#E91E8C", cardGlow: true },
  { icon: <Shield className="w-5 h-5" />, title: "Event Planning", desc: "End-to-end event planning and decor styling for corporate events, product launches, and grand celebrations.", iconBg: "bg-teal-900/40", iconColor: "text-teal-400", dot: "#14B8A6" },
  { icon: <Gem className="w-5 h-5" />, title: "Funerals & Tributes", desc: "Dignified arrangements, floral tributes, and elegant setups to honor and celebrate the lives of loved ones.", iconBg: "bg-slate-800/40", iconColor: "text-slate-300", dot: "#94a3b8" },
  { icon: <Gift className="w-5 h-5" />, title: "Curated Gift Boxes", desc: "Handpicked premium gift collections delivered beautifully packaged for your special someone, friend or family", iconBg: "bg-rose-900/40", iconColor: "text-rose-400", dot: "#F43F5E" },
  { icon: <Crown className="w-5 h-5" />, title: "Premium Add-ons", desc: "Enhance any package with live music, professional photography, gourmet service, and exclusive extras", iconBg: "bg-violet-900/40", iconColor: "text-violet-400", dot: "#8B5CF6" },
];

function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionBadge icon={<Sparkles className="w-3 h-3" />} label="Our Services" />
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-main)] font-serif">Making Every Day Extraordinary</h2>
          <p className="mt-3 text-[var(--text-muted)] text-sm max-w-md mx-auto leading-relaxed">
            From special milestones to <span className="font-accent text-[var(--primary)] text-xl">"just because"</span> moments, we transform any day into a dream experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {occasions.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp(i * 0.08)}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative rounded-2xl p-6 border border-[var(--border)] overflow-hidden group transition-all ${
                s.cardGlow
                  ? "bg-gradient-to-br from-[var(--primary)]/10 to-[var(--surface)]"
                  : "bg-[var(--surface)]"
              }`}
            >
              {/* Corner dot */}
              <div className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.dot, boxShadow: `0 0 10px ${s.dot}80` }} />
              {/* Subtle hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ background: `radial-gradient(circle at 20% 20%, ${s.dot}08, transparent 60%)` }} />

              <div className={`w-10 h-10 rounded-xl ${s.iconBg} ${s.iconColor} flex items-center justify-center mb-5 relative z-10`}>
                {s.icon}
              </div>
              <h3 className="text-[var(--text-main)] font-semibold mb-2 relative z-10 font-serif">{s.title}</h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed relative z-10">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Packages ──────────────────────────────────────────
function Packages() {
  const { dbPackages, dbItems, mostPopularPackageIds } = useBuilder();
  const { activeTheme } = useTheme();

  const isLadiesOnly = activeTheme?.name?.toLowerCase().includes('mother') || activeTheme?.name?.toLowerCase().includes('women');
  const isGuysOnly = activeTheme?.name?.toLowerCase().includes('father') || activeTheme?.name?.toLowerCase().includes('men');
  
  const defaultGender = isLadiesOnly ? 'Ladies' : (isGuysOnly ? 'Guys' : 'Ladies');
  const [activeGender, setActiveGender] = useState(defaultGender);

  useEffect(() => {
    if (isLadiesOnly) setActiveGender('Ladies');
    else if (isGuysOnly) setActiveGender('Guys');
  }, [isLadiesOnly, isGuysOnly]);

  const filteredPackages = dbPackages.filter(p => p.gender === 'all' || p.gender === activeGender.toLowerCase());

  return (
    <section id="packages" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-10">
          <SectionBadge icon={<Gift className="w-3 h-3" />} label="Package Pricing" />
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-main)] font-serif">Select Your Gift</h2>
          <p className="mt-3 text-[var(--text-muted)] text-sm max-w-md mx-auto leading-relaxed">
            Thoughtfully curated packages designed to deliver <span className="font-accent text-[var(--primary)] text-xl">pure joy</span>, no matter the day
          </p>
        </motion.div>

        {/* Gender Filter */}
        {!isLadiesOnly && !isGuysOnly && (
          <div className="flex justify-center mb-10">
            <div className="flex gap-2 glass p-1.5 rounded-full border border-[var(--border)]">
              {["Ladies", "Guys"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveGender(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    activeGender === tab
                      ? "btn-pink-gradient text-white shadow-lg"
                      : "text-[var(--text-muted)] hover:text-[var(--primary)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: mostPopularPackageIds.includes(pkg.id) ? 1.03 : 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -6, scale: mostPopularPackageIds.includes(pkg.id) ? 1.05 : 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={`relative rounded-2xl overflow-hidden flex flex-col ${
                  mostPopularPackageIds.includes(pkg.id)
                    ? "border-2 border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/10 to-[var(--surface)] shadow-[0_0_40px_rgba(212,175,55,0.25)] z-10"
                    : "border border-[var(--border)] bg-[var(--surface)]"
                }`}
              >
                {/* Top tag */}
                {mostPopularPackageIds.includes(pkg.id) && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#D4AF37] to-[#AA8529] text-white text-[10px] font-black uppercase tracking-widest py-1.5 text-center shadow-md z-20">
                    Most Popular Choice
                  </div>
                )}
                
                <div className="p-7 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    mostPopularPackageIds.includes(pkg.id) ? "bg-gradient-to-br from-[#D4AF37] to-[#AA8529] text-white shadow-lg shadow-[#D4AF37]/30" : "bg-[var(--primary-glow)] text-[var(--primary)]"
                  }`}>
                    <Crown className="w-5 h-5" />
                  </div>

                  {/* Name & Price */}
                  <h3 className="text-xl font-bold text-[var(--text-main)] uppercase tracking-wider font-serif">{pkg.name}</h3>
                  <div className="mt-1 mb-5 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[var(--secondary)]">GH₵{pkg.price.toLocaleString()}</span>
                    <span className="text-[var(--text-muted)] text-sm">/ pkg</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {pkg.items.map((itemId: string) => {
                      const itemObj = dbItems.find(i => i.id === itemId);
                      const itemName = itemObj ? itemObj.name : itemId.replace(/-/g, ' ');
                      return (
                        <li key={itemId} className="flex items-start gap-2 text-sm text-[var(--text-muted)] capitalize">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--primary)]`} />
                          {itemName}
                        </li>
                      );
                    })}
                  </ul>

                  {/* CTA */}
                  <Link href={`/builder?package=${encodeURIComponent(pkg.name)}`}>
                    <div className={`w-full py-4 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 ${
                      mostPopularPackageIds.includes(pkg.id)
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#AA8529] text-white shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-[1.02]"
                        : "bg-[var(--primary)] text-white hover:bg-[var(--primary-light)] hover:scale-[1.02]"
                    }`}>
                      Book This Package
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ── Gallery ──────────────────────────────────────────
const galleryItems = [
  { type: "image", src: "/gallery-room.png", label: "Romantic Candlelit Setup", tag: "Anniversary" },
  { type: "image", src: "/gallery-birthday.png", label: "Luxury Bedroom Design", tag: "Celebration" },
  { type: "image", src: "/gallery-elegant.png", label: "Elegant Interior", tag: "Romance" },
  { type: "video", src: null, icon: <Video className="w-12 h-12 text-[#E91E8C]" />, label: "Event Highlight", tag: "Proposal" },
  { type: "image", src: null, icon: <Wine className="w-12 h-12 text-[#E91E8C]" />, label: "Champagne Setup", tag: "VIP" },
  { type: "video", src: null, icon: <Sparkles className="w-12 h-12 text-[#E91E8C]" />, label: "LED Light Display", tag: "Trending" },
];

function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionBadge icon={<Camera className="w-3 h-3" />} label="Our Work" />
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-main)]">Magical Moments</h2>
          <p className="mt-3 text-[var(--text-muted)] text-sm max-w-md mx-auto leading-relaxed">
            Explore our portfolio of unforgettable experiences we&apos;ve created for couples and loved ones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.label}
              {...fadeUp(i * 0.07)}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-[var(--border)] bg-[#12101F] cursor-pointer"
            >
              {item.src ? (
                <>
                  {item.type === "video" ? (
                    <video src={item.src} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-all duration-500" loop muted autoPlay playsInline />
                  ) : (
                    <Image src={item.src} alt={item.label} fill className="object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500" />
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-[#E91E8C]/8 to-purple-900/20 group-hover:scale-105 transition-transform duration-500">
                  {item.icon}
                </div>
              )}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-[var(--border)] flex items-center justify-center group-hover:bg-[#E91E8C]/80 transition-colors">
                    <Play className="w-5 h-5 text-[var(--text-main)] ml-1" />
                  </div>
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
      <div className="max-w-6xl mx-auto relative">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionBadge icon={<Sparkles className="w-3 h-3" />} label="Why Curated Cupid" />
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-main)]">
            Passionate about making <span className="text-gradient-pink pb-2 pr-2">every moment count</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-center group hover:border-[var(--primary)]/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110"
                style={{ background: `${r.color}18`, color: r.color, boxShadow: `0 0 0 0 ${r.color}00` }}>
                {r.icon}
              </div>
              <h3 className="text-[var(--text-main)] font-semibold mb-2">{r.title}</h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Reviews ──────────────────────────────────────────
function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      // Fetch more than 6 to allow "See More" to work
      const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false }).limit(20);
      if (data && data.length > 0) {
        setReviews(data);
        if (data.length <= 3) setHasMore(false);
      } else {
        // Fallback static reviews if db is empty or table not created yet
        const fallback = [
          { name: "Sarah K.", role: "Anniversary Surprise", comment: "The attention to detail was incredible. My husband was speechless! They made our regular Tuesday feel like a fairy tale.", rating: 5 },
          { name: "Michael O.", role: "Birthday Setup", comment: "Fast, professional, and absolutely stunning. The room vibe was exactly what I wanted. Highly recommended!", rating: 5 },
          { name: "Emily B.", role: "Just Because", comment: "I wanted to surprise my bestie for no reason, and Curated Cupid delivered! The gift box was so thoughtful.", rating: 5 },
          { name: "Joshua A.", role: "Birthday", comment: "The best surprise ever. My girlfriend loved it!", rating: 5 },
          { name: "Linda M.", role: "Anniversary", comment: "Professional and neat. Will definitely use again.", rating: 4 },
          { name: "Kofi B.", role: "Just Because", comment: "Great service and timely delivery.", rating: 5 },
        ];
        setReviews(fallback);
      }
    }
    fetchReviews();
  }, []);

  useEffect(() => {
    setHasMore(visibleCount < reviews.length);
  }, [visibleCount, reviews]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newReviewData = {
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        role: "Client"
      };
      await supabase.from('reviews').insert([newReviewData]);
      setShowModal(false);
      alert("Thank you for sharing your experience!");
      setReviews(prev => [newReviewData, ...prev].slice(0, 6));
      setNewReview({ name: "", rating: 5, comment: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionBadge icon={<MessageSquare className="w-3 h-3" />} label="Testimonials" />
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-main)] font-serif">Loved by Our Clients</h2>
          <p className="mt-3 text-[var(--text-muted)] text-sm max-w-md mx-auto">
            Real stories from people who experienced the <span className="font-accent text-[var(--primary)] text-xl">magic</span> of Curated Cupid
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {reviews.slice(0, visibleCount).map((rev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                className="glass border border-[var(--border)] p-8 rounded-3xl relative flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(rev.rating || 5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[var(--secondary)] text-[var(--secondary)]" />)}
                  </div>
                  <p className="text-[var(--text-main)] text-sm italic mb-6 leading-relaxed">"{rev.comment || rev.text}"</p>
                </div>
                <div>
                  <p className="text-[var(--text-main)] font-bold text-sm">{rev.name}</p>
                  <p className="text-[var(--primary)] text-[10px] font-bold uppercase tracking-widest">{rev.role || 'Client'}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div {...fadeUp(0.4)} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasMore && (
            <button 
              onClick={loadMore} 
              className="glass border border-[var(--border)] px-8 py-3 rounded-full text-[var(--text-main)] font-bold text-xs hover:bg-[#E91E8C]/10 hover:border-[#E91E8C]/30 transition-all flex items-center gap-2"
            >
              See More Reviews <ChevronDown className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setShowModal(true)} 
            className="btn-pink-gradient px-8 py-3 rounded-full text-white font-bold text-xs hover:scale-105 transition-all shadow-[0_0_20px_rgba(233,30,140,0.2)]"
          >
            Share Your Experience
          </button>
        </motion.div>
      </div>

      {/* Submit Review Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#12101F] border border-[var(--border)] rounded-3xl p-6 w-full max-w-md relative"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-main)]">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">Share Your Experience</h3>
              <p className="text-[var(--text-muted)] text-sm mb-6">Tell us about your Curated Cupid moment.</p>
              
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[var(--text-muted)] text-xs">Your Name</label>
                  <input
                    required
                    type="text"
                    value={newReview.name}
                    onChange={e => setNewReview({...newReview, name: e.target.value})}
                    className="w-full bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-main)] text-sm focus:border-[#E91E8C] focus:outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[var(--text-muted)] text-xs">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className={`text-2xl transition-transform hover:scale-110 ${newReview.rating >= star ? 'text-[#D4AF37]' : 'text-[var(--text-main)]/10'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[var(--text-muted)] text-xs">Your Comment</label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.comment}
                    onChange={e => setNewReview({...newReview, comment: e.target.value})}
                    className="w-full bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-main)] text-sm focus:border-[#E91E8C] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us what you loved..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting || !newReview.name || !newReview.comment}
                  className="w-full btn-pink-gradient py-3.5 rounded-xl font-bold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-main)]">Let&apos;s Create Your Moment</h2>
          <p className="mt-3 text-[var(--text-muted)] text-sm max-w-md mx-auto leading-relaxed">
            Ready to create something magical? Reach out and we&apos;ll make it happen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 space-y-6">
            <div className="bg-[#12101F]/80 border border-[var(--border)] rounded-2xl p-6 space-y-5">
              <h3 className="text-white font-semibold text-lg">Contact Details</h3>
              {[
                { icon: <Phone className="w-4 h-4" />, label: "Phone", value: "+233 24 123 4567" },
                { icon: <Mail className="w-4 h-4" />, label: "Email", value: "hello@curatedcupid.com" },
                { icon: <MapPin className="w-4 h-4" />, label: "Location", value: "Ayeduase - Kumasi, Ghana" },
                { icon: <Clock className="w-4 h-4" />, label: "Hours", value: "Mon–Sun, 8am – 9pm" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E91E8C]/12 text-[#E91E8C] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-0.5">{item.label}</p>
                    <p className="text-white text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social handles */}
            <div className="bg-[#12101F]/80 border border-[var(--border)] rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-semibold text-sm">Follow Our Magic</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "WhatsApp", icon: <MessageCircle className="w-4 h-4" />, color: "bg-green-500/10 text-green-400 border-green-500/20", link: "https://wa.me/233241234567" },
                  { name: "TikTok", icon: <Music className="w-4 h-4" />, color: "bg-white/5 text-[var(--text-main)] border-[var(--border)]", link: "https://tiktok.com/@curatedcupid" },
                  { name: "Snapchat", icon: <Ghost className="w-4 h-4" />, color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", link: "https://snapchat.com/add/curatedcupid" },
                  { name: "Instagram", icon: <Camera className="w-4 h-4" />, color: "bg-pink-500/10 text-pink-400 border-pink-500/20", link: "https://instagram.com/curatedcupid" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border hover:scale-105 transition-all text-xs font-semibold ${social.color}`}
                  >
                    <span>{social.icon}</span>
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-3">
            <div className="bg-[#12101F]/80 border border-[var(--border)] rounded-2xl p-7">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-white/60 text-xs">Your Name</label>
                    <input type="text" placeholder="e.g. Amara Johnson" className="w-full bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#E91E8C]/50 focus:shadow-[0_0_12px_rgba(233,30,140,0.1)] transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-white/60 text-xs">Phone / WhatsApp</label>
                    <input type="tel" placeholder="e.g. 0241234567" className="w-full bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#E91E8C]/50 focus:shadow-[0_0_12px_rgba(233,30,140,0.1)] transition-all" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/60 text-xs">Email Address</label>
                  <input type="email" placeholder="your@email.com" className="w-full bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#E91E8C]/50 focus:shadow-[0_0_12px_rgba(233,30,140,0.1)] transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/60 text-xs">Event Date (Approx.)</label>
                  <input type="date" className="w-full bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E91E8C]/50 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/60 text-xs">Message</label>
                  <textarea rows={4} placeholder="Tell us about your dream setup..." className="w-full bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#E91E8C]/50 focus:shadow-[0_0_12px_rgba(233,30,140,0.1)] transition-all resize-none" />
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
        className="max-w-3xl mx-auto relative overflow-hidden rounded-3xl border border-[#E91E8C]/15 p-12 text-center flex flex-col items-center"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(233,30,140,0.12), transparent 60%), #12101F" }}
      >
        <div className="text-5xl mb-4 text-[#E91E8C]"><Heart className="w-12 h-12 fill-[#E91E8C]" /></div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Make someone smile today</h2>
        <p className="text-white/60 text-sm mb-8 max-w-md mx-auto leading-relaxed">
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
    <footer className="border-t border-[var(--border)] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full btn-pink-gradient flex items-center justify-center">
                <Heart className="w-4 h-4 text-[var(--text-main)] fill-white" />
              </div>
              <div className="flex flex-col pb-1">
                <span className="font-accent text-2xl text-[var(--primary)] leading-normal mt-1 pb-2 pr-2">Curated Cupid</span>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">
              Luxury celebration experiences crafted with care for every special chapter in your story.
            </p>
          </div>
          <div>
            <p className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-widest mb-4">Quick Links</p>
            <div className="space-y-2">
              {["Services", "Packages", "Gallery", "Contact"].map((l) => (
                <Link key={l} href={`#${l.toLowerCase()}`} className="block text-[var(--text-muted)] text-sm hover:text-[#E91E8C] transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-widest mb-4">Contact</p>
            <div className="space-y-2 text-[var(--text-muted)] text-sm">
              <p>+233 24 123 4567</p>
              <p>hello@curatedcupid.com</p>
              <p>Ayeduase - Kumasi, Ghana</p>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[var(--text-main)]/20 text-xs">
          <p>© {new Date().getFullYear()} Curated Cupid. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <Heart className="w-3 h-3 text-[#E91E8C] fill-[#E91E8C]" /> in Kumasi</p>
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
        <Reviews />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
    </BuilderProvider>
  );
}
