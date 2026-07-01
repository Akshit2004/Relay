"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { StatusBadge } from "@/components/ui/Badge";

/**
 * Left-side brand panel for the auth split-screen.
 *
 * Shows a real code editor with a GSAP typing animation of the Relay SDK,
 * followed by a terminal response that fades in. No fake stats, no fake
 * testimonials — just the product in action.
 */
export function AuthBrandPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLSpanElement>(null);

  const COMMAND = `curl -X POST api.relay.dev/emails \\
  -H "Authorization: Bearer re_live_***" \\
  -d '{"to":"you@dev.io","subject":"Verify"}'`;

  useGSAP(
    () => {
      if (!commandRef.current || !responseRef.current || !cursorRef.current) return;

      const mm = gsap.matchMedia();

      // Reduced-motion: just show everything instantly
      mm.add("(prefers-reduced-motion: reduce)", () => {
        commandRef.current!.textContent = COMMAND;
        gsap.set(responseRef.current, { opacity: 1, y: 0 });
        gsap.set(cursorRef.current, { opacity: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const proxy = { chars: 0 };
        gsap.set(responseRef.current, { opacity: 0, y: 8 });
        gsap.set(commandRef.current, { opacity: 1 });

        const tl = gsap.timeline({ delay: 0.8, repeat: -1, repeatDelay: 4.5 });

        // Type out the command
        tl.to(proxy, {
          chars: COMMAND.length,
          duration: 2,
          ease: "steps(" + COMMAND.length + ")",
          onUpdate: () => {
            commandRef.current!.textContent = COMMAND.slice(0, Math.floor(proxy.chars));
          },
        })
          // Hide cursor, reveal response
          .to(cursorRef.current, { opacity: 0, duration: 0.1 }, "+=0.15")
          .to(responseRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.05")
          // Hold
          .to({}, { duration: 3 })
          // Fade everything, reset
          .to([commandRef.current, responseRef.current], { opacity: 0, duration: 0.35 })
          .set(proxy, { chars: 0 })
          .set(cursorRef.current, { opacity: 1 })
          .set(responseRef.current, { y: 8 });

        return () => tl.kill();
      });

      // Stagger-in the surrounding elements
      const elements = gsap.utils.toArray<HTMLElement>(".auth-panel-in", panelRef.current!);
      if (elements.length > 0) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 0.15 }
        );
      }

      return () => mm.revert();
    },
    { scope: panelRef }
  );

  return (
    <div
      ref={panelRef}
      className="relative flex h-full flex-col justify-between overflow-hidden border-r border-hairline bg-surface-code"
    >
      {/* Very subtle accent light — NOT a glow blob, just a directional wash */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[600px] -translate-x-1/2"
        style={{
          background: "linear-gradient(180deg, rgba(61,127,255,0.05) 0%, transparent 100%)",
        }}
      />

      {/* Top: Logo */}
      <div className="auth-panel-in relative z-10 flex items-center gap-2.5 px-8 pt-8">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-blue font-mono text-xs font-semibold text-on-brand">
          R
        </span>
        <span className="text-body-sm font-semibold tracking-tight text-ink">relay</span>
      </div>

      {/* Center: Code editor + terminal response */}
      <div className="relative z-10 flex flex-col gap-5 px-8">
        {/* Editor heading */}
        <div className="auth-panel-in">
          <p className="font-mono text-caption uppercase tracking-[0.15em] text-steel">
            Send your first email
          </p>
        </div>

        {/* Code block with typing animation */}
        <div className="auth-panel-in">
          <CodeBlock filename="terminal">
            <pre className="min-h-[80px] whitespace-pre-wrap break-all font-mono text-code-sm leading-relaxed text-charcoal">
              <span className="text-brand-blue">$ </span>
              <span ref={commandRef} />
              <span
                ref={cursorRef}
                className="ml-px inline-block h-[14px] w-[7px] translate-y-[2px] animate-pulse bg-brand-blue/70"
              />
            </pre>

            {/* Response */}
            <div ref={responseRef} className="mt-4 border-t border-hairline-soft pt-4">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="font-mono text-code-sm text-steel">HTTP/1.1 · 202 Accepted</span>
                <StatusBadge status="delivered" />
              </div>
              <pre className="font-mono text-code-sm leading-relaxed text-charcoal">{`{
  "id": "msg_8f2a1c",
  "status": "queued",
  "latency_ms": 24
}`}</pre>
            </div>
          </CodeBlock>
        </div>

        {/* Three concrete facts — not vanity metrics */}
        <div className="auth-panel-in flex gap-6 px-1">
          {[
            { mono: "3 lines", label: "to send an email" },
            { mono: "24ms", label: "average response" },
            { mono: "0", label: "config files needed" },
          ].map(({ mono, label }) => (
            <div key={label}>
              <p className="font-mono text-body-sm font-medium text-ink">{mono}</p>
              <p className="font-mono text-caption text-steel">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Quiet confidence line */}
      <div className="auth-panel-in relative z-10 px-8 pb-8">
        <div className="border-t border-hairline pt-6">
          <p className="text-body-sm leading-relaxed text-charcoal">
            One API key. One endpoint. Works with any framework.
            <br />
            <span className="text-steel">Free tier — no credit card required.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
