"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConsent } from "@/components/consent/ConsentProvider";
import { CONSENT_CATEGORIES } from "@/lib/consent";

function subscribeToHydration() {
  return () => {};
}

function getHydratedSnapshot() {
  return true;
}

function getServerHydratedSnapshot() {
  return false;
}

/** False on the server and during hydration, then true. Keeps the cookie UI out of the server HTML. */
function useHasHydrated() {
  return useSyncExternalStore(subscribeToHydration, getHydratedSnapshot, getServerHydratedSnapshot);
}

function ConsentToggle({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-4">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 size-4 shrink-0 rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
      />
      <div>
        <label htmlFor={id} className="text-body-sm font-semibold text-[var(--color-text-primary)]">
          {label}
          {disabled ? (
            <span className="ml-2 font-normal text-[var(--color-text-muted)]">(always on)</span>
          ) : null}
        </label>
        <p className="mt-1 text-body-sm text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function CookieConsentSettings() {
  const { settingsOpen, closeSettings, savePreferences, analytics } = useConsent();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathnameRef = useRef<string | null>(null);
  const titleId = useId();
  const [draftAnalytics, setDraftAnalytics] = useState(analytics);
  const [draftSync, setDraftSync] = useState({ open: settingsOpen, analytics });

  if (settingsOpen && (!draftSync.open || draftSync.analytics !== analytics)) {
    setDraftSync({ open: true, analytics });
    setDraftAnalytics(analytics);
  } else if (!settingsOpen && draftSync.open) {
    setDraftSync({ open: false, analytics });
  }

  useEffect(() => {
    const previous = pathnameRef.current;
    pathnameRef.current = pathname;
    // The first pass records the path that mounted the dialog. Closing there
    // would dismiss settings that were opened before this tree mounted.
    if (previous !== null && previous !== pathname) {
      closeSettings();
    }
  }, [pathname, closeSettings]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (settingsOpen && !dialog.open) {
      dialog.showModal();
    } else if (!settingsOpen && dialog.open) {
      dialog.close();
    }
  }, [settingsOpen]);

  const necessary = CONSENT_CATEGORIES.find((c) => c.id === "necessary")!;
  const analyticsCategory = CONSENT_CATEGORIES.find((c) => c.id === "analytics")!;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-hidden={settingsOpen ? undefined : true}
      style={settingsOpen ? undefined : { display: "none" }}
      className="fixed inset-0 z-[10000] m-auto w-[min(100vw-2rem,32rem)] max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-white p-6 text-[var(--color-text-primary)] shadow-2xl backdrop:bg-black/40"
      onClose={closeSettings}
      onCancel={closeSettings}
    >
      <h2 id={titleId} className="text-h4 font-semibold mb-2">
        Cookie settings
      </h2>
      <p className="mb-6 text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
        Choose which optional cookies you are happy with. You can change these at any time. See the{" "}
        <Link href="/privacy" className="text-[var(--color-accent)] underline underline-offset-2">
          privacy notice
        </Link>{" "}
        for more detail.
      </p>

      <div className="space-y-3 mb-6">
        <ConsentToggle
          id="consent-necessary"
          label={necessary.title}
          description={necessary.description}
          checked
          disabled
        />
        <ConsentToggle
          id="consent-analytics"
          label={analyticsCategory.title}
          description={analyticsCategory.description}
          checked={draftAnalytics}
          onChange={setDraftAnalytics}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => savePreferences(draftAnalytics)}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-body-sm font-medium text-white min-h-[44px] hover:bg-[var(--color-accent-hover)]"
        >
          Save preferences
        </button>
        <button
          type="button"
          onClick={closeSettings}
          className="rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-body-sm font-medium min-h-[44px] hover:border-[var(--color-accent)]/40"
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
}

function CookieConsentBanner() {
  const { ready, hasDecided, acceptAll, rejectOptional, openSettings } = useConsent();

  if (!ready || hasDecided) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[9999] border-t border-[var(--color-border)] bg-white/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-6"
    >
      <div className="container-site flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-body-sm font-semibold text-[var(--color-text-primary)] mb-1">Cookies on this site</p>
          <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
            We use necessary cookies to remember your choice after you accept. With your permission, we also
            collect anonymous analytics to understand how the portfolio is used and improve it. If you leave
            without accepting, we will ask again on your next visit.{" "}
            <Link href="/privacy" className="text-[var(--color-accent)] underline underline-offset-2">
              Privacy notice
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-body-sm font-medium text-white min-h-[44px] hover:bg-[var(--color-accent-hover)]"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={rejectOptional}
            className="rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-body-sm font-medium min-h-[44px] hover:border-[var(--color-accent)]/40"
          >
            Reject optional
          </button>
          <button
            type="button"
            onClick={openSettings}
            className="rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-body-sm font-medium min-h-[44px] hover:border-[var(--color-accent)]/40"
          >
            Manage settings
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieConsent() {
  const hydrated = useHasHydrated();
  if (!hydrated) return null;

  return (
    <>
      <CookieConsentBanner />
      <CookieConsentSettings />
    </>
  );
}
