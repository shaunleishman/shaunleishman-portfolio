"use client";

import { useConsent } from "@/components/consent/ConsentProvider";

type CookieSettingsButtonProps = {
  className?: string;
};

export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  const { openSettings } = useConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className={className ?? "text-neutral-400 underline-offset-4 hover:text-white hover:underline"}
    >
      Cookie settings
    </button>
  );
}
