import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db/mongoose";
import { User } from "@/lib/db/models/User";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
}

/** Memoized per-request (React `cache`) since layouts and pages both call this. */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session) return null;

  await connectToDatabase();
  const user = await User.findById(session.userId).lean();
  if (!user) return null;

  return { id: user._id.toString(), email: user.email, name: user.name };
});
