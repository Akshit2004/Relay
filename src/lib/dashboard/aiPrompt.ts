const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

/** Builds a copy-pasteable context blob for AI coding assistants (Cursor, Claude, ChatGPT, etc). */
export function buildAiPrompt(apiKey: string): string {
  return `I'm integrating with Relay, an email API for developers. Here's everything you need to help me:

**API key** (keep this secret, never commit it or expose it client-side):
${apiKey}

**Base URL:** ${BASE_URL}/api

**Send an email — POST /api/emails**
Headers:
  Authorization: Bearer ${apiKey}
  Content-Type: application/json
Body:
  { "from": "you@yourdomain.com", "to": "recipient@example.com", "subject": "...", "html": "...", "text": "..." }
Response (202 Accepted):
  { "id": "msg_...", "status": "queued", "created_at": "..." }

**Check a send — GET /api/emails/:id**
Returns { "id", "status", "latency_ms", "opens", "clicks" }.

**Idempotency:** pass an \`Idempotency-Key\` header on POST /api/emails to safely retry the same request without double-sending.

**Errors** are always JSON, never a bare 500:
  { "error": { "type": "validation_error", "message": "...", "request_id": "..." } }

**Templates:** send \`template_id\` + \`variables\` instead of \`html\` to use a saved template with \`{{variable}}\` interpolation.

**Webhooks:** register an endpoint to receive \`delivered\`, \`bounced\`, \`opened\`, \`clicked\`, \`failed\`, and \`complaint\` events, signed via a \`Relay-Signature\` header (HMAC-SHA256).

**SDKs:** \`npm install relay-node\` (JavaScript/TypeScript) or \`pip install relay-python\`.

Please help me integrate this into my project — ask me what framework/language I'm using if it's not obvious from context.`;
}
