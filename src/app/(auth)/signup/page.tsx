import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create an account — Relay",
  description: "Create your Relay account.",
};

export default function SignupPage() {
  return <SignupForm />;
}
