import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { GUIDES } from "@/lib/content/guides";

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};
  return { title: `${guide.title} — Relay Guides`, description: guide.excerpt };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <article>
      <Link href="/guides" className="text-body-sm text-brand-blue hover:text-ink">
        ← All guides
      </Link>

      <h1 className="mt-4 text-heading-2 text-ink">{guide.title}</h1>
      <p className="mt-2 font-mono text-caption text-steel">{guide.readTime}</p>

      <div className="mt-8 flex max-w-2xl flex-col gap-5">
        {guide.body.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2 key={i} className="mt-4 text-heading-3 text-ink">
                {block.text}
              </h2>
            );
          }
          if (block.type === "code") {
            return (
              <CodeBlock key={i} filename={block.filename}>
                <pre className="whitespace-pre-wrap break-all font-mono text-code-sm leading-relaxed text-charcoal">
                  {block.code}
                </pre>
              </CodeBlock>
            );
          }
          return (
            <p key={i} className="text-body-md text-charcoal">
              {block.text}
            </p>
          );
        })}
      </div>
    </article>
  );
}
