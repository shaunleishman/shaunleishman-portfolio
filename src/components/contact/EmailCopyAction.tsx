"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type EmailCopyActionProps = {
  /** Passed in from the server page so this module does not import the project catalog. */
  email: string;
  className?: string;
};

const COPIED_RESET_MS = 2000;

/**
 * Last-resort copy when the async clipboard API is missing or rejects.
 * The field is fixed and off-screen so it cannot widen the page. Focus is
 * returned only if removing the field left focus on the document body.
 */
function copyWithHiddenField(text: string): boolean {
  const restore = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.setAttribute("aria-hidden", "true");
  field.tabIndex = -1;
  field.style.position = "fixed";
  field.style.left = "-9999px";
  field.style.top = "0";
  document.body.appendChild(field);
  field.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  } finally {
    field.remove();
  }
  if (restore && (document.activeElement === document.body || document.activeElement === null)) {
    restore.focus({ preventScroll: true });
  }
  return ok;
}

export function EmailCopyAction({ email, className }: EmailCopyActionProps) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);
  const attemptRef = useRef(0);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    const attempt = ++attemptRef.current;
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    let ok = false;
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        ok = true;
      } catch {
        ok = false;
      }
    }
    if (!ok) {
      ok = copyWithHiddenField(email);
    }

    if (attempt !== attemptRef.current) return;

    if (!ok) {
      setCopied(false);
      return;
    }

    setCopied(true);
    resetTimerRef.current = window.setTimeout(() => {
      resetTimerRef.current = null;
      setCopied(false);
    }, COPIED_RESET_MS);
  }, [email]);

  return (
    <div className={cn("flex min-h-[44px] flex-col gap-2 sm:flex-row sm:items-center sm:gap-3", className)}>
      <span className="text-body-sm font-medium text-[var(--color-text-primary)] break-all">{email}</span>
      <button
        type="button"
        onClick={() => void handleCopy()}
        className={cn(
          "inline-flex size-10 shrink-0 items-center justify-center self-start rounded-full border transition-colors",
          copied
            ? "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-[var(--color-accent)]"
            : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        )}
        aria-label={copied ? "Email copied to clipboard" : `Copy ${email} to clipboard`}
        title={copied ? "Copied" : "Copy email"}
      >
        {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
