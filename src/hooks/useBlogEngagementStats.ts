"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  mergeBlogEngagementStats,
  type BlogEngagementStats,
} from "@/lib/blog-engagement-shared";
import { fetchBlogEngagementStats } from "@/lib/blog-engagement-client";

const REFRESH_INTERVAL_MS = 20_000;

export function useBlogEngagementStats(slug: string, initialStats: BlogEngagementStats) {
  const [stats, setStats] = useState(initialStats);
  const slugRef = useRef(slug);
  const statsRef = useRef(stats);
  const { views, likes, shares } = initialStats;
  const [seenServerStats, setSeenServerStats] = useState({ slug, views, likes, shares });

  if (
    seenServerStats.slug !== slug ||
    seenServerStats.views !== views ||
    seenServerStats.likes !== likes ||
    seenServerStats.shares !== shares
  ) {
    const next = { slug, views, likes, shares };
    setSeenServerStats(next);
    setStats((current) => (current.slug === slug ? mergeBlogEngagementStats(current, next) : next));
  }

  useEffect(() => {
    slugRef.current = slug;
    statsRef.current = stats;
  }, [slug, stats]);

  const refreshStats = useCallback(async () => {
    const requestedSlug = slug;
    const next = await fetchBlogEngagementStats(requestedSlug);
    if (!next || slugRef.current !== requestedSlug) return;
    setStats((current) => mergeBlogEngagementStats(current, next));
  }, [slug]);

  useEffect(() => {
    void refreshStats();

    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
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

  return { stats, setStats, refreshStats, statsRef };
}
