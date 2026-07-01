import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CountUp } from "@/components/animation/CountUp";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

export const metadata: Metadata = {
  title: "About — Relay",
  description: "Why Relay exists, and what we're building toward.",
};

const VALUES = [
  {
    n: "01",
    title: "Boring by design",
    body: "We built on plain SMTP instead of a proprietary pipeline. Four decades of edge cases already solved is worth more than a marketing angle.",
  },
  {
    n: "02",
    title: "Every request is traceable",
    body: "A Request ID on every response isn't a nice-to-have feature — it's the minimum bar for infrastructure someone else's product depends on.",
  },
  {
    n: "03",
    title: "Docs are not an afterthought",
    body: "If a feature ships without a quickstart, a reference entry, and a copy-pasteable example, it isn't done yet.",
  },
  {
    n: "04",
    title: "Usage-based, always",
    body: "You pay for what you send. No seat licenses, no annual minimums disguised as a discount.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Infrastructure should be boring. Building on it shouldn't be."
        subtitle="Relay is the email API we wished existed the last three times we had to integrate one."
      />

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="flex flex-col gap-5 text-body-md text-charcoal">
          <p>
            Every transactional email provider we&apos;d used before Relay had the same
            shape: a dashboard built for the sales demo, documentation that assumed
            you already knew their internal vocabulary, and a debugging story that
            boiled down to opening a support ticket and waiting.
          </p>
          <p>
            We didn&apos;t set out to reinvent email delivery. We set out to make the
            10% that&apos;s actually hard — logging, retries, idempotency, webhooks that
            fire reliably — good enough that you never have to think about the 90%
            that every provider already gets right.
          </p>
          <p>
            Relay is still small. That&apos;s on purpose. We&apos;d rather ship four things
            that work exactly as documented than forty things that mostly do.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <RevealOnScroll className="grid gap-4 border-t border-hairline-soft pt-10 sm:grid-cols-3">
          <div>
            <CountUp to={2025} className="block text-heading-2 text-ink" />
            <p className="mt-1 font-mono text-caption text-steel">Founded</p>
          </div>
          <div>
            <CountUp to={4} className="block text-heading-2 text-ink" />
            <p className="mt-1 font-mono text-caption text-steel">SDKs shipped</p>
          </div>
          <div>
            <CountUp to={99.9} decimals={1} suffix="%" className="block text-heading-2 text-ink" />
            <p className="mt-1 font-mono text-caption text-steel">Uptime target</p>
          </div>
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-28">
        <h2 className="text-heading-3 text-ink">What we optimize for</h2>
        <RevealOnScroll className="mt-6 flex flex-col gap-6">
          {VALUES.map((value) => (
            <div key={value.n} className="flex gap-4">
              <span className="mt-1 font-mono text-caption text-brand-blue">{value.n}</span>
              <div>
                <h3 className="text-body-md-medium text-ink">{value.title}</h3>
                <p className="mt-1 text-body-sm text-charcoal">{value.body}</p>
              </div>
            </div>
          ))}
        </RevealOnScroll>
      </section>
    </>
  );
}
