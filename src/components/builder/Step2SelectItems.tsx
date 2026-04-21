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
          Build Your <span className="text-[#F2B8C6]">Package</span>
        </h2>
        <p className="text-white/50 text-sm">Select items to add to your experience</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-gradient-to-r from-[#F2B8C6] to-[#c994ac] text-[#0B0B0F]"
                : "glass border border-white/10 text-white/60 hover:border-[#F2B8C6]/40"
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
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass border border-white/10 rounded-2xl p-4 flex flex-col gap-3 hover:border-[#F2B8C6]/30 transition-all"
            >
              <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-[#F2B8C6]/5 to-[#9b87f5]/5 flex items-center justify-center text-4xl border border-white/5">
                {item.emoji}
              </div>
              <div>
                <p className="text-white text-sm font-medium leading-tight">{item.name}</p>
                <p className="text-white/40 text-xs mt-0.5 leading-snug">{item.description}</p>
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
                      className="w-7 h-7 rounded-lg glass border border-white/10 flex items-center justify-center text-white/70 hover:text-[#F2B8C6] transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-white text-sm font-medium w-6 text-center">{cartItem.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                      className="w-7 h-7 rounded-lg glass border border-white/10 flex items-center justify-center text-white/70 hover:text-[#F2B8C6] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAdd(item)}
                    className={`w-full py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                      justAdded
                        ? "bg-green-500/20 border border-green-500/30 text-green-400"
                        : "bg-[#F2B8C6]/10 border border-[#F2B8C6]/20 text-[#F2B8C6] hover:bg-[#F2B8C6]/20"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {justAdded ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" /> Added!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-1"
                        >
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

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="secondary" onClick={() => setStep(1)}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex items-center gap-3">
          {cart.length > 0 && (
            <span className="text-white/50 text-sm flex items-center gap-1">
              <ShoppingCart className="w-4 h-4" />
              {cart.reduce((s, i) => s + i.quantity, 0)} item{cart.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""} selected
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
