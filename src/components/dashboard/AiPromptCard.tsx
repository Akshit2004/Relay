"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon } from "@/components/dashboard/DashboardIcons";
import { buildAiPrompt } from "@/lib/dashboard/aiPrompt";

const PLACEHOLDER_KEY = "<paste one of your active keys here>";

export function AiPromptCard() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(buildAiPrompt(PLACEHOLDER_KEY));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-6 rounded-lg border border-hairline bg-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-caption uppercase tracking-[0.1em] text-brand-blue">
            Copy for AI
          </p>
          <h2 className="mt-2 text-body-md-medium text-ink">
            Paste this into Cursor, Claude, or ChatGPT
          </h2>
          <p className="mt-1 max-w-xl text-body-sm text-charcoal">
            Generates a ready-to-use context blob — the endpoint shape, auth header,
            error format, and idempotency notes — so your AI tool understands Relay
            immediately instead of guessing.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-2 rounded-full border border-hairline px-4 py-2 text-body-sm text-ink transition-colors hover:border-brand-blue/40"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy prompt"}
        </button>
      </div>
      <p className="mt-4 font-mono text-caption text-steel">
        Uses a placeholder for the key — swap in one of your active keys above before
        pasting, or copy the real one straight from the reveal dialog when you create
        a new key.
      </p>
    </div>
  );
}
