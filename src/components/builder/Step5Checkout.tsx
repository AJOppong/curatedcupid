"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft, CheckCircle2, MessageCircle, User, Phone,
  Calendar, MapPin, Palette, Package, Sparkles, Gift, Clock
} from "lucide-react";

export default function Step5Checkout() {
  const { cart, cartTotal, baseService, roomVibe, eventDetails, setStep } = useBuilder();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const total = cartTotal + 50;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await supabase.from("bookings").insert([{
        name: eventDetails.name,
        phone: eventDetails.phone,
        recipient_name: eventDetails.recipientName,
        recipient_phone: eventDetails.recipientPhone,
        event_date: eventDetails.date,
        event_time: eventDetails.time,
        location: eventDetails.location,
        theme: eventDetails.theme,
        instructions: eventDetails.instructions,
        base_service: baseService,
        room_vibe: roomVibe,
        items: cart,
        total_amount: total,
      }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Curated Cupid! 🌹\n\nI'd like to confirm my booking:\n\n` +
    `*Sender:* ${eventDetails.name} (${eventDetails.phone})\n` +
    `*Recipient:* ${eventDetails.recipientName} (${eventDetails.recipientPhone})\n` +
    `*Date:* ${eventDetails.date} at ${eventDetails.time}\n` +
    `*Location:* ${eventDetails.location}\n` +
    `*Service:* ${baseService}${roomVibe ? ` (${roomVibe} Vibe)` : ""}\n\n` +
    `*Items:*\n${cart.map((i) => `- ${i.name} x${i.quantity} (GH₵${(i.price * i.quantity).toLocaleString()})`).join("\n")}\n\n` +
    `*Total:* GH₵${total.toLocaleString()}\n\n` +
    `*Theme:* ${eventDetails.theme || "No preference"}\n` +
    `*Notes:* ${eventDetails.instructions || "None"}`
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
          className="w-20 h-20 rounded-full bg-[#E91E8C]/15 border border-[#E91E8C]/30 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(233,30,140,0.3)]"
        >
          <CheckCircle2 className="w-10 h-10 text-[#E91E8C]" />
        </motion.div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Booking <span className="text-[#E91E8C]">Confirmed!</span> ✨
          </h2>
          <p className="text-white/40 text-sm max-w-sm mx-auto">
            Your celebration experience is being carefully crafted. We&apos;ll be in touch shortly to confirm all details.
          </p>
        </div>

        <div className="glass border border-white/8 rounded-2xl p-5 text-left max-w-sm mx-auto space-y-2">
          <p className="text-white/30 text-xs font-medium uppercase tracking-widest mb-3">Booking Summary</p>
          <p className="text-white text-sm"><span className="text-white/40">For: </span>{eventDetails.recipientName}</p>
          <p className="text-white text-sm"><span className="text-white/40">Date: </span>{eventDetails.date} at {eventDetails.time}</p>
          <p className="text-white text-sm"><span className="text-white/40">Location: </span>{eventDetails.location}</p>
          <p className="text-[#D4AF37] font-bold text-sm mt-2">Total: GH₵{total.toLocaleString()}</p>
        </div>

        <a href={`https://wa.me/233550000000?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
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
          Order <span className="text-[#E91E8C]">Summary</span>
        </h2>
        <p className="text-white/40 text-sm">Review everything before confirming your booking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Logistics & People */}
        <div className="glass border border-white/8 rounded-2xl p-5 space-y-4">
          <p className="text-white/30 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#E91E8C]" /> Logistics
          </p>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] text-white/20 uppercase font-bold">Your Details</p>
              <p className="flex items-center gap-2 text-white text-sm"><User className="w-3 h-3 text-[#E91E8C]" />{eventDetails.name} ({eventDetails.phone})</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-white/20 uppercase font-bold">Recipient Details</p>
              <p className="flex items-center gap-2 text-white text-sm"><Gift className="w-3 h-3 text-[#7C3AED]" />{eventDetails.recipientName} ({eventDetails.recipientPhone})</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-white/20 uppercase font-bold">Event</p>
              <p className="flex items-center gap-2 text-white text-sm"><Calendar className="w-3 h-3 text-white/40" />{eventDetails.date}</p>
              <p className="flex items-center gap-2 text-white text-sm"><Clock className="w-3 h-3 text-white/40" />{eventDetails.time}</p>
              <p className="flex items-center gap-2 text-white text-sm"><MapPin className="w-3 h-3 text-white/40" />{eventDetails.location}</p>
            </div>
          </div>
        </div>

        {/* Items & Pricing */}
        <div className="glass border border-white/8 rounded-2xl p-5 space-y-4">
          <p className="text-white/30 text-xs font-medium uppercase tracking-widest">Selected Items</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-white/40 pb-2 border-b border-white/5">
              <p className="flex items-center gap-2"><Package className="w-3 h-3" /> {baseService} {roomVibe && `(${roomVibe})`}</p>
            </div>
            <div className="space-y-2 pt-2 max-h-32 overflow-y-auto custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-white/60 flex items-center gap-1.5">
                    <span>{item.image}</span> {item.name}
                    <span className="text-white/25">×{item.quantity}</span>
                  </span>
                  <span className="text-white font-medium">GH₵{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/8 pt-3 space-y-1">
            <div className="flex justify-between text-sm text-white/40">
              <span>Service & Packaging fee</span><span>GH₵50</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-white">Total</span>
              <span className="text-[#D4AF37] text-lg">GH₵{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <Button variant="secondary" onClick={() => setStep(4)} className="w-full sm:w-auto">
          <ArrowLeft className="w-4 h-4" /> Edit Details
        </Button>
        <Button onClick={handleConfirm} loading={loading} className="w-full sm:w-auto flex-1">
          <CheckCircle2 className="w-4 h-4" /> Confirm Booking
        </Button>
        <a
          href={`https://wa.me/233550000000?text=${whatsappMessage}`}
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
