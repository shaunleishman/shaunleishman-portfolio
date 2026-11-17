"use client";

import { useMemo } from "react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import {
  blogPostPath,
  bumpEngagementCount,
  formatEngagementCount,
  reconcileEngagementAction,
} from "@/lib/blog-engagement-shared";
import { trackBlogEngagement } from "@/lib/analytics-client";
import { useBlogEngagementStats } from "@/hooks/useBlogEngagementStats";
import { cn } from "@/lib/utils";

type LinkedInShareProps = {
  url: string;
  title: string;
  slug: string;
  initialShareCount?: number;
  className?: string;
};

export function LinkedInShare({
  url,
  title,
  slug,
  initialShareCount = 0,
  className,
}: LinkedInShareProps) {
  const { stats, setStats, statsRef } = useBlogEngagementStats(slug, {
    slug,
    views: 0,
    likes: 0,
    shares: initialShareCount,
  });

  const linkedInHref = useMemo(
    () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    [url],
  );

  async function handleShare() {
    const baseline = statsRef.current.shares;
    setStats((current) => bumpEngagementCount(current, slug, "shares", 1));

    const result = await trackBlogEngagement("blog_share", blogPostPath(slug), {
      slug,
      channel: "linkedin",
    });
    if (result.ok) {
      if (result.stats) {
        const incoming = result.stats;
        setStats((current) =>
          reconcileEngagementAction(current, incoming, "shares", result.changed === true, baseline),
        );
      }
    } else {
      setStats((current) =>
        current.slug === slug && current.shares === baseline + 1
          ? bumpEngagementCount(current, slug, "shares", -1)
          : current,
      );
    }
  }

  return (
    <div className={cn("not-prose flex flex-wrap items-center gap-3", className)}>
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => void handleShare()}
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-5 py-2 text-body-sm font-medium text-white transition-colors hover:bg-[#004182]"
        aria-label={`Share "${title}" on LinkedIn`}
      >
        <LinkedInIcon size={18} />
        Share on LinkedIn
      </a>
      <span className="text-body-sm text-[var(--color-text-muted)] tabular-nums">
        {formatEngagementCount(stats.shares)} shares
      </span>
    </div>
  );
}
