import type { Metadata } from "next";
import Link from "next/link";
import { DocsPageHeader } from "@/components/docs/DocsPageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { kw, str } from "@/lib/codeTokens";

export const metadata: Metadata = {
  title: "Quickstart — Relay Docs",
  description: "Send your first email with Relay in under five minutes.",
};

export default function DocsQuickstartPage() {
  return (
    <>
      <DocsPageHeader
        title="Quickstart"
        description="Four steps from zero to a delivered email. No dashboard archaeology required."
      />

      <div className="flex flex-col gap-12">
        <div>
          <h2 className="text-heading-3 text-ink">1. Install the SDK</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            Optional — every SDK just wraps the REST API below, so a plain HTTP client
            works too. For Node:
          </p>
          <CodeBlock filename="terminal" className="mt-4">
            <pre className="font-mono text-code-sm text-charcoal">npm install relay-node</pre>
          </CodeBlock>
        </div>

        <div>
          <h2 className="text-heading-3 text-ink">2. Grab an API key</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            From the dashboard, go to <span className="text-ink">Settings → API Keys</span> and
            create a key. Keys are shown once — store it in an environment variable, never
            in source control.
          </p>
        </div>

        <div>
          <h2 className="text-heading-3 text-ink">3. Send your first email</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            One endpoint, one required shape. `from` is optional if you&apos;re using the
            default sender.
          </p>
          <CodeBlock filename="send.ts" className="mt-4">
            <pre className="whitespace-pre-wrap break-all font-mono text-code-sm leading-relaxed text-charcoal">
              <span className={kw}>import</span> {"{ Relay }"} <span className={kw}>from</span>{" "}
              <span className={str}>&quot;relay-node&quot;</span>;{"\n\n"}
              <span className={kw}>const</span> relay = <span className={kw}>new</span> Relay();{"\n\n"}
              <span className={kw}>await</span> relay.emails.send({"{"}
              {"\n"}
              {"  "}to: <span className={str}>&quot;ada@lovelace.dev&quot;</span>,{"\n"}
              {"  "}subject: <span className={str}>&quot;Welcome to Relay&quot;</span>,{"\n"}
              {"  "}html: <span className={str}>&quot;&lt;p&gt;Hi Ada,&lt;/p&gt;&quot;</span>,{"\n"}
              {"}"});
            </pre>
          </CodeBlock>
        </div>

        <div>
          <h2 className="text-heading-3 text-ink">4. Check the log</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            The response includes a Message ID immediately. The same ID shows up in the
            dashboard&apos;s Logs view within a second or two, along with status, latency,
            and (once it fires) the delivery webhook. See{" "}
            <Link href="/api-reference" className="text-brand-blue hover:text-ink">
              API Reference
            </Link>{" "}
            for the full response shape.
          </p>
        </div>
      </div>
    </>
  );
}
