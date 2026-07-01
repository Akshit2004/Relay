export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "code"; filename?: string; code: string }
  | { type: "h2"; text: string };

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  body: GuideBlock[];
}

export const GUIDES: Guide[] = [
  {
    slug: "verifying-webhook-signatures",
    title: "Verifying webhook signatures",
    excerpt:
      "Every webhook Relay sends is signed with HMAC-SHA256. Here's how to verify it before you trust the payload.",
    readTime: "4 min read",
    body: [
      {
        type: "p",
        text: "Anyone can send a POST request to your webhook endpoint that looks like it came from Relay. Signature verification is what tells you whether it actually did. Skipping this step means trusting the network, which you shouldn't.",
      },
      {
        type: "h2",
        text: "1. Grab the signing secret",
      },
      {
        type: "p",
        text: "Each webhook endpoint you register gets its own secret, shown once in the dashboard when you create it. Store it the same way you'd store an API key — as an environment variable, never in source control.",
      },
      {
        type: "h2",
        text: "2. Compute the expected signature",
      },
      {
        type: "p",
        text: "Every request includes a `Relay-Signature` header, computed as an HMAC-SHA256 hash of the raw request body using your secret. Recompute it yourself and compare:",
      },
      {
        type: "code",
        filename: "verify.ts",
        code: `import { createHmac, timingSafeEqual } from "crypto";

export function isValidSignature(rawBody: string, header: string, secret: string) {
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && timingSafeEqual(a, b);
}`,
      },
      {
        type: "p",
        text: "Use `timingSafeEqual` rather than `===`. A plain string comparison leaks timing information about how many leading bytes matched, which is a real (if slow) attack vector against signature checks.",
      },
      {
        type: "h2",
        text: "3. Read the raw body, not the parsed one",
      },
      {
        type: "p",
        text: "This is the step people get wrong. If your framework parses the JSON body before your handler runs, the bytes you re-serialize won't match the bytes that were signed byte-for-byte — whitespace and key ordering aren't guaranteed to round-trip. Configure your route to also capture the raw request body, and hash that.",
      },
    ],
  },
  {
    slug: "handling-bounces-gracefully",
    title: "Handling bounces gracefully",
    excerpt:
      "A bounce isn't a failure state to hide from users — it's information. Here's how to act on it without over-reacting.",
    readTime: "5 min read",
    body: [
      {
        type: "p",
        text: "Bounces happen constantly and for mundane reasons: a typo'd address, a full mailbox, a domain that stopped existing two years ago. The mistake we see most often is treating every bounce as an incident. Most aren't.",
      },
      {
        type: "h2",
        text: "Hard bounces vs. soft bounces",
      },
      {
        type: "p",
        text: "A hard bounce means the address is permanently invalid — the mailbox doesn't exist, the domain has no MX record. Retrying does nothing but waste sends and hurt your sender reputation. A soft bounce means a temporary condition: a full inbox, a greylisting delay, a receiving server having a bad day. Relay's webhook payload includes a `bounce_type` field distinguishing the two — check it before deciding whether to retry.",
      },
      {
        type: "h2",
        text: "Suppress, don't just log",
      },
      {
        type: "p",
        text: "On a hard bounce, the right move is to stop sending to that address entirely, not just record that it happened. Keep a suppression list in your own database, keyed on the recipient, and check it before every send — a webhook handler that only writes to a log table is a bounce rate that never improves.",
      },
      {
        type: "code",
        filename: "webhook-handler.ts",
        code: `if (event.type === "bounced" && event.data.bounce_type === "permanent") {
  await db.suppressions.upsert({ email: event.data.to, reason: "hard_bounce" });
}`,
      },
      {
        type: "h2",
        text: "Watch the rate, not the count",
      },
      {
        type: "p",
        text: "Ten bounces out of ten sends is a real problem — likely a bad list import. Ten bounces out of ten thousand is Tuesday. Track bounce rate as a percentage of volume in your own alerting, not an absolute count, or you'll either miss real degradation or page yourself constantly for nothing.",
      },
    ],
  },
];
