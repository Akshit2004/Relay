"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Soft ambient glow that trails the cursor within its parent bounds. Desktop only. */
export function SpotlightCursor({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(glow, "x", { duration: 0.85, ease: "power3.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.85, ease: "power3.out" });
    const opacityTo = gsap.quickTo(glow, "opacity", { duration: 0.4, ease: "power2.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      opacityTo(inside ? 1 : 0);
      if (inside) {
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        ref={glowRef}
        className="absolute h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(61,127,255,0.12) 0%, rgba(61,127,255,0.04) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}
