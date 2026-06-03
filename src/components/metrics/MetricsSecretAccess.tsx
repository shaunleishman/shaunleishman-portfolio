"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const KEY_BUFFER_RESET_MS = 2500;
const LOGO_CLICK_WINDOW_MS = 1200;
const LOGO_CLICKS_REQUIRED = 3;

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest("input, textarea, select, button, [contenteditable='true'], [role='textbox']"),
  );
}

async function requestMetricsPath(payload: { key?: string; gesture?: string }): Promise<string | null> {
  const res = await fetch("/api/metrics/gate", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) return null;

  const json = (await res.json()) as { path?: string };
  return json.path ?? null;
}

export function MetricsSecretAccess() {
  const router = useRouter();
  const keyBuffer = useRef("");
  const keyTimer = useRef<number | null>(null);
  const logoClickCount = useRef(0);
  const logoClickTimer = useRef<number | null>(null);

  useEffect(() => {
    const navigate = (path: string) => {
      router.push(path);
    };

    const openViaGesture = async () => {
      const path = await requestMetricsPath({ gesture: "logo" });
      if (path) navigate(path);
    };

    const openViaKey = async (key: string): Promise<boolean> => {
      const path = await requestMetricsPath({ key });
      if (!path) return false;
      navigate(path);
      return true;
    };

    const resetKeyBuffer = () => {
      keyBuffer.current = "";
      if (keyTimer.current !== null) {
        window.clearTimeout(keyTimer.current);
        keyTimer.current = null;
      }
    };

    const resetLogoClicks = () => {
      logoClickCount.current = 0;
      if (logoClickTimer.current !== null) {
        window.clearTimeout(logoClickTimer.current);
        logoClickTimer.current = null;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) {
        resetKeyBuffer();
        return;
      }

      if (event.key.length !== 1) return;

      keyBuffer.current += event.key.toLowerCase();

      if (keyTimer.current !== null) {
        window.clearTimeout(keyTimer.current);
      }
      keyTimer.current = window.setTimeout(resetKeyBuffer, KEY_BUFFER_RESET_MS);

      void openViaKey(keyBuffer.current).then((matched) => {
        if (matched) resetKeyBuffer();
      });
    };

    const handleLogoClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest('[data-metrics-gate="logo"]')) {
        return;
      }

      if (!event.shiftKey) {
        resetLogoClicks();
        return;
      }

      event.preventDefault();
      logoClickCount.current += 1;

      if (logoClickTimer.current !== null) {
        window.clearTimeout(logoClickTimer.current);
      }
      logoClickTimer.current = window.setTimeout(resetLogoClicks, LOGO_CLICK_WINDOW_MS);

      if (logoClickCount.current >= LOGO_CLICKS_REQUIRED) {
        resetLogoClicks();
        void openViaGesture();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleLogoClick, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleLogoClick, true);
      resetKeyBuffer();
      resetLogoClicks();
    };
  }, [router]);

  return null;
}
