"use client";

import { useBuilder } from "@/context/BuilderContext";
import { deliveryMethods } from "@/lib/data";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, User, Phone, Calendar, Clock, MapPin, Palette, MessageSquare, Gift, Truck, AlertTriangle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const inputClass =
  "w-full glass border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-main)] text-sm placeholder-white/20 focus:outline-none focus:border-[#E91E8C]/50 focus:shadow-[0_0_15px_rgba(233,30,140,0.1)] transition-all bg-transparent";

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  optional?: boolean;
}

function Field({ label, icon, children, optional }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center justify-between text-[var(--text-muted)] text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="text-[#E91E8C]">{icon}</span>
          {label}
        </div>
        {optional && <span className="text-[var(--text-muted)] font-normal">Optional</span>}
      </label>
      {children}
    </div>
  );
}

export default function Step4EventDetails() {
  const { eventDetails, setEventDetails: updateEventDetails, setStep } = useBuilder();
  const { activeTheme } = useTheme();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDeliveryPicker, setShowDeliveryPicker] = useState(false);

  // Pre-order end date
  const preorderEnd = activeTheme?.end_date ? new Date(activeTheme.end_date) : null;
  const now = new Date();
  const showPreorderBanner = preorderEnd && preorderEnd > now;
  const daysLeft = preorderEnd ? Math.ceil((preorderEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const formattedEndDate = preorderEnd
    ? preorderEnd.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const deliveryRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (deliveryRef.current && !deliveryRef.current.contains(event.target as Node)) {
        setShowDeliveryPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(5);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  const minutes = ["00", "15", "30", "45"];

  const isValid =
    eventDetails.name.trim() &&
    eventDetails.phone.trim() &&
    eventDetails.recipientName.trim() &&
    eventDetails.recipientPhone.trim() &&
    eventDetails.date &&
    eventDetails.time &&
    eventDetails.location.trim() &&
    eventDetails.deliveryMethod;

  const selectedDelivery = deliveryMethods.find((d) => d.id === eventDetails.deliveryMethod);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-2">
          Booking <span className="text-[#E91E8C]">Details</span>
        </h2>
        <p className="text-[var(--text-muted)] text-sm">Tell us everything we need to make it perfect</p>
      </div>

      {/* Pre-order deadline notice */}
      {showPreorderBanner && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 px-4 py-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25"
        >
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 text-xs font-bold mb-0.5">Pre-order Deadline</p>
            <p className="text-amber-400/80 text-xs leading-relaxed">
              Bookings close on <strong className="text-amber-300">{formattedEndDate}</strong> — only{' '}
              <strong className="text-amber-300">{daysLeft} day{daysLeft !== 1 ? 's' : ''}</strong> left to secure your experience.
            </p>
          </div>
        </motion.div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Your Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-muted)] border-l-2 border-[#E91E8C] pl-3">Your Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Your Name" icon={<User className="w-3 h-3" />}>
              <input
                type="text"
                placeholder="e.g. Amara Johnson"
                className={inputClass}
                value={eventDetails.name}
                onChange={(e) => updateEventDetails({ name: e.target.value })}
                required
              />
            </Field>
            <Field label="Your Phone Number" icon={<Phone className="w-3 h-3" />}>
              <input
                type="tel"
                placeholder="e.g. 0241234567"
                className={inputClass}
                value={eventDetails.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  updateEventDetails({ phone: val });
                }}
                required
                pattern="[0-9]{10}"
                maxLength={10}
              />
            </Field>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-muted)] border-l-2 border-[#7C3AED] pl-3">Recipient Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Recipient Name" icon={<Gift className="w-3 h-3" />}>
              <input
                type="text"
                placeholder="Who is this surprise for?"
                className={inputClass}
                value={eventDetails.recipientName}
                onChange={(e) => updateEventDetails({ recipientName: e.target.value })}
                required
              />
            </Field>
            <Field label="Recipient Phone" icon={<Phone className="w-3 h-3" />}>
              <input
                type="tel"
                placeholder="e.g. 0241234567"
                className={inputClass}
                value={eventDetails.recipientPhone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  updateEventDetails({ recipientPhone: val });
                }}
                required
                pattern="[0-9]{10}"
                maxLength={10}
              />
            </Field>
          </div>
        </div>

        {/* Event Logistics */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-muted)] border-l-2 border-[var(--border)] pl-3">Logistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Delivery Date" icon={<Calendar className="w-3 h-3" />}>
              <input
                type="date"
                className={inputClass}
                value={eventDetails.date}
                onChange={(e) => updateEventDetails({ date: e.target.value })}
                required
              />
            </Field>
            <Field label="Delivery Time" icon={<Clock className="w-3 h-3" />}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 14:00"
                  className={inputClass}
                  value={eventDetails.time}
                  onFocus={() => setShowTimePicker(true)}
                  onChange={(e) => updateEventDetails({ time: e.target.value })}
                  required
                />
                {showTimePicker && (
                  <div className="absolute top-full left-0 right-0 mt-2 p-4 glass border border-[var(--border)] rounded-2xl z-50 shadow-2xl">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Select Time</span>
                      <button type="button" onClick={() => setShowTimePicker(false)} className="text-[#E91E8C] text-[10px] font-bold">Close</button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                      {hours.map(h => (
                        minutes.map(m => (
                          <button
                            key={`${h}:${m}`}
                            type="button"
                            onClick={() => {
                              updateEventDetails({ time: `${h}:${m}` });
                              setShowTimePicker(false);
                            }}
                            className={`py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                              eventDetails.time === `${h}:${m}`
                                ? "bg-[#E91E8C] text-[var(--text-main)]"
                                : "hover:bg-[var(--glass-bg)] text-[var(--text-muted)]"
                            }`}
                          >
                            {h}:{m}
                          </button>
                        ))
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Means of Delivery" icon={<Truck className="w-3 h-3" />}>
              <div className="relative" ref={deliveryRef}>
                <button
                  type="button"
                  onClick={() => setShowDeliveryPicker(!showDeliveryPicker)}
                  className={`w-full text-left glass border rounded-xl px-4 py-3 text-sm transition-all flex justify-between items-center ${
                    eventDetails.deliveryMethod ? "border-[#E91E8C]/50 text-[var(--text-main)] shadow-[0_0_15px_rgba(233,30,140,0.1)]" : "border-[var(--border)] text-[var(--text-muted)]"
                  }`}
                >
                  <span>
                    {selectedDelivery ? (
                      <span className="flex items-center gap-2"><span className="text-lg">{selectedDelivery.icon}</span> {selectedDelivery.label}</span>
                    ) : "Select delivery method..."}
                  </span>
                  <span className="text-[10px]">▼</span>
                </button>
                
                <AnimatePresence>
                  {showDeliveryPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 p-2 glass border border-[var(--border)] rounded-2xl z-50 shadow-2xl flex flex-col gap-1"
                    >
                      {deliveryMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => {
                            updateEventDetails({ deliveryMethod: method.id, deliveryMethodDetails: "" });
                            setShowDeliveryPicker(false);
                          }}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                            eventDetails.deliveryMethod === method.id ? "bg-[#E91E8C]/15 border border-[#E91E8C]/30" : "hover:bg-[var(--glass-bg)] border border-transparent"
                          }`}
                        >
                          <span className="text-xl">{method.icon}</span>
                          <div>
                            <p className="text-sm font-bold text-[var(--text-main)] mb-0.5">{method.label}</p>
                            <p className="text-xs text-[var(--text-muted)]">{method.desc}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Field>

            <Field label="Location / Venue" icon={<MapPin className="w-3 h-3" />}>
              <input
                type="text"
                placeholder="e.g. Ayeduase, Apartment 4B"
                className={inputClass}
                value={eventDetails.location}
                onChange={(e) => updateEventDetails({ location: e.target.value })}
                required
              />
            </Field>
          </div>

          <AnimatePresence>
            {selectedDelivery?.hasDetails && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <Field label="Delivery Instructions" icon={<MessageSquare className="w-3 h-3" />}>
                  <input
                    type="text"
                    placeholder="Specify your preferred delivery arrangement..."
                    className={inputClass}
                    value={eventDetails.deliveryMethodDetails}
                    onChange={(e) => updateEventDetails({ deliveryMethodDetails: e.target.value })}
                    required
                  />
                </Field>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Room Description (Conditional) */}
        {useBuilder().baseService === "Room Aesthetics" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[var(--text-muted)] border-l-2 border-[#E91E8C] pl-3">Room Setup Description</h3>
            <Field label="Describe your dream setup" icon={<MessageSquare className="w-3 h-3" />}>
              <textarea
                rows={3}
                placeholder="Tell us more about how you want the room to look... (colors, specific placements, surprise elements, etc.)"
                className={`${inputClass} resize-none`}
                value={eventDetails.roomDescription}
                onChange={(e) => updateEventDetails({ roomDescription: e.target.value })}
              />
            </Field>
          </div>
        )}

        {/* Optional Customization */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-muted)] border-l-2 border-[var(--border)] pl-3">Additional (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Theme / Aesthetic Colors" icon={<Palette className="w-3 h-3" />} optional>
              <input
                type="text"
                placeholder="e.g. Rose gold, White & Pink..."
                className={inputClass}
                value={eventDetails.theme}
                onChange={(e) => updateEventDetails({ theme: e.target.value })}
              />
            </Field>
            <Field label="Special Instructions" icon={<MessageSquare className="w-3 h-3" />} optional>
              <textarea
                rows={1}
                placeholder="Any special requests..."
                className={`${inputClass} resize-none`}
                value={eventDetails.instructions}
                onChange={(e) => updateEventDetails({ instructions: e.target.value })}
              />
            </Field>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <Button type="button" variant="secondary" onClick={() => setStep(3)}>
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <Button type="submit" disabled={!isValid} className="px-8">
            Review Order <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
