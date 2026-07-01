import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in — Relay",
  description: "Sign in to your Relay account.",
};

export default function LoginPage() {
  return <LoginForm />;
}
