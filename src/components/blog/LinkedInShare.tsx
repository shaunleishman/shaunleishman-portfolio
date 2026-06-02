"use client";

import { useMemo } from "react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { cn } from "@/lib/utils";

type LinkedInShareProps = {
  url: string;
  title: string;
  className?: string;
};

export function LinkedInShare({ url, title, className }: LinkedInShareProps) {
  const linkedInHref = useMemo(
    () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    [url],
  );

  return (
    <div className={cn("not-prose", className)}>
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-5 py-2 text-body-sm font-medium text-white transition-colors hover:bg-[#004182]"
        aria-label={`Share "${title}" on LinkedIn`}
      >
        <LinkedInIcon size={18} />
        Share on LinkedIn
      </a>
    </div>
  );
}
