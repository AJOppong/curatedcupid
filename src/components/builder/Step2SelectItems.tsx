"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import { shopItems, predefinedPackages } from "@/lib/data";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, Plus, Minus, ShoppingCart, Check, Package, Sparkles, Trash2, PlusCircle } from "lucide-react";
import { useState } from "react";

const CATEGORIES = ["All", "Decor", "Lighting", "Flowers", "Treats", "Gifts", "Personal", "Drinks", "Experience"];

export default function Step2SelectItems() {
  const { addToCart, removeFromCart, updateQuantity, clearCart, preloadItems, cart, setStep, baseService, selectedPackageName } = useBuilder();
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [showFullInventory, setShowFullInventory] = useState(false);

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
          {selectedPackageName ? "Customize Your" : "Choose Your"} <span className="text-[#E91E8C]">Experience</span>
        </h2>
        <p className="text-white/40 text-sm">
          {selectedPackageName 
            ? `Reviewing items for: ${selectedPackageName}`
            : "Select a package or build from scratch"}
        </p>
      </div>

      {/* Primary Package Content */}
      <AnimatePresence mode="wait">
        {selectedPackageName && cart.length > 0 ? (
          <motion.div 
            key="package-focus"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            <div className="glass border border-[#E91E8C]/30 bg-[#E91E8C]/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_0_50px_rgba(233,30,140,0.1)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#E91E8C] flex items-center justify-center shadow-lg shadow-[#E91E8C]/20">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{selectedPackageName}</h3>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Included Items</p>
                  </div>
                </div>
                <button onClick={() => clearCart()} className="text-[10px] text-white/20 hover:text-red-400 transition-colors uppercase font-bold px-3 py-1 rounded-full border border-white/5">
                  Reset Package
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {cart.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass border border-white/8 rounded-2xl p-4 flex items-center justify-between group hover:border-[#E91E8C]/20 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {item.image}
                      </div>
                      <div>
                        <p className="text-white font-bold">{item.name}</p>
                        <p className="text-[#D4AF37] text-xs font-black">GH₵{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 glass border border-white/10 rounded-full p-1 px-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-white text-sm font-black w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {!showFullInventory && (
                <button 
                  onClick={() => setShowFullInventory(true)}
                  className="w-full py-4 rounded-2xl border-2 border-dashed border-white/10 text-white/40 hover:border-[#E91E8C]/30 hover:text-[#E91E8C] transition-all flex items-center justify-center gap-2 group font-bold text-sm"
                >
                  <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  Add Extra Gifts & Treats
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div key="selector" className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white/30 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-[#E91E8C]" /> Recommended Packages
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
              {predefinedPackages.map((pkg) => (
                <motion.button
                  key={pkg.id}
                  whileHover={{ y: -4 }}
                  onClick={() => handlePackageSelect(pkg)}
                  className="flex-shrink-0 w-64 glass border border-white/8 rounded-3xl p-5 text-left hover:border-[#E91E8C]/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E91E8C]/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#E91E8C]" />
                    </div>
                    <span className="text-xs font-black text-[#D4AF37]">GH₵{pkg.price.toLocaleString()}</span>
                  </div>
                  <h4 className="text-white font-bold text-base mb-1">{pkg.name}</h4>
                  <p className="text-white/30 text-[10px] mb-4 uppercase font-bold tracking-widest">{pkg.items.length} Premium Items</p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-[#E91E8C] group-hover:translate-x-1 transition-transform">
                    CUSTOMIZE PACKAGE <ArrowRight className="w-3 h-3" />
                  </div>
                </motion.button>
              ))}
            </div>
            <div className="h-px bg-white/5 w-full pt-4" />
            <button 
              onClick={() => { clearCart(); setShowFullInventory(true); }}
              className="w-full py-4 rounded-2xl border border-white/10 text-white/60 hover:border-white/20 hover:text-white transition-all font-bold text-sm"
            >
              Build from Scratch
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inventory Section */}
      {(showFullInventory || !selectedPackageName) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 pt-4 border-t border-white/5"
        >
          <div className="flex items-center justify-between sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-md z-10 py-2">
            <h4 className="text-white font-black uppercase tracking-tighter text-sm">Add Extra Items</h4>
            <div className="flex gap-2 overflow-x-auto max-w-[200px] md:max-w-none pb-1 scrollbar-hide">
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
                    <p className="text-white/35 text-[10px] mt-1 leading-snug line-clamp-1">{item.description}</p>
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
                        <span className="text-white text-xs font-black w-6 text-center">{cartItem.quantity}</span>
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
                        className={`w-full py-2 rounded-full text-[10px] font-black uppercase transition-all flex items-center justify-center gap-1 ${
                          justAdded
                            ? "bg-green-500/20 border border-green-500/30 text-green-400"
                            : "bg-[#E91E8C]/10 border border-[#E91E8C]/20 text-[#E91E8C] hover:bg-[#E91E8C]/20"
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {justAdded ? (
                            <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                              <Check className="w-3 h-3" /> Added
                            </motion.span>
                          ) : (
                            <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                              <Plus className="w-3 h-3" /> Add Item
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
        </motion.div>
      )}

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <Button variant="secondary" onClick={() => setStep(1)} className="px-6">
          <ArrowLeft className="w-4 h-4" /> Change Service
        </Button>
        <div className="flex items-center gap-4">
          {cart.length > 0 && (
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Cart Total</span>
              <span className="text-white font-black text-lg">GH₵{cart.reduce((s, i) => s + (i.price * i.quantity), 0).toLocaleString()}</span>
            </div>
          )}
          <Button onClick={() => setStep(3)} disabled={cart.length === 0} className="px-10 py-4 shadow-[0_0_30px_rgba(233,30,140,0.3)]">
            Next: Review Cart <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
