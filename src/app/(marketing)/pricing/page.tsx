import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PricingCards } from "@/components/sections/PricingCards";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { COMPARISON_ROWS, PRICING_FAQS } from "@/lib/content/pricing";

export const metadata: Metadata = {
  title: "Pricing — Relay",
  description: "Usage-based pricing for Relay's email API. Free to start, no surprise invoices.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Usage-based. No surprise invoices."
        subtitle="Hobby is free forever. Pro is a five-minute upgrade once you outgrow it. Enterprise is a conversation, not a form."
      />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <PricingCards />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <h2 className="text-heading-2 text-ink">Compare plans</h2>
        <RevealOnScroll className="mt-8 overflow-x-auto rounded-lg border border-hairline">
          <table className="w-full min-w-[560px] border-collapse text-body-sm">
            <thead>
              <tr className="border-b border-hairline-soft bg-surface-soft text-left text-steel">
                <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em]">Feature</th>
                <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em]">Hobby</th>
                <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em] text-brand-blue">Pro</th>
                <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em]">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-hairline-soft last:border-0">
                  <td className="px-5 py-3.5 text-charcoal">{row.feature}</td>
                  <td className="px-5 py-3.5 text-steel">{row.hobby}</td>
                  <td className="px-5 py-3.5 text-ink">{row.pro}</td>
                  <td className="px-5 py-3.5 text-steel">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RevealOnScroll>
      </section>

      <FaqAccordion eyebrow="Pricing FAQ" title="Billing questions." items={PRICING_FAQS} className="py-0 pb-28" />

      <FinalCta />
    </>
  );
}
