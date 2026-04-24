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
    "btn-pink-gradient text-white font-semibold",
  secondary:
    "glass border border-[var(--border)] text-[var(--text-main)] hover:border-[var(--primary)]/40 hover:shadow-lg",
  gold: "bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary)]/80 text-white font-semibold shadow-lg",
  ghost: "text-[var(--primary)] hover:bg-[var(--primary-glow)] border border-transparent hover:border-[var(--primary)]/20",
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
