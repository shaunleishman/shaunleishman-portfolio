"use client";

import { Open_Sans } from "next/font/google";
import "./tokens.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export function ArbncoDesignSystemRoot({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`arbnco-ds ${openSans.className} flex h-full min-h-0 flex-1 flex-col text-[#4a5453] antialiased`}
      data-design-system="arbnco"
    >
      {children}
    </div>
  );
}
