"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const QUOTES = [
  {
    quote:
      "We cut our transactional email integration from two days to an afternoon. The idempotency keys alone saved us from a very bad retry bug.",
    name: "Priya N.",
    role: "Backend Lead, Northbeam",
  },
  {
    quote:
      "Every other provider's logs page loads slower than our checkout flow. Relay's doesn't. The difference in developer experience is night and day.",
    name: "Marcus O.",
    role: "Founder, Halfpipe",
  },
  {
    quote:
      "I've never had to open a support ticket to figure out why an email bounced. It's just in the response payload. Absolutely incredible.",
    name: "Dee K.",
    role: "Staff Engineer, Vessel",
  },
];

function Monogram({ name }: { name: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 font-mono text-body-sm font-medium text-brand-blue ring-1 ring-brand-blue/30">
      {name.charAt(0)}
    </span>
  );
}

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter((el): el is HTMLDivElement => el !== null);
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Set initial states for cards after the first one
        gsap.set(cards.slice(1), { 
          y: "150%", 
          opacity: 0,
          scale: 0.95
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${cards.length * 100}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        cards.forEach((card, i) => {
          if (i === 0) {
            // First card just scales down and dims when second comes in
            tl.to(card, {
              scale: 0.9,
              opacity: 0.4,
              y: "-5%",
              duration: 1,
              ease: "none",
            }, 0);
          } else {
            // Calculate the start time based on index
            const startTime = i - 1;
            
            // Bring this card in
            tl.to(card, {
              y: "0%",
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power2.out",
            }, startTime);

            // If not the last card, scale it down when the next one comes
            if (i < cards.length - 1) {
              tl.to(card, {
                scale: 0.9,
                opacity: 0.4,
                y: "-5%",
                duration: 1,
                ease: "none",
              }, startTime + 1);
            }
          }
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section ref={containerRef} className="relative bg-canvas-dark border-y border-hairline-soft overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-center px-6">
        
        <div className="text-center mb-16 space-y-4 z-10">
          <p className="font-mono text-caption uppercase tracking-[0.15em] text-brand-blue">
            05 — Loved by Developers
          </p>
          <h2 className="text-heading-2 md:text-heading-1 font-semibold text-ink">
            Don&apos;t just take our word for it.
          </h2>
        </div>

        <div className="relative w-full max-w-2xl h-[380px] sm:h-[300px] perspective-1000 z-20">
          {QUOTES.map((item, i) => (
            <div
              key={item.name}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-surface p-8 sm:p-10 border border-hairline shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md origin-top"
              style={{ zIndex: i + 1 }}
            >
              <blockquote className="text-heading-4 sm:text-heading-3 leading-relaxed text-ink font-medium">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              
              <div className="mt-8 pt-6 border-t border-hairline-soft flex items-center justify-between">
                <figcaption className="flex items-center gap-4">
                  <Monogram name={item.name} />
                  <div className="text-body-sm">
                    <p className="text-ink font-medium">{item.name}</p>
                    <p className="text-steel">{item.role}</p>
                  </div>
                </figcaption>
                {/* Decorative dots to emphasize IDE/terminal feel */}
                <div className="hidden sm:flex gap-1.5 opacity-30">
                  <div className="w-2 h-2 rounded-full bg-brand-error" />
                  <div className="w-2 h-2 rounded-full bg-brand-warn" />
                  <div className="w-2 h-2 rounded-full bg-brand-success" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
