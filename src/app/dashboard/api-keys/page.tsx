import type { Metadata } from "next";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { listApiKeys } from "@/lib/dashboard/apiKeys";
import { ApiKeysClient } from "@/components/dashboard/ApiKeysClient";
import { AiPromptCard } from "@/components/dashboard/AiPromptCard";

export const metadata: Metadata = { title: "API Keys — Relay Dashboard" };

export default async function ApiKeysPage() {
  const user = await getCurrentUser();
  const keys = user ? await listApiKeys(user.id) : [];

  return (
    <>
      <DashboardPageHeader
        title="API Keys"
        description="Keys are hashed at rest. The full secret is shown once, at creation."
      />
      <ApiKeysClient initialKeys={keys} />
      <AiPromptCard />
    </>
  );
}
