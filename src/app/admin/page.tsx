"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { 
  Package, Calendar, CheckCircle2, Clock, 
  Search, Filter, ChevronRight, User, Phone, 
  MapPin, Gift, Eye, Trash2, ShieldCheck, LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { BuilderProvider } from "@/context/BuilderContext";

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
  status: "pending" | "confirmed" | "completed" | "cancelled";
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Booking["status"] | "all">("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

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
      fetchBookings();
    }
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setBookings(data as Booking[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Booking["status"]) => {
    try {
      await supabase.from("bookings").update({ status }).eq("id", id);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      if (selectedBooking?.id === id) setSelectedBooking(prev => prev ? { ...prev, status } : null);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await supabase.from("bookings").delete().eq("id", id);
      setBookings(prev => prev.filter(b => b.id !== id));
      setSelectedBooking(null);
    } catch (e) {
      console.error(e);
    }
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
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-12 px-4 md:px-8">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin <span className="text-[#E91E8C]">Dashboard</span></h1>
            <p className="text-white/40 text-sm">Manage bookings and orders</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                localStorage.removeItem("admin_auth");
                setIsAuthenticated(false);
              }}
              className="px-4 py-2 rounded-xl glass border border-white/10 text-white/60 text-xs font-bold hover:text-white transition-all flex items-center gap-2"
            >
              <LogOut className="w-3 h-3" /> Logout
            </button>
            <Button onClick={fetchBookings} variant="secondary" className="text-xs py-2">Refresh Data</Button>
          </div>
        </div>

        {/* Stats */}
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
            <div className="flex items-center gap-3 mb-2 overflow-x-auto pb-2 scrollbar-hide">
              {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap ${
                    filter === s ? "bg-[#E91E8C] text-white" : "glass border border-white/5 text-white/40 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {loading ? (
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
                        <p className="text-white font-bold text-sm">{booking.name}</p>
                        <div className="flex items-center gap-2 text-[10px] text-white/30 mt-0.5">
                          <Calendar className="w-3 h-3" /> {new Date(booking.event_date).toLocaleDateString()} at {booking.event_time}
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
                      }`}>{booking.status}</p>
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
                  className="glass border border-white/10 rounded-3xl p-6 sticky top-24 space-y-6 shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Booking Details</h3>
                    <button onClick={() => setSelectedBooking(null)} className="text-white/20 hover:text-white"><LogOut className="w-4 h-4 rotate-180" /></button>
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
    </div>
  );
}
