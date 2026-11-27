"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseMetricsGetOptions = {
  /**
   * Dashboard pages start false so the first paint stays empty, matching the
   * previous hook. Insights and maps start true and show their loading line.
   */
  initialLoading?: boolean;
  /**
   * An HTTP error clears the payload. Heatmap and click map leave it, so a
   * failed refresh does not wipe the last grid before the loading line drops.
   */
  clearOnError?: boolean;
};

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}

/**
 * GET a metrics endpoint. The previous payload stays until the latest request
 * settles. An aborted or older response never replaces it.
 */
export function useMetricsGet<T>(url: string | null, options: UseMetricsGetOptions = {}) {
  const initialLoading = options.initialLoading ?? true;
  const clearOnError = options.clearOnError ?? true;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(initialLoading);
  const [reloadKey, setReloadKey] = useState(0);
  const requestRef = useRef(0);

  const reload = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const requestId = ++requestRef.current;

    const request = Promise.resolve().then(() => {
      if (requestId !== requestRef.current) return null;
      setLoading(true);
      return fetch(url, { credentials: "include", signal: controller.signal });
    });

    request.then((res) => {
      if (res == null || requestId !== requestRef.current) return null;
      if (!res.ok) {
        if (clearOnError) setData(null);
        setLoading(false);
        return null;
      }
      return res.json() as Promise<T>;
    }).then((json) => {
      if (json == null || requestId !== requestRef.current) return;
      setData(json);
      setLoading(false);
    }).catch((error: unknown) => {
      if (requestId !== requestRef.current || isAbortError(error)) return;
      // A dropped connection used to reject before the snapshot changed.
    });

    return () => {
      requestRef.current += 1;
      controller.abort();
    };
  }, [url, clearOnError, reloadKey]);

  return { data, loading, reload };
}
