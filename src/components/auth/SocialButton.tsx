"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SocialButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function SocialButton({ icon, label, onClick, className }: SocialButtonProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12 }}
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center gap-2.5 rounded-lg border border-hairline bg-surface-soft/50 px-4 py-3",
        "text-body-sm font-medium text-ink",
        "transition-all duration-200 hover:border-steel/40 hover:bg-surface-soft",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
        className
      )}
    >
      {icon}
      {label}
    </motion.button>
  );
}
