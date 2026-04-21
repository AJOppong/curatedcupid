"use client";

import { motion } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import { baseServices } from "@/lib/data";
import Button from "@/components/ui/Button";
import { ArrowRight, Check } from "lucide-react";

export default function Step1BaseService() {
  const { baseService, setBaseService, setStep } = useBuilder();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Choose Your <span className="text-[#E91E8C]">Experience</span>
        </h2>
        <p className="text-white/40 text-sm">Select the type of romantic experience you&apos;d like to create</p>
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
              onClick={() => setBaseService(service.name as "Room Aesthetics" | "Surprise Package" | "Custom Setup")}
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

      <div className="flex justify-end pt-4">
        <Button onClick={() => baseService && setStep(2)} disabled={!baseService} className="px-8 py-3 rounded-full">
          Continue <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
