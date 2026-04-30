"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import Button from "@/components/ui/Button";
import {
  ArrowRight, ArrowLeft, Trash2, Plus, Minus,
  ShoppingBag, Package, Gift, Sparkles, ChevronLeft, Camera, X
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";

export default function Step3Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, setStep, selectedPackageName, setCartItemNote } = useBuilder();
  const SERVICE_FEE = 50;
  const totalWithFee = cartTotal + SERVICE_FEE;
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  const renderCartIcon = (imageStr: string, className?: string) => {
    const isPath = imageStr && (imageStr.startsWith('/') || imageStr.startsWith('http') || imageStr.startsWith('data:image'));
    if (isPath) {
      return (
        <div className={`relative overflow-hidden ${className}`}>
          <Image src={imageStr} alt="Item" fill className="object-cover" />
        </div>
      );
    }
    const IconComponent = imageStr && (LucideIcons as any)[imageStr] ? (LucideIcons as any)[imageStr] : LucideIcons.HelpCircle;
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <IconComponent className="w-1/2 h-1/2 text-[var(--text-main)] opacity-80" />
      </div>
    );
  };

  // Empty state
  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-20 flex flex-col items-center gap-6 text-center"
      >
        <div className="w-24 h-24 rounded-3xl bg-[var(--glass-bg)] border border-[var(--border)] flex items-center justify-center text-5xl">
          🛒
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">Your cart is empty</h2>
          <p className="text-[var(--text-muted)] text-sm">Go back and pick some items to build your experience</p>
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
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-1">
          Review Your <span className="text-[#E91E8C]">Order</span>
        </h2>
        <p className="text-[var(--text-muted)] text-sm">
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
              <span className="text-[var(--text-muted)] text-xs font-bold">{selectedPackageName}</span>
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
                className="glass border border-[var(--border)] rounded-2xl p-4 flex items-center gap-4 group hover:border-[var(--border)] transition-all"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[var(--glass-bg)] border border-[var(--border)] flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                  {renderCartIcon(item.image, "w-full h-full")}
                </div>

                {/* Name & unit price */}
                <div className="flex-1 min-w-0">
                  <p className="text-[var(--text-main)] font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-[var(--text-muted)] text-xs mt-0.5">
                    GH₵{item.price.toLocaleString()} × {item.quantity}
                  </p>
                  <div className="mt-1.5 w-full flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Add a note (e.g. size, engraving)..."
                      value={item.customNote || ''}
                      onChange={e => setCartItemNote(item.id, e.target.value)}
                      className="w-full text-[10px] bg-white/5 border border-[var(--border)] rounded-lg px-2 py-1.5 text-[var(--text-main)] placeholder-white/40 focus:outline-none focus:border-[#E91E8C]/40 transition-all"
                    />
                    <div className="flex items-center gap-2">
                      <div className="relative w-full">
                        <input
                          type="file"
                          accept="image/*"
                          id={`file-cart-${item.id}`}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                // @ts-ignore - setCartItemImage will be available in context
                                if (typeof useBuilder().setCartItemImage === 'function') {
                                  // @ts-ignore
                                  useBuilder().setCartItemImage(item.id, reader.result as string);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <label htmlFor={`file-cart-${item.id}`} className="flex items-center justify-center gap-1.5 w-full text-[10px] bg-[var(--glass-bg)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[var(--text-main)] cursor-pointer hover:border-[#E91E8C]/30 transition-all font-medium">
                          <Camera className="w-3.5 h-3.5" />
                          {item.customImage ? "Change Image" : "Upload Reference"}
                        </label>
                      </div>
                      
                      {item.customImage && (
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[var(--border)] shadow-sm flex-shrink-0">
                           <Image src={item.customImage} alt="Custom" fill className="object-cover" />
                           <button onClick={() => {
                             // @ts-ignore
                             if (typeof useBuilder().setCartItemImage === 'function') useBuilder().setCartItemImage(item.id, "");
                           }} className="absolute top-0 right-0 bg-black/60 rounded-full text-white p-0.5 m-0.5">
                             <X className="w-2.5 h-2.5"/>
                           </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Qty controls */}
                <div className="flex items-center gap-1.5 bg-[var(--glass-bg)] border border-[var(--border)] rounded-full p-1 flex-shrink-0">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-bg)] transition-all"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-[var(--text-main)] text-sm font-black w-5 text-center select-none">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-bg)] transition-all"
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
                  className="text-[var(--text-main)] font-bold text-sm w-20 text-right flex-shrink-0 tabular-nums"
                >
                  GH₵{(item.price * item.quantity).toLocaleString()}
                </motion.p>

                {/* Delete */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0 ml-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add more link */}
          <button
            onClick={() => setStep(2)}
            className="w-full py-3.5 rounded-2xl border border-dashed border-[var(--border)] text-[var(--text-muted)] hover:border-[#E91E8C]/30 hover:text-[#E91E8C] transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group"
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
            className="glass border border-[var(--border)] rounded-3xl p-6 sticky top-24 space-y-5 shadow-[0_0_60px_rgba(0,0,0,0.4)]"
          >
            {/* Summary header */}
            <div className="flex items-center gap-2 pb-4 border-b border-[var(--border)]">
              <Gift className="w-4 h-4 text-[#E91E8C]" />
              <h3 className="text-[var(--text-main)] font-black text-sm uppercase tracking-widest">Order Summary</h3>
            </div>

            {/* Line items summary */}
            <div className="space-y-3 max-h-52 overflow-y-auto pr-1 scrollbar-hide">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 flex-shrink-0 rounded flex items-center justify-center overflow-hidden border border-[var(--border)]">{renderCartIcon(item.image, "w-full h-full")}</span>
                    <span className="text-[var(--text-muted)] text-xs truncate">{item.name}</span>
                    {item.quantity > 1 && (
                      <span className="text-[10px] font-bold text-[var(--text-muted)] flex-shrink-0">×{item.quantity}</span>
                    )}
                  </div>
                  <span className="text-[var(--text-muted)] text-xs font-bold flex-shrink-0 tabular-nums">
                    GH₵{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)]">Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
                <motion.span
                  key={cartTotal}
                  initial={{ opacity: 0.5, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[var(--text-main)] font-bold tabular-nums"
                >
                  GH₵{cartTotal.toLocaleString()}
                </motion.span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)]">Service & Packaging</span>
                <span className="text-[var(--text-muted)] font-bold">GH₵{SERVICE_FEE}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#E91E8C]/10 to-[#7C3AED]/10 border border-[#E91E8C]/20 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-[var(--text-main)] font-bold text-sm">Total</span>
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
              className="w-full flex items-center justify-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-muted)] text-xs font-bold transition-colors"
            >
              <ChevronLeft className="w-3 h-3" /> Edit Package
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
