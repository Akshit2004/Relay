"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CopyIcon, CheckIcon } from "@/components/dashboard/DashboardIcons";
import { buildAiPrompt } from "@/lib/dashboard/aiPrompt";

interface CreatedKey {
  name: string;
  keyPrefix: string;
  fullKey: string;
}

export function ApiKeyCreateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedKey | null>(null);
  const [copied, setCopied] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/dashboard/api-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      setError(data?.error ?? "Something went wrong. Try again.");
      setLoading(false);
      return;
    }

    setCreated(data);
    setLoading(false);
    router.refresh();
  }

  function handleClose() {
    setName("");
    setError(null);
    setCreated(null);
    setCopied(false);
    setPromptCopied(false);
    onClose();
  }

  async function handleCopy() {
    if (!created) return;
    await navigator.clipboard.writeText(created.fullKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopyPrompt() {
    if (!created) return;
    await navigator.clipboard.writeText(buildAiPrompt(created.fullKey));
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-lg border border-hairline bg-surface p-7 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)]"
          >
            {created ? (
              <>
                <h2 className="text-heading-3 text-ink">Key created</h2>
                <p className="mt-2 text-body-sm text-charcoal">
                  Copy it now — for your security, we won&apos;t show the full key again.
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 rounded-md border border-hairline bg-canvas-dark px-4 py-3">
                  <code className="min-w-0 flex-1 truncate font-mono text-code-sm text-ink">
                    {created.fullKey}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label="Copy key"
                    className="shrink-0 text-steel transition-colors hover:text-ink"
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-hairline px-4 py-2.5 text-body-sm text-charcoal transition-colors hover:border-brand-blue/40 hover:text-ink"
                >
                  {promptCopied ? <CheckIcon /> : <CopyIcon />}
                  {promptCopied ? "Prompt copied" : "Copy AI prompt"}
                </button>
                <p className="mt-2 text-caption text-steel">
                  Pastes your key, the API shape, and usage notes — ready to paste into
                  Cursor, Claude, or ChatGPT.
                </p>

                <Button variant="primary" onClick={handleClose} className="mt-4 w-full">
                  Done
                </Button>
              </>
            ) : (
              <>
                <h2 className="text-heading-3 text-ink">Create API key</h2>
                <p className="mt-2 text-body-sm text-charcoal">
                  Give it a name you&apos;ll recognize later, like the environment it&apos;s for.
                </p>
                <form onSubmit={handleCreate} className="mt-5 flex flex-col gap-4">
                  {error && (
                    <p className="rounded-md border border-brand-error/20 bg-brand-error/5 px-4 py-2.5 text-body-sm text-brand-error">
                      {error}
                    </p>
                  )}
                  <label className="flex flex-col gap-2 text-body-sm text-charcoal">
                    Name
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoFocus
                      placeholder="Production"
                      className="rounded-md border border-hairline bg-canvas-dark px-4 py-2.5 text-ink outline-none transition-colors focus:border-brand-blue"
                    />
                  </label>
                  <div className="mt-2 flex gap-3">
                    <Button type="button" variant="secondary" onClick={handleClose} className="flex-1">
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={loading} className="flex-1">
                      {loading ? "Creating…" : "Create key"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
