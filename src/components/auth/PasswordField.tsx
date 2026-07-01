"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.6 21.6 0 0 1 5.06-5.94M9.9 4.24A10.4 10.4 0 0 1 12 4c7 0 11 7 11 7a21.6 21.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

interface PasswordFieldProps {
  label: string;
  name: string;
  autoComplete?: string;
  icon?: React.ReactNode;
  error?: string;
}

export function PasswordField({ label, name, autoComplete, icon, error }: PasswordFieldProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const isRaised = focused || hasValue;

  return (
    <div className="group relative">
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
            name={name}
            required
            minLength={8}
            type={visible ? "text" : "password"}
            autoComplete={autoComplete}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false);
              setHasValue(e.target.value.length > 0);
            }}
            onChange={(e) => setHasValue(e.target.value.length > 0)}
            className="w-full bg-transparent px-4 pb-2 pr-12 pt-5 text-body-sm text-ink outline-none placeholder:text-transparent"
          />
        </div>

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-steel transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-blue"
        >
          <motion.span
            key={visible ? "hide" : "show"}
            initial={{ opacity: 0, rotate: -8 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.15 }}
            className="block"
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </motion.span>
        </button>
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
