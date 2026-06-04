import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { MetricsHeatmapOverlay } from "@/components/metrics/MetricsHeatmapOverlay";
import { siteConfig } from "@/content/projects";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | UX/UI Designer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  openGraph: {
    title: `${siteConfig.name} | UX/UI Designer`,
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
        <ConsentProvider>
          <Suspense fallback={null}>
            <AnalyticsProvider>{children}</AnalyticsProvider>
            <MetricsHeatmapOverlay />
            <CookieConsent />
          </Suspense>
        </ConsentProvider>
      </body>
    </html>
  );
}
