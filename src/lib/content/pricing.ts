export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  variant: "primary" | "secondary";
  featured?: boolean;
}

export const TIERS: PricingTier[] = [
  {
    name: "Hobby",
    price: "$0",
    period: "forever",
    description: "For side projects and early testing.",
    features: ["3,000 emails / month", "1 API key", "7-day log retention", "Community support"],
    cta: "Start for free",
    variant: "secondary",
  },
  {
    name: "Pro",
    price: "$20",
    period: "/ month",
    description: "For production apps sending real volume.",
    features: [
      "50,000 emails / month",
      "Unlimited templates",
      "Webhooks + retries",
      "90-day log retention",
      "Email support, < 4h response",
    ],
    cta: "Start free trial",
    variant: "primary",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams with compliance or scale requirements.",
    features: ["Dedicated sending IPs", "SSO / SAML", "99.9% uptime SLA", "Dedicated Slack channel"],
    cta: "Talk to sales",
    variant: "secondary",
  },
];

/** Extra comparison rows shown only on the full /pricing page. */
export const COMPARISON_ROWS: { feature: string; hobby: string; pro: string; enterprise: string }[] = [
  { feature: "Emails / month", hobby: "3,000", pro: "50,000", enterprise: "Custom" },
  { feature: "API keys", hobby: "1", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Log retention", hobby: "7 days", pro: "90 days", enterprise: "1 year" },
  { feature: "Webhooks", hobby: "—", pro: "Included", enterprise: "Included" },
  { feature: "Dedicated IPs", hobby: "—", pro: "—", enterprise: "Included" },
  { feature: "SSO / SAML", hobby: "—", pro: "—", enterprise: "Included" },
  { feature: "Support", hobby: "Community", pro: "< 4h email", enterprise: "Dedicated Slack" },
];

export const PRICING_FAQS = [
  {
    q: "What counts as an email?",
    a: "One accepted API call to POST /emails, regardless of recipient count via CC/BCC. Retries on the same idempotency key never count twice.",
  },
  {
    q: "What happens if I go over my plan limit?",
    a: "We queue and deliver the overage at the same per-email rate as your plan's next tier — sends are never silently dropped.",
  },
  {
    q: "Can I bring my own SMTP provider on any plan?",
    a: "Yes, on every plan including Hobby. Linking your own SMTP credentials never costs extra.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes, annual billing on Pro and Enterprise gets two months free. Reach out from the Contact page to switch.",
  },
];
