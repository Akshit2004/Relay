import type { Metadata } from "next";
import Link from "next/link";
import { DocsPageHeader } from "@/components/docs/DocsPageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { str } from "@/lib/codeTokens";

export const metadata: Metadata = {
  title: "Authentication — Relay Docs",
  description: "How API keys work and how to send them.",
};

export default function AuthenticationPage() {
  return (
    <>
      <DocsPageHeader
        title="Authentication"
        description="Every request is authenticated with a single API key, sent as a Bearer token."
      />

      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-heading-3 text-ink">The header</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            Send your key in the <span className="text-ink">Authorization</span> header
            on every request:
          </p>
          <CodeBlock filename="header" className="mt-4">
            <pre className="font-mono text-code-sm text-charcoal">
              Authorization: <span className={str}>Bearer re_live_51H8x...</span>
            </pre>
          </CodeBlock>
        </div>

        <div>
          <h2 className="text-heading-3 text-ink">Live vs. test keys</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            Keys prefixed <span className="text-ink">re_live_</span> send real email
            through your configured sender. Keys prefixed{" "}
            <span className="text-ink">re_test_</span> accept the request, run full
            validation, and log it — but never dispatch anything. Use test keys in CI.
          </p>
        </div>

        <div>
          <h2 className="text-heading-3 text-ink">Rotating a key</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            Create a new key before revoking the old one. Both remain valid
            simultaneously, so you can roll deploys without a window of failed
            requests. Revoked keys return <span className="text-ink">401</span> immediately
            — see{" "}
            <Link href="/docs/errors" className="text-brand-blue hover:text-ink">
              Errors
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-heading-3 text-ink">Scoping</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            Keys are scoped to a single project. There is no global key that spans
            every project on a team account — this is intentional, so a leaked key
            has a contained blast radius.
          </p>
        </div>
      </div>
    </>
  );
}
