/**
 * Cookie choice storage.
 *
 * Accept all writes `cookie_consent_v2` with `accepted: true`. That hides the banner on later visits.
 * Reject optional is this visit only. It sets the two session keys and does not write localStorage,
 * so a previous accept stays stored and analytics stays off until the tab closes.
 * Saving analytics off after an accept keeps `accepted: true`. Saving it off before any accept
 * only dismisses the banner until the next visit.
 * Legacy `cookie_consent_v1` is copied once per page load.
 */
export const CONSENT_STORAGE_KEY = "cookie_consent_v2";
export const CONSENT_SESSION_DENY_KEY = "cookie_consent_session_denied";
export const CONSENT_SESSION_BANNER_DISMISS_KEY = "cookie_banner_dismissed_session";
export const CONSENT_UPDATED_EVENT = "cookie-consent-updated";

export type ConsentPreferences = {
  /** ISO timestamp when the user saved their choice */
  updatedAt: string;
  /** Usage analytics: pageviews, scroll, sections, heatmaps, feedback, likes, shares */
  analytics: boolean;
  /** User clicked Accept all — do not show the banner again on future visits */
  accepted: boolean;
};

export type StoredConsent = {
  /** Banner hidden because the user accepted cookies on a prior visit */
  hasDecided: boolean;
  updatedAt: string;
  analytics: boolean;
};

export function getDefaultConsent(): StoredConsent {
  return {
    hasDecided: false,
    updatedAt: "",
    analytics: false,
  };
}

function parseStoredConsent(raw: string | null): StoredConsent {
  if (!raw) return getDefaultConsent();

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentPreferences> & {
      hasDecided?: boolean;
    };

    if (typeof parsed.analytics !== "boolean" || !parsed.updatedAt) {
      return getDefaultConsent();
    }

    const accepted = parsed.accepted === true;

    return {
      hasDecided: accepted,
      updatedAt: parsed.updatedAt,
      analytics: parsed.analytics,
    };
  } catch {
    return getDefaultConsent();
  }
}

const LEGACY_CONSENT_STORAGE_KEY = "cookie_consent_v1";
let legacyConsentChecked = false;

function migrateLegacyConsent(): void {
  if (legacyConsentChecked) return;
  legacyConsentChecked = true;

  const legacy = localStorage.getItem(LEGACY_CONSENT_STORAGE_KEY);
  if (!legacy || localStorage.getItem(CONSENT_STORAGE_KEY)) return;

  try {
    const parsed = JSON.parse(legacy) as {
      analytics?: boolean;
      hasDecided?: boolean;
      updatedAt?: string;
    };
    if (parsed.hasDecided && typeof parsed.analytics === "boolean" && parsed.updatedAt) {
      // No event: this can run while a snapshot is being read.
      storeConsent(parsed.analytics, parsed.analytics, false);
      localStorage.removeItem(LEGACY_CONSENT_STORAGE_KEY);
    }
  } catch {
    localStorage.removeItem(LEGACY_CONSENT_STORAGE_KEY);
  }
}

export function readConsentFromStorage(): StoredConsent {
  if (typeof window === "undefined") return getDefaultConsent();

  migrateLegacyConsent();

  const stored = parseStoredConsent(localStorage.getItem(CONSENT_STORAGE_KEY));
  const sessionDenied = sessionStorage.getItem(CONSENT_SESSION_DENY_KEY) === "1";

  if (sessionDenied) {
    return {
      ...stored,
      analytics: false,
    };
  }

  return stored;
}

function storeConsent(analytics: boolean, accepted: boolean, notify: boolean): StoredConsent {
  const next: StoredConsent = {
    hasDecided: accepted,
    updatedAt: new Date().toISOString(),
    analytics,
  };

  const payload: ConsentPreferences = {
    updatedAt: next.updatedAt,
    analytics,
    accepted,
  };

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));

  if (accepted) {
    sessionStorage.removeItem(CONSENT_SESSION_DENY_KEY);
    sessionStorage.removeItem(CONSENT_SESSION_BANNER_DISMISS_KEY);
  }

  if (notify) window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT));
  return next;
}

export function writeConsentToStorage(analytics: boolean, accepted: boolean): StoredConsent {
  return storeConsent(analytics, accepted, true);
}

function dismissBannerForSession(): void {
  sessionStorage.setItem(CONSENT_SESSION_BANNER_DISMISS_KEY, "1");
}

export function isBannerDismissedForSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(CONSENT_SESSION_BANNER_DISMISS_KEY) === "1";
}

/** Reject optional cookies for this visit only; banner will show again next time. */
export function rejectOptionalForSession(): StoredConsent {
  sessionStorage.setItem(CONSENT_SESSION_DENY_KEY, "1");
  dismissBannerForSession();
  const next = readConsentFromStorage();
  window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT));
  return next;
}

/** Persist the analytics toggle. An existing accept is kept when analytics is turned off. */
export function saveConsentPreferences(analytics: boolean): StoredConsent {
  if (analytics) return writeConsentToStorage(true, true);

  const alreadyAccepted = readConsentFromStorage().hasDecided;
  const next = writeConsentToStorage(false, alreadyAccepted);
  if (!alreadyAccepted) dismissBannerUntilNextVisit();
  return next;
}

export function dismissBannerUntilNextVisit(): void {
  dismissBannerForSession();
  window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT));
}

export function isAnalyticsAllowed(): boolean {
  const consent = readConsentFromStorage();
  return consent.hasDecided && consent.analytics;
}

export const CONSENT_CATEGORIES = [
  {
    id: "necessary" as const,
    title: "Necessary",
    description:
      "Required to remember your cookie choices once you accept. These do not track you across other sites.",
    required: true,
  },
  {
    id: "analytics" as const,
    title: "Analytics",
    description:
      "Helps improve the site by collecting anonymous usage data. That includes pages viewed, scroll depth, section attention, mouse heatmaps, and optional actions like feedback, likes, and shares.",
    required: false,
  },
];
