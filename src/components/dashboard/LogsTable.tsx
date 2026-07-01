"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatusBadge } from "@/components/ui/Badge";
import { CodePre } from "@/components/ui/CodeBlock";
import { cn } from "@/lib/utils";
import type { LogEntry } from "@/lib/dashboard/types";

const FILTERS: { label: string; value: LogEntry["status"] | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Delivered", value: "delivered" },
  { label: "Bounced", value: "bounced" },
  { label: "Failed", value: "failed" },
];

export function LogsTable({ logs }: { logs: LogEntry[] }) {
  const [filter, setFilter] = useState<LogEntry["status"] | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === "all" ? logs : logs.filter((log) => log.status === filter);

  return (
    <div>
      <div className="mb-5 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-caption transition-colors duration-200",
              filter === f.value
                ? "border-brand-blue bg-brand-blue-soft text-brand-blue"
                : "border-hairline text-slate hover:text-ink"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-hairline">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <p className="text-body-sm text-charcoal">
              {filter === "all" ? "No logs yet." : `No ${filter} logs found.`}
            </p>
            <p className="mt-1 font-mono text-caption text-steel">
              {filter === "all"
                ? "Send your first email via the API to see delivery logs here."
                : "Try changing the filter above."}
            </p>
          </div>
        ) : (
        filtered.map((log) => {
          const expanded = expandedId === log.id;
          return (
            <div key={log.id} className="border-b border-hairline-soft last:border-0">
              <button
                onClick={() => setExpandedId(expanded ? null : log.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors hover:bg-surface-soft"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-body-sm text-ink">{log.subject}</p>
                  <p className="truncate font-mono text-caption text-steel">
                    {log.id} · {log.to}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="font-mono text-caption text-steel">{log.latencyMs}ms</span>
                  <StatusBadge status={log.status} />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden bg-canvas-dark/40"
                  >
                    <div className="px-5 py-4">
                      <CodePre>{JSON.stringify(log.response, null, 2)}</CodePre>
                      <p className="mt-2 font-mono text-caption text-steel">
                        {new Date(log.timestamp).toLocaleString()} · {log.provider}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })
        )}
      </div>
    </div>
  );
}
