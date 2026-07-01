import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { createApiKey } from "@/lib/dashboard/apiKeys";

const createKeySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(60, "Name is too long"),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = createKeySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const key = await createApiKey(user.id, parsed.data.name);
  return NextResponse.json(key, { status: 201 });
}
