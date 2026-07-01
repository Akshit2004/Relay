import Link from "next/link";
import { PricingCards } from "@/components/sections/PricingCards";

export function PricingTeaser() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-28">
      <p className="font-mono text-caption uppercase tracking-[0.15em] text-brand-blue">
        06 — Pricing
      </p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="mt-4 max-w-xl text-heading-2 text-ink">
          Usage-based. No surprise invoices.
        </h2>
        <Link href="/pricing" className="text-body-sm text-brand-blue transition-colors hover:text-ink">
          Full plan comparison →
        </Link>
      </div>

      <PricingCards className="mt-14" />
    </section>
  );
}
