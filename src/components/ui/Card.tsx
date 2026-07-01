import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-hairline bg-surface p-6 transition-colors duration-300",
        hover && "hover:border-brand-blue/50",
        className
      )}
    >
      {children}
    </div>
  );
}
