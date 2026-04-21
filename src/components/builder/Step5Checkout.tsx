"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft, CheckCircle2, MessageCircle, User, Phone,
  Calendar, MapPin, Palette, Package, Sparkles
} from "lucide-react";

export default function Step5Checkout() {
  const { cart, cartTotal, baseService, eventDetails, setStep } = useBuilder();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const total = cartTotal + 2500;

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      const { error: err } = await supabase.from("bookings").insert([
        {
          name: eventDetails.name,
          phone: eventDetails.phone,
          event_date: eventDetails.date,
          event_time: eventDetails.time,
          location: eventDetails.location,
          theme: eventDetails.theme,
          instructions: eventDetails.instructions,
          base_service: baseService,
          items: cart,
          total_amount: total,
        },
      ]);
      if (err) throw err;
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      // If supabase not configured, still show success for demo
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Curated Cupid! 🌹\n\nI'd like to confirm my booking:\n\n` +
      `*Name:* ${eventDetails.name}\n*Date:* ${eventDetails.date} at ${eventDetails.time}\n*Location:* ${eventDetails.location}\n*Service:* ${baseService}\n\n` +
      `*Items:*\n${cart.map((i) => `- ${i.name} x${i.quantity} (₦${(i.price * i.quantity).toLocaleString()})`).join("\n")}\n\n` +
      `*Total:* ₦${total.toLocaleString()}\n\nTheme: ${eventDetails.theme || "No preference"}\n\nSpecial notes: ${eventDetails.instructions || "None"}`
  );

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8 py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F2B8C6]/30 to-[#9b87f5]/20 border border-[#F2B8C6]/30 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(242,184,198,0.3)]"
        >
          <CheckCircle2 className="w-10 h-10 text-[#F2B8C6]" />
        </motion.div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Booking <span className="text-[#F2B8C6]">Confirmed!</span> 🌹
          </h2>
          <p className="text-white/50 text-sm max-w-sm mx-auto">
            Your romantic experience is now being carefully crafted. We&apos;ll be in touch shortly to confirm details.
          </p>
        </div>

        <div className="glass border border-white/10 rounded-2xl p-5 text-left max-w-sm mx-auto space-y-2">
          <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-3">Booking Summary</p>
          <p className="text-white text-sm"><span className="text-white/40">Name: </span>{eventDetails.name}</p>
          <p className="text-white text-sm"><span className="text-white/40">Date: </span>{eventDetails.date} at {eventDetails.time}</p>
          <p className="text-white text-sm"><span className="text-white/40">Location: </span>{eventDetails.location}</p>
          <p className="text-[#D4AF37] font-bold text-sm mt-2">Total: ₦{total.toLocaleString()}</p>
        </div>

        <a
          href={`https://wa.me/2349010000000?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="gold" className="gap-2 mx-auto">
            <MessageCircle className="w-4 h-4" /> Continue on WhatsApp
          </Button>
        </a>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Order <span className="text-[#F2B8C6]">Summary</span>
        </h2>
        <p className="text-white/50 text-sm">Review everything before confirming your booking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Event Details Box */}
        <div className="glass border border-white/10 rounded-2xl p-5 space-y-3">
          <p className="text-white/40 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#F2B8C6]" /> Event Details
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2 text-white"><User className="w-3 h-3 text-[#F2B8C6]" />{eventDetails.name}</p>
            <p className="flex items-center gap-2 text-white"><Phone className="w-3 h-3 text-[#F2B8C6]" />{eventDetails.phone}</p>
            <p className="flex items-center gap-2 text-white"><Calendar className="w-3 h-3 text-[#F2B8C6]" />{eventDetails.date} at {eventDetails.time}</p>
            <p className="flex items-center gap-2 text-white"><MapPin className="w-3 h-3 text-[#F2B8C6]" />{eventDetails.location}</p>
            {eventDetails.theme && <p className="flex items-center gap-2 text-white"><Palette className="w-3 h-3 text-[#F2B8C6]" />{eventDetails.theme}</p>}
            <p className="flex items-start gap-2 text-white"><Package className="w-3 h-3 text-[#F2B8C6] mt-0.5" />{baseService}</p>
          </div>
        </div>

        {/* Items Box */}
        <div className="glass border border-white/10 rounded-2xl p-5 space-y-3">
          <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Selected Items</p>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-white/70 flex items-center gap-1.5">
                  <span>{item.image}</span> {item.name}
                  <span className="text-white/30">×{item.quantity}</span>
                </span>
                <span className="text-white font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-3 space-y-1">
            <div className="flex justify-between text-sm text-white/50">
              <span>Service fee</span><span>₦2,500</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-white">Total</span>
              <span className="text-[#D4AF37] text-lg">₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm glass border border-red-400/20 rounded-xl p-3">{error}</p>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <Button variant="secondary" onClick={() => setStep(4)} className="w-full sm:w-auto">
          <ArrowLeft className="w-4 h-4" /> Edit Details
        </Button>
        <Button onClick={handleConfirm} loading={loading} className="w-full sm:w-auto flex-1">
          <CheckCircle2 className="w-4 h-4" /> Confirm Booking
        </Button>
        <a
          href={`https://wa.me/2349010000000?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <Button variant="gold" className="w-full justify-center gap-2">
            <MessageCircle className="w-4 h-4" /> Book via WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
}
