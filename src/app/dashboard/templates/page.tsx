import type { Metadata } from "next";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

export const metadata: Metadata = { title: "Templates — Relay Dashboard" };

export default function TemplatesPage() {
  return (
    <>
      <DashboardPageHeader
        title="Templates"
        description="Versioned HTML templates with variable interpolation."
      />

      <div className="flex flex-col items-center justify-center rounded-lg border border-hairline px-6 py-16 text-center">
        <p className="text-body-sm text-charcoal">No templates yet.</p>
        <p className="mt-1 font-mono text-caption text-steel">
          Template management is coming soon.
        </p>
      </div>
    </>
  );
}
