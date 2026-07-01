"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DocsPageHeader } from "@/components/docs/DocsPageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { cn } from "@/lib/utils";
import { kw, str } from "@/lib/codeTokens";

const SDKS = [
  {
    id: "node",
    label: "Node.js / TypeScript",
    install: "npm install relay-node",
    usage: (
      <>
        <span className={kw}>import</span> {"{ Relay }"} <span className={kw}>from</span>{" "}
        <span className={str}>&quot;relay-node&quot;</span>;{"\n\n"}
        <span className={kw}>const</span> relay = <span className={kw}>new</span> Relay();{"\n\n"}
        <span className={kw}>await</span> relay.emails.send({"{"}
        {"\n"}
        {"  "}to: <span className={str}>&quot;ada@lovelace.dev&quot;</span>,{"\n"}
        {"  "}subject: <span className={str}>&quot;Welcome&quot;</span>,{"\n"}
        {"  "}html: <span className={str}>&quot;&lt;p&gt;Hi Ada&lt;/p&gt;&quot;</span>,{"\n"}
        {"}"});
      </>
    ),
  },
  {
    id: "python",
    label: "Python",
    install: "pip install relay-python",
    usage: (
      <>
        <span className={kw}>from</span> relay <span className={kw}>import</span> Relay{"\n\n"}
        relay = Relay(){"\n\n"}
        relay.emails.send({"\n"}
        {"    "}to=<span className={str}>&quot;ada@lovelace.dev&quot;</span>,{"\n"}
        {"    "}subject=<span className={str}>&quot;Welcome&quot;</span>,{"\n"}
        {"    "}html=<span className={str}>&quot;&lt;p&gt;Hi Ada&lt;/p&gt;&quot;</span>,{"\n"}
        ){"\n"}
      </>
    ),
  },
];

export default function SdksPage() {
  const [active, setActive] = useState(SDKS[0].id);
  const activeSdk = SDKS.find((s) => s.id === active)!;

  return (
    <>
      <DocsPageHeader
        title="SDKs"
        description="Every SDK is a thin wrapper over the same REST API — nothing you can do in a client you can't also do with a raw HTTP call."
      />

      <div className="flex gap-2 border-b border-hairline-soft">
        {SDKS.map((sdk) => (
          <button
            key={sdk.id}
            onClick={() => setActive(sdk.id)}
            className={cn(
              "px-4 py-3 font-mono text-code-sm transition-colors duration-200",
              active === sdk.id ? "border-b-2 border-brand-blue text-ink" : "text-steel hover:text-charcoal"
            )}
          >
            {sdk.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <div>
          <p className="mb-2 font-mono text-caption uppercase tracking-[0.08em] text-steel">Install</p>
          <CodeBlock>
            <pre className="font-mono text-code-sm text-charcoal">{activeSdk.install}</pre>
          </CodeBlock>
        </div>
        <div>
          <p className="mb-2 font-mono text-caption uppercase tracking-[0.08em] text-steel">Usage</p>
          <CodeBlock>
            <AnimatePresence mode="wait">
              <motion.pre
                key={activeSdk.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="whitespace-pre-wrap break-all font-mono text-code-sm leading-relaxed text-charcoal"
              >
                {activeSdk.usage}
              </motion.pre>
            </AnimatePresence>
          </CodeBlock>
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-body-sm text-charcoal">
        All four languages from the original SDK announcement — JavaScript, TypeScript,
        Node.js, and Python — are covered by these two packages: `relay-node` ships type
        definitions, so it&apos;s the same install for JavaScript and TypeScript projects.
      </p>
    </>
  );
}
