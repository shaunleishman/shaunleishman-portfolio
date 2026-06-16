"use client";

import { usePathname } from "next/navigation";
import { useMetricsPathContext } from "@/components/admin/MetricsPathProvider";

const ADMIN_SUFFIXES = [
  "/site/content",
  "/site/audience",
  "/site/insights",
  "/site",
  "/case-studies/mg-employees",
  "/case-studies",
  "/design-systems/showcase",
  "/design-systems",
  "/prototypes/half-hourly/project",
  "/prototypes/half-hourly",
  "/prototypes/enhance",
  "/prototypes",
] as const;

function stripProjectSuffix(pathname: string): string | null {
  const projectMatch = pathname.match(/(\/prototypes\/half-hourly\/project\/[^/]+(?:\/edit)?)$/);
  if (projectMatch) {
    return pathname.slice(0, -projectMatch[1].length);
  }
  return null;
}

function normalizePathname(pathname: string, metricsPath: string): string {
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  if (trimmed === "/metrics" || trimmed.startsWith("/metrics/")) {
    return metricsPath + trimmed.slice("/metrics".length);
  }
  return trimmed;
}

/** Secret admin URL base (without section suffix). Always returns the public metrics path. */
export function useAdminBase(): string {
  const metricsPath = useMetricsPathContext();
  const pathname = normalizePathname(usePathname(), metricsPath);

  const projectBase = stripProjectSuffix(pathname);
  if (projectBase) return projectBase;

  for (const suffix of [...ADMIN_SUFFIXES].sort((a, b) => b.length - a.length)) {
    if (pathname.endsWith(suffix)) {
      return pathname.slice(0, -suffix.length) || metricsPath;
    }
  }

  for (const legacy of ["/content", "/audience", "/insights"] as const) {
    if (pathname.endsWith(legacy)) {
      return pathname.slice(0, -legacy.length) || metricsPath;
    }
  }

  if (pathname === metricsPath) return metricsPath;

  return metricsPath;
}

/** Build an admin URL under the secret metrics path. */
export function useAdminHref(...segments: string[]): string {
  const base = useAdminBase();
  const path = segments.filter(Boolean).join("/");
  return path ? `${base}/${path}` : base;
}

/** @deprecated Use useAdminBase */
export function useMetricsBase(): string {
  return useAdminBase();
}
