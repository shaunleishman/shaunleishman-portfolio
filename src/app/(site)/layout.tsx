import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PageEnter } from "@/components/layout/PageEnter";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <ScrollProgress />
      <main id="main-content" className="flex-1">
        <PageEnter>{children}</PageEnter>
      </main>
      <Footer />
    </>
  );
}
