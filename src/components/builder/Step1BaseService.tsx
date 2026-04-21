"use client";

import { motion } from "framer-motion";
import { useBuilder } from "@/context/BuilderContext";
import { baseServices } from "@/lib/data";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function Step1BaseService() {
  const { baseService, setBaseService, setStep } = useBuilder();

  const handleNext = () => {
    if (baseService) setStep(2);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Choose Your <span className="text-[#F2B8C6]">Experience</span>
        </h2>
        <p className="text-white/50 text-sm">Select the type of romantic experience you'd like to create</p>
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
                  ? "border-[#F2B8C6] shadow-[0_0_30px_rgba(242,184,198,0.25)] bg-gradient-to-br from-[#F2B8C6]/10 to-[#9b87f5]/5"
                  : "glass border-white/10 hover:border-white/20"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="selected-ring"
                  className="absolute inset-0 rounded-2xl border-2 border-[#F2B8C6]"
                />
              )}
              <span className="text-4xl mb-4 block">{service.emoji}</span>
              <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>

              {isSelected && (
                <div className="mt-4 flex items-center gap-1 text-[#F2B8C6] text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#F2B8C6] inline-block" />
                  Selected
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleNext}
          disabled={!baseService}
          className="px-8 py-3"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
