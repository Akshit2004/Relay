import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Status — Relay",
  description: "Live status for every Relay subsystem.",
};

const COMPONENTS = [
  { name: "Emails API", uptime: "99.98%" },
  { name: "Dashboard", uptime: "99.99%" },
  { name: "Webhook delivery", uptime: "99.94%" },
  { name: "Default SMTP relay", uptime: "99.97%" },
];

const DEGRADED_DAYS = new Set([14, 52]);

const INCIDENTS = [
  {
    date: "2026-05-18",
    title: "Delayed webhook delivery",
    body: "A queue backlog delayed webhook delivery by up to 6 minutes for roughly 40 minutes. No events were lost; all were delivered once the backlog cleared.",
  },
  {
    date: "2026-04-06",
    title: "Elevated API latency",
    body: "A downstream DNS provider issue increased P99 latency to ~600ms for 12 minutes. Sends continued to succeed throughout.",
  },
];

export default function StatusPage() {
  return (
    <>
      <PageHero
        eyebrow="Status"
        title="All systems operational"
        subtitle="Live status for every Relay subsystem, checked every 60 seconds."
      />

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="flex items-center gap-3 rounded-lg border border-hairline bg-surface p-5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-success/60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-success" />
          </span>
          <p className="text-body-md-medium text-ink">All systems operational</p>
          <span className="ml-auto font-mono text-caption text-steel">Updated just now</span>
        </div>

        <RevealOnScroll className="mt-6 flex flex-col divide-y divide-hairline-soft rounded-lg border border-hairline">
          {COMPONENTS.map((c) => (
            <div key={c.name} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-brand-success" />
                <span className="text-body-sm text-ink">{c.name}</span>
              </div>
              <span className="font-mono text-caption text-steel">{c.uptime} / 90d</span>
            </div>
          ))}
        </RevealOnScroll>

        <div className="mt-10">
          <p className="mb-3 font-mono text-caption uppercase tracking-[0.1em] text-steel">
            90-day uptime
          </p>
          <div className="flex h-10 items-end gap-[3px]">
            {Array.from({ length: 90 }, (_, i) => (
              <div
                key={i}
                title={DEGRADED_DAYS.has(i) ? "Degraded performance" : "Operational"}
                className={cn(
                  "h-full flex-1 rounded-xs",
                  DEGRADED_DAYS.has(i) ? "bg-brand-warn/70" : "bg-brand-success/70"
                )}
              />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-heading-3 text-ink">Incident history</h2>
          <div className="mt-5 flex flex-col gap-6">
            {INCIDENTS.map((incident) => (
              <div key={incident.date} className="rounded-lg border border-hairline-soft p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-caption text-steel">{incident.date}</span>
                  <span className="rounded-xs bg-brand-success/10 px-2 py-0.5 font-mono text-code-sm text-brand-success">
                    Resolved
                  </span>
                </div>
                <h3 className="mt-2 text-body-md-medium text-ink">{incident.title}</h3>
                <p className="mt-1 text-body-sm text-charcoal">{incident.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
