import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { siteConfig } from "@/content/projects";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — UX/UI Designer`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  openGraph: {
    title: `${siteConfig.name} — UX/UI Designer`,
    description: siteConfig.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AnalyticsProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
