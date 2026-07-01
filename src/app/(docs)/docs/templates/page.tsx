import type { Metadata } from "next";
import { DocsPageHeader } from "@/components/docs/DocsPageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { kw, str } from "@/lib/codeTokens";

export const metadata: Metadata = {
  title: "Templates — Relay Docs",
  description: "Variable interpolation, versioning, and previews.",
};

export default function TemplatesPage() {
  return (
    <>
      <DocsPageHeader
        title="Templates"
        description="Versioned HTML/text templates with variable interpolation, so copy changes don't require a deploy."
      />

      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-heading-3 text-ink">Variables</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            Wrap a variable name in double curly braces. Missing variables render as
            an empty string rather than throwing — check the log&apos;s{" "}
            <span className="text-ink">warnings</span> array to catch typos before
            they ship.
          </p>
          <CodeBlock filename="welcome.html" className="mt-4">
            <pre className="font-mono text-code-sm text-charcoal">
              {"<p>Hi "}
              <span className="text-brand-blue">{"{{name}}"}</span>
              {", welcome to "}
              <span className="text-brand-blue">{"{{product}}"}</span>
              {".</p>"}
            </pre>
          </CodeBlock>
        </div>

        <div>
          <h2 className="text-heading-3 text-ink">Sending with a template</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            Pass a <span className="text-ink">template_id</span> instead of{" "}
            <span className="text-ink">html</span>, plus the variables to interpolate:
          </p>
          <CodeBlock filename="send-with-template.ts" className="mt-4">
            <pre className="whitespace-pre-wrap break-all font-mono text-code-sm leading-relaxed text-charcoal">
              <span className={kw}>await</span> relay.emails.send({"{"}
              {"\n"}
              {"  "}to: <span className={str}>&quot;ada@lovelace.dev&quot;</span>,{"\n"}
              {"  "}template_id: <span className={str}>&quot;tmpl_9f2a&quot;</span>,{"\n"}
              {"  "}variables: {"{ name: "}
              <span className={str}>&quot;Ada&quot;</span>
              {", product: "}
              <span className={str}>&quot;Relay&quot;</span>
              {" }"},{"\n"}
              {"}"});
            </pre>
          </CodeBlock>
        </div>

        <div>
          <h2 className="text-heading-3 text-ink">Versioning</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            Every save creates a new version. Sends always use the currently
            published version, but every past version stays inspectable in the
            dashboard — useful when a bounce spike lines up suspiciously well with a
            copy change.
          </p>
        </div>

        <div>
          <h2 className="text-heading-3 text-ink">Previewing</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-charcoal">
            The template editor renders a live preview with sample variable values,
            and supports a one-off test send to any address before you publish.
          </p>
        </div>
      </div>
    </>
  );
}
