"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { kw, str, com, prop } from "@/lib/codeTokens";

const TABS = [
  {
    id: "curl",
    label: "cURL",
    code: (
      <>
        <span className={kw}>curl</span> -X POST https://api.relay.dev/emails \{"\n"}
        {"  "}-H <span className={str}>&quot;Authorization: Bearer re_live_***&quot;</span> \{"\n"}
        {"  "}-H <span className={str}>&quot;Content-Type: application/json&quot;</span> \{"\n"}
        {"  "}-d <span className={str}>{`'{
    "from": "you@yourdomain.com",
    "to": "ada@lovelace.dev",
    "subject": "Welcome to Relay",
    "html": "<p>Hi Ada,</p>"
  }'`}</span>
      </>
    ),
  },
  {
    id: "node",
    label: "Node",
    code: (
      <>
        <span className={kw}>import</span> {"{ Relay }"} <span className={kw}>from</span>{" "}
        <span className={str}>&quot;relay-node&quot;</span>;{"\n\n"}
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes -- intentional visible "//" text, not a stray JS comment */}
        <span className={com}>// picks up RELAY_API_KEY from env</span>
        {"\n"}
        <span className={kw}>const</span> relay = <span className={kw}>new</span> Relay();{"\n\n"}
        <span className={kw}>await</span> relay.<span className={prop}>emails</span>.send({"{"}
        {"\n"}
        {"  "}from: <span className={str}>&quot;you@yourdomain.com&quot;</span>,{"\n"}
        {"  "}to: <span className={str}>&quot;ada@lovelace.dev&quot;</span>,{"\n"}
        {"  "}subject: <span className={str}>&quot;Welcome to Relay&quot;</span>,{"\n"}
        {"  "}html: <span className={str}>&quot;&lt;p&gt;Hi Ada,&lt;/p&gt;&quot;</span>,{"\n"}
        {"}"});
      </>
    ),
  },
  {
    id: "python",
    label: "Python",
    code: (
      <>
        <span className={kw}>from</span> relay <span className={kw}>import</span> Relay{"\n\n"}
        relay = Relay(){"\n\n"}
        relay.<span className={prop}>emails</span>.send({"\n"}
        {"    "}from_=<span className={str}>&quot;you@yourdomain.com&quot;</span>,{"\n"}
        {"    "}to=<span className={str}>&quot;ada@lovelace.dev&quot;</span>,{"\n"}
        {"    "}subject=<span className={str}>&quot;Welcome to Relay&quot;</span>,{"\n"}
        {"    "}html=<span className={str}>&quot;&lt;p&gt;Hi Ada,&lt;/p&gt;&quot;</span>,{"\n"}
        ){"\n"}
      </>
    ),
  },
];

export function CodeShowcase() {
  const [active, setActive] = useState(TABS[0].id);
  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-16 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        <RevealOnScroll className="flex flex-col gap-5">
          <div>
            <p className="font-mono text-caption uppercase tracking-[0.15em] text-brand-blue">
              02 — API
            </p>
            <h2 className="mt-4 text-heading-2 text-ink">One API. Any provider.</h2>
          </div>
          <p className="max-w-md text-body-md text-charcoal">
            Relay speaks SMTP under the hood, so swapping providers never means
            rewriting your integration. Bring your own credentials, or use our
            default sender and skip setup on day one.
          </p>
          <ul className="mt-2 flex flex-col gap-3 text-body-sm text-charcoal">
            <li className="flex gap-3">
              <span className="mt-0.5 font-mono text-brand-blue">01</span>
              Idempotency keys on every mutating request.
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 font-mono text-brand-blue">02</span>
              Structured JSON errors, never a bare 500.
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 font-mono text-brand-blue">03</span>
              A Request ID on every response, for every log line.
            </li>
          </ul>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="overflow-hidden rounded-lg border border-hairline bg-surface-code">
            <div className="relative flex border-b border-hairline-soft px-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "relative px-4 py-3 font-mono text-code-sm transition-colors duration-200",
                    active === tab.id ? "text-ink" : "text-steel hover:text-charcoal"
                  )}
                >
                  {tab.label}
                  {active === tab.id && (
                    <motion.div
                      layoutId="code-tab-underline"
                      className="absolute inset-x-3 -bottom-px h-px bg-brand-blue"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="relative min-h-[280px] px-5 py-5">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-pre-wrap break-all font-mono text-code-sm leading-relaxed text-charcoal"
                >
                  {activeTab.code}
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
