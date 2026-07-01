import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthBrandPanel } from "@/components/auth/AuthBrandPanel";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <div className="flex min-h-screen">
      {/* Left: Brand panel — hidden on mobile */}
      <div className="hidden lg:block lg:w-1/2 xl:w-[55%]">
        <AuthBrandPanel />
      </div>

      {/* Right: Form panel */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 xl:w-[45%]">
        {/* Subtle top gradient on the form side */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(61,127,255,0.04) 0%, transparent 60%)",
          }}
        />

        {/* Logo — visible on mobile only */}
        <Link
          href="/"
          className="absolute left-6 top-6 z-10 flex items-center gap-2 text-body-sm font-semibold text-ink lg:hidden"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-blue font-mono text-xs text-on-brand">
            R
          </span>
          relay
        </Link>

        <div className="relative z-10 w-full max-w-[420px]">{children}</div>

        {/* Bottom branding on form side */}
        <p className="absolute bottom-6 text-caption text-steel">
          © {new Date().getFullYear()} Relay. All rights reserved.
        </p>
      </div>
    </div>
  );
}
