import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <>
      <Navbar user={user} />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:grid md:grid-cols-[220px_1fr] md:gap-12 md:pt-40">
        <aside className="mb-10 md:sticky md:top-32 md:mb-0 md:h-fit">
          <DocsSidebar />
        </aside>
        <div className="min-w-0 text-body-sm text-charcoal">{children}</div>
      </main>
      <Footer />
    </>
  );
}
