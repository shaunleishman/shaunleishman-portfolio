"use client";

import { useCallback, useEffect, useState } from "react";

export function useMetricsAuth() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/metrics/auth", { credentials: "include" });
    const json = (await res.json()) as { authenticated?: boolean; configured?: boolean };
    setConfigured(json.configured ?? false);
    setAuthenticated(json.authenticated ?? false);
    return json.authenticated ?? false;
  }, []);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      await checkAuth();
      setLoading(false);
    })();
  }, [checkAuth]);

  const login = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setLoading(true);
      setError("");

      const res = await fetch("/api/metrics/auth", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        let message = "Incorrect password.";
        try {
          const json = (await res.json()) as { error?: string };
          if (res.status === 503) {
            message =
              "Metrics login is not configured on this deployment. Set METRICS_PASSWORD in Vercel and redeploy.";
          } else if (json.error) {
            message = json.error === "Invalid password" ? "Incorrect password." : json.error;
          }
        } catch {
          /* default */
        }
        setError(message);
        setAuthenticated(false);
        setLoading(false);
        return false;
      }

      setPassword("");
      setAuthenticated(true);
      setError("");
      setLoading(false);
      return true;
    },
    [password],
  );

  const logout = useCallback(async () => {
    await fetch("/api/metrics/auth", { method: "DELETE", credentials: "include" });
    setAuthenticated(false);
  }, []);

  return {
    password,
    setPassword,
    authenticated,
    configured,
    error,
    loading,
    login,
    logout,
    checkAuth,
  };
}
