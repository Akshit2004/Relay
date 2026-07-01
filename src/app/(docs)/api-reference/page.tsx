import type { Metadata } from "next";
import Link from "next/link";
import { DocsPageHeader } from "@/components/docs/DocsPageHeader";
import { TableOfContents } from "@/components/docs/TableOfContents";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { str } from "@/lib/codeTokens";

export const metadata: Metadata = {
  title: "API Reference — Relay Docs",
  description: "Every endpoint, request shape, and response shape.",
};

const TOC = [
  { id: "send-email", label: "POST /emails" },
  { id: "get-email", label: "GET /emails/:id" },
  { id: "templates", label: "Templates" },
  { id: "webhooks", label: "Webhook endpoints" },
];

export default function ApiReferencePage() {
  return (
    <>
      <DocsPageHeader
        title="API Reference"
        description="Base URL: api.relay.dev. Every request and response body is JSON."
      />

      <div className="lg:grid lg:grid-cols-[1fr_190px] lg:gap-12">
        <div className="flex flex-col gap-14">
          <section id="send-email">
            <div className="flex items-center gap-3">
              <span className="rounded-xs bg-brand-success/10 px-2 py-0.5 font-mono text-code-sm text-brand-success">
                POST
              </span>
              <h2 className="font-mono text-heading-3 text-ink">/emails</h2>
            </div>
            <p className="mt-3 max-w-2xl text-body-sm text-charcoal">
              Queues an email for delivery. Returns immediately with{" "}
              <span className="text-ink">202 Accepted</span> — the send itself happens
              asynchronously.
            </p>

            <p className="mt-5 font-mono text-caption uppercase tracking-[0.08em] text-steel">
              Request body
            </p>
            <CodeBlock className="mt-2">
              <pre className="font-mono text-code-sm leading-relaxed text-charcoal">{`{
  "from": `}<span className={str}>&quot;you@yourdomain.com&quot;</span>{`,   // optional, uses default sender
  "to": `}<span className={str}>&quot;ada@lovelace.dev&quot;</span>{`,
  "subject": `}<span className={str}>&quot;Welcome to Relay&quot;</span>{`,
  "html": `}<span className={str}>&quot;&lt;p&gt;Hi Ada&lt;/p&gt;&quot;</span>{`,
  "text": `}<span className={str}>&quot;Hi Ada&quot;</span>{`,           // optional
  "reply_to": `}<span className={str}>&quot;support@yourdomain.com&quot;</span>{`, // optional
  "cc": [], "bcc": [],                    // optional
  "attachments": []                       // optional
}`}</pre>
            </CodeBlock>

            <p className="mt-5 font-mono text-caption uppercase tracking-[0.08em] text-steel">
              Response · 202
            </p>
            <CodeBlock className="mt-2">
              <pre className="font-mono text-code-sm leading-relaxed text-charcoal">{`{
  "id": `}<span className={str}>&quot;msg_8f2a1c&quot;</span>{`,
  "status": `}<span className={str}>&quot;queued&quot;</span>{`,
  "created_at": `}<span className={str}>&quot;2026-06-18T14:02:11Z&quot;</span>{`
}`}</pre>
            </CodeBlock>
          </section>

          <section id="get-email">
            <div className="flex items-center gap-3">
              <span className="rounded-xs bg-brand-blue-soft px-2 py-0.5 font-mono text-code-sm text-brand-blue">
                GET
              </span>
              <h2 className="font-mono text-heading-3 text-ink">/emails/:id</h2>
            </div>
            <p className="mt-3 max-w-2xl text-body-sm text-charcoal">
              Fetches the current status of a single send — the same data backing its
              row in the dashboard&apos;s Logs view.
            </p>
            <CodeBlock className="mt-4">
              <pre className="font-mono text-code-sm leading-relaxed text-charcoal">{`{
  "id": `}<span className={str}>&quot;msg_8f2a1c&quot;</span>{`,
  "status": `}<span className={str}>&quot;delivered&quot;</span>{`,
  "latency_ms": 24,
  "opens": 1,
  "clicks": 0
}`}</pre>
            </CodeBlock>
          </section>

          <section id="templates">
            <h2 className="text-heading-3 text-ink">Templates</h2>
            <p className="mt-3 max-w-2xl text-body-sm text-charcoal">
              Standard CRUD, plus versioning handled automatically on every update.
            </p>
            <div className="mt-4 flex flex-col gap-3 font-mono text-code-sm">
              <div className="flex items-center gap-3 rounded-md border border-hairline-soft px-4 py-2.5">
                <span className="text-brand-success">GET</span> /templates
              </div>
              <div className="flex items-center gap-3 rounded-md border border-hairline-soft px-4 py-2.5">
                <span className="text-brand-success">POST</span> /templates
              </div>
              <div className="flex items-center gap-3 rounded-md border border-hairline-soft px-4 py-2.5">
                <span className="text-brand-blue">PATCH</span> /templates/:id
              </div>
              <div className="flex items-center gap-3 rounded-md border border-hairline-soft px-4 py-2.5">
                <span className="text-brand-error">DELETE</span> /templates/:id
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-body-sm text-charcoal">
              See <Link href="/docs/templates" className="text-brand-blue hover:text-ink">Templates guide</Link> for
              the variable interpolation syntax.
            </p>
          </section>

          <section id="webhooks">
            <h2 className="text-heading-3 text-ink">Webhook endpoints</h2>
            <p className="mt-3 max-w-2xl text-body-sm text-charcoal">
              Register up to 10 endpoints per project. Each gets its own signing secret.
            </p>
            <div className="mt-4 flex flex-col gap-3 font-mono text-code-sm">
              <div className="flex items-center gap-3 rounded-md border border-hairline-soft px-4 py-2.5">
                <span className="text-brand-success">GET</span> /webhooks
              </div>
              <div className="flex items-center gap-3 rounded-md border border-hairline-soft px-4 py-2.5">
                <span className="text-brand-success">POST</span> /webhooks
              </div>
              <div className="flex items-center gap-3 rounded-md border border-hairline-soft px-4 py-2.5">
                <span className="text-brand-error">DELETE</span> /webhooks/:id
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-body-sm text-charcoal">
              Full event payload shape and signature verification: see{" "}
              <Link href="/webhooks" className="text-brand-blue hover:text-ink">
                Webhooks
              </Link>
              .
            </p>
          </section>
        </div>

        <aside className="mt-14 lg:mt-0 lg:sticky lg:top-32 lg:h-fit">
          <TableOfContents items={TOC} />
        </aside>
      </div>
    </>
  );
}
