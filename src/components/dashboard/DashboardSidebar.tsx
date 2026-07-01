"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  OverviewIcon,
  LogsIcon,
  KeyIcon,
  TemplateIcon,
  WebhookIcon,
  SettingsIcon,
} from "@/components/dashboard/DashboardIcons";

const NAV = [
  { label: "Overview", href: "/dashboard", icon: OverviewIcon },
  { label: "API Keys", href: "/dashboard/api-keys", icon: KeyIcon },
  { label: "Logs", href: "/dashboard/logs", icon: LogsIcon },
  { label: "Templates", href: "/dashboard/templates", icon: TemplateIcon },
  { label: "Webhooks", href: "/dashboard/webhooks", icon: WebhookIcon },
  { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
];

function isActive(pathname: string, href: string) {
  return href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}

export function DashboardSidebar({ user }: { user: { email: string; name: string } }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <>
      {/* Desktop: fixed left sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-hairline bg-surface md:flex">
        <Link href="/" className="flex items-center gap-2 px-5 py-5 text-body-md-medium text-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-brand-blue font-mono text-xs text-on-brand">
            R
          </span>
          relay
        </Link>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-sm px-3 py-2 text-body-sm transition-colors duration-200",
                  active ? "bg-brand-blue-soft text-brand-blue" : "text-slate hover:text-ink"
                )}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-hairline-soft px-3 py-4">
          <div className="min-w-0 px-3 py-2">
            <p className="truncate text-body-sm text-ink">{user.name}</p>
            <p className="truncate font-mono text-caption text-steel">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-1 w-full rounded-sm px-3 py-2 text-left text-body-sm text-slate transition-colors hover:text-ink"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile: horizontal top bar */}
      <div className="flex flex-col border-b border-hairline bg-surface md:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2 text-body-md-medium text-ink">
            <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-brand-blue font-mono text-xs text-on-brand">
              R
            </span>
            relay
          </Link>
          <button onClick={handleLogout} className="text-body-sm text-slate hover:text-ink">
            Log out
          </button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-caption transition-colors duration-200",
                  active ? "bg-brand-blue-soft text-brand-blue" : "text-slate hover:text-ink"
                )}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
