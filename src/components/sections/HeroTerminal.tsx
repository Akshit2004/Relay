"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { StatusBadge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";

const COMMAND = `curl -X POST api.relay.dev/emails \\
  -H "Authorization: Bearer re_live_***" \\
  -d '{"to":"ada@lovelace.dev","subject":"Welcome"}'`;

export function HeroTerminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLSpanElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!commandRef.current || !responseRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        commandRef.current!.textContent = COMMAND;
        gsap.set(responseRef.current, { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const proxy = { chars: 0 };
        gsap.set(responseRef.current, { opacity: 0, y: 12 });
        gsap.set(commandRef.current, { opacity: 1 });

        const tl = gsap.timeline({ delay: 0.5, repeat: -1, repeatDelay: 3 });

        tl.to(proxy, {
          chars: COMMAND.length,
          duration: 1.4,
          ease: "none",
          onUpdate: () => {
            commandRef.current!.textContent = COMMAND.slice(0, Math.floor(proxy.chars));
          },
        })
          .to(responseRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "+=0.2")
          .to({}, { duration: 2.2 })
          .to([commandRef.current, responseRef.current], { opacity: 0, duration: 0.3 })
          .set(proxy, { chars: 0 });

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full max-w-lg">
      <CodeBlock filename="send-email.sh" className="shadow-[0_4px_24px_rgba(0,0,0,0.28)]">
        <pre className="min-h-[72px] whitespace-pre-wrap break-all font-mono text-code-sm leading-relaxed text-charcoal">
          <span className="text-brand-blue">$ </span>
          <span ref={commandRef} />
          <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-brand-blue/70 align-middle" />
        </pre>

        <div ref={responseRef} className="mt-4 border-t border-hairline-soft pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-code-sm text-steel">Response · 202</span>
            <StatusBadge status="delivered" />
          </div>
          <pre className="font-mono text-code-sm leading-relaxed text-charcoal">{`{
  "id": "msg_8f2a1c",
  "status": "delivered",
  "latency_ms": 24
}`}</pre>
        </div>
      </CodeBlock>
    </div>
  );
}
