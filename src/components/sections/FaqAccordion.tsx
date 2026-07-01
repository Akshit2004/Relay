"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_FAQS = [
  {
    q: "Can I use my own SMTP credentials?",
    a: "Yes. Link your own SMTP provider in the dashboard, or skip setup entirely and send through Relay's default sender from day one.",
  },
  {
    q: "What happens when an email bounces?",
    a: "The bounce reason lands on the Log entry and fires a bounced webhook — no need to poll an events API separately.",
  },
  {
    q: "Is there a rate limit?",
    a: "Yes, tuned to your plan and enforced with burst protection so a traffic spike degrades gracefully instead of failing outright.",
  },
  {
    q: "Which languages have SDKs at launch?",
    a: "JavaScript, TypeScript, Node.js, and Python. Every SDK wraps the same REST API, so anything undocumented in the SDK is still one HTTP call away.",
  },
  {
    q: "How does idempotency work?",
    a: "Pass an Idempotency-Key header on any mutating request. Retry it as many times as you want — we return the original result instead of sending twice.",
  },
];

interface FaqAccordionProps {
  eyebrow?: string;
  title?: string;
  items?: { q: string; a: string }[];
  className?: string;
}

export function FaqAccordion({
  eyebrow = "07 — FAQ",
  title = "Questions, answered.",
  items = DEFAULT_FAQS,
  className,
}: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={cn("mx-auto max-w-3xl px-6 py-28", className)}>
      <p className="font-mono text-caption uppercase tracking-[0.15em] text-brand-blue">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-heading-2 text-ink">{title}</h2>

      <div className="mt-10 flex flex-col divide-y divide-hairline-soft border-y border-hairline-soft">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-body-md-medium text-ink">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="shrink-0 font-mono text-heading-3 text-steel"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={cn("overflow-hidden")}
                  >
                    <p className="pb-5 max-w-xl text-body-sm text-charcoal">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
