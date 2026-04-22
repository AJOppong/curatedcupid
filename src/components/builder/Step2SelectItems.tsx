"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import { shopItems, predefinedPackages } from "@/lib/data";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, Plus, Minus, Check, Package, Sparkles, Trash2, PlusCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";

const CATEGORIES = ["All", "Decor", "Lighting", "Flowers", "Treats", "Gifts", "Personal", "Drinks", "Experience"];

export default function Step2SelectItems() {
  const {
    addToCart, removeFromCart, updateQuantity, clearCart, preloadItems,
    cart, setStep, baseService, selectedPackageName
  } = useBuilder();

  const [activeCategory, setActiveCategory] = useState("All");
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const filtered = activeCategory === "All"
    ? shopItems
    : shopItems.filter((i) => i.category === activeCategory);

  const getCartItem = (id: string) => cart.find((c) => c.id === id);
  const cartItemCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleAdd = (item: typeof shopItems[0]) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.emoji, quantity: 1 });
    setAddedIds((prev) => [...prev, item.id]);
    setTimeout(() => setAddedIds((prev) => prev.filter((id) => id !== item.id)), 1500);
  };

  const handlePackageSelect = (pkg: typeof predefinedPackages[0]) => {
    const itemsToLoad = pkg.items.map(itemId => {
      const item = shopItems.find(si => si.id === itemId);
      return item ? { id: item.id, name: item.name, price: item.price, image: item.emoji, quantity: 1 } : null;
    }).filter(Boolean) as any;
    preloadItems(itemsToLoad, pkg.name);
  };

  // If a package is selected, show two-column layout
  if (selectedPackageName && cart.length > 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
            Customize Your <span className="text-[#E91E8C]">Package</span>
          </h2>
          <p className="text-white/40 text-sm">Remove items you don't need or add extras from the shop</p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* LEFT: Selected Package Panel */}
          <div className="space-y-4">
            {/* Package Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E91E8C] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#E91E8C]/20">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-black text-base uppercase tracking-tight">{selectedPackageName}</h3>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
                    {cartItemCount} item{cartItemCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button
                onClick={() => clearCart()}
                className="text-[10px] text-white/20 hover:text-red-400 transition-colors uppercase font-bold border border-white/8 rounded-full px-3 py-1"
              >
                Reset
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              <AnimatePresence>
                {cart.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ delay: idx * 0.04, type: "spring", stiffness: 300, damping: 28 }}
                    className="glass border border-white/8 rounded-2xl p-3 flex items-center gap-3 group hover:border-[#E91E8C]/20 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-[#D4AF37] text-[11px] font-bold">GH₵{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="text-white text-xs font-black w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all ml-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Subtotal */}
            <div className="glass border border-white/8 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>Subtotal</span>
                <span className="text-white font-bold">GH₵{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>Service & Packaging</span>
                <span className="text-white font-bold">GH₵50</span>
              </div>
              <div className="border-t border-white/8 pt-2 flex items-center justify-between">
                <span className="text-white font-bold text-sm">Total</span>
                <span className="text-[#D4AF37] font-black text-lg">GH₵{(cartSubtotal + 50).toLocaleString()}</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setStep(1)} className="flex-1 text-xs py-3">
                <ArrowLeft className="w-3 h-3" /> Back
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1 py-3 shadow-[0_0_20px_rgba(233,30,140,0.25)]">
                <ShoppingCart className="w-4 h-4" /> View Cart <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* RIGHT: Add Extra Items */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-[#E91E8C]" />
              <h4 className="text-white font-black text-sm uppercase tracking-tight">Add Extra Items</h4>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap transition-all flex-shrink-0 ${
                    activeCategory === cat
                      ? "bg-[#E91E8C] text-white"
                      : "glass border border-white/8 text-white/40 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1 scrollbar-hide">
              {filtered.map((item, i) => {
                const cartItem = getCartItem(item.id);
                const justAdded = addedIds.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={`glass border rounded-2xl p-3 flex flex-col gap-2 transition-all ${
                      cartItem ? "border-[#E91E8C]/30 bg-[#E91E8C]/5" : "border-white/8 hover:border-white/15"
                    }`}
                  >
                    <div className="w-full aspect-square rounded-xl bg-white/4 flex items-center justify-center text-3xl border border-white/5">
                      {item.emoji}
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold leading-tight line-clamp-1">{item.name}</p>
                      <p className="text-[#D4AF37] text-[11px] font-bold mt-0.5">GH₵{item.price.toLocaleString()}</p>
                    </div>

                    {cartItem ? (
                      <div className="flex items-center gap-1 mt-auto">
                        <button
                          onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                          className="flex-1 py-1 rounded-lg glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white text-xs transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white font-black text-xs w-6 text-center">{cartItem.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                          className="flex-1 py-1 rounded-lg glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white text-xs transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAdd(item)}
                        className={`mt-auto w-full py-1.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-1 ${
                          justAdded
                            ? "bg-green-500/20 border border-green-500/30 text-green-400"
                            : "bg-white/5 border border-white/8 text-white/60 hover:bg-[#E91E8C]/15 hover:border-[#E91E8C]/30 hover:text-[#E91E8C]"
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {justAdded ? (
                            <motion.span key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                              <Check className="w-3 h-3" /> Added
                            </motion.span>
                          ) : (
                            <motion.span key="a" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                              <Plus className="w-3 h-3" /> Add
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: No package selected — show package picker or scratch builder
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Choose Your <span className="text-[#E91E8C]">Experience</span>
        </h2>
        <p className="text-white/40 text-sm">Pick a curated package to start, or build your own from scratch</p>
      </div>

      {/* Package Picker */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-white/30 uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-[#E91E8C]" /> Curated Packages
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
          {predefinedPackages.map((pkg) => (
            <motion.button
              key={pkg.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handlePackageSelect(pkg)}
              className="flex-shrink-0 w-60 glass border border-white/8 rounded-3xl p-5 text-left hover:border-[#E91E8C]/40 hover:shadow-[0_0_30px_rgba(233,30,140,0.12)] transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#E91E8C]/10 flex items-center justify-center group-hover:bg-[#E91E8C]/20 transition-all">
                  <Package className="w-5 h-5 text-[#E91E8C]" />
                </div>
                <span className="text-xs font-black text-[#D4AF37]">GH₵{pkg.price.toLocaleString()}</span>
              </div>
              <h4 className="text-white font-bold text-base mb-1">{pkg.name}</h4>
              <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest mb-4">{pkg.items.length} Premium Items</p>
              <div className="flex items-center gap-1.5 text-[10px] font-black text-[#E91E8C] group-hover:translate-x-1 transition-transform">
                CUSTOMIZE PACKAGE <ArrowRight className="w-3 h-3" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="relative flex items-center gap-4">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Build from scratch */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-white/30 uppercase tracking-widest">
          Build from Scratch
        </div>
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === cat
                  ? "bg-[#E91E8C] text-white"
                  : "glass border border-white/8 text-white/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => {
            const cartItem = getCartItem(item.id);
            const justAdded = addedIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4 }}
                className="glass border border-white/8 rounded-2xl p-4 flex flex-col gap-3 hover:border-[#E91E8C]/25 transition-all"
              >
                <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-[#E91E8C]/6 to-[#7C3AED]/6 flex items-center justify-center text-4xl border border-white/5">
                  {item.emoji}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{item.name}</p>
                  <p className="text-white/35 text-[10px] mt-0.5 line-clamp-1">{item.description}</p>
                </div>
                <div className="mt-auto">
                  <p className="text-[#D4AF37] font-bold text-sm mb-2">GH₵{item.price.toLocaleString()}</p>
                  {cartItem ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, cartItem.quantity - 1)} className="w-7 h-7 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-[#E91E8C] hover:border-[#E91E8C]/30 transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white text-sm font-black w-6 text-center">{cartItem.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, cartItem.quantity + 1)} className="w-7 h-7 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-[#E91E8C] hover:border-[#E91E8C]/30 transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAdd(item)}
                      className={`w-full py-2 rounded-full text-[10px] font-black uppercase transition-all flex items-center justify-center gap-1 ${
                        justAdded
                          ? "bg-green-500/20 border border-green-500/30 text-green-400"
                          : "bg-[#E91E8C]/10 border border-[#E91E8C]/20 text-[#E91E8C] hover:bg-[#E91E8C]/20"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {justAdded ? (
                          <motion.span key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1"><Check className="w-3 h-3" /> Added</motion.span>
                        ) : (
                          <motion.span key="a" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1"><Plus className="w-3 h-3" /> Add</motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <Button variant="secondary" onClick={() => setStep(1)}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex items-center gap-4">
          {cart.length > 0 && (
            <div className="flex flex-col items-end">
              <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Cart</span>
              <span className="text-white font-black">GH₵{cartSubtotal.toLocaleString()}</span>
            </div>
          )}
          <Button onClick={() => setStep(3)} disabled={cart.length === 0} className="px-8">
            View Cart <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
