"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";

export default function Navbar() {
  const { cart } = useBuilder();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E91E8C] to-[#7C3AED] flex items-center justify-center shadow-[0_0_12px_rgba(233,30,140,0.5)]">
            <Heart className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <span className="font-semibold text-base tracking-tight text-white">
            Curated<span className="text-[#E91E8C]">Cupid</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/#gallery" className="hover:text-white transition-colors">Gallery</Link>
          <Link href="/#about" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Cart + CTA */}
        <div className="flex items-center gap-3">
          <Link href="/builder" className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center hover:border-[#E91E8C]/40 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-white/70" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E91E8C] text-white text-[10px] font-bold flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.div>
          </Link>
          <Link
            href="/builder"
            className="hidden md:flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E91E8C] text-white text-sm font-semibold shadow-[0_0_20px_rgba(233,30,140,0.4)] hover:shadow-[0_0_30px_rgba(233,30,140,0.6)] hover:-translate-y-0.5 transition-all"
          >
            Book Now
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
