import "server-only";
import { Schema, model, models } from "mongoose";

export interface UserDocument {
  _id: Schema.Types.ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const User = models.User ?? model<UserDocument>("User", userSchema);
