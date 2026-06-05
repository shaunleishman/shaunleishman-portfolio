"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Heart } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import {
  blogPostPath,
  formatEngagementCount,
  type BlogEngagementStats,
} from "@/lib/blog-engagement-shared";
import {
  hasLikedBlogPost,
  markBlogPostLiked,
  recordBlogArticleView,
  trackBlogEngagement,
} from "@/lib/analytics-client";
import { useBlogEngagementStats } from "@/hooks/useBlogEngagementStats";
import { cn } from "@/lib/utils";
import { BlogEngagementStatsDisplay } from "@/components/blog/BlogEngagementStats";

type BlogPostEngagementContextValue = {
  slug: string;
  title: string;
  shareUrl: string;
  stats: BlogEngagementStats;
  liked: boolean;
  liking: boolean;
  handleLike: () => Promise<void>;
  linkedInHref: string;
  handleShare: () => Promise<void>;
};

const BlogPostEngagementContext = createContext<BlogPostEngagementContextValue | null>(
  null,
);

function useBlogPostEngagement() {
  const value = useContext(BlogPostEngagementContext);
  if (!value) {
    throw new Error("BlogPostEngagementToolbar must be used within BlogPostEngagement");
  }
  return value;
}

type BlogPostEngagementProps = {
  slug: string;
  title: string;
  shareUrl: string;
  initialStats: BlogEngagementStats;
  children: React.ReactNode;
};

export function BlogPostEngagement({
  slug,
  title,
  shareUrl,
  initialStats,
  children,
}: BlogPostEngagementProps) {
  const { stats, setStats, refreshStats } = useBlogEngagementStats(slug, initialStats);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    setLiked(hasLikedBlogPost(slug));
  }, [slug]);

  useEffect(() => {
    void recordBlogArticleView(slug).then((stats) => {
      if (stats) setStats(stats);
    });
  }, [slug]);

  const linkedInHref = useMemo(
    () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    [shareUrl],
  );

  const handleLike = useCallback(async () => {
    if (liked || liking) return;

    setLiking(true);
    const result = await trackBlogEngagement("blog_like", blogPostPath(slug), { slug });
    if (result.ok) {
      markBlogPostLiked(slug);
      setLiked(true);
      if (result.stats) {
        setStats(result.stats);
      } else {
        setStats((current) => ({ ...current, likes: current.likes + 1 }));
      }
      await refreshStats();
    }
    setLiking(false);
  }, [liked, liking, refreshStats, slug]);

  const handleShare = useCallback(async () => {
    const result = await trackBlogEngagement("blog_share", blogPostPath(slug), {
      slug,
      channel: "linkedin",
    });
    if (result.ok) {
      if (result.stats) {
        setStats(result.stats);
      } else {
        setStats((current) => ({ ...current, shares: current.shares + 1 }));
      }
      await refreshStats();
    }
  }, [refreshStats, slug]);

  const value = useMemo(
    () => ({
      slug,
      title,
      shareUrl,
      stats,
      liked,
      liking,
      handleLike,
      linkedInHref,
      handleShare,
    }),
    [slug, title, shareUrl, stats, liked, liking, handleLike, linkedInHref, handleShare],
  );

  return (
    <BlogPostEngagementContext.Provider value={value}>
      {children}
    </BlogPostEngagementContext.Provider>
  );
}

type BlogPostEngagementToolbarProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function BlogPostEngagementStats({
  variant = "light",
  className,
}: BlogPostEngagementToolbarProps) {
  const { stats } = useBlogPostEngagement();

  return (
    <BlogEngagementStatsDisplay
      stats={stats}
      dark={variant === "dark"}
      className={className}
    />
  );
}

export function BlogPostEngagementToolbar({
  variant = "light",
  className,
}: BlogPostEngagementToolbarProps) {
  const { title, stats, liked, liking, handleLike, linkedInHref, handleShare } =
    useBlogPostEngagement();

  const isDark = variant === "dark";

  return (
    <div className={cn("not-prose flex flex-wrap items-center gap-3", className)}>
      <button
        type="button"
        onClick={() => void handleLike()}
        disabled={liked || liking}
        aria-pressed={liked}
        className={cn(
          "inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-body-sm font-medium transition-colors",
          isDark
            ? liked
              ? "border-white/25 bg-white/10 text-neutral-200"
              : "border-white/15 bg-transparent text-neutral-400 hover:border-white/25 hover:text-neutral-200"
            : liked
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
              : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40",
        )}
      >
        <Heart className={cn("size-4", liked && "fill-current")} aria-hidden />
        {liked ? "Liked" : "Like"}
        <span
          className={cn(
            "tabular-nums",
            isDark ? "text-neutral-500" : "text-[var(--color-text-muted)]",
          )}
        >
          ({formatEngagementCount(stats.likes)})
        </span>
      </button>

      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => void handleShare()}
        className={cn(
          "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-4 py-2 text-body-sm font-medium transition-colors",
          isDark
            ? "border border-white/15 bg-transparent text-neutral-400 hover:border-white/25 hover:text-neutral-200"
            : "bg-[#0A66C2] px-5 text-white hover:bg-[#004182]",
        )}
        aria-label={`Share "${title}" on LinkedIn`}
      >
        <LinkedInIcon size={18} />
        Share on LinkedIn
      </a>

      {!isDark && (
        <span className="text-body-sm tabular-nums text-[var(--color-text-muted)]">
          {formatEngagementCount(stats.shares)} shares
        </span>
      )}
    </div>
  );
}
