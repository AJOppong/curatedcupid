"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import { shopItems, predefinedPackages } from "@/lib/data";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, Plus, Minus, ShoppingCart, Check, Package, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";

const CATEGORIES = ["All", "Decor", "Lighting", "Flowers", "Treats", "Gifts", "Personal", "Drinks", "Experience"];

export default function Step2SelectItems() {
  const { addToCart, removeFromCart, updateQuantity, clearCart, preloadItems, cart, setStep, baseService, selectedPackageName } = useBuilder();
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

  const handlePackageSelect = (pkg: typeof predefinedPackages[0]) => {
    const itemsToLoad = pkg.items.map(itemId => {
      const item = shopItems.find(si => si.id === itemId);
      return item ? { id: item.id, name: item.name, price: item.price, image: item.emoji } : null;
    }).filter(Boolean) as any;
    preloadItems(itemsToLoad, pkg.name);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {selectedPackageName ? `Customizing ${selectedPackageName}` : "Build Your Experience"}
        </h2>
        <p className="text-white/40 text-sm">
          {selectedPackageName 
            ? "Review your package items below. You can remove items or add new ones."
            : "Select items to add to your custom experience"}
        </p>
      </div>

      {/* Selected Package Items Section */}
      {cart.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E91E8C] uppercase tracking-widest">
              <Package className="w-3 h-3" /> {selectedPackageName || "Your Selection"}
            </div>
            {selectedPackageName && (
              <button onClick={() => clearCart()} className="text-[10px] text-white/20 hover:text-red-400 transition-colors uppercase font-bold">
                Clear All
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass border border-[#E91E8C]/20 rounded-2xl p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E91E8C]/10 flex items-center justify-center text-xl">
                    {item.image}
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">{item.name}</p>
                    <p className="text-[#D4AF37] text-[10px] font-bold">GH₵{item.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-lg glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-white text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-lg glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-1 p-1.5 text-white/20 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="h-px bg-white/5 w-full mt-4" />
        </div>
      )}

      {/* Recommended Packages (Only if nothing selected yet or Surprise Package) */}
      {baseService === "Surprise Package" && !selectedPackageName && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-white/30 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-[#E91E8C]" /> Select a Starting Package
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
            {predefinedPackages.map((pkg) => (
              <motion.button
                key={pkg.id}
                whileHover={{ y: -4 }}
                onClick={() => handlePackageSelect(pkg)}
                className="flex-shrink-0 w-64 glass border border-white/8 rounded-2xl p-4 text-left hover:border-[#E91E8C]/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Package className="w-4 h-4 text-[#E91E8C]" />
                  <span className="text-[10px] font-bold text-[#D4AF37]">GH₵{pkg.price.toLocaleString()}</span>
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{pkg.name}</h4>
                <p className="text-white/30 text-[10px] mb-3 line-clamp-1">{pkg.items.length} Premium Items included</p>
                <div className="flex items-center gap-1 text-[9px] font-bold text-[#E91E8C] opacity-0 group-hover:opacity-100 transition-opacity">
                  Choose Package <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </motion.button>
            ))}
          </div>
          <div className="h-px bg-white/5 w-full" />
        </div>
      )}

      {/* Shop All Items Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white/30 uppercase tracking-widest">
             {selectedPackageName ? "Add More Items" : "All Items"}
          </div>
          <div className="flex gap-2 overflow-x-auto max-w-[200px] md:max-w-none pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-[#E91E8C] text-white shadow-[0_0_15px_rgba(233,30,140,0.4)]"
                    : "glass border border-white/8 text-white/50 hover:border-[#E91E8C]/30 hover:text-white/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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
                  <p className="text-[#D4AF37] font-bold text-sm mb-2">GH₵{item.price.toLocaleString()}</p>

                  {cartItem ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
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
