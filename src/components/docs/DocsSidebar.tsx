"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  {
    heading: "Getting started",
    links: [
      { label: "Quickstart", href: "/docs" },
      { label: "Authentication", href: "/docs/authentication" },
      { label: "Templates", href: "/docs/templates" },
      { label: "Errors", href: "/docs/errors" },
    ],
  },
  {
    heading: "Guides",
    links: [{ label: "All guides", href: "/guides" }],
  },
  {
    heading: "Reference",
    links: [
      { label: "API Reference", href: "/api-reference" },
      { label: "Webhooks", href: "/webhooks" },
      { label: "SDKs", href: "/sdks" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-8 text-body-sm">
      {NAV.map((group) => (
        <div key={group.heading}>
          <p className="mb-3 font-mono text-caption uppercase tracking-[0.1em] text-steel">
            {group.heading}
          </p>
          <ul className="flex flex-col gap-1">
            {group.links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-sm px-3 py-1.5 transition-colors duration-200",
                      active
                        ? "bg-brand-blue-soft text-brand-blue"
                        : "text-charcoal hover:text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
