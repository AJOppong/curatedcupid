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
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";
import { predefinedPackages, shopItems } from "@/lib/data";

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
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((s, i) => {
        const isActive = step === s.num;
        const isDone = step > s.num;
        return (
          <div key={s.num} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  background: isDone
                    ? "#E91E8C"
                    : isActive
                    ? "linear-gradient(135deg,#E91E8C,#7C3AED)"
                    : "rgba(255,255,255,0.04)",
                  borderColor: isActive || isDone
                    ? "rgba(233,30,140,0.6)"
                    : "rgba(255,255,255,0.08)",
                  boxShadow: isActive
                    ? "0 0 20px rgba(233,30,140,0.45)"
                    : "none",
                }}
                className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300"
              >
                {isDone ? (
                  <Check className="w-3 h-3 text-[var(--text-main)]" />
                ) : (
                  <span className={isActive ? "text-[var(--text-main)]" : "text-[var(--text-muted)]"} style={{ fontSize: "10px" }}>{s.num}</span>
                )}
              </motion.div>
              <span className={`text-[9px] font-medium hidden sm:block transition-colors ${
                isActive ? "text-[#E91E8C]" : isDone ? "text-[var(--text-muted)]" : "text-[var(--text-muted)]"
              }`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="w-6 md:w-10 h-px mx-0.5 mb-4 transition-all duration-500"
                style={{
                  background: step > s.num
                    ? "linear-gradient(90deg,#E91E8C,#7C3AED)"
                    : "rgba(255,255,255,0.06)"
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function BuilderContent() {
  const { step, preloadItems, setStep, setBaseService, clearCart } = useBuilder();
  const searchParams = useSearchParams();
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    const pkgName = searchParams.get("package");
    if (pkgName) {
      const pkg = predefinedPackages.find(p => p.name === pkgName);
      if (pkg) {
        hasLoaded.current = true;
        clearCart();
        const itemsToLoad = pkg.items.map(itemId => {
          const item = shopItems.find(si => si.id === itemId);
          return item ? { id: item.id, name: item.name, price: item.price, image: item.emoji } : null;
        }).filter(Boolean) as any;
        preloadItems(itemsToLoad, pkg.name);
        setBaseService("Surprise Package");
        setStep(2);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stepComponents: Record<number, React.ReactNode> = {
    1: <Step1BaseService />,
    2: <Step2SelectItems />,
    3: <Step3Cart />,
    4: <Step4EventDetails />,
    5: <Step5Checkout />,
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-3 md:px-4">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#E91E8C]/6 blur-[120px]" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full bg-[#7C3AED]/6 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        <StepIndicator />

        <div className="glass border border-[var(--border)] rounded-2xl md:rounded-3xl p-4 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.6)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
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
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[var(--text-main)]">Loading...</div>}>
        <BuilderContent />
      </Suspense>
    </BuilderProvider>
  );
}
