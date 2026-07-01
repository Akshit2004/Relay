import type { ReactNode } from "react";

export function DashboardPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-hairline-soft pb-6">
      <div>
        <h1 className="text-heading-2 text-ink">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-body-sm text-charcoal">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
