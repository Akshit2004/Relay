"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ApiKeyCreateModal } from "@/components/dashboard/ApiKeyCreateModal";
import type { ApiKeySummary } from "@/lib/dashboard/apiKeys";
import { cn } from "@/lib/utils";

export function ApiKeysClient({ initialKeys }: { initialKeys: ApiKeySummary[] }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const sortedKeys = [...initialKeys].sort((a, b) => {
    if (Boolean(a.revokedAt) === Boolean(b.revokedAt)) return 0;
    return a.revokedAt ? 1 : -1;
  });

  async function handleRevoke(id: string) {
    if (confirmingId !== id) {
      setConfirmingId(id);
      setTimeout(() => {
        setConfirmingId((current) => (current === id ? null : current));
      }, 4000);
      return;
    }

    setRevokingId(id);
    await fetch(`/api/dashboard/api-keys/${id}`, { method: "DELETE" });
    setRevokingId(null);
    setConfirmingId(null);
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Create API key
        </Button>
      </div>

      {sortedKeys.length === 0 ? (
        <div className="rounded-lg border border-hairline bg-surface p-10 text-center">
          <p className="text-body-md-medium text-ink">No API keys yet</p>
          <p className="mt-2 text-body-sm text-charcoal">Create one to start sending through the API.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-hairline">
          <table className="w-full min-w-[520px] border-collapse text-body-sm">
            <thead>
              <tr className="border-b border-hairline-soft bg-surface-soft text-left text-steel">
                <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em]">Name</th>
                <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em]">Key</th>
                <th className="px-5 py-3 font-mono text-caption uppercase tracking-[0.08em]">Created</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {sortedKeys.map((key) => {
                const revoked = Boolean(key.revokedAt);
                return (
                  <tr key={key.id} className="border-b border-hairline-soft last:border-0">
                    <td className={cn("px-5 py-3.5", revoked ? "text-steel" : "text-ink")}>
                      {key.name}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-code-sm text-steel">{key.keyPrefix}</td>
                    <td className="px-5 py-3.5 text-steel">
                      {new Date(key.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {revoked ? (
                        <span className="font-mono text-caption text-steel">Revoked</span>
                      ) : (
                        <button
                          onClick={() => handleRevoke(key.id)}
                          disabled={revokingId === key.id}
                          className={cn(
                            "font-mono text-caption transition-colors",
                            confirmingId === key.id
                              ? "text-brand-error"
                              : "text-slate hover:text-brand-error"
                          )}
                        >
                          {revokingId === key.id
                            ? "Revoking…"
                            : confirmingId === key.id
                              ? "Confirm revoke?"
                              : "Revoke"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ApiKeyCreateModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
