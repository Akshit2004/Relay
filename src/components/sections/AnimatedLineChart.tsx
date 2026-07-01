"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export const DEMO_POINTS = "0,118 60,108 120,94 180,100 240,78 300,86 360,58 420,66 480,38 540,28 600,16";

export function AnimatedLineChart({ points }: { points?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPolylineElement>(null);
  const areaRef = useRef<SVGPolygonElement>(null);
  const dotsRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      if (!points) return;
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(areaRef.current, { opacity: 0 });
      gsap.set(gsap.utils.toArray(dotsRef.current?.children ?? []), { scale: 0, transformOrigin: "center" });

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(path, { strokeDashoffset: 0 });
        gsap.set(areaRef.current, { opacity: 1 });
        gsap.set(gsap.utils.toArray(dotsRef.current?.children ?? []), { scale: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: containerRef.current, start: "top 75%", once: true },
        });
        tl.to(path, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" })
          .to(areaRef.current, { opacity: 1, duration: 0.6 }, "-=0.6")
          .to(
            gsap.utils.toArray(dotsRef.current?.children ?? []),
            { scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(2)" },
            "-=0.4"
          );
        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [points] }
  );

  if (!points) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-body-sm text-charcoal">No trend data available.</p>
        <p className="mt-1 font-mono text-caption text-steel">
          Send your first email via the API to see delivery trends here.
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      <svg viewBox="0 0 600 140" className="w-full overflow-visible" preserveAspectRatio="none">
        <polygon
          ref={areaRef}
          points={`0,140 ${points} 600,140`}
          fill="url(#chart-gradient)"
        />
        <polyline
          ref={pathRef}
          points={points}
          fill="none"
          stroke="var(--color-brand-blue)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g ref={dotsRef}>
          {points.split(" ").map((pt) => {
            const [x, y] = pt.split(",");
            return <circle key={pt} cx={x} cy={y} r="3" fill="var(--color-brand-blue)" />;
          })}
        </g>
        <defs>
          <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-blue)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-brand-blue)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
