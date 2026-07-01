export function DocsPageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-10 border-b border-hairline-soft pb-8">
      <h1 className="text-heading-1 text-ink">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-body-md text-charcoal">{description}</p>}
    </div>
  );
}
