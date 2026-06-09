"use client";

import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export function EnhanceRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${openSans.className} flex h-full min-h-0 flex-col overflow-hidden text-[#072235] antialiased`}>
      {children}
    </div>
  );
}
