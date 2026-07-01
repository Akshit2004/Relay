export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-we-built-relay-on-smtp",
    title: "Why we built Relay on plain SMTP",
    excerpt:
      "Every provider eventually locks you into its own dialect. We bet on the protocol that already won.",
    date: "2026-06-02",
    tag: "Engineering",
    body: [
      "When we started Relay, the obvious move was to build a proprietary sending pipeline and market it as \"better than SMTP.\" Almost everyone in this space does that. We didn't, and here's the reasoning.",
      "SMTP is boring, which is exactly the point. It's been carrying the world's email for four decades, every mail server on earth already speaks it, and the failure modes are extremely well understood. A proprietary pipeline gives you marketing material. SMTP gives you nineteen years of edge cases someone else already found for you.",
      "What we actually built on top of it is the part that matters: a REST API that turns a POST request into a properly formed message, a queue that retries failed sends with backoff instead of silently dropping them, and a logging layer that gives every request an ID the moment it's accepted. That's the 5% that's genuinely hard. The transport underneath didn't need reinventing.",
      "The practical upside for you: if you already have SMTP credentials from another provider, plugging them into Relay is a five-minute settings change, not a migration project. If you don't, our default sender is already configured and TLS-everywhere by default. Either way, you're not learning a new wire protocol — you're just calling one clean endpoint.",
    ],
  },
  {
    slug: "announcing-webhooks-v2",
    title: "Announcing Webhooks v2",
    excerpt:
      "Per-endpoint secret rotation, two new event types, and delivery attempts you can actually see.",
    date: "2026-06-18",
    tag: "Product",
    body: [
      "Webhooks v2 ships today, and it's a direct response to the most common support thread we've had since launch: \"my webhook stopped firing and I have no idea why.\"",
      "The core problem was visibility. Webhooks v1 told you whether the final attempt succeeded, and nothing about the three retries that came before it. If your endpoint was flaky for four seconds, you'd see a failure with no context. v2 surfaces every delivery attempt — timestamp, response code, latency — directly in the dashboard, next to the event that triggered it.",
      "We also added two event types we'd been missing: `clicked`, for link-tracking use cases, and `complaint`, for when a recipient's mail client reports a message as spam. Both fire through the same signed payload format as every other event, so if you've already implemented signature verification, there's nothing new to build.",
      "Last, secret rotation no longer requires downtime. You can add a new signing secret, deploy your endpoint to verify against both the old and new secret, then remove the old one — all without missing a single delivery in between.",
    ],
  },
  {
    slug: "how-we-hit-99-9-percent-uptime",
    title: "How we hit 99.9% uptime without a dedicated SRE team",
    excerpt:
      "Boring infrastructure choices, aggressive timeouts, and a healthy fear of single points of failure.",
    date: "2026-05-08",
    tag: "Engineering",
    body: [
      "We're a small team. We don't have a 24-hour SRE rotation, and for most of the last year we didn't need one. Here's what actually moved the uptime number, roughly in order of impact.",
      "First: every external dependency has a timeout shorter than our own API's SLA. If a downstream SMTP provider is slow, we'd rather queue the send and retry than hold a connection open and let it cascade into request queuing on our side. Slow is not the same failure mode as down, and treating them the same was our biggest early mistake.",
      "Second: Redis-backed rate limiting runs in front of everything, including our own internal services. A burst of traffic degrades gracefully into 429s with a `Retry-After` header instead of taking down the box. Customers occasionally notice a rate limit. They never notice a full outage caused by one noisy account.",
      "Third, and least glamorous: we run the exact same Docker Compose configuration locally that we run in production, so \"works on my machine\" bugs die before a PR is opened. Most of our incidents in the early months were configuration drift between environments, not actual code defects. Removing the drift removed most of the incidents.",
    ],
  },
];
