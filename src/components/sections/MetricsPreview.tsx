import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { CountUp } from "@/components/animation/CountUp";
import { StatusBadge } from "@/components/ui/Badge";
import { AnimatedLineChart, DEMO_POINTS } from "@/components/sections/AnimatedLineChart";

const LOG_ROWS: { id: string; time: string; status: "delivered" | "bounced" | "failed" }[] = [
  { id: "req_9f21ab4c", time: "14:02:11", status: "delivered" },
  { id: "req_3ac410e9", time: "14:02:09", status: "delivered" },
  { id: "req_7b90e2f1", time: "14:02:04", status: "bounced" },
  { id: "req_1de88a02", time: "14:01:57", status: "delivered" },
  { id: "req_66caa930", time: "14:01:51", status: "failed" },
];

export function MetricsPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <div className="mb-14 max-w-xl">
        <p className="font-mono text-caption uppercase tracking-[0.15em] text-brand-blue">
          04 — Visibility
        </p>
        <h2 className="mt-4 text-heading-2 text-ink">
          Know what happened, not just that it did.
        </h2>
        <p className="mt-4 text-body-md text-charcoal">
          The dashboard shows delivery health at a glance and lets you drop into
          any single request in two clicks.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-hairline bg-surface shadow-[0_4px_32px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-1.5 border-b border-hairline-soft px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-code-sm text-steel">dashboard.relay.dev/logs</span>
        </div>

        <div className="grid md:grid-cols-[64px_1fr]">
          <div className="hidden flex-col items-center gap-4 border-r border-hairline-soft py-6 md:flex">
            <span className="h-2 w-2 rounded-full bg-brand-blue" />
            <span className="h-2 w-2 rounded-sm bg-steel/50" />
            <span className="h-2 w-2 rounded-sm bg-steel/50" />
            <span className="h-2 w-2 rounded-sm bg-steel/50" />
          </div>

          <div className="p-6 md:p-8">
            <RevealOnScroll className="grid grid-cols-3 gap-4">
              <div className="rounded-md border border-hairline-soft p-4">
                <p className="font-mono text-caption text-steel">SENT (24H)</p>
                <CountUp to={128402} className="mt-1 block text-heading-3 text-ink" />
              </div>
              <div className="rounded-md border border-hairline-soft p-4">
                <p className="font-mono text-caption text-steel">DELIVERY RATE</p>
                <CountUp to={98.4} decimals={1} suffix="%" className="mt-1 block text-heading-3 text-brand-success" />
              </div>
              <div className="rounded-md border border-hairline-soft p-4">
                <p className="font-mono text-caption text-steel">P50 LATENCY</p>
                <CountUp to={21} suffix="ms" className="mt-1 block text-heading-3 text-ink" />
              </div>
            </RevealOnScroll>

            <div className="mt-8">
              <AnimatedLineChart points={DEMO_POINTS} />
            </div>

            <RevealOnScroll className="mt-8 flex flex-col divide-y divide-hairline-soft border-t border-hairline-soft">
              {LOG_ROWS.map((row) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between py-3 font-mono text-code-sm"
                >
                  <span className="text-charcoal">{row.id}</span>
                  <span className="hidden text-steel sm:inline">{row.time}</span>
                  <StatusBadge status={row.status} />
                </div>
              ))}
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
