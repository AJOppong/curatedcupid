"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { 
  Package, Calendar, CheckCircle2, Clock, 
  Search, Filter, ChevronRight, User, Phone, 
  MapPin, Gift, Eye, Trash2, ShieldCheck, LogOut,
  ShoppingBag, Plus, Save, X, Palette, Star
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { BuilderProvider } from "@/context/BuilderContext";
import { ThemeProvider, useTheme, ThemeRecord } from "@/context/ThemeContext";

// Types
interface Booking {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  recipient_name: string;
  recipient_phone: string;
  event_date: string;
  event_time: string;
  location: string;
  theme: string;
  instructions: string;
  base_service: string;
  room_vibe: string;
  items: any[];
  total_amount: number;
  status: "awaiting_payment" | "payment_verifying" | "pending" | "confirmed" | "completed" | "cancelled";
}

interface ShopItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  emoji: string;
  image: string;
  gender: string;
  active: boolean;
}

interface PackageItem {
  id: string;
  name: string;
  price: number;
  items: string[];
  gender: string;
  active: boolean;
  tag?: string | null;
}

export default function AdminDashboard() {
  return (
    <BuilderProvider>
      <AdminContent />
    </BuilderProvider>
  );
}

function AdminContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"bookings" | "items" | "packages" | "themes">("bookings");
  const { allThemes, refreshThemes } = useTheme();

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [filter, setFilter] = useState<Booking["status"] | "all">("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Items state
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ShopItem>>({ gender: 'all', active: true });

  // Packages state
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [newPackage, setNewPackage] = useState<Partial<PackageItem>>({ items: [], gender: 'all', active: true });
  const [packageSearch, setPackageSearch] = useState("");

  const [isNewCategory, setIsNewCategory] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const categories = Array.from(new Set(items.map(i => i.category))).filter(Boolean);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "cupid2026") { 
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === "bookings") fetchBookings();
      if (activeTab === "items") fetchItems();
      if (activeTab === "packages") fetchPackages();
    }
  }, [isAuthenticated, activeTab]);

  // ─── BOOKINGS CRUD ───────────────────────────────────────────────
  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      if (data) setBookings(data as Booking[]);
    } catch (e) { console.error(e); } finally { setLoadingBookings(false); }
  };

  const updateStatus = async (id: string, status: Booking["status"]) => {
    try {
      await supabase.from("bookings").update({ status }).eq("id", id);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      if (selectedBooking?.id === id) setSelectedBooking(prev => prev ? { ...prev, status } : null);
    } catch (e) { console.error(e); }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await supabase.from("bookings").delete().eq("id", id);
      setBookings(prev => prev.filter(b => b.id !== id));
      setSelectedBooking(null);
    } catch (e) { console.error(e); }
  };

  // ─── ITEMS CRUD ──────────────────────────────────────────────────
  const fetchItems = async () => {
    setLoadingItems(true);
    try {
      const { data, error } = await supabase.from("shop_items").select("*").order("name");
      if (data) setItems(data as ShopItem[]);
    } catch (e) { console.error(e); } finally { setLoadingItems(false); }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = newItem.id || newItem.name?.toLowerCase().replace(/\s+/g, '-');
      const itemToSave = { ...newItem, id };
      const { data, error } = await supabase.from('shop_items').upsert([itemToSave]).select();
      if (!error) {
        console.log("Saved item:", data);
        setShowItemModal(false);
        setNewItem({ gender: 'all', active: true });
        fetchItems();
      } else {
        alert("Error saving item: " + error.message);
      }
    } catch (e) { console.error(e); }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      await supabase.from('shop_items').delete().eq('id', id);
      fetchItems();
    } catch (e) { console.error(e); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      alert("Only JPG and PNG formats are allowed.");
      return;
    }
    
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('item_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('item_images').getPublicUrl(filePath);
      setNewItem(prev => ({ ...prev, image: data.publicUrl }));
    } catch (error: any) {
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  // ─── PACKAGES CRUD ───────────────────────────────────────────────
  const fetchPackages = async () => {
    setLoadingPackages(true);
    try {
      const { data, error } = await supabase.from("packages").select("*").order("price");
      if (data) setPackages(data as PackageItem[]);
    } catch (e) { console.error(e); } finally { setLoadingPackages(false); }
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const packageToSave = { 
        id: newPackage.id || newPackage.name?.toLowerCase().replace(/\s+/g, '-'),
        name: newPackage.name,
        price: newPackage.price,
        items: newPackage.items || [],
        gender: newPackage.gender || 'all',
        active: newPackage.active !== undefined ? newPackage.active : true
      };
      const { data, error } = await supabase.from('packages').upsert([packageToSave]).select();
      if (!error) {
        console.log("Saved package:", data);
        setShowPackageModal(false);
        setNewPackage({ items: [], gender: 'all', active: true });
        fetchPackages();
      } else {
        alert("Error saving package: " + error.message);
      }
    } catch (e) { console.error(e); }
  };

  const deletePackage = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    try {
      await supabase.from('packages').delete().eq('id', id);
      fetchPackages();
    } catch (e) { console.error(e); }
  };

  const deleteAllItems = async () => {
    if (!confirm("Delete ALL shop items? This cannot be undone.")) return;
    try {
      const ids = items.map(i => i.id);
      if (ids.length > 0) await supabase.from('shop_items').delete().in('id', ids);
      fetchItems();
    } catch (e) { console.error(e); }
  };

  const deleteAllPackages = async () => {
    if (!confirm("Delete ALL packages? This cannot be undone.")) return;
    try {
      const ids = packages.map(p => p.id);
      if (ids.length > 0) await supabase.from('packages').delete().in('id', ids);
      fetchPackages();
    } catch (e) { console.error(e); }
  };

  const setMostPopular = async (id: string) => {
    try {
      // Clear tag from all
      await supabase.from('packages').update({ tag: null }).neq('id', '__none__');
      // Set Most Popular on selected
      await supabase.from('packages').update({ tag: 'Most Popular' }).eq('id', id);
      fetchPackages();
    } catch (e) { console.error(e); }
  };

  const clearMostPopular = async () => {
    try {
      await supabase.from('packages').update({ tag: null }).neq('id', '__none__');
      fetchPackages();
    } catch (e) { console.error(e); }
  };

  const filteredBookings = bookings.filter(b => filter === "all" || b.status === filter);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#0A0A0A]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass border border-white/10 rounded-3xl p-8 w-full max-w-md text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#E91E8C]/15 border border-[#E91E8C]/30 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-[#E91E8C]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          <p className="text-white/40 text-sm">Enter password to access dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter password"
              className="w-full glass border border-white/8 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E91E8C]/50 transition-all bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full py-4">Access Dashboard</Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20 pb-12 px-3 md:px-8">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Admin <span className="text-[#E91E8C]">Dashboard</span></h1>
            <p className="text-white/40 text-xs md:text-sm">Manage bookings, items, and packages</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setIsAuthenticated(false);
              }}
              className="px-4 py-2 rounded-xl glass border border-white/10 text-white/60 text-xs font-bold hover:text-white transition-all flex items-center gap-2"
            >
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1.5 glass border border-white/10 rounded-2xl w-full md:w-fit overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {[
            { id: "bookings", label: "Bookings", icon: <LucideIcons.Calendar className="w-4 h-4" /> },
            { id: "items", label: "Shop Items", icon: <LucideIcons.ShoppingBag className="w-4 h-4" /> },
            { id: "packages", label: "Packages", icon: <LucideIcons.Package className="w-4 h-4" /> },
            { id: "themes", label: "Themes", icon: <LucideIcons.Palette className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap snap-start ${
                activeTab === tab.id ? "bg-[#E91E8C] text-white shadow-lg shadow-[#E91E8C]/20" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ─── BOOKINGS TAB ────────────────────────────────────────────── */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Bookings", val: bookings.length, color: "text-white" },
                { label: "Pending", val: bookings.filter(b => b.status === "pending").length, color: "text-amber-400" },
                { label: "Confirmed", val: bookings.filter(b => b.status === "confirmed").length, color: "text-blue-400" },
                { label: "Completed", val: bookings.filter(b => b.status === "completed").length, color: "text-green-400" },
              ].map(stat => (
                <div key={stat.label} className="glass border border-white/5 p-5 rounded-2xl">
                  <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest">{stat.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                  {(["all", "awaiting_payment", "payment_verifying", "pending", "confirmed", "completed", "cancelled"] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setFilter(s)}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap snap-start ${
                        filter === s ? "bg-[#E91E8C] text-white shadow-lg shadow-[#E91E8C]/20" : "glass border border-white/5 text-white/40 hover:text-white"
                      }`}
                    >
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {loadingBookings ? (
                    <div className="py-20 text-center text-white/20">Loading bookings...</div>
                  ) : filteredBookings.length === 0 ? (
                    <div className="py-20 text-center text-white/20">No bookings found</div>
                  ) : (
                    filteredBookings.map(booking => (
                      <motion.div
                        key={booking.id}
                        layoutId={booking.id}
                        onClick={() => setSelectedBooking(booking)}
                        className={`glass border p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all hover:bg-white/5 ${
                          selectedBooking?.id === booking.id ? "border-[#E91E8C]/50 shadow-[0_0_20px_rgba(233,30,140,0.1)]" : "border-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                            booking.status === "completed" ? "bg-green-500/10 text-green-500" :
                            booking.status === "confirmed" ? "bg-blue-500/10 text-blue-500" :
                            booking.status === "cancelled" ? "bg-red-500/10 text-red-500" :
                            "bg-amber-500/10 text-amber-500"
                          }`}>
                            {booking.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="text-white font-bold text-sm line-clamp-1">{booking.name}</p>
                            <div className="flex items-center gap-2 text-[10px] text-white/30 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                              <Calendar className="w-3 h-3 shrink-0" /> {new Date(booking.event_date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-sm">GH₵{booking.total_amount.toLocaleString()}</p>
                          <p className={`text-[10px] font-bold uppercase mt-0.5 ${
                            booking.status === "completed" ? "text-green-500" :
                            booking.status === "confirmed" ? "text-blue-500" :
                            booking.status === "cancelled" ? "text-red-500" :
                            "text-amber-500"
                          }`}>{booking.status.replace('_', ' ')}</p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {selectedBooking ? (
                    <motion.div
                      key={selectedBooking.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="fixed inset-0 z-[60] lg:relative lg:inset-auto lg:z-0 lg:block glass border border-white/10 rounded-none lg:rounded-3xl p-4 md:p-6 lg:sticky lg:top-24 space-y-6 shadow-2xl overflow-y-auto lg:overflow-visible bg-[#0A0A0A] lg:bg-transparent"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/5 lg:border-none">
                        <div className="flex items-center gap-3">
                          <button onClick={() => setSelectedBooking(null)} className="lg:hidden text-white/40 hover:text-white p-2 -ml-2">
                            <ChevronRight className="w-5 h-5 rotate-180" />
                          </button>
                          <h3 className="text-lg font-bold text-white">Booking Details</h3>
                        </div>
                        <button onClick={() => setSelectedBooking(null)} className="hidden lg:block text-white/40 hover:text-white p-2">
                          <LucideIcons.X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-3">
                          <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Client</p>
                          <div className="space-y-2">
                            <p className="flex items-center gap-2 text-white text-sm"><User className="w-3 h-3 text-[#E91E8C]" /> {selectedBooking.name}</p>
                            <p className="flex items-center gap-2 text-white text-sm"><Phone className="w-3 h-3 text-[#E91E8C]" /> {selectedBooking.phone}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Recipient</p>
                          <div className="space-y-2">
                            <p className="flex items-center gap-2 text-white text-sm"><Gift className="w-3 h-3 text-[#7C3AED]" /> {selectedBooking.recipient_name}</p>
                            <p className="flex items-center gap-2 text-white text-sm"><Phone className="w-3 h-3 text-[#7C3AED]" /> {selectedBooking.recipient_phone}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Event</p>
                          <div className="space-y-2">
                            <p className="flex items-center gap-2 text-white text-sm"><Calendar className="w-3 h-3 text-white/30" /> {selectedBooking.event_date}</p>
                            <p className="flex items-center gap-2 text-white text-sm"><Clock className="w-3 h-3 text-white/30" /> {selectedBooking.event_time}</p>
                            <p className="flex items-center gap-2 text-white text-sm"><MapPin className="w-3 h-3 text-white/30" /> {selectedBooking.location}</p>
                            <p className="flex items-center gap-2 text-white text-sm"><Package className="w-3 h-3 text-white/30" /> {selectedBooking.base_service} {selectedBooking.room_vibe ? `(${selectedBooking.room_vibe})` : ""}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Items</p>
                          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                            {selectedBooking.items && selectedBooking.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between text-xs">
                                <span className="text-white/60">{item.image} {item.name} x{item.quantity}</span>
                                <span className="text-white">GH₵{(item.price * item.quantity).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {selectedBooking.theme && (
                          <div className="space-y-1">
                            <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Theme</p>
                            <p className="text-white text-sm">{selectedBooking.theme}</p>
                          </div>
                        )}

                        {selectedBooking.instructions && (
                          <div className="space-y-1">
                            <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Instructions</p>
                            <p className="text-white text-xs leading-relaxed italic text-white/60">"{selectedBooking.instructions}"</p>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-white font-bold">Total Amount</p>
                          <p className="text-[#D4AF37] text-xl font-black">GH₵{selectedBooking.total_amount.toLocaleString()}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <select 
                            value={selectedBooking.status}
                            onChange={(e) => updateStatus(selectedBooking.id, e.target.value as any)}
                            className="glass border border-white/10 rounded-xl px-3 py-2 text-xs text-white bg-transparent focus:outline-none"
                          >
                            <option value="awaiting_payment" className="bg-[#1A1A1A]">Awaiting Payment</option>
                            <option value="payment_verifying" className="bg-[#1A1A1A]">Payment Verifying</option>
                            <option value="pending" className="bg-[#1A1A1A]">Pending</option>
                            <option value="confirmed" className="bg-[#1A1A1A]">Confirmed</option>
                            <option value="completed" className="bg-[#1A1A1A]">Completed</option>
                            <option value="cancelled" className="bg-[#1A1A1A]">Cancelled</option>
                          </select>
                          <button 
                            onClick={() => deleteBooking(selectedBooking.id)}
                            className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl px-3 py-2 text-xs font-bold transition-all"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="glass border border-white/5 border-dashed rounded-3xl p-12 text-center sticky top-24">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                        <Eye className="w-5 h-5 text-white/20" />
                      </div>
                      <p className="text-white/20 text-sm">Select a booking to view details</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* ─── ITEMS TAB ────────────────────────────────────────────── */}
        {activeTab === "items" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Manage Shop Items</h2>
              <div className="flex items-center gap-3">
                {items.length > 0 && (
                  <button
                    onClick={deleteAllItems}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="w-3 h-3" /> Delete All
                  </button>
                )}
                <Button onClick={() => setShowItemModal(true)} className="gap-2 py-2 text-sm"><Plus className="w-4 h-4"/> Add New Item</Button>
              </div>
            </div>
            
            {loadingItems ? (
               <div className="py-20 text-center text-white/20">Loading items...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map(item => (
                  <div key={item.id} className="glass border border-white/10 p-4 rounded-2xl flex flex-col gap-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-2xl border border-white/5 relative overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt="" className="w-full h-full object-cover"/>
                        ) : (
                          (() => {
                            const Icon = item.emoji && (LucideIcons as any)[item.emoji] ? (LucideIcons as any)[item.emoji] : LucideIcons.HelpCircle;
                            return <Icon className="w-5 h-5 text-white/80" />;
                          })()
                        )}
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${item.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {item.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm leading-tight">{item.name}</h3>
                    <p className="text-white/40 text-xs line-clamp-2">{item.description}</p>
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <span className="text-[#D4AF37] font-bold text-sm">GH₵{item.price}</span>
                      <div className="flex gap-2">
                        <button onClick={() => {setNewItem(item); setShowItemModal(true);}} className="text-blue-400 hover:text-blue-300 text-xs font-bold">Edit</button>
                        <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:text-red-400 text-xs font-bold">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
                {items.length === 0 && <div className="col-span-4 py-20 text-center text-white/30">No items found. Create one!</div>}
              </div>
            )}
          </div>
        )}

        {/* ─── PACKAGES TAB ─────────────────────────────────────────── */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Manage Packages</h2>
              <div className="flex items-center gap-3">
                {packages.length > 0 && (
                  <button
                    onClick={deleteAllPackages}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="w-3 h-3" /> Delete All
                  </button>
                )}
                <Button onClick={() => setShowPackageModal(true)} className="gap-2 py-2 text-sm"><Plus className="w-4 h-4"/> Add New Package</Button>
              </div>
            </div>

            {loadingPackages ? (
               <div className="py-20 text-center text-white/20">Loading packages...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map(pkg => (
                  <div key={pkg.id} className={`glass border p-5 rounded-2xl flex flex-col gap-3 transition-all ${
                    pkg.tag === 'Most Popular'
                      ? 'border-yellow-500/50 bg-yellow-500/5 shadow-[0_0_30px_rgba(234,179,8,0.08)]'
                      : 'border-white/10'
                  }`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-bold text-lg uppercase flex items-center gap-2">
                        {pkg.name}
                        {pkg.tag === 'Most Popular' && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${pkg.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {pkg.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <span className="text-[#D4AF37] font-bold text-xl">GH₵{pkg.items?.reduce((sum: number, itemId: string) => {
                      const item = items.find(i => i.id === itemId);
                      return sum + (item?.price || 0);
                    }, 0) || pkg.price}</span>
                    <div className="flex gap-2 text-xs font-bold uppercase text-white/30">
                      <span className="px-2 py-1 bg-white/5 rounded-md">{pkg.gender}</span>
                      <span className="px-2 py-1 bg-white/5 rounded-md">{pkg.items?.length || 0} items</span>
                    </div>
                    <div className="mt-auto pt-3 flex items-center justify-between gap-3 border-t border-white/10">
                      {/* Most Popular toggle */}
                      <button
                        onClick={() => pkg.tag === 'Most Popular' ? clearMostPopular() : setMostPopular(pkg.id)}
                        title={pkg.tag === 'Most Popular' ? 'Remove Most Popular' : 'Set as Most Popular'}
                        className={`flex items-center gap-1.5 text-xs font-bold transition-all ${
                          pkg.tag === 'Most Popular'
                            ? 'text-yellow-400 hover:text-yellow-300'
                            : 'text-white/30 hover:text-yellow-400'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 transition-all ${pkg.tag === 'Most Popular' ? 'fill-yellow-400' : ''}`} />
                        {pkg.tag === 'Most Popular' ? 'Popular' : 'Set Popular'}
                      </button>
                      <div className="flex gap-3">
                        <button onClick={() => {setNewPackage(pkg); setShowPackageModal(true);}} className="text-blue-400 hover:text-blue-300 text-sm font-bold">Edit</button>
                        <button onClick={() => deletePackage(pkg.id)} className="text-red-500 hover:text-red-400 text-sm font-bold">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
                {packages.length === 0 && <div className="col-span-3 py-20 text-center text-white/30">No packages found. Create one!</div>}
              </div>
            )}
          </div>
        )}

        {/* ─── THEMES TAB ─────────────────────────────────────────── */}
        {activeTab === "themes" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Manage Themes</h2>
              <Button onClick={() => refreshThemes()} className="gap-2 py-2 text-sm text-[#E91E8C] bg-[#E91E8C]/10 border border-[#E91E8C]/20 hover:bg-[#E91E8C]/20">Refresh Themes</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allThemes.map(t => (
                <div key={t.id} className="glass border border-white/10 p-5 rounded-2xl flex flex-col gap-3 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: t.colors.heroBg || t.colors.background }}></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-bold text-lg uppercase flex items-center gap-2">
                        {t.name}
                        {t.is_default && <span className="px-2 py-0.5 rounded text-[9px] bg-white/10 text-white/70">Default</span>}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${t.is_active ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/40'}`}>
                        {t.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <p className="text-white/60 text-xs italic mb-4">"{t.hero_text?.title}"</p>
                    
                    <div className="flex gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full border border-white/20" style={{ background: t.colors.background }}></div>
                      <div className="w-6 h-6 rounded-full border border-white/20" style={{ background: t.colors.primary }}></div>
                      <div className="w-6 h-6 rounded-full border border-white/20" style={{ background: t.colors.secondary }}></div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
                      <button 
                        onClick={async () => {
                          for (const theme of allThemes) {
                            if (theme.id !== t.id && theme.is_active) {
                              await supabase.from('themes').update({ is_active: false }).eq('id', theme.id);
                            }
                          }
                          await supabase.from('themes').update({ is_active: true }).eq('id', t.id);
                          refreshThemes();
                        }} 
                        disabled={t.is_active}
                        className={`py-2 text-xs font-bold rounded-lg transition-all ${t.is_active ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-[#E91E8C] text-white hover:bg-[#E91E8C]/80'}`}
                      >
                        {t.is_active ? 'Currently Active' : 'Set Active'}
                      </button>
                      <button 
                        onClick={async () => {
                          for (const theme of allThemes) {
                            if (theme.id !== t.id && theme.is_default) {
                              await supabase.from('themes').update({ is_default: false }).eq('id', theme.id);
                            }
                          }
                          await supabase.from('themes').update({ is_default: true }).eq('id', t.id);
                          refreshThemes();
                        }}
                        disabled={t.is_default}
                        className={`py-2 text-xs font-bold rounded-lg transition-all ${t.is_default ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'glass border border-white/10 text-white hover:bg-white/10'}`}
                      >
                        Make Default
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {allThemes.length === 0 && <div className="col-span-3 py-20 text-center text-white/30">No themes found in database.</div>}
            </div>
          </div>
        )}
      </div>

      {/* ─── MODALS ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showItemModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#12101F] border border-white/10 rounded-3xl p-4 md:p-6 w-full max-w-lg relative max-h-[95vh] overflow-y-auto">
              <button onClick={() => setShowItemModal(false)} className="absolute top-4 right-4 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
              <h3 className="text-2xl font-bold text-white mb-4">{newItem.id ? 'Edit Item' : 'Add New Item'}</h3>
              <form onSubmit={handleSaveItem} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1"><label className="text-white/60 text-xs">Name</label><input required value={newItem.name || ''} onChange={e => setNewItem({...newItem, name: e.target.value})} className="w-full bg-white/5 rounded-xl px-3 py-2 text-white text-sm" /></div>
                  <div className="space-y-1"><label className="text-white/60 text-xs">Price (GH₵)</label><input required type="number" value={newItem.price || ''} onChange={e => setNewItem({...newItem, price: parseInt(e.target.value)})} className="w-full bg-white/5 rounded-xl px-3 py-2 text-white text-sm" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-white/60 text-xs">Category</label>
                    <div className="flex gap-2">
                      {!isNewCategory ? (
                        <select 
                          required 
                          value={newItem.category || ''} 
                          onChange={e => {
                            if (e.target.value === "NEW") {
                              setIsNewCategory(true);
                              setNewItem({...newItem, category: ''});
                            } else {
                              setNewItem({...newItem, category: e.target.value});
                            }
                          }}
                          className="w-full bg-white/5 rounded-xl px-3 py-2.5 text-white text-sm outline-none border-none focus:ring-0 [&>option]:bg-[#12101F]"
                        >
                          <option value="" disabled>Select Category</option>
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                          <option value="NEW">+ Add New Category</option>
                        </select>
                      ) : (
                        <div className="flex w-full gap-2">
                          <input 
                            required 
                            autoFocus
                            placeholder="New category..."
                            value={newItem.category || ''} 
                            onChange={e => setNewItem({...newItem, category: e.target.value})} 
                            className="flex-1 bg-white/5 rounded-xl px-3 py-2 text-white text-sm" 
                          />
                          <button type="button" onClick={() => {setIsNewCategory(false); setNewItem({...newItem, category: ''});}} className="px-2 text-white/40 hover:text-white"><X className="w-4 h-4"/></button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-white/60 text-xs">Gender Tag</label>
                    <select value={newItem.gender || 'all'} onChange={e => setNewItem({...newItem, gender: e.target.value})} className="w-full bg-white/5 rounded-xl px-3 py-2.5 text-white text-sm outline-none border-none focus:ring-0 [&>option]:bg-[#12101F]">
                      <option value="all">All</option><option value="ladies">Ladies</option><option value="guys">Guys</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="text-white/60 text-xs">Image Upload (JPG/PNG)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="file" 
                        accept="image/jpeg, image/png, image/jpg" 
                        onChange={handleImageUpload} 
                        className="w-full bg-white/5 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#E91E8C] file:text-white hover:file:bg-[#E91E8C]/80 rounded-xl px-3 py-2 text-white text-sm" 
                      />
                      {uploadingImage && <span className="text-xs text-[#E91E8C] animate-pulse whitespace-nowrap">Uploading...</span>}
                      {newItem.image && <div className="w-10 h-10 rounded overflow-hidden shrink-0"><img src={newItem.image} className="w-full h-full object-cover" /></div>}
                    </div>
                  </div>
                </div>
                <div className="space-y-1"><label className="text-white/60 text-xs">Description</label><textarea required rows={2} value={newItem.description || ''} onChange={e => setNewItem({...newItem, description: e.target.value})} className="w-full bg-white/5 rounded-xl px-3 py-2 text-white text-sm resize-none" /></div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="active" checked={newItem.active} onChange={e => setNewItem({...newItem, active: e.target.checked})} className="w-4 h-4 rounded accent-[#E91E8C]" />
                  <label htmlFor="active" className="text-white/80 text-sm">Item is Active</label>
                </div>
                <Button type="submit" className="w-full pt-4 mt-2">Save Item</Button>
              </form>
            </motion.div>
          </div>
        )}

        {showPackageModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#12101F] border border-white/10 rounded-3xl p-4 md:p-6 w-full max-w-lg relative max-h-[95vh] overflow-y-auto">
              <button onClick={() => setShowPackageModal(false)} className="absolute top-4 right-4 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
              <h3 className="text-2xl font-bold text-white mb-4">{newPackage.id ? 'Edit Package' : 'Add New Package'}</h3>
              <form onSubmit={handleSavePackage} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1"><label className="text-white/60 text-xs">Name</label><input required value={newPackage.name || ''} onChange={e => setNewPackage({...newPackage, name: e.target.value})} className="w-full bg-white/5 rounded-xl px-3 py-2 text-white text-sm" /></div>
                  <div className="space-y-1"><label className="text-white/60 text-xs">Price (GH₵)</label><input required type="number" value={newPackage.price || ''} onChange={e => setNewPackage({...newPackage, price: parseInt(e.target.value)})} className="w-full bg-white/5 rounded-xl px-3 py-2 text-white text-sm" /></div>
                </div>
                <div className="space-y-1">
                  <label className="text-white/60 text-xs">Gender Tag</label>
                  <select value={newPackage.gender || 'all'} onChange={e => setNewPackage({...newPackage, gender: e.target.value})} className="w-full bg-white/5 rounded-xl px-3 py-2.5 text-white text-sm outline-none border-none focus:ring-0 [&>option]:bg-[#12101F]">
                    <option value="all">All</option><option value="ladies">Ladies</option><option value="guys">Guys</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-white/60 text-xs">Items</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-white/40" />
                    <input 
                      value={packageSearch} 
                      onChange={e => setPackageSearch(e.target.value)} 
                      placeholder="Search items to add..." 
                      className="w-full bg-white/5 rounded-xl pl-9 pr-3 py-2 text-white text-sm focus:outline-none border border-transparent"
                    />
                  </div>
                  <div className="max-h-32 overflow-y-auto mt-2 space-y-1 custom-scrollbar">
                    {items.filter(i => i.name.toLowerCase().includes(packageSearch.toLowerCase()) && !(newPackage.items || []).includes(i.id)).map(i => (
                      <div key={i.id} onClick={() => setNewPackage(prev => {
                        const newItems = [...(prev.items || []), i.id];
                        const newPrice = newItems.reduce((sum, itemId) => {
                          const item = items.find(it => it.id === itemId);
                          return sum + (item?.price || 0);
                        }, 0);
                        return {...prev, items: newItems, price: newPrice};
                      })} className="text-xs text-white/70 hover:text-white cursor-pointer px-2 py-1.5 bg-white/5 rounded hover:bg-white/10 flex justify-between items-center transition-colors">
                        <span>{i.name}</span>
                        <span className="text-[#D4AF37] font-bold">GH₵{i.price}</span>
                      </div>
                    ))}
                    {items.length > 0 && items.filter(i => i.name.toLowerCase().includes(packageSearch.toLowerCase()) && !(newPackage.items || []).includes(i.id)).length === 0 && (
                      <div className="text-xs text-white/30 text-center py-2">No matching items to add.</div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2 p-2 bg-[#1A1A1A] rounded-xl border border-white/5 min-h-[40px]">
                    {(newPackage.items || []).map(itemId => {
                      const item = items.find(i => i.id === itemId);
                      return (
                        <span key={itemId} className="text-[10px] px-2 py-1 bg-[#E91E8C]/20 text-[#E91E8C] rounded flex items-center gap-1 font-bold">
                          {item?.name || itemId}
                          <button type="button" onClick={() => setNewPackage(prev => {
                            const newItems = (prev.items || []).filter(id => id !== itemId);
                            const newPrice = newItems.reduce((sum, itemId) => {
                              const item = items.find(it => it.id === itemId);
                              return sum + (item?.price || 0);
                            }, 0);
                            return {...prev, items: newItems, price: newPrice};
                          })} className="hover:text-white transition-colors"><X className="w-3 h-3"/></button>
                        </span>
                      );
                    })}
                    {(newPackage.items || []).length === 0 && <span className="text-xs text-white/30 italic">No items added yet.</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="p-active" checked={newPackage.active} onChange={e => setNewPackage({...newPackage, active: e.target.checked})} className="w-4 h-4 rounded accent-[#E91E8C]" />
                  <label htmlFor="p-active" className="text-white/80 text-sm">Package is Active</label>
                </div>
                <Button type="submit" className="w-full pt-4 mt-2">Save Package</Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
