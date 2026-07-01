import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { cn } from "@/lib/utils";
import { CHANGELOG } from "@/lib/content/changelog";

export const metadata: Metadata = {
  title: "Changelog — Relay",
  description: "What shipped, and when.",
};

const TAG_STYLES: Record<string, string> = {
  Added: "text-brand-success bg-brand-success/10",
  Improved: "text-brand-blue bg-brand-blue-soft",
  Fixed: "text-brand-warn bg-brand-warn/10",
};

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title="What shipped, and when."
        subtitle="Every release, in order. No marketing spin, just what changed."
      />

      <section className="mx-auto max-w-3xl px-6 pb-28">
        <RevealOnScroll className="relative flex flex-col gap-12 border-l border-hairline pl-8">
          {CHANGELOG.map((entry) => (
            <div key={entry.version} className="relative">
              <span className="absolute -left-[calc(2rem+4.5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-canvas-dark bg-brand-blue" />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-caption text-steel">{entry.date}</span>
                <span className="font-mono text-caption text-steel">v{entry.version}</span>
                <span
                  className={cn(
                    "rounded-xs px-2 py-0.5 font-mono text-code-sm",
                    TAG_STYLES[entry.tag]
                  )}
                >
                  {entry.tag}
                </span>
              </div>
              <h2 className="mt-2 text-heading-3 text-ink">{entry.title}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {entry.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-body-sm text-charcoal">
                    <span className="mt-0.5 font-mono text-brand-blue">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </RevealOnScroll>
      </section>
    </>
  );
}
