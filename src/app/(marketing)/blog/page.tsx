import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { BLOG_POSTS } from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Blog — Relay",
  description: "Notes from the team building Relay.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the team building Relay"
        subtitle="Engineering write-ups and product announcements, written by the people who shipped them."
      />

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <RevealOnScroll className="grid gap-5 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-lg border border-hairline bg-surface p-6 transition-colors duration-300 hover:border-brand-blue/40"
            >
              <span className="font-mono text-caption uppercase tracking-[0.1em] text-brand-blue">
                {post.tag}
              </span>
              <h2 className="mt-3 text-heading-3 text-ink">{post.title}</h2>
              <p className="mt-2 flex-1 text-body-sm text-charcoal">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-mono text-caption text-steel">{post.date}</span>
                <span className="text-body-sm text-brand-blue transition-transform duration-200 group-hover:translate-x-1">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </RevealOnScroll>
      </section>
    </>
  );
}
