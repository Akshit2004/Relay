import type { Metadata } from "next";
import { DocsPageHeader } from "@/components/docs/DocsPageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { str } from "@/lib/codeTokens";

export const metadata: Metadata = {
  title: "Errors — Relay Docs",
  description: "The JSON error shape and full error code reference.",
};

const CODES = [
  { code: "400", type: "validation_error", meaning: "The request body failed schema validation." },
  { code: "401", type: "authentication_error", meaning: "Missing, malformed, or revoked API key." },
  { code: "403", type: "permission_error", meaning: "Key is valid but not scoped to this resource." },
  { code: "404", type: "not_found", meaning: "The resource (template, log, key) doesn't exist." },
  { code: "409", type: "idempotency_conflict", meaning: "Same idempotency key, different request body." },
  { code: "422", type: "unprocessable_entity", meaning: "Well-formed JSON, but recipient/sender rejected it." },
  { code: "429", type: "rate_limited", meaning: "Burst or sustained rate limit exceeded. See Retry-After." },
  { code: "500", type: "internal_error", meaning: "Something broke on our end. Safe to retry." },
];

export default function ErrorsPage() {
  return (
    <>
      <DocsPageHeader
        title="Errors"
        description="Every error is JSON, uses a real HTTP status code, and never a bare 500 with no body."
      />

      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-heading-3 text-ink">Shape</h2>
          <CodeBlock filename="error response" className="mt-4">
            <pre className="font-mono text-code-sm leading-relaxed text-charcoal">{`{
  "error": {
    "type": `}<span className={str}>&quot;validation_error&quot;</span>{`,
    "message": `}<span className={str}>&quot;&apos;to&apos; must be a valid email address&quot;</span>{`,
    "request_id": `}<span className={str}>&quot;req_7b90e2f1&quot;</span>{`
  }
}`}</pre>
          </CodeBlock>
          <p className="mt-3 text-body-sm text-charcoal">
            The <span className="text-ink">request_id</span> matches the one in the
            dashboard&apos;s Logs view — paste it directly into a support message and we
            can find the exact request.
          </p>
        </div>

        <div>
          <h2 className="text-heading-3 text-ink">Error codes</h2>
          <div className="mt-4 overflow-x-auto rounded-lg border border-hairline">
            <table className="w-full min-w-[520px] border-collapse text-body-sm">
              <thead>
                <tr className="border-b border-hairline-soft bg-surface-soft text-left text-steel">
                  <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em]">HTTP</th>
                  <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em]">Type</th>
                  <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em]">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {CODES.map((row) => (
                  <tr key={row.code} className="border-b border-hairline-soft last:border-0">
                    <td className="px-5 py-3.5 font-mono text-code-sm text-ink">{row.code}</td>
                    <td className="px-5 py-3.5 font-mono text-code-sm text-brand-blue">{row.type}</td>
                    <td className="px-5 py-3.5 text-charcoal">{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
