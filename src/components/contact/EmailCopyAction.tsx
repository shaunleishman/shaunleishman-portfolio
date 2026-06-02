"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { siteConfig } from "@/content/projects";
import { cn } from "@/lib/utils";

type EmailCopyActionProps = {
  email?: string;
  className?: string;
};

export function EmailCopyAction({ email = siteConfig.email, className }: EmailCopyActionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = email;
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
            ? "border-[#0d7377]/30 bg-[#0d7377]/5 text-[#0d7377]"
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
