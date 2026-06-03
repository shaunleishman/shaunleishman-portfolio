"use client";

import { useMemo, useState } from "react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { blogPostPath, formatEngagementCount } from "@/lib/blog-engagement-shared";
import { trackAnalyticsEvent } from "@/lib/analytics-client";
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
  const [shareCount, setShareCount] = useState(initialShareCount);

  const linkedInHref = useMemo(
    () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    [url],
  );

  async function handleShare() {
    const ok = await trackAnalyticsEvent("blog_share", blogPostPath(slug), {
      slug,
      channel: "linkedin",
    });
    if (ok) {
      setShareCount((count) => count + 1);
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
        {formatEngagementCount(shareCount)} shares
      </span>
    </div>
  );
}
