import type { Metadata } from "next";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export const metadata: Metadata = { title: "Settings — Relay Dashboard" };

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <>
      <DashboardPageHeader title="Settings" description="Your account and sending configuration." />

      <div className="flex flex-col gap-6">
        <div className="rounded-lg border border-hairline bg-surface p-6">
          <p className="font-mono text-caption uppercase tracking-[0.08em] text-steel">Account</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-caption text-steel">Name</p>
              <p className="mt-1 text-body-sm text-ink">{user?.name}</p>
            </div>
            <div>
              <p className="text-caption text-steel">Email</p>
              <p className="mt-1 font-mono text-body-sm text-ink">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-hairline bg-surface p-6 opacity-70">
          <div className="flex items-center justify-between">
            <p className="font-mono text-caption uppercase tracking-[0.08em] text-steel">
              Sender configuration
            </p>
            <span className="rounded-xs border border-hairline-soft px-2 py-0.5 font-mono text-code-sm text-steel">
              Coming soon
            </span>
          </div>
          <p className="mt-3 max-w-lg text-body-sm text-charcoal">
            Link your own SMTP credentials, or keep using Relay&apos;s default sender. This
            isn&apos;t wired up yet — sending currently requires the pipeline described in{" "}
            <span className="text-ink">03_PLAN.md</span>.
          </p>
          <div className="mt-4 grid gap-4 opacity-60 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-body-sm text-charcoal">
              SMTP host
              <input
                disabled
                placeholder="smtp.yourdomain.com"
                className="rounded-md border border-hairline bg-canvas-dark px-4 py-2.5 text-ink outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-body-sm text-charcoal">
              From address
              <input
                disabled
                placeholder="you@yourdomain.com"
                className="rounded-md border border-hairline bg-canvas-dark px-4 py-2.5 text-ink outline-none"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
