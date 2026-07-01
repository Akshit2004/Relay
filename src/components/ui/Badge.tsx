import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-1.5 text-caption text-slate",
        className
      )}
    >
      {children}
    </span>
  );
}

type Status = "delivered" | "bounced" | "failed";

const statusStyles: Record<Status, string> = {
  delivered: "bg-brand-success/15 text-brand-success",
  bounced: "bg-brand-warn/15 text-brand-warn",
  failed: "bg-brand-error/15 text-brand-error",
};

const statusLabels: Record<Status, string> = {
  delivered: "Delivered",
  bounced: "Bounced",
  failed: "Failed",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs px-2 py-0.5 font-mono text-code-sm",
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
