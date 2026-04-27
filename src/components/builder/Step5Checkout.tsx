"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { deliveryMethods, roomTransportOptions } from "@/lib/data";
import {
  ArrowLeft, CheckCircle2, MessageCircle, User, Phone,
  Calendar, MapPin, Package, Sparkles, Gift, Clock, Truck, AlertTriangle
} from "lucide-react";

export default function Step5Checkout() {
  const { cart, cartTotal, baseService, roomVibe, customVibe, roomTransport, roomTransportPrice, eventDetails, setStep } = useBuilder();
  const [loading, setLoading] = useState(false);
  const [paymentPhase, setPaymentPhase] = useState<"none" | "details" | "completed">("none");
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [refundAcknowledged, setRefundAcknowledged] = useState(false);

  const total = cartTotal + 50 + (baseService === "Room Aesthetics" ? roomTransportPrice : 0);

  const deliveryObj = deliveryMethods.find(d => d.id === eventDetails.deliveryMethod);
  const transportObj = roomTransportOptions.find(t => t.id === roomTransport);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("bookings").insert([{
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
        room_vibe: roomVibe === "Other" ? customVibe : roomVibe,
        items: cart,
        total_amount: total,
        delivery_method: eventDetails.deliveryMethodDetails ? `${deliveryObj?.label} - ${eventDetails.deliveryMethodDetails}` : deliveryObj?.label,
        room_transport: baseService === "Room Aesthetics" ? transportObj?.label : null,
        status: "awaiting_payment"
      }]).select();

      if (data && data[0]) {
        setBookingId(data[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setPaymentPhase("details");
    }
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      if (bookingId) {
        await supabase.from("bookings").update({ status: "payment_verifying" }).eq("id", bookingId);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setPaymentPhase("completed");
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Curated Cupid! 🌹\n\nI'd like to confirm my booking:\n\n` +
    `*Sender:* ${eventDetails.name} (${eventDetails.phone})\n` +
    `*Recipient:* ${eventDetails.recipientName} (${eventDetails.recipientPhone})\n` +
    `*Delivery Date:* ${eventDetails.date} at ${eventDetails.time}\n` +
    `*Location:* ${eventDetails.location}\n` +
    `*Delivery Method:* ${deliveryObj?.label} ${eventDetails.deliveryMethodDetails ? `(${eventDetails.deliveryMethodDetails})` : ""}\n` +
    `*Service:* ${baseService}${roomVibe ? ` (${roomVibe === "Other" ? customVibe : roomVibe} Vibe)` : ""}\n\n` +
    `${baseService === "Room Aesthetics" ? `*Room Transport:* ${transportObj?.label}\n\n` : ""}` +
    `*Items:*\n${cart.map((i) => `- ${i.name} x${i.quantity} (GH₵${(i.price * i.quantity).toLocaleString()})`).join("\n")}\n\n` +
    `*Total:* GH₵${total.toLocaleString()}\n\n` +
    `*Theme:* ${eventDetails.theme || "No preference"}\n` +
    `*Notes:* ${eventDetails.instructions || "None"}`
  );

  if (paymentPhase === "details") {
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
          <Phone className="w-10 h-10 text-[#E91E8C]" />
        </motion.div>

        <div>
          <h2 className="text-3xl font-bold text-[var(--text-main)] mb-2">
            Make <span className="text-[#E91E8C]">Payment</span>
          </h2>
          <p className="text-[var(--text-muted)] text-sm max-w-sm mx-auto">
            Your booking is saved! Please send MTN Mobile Money to the number below to secure your celebration.
          </p>
        </div>

        <div className="glass border border-[var(--border)] rounded-2xl p-6 text-center max-w-sm mx-auto space-y-4">
          <p className="text-[var(--text-muted)] text-xs font-medium uppercase tracking-widest">Payment Details</p>
          <div className="space-y-1 py-2">
            <p className="text-[var(--text-main)] font-bold text-lg tracking-widest">055 000 0000</p>
            <p className="text-[var(--text-muted)] text-sm">Account Name: Curated Cupid</p>
          </div>
          <div className="pt-2 border-t border-[var(--border)]">
             <p className="text-[var(--text-main)] text-sm">Amount to Pay:</p>
             <p className="text-[#D4AF37] font-bold text-2xl">GH₵{total.toLocaleString()}</p>
          </div>
        </div>

        <Button loading={loading} onClick={handleConfirmPayment} className="mx-auto w-full max-w-sm py-4">
          I Have Made Payment
        </Button>
      </motion.div>
    );
  }

  if (paymentPhase === "completed") {
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
          <h2 className="text-3xl font-bold text-[var(--text-main)] mb-2">
            Booking <span className="text-[#E91E8C]">Confirmed!</span> ✨
          </h2>
          <p className="text-[var(--text-muted)] text-sm max-w-sm mx-auto">
            Your celebration experience is being carefully crafted. We&apos;ll be in touch shortly to confirm all details.
          </p>
        </div>

        <div className="glass border border-[var(--border)] rounded-2xl p-5 text-left max-w-sm mx-auto space-y-2">
          <p className="text-[var(--text-muted)] text-xs font-medium uppercase tracking-widest mb-3">Booking Summary</p>
          <p className="text-[var(--text-main)] text-sm"><span className="text-[var(--text-muted)]">For: </span>{eventDetails.recipientName}</p>
          <p className="text-[var(--text-main)] text-sm"><span className="text-[var(--text-muted)]">Date: </span>{eventDetails.date} at {eventDetails.time}</p>
          <p className="text-[var(--text-main)] text-sm"><span className="text-[var(--text-muted)]">Location: </span>{eventDetails.location}</p>
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
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-2">
          Order <span className="text-[#E91E8C]">Summary</span>
        </h2>
        <p className="text-[var(--text-muted)] text-sm">Review everything before confirming your booking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Logistics & People */}
        <div className="glass border border-[var(--border)] rounded-2xl p-5 space-y-4">
          <p className="text-[var(--text-muted)] text-xs font-medium uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#E91E8C]" /> Logistics
          </p>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Your Details</p>
              <p className="flex items-center gap-2 text-[var(--text-main)] text-sm"><User className="w-3 h-3 text-[#E91E8C]" />{eventDetails.name} ({eventDetails.phone})</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Recipient Details</p>
              <p className="flex items-center gap-2 text-[var(--text-main)] text-sm"><Gift className="w-3 h-3 text-[#7C3AED]" />{eventDetails.recipientName} ({eventDetails.recipientPhone})</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Delivery</p>
              <p className="flex items-center gap-2 text-[var(--text-main)] text-sm"><Calendar className="w-3 h-3 text-[var(--text-muted)]" />{eventDetails.date}</p>
              <p className="flex items-center gap-2 text-[var(--text-main)] text-sm"><Clock className="w-3 h-3 text-[var(--text-muted)]" />{eventDetails.time}</p>
              <p className="flex items-center gap-2 text-[var(--text-main)] text-sm"><MapPin className="w-3 h-3 text-[var(--text-muted)]" />{eventDetails.location}</p>
              <p className="flex items-center gap-2 text-[var(--text-main)] text-sm mt-1"><Truck className="w-3 h-3 text-[var(--text-muted)]" />{deliveryObj?.label} {eventDetails.deliveryMethodDetails && `(${eventDetails.deliveryMethodDetails})`}</p>
              {baseService === "Room Aesthetics" && (
                <p className="flex items-center gap-2 text-[var(--text-main)] text-sm mt-1">
                  <span className="text-[var(--text-muted)] w-3 h-3 flex items-center justify-center text-[10px]">🛏️</span> 
                  Room Transport: {transportObj?.label}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Items & Pricing */}
        <div className="glass border border-[var(--border)] rounded-2xl p-5 flex flex-col">
          <p className="text-[var(--text-muted)] text-xs font-medium uppercase tracking-widest mb-4">Selected Items</p>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] pb-2 border-b border-[var(--border)]">
              <p className="flex items-center gap-2"><Package className="w-3 h-3" /> {baseService} {roomVibe && `(${roomVibe === "Other" ? customVibe : roomVibe})`}</p>
            </div>
            <div className="space-y-2 pt-2 max-h-[14rem] overflow-y-auto custom-scrollbar pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-muted)] flex items-center gap-2 truncate">
                    <span className="w-5 flex justify-center text-base">{item.image.length < 5 ? item.image : "✨"}</span> 
                    <span className="truncate">{item.name}</span>
                    <span className="text-[var(--text-muted)] flex-shrink-0">×{item.quantity}</span>
                  </span>
                  <span className="text-[var(--text-main)] font-medium flex-shrink-0 ml-2">GH₵{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-[var(--border)] pt-3 space-y-1 mt-4">
            <div className="flex justify-between text-sm text-[var(--text-muted)]">
              <span>Service & Packaging fee</span><span>GH₵50</span>
            </div>
            {baseService === "Room Aesthetics" && roomTransportPrice > 0 && (
              <div className="flex justify-between text-sm text-[var(--text-muted)]">
                <span>Room Transport</span><span>GH₵{roomTransportPrice}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-1">
              <span className="text-[var(--text-main)]">Total</span>
              <span className="text-[#D4AF37] text-lg">GH₵{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* No Refund Notice */}
      <div className="glass bg-red-950/20 border-red-500/20 rounded-2xl p-4 flex gap-3 items-start cursor-pointer transition-colors hover:bg-red-950/30" onClick={() => setRefundAcknowledged(!refundAcknowledged)}>
        <button 
          type="button"
          className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-all flex-shrink-0 ${refundAcknowledged ? "bg-red-500 border-red-500" : "border-[var(--border)] bg-transparent"}`}
        >
          {refundAcknowledged && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--text-main)]" />}
        </button>
        <div>
          <p className="flex items-center gap-1.5 text-red-400 font-bold text-sm mb-1">
            <AlertTriangle className="w-4 h-4" /> Final Booking Policy
          </p>
          <p className="text-[var(--text-muted)] text-xs leading-relaxed">
            Please note: All bookings are final. We do not offer refunds once a booking is confirmed and payment is processed. By proceeding, you acknowledge and agree to this policy.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <Button variant="secondary" onClick={() => setStep(4)} className="w-full sm:w-auto">
          <ArrowLeft className="w-4 h-4" /> Edit Details
        </Button>
        <Button onClick={handleConfirm} disabled={!refundAcknowledged} loading={loading} className="w-full sm:w-auto flex-1">
          <CheckCircle2 className="w-4 h-4" /> Confirm Booking & Pay
        </Button>
        <a
          href={refundAcknowledged ? `https://wa.me/233550000000?text=${whatsappMessage}` : "#"}
          target={refundAcknowledged ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
          onClick={(e) => !refundAcknowledged && e.preventDefault()}
        >
          <Button variant="gold" disabled={!refundAcknowledged} className="w-full justify-center gap-2">
            <MessageCircle className="w-4 h-4" /> Book via WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
}
