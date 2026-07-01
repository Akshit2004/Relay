import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { TIERS } from "@/lib/content/pricing";

export function PricingCards({ className }: { className?: string }) {
  return (
    <RevealOnScroll className={cn("grid gap-5 md:grid-cols-3", className)}>
      {TIERS.map((tier) => (
        <div
          key={tier.name}
          className={cn(
            "flex flex-col rounded-lg border p-7",
            tier.featured
              ? "border-brand-blue bg-brand-blue-soft md:-translate-y-3 md:shadow-[0_12px_32px_rgba(61,127,255,0.15)]"
              : "border-hairline bg-surface"
          )}
        >
          <h3 className="text-heading-3 text-ink">{tier.name}</h3>
          <p className="mt-2 text-body-sm text-charcoal">{tier.description}</p>
          <div className="mt-6 flex items-baseline gap-1.5">
            <span className="text-heading-1 text-ink">{tier.price}</span>
            {tier.period && <span className="text-body-sm text-steel">{tier.period}</span>}
          </div>

          <ul className="mt-6 flex flex-1 flex-col gap-3">
            {tier.features.map((feature) => (
              <li key={feature} className="flex gap-2.5 text-body-sm text-charcoal">
                <span className="mt-0.5 font-mono text-brand-blue">+</span>
                {feature}
              </li>
            ))}
          </ul>

          <Button variant={tier.variant} href="#" className="mt-8 w-full">
            {tier.cta}
          </Button>
        </div>
      ))}
    </RevealOnScroll>
  );
}
