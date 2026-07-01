import { Marquee } from "@/components/animation/Marquee";

const TEAMS = [
  "NORTHBEAM",
  "ORBITAL",
  "FERROUS",
  "LUMEN LABS",
  "QUIETROOM",
  "STATION9",
  "HALFPIPE",
  "VESSEL",
  "ARCADE.IO",
  "GRAINLINE",
];

export function LogoMarquee() {
  return (
    <section className="border-y border-hairline-soft py-12">
      <p className="mx-auto mb-8 max-w-6xl px-6 font-mono text-caption uppercase tracking-[0.15em] text-steel">
        Used in production for
      </p>
      <Marquee
        items={TEAMS}
        itemClassName="px-8 font-mono text-body-sm tracking-wide text-slate transition-colors hover:text-ink"
      />
    </section>
  );
}
