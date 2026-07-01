import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { BLOG_POSTS } from "@/lib/content/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Relay Blog`, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 pb-28 pt-40 md:pt-48">
      <Link href="/blog" className="text-body-sm text-brand-blue hover:text-ink">
        ← All posts
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <span className="font-mono text-caption uppercase tracking-[0.1em] text-brand-blue">
          {post.tag}
        </span>
        <span className="font-mono text-caption text-steel">{post.date}</span>
      </div>

      <h1 className="mt-4 text-heading-1 text-ink">{post.title}</h1>

      <RevealOnScroll className="mt-10 flex flex-col gap-5 text-body-md text-charcoal">
        {post.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </RevealOnScroll>
    </article>
  );
}
