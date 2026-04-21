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
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F2B8C6] to-[#9b87f5] flex items-center justify-center shadow-[0_0_12px_rgba(242,184,198,0.5)]">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            Curated<span className="text-[#F2B8C6]">Cupid</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <Link href="/#services" className="hover:text-[#F2B8C6] transition-colors">Services</Link>
          <Link href="/#gallery" className="hover:text-[#F2B8C6] transition-colors">Gallery</Link>
          <Link href="/#about" className="hover:text-[#F2B8C6] transition-colors">About</Link>
        </div>

        {/* CTA + Cart */}
        <div className="flex items-center gap-4">
          <Link href="/builder" className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:border-[#F2B8C6]/40 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-white/70" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#F2B8C6] to-[#c994ac] text-[#0B0B0F] text-xs font-bold flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.div>
          </Link>
          <Link
            href="/builder"
            className="hidden md:block px-5 py-2 rounded-xl bg-gradient-to-r from-[#F2B8C6] to-[#c994ac] text-[#0B0B0F] text-sm font-semibold shadow-[0_0_20px_rgba(242,184,198,0.3)] hover:shadow-[0_0_30px_rgba(242,184,198,0.5)] transition-shadow"
          >
            Start Your Surprise
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
