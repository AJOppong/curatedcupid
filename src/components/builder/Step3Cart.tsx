"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import Button from "@/components/ui/Button";
import {
  ArrowRight, ArrowLeft, Trash2, Plus, Minus,
  ShoppingBag, Package, Gift, Sparkles, ChevronLeft
} from "lucide-react";

export default function Step3Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, setStep, selectedPackageName } = useBuilder();
  const SERVICE_FEE = 50;
  const totalWithFee = cartTotal + SERVICE_FEE;
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  // Empty state
  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-20 flex flex-col items-center gap-6 text-center"
      >
        <div className="w-24 h-24 rounded-3xl bg-white/4 border border-white/8 flex items-center justify-center text-5xl">
          🛒
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-white/40 text-sm">Go back and pick some items to build your experience</p>
        </div>
        <Button variant="secondary" onClick={() => setStep(2)} className="px-8">
          <ArrowLeft className="w-4 h-4" /> Browse Items
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
          Review Your <span className="text-[#E91E8C]">Order</span>
        </h2>
        <p className="text-white/40 text-sm">
          {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* LEFT: Items list (wider) */}
        <div className="lg:col-span-3 space-y-3">
          {/* Package badge */}
          {selectedPackageName && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 px-4 py-2.5 glass border border-[#E91E8C]/25 bg-[#E91E8C]/5 rounded-2xl w-fit"
            >
              <Package className="w-3.5 h-3.5 text-[#E91E8C]" />
              <span className="text-white/80 text-xs font-bold">{selectedPackageName}</span>
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            </motion.div>
          )}

          {/* Items */}
          <AnimatePresence initial={false}>
            {cart.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0, padding: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 30, delay: idx * 0.04 }}
                className="glass border border-white/8 rounded-2xl p-4 flex items-center gap-4 group hover:border-white/15 transition-all"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E91E8C]/10 to-[#7C3AED]/10 border border-white/5 flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-105 transition-transform">
                  {item.image}
                </div>

                {/* Name & unit price */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-white/35 text-xs mt-0.5">
                    GH₵{item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>

                {/* Qty controls */}
                <div className="flex items-center gap-1.5 bg-white/4 border border-white/8 rounded-full p-1 flex-shrink-0">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/8 transition-all"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-white text-sm font-black w-5 text-center select-none">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/8 transition-all"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Line total */}
                <motion.p
                  key={item.price * item.quantity}
                  initial={{ scale: 1.15, color: "#E91E8C" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  transition={{ duration: 0.25 }}
                  className="text-white font-bold text-sm w-20 text-right flex-shrink-0 tabular-nums"
                >
                  GH₵{(item.price * item.quantity).toLocaleString()}
                </motion.p>

                {/* Delete */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white/15 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0 ml-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add more link */}
          <button
            onClick={() => setStep(2)}
            className="w-full py-3.5 rounded-2xl border border-dashed border-white/10 text-white/30 hover:border-[#E91E8C]/30 hover:text-[#E91E8C] transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group"
          >
            <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
            Add More Items
          </button>
        </div>

        {/* RIGHT: Order Summary (sticky) */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass border border-white/10 rounded-3xl p-6 sticky top-24 space-y-5 shadow-[0_0_60px_rgba(0,0,0,0.4)]"
          >
            {/* Summary header */}
            <div className="flex items-center gap-2 pb-4 border-b border-white/8">
              <Gift className="w-4 h-4 text-[#E91E8C]" />
              <h3 className="text-white font-black text-sm uppercase tracking-widest">Order Summary</h3>
            </div>

            {/* Line items summary */}
            <div className="space-y-3 max-h-52 overflow-y-auto pr-1 scrollbar-hide">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base flex-shrink-0">{item.image}</span>
                    <span className="text-white/60 text-xs truncate">{item.name}</span>
                    {item.quantity > 1 && (
                      <span className="text-[10px] font-bold text-white/30 flex-shrink-0">×{item.quantity}</span>
                    )}
                  </div>
                  <span className="text-white/80 text-xs font-bold flex-shrink-0 tabular-nums">
                    GH₵{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t border-white/8">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
                <motion.span
                  key={cartTotal}
                  initial={{ opacity: 0.5, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white font-bold tabular-nums"
                >
                  GH₵{cartTotal.toLocaleString()}
                </motion.span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Service & Packaging</span>
                <span className="text-white/60 font-bold">GH₵{SERVICE_FEE}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#E91E8C]/10 to-[#7C3AED]/10 border border-[#E91E8C]/20 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-white font-bold text-sm">Total</span>
              <motion.span
                key={totalWithFee}
                initial={{ scale: 1.1, color: "#E91E8C" }}
                animate={{ scale: 1, color: "#D4AF37" }}
                transition={{ duration: 0.3 }}
                className="font-black text-2xl tabular-nums"
              >
                GH₵{totalWithFee.toLocaleString()}
              </motion.span>
            </div>

            {/* CTA */}
            <Button
              onClick={() => setStep(4)}
              className="w-full py-4 text-base shadow-[0_0_30px_rgba(233,30,140,0.3)]"
            >
              <ShoppingBag className="w-5 h-5" />
              Book Now
              <ArrowRight className="w-4 h-4" />
            </Button>

            <button
              onClick={() => setStep(2)}
              className="w-full flex items-center justify-center gap-1.5 text-white/25 hover:text-white/60 text-xs font-bold transition-colors"
            >
              <ChevronLeft className="w-3 h-3" /> Edit Package
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
