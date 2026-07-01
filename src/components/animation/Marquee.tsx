"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: ReactNode[];
  speed?: number;
  className?: string;
  itemClassName?: string;
}

/** Infinite horizontal scroll of `items`, duplicated once for a seamless loop. */
export function Marquee({ items, speed = 60, className, itemClassName }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;
      const track = trackRef.current;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const width = track.scrollWidth / 2;
        const tween = gsap.fromTo(
          track,
          { x: 0 },
          { x: -width, duration: width / speed, ease: "none", repeat: -1 }
        );
        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: trackRef, dependencies: [items.length, speed] }
  );

  return (
    <div
      className={cn("overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]", className)}
    >
      <div ref={trackRef} className="flex w-max items-center">
        {[0, 1].map((pass) =>
          items.map((item, i) => (
            <div key={`${pass}-${i}`} className={itemClassName}>
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
