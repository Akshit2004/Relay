import Link from "next/link";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API Reference", href: "/api-reference" },
      { label: "SDKs", href: "/sdks" },
      { label: "Guides", href: "/guides" },
      { label: "Webhooks", href: "/webhooks" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline-soft px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-body-md-medium text-ink">
              <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-brand-blue font-mono text-xs text-on-brand">
                R
              </span>
              relay
            </Link>
            <p className="mt-4 max-w-xs text-body-sm text-steel">
              The easiest infrastructure API for developers who&apos;d rather
              ship than integrate.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-caption uppercase tracking-[0.1em] text-steel">
                {col.title}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-charcoal transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-hairline-soft pt-8 md:flex-row">
          <p className="text-caption text-steel">
            © {new Date().getFullYear()} Relay. All requests logged, none of them lost.
          </p>
          <div className="flex items-center gap-6">
            {["GitHub", "X", "Discord"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-body-sm text-slate transition-colors hover:text-ink"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
