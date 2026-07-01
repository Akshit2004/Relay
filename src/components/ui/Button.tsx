"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-blue text-on-brand hover:bg-brand-blue-deep rounded-full",
  secondary:
    "bg-transparent text-ink border border-hairline hover:border-slate rounded-full",
  ghost: "bg-transparent text-slate hover:text-ink rounded-sm",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-body-sm font-medium",
  sm: "px-4 py-2 text-caption font-medium",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center whitespace-nowrap transition-colors duration-200",
    variantClasses[variant],
    sizeClasses[size],
    disabled && "pointer-events-none opacity-60",
    className
  );

  const motionProps = {
    whileTap: { scale: 0.97 },
    transition: { duration: 0.15 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
