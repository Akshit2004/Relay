"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function FloatingChip({
  children,
  className,
  duration = 4,
  distance = 10,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(ref.current, {
          y: distance,
          duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        return () => tween.kill();
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [duration, distance] }
  );

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 rounded-full border border-hairline bg-surface/90 px-3.5 py-2 font-mono text-code-sm text-charcoal shadow-[0_4px_16px_rgba(0,0,0,0.24)] backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
