"use client";

import { useBuilder } from "@/context/BuilderContext";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, User, Phone, Calendar, Clock, MapPin, Palette, MessageSquare, Gift } from "lucide-react";
import { useState } from "react";

const inputClass =
  "w-full glass border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#E91E8C]/50 focus:shadow-[0_0_15px_rgba(233,30,140,0.1)] transition-all bg-transparent";

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  optional?: boolean;
}

function Field({ label, icon, children, optional }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center justify-between text-white/50 text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="text-[#E91E8C]">{icon}</span>
          {label}
        </div>
        {optional && <span className="text-white/20 font-normal">Optional</span>}
      </label>
      {children}
    </div>
  );
}

export default function Step4EventDetails() {
  const { eventDetails, setEventDetails: updateEventDetails, setStep } = useBuilder();
  const [showTimePicker, setShowTimePicker] = useState(false);

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
    eventDetails.location.trim();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Event <span className="text-[#E91E8C]">Details</span>
        </h2>
        <p className="text-white/40 text-sm">Tell us everything we need to make it perfect</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Your Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white/80 border-l-2 border-[#E91E8C] pl-3">Your Details</h3>
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
                placeholder="e.g. 08012345678"
                className={inputClass}
                value={eventDetails.phone}
                onChange={(e) => updateEventDetails({ phone: e.target.value })}
                required
              />
            </Field>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white/80 border-l-2 border-[#7C3AED] pl-3">Recipient Details</h3>
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
                placeholder="Their contact for delivery"
                className={inputClass}
                value={eventDetails.recipientPhone}
                onChange={(e) => updateEventDetails({ recipientPhone: e.target.value })}
                required
              />
            </Field>
          </div>
        </div>

        {/* Event Logistics */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white/80 border-l-2 border-white/20 pl-3">Logistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Event Date" icon={<Calendar className="w-3 h-3" />}>
              <input
                type="date"
                className={inputClass}
                value={eventDetails.date}
                onChange={(e) => updateEventDetails({ date: e.target.value })}
                required
              />
            </Field>
            <Field label="Event Time" icon={<Clock className="w-3 h-3" />}>
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
                  <div className="absolute top-full left-0 right-0 mt-2 p-4 glass border border-white/10 rounded-2xl z-50 shadow-2xl">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Select Time</span>
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
                                ? "bg-[#E91E8C] text-white"
                                : "hover:bg-white/5 text-white/60"
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

        {/* Room Description (Conditional) */}
        {useBuilder().baseService === "Room Aesthetics" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white/80 border-l-2 border-[#E91E8C] pl-3">Room Setup Description</h3>
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
          <h3 className="text-sm font-bold text-white/80 border-l-2 border-white/10 pl-3">Additional (Optional)</h3>
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

        <div className="flex items-center justify-between pt-4">
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
