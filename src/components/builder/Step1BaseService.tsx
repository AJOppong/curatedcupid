"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import { baseServices, roomTransportOptions } from "@/lib/data";
import Button from "@/components/ui/Button";
import * as LucideIcons from "lucide-react";
import { ArrowRight, ArrowLeft, Check, AlertCircle, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const ROOM_VIBES = [
  { name: "Romantic", image: "/room_romantic_1776853657064.png", desc: "Warm candles, rose petals & intimacy" },
  { name: "Calm & Serene", image: "/room_calm_serene_1776854068465.png", desc: "Pastels, plants & peaceful energy" },
  { name: "Bestie Vibes", image: "/room_bestie_vibes_1776854146490.png", desc: "Fun balloons, snacks & vibrant colors" },
  { name: "Congratulatory", image: "/room_congratulatory_vibes_1776854366422.png", desc: "Celebration, gold/silver & achievements" },
  { name: "Other", image: null, desc: "Describe your own custom aesthetic" },
];

export default function Step1BaseService() {
  const {
    baseService, setBaseService, roomVibe, setRoomVibe,
    customVibe, setCustomVibe, roomTransport, setRoomTransport, setStep,
  } = useBuilder();

  const [transportConfirmed, setTransportConfirmed] = useState(false);

  const handleServiceSelect = (name: string) => {
    setBaseService(name);
    if (name !== "Room Aesthetics") setRoomVibe("", "");
  };

  const vibeSelected = baseService === "Room Aesthetics" && roomVibe;
  const canProceed =
    baseService &&
    (baseService !== "Room Aesthetics" ||
      (roomVibe && (roomVibe !== "Other" || customVibe.trim()) && transportConfirmed));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-2">
          Choose Your <span className="text-[#E91E8C]">Experience</span>
        </h2>
        <p className="text-[var(--text-muted)] text-sm">Select the type of celebration you&apos;d like to create</p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {baseServices.map((service, i) => {
          const isSelected = baseService === service.name;
          const IconComponent = (LucideIcons as any)[service.emoji] || LucideIcons.HelpCircle;
          return (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleServiceSelect(service.name)}
              className={`relative text-left rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "border-[#E91E8C] shadow-[0_0_30px_rgba(233,30,140,0.2)] bg-[#E91E8C]/5"
                  : "glass border-[var(--border)] hover:border-[var(--border)]"
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#E91E8C] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-[var(--text-main)]" />
                </div>
              )}
              <IconComponent className="w-10 h-10 mb-4 text-[#E91E8C]" />
              <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">{service.name}</h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">{service.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Room Aesthetics — sub-flow */}
      <AnimatePresence>
        {baseService === "Room Aesthetics" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6 pt-6 border-t border-[var(--border)] overflow-hidden"
          >
            {/* Exclusivity notice */}
            <div className="flex items-start gap-3 bg-amber-500/8 border border-amber-500/20 rounded-2xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-amber-200/80 text-xs leading-relaxed">
                <span className="font-bold">Room Bookings are Exclusive.</span> Please ensure the room or venue is already
                reserved/booked by you before proceeding. Curated Cupid will only be responsible for the décor setup.
              </p>
            </div>

            {/* Vibe picker */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-1">Select Room Vibe</h3>
              <p className="text-[var(--text-muted)] text-xs">Choose the aesthetic that fits your occasion</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {ROOM_VIBES.map((vibe) => {
                const isSelected = roomVibe === vibe.name;
                return (
                  <motion.button
                    key={vibe.name}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRoomVibe(vibe.name, vibe.image ?? "")}
                    className={`group relative rounded-xl overflow-hidden border-2 transition-all ${
                      isSelected ? "border-[#E91E8C]" : "border-transparent"
                    } ${vibe.image ? "aspect-video" : "aspect-video bg-[var(--glass-bg)] flex flex-col items-center justify-center gap-2 p-4"}`}
                  >
                    {vibe.image ? (
                      <>
                        <Image src={vibe.image} alt={vibe.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 text-left">
                          <p className="text-[var(--text-main)] text-xs font-bold">{vibe.name}</p>
                          <p className="text-[var(--text-muted)] text-[10px] line-clamp-1">{vibe.desc}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl">✍️</span>
                        <p className="text-[var(--text-main)] text-xs font-bold">{vibe.name}</p>
                        <p className="text-[var(--text-muted)] text-[10px] text-center">{vibe.desc}</p>
                      </>
                    )}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#E91E8C] flex items-center justify-center">
                        <Check className="w-3 h-3 text-[var(--text-main)]" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Custom vibe input */}
            <AnimatePresence>
              {roomVibe === "Other" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <input
                    type="text"
                    placeholder="Describe your preferred room aesthetic..."
                    value={customVibe}
                    onChange={(e) => setCustomVibe(e.target.value)}
                    className="w-full glass border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-main)] text-sm placeholder-white/20 focus:outline-none focus:border-[#E91E8C]/50 transition-all bg-transparent"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Transportation confirmation */}
            <AnimatePresence>
              {vibeSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-3 pt-4 border-t border-[var(--border)]"
                >
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#E91E8C]" />
                    <h4 className="text-sm font-bold text-[var(--text-main)]">Room Transport Service</h4>
                  </div>
                  <p className="text-[var(--text-muted)] text-xs">Would you like Curated Cupid to transport the décor to your venue?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {roomTransportOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => { setRoomTransport(opt.id, opt.price); setTransportConfirmed(true); }}
                        className={`rounded-xl p-4 border text-left transition-all ${
                          roomTransport === opt.id && transportConfirmed
                            ? "border-[#E91E8C] bg-[#E91E8C]/8 shadow-[0_0_15px_rgba(233,30,140,0.15)]"
                            : "glass border-[var(--border)] hover:border-[var(--border)]"
                        }`}
                      >
                        <p className="text-[var(--text-main)] text-sm font-semibold mb-1">{opt.label}</p>
                        <p className="text-[var(--text-muted)] text-xs mb-2">{opt.desc}</p>
                        <p className="text-[#D4AF37] font-bold text-sm">
                          {opt.price === 0 ? "Free" : `GH₵${opt.price}`}
                        </p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Link href="/">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
        <Button onClick={() => setStep(2)} disabled={!canProceed} className="px-8 py-3 rounded-full">
          Continue <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
