"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function CountUp({ to, prefix = "", suffix = "", decimals = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current;
      const format = (n: number) =>
        `${prefix}${n.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.textContent = format(to);
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const proxy = { value: 0 };
        el.textContent = format(0);
        const tween = gsap.to(proxy, {
          value: to,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = format(proxy.value);
          },
        });
        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [to, prefix, suffix, decimals] }
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
