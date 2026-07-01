export function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav className="hidden xl:block">
      <p className="mb-3 font-mono text-caption uppercase tracking-[0.1em] text-steel">
        On this page
      </p>
      <ul className="flex flex-col gap-2 border-l border-hairline-soft pl-4 text-body-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-charcoal transition-colors hover:text-ink">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
