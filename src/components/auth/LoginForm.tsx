"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AuthInput } from "@/components/auth/AuthInput";
import { PasswordField } from "@/components/auth/PasswordField";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { SocialButton } from "@/components/auth/SocialButton";
import { MailIcon, LockIcon, GithubIcon, GoogleIcon, ArrowRightIcon } from "@/components/auth/AuthIcons";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    const data = await res.json().catch(() => null);
    setError(data?.error ?? "Something went wrong. Try again.");
    setLoading(false);
  }

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex flex-col"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-8">
        <p className="font-mono text-caption uppercase tracking-[0.15em] text-brand-blue">
          Welcome back
        </p>
        <h1 className="mt-3 text-heading-2 text-ink">Sign in</h1>
        <p className="mt-2 text-body-sm text-charcoal">
          Enter your credentials to access your account.
        </p>
      </motion.div>

      {/* Social buttons */}
      <motion.div variants={fadeUp} className="flex gap-3">
        <SocialButton icon={<GoogleIcon />} label="Google" className="flex-1" />
        <SocialButton icon={<GithubIcon />} label="GitHub" className="flex-1" />
      </motion.div>

      <motion.div variants={fadeUp} className="my-6">
        <AuthDivider text="or continue with email" />
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-lg border border-brand-error/20 bg-brand-error/5 px-4 py-3 text-body-sm text-brand-error">
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={fadeUp}>
          <AuthInput
            label="Email address"
            name="email"
            type="email"
            required
            autoComplete="email"
            icon={<MailIcon />}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <PasswordField
            label="Password"
            name="password"
            autoComplete="current-password"
            icon={<LockIcon />}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 rounded border-hairline bg-canvas-dark accent-brand-blue"
            />
            <span className="text-caption text-charcoal">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-caption font-medium text-brand-blue transition-colors hover:text-ink"
          >
            Forgot password?
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-2">
          <Button type="submit" variant="primary" disabled={loading} className="w-full gap-2">
            {loading ? (
              "Signing in…"
            ) : (
              <>
                Sign in
                <ArrowRightIcon />
              </>
            )}
          </Button>
        </motion.div>
      </form>

      {/* Footer */}
      <motion.p variants={fadeUp} className="mt-8 text-center text-body-sm text-charcoal">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-brand-blue transition-colors hover:text-ink"
        >
          Create one
        </Link>
      </motion.p>
    </motion.div>
  );
}
