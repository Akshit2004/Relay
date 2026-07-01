"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { SpotlightCursor } from "@/components/animation/SpotlightCursor";
import { HeroTerminal } from "@/components/sections/HeroTerminal";
import { FloatingChip } from "@/components/sections/FloatingChip";
import { SignalPing } from "@/components/sections/SignalPing";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
      <SpotlightCursor />
      <SignalPing className="pointer-events-none absolute -right-24 top-24 hidden md:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-success/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-success" />
              </span>
              All systems operational
            </Badge>
          </motion.div>

          <SplitReveal
            as="h1"
            type="words"
            delay={0.15}
            className="mt-6 text-[40px] font-semibold leading-[1.08] tracking-tight text-ink md:text-hero-display"
          >
            The easiest infrastructure API
          </SplitReveal>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 max-w-lg text-body-md text-charcoal"
          >
            One endpoint for transactional email. Send it, track it, debug it —
            without wiring together three dashboards to find out why it bounced.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button variant="primary" href="#">
              Get your API key
            </Button>
            <Button variant="secondary" href="/docs">
              Read the docs
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-5 font-mono text-caption text-steel"
          >
            No credit card. 3,000 emails/mo free.
          </motion.p>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <FloatingChip className="absolute -left-4 -top-6 z-10 hidden lg:flex" duration={4.5} distance={12}>
            <span className="text-brand-success">202</span> Accepted
          </FloatingChip>
          <FloatingChip
            className="absolute -bottom-7 -right-2 z-10 hidden lg:flex"
            duration={5.2}
            distance={-10}
          >
            24ms <span className="text-steel">p50 latency</span>
          </FloatingChip>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
