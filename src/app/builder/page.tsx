"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BuilderProvider, useBuilder } from "@/context/BuilderContext";
import Navbar from "@/components/Navbar";
import Step1BaseService from "@/components/builder/Step1BaseService";
import Step2SelectItems from "@/components/builder/Step2SelectItems";
import Step3Cart from "@/components/builder/Step3Cart";
import Step4EventDetails from "@/components/builder/Step4EventDetails";
import Step5Checkout from "@/components/builder/Step5Checkout";
import { Check } from "lucide-react";

const STEPS = [
  { label: "Service", num: 1 },
  { label: "Items", num: 2 },
  { label: "Cart", num: 3 },
  { label: "Details", num: 4 },
  { label: "Confirm", num: 5 },
];

function StepIndicator() {
  const { step } = useBuilder();
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((s, i) => {
        const isActive = step === s.num;
        const isDone = step > s.num;
        return (
          <div key={s.num} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  background: isDone
                    ? "linear-gradient(135deg,#F2B8C6,#c994ac)"
                    : isActive
                    ? "linear-gradient(135deg,#9b87f5,#F2B8C6)"
                    : "rgba(255,255,255,0.05)",
                  borderColor: isActive || isDone ? "rgba(242,184,198,0.6)" : "rgba(255,255,255,0.1)",
                  boxShadow: isActive ? "0 0 20px rgba(155,135,245,0.4)" : "none",
                }}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all"
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5 text-[#0B0B0F]" />
                ) : (
                  <span className={isActive ? "text-white" : "text-white/30"}>{s.num}</span>
                )}
              </motion.div>
              <span className={`text-[10px] font-medium hidden sm:block ${isActive ? "text-[#F2B8C6]" : isDone ? "text-white/50" : "text-white/20"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-8 md:w-12 h-px mx-1 mb-4" style={{
                background: step > s.num
                  ? "linear-gradient(90deg,#F2B8C6,#c994ac)"
                  : "rgba(255,255,255,0.08)"
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function BuilderContent() {
  const { step } = useBuilder();

  const stepComponents: Record<number, React.ReactNode> = {
    1: <Step1BaseService />,
    2: <Step2SelectItems />,
    3: <Step3Cart />,
    4: <Step4EventDetails />,
    5: <Step5Checkout />,
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Ambient glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#9b87f5]/8 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#F2B8C6]/8 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        <StepIndicator />

        <div className="glass border border-white/8 rounded-3xl p-6 md:p-10 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {stepComponents[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <BuilderProvider>
      <Navbar />
      <BuilderContent />
    </BuilderProvider>
  );
}
