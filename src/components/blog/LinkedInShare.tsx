"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { cn } from "@/lib/utils";

type LinkedInShareProps = {
  url: string;
  title: string;
  className?: string;
};

export function LinkedInShare({ url, title, className }: LinkedInShareProps) {
  const [copied, setCopied] = useState(false);

  const linkedInHref = useMemo(
    () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    [url],
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  return (
    <div className={cn("not-prose", className)}>
      <p className="text-body-sm text-[var(--color-text-muted)] mb-4">
        Enjoyed this? Share it on LinkedIn or copy the link.
      </p>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-4">
        <p className="text-body-sm font-mono text-[var(--color-text-primary)] break-all">{url}</p>

        <div className="mt-4 flex flex-wrap gap-2">
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

          <button
            type="button"
            onClick={() => void handleCopy()}
            className={cn(
              "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border px-5 py-2 text-body-sm font-medium transition-colors",
              copied
                ? "border-[#0d7377]/30 bg-[#0d7377]/5 text-[#0d7377]"
                : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
            )}
            aria-label={copied ? "Link copied to clipboard" : "Copy link to clipboard"}
          >
            {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    </div>
  );
}
