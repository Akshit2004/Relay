"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  start?: string;
}

/** Fades + rises the direct children in as the container enters the viewport. */
export function RevealOnScroll({
  children,
  className,
  y = 28,
  stagger = 0.08,
  start = "top 82%",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = gsap.utils.toArray<HTMLElement>(ref.current.children);
      if (targets.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(targets, { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(targets, { opacity: 0, y });
        const tween = gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: ref.current, start },
        });
        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [y, stagger, start] }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
