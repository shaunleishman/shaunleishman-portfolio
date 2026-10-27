"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type EmailCopyActionProps = {
  email: string;
  className?: string;
};

/** Checkmark dwell. A newer copy restarts it; it does not stack. */
const COPY_RESET_MS = 2000;

/**
 * Last-resort copy when `navigator.clipboard` is missing or rejects.
 * `position: fixed` keeps the helper field from widening the page.
 * Focus is restored so the copy button keeps the keyboard position it had.
 */
function legacyCopy(text: string): boolean {
  const active = document.activeElement;
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.tabIndex = -1;
  input.setAttribute("aria-hidden", "true");
  input.style.position = "fixed";
  input.style.inset = "0 auto auto 0";
  input.style.width = "1px";
  input.style.height = "1px";
  input.style.opacity = "0";
  input.style.pointerEvents = "none";
  document.body.appendChild(input);

  let ok = false;
  try {
    input.focus({ preventScroll: true });
    input.select();
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  } finally {
    input.remove();
    if (active instanceof HTMLElement) {
      active.focus({ preventScroll: true });
    }
  }

  return ok;
}

/**
 * Email address plus the icon copy button on the contact card.
 * The address stays plain text. A mailto link would add a second control.
 * The check icon is only shown after a copy that actually succeeded.
 */
export function EmailCopyAction({ email, className }: EmailCopyActionProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    return () => {
      if (resetTimer.current != null) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    const id = ++requestId.current;
    let ok = false;

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        ok = true;
      } catch {
        ok = false;
      }
    }

    if (!ok) ok = legacyCopy(email);
    if (requestId.current !== id) return;

    if (resetTimer.current != null) clearTimeout(resetTimer.current);

    if (!ok) {
      setCopied(false);
      return;
    }

    setCopied(true);
    resetTimer.current = setTimeout(() => {
      resetTimer.current = null;
      setCopied(false);
    }, COPY_RESET_MS);
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
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </div>
  );
}
