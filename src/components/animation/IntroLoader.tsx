"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { gsap, SplitText } from "@/lib/gsap";

const SEEN_KEY = "relay-intro-seen";

/** One-time wordmark reveal + curtain wipe, shown once per browser tab session. */
export function IntroLoader() {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    if (sessionStorage.getItem(SEEN_KEY)) return;
    sessionStorage.setItem(SEEN_KEY, "1");
    document.documentElement.style.overflow = "hidden";
    // Reading sessionStorage (an external system) to decide a one-time,
    // client-only reveal; there is no render-time equivalent since this
    // must stay false during SSR to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
  }, [reduceMotion]);

  useGSAP(
    () => {
      if (!show || !rootRef.current || !wordRef.current) return;

      const split = new SplitText(wordRef.current, { type: "chars" });
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.documentElement.style.overflow = "";
          setShow(false);
        },
      });

      tl.set(split.chars, { yPercent: 120, opacity: 0 })
        .to(split.chars, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.04 })
        .to(wordRef.current, { opacity: 0, duration: 0.3 }, "+=0.35")
        .to(rootRef.current, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "-=0.1");

      return () => {
        tl.kill();
        split.revert();
      };
    },
    { scope: rootRef, dependencies: [show] }
  );

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas-dark"
    >
      <div ref={wordRef} className="font-mono text-2xl tracking-tight text-ink">
        relay
      </div>
    </div>
  );
}
