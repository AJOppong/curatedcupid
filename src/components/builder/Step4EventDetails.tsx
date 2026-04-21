"use client";

import { useBuilder } from "@/context/BuilderContext";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, User, Phone, Calendar, Clock, MapPin, Palette, MessageSquare } from "lucide-react";

const inputClass =
  "w-full glass border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#F2B8C6]/50 focus:shadow-[0_0_15px_rgba(242,184,198,0.1)] transition-all bg-transparent";

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function Field({ label, icon, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-white/60 text-xs font-medium">
        <span className="text-[#F2B8C6]">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Step4EventDetails() {
  const { eventDetails, updateEventDetails, setStep } = useBuilder();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(5);
  };

  const isValid =
    eventDetails.name.trim() &&
    eventDetails.phone.trim() &&
    eventDetails.date &&
    eventDetails.time &&
    eventDetails.location.trim();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Event <span className="text-[#F2B8C6]">Details</span>
        </h2>
        <p className="text-white/50 text-sm">Tell us everything we need to make it perfect</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <Field label="Phone Number" icon={<Phone className="w-3 h-3" />}>
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
            <input
              type="time"
              className={inputClass}
              value={eventDetails.time}
              onChange={(e) => updateEventDetails({ time: e.target.value })}
              required
            />
          </Field>
        </div>

        <Field label="Location / Venue" icon={<MapPin className="w-3 h-3" />}>
          <input
            type="text"
            placeholder="e.g. Lagos Island, Apartment 4B"
            className={inputClass}
            value={eventDetails.location}
            onChange={(e) => updateEventDetails({ location: e.target.value })}
            required
          />
        </Field>

        <Field label="Theme / Aesthetic Colors" icon={<Palette className="w-3 h-3" />}>
          <input
            type="text"
            placeholder="e.g. Rose gold, White & Pink, Burgundy..."
            className={inputClass}
            value={eventDetails.theme}
            onChange={(e) => updateEventDetails({ theme: e.target.value })}
          />
        </Field>

        <Field label="Special Instructions" icon={<MessageSquare className="w-3 h-3" />}>
          <textarea
            rows={3}
            placeholder="Any special requests, surprises, or personalization ideas..."
            className={`${inputClass} resize-none`}
            value={eventDetails.instructions}
            onChange={(e) => updateEventDetails({ instructions: e.target.value })}
          />
        </Field>

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
