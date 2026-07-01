import "server-only";
import { connectToDatabase } from "@/lib/db/mongoose";
import { ApiKey } from "@/lib/db/models/ApiKey";
import { generateApiKey, hashApiKey } from "@/lib/auth/apiKey";

export interface ApiKeySummary {
  id: string;
  name: string;
  keyPrefix: string;
  lastUsedAt: string | null;
  revokedAt: string | null;
  createdAt: string;
}

export async function listApiKeys(userId: string): Promise<ApiKeySummary[]> {
  await connectToDatabase();
  const keys = await ApiKey.find({ userId }).sort({ createdAt: -1 }).lean();

  return keys.map((key) => ({
    id: key._id.toString(),
    name: key.name,
    keyPrefix: key.keyPrefix,
    lastUsedAt: key.lastUsedAt ? key.lastUsedAt.toISOString() : null,
    revokedAt: key.revokedAt ? key.revokedAt.toISOString() : null,
    createdAt: key.createdAt.toISOString(),
  }));
}

export async function createApiKey(userId: string, name: string) {
  await connectToDatabase();
  const { fullKey, displayPrefix } = generateApiKey();
  const keyHash = hashApiKey(fullKey);

  const doc = await ApiKey.create({ userId, name, keyPrefix: displayPrefix, keyHash });

  return {
    id: doc._id.toString(),
    name: doc.name,
    keyPrefix: doc.keyPrefix,
    fullKey,
    createdAt: doc.createdAt.toISOString(),
  };
}

/** Returns true if a key owned by `userId` was revoked; false if not found / not owned / already revoked. */
export async function revokeApiKey(userId: string, keyId: string): Promise<boolean> {
  await connectToDatabase();
  const result = await ApiKey.updateOne(
    { _id: keyId, userId, revokedAt: null },
    { $set: { revokedAt: new Date() } }
  );
  return result.modifiedCount > 0;
}
