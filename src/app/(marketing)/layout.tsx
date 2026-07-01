import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <>
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
