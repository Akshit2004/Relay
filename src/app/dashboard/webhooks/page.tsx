import type { Metadata } from "next";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

export const metadata: Metadata = { title: "Webhooks — Relay Dashboard" };

export default function WebhooksPage() {
  return (
    <>
      <DashboardPageHeader
        title="Webhooks"
        description="Registered endpoints and recent delivery attempts."
      />

      {/* Endpoints */}
      <div className="mb-6 overflow-x-auto rounded-lg border border-hairline">
        <table className="w-full min-w-[560px] border-collapse text-body-sm">
          <thead>
            <tr className="border-b border-hairline-soft bg-surface-soft text-left text-steel">
              <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em]">Endpoint</th>
              <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em]">Events</th>
              <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em]">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} className="px-5 py-12 text-center">
                <p className="text-body-sm text-charcoal">No webhook endpoints configured.</p>
                <p className="mt-1 font-mono text-caption text-steel">
                  Webhook management is coming soon.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Recent deliveries */}
      <h2 className="mb-3 text-heading-3 text-ink">Recent deliveries</h2>
      <div className="overflow-hidden rounded-lg border border-hairline">
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <p className="text-body-sm text-charcoal">No deliveries yet.</p>
          <p className="mt-1 font-mono text-caption text-steel">
            Configure a webhook endpoint above to start receiving event notifications.
          </p>
        </div>
      </div>
    </>
  );
}
