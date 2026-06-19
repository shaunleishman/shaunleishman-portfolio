"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CopyShareLinkButtonProps = {
  /** Case study slug. The shared URL is `${origin}/case-studies/${slug}`. */
  slug: string;
  className?: string;
  /**
   * "compact" suits dense contexts like gallery cards; "prominent" reads like a
   * primary Share action in a detail header. Defaults to "prominent".
   */
  variant?: "compact" | "prominent";
};

const RESET_DELAY_MS = 2000;

type CopyState = "idle" | "copied" | "error";

/** Builds the public, unlisted share URL for a case study report. SSR-safe (no `window` at render). */
function buildShareUrl(slug: string): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/case-studies/${slug}`;
}

/** Last-resort clipboard copy for insecure contexts where `navigator.clipboard` is unavailable. */
function legacyCopy(text: string): boolean {
  if (typeof document === "undefined") return false;
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.top = "-9999px";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(input);
  return ok;
}

/**
 * Google-Drive-style "Copy link" button. Copies the public report URL to the
 * clipboard and shows a transient "Copied!" confirmation. Self-contained:
 * React state + lucide-react only, no tokens/API.
 */
export function CopyShareLinkButton({
  slug,
  className,
  variant = "prominent",
}: CopyShareLinkButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      // Prevent the surrounding gallery card <Link> from navigating.
      event.preventDefault();
      event.stopPropagation();

      const url = buildShareUrl(slug);
      let copied = false;

      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(url);
          copied = true;
        } catch {
          copied = false;
        }
      }

      if (!copied) {
        copied = legacyCopy(url);
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (copied) {
        setState("copied");
        setCopiedUrl(null);
      } else {
        // Surface the URL so the user can copy it manually.
        setState("error");
        setCopiedUrl(url);
      }

      timeoutRef.current = setTimeout(() => {
        setState("idle");
        setCopiedUrl(null);
      }, RESET_DELAY_MS);
    },
    [slug],
  );

  const isCopied = state === "copied";
  const isError = state === "error";
  const label = isCopied ? "Copied!" : isError ? "Copy failed" : "Copy link";
  const Icon = isCopied ? Check : Link2;

  const isCompact = variant === "compact";

  return (
    <div className={cn("inline-flex flex-col items-start gap-1", className)}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy public share link for this case study${isCopied ? " (copied)" : ""}`}
        title="Copy public share link"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors",
          isCompact
            ? "px-3 py-1.5 text-[0.75rem]"
            : "min-h-[44px] px-4 py-2 text-body-sm",
          isCopied
            ? "border-[var(--color-accent)]/40 text-[var(--color-accent)]"
            : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]",
        )}
      >
        <Icon className={isCompact ? "size-3.5" : "size-4"} aria-hidden />
        {label}
      </button>
      {isError && copiedUrl && (
        <span className="text-[0.75rem] text-[var(--color-text-muted)]">
          Copy this link manually:{" "}
          <span className="break-all text-[var(--color-text-secondary)]">{copiedUrl}</span>
        </span>
      )}
    </div>
  );
}
