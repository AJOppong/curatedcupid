"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Menu, X, Sun, Moon, Palette, Flower2, Sparkles, Gift, Star } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#packages", label: "Packages" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const { cart } = useBuilder();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border)]"
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full btn-pink-gradient flex items-center justify-center shadow-sm">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-accent text-2xl text-[var(--primary)] leading-none mt-1">
                Curated Cupid
              </span>
            </div>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--text-muted)] font-medium">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[var(--primary)] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Theme + Cart + CTA + Hamburger */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Cart */}
            <Link href="/builder" className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full glass border border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)]/40 transition-colors"
              >
                <ShoppingCart className="w-4 h-4 text-[var(--text-muted)]" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full btn-pink-gradient text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Book Now — desktop only */}
            <Link
              href="/builder"
              className="hidden md:flex items-center gap-1.5 px-5 py-2 rounded-full btn-pink-gradient text-white text-sm font-semibold transition-all"
            >
              Book Now
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-white/8 px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/70 text-base font-medium hover:text-white transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/builder"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#c4186f] text-white font-semibold text-sm shadow-[0_0_20px_rgba(233,30,140,0.4)]"
              >
                <Heart className="w-4 h-4 fill-white" /> Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
