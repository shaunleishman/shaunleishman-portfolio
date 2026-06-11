"use client";

import { Open_Sans, Raleway } from "next/font/google";
import "@/design-systems/arbnco/tokens.css";
import "@/design-systems/arbnco/dropdown.css";
import "@/design-systems/arbnco/input-field.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export function HalfHourlyRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className={`arbnco-ds ${openSans.className} flex h-full min-h-0 flex-col overflow-hidden text-[var(--color-text-primary)] antialiased`}>
      <style jsx global>{`
        .hh-display {
          font-family: ${raleway.style.fontFamily}, Raleway, sans-serif;
        }
      `}</style>
      {children}
    </div>
  );
}
