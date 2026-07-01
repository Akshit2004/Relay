"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Slow, restrained radar-style ping — a nod to "relaying a signal". */
export function SignalPing({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rings = gsap.utils.toArray<SVGCircleElement>(".signal-ping-ring");
        const tween = gsap.fromTo(
          rings,
          { scale: 0.4, opacity: 0.5, transformOrigin: "center" },
          {
            scale: 1,
            opacity: 0,
            duration: 3.2,
            ease: "power1.out",
            repeat: -1,
            stagger: 1.05,
          }
        );
        return () => tween.kill();
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      className={cn("h-64 w-64 opacity-70", className)}
      aria-hidden
    >
      <circle cx="100" cy="100" r="3" fill="var(--color-brand-blue)" />
      {[1, 2, 3].map((i) => (
        <circle
          key={i}
          className="signal-ping-ring"
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="var(--color-brand-blue)"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
