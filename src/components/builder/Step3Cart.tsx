"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Package } from "lucide-react";

export default function Step3Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, setStep, selectedPackageName } = useBuilder();
  const totalWithFee = cartTotal + 50;

  if (cart.length === 0) {
    return (
      <div className="space-y-8 text-center py-16">
        <div className="text-6xl">🛒</div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-white/40 text-sm">Go back and add some items to build your experience</p>
        </div>
        <Button variant="secondary" onClick={() => setStep(2)}>
          <ArrowLeft className="w-4 h-4" /> Browse Items
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Your <span className="text-[#E91E8C]">Cart</span>
        </h2>
        <p className="text-white/40 text-sm">Review your selected items before continuing</p>
      </div>

      {/* Package Badge */}
      {selectedPackageName && (
        <div className="flex items-center gap-2 px-4 py-2 glass border border-[#E91E8C]/20 rounded-xl w-fit">
          <Package className="w-3.5 h-3.5 text-[#E91E8C]" />
          <span className="text-white/70 text-xs font-bold">{selectedPackageName}</span>
        </div>
      )}

      {/* Cart Items */}
      <div className="space-y-3">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass border border-white/8 rounded-2xl p-4 flex items-center gap-4"
            >
              {/* Emoji */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E91E8C]/8 to-[#7C3AED]/8 border border-white/5 flex items-center justify-center text-2xl flex-shrink-0">
                {item.image}
              </div>

              {/* Name & Price */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{item.name}</p>
                <p className="text-[#D4AF37] text-xs mt-0.5">GH₵{item.price.toLocaleString()} each</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-[#E91E8C] hover:border-[#E91E8C]/30 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-white text-sm font-bold w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-[#E91E8C] hover:border-[#E91E8C]/30 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Line Total */}
              <p className="text-white font-semibold text-sm w-20 text-right flex-shrink-0">
                GH₵{(item.price * item.quantity).toLocaleString()}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-white/20 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-all ml-1 flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Total Summary */}
      <div className="glass border border-white/8 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/40">Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span className="text-white">GH₵{cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/40">Service & Packaging fee</span>
          <span className="text-white">GH₵50</span>
        </div>
        <div className="border-t border-white/8 pt-3 flex items-center justify-between">
          <span className="text-white font-bold">Total</span>
          <span className="text-[#D4AF37] font-black text-2xl">GH₵{totalWithFee.toLocaleString()}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" onClick={() => setStep(2)}>
          <ArrowLeft className="w-4 h-4" /> Edit Items
        </Button>
        <Button onClick={() => setStep(4)} className="px-8 shadow-[0_0_25px_rgba(233,30,140,0.3)]">
          <ShoppingBag className="w-4 h-4" /> Book Now <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
