import type { Metadata } from "next";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { LogsTable } from "@/components/dashboard/LogsTable";

export const metadata: Metadata = { title: "Logs — Relay Dashboard" };

export default function LogsPage() {
  return (
    <>
      <DashboardPageHeader
        title="Logs"
        description="Every request, searchable by status. Click a row for the full response."
      />
      <LogsTable logs={[]} />
    </>
  );
}
