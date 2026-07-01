import type { Metadata } from "next";
import Link from "next/link";
import { DocsPageHeader } from "@/components/docs/DocsPageHeader";
import { GUIDES } from "@/lib/content/guides";

export const metadata: Metadata = {
  title: "Guides — Relay Docs",
  description: "Practical, opinionated guides for building on Relay.",
};

export default function GuidesPage() {
  return (
    <>
      <DocsPageHeader
        title="Guides"
        description="Longer-form, opinionated write-ups for the parts of integrating email that aren't just endpoint docs."
      />

      <div className="flex flex-col divide-y divide-hairline-soft border-y border-hairline-soft">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex items-center justify-between gap-6 py-6"
          >
            <div>
              <h2 className="text-body-md-medium text-ink">{guide.title}</h2>
              <p className="mt-1 max-w-xl text-body-sm text-charcoal">{guide.excerpt}</p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="font-mono text-caption text-steel">{guide.readTime}</span>
              <span className="text-brand-blue transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
