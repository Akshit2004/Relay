"use client";

import { useState, useId, type InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuthInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export function AuthInput({ label, icon, error, className, ...props }: AuthInputProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const isRaised = focused || hasValue;

  return (
    <div className={cn("group relative", className)}>
      <div
        className={cn(
          "relative flex items-center rounded-lg border bg-canvas-dark/60 transition-all duration-200",
          focused
            ? "border-brand-blue shadow-[0_0_0_1px_var(--color-brand-blue)]"
            : error
              ? "border-brand-error/60"
              : "border-hairline hover:border-steel/40"
        )}
      >
        {icon && (
          <span
            className={cn(
              "pointer-events-none pl-4 transition-colors duration-200",
              focused ? "text-brand-blue" : "text-steel"
            )}
          >
            {icon}
          </span>
        )}

        <div className="relative flex-1">
          <motion.label
            htmlFor={id}
            animate={{
              y: isRaised ? -10 : 0,
              scale: isRaised ? 0.75 : 1,
            }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 origin-left font-medium transition-colors duration-200",
              isRaised
                ? focused
                  ? "text-brand-blue"
                  : "text-slate"
                : "text-steel",
              "text-body-sm"
            )}
          >
            {label}
          </motion.label>

          <input
            id={id}
            {...props}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              setHasValue(e.target.value.length > 0);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0);
              props.onChange?.(e);
            }}
            className={cn(
              "w-full bg-transparent px-4 pb-2 pt-5 text-body-sm text-ink outline-none",
              "placeholder:text-transparent"
            )}
          />
        </div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 pl-1 text-caption text-brand-error"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
