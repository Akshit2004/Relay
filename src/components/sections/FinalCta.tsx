import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

export function FinalCta() {
  return (
    <section className="px-6 py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-lg border border-hairline bg-surface px-8 py-16 text-center md:px-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px circle at 50% 0%, rgba(61,127,255,0.14), transparent 70%)",
          }}
        />
        <RevealOnScroll className="relative flex flex-col items-center">
          <h2 className="max-w-xl text-heading-1 text-ink">
            Ship your first email in five minutes
          </h2>
          <p className="mt-4 max-w-md text-body-md text-charcoal">
            Free API key, no credit card. Cancel the tab you had open for
            the other provider&apos;s docs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" href="#">
              Get your API key
            </Button>
            <Button variant="secondary" href="/docs">
              Read the docs
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
