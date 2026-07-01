import "server-only";
import { randomBytes, createHash } from "crypto";

const KEY_PREFIX = "re_live_";

/** Generates a random API key secret. The full key is only ever returned once, at creation. */
export function generateApiKey() {
  const secret = randomBytes(24).toString("base64url");
  const fullKey = `${KEY_PREFIX}${secret}`;
  const displayPrefix = `${KEY_PREFIX}${secret.slice(0, 6)}…`;
  return { fullKey, displayPrefix };
}

/** API keys are high-entropy random secrets, not passwords — a fast deterministic hash is correct here. */
export function hashApiKey(fullKey: string): string {
  return createHash("sha256").update(fullKey).digest("hex");
}
