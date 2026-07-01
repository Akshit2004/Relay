import type { Metadata } from "next";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { AnimatedLineChart } from "@/components/sections/AnimatedLineChart";

export const metadata: Metadata = { title: "Overview — Relay Dashboard" };

export default function DashboardOverviewPage() {
  return (
    <>
      <DashboardPageHeader title="Overview" description="Delivery health at a glance." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Sent (24h)", value: "0" },
          { label: "Delivered", value: "0", color: "text-brand-success" },
          { label: "Bounced", value: "0", color: "text-brand-warn" },
          { label: "Open rate", value: "—" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-lg border border-hairline bg-surface p-5">
            <p className="font-mono text-caption uppercase tracking-[0.1em] text-steel">{label}</p>
            <p className={`mt-1 text-heading-3 ${color ?? "text-ink"}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-hairline bg-surface p-6">
        <p className="font-mono text-caption uppercase tracking-[0.1em] text-steel">Delivery trend</p>
        <div className="mt-4">
          <AnimatedLineChart />
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-hairline bg-surface">
        <p className="border-b border-hairline-soft px-6 py-4 font-mono text-caption uppercase tracking-[0.1em] text-steel">
          Recent activity
        </p>
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <p className="text-body-sm text-charcoal">No activity yet.</p>
          <p className="mt-1 font-mono text-caption text-steel">
            Send your first email via the API to see delivery logs here.
          </p>
        </div>
      </div>
    </>
  );
}
