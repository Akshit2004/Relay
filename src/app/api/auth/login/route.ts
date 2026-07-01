import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongoose";
import { User } from "@/lib/db/models/User";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken, SESSION_COOKIE, SESSION_COOKIE_OPTIONS } from "@/lib/auth/session";
import { loginSchema } from "@/lib/auth/validation";

const INVALID_CREDENTIALS = { error: "Invalid email or password" };

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(INVALID_CREDENTIALS, { status: 401 });
  }

  const { email, password } = parsed.data;

  await connectToDatabase();

  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) {
    return NextResponse.json(INVALID_CREDENTIALS, { status: 401 });
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json(INVALID_CREDENTIALS, { status: 401 });
  }

  const token = await createSessionToken(user._id.toString());

  const response = NextResponse.json({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
  });
  response.cookies.set(SESSION_COOKIE, token, SESSION_COOKIE_OPTIONS);
  return response;
}
