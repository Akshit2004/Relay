import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-40 md:pt-48">
      <p className="font-mono text-caption uppercase tracking-[0.15em] text-brand-blue">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-2xl text-heading-1 text-ink">{title}</h1>
      {subtitle && <p className="mt-4 max-w-xl text-body-md text-charcoal">{subtitle}</p>}
      {children}
    </section>
  );
}
