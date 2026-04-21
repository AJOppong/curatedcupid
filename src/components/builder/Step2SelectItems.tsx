"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import { shopItems } from "@/lib/data";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, Plus, Minus, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

const CATEGORIES = ["All", "Decor", "Lighting", "Flowers", "Treats", "Gifts", "Personal", "Drinks", "Experience"];

export default function Step2SelectItems() {
  const { addToCart, removeFromCart, updateQuantity, cart, setStep } = useBuilder();
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const filtered = activeCategory === "All"
    ? shopItems
    : shopItems.filter((i) => i.category === activeCategory);

  const getCartItem = (id: string) => cart.find((c) => c.id === id);

  const handleAdd = (item: typeof shopItems[0]) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.emoji });
    setAddedIds((prev) => [...prev, item.id]);
    setTimeout(() => setAddedIds((prev) => prev.filter((id) => id !== item.id)), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Build Your <span className="text-[#E91E8C]">Package</span>
        </h2>
        <p className="text-white/40 text-sm">Select items to add to your experience</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-[#E91E8C] text-white shadow-[0_0_15px_rgba(233,30,140,0.4)]"
                : "glass border border-white/8 text-white/50 hover:border-[#E91E8C]/30 hover:text-white/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item, i) => {
          const cartItem = getCartItem(item.id);
          const justAdded = addedIds.includes(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="glass border border-white/8 rounded-2xl p-4 flex flex-col gap-3 hover:border-[#E91E8C]/25 transition-all"
            >
              <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-[#E91E8C]/6 to-[#7C3AED]/6 flex items-center justify-center text-4xl border border-white/5">
                {item.emoji}
              </div>
              <div>
                <p className="text-white text-sm font-medium leading-tight">{item.name}</p>
                <p className="text-white/35 text-xs mt-0.5 leading-snug line-clamp-2">{item.description}</p>
              </div>
              <div className="mt-auto">
                <p className="text-[#D4AF37] font-bold text-sm mb-2">₦{item.price.toLocaleString()}</p>

                {cartItem ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        cartItem.quantity === 1
                          ? removeFromCart(item.id)
                          : updateQuantity(item.id, cartItem.quantity - 1)
                      }
                      className="w-7 h-7 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-[#E91E8C] hover:border-[#E91E8C]/30 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-white text-sm font-medium w-6 text-center">{cartItem.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                      className="w-7 h-7 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-[#E91E8C] hover:border-[#E91E8C]/30 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAdd(item)}
                    className={`w-full py-2 rounded-full text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                      justAdded
                        ? "bg-green-500/20 border border-green-500/30 text-green-400"
                        : "bg-[#E91E8C]/10 border border-[#E91E8C]/20 text-[#E91E8C] hover:bg-[#E91E8C]/20"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {justAdded ? (
                        <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                          <Check className="w-3 h-3" /> Added!
                        </motion.span>
                      ) : (
                        <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Add to Cart
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button variant="secondary" onClick={() => setStep(1)}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex items-center gap-3">
          {cart.length > 0 && (
            <span className="text-white/40 text-sm flex items-center gap-1">
              <ShoppingCart className="w-4 h-4 text-[#E91E8C]" />
              {cart.reduce((s, i) => s + i.quantity, 0)} item{cart.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
            </span>
          )}
          <Button onClick={() => setStep(3)} disabled={cart.length === 0} className="px-8">
            View Cart <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
