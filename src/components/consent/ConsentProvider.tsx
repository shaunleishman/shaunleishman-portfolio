"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  CONSENT_UPDATED_EVENT,
  getDefaultConsent,
  isBannerDismissedForSession,
  readConsentFromStorage,
  rejectOptionalForSession,
  saveConsentPreferences,
  type StoredConsent,
} from "@/lib/consent";

type ConsentContextValue = {
  ready: boolean;
  hasDecided: boolean;
  analytics: boolean;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (analytics: boolean) => void;
  openSettings: () => void;
  closeSettings: () => void;
  settingsOpen: boolean;
};

type ConsentSnapshot = {
  consent: StoredConsent;
  sessionBannerDismissed: boolean;
};

const SERVER_CONSENT_SNAPSHOT: ConsentSnapshot = {
  consent: getDefaultConsent(),
  sessionBannerDismissed: false,
};

let clientConsentSnapshot: ConsentSnapshot = SERVER_CONSENT_SNAPSHOT;

function consentSnapshotsMatch(snapshot: ConsentSnapshot, consent: StoredConsent, dismissed: boolean) {
  return (
    snapshot.sessionBannerDismissed === dismissed &&
    snapshot.consent.hasDecided === consent.hasDecided &&
    snapshot.consent.analytics === consent.analytics &&
    snapshot.consent.updatedAt === consent.updatedAt
  );
}

function getConsentServerSnapshot() {
  return SERVER_CONSENT_SNAPSHOT;
}

function getConsentClientSnapshot() {
  const consent = readConsentFromStorage();
  const sessionBannerDismissed = isBannerDismissedForSession();
  if (consentSnapshotsMatch(clientConsentSnapshot, consent, sessionBannerDismissed)) {
    return clientConsentSnapshot;
  }
  clientConsentSnapshot = { consent, sessionBannerDismissed };
  return clientConsentSnapshot;
}

function subscribeToConsent(onChange: () => void) {
  window.addEventListener(CONSENT_UPDATED_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onChange);
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  // Server snapshot stays undecided. Session storage is read only in the client snapshot,
  // after hydration, so the banner does not render from a stored choice on the first pass.
  const { consent, sessionBannerDismissed } = useSyncExternalStore(
    subscribeToConsent,
    getConsentClientSnapshot,
    getConsentServerSnapshot,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  const acceptAll = useCallback(() => {
    saveConsentPreferences(true);
    setSettingsOpen(false);
  }, []);

  const rejectOptional = useCallback(() => {
    rejectOptionalForSession();
    setSettingsOpen(false);
  }, []);

  const savePreferences = useCallback((analytics: boolean) => {
    saveConsentPreferences(analytics);
    setSettingsOpen(false);
  }, []);

  const openSettings = useCallback(() => {
    setSettingsOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      ready: true,
      hasDecided: consent.hasDecided || sessionBannerDismissed,
      analytics: consent.analytics,
      acceptAll,
      rejectOptional,
      savePreferences,
      openSettings,
      closeSettings,
      settingsOpen,
    }),
    [
      acceptAll,
      closeSettings,
      consent,
      openSettings,
      rejectOptional,
      savePreferences,
      sessionBannerDismissed,
      settingsOpen,
    ],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
