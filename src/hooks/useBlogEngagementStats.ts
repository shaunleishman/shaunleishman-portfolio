"use client";

import { useCallback, useEffect, useState } from "react";
import type { BlogEngagementStats } from "@/lib/blog-engagement-shared";
import { fetchBlogEngagementStats } from "@/lib/blog-engagement-client";

const REFRESH_INTERVAL_MS = 20_000;

export function useBlogEngagementStats(slug: string, initialStats: BlogEngagementStats) {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    setStats(initialStats);
  }, [initialStats, slug]);

  const refreshStats = useCallback(async () => {
    const next = await fetchBlogEngagementStats(slug);
    if (next) setStats(next);
  }, [slug]);

  useEffect(() => {
    void refreshStats();

    const interval = window.setInterval(() => {
      void refreshStats();
    }, REFRESH_INTERVAL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void refreshStats();
      }
    };

    window.addEventListener("focus", refreshStats);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refreshStats);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refreshStats]);

  return { stats, setStats, refreshStats };
}
