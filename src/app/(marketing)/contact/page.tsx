"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

const REASONS = ["General question", "Sales / Enterprise", "Report a bug", "Something else"];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a human"
        subtitle="For Enterprise plans, integration questions, or anything the docs didn't answer."
      />

      <section className="mx-auto max-w-xl px-6 pb-28">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-hairline bg-surface p-8 text-center"
            >
              <p className="text-heading-3 text-ink">Message received.</p>
              <p className="mt-2 text-body-sm text-charcoal">
                We reply to most messages within one business day.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-body-sm text-charcoal">
                  Name
                  <input
                    required
                    type="text"
                    name="name"
                    className="rounded-md border border-hairline bg-canvas-dark px-4 py-2.5 text-ink outline-none transition-colors focus:border-brand-blue"
                  />
                </label>
                <label className="flex flex-col gap-2 text-body-sm text-charcoal">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    className="rounded-md border border-hairline bg-canvas-dark px-4 py-2.5 text-ink outline-none transition-colors focus:border-brand-blue"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-body-sm text-charcoal">
                Reason
                <select
                  name="reason"
                  defaultValue={REASONS[0]}
                  className="rounded-md border border-hairline bg-canvas-dark px-4 py-2.5 text-ink outline-none transition-colors focus:border-brand-blue"
                >
                  {REASONS.map((reason) => (
                    <option key={reason} value={reason} className="bg-canvas-dark">
                      {reason}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-body-sm text-charcoal">
                Message
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="resize-none rounded-md border border-hairline bg-canvas-dark px-4 py-2.5 text-ink outline-none transition-colors focus:border-brand-blue"
                />
              </label>

              <Button type="submit" variant="primary" className="mt-2 w-full sm:w-fit">
                Send message
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
