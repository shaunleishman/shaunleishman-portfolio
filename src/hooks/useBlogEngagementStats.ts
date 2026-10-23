"use client";

import { useCallback, useEffect, useState } from "react";
import {
  mergeBlogEngagementStats,
  type BlogEngagementStats,
} from "@/lib/blog-engagement-shared";
import { fetchBlogEngagementMap, fetchBlogEngagementStats } from "@/lib/blog-engagement-client";

const REFRESH_INTERVAL_MS = 20_000;

export function useBlogEngagementStats(slug: string, initialStats: BlogEngagementStats) {
  const [stats, setStats] = useState(initialStats);
  const [trackedSlug, setTrackedSlug] = useState(slug);

  // Reset only when the article changes. A new object with the same counts
  // (inline props, parent re-render) must not wipe an optimistic like.
  if (slug !== trackedSlug) {
    setTrackedSlug(slug);
    setStats(initialStats);
  }

  const refreshStats = useCallback(async () => {
    const requestedSlug = slug;
    const next = await fetchBlogEngagementStats(requestedSlug);
    if (!next) return;

    setStats((current) => {
      if (current.slug !== requestedSlug) return current;
      return mergeBlogEngagementStats(current, next);
    });
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const next = await fetchBlogEngagementStats(slug);
      if (cancelled || !next) return;
      setStats((current) => {
        if (current.slug !== slug) return current;
        return mergeBlogEngagementStats(current, next);
      });
    }

    void load();

    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      void refreshStats();
    }, REFRESH_INTERVAL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void refreshStats();
      }
    };

    window.addEventListener("focus", onVisible);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", onVisible);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refreshStats, slug]);

  return { stats, setStats, refreshStats };
}

/**
 * Static blog index HTML is built from the local file, which does not see
 * blob writes. Refresh once on mount and again when the tab is shown.
 */
export function useBlogEngagementMap(initial: Record<string, BlogEngagementStats>) {
  const [map, setMap] = useState(initial);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      const posts = await fetchBlogEngagementMap();
      if (!posts || cancelled) return;

      setMap((current) => {
        let changed = false;
        const next = { ...current };

        for (const [slug, stats] of Object.entries(posts)) {
          const existing = next[slug];
          const merged = existing ? mergeBlogEngagementStats(existing, stats) : stats;
          if (
            !existing ||
            existing.views !== merged.views ||
            existing.likes !== merged.likes ||
            existing.shares !== merged.shares
          ) {
            changed = true;
            next[slug] = merged;
          }
        }

        return changed ? next : current;
      });
    }

    void refresh();

    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };

    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return map;
}
