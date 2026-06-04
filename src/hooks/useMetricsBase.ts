"use client";

import { usePathname } from "next/navigation";

const SUB_ROUTES = ["/content", "/audience", "/insights"] as const;

export function useMetricsBase(): string {
  const pathname = usePathname();
  for (const route of SUB_ROUTES) {
    if (pathname.endsWith(route)) {
      return pathname.slice(0, -route.length) || pathname;
    }
  }
  return pathname;
}
