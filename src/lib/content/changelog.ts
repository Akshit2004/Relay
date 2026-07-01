export interface ChangelogEntry {
  version: string;
  date: string;
  tag: "Added" | "Improved" | "Fixed";
  title: string;
  items: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "2.4.0",
    date: "2026-06-18",
    tag: "Added",
    title: "Webhooks v2",
    items: [
      "New `clicked` and `complaint` event types.",
      "Per-endpoint secret rotation without downtime.",
      "Delivery attempts now visible in the dashboard, not just the final status.",
    ],
  },
  {
    version: "2.3.2",
    date: "2026-05-30",
    tag: "Fixed",
    title: "Template variable escaping",
    items: [
      "Fixed HTML entities being double-escaped inside `{{variable}}` interpolation.",
      "Fixed template previews not reflecting the latest saved version.",
    ],
  },
  {
    version: "2.3.0",
    date: "2026-05-12",
    tag: "Improved",
    title: "Faster log search",
    items: [
      "Log search by Request ID now returns in under 50ms at P99.",
      "Added status and date-range filters to the Logs API.",
    ],
  },
  {
    version: "2.2.0",
    date: "2026-04-21",
    tag: "Added",
    title: "Python SDK",
    items: [
      "Published `relay-python` with parity to the Node SDK.",
      "Added typed response models for every endpoint.",
    ],
  },
  {
    version: "2.1.1",
    date: "2026-04-02",
    tag: "Fixed",
    title: "Idempotency edge case",
    items: [
      "Fixed a race where two concurrent requests with the same idempotency key could both send.",
      "Idempotency keys now expire after 24 hours instead of never.",
    ],
  },
  {
    version: "2.1.0",
    date: "2026-03-15",
    tag: "Improved",
    title: "Rate limit transparency",
    items: [
      "Rate limit headers (`X-RateLimit-Remaining`, `X-RateLimit-Reset`) added to every response.",
      "Burst protection now returns a `Retry-After` header instead of a bare 429.",
    ],
  },
  {
    version: "2.0.0",
    date: "2026-02-20",
    tag: "Added",
    title: "Custom SMTP credentials",
    items: [
      "Link your own SMTP provider from Settings instead of using the default sender.",
      "Automatic fallback to the default sender if custom credentials fail health checks.",
    ],
  },
];
