"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

interface SplitRevealProps {
  children: string;
  as?: Tag;
  className?: string;
  type?: "chars" | "words";
  delay?: number;
  scrollTrigger?: boolean;
}

export function SplitReveal({
  children,
  as: Tag = "span",
  className,
  type = "words",
  delay = 0,
  scrollTrigger = false,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(ref.current, { opacity: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = new SplitText(ref.current, {
          type: type === "chars" ? "chars" : "words",
        });
        const targets = type === "chars" ? split.chars : split.words;

        gsap.set(targets, { opacity: 0, yPercent: 100 });
        const tween = gsap.to(targets, {
          opacity: 1,
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: { each: type === "chars" ? 0.02 : 0.07, from: "start" },
          delay,
          scrollTrigger: scrollTrigger
            ? { trigger: ref.current, start: "top 80%" }
            : undefined,
        });

        return () => {
          tween.kill();
          split.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [children, type, delay, scrollTrigger] }
  );

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
