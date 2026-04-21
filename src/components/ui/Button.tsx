"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#E91E8C] to-[#c4186f] text-white font-semibold shadow-[0_0_24px_rgba(233,30,140,0.4)] hover:shadow-[0_0_40px_rgba(233,30,140,0.65)]",
  secondary:
    "glass border border-white/10 text-white hover:border-[#E91E8C]/40 hover:shadow-[0_0_20px_rgba(233,30,140,0.15)]",
  gold: "bg-gradient-to-r from-[#D4AF37] to-[#b8962e] text-[#0D0D12] font-semibold shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)]",
  ghost: "text-[#E91E8C] hover:bg-[#E91E8C]/8 border border-transparent hover:border-[#E91E8C]/20",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled || loading}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
