"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import { baseServices } from "@/lib/data";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ROOM_VIBES = [
  { name: "Romantic", image: "/room_romantic_1776853657064.png", desc: "Warm candles, rose petals & intimacy" },
  { name: "Calm & Serene", image: "/room_calm_serene_1776854068465.png", desc: "Pastels, plants & peaceful energy" },
  { name: "Bestie Vibes", image: "/room_bestie_vibes_1776854146490.png", desc: "Fun balloons, snacks & vibrant colors" },
  { name: "Congratulatory", image: "/room_congratulatory_vibes_1776854366422.png", desc: "Celebration, gold/silver & achievements" },
];

export default function Step1BaseService() {
  const { baseService, setBaseService, roomVibe, setRoomVibe, setStep } = useBuilder();

  const handleServiceSelect = (name: string) => {
    setBaseService(name);
    if (name !== "Room Aesthetics") {
      setRoomVibe("", "");
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Choose Your <span className="text-[#E91E8C]">Experience</span>
        </h2>
        <p className="text-white/40 text-sm">Select the type of celebration you&apos;d like to create</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {baseServices.map((service, i) => {
          const isSelected = baseService === service.name;
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
                  : "glass border-white/8 hover:border-white/15"
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#E91E8C] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <span className="text-4xl mb-4 block">{service.emoji}</span>
              <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {baseService === "Room Aesthetics" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6 pt-6 border-t border-white/5"
          >
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1">Select Room Vibe</h3>
              <p className="text-white/30 text-xs">Choose the aesthetic that fits your occasion</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ROOM_VIBES.map((vibe) => (
                <motion.button
                  key={vibe.name}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setRoomVibe(vibe.name, vibe.image);
                  }}
                  className={`group relative rounded-xl overflow-hidden aspect-video border-2 transition-all ${
                    roomVibe === vibe.name ? "border-[#E91E8C]" : "border-transparent"
                  }`}
                >
                  <Image src={vibe.image} alt={vibe.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-left">
                    <p className="text-white text-xs font-bold">{vibe.name}</p>
                    <p className="text-white/50 text-[10px] line-clamp-1">{vibe.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-4">
        <Link href="/">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
        <Button 
          onClick={() => setStep(2)} 
          disabled={!baseService || (baseService === "Room Aesthetics" && !roomVibe)} 
          className="px-8 py-3 rounded-full"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
