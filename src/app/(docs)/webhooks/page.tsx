import type { Metadata } from "next";
import Link from "next/link";
import { DocsPageHeader } from "@/components/docs/DocsPageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { kw, str } from "@/lib/codeTokens";

export const metadata: Metadata = {
  title: "Webhooks — Relay Docs",
  description: "Event types, signed payloads, and the retry policy.",
};

const EVENTS = [
  { name: "delivered", fires: "The receiving server accepted the message." },
  { name: "bounced", fires: "Permanent or temporary rejection. Check `bounce_type`." },
  { name: "opened", fires: "Recipient's client rendered the tracking pixel." },
  { name: "clicked", fires: "A tracked link in the email was clicked." },
  { name: "failed", fires: "Relay could not deliver after all retries were exhausted." },
  { name: "complaint", fires: "Recipient marked the message as spam." },
];

export default function WebhooksPage() {
  return (
    <>
      <DocsPageHeader
        title="Webhooks"
        description="Every event is a signed POST to the endpoints you register, retried on failure with exponential backoff."
      />

      <div className="flex flex-col gap-12">
        <section>
          <h2 className="text-heading-3 text-ink">Event types</h2>
          <div className="mt-4 flex flex-col divide-y divide-hairline-soft rounded-lg border border-hairline">
            {EVENTS.map((event) => (
              <div key={event.name} className="flex items-center gap-4 px-5 py-3.5">
                <span className="w-28 shrink-0 font-mono text-code-sm text-brand-blue">{event.name}</span>
                <span className="text-body-sm text-charcoal">{event.fires}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-heading-3 text-ink">Payload</h2>
          <CodeBlock className="mt-4">
            <pre className="font-mono text-code-sm leading-relaxed text-charcoal">{`{
  "type": `}<span className={str}>&quot;delivered&quot;</span>{`,
  "created_at": `}<span className={str}>&quot;2026-06-18T14:02:11Z&quot;</span>{`,
  "data": {
    "email_id": `}<span className={str}>&quot;msg_8f2a1c&quot;</span>{`,
    "to": `}<span className={str}>&quot;ada@lovelace.dev&quot;</span>{`
  }
}`}</pre>
          </CodeBlock>
        </section>

        <section>
          <h2 className="text-heading-3 text-ink">Verifying the signature</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            Every request includes a <span className="text-ink">Relay-Signature</span> header
            — an HMAC-SHA256 hash of the raw body using your endpoint&apos;s secret.
          </p>
          <CodeBlock filename="verify.ts" className="mt-4">
            <pre className="whitespace-pre-wrap break-all font-mono text-code-sm leading-relaxed text-charcoal">
              <span className={kw}>import</span> {"{ createHmac, timingSafeEqual }"}{" "}
              <span className={kw}>from</span> <span className={str}>&quot;crypto&quot;</span>;{"\n\n"}
              <span className={kw}>export function</span> isValidSignature(rawBody, header,
              secret) {"{"}
              {"\n"}
              {"  "}
              <span className={kw}>const</span> expected = createHmac(
              <span className={str}>&quot;sha256&quot;</span>, secret).update(rawBody).digest(
              <span className={str}>&quot;hex&quot;</span>);{"\n"}
              {"  "}
              <span className={kw}>return</span> timingSafeEqual(Buffer.from(expected),
              Buffer.from(header));{"\n"}
              {"}"}
            </pre>
          </CodeBlock>
          <p className="mt-3 max-w-2xl text-body-sm text-charcoal">
            Full walkthrough, including the raw-body gotcha most frameworks trip on:{" "}
            <Link href="/guides/verifying-webhook-signatures" className="text-brand-blue hover:text-ink">
              Verifying webhook signatures
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-heading-3 text-ink">Retry policy</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            A non-2xx response is retried 5 times with exponential backoff (roughly
            1m, 5m, 30m, 2h, 6h). After the final attempt fails, the event is marked
            dead and visible in the dashboard, but not retried further.
          </p>
        </section>
      </div>
    </>
  );
}
