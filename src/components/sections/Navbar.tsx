"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";

const links = [
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/changelog" },
];

interface NavbarProps {
  user?: { email: string; name: string } | null;
}

export function Navbar({ user = null }: NavbarProps) {
  const router = useRouter();
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 120],
    ["rgba(11,13,16,0)", "rgba(11,13,16,0.82)"]
  );
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const blur = useTransform(scrollY, [0, 120], [0, 12]);
  const backdropFilter = useTransform(blur, (v) => `blur(${v}px)`);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <motion.header
      style={{ background, backdropFilter }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-hairline"
      />
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <Link href="/" className="flex items-center gap-2 text-body-md-medium text-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-brand-blue font-mono text-xs text-on-brand">
            R
          </span>
          relay
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-body-sm text-slate transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {user ? (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Log out
            </Button>
            <Button variant="primary" size="sm" href="/dashboard">
              Dashboard
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" href="/login">
              Sign in
            </Button>
            <Button variant="primary" size="sm" href="/signup">
              Get API key
            </Button>
          </div>
        )}
      </motion.nav>
    </motion.header>
  );
}
