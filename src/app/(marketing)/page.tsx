import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { CodeShowcase } from "@/components/sections/CodeShowcase";
import { FeatureBento } from "@/components/sections/FeatureBento";
import { MetricsPreview } from "@/components/sections/MetricsPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { IntroLoader } from "@/components/animation/IntroLoader";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <Hero />
      <LogoMarquee />
      <CodeShowcase />
      <FeatureBento />
      <MetricsPreview />
      <Testimonials />
      <PricingTeaser />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
