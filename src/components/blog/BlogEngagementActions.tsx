"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  blogPostPath,
  formatEngagementCount,
  type BlogEngagementStats,
} from "@/lib/blog-engagement-shared";
import {
  hasLikedBlogPost,
  markBlogPostLiked,
  trackBlogEngagement,
} from "@/lib/analytics-client";
import { useBlogEngagementStats } from "@/hooks/useBlogEngagementStats";
import { cn } from "@/lib/utils";

type BlogEngagementActionsProps = {
  slug: string;
  initialStats: BlogEngagementStats;
  className?: string;
};

export function BlogEngagementActions({
  slug,
  initialStats,
  className,
}: BlogEngagementActionsProps) {
  const { stats, refreshStats } = useBlogEngagementStats(slug, initialStats);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    setLiked(hasLikedBlogPost(slug));
  }, [slug]);

  async function handleLike() {
    if (liked || liking) return;

    setLiking(true);
    const ok = await trackBlogEngagement("blog_like", blogPostPath(slug), { slug });
    if (ok) {
      markBlogPostLiked(slug);
      setLiked(true);
      await refreshStats();
    }
    setLiking(false);
  }

  return (
    <div className={cn("not-prose", className)}>
      <button
        type="button"
        onClick={() => void handleLike()}
        disabled={liked || liking}
        aria-pressed={liked}
        className={cn(
          "inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-body-sm font-medium transition-colors",
          liked
            ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
            : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40",
        )}
      >
        <Heart className={cn("size-4", liked && "fill-current")} aria-hidden />
        {liked ? "Liked" : "Like"}
        <span className="tabular-nums text-[var(--color-text-muted)]">
          ({formatEngagementCount(stats.likes)})
        </span>
      </button>
    </div>
  );
}
