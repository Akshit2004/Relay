import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Chrome-header code panel shell reused across the terminal demo, tab showcase, and docs pages. */
export function CodeBlock({
  filename,
  children,
  className,
  bodyClassName,
}: {
  filename?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-hairline bg-surface-code", className)}>
      {filename && (
        <div className="flex items-center gap-1.5 border-b border-hairline-soft px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-code-sm text-steel">{filename}</span>
        </div>
      )}
      <div className={cn("px-5 py-5", bodyClassName)}>{children}</div>
    </div>
  );
}

export function CodePre({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <pre
      className={cn(
        "overflow-x-auto whitespace-pre-wrap break-all font-mono text-code-sm leading-relaxed text-charcoal",
        className
      )}
    >
      {children}
    </pre>
  );
}
