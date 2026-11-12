"use client";

import { useEffect } from "react";

/**
 * Lock page scroll while `locked` is true, then restore the previous inline
 * overflow. Cleanup must not write an empty string: another lock may have set
 * `overflow` before this one, and clearing it would drop that lock.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
