"use client";

import { useSyncExternalStore } from "react";

function subscribe(): () => void {
  return () => {};
}

function getReturnPath(): string {
  return `${window.location.pathname}${window.location.search}`;
}

function getServerReturnPath(): string {
  return "";
}

/**
 * Path to send the live overlay back to. The server snapshot is empty so the
 * hydration render matches the HTML. The link label does not change.
 */
export function useMetricsReturnPath(): string {
  return useSyncExternalStore(subscribe, getReturnPath, getServerReturnPath);
}
