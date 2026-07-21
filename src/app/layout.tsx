import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { connection } from "next/server";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { MetricsTrackingExclusionWarmup } from "@/components/analytics/MetricsTrackingExclusionWarmup";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { LazyMetricsHeatmapOverlay } from "@/components/metrics/LazyMetricsHeatmapOverlay";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Nonce-based CSP requires a request. Wait for the connection so Next can
  // attach the middleware nonce to framework scripts.
  await connection();

  return (
    <html lang="en-GB" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ConsentProvider>
          <MetricsTrackingExclusionWarmup />
          <Suspense fallback={null}>
            <AnalyticsProvider>{children}</AnalyticsProvider>
            <LazyMetricsHeatmapOverlay />
            <CookieConsent />
          </Suspense>
        </ConsentProvider>
      </body>
    </html>
  );
}
