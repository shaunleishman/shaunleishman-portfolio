"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAdminBase } from "@/hooks/useAdminBase";
import { useHalfHourlyEmbedContext } from "./HalfHourlyEmbedContext";

export function useHalfHourlyNav() {
  const embed = useHalfHourlyEmbedContext();
  const router = useRouter();
  const adminBase = useAdminBase();
  const base = embed?.base ?? `${adminBase}/prototypes/half-hourly`;

  const navigate = useCallback(
    (to: string | number) => {
      if (embed) return;

      if (to === -1) {
        router.back();
        return;
      }
      if (typeof to === "string") {
        if (to === "/") {
          router.push(base);
          return;
        }
        if (to.startsWith("/")) {
          router.push(`${base}${to}`);
          return;
        }
        router.push(to);
      }
    },
    [embed, router, base],
  );

  if (embed) {
    return { navigate: embed.navigate, base: embed.base };
  }

  return { navigate, base };
}
