"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { StatusBadge } from "@/components/ui/Badge";

function Tile({
  className,
  eyebrow,
  title,
  body,
  children,
}: {
  className?: string;
  eyebrow: string;
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      whileHover="hover"
      className={cn(
        "group flex flex-col justify-between rounded-lg border border-hairline bg-surface p-6 transition-colors duration-300 hover:border-brand-blue/40",
        className
      )}
    >
      <div>
        <motion.span
          variants={{ hover: { x: 3 } }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="inline-block font-mono text-caption text-brand-blue"
        >
          {eyebrow}
        </motion.span>
        <h3 className="mt-3 text-heading-3 text-ink">{title}</h3>
        <p className="mt-2 max-w-sm text-body-sm text-charcoal">{body}</p>
      </div>
      {children && <div className="mt-6">{children}</div>}
    </motion.div>
  );
}

export function FeatureBento() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <div className="mb-14">
        <p className="font-mono text-caption uppercase tracking-[0.15em] text-brand-blue">
          03 — Platform
        </p>
        <h2 className="mt-4 max-w-xl text-heading-2 text-ink">
          Everything past &quot;send&quot; is handled.
        </h2>
      </div>

      <RevealOnScroll className="grid auto-rows-[minmax(0,auto)] grid-cols-1 gap-4 md:grid-cols-6">
        <Tile
          className="md:col-span-4 md:row-span-2"
          eyebrow="LOGS & ANALYTICS"
          title="Every request, accounted for"
          body="A Request ID, a status, and a latency number the moment it happens — searchable, not buried in a CSV export."
        >
          <div className="flex flex-col gap-2 rounded-md border border-hairline-soft bg-canvas-dark/60 p-3 font-mono text-code-sm">
            <div className="flex items-center justify-between text-charcoal">
              <span className="text-steel">req_9f21ab</span>
              <span className="flex items-center gap-3">
                12ms <StatusBadge status="delivered" />
              </span>
            </div>
            <div className="flex items-center justify-between text-charcoal">
              <span className="text-steel">req_3ac410</span>
              <span className="flex items-center gap-3">
                19ms <StatusBadge status="bounced" />
              </span>
            </div>
            <div className="flex items-center justify-between text-charcoal">
              <span className="text-steel">req_7b90e2</span>
              <span className="flex items-center gap-3">
                211ms <StatusBadge status="failed" />
              </span>
            </div>
          </div>
        </Tile>

        <Tile
          className="md:col-span-2"
          eyebrow="TEMPLATES"
          title="Versioned templates"
          body="Interpolated variables, live previews, and a history of every edit before you ship."
        >
          <code className="block rounded-md border border-hairline-soft bg-canvas-dark/60 px-3 py-2 font-mono text-code-sm text-charcoal">
            Hello <span className="text-brand-blue">{"{{name}}"}</span>,
          </code>
        </Tile>

        <Tile
          className="md:col-span-2"
          eyebrow="WEBHOOKS"
          title="Real-time events"
          body="Signed payloads the instant something changes — with automatic retry on failure."
        >
          <div className="flex flex-wrap gap-2">
            {["delivered", "opened", "clicked", "bounced"].map((event) => (
              <span
                key={event}
                className="rounded-xs border border-hairline-soft px-2 py-1 font-mono text-code-sm text-slate"
              >
                {event}
              </span>
            ))}
          </div>
        </Tile>

        <Tile
          className="md:col-span-2"
          eyebrow="SDKS"
          title="Native clients"
          body="First-class libraries for JavaScript, TypeScript, Node, and Python."
        >
          <div className="flex gap-2">
            {["JS", "TS", "PY"].map((lang) => (
              <span
                key={lang}
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-hairline-soft font-mono text-code-sm text-charcoal"
              >
                {lang}
              </span>
            ))}
          </div>
        </Tile>

        <Tile
          className="md:col-span-2"
          eyebrow="RATE LIMITING"
          title="Burst protection"
          body="Redis-backed limits guard your account automatically — no config required."
        />

        <Tile
          className="md:col-span-2"
          eyebrow="IDEMPOTENCY"
          title="Retry with confidence"
          body="Pass an idempotency key and retry freely. We collapse duplicates, never double-send."
        />
      </RevealOnScroll>
    </section>
  );
}
