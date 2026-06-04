"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONSENT_UPDATED_EVENT,
  isBannerDismissedForSession,
  readConsentFromStorage,
  rejectOptionalForSession,
  writeConsentToStorage,
  dismissBannerUntilNextVisit,
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

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const syncFromStorage = useCallback(() => {
    setConsent(readConsentFromStorage());
  }, []);

  useEffect(() => {
    syncFromStorage();

    const onUpdate = () => syncFromStorage();
    window.addEventListener(CONSENT_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onUpdate);
  }, [syncFromStorage]);

  const acceptAll = useCallback(() => {
    setConsent(writeConsentToStorage(true, true));
    setSettingsOpen(false);
  }, []);

  const rejectOptional = useCallback(() => {
    setConsent(rejectOptionalForSession());
    setSettingsOpen(false);
  }, []);

  const savePreferences = useCallback((analytics: boolean) => {
    if (analytics) {
      setConsent(writeConsentToStorage(true, true));
    } else {
      setConsent(writeConsentToStorage(false, false));
      dismissBannerUntilNextVisit();
    }
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
      ready: consent !== null,
      hasDecided:
        (consent?.hasDecided ?? false) || isBannerDismissedForSession(),
      analytics: consent?.analytics ?? false,
      acceptAll,
      rejectOptional,
      savePreferences,
      openSettings,
      closeSettings,
      settingsOpen,
    }),
    [acceptAll, closeSettings, consent, openSettings, rejectOptional, savePreferences, settingsOpen],
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
