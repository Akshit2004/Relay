export function AuthDivider({ text = "or" }: { text?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-hairline" />
      <span className="font-mono text-caption uppercase tracking-[0.15em] text-steel">
        {text}
      </span>
      <div className="h-px flex-1 bg-hairline" />
    </div>
  );
}
