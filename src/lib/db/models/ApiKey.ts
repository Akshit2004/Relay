import "server-only";
import { Schema, model, models } from "mongoose";

export interface ApiKeyDocument {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  name: string;
  keyPrefix: string;
  keyHash: string;
  lastUsedAt: Date | null;
  revokedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const apiKeySchema = new Schema<ApiKeyDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    keyPrefix: { type: String, required: true },
    keyHash: { type: String, required: true },
    lastUsedAt: { type: Date, default: null },
    revokedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const ApiKey = models.ApiKey ?? model<ApiKeyDocument>("ApiKey", apiKeySchema);
