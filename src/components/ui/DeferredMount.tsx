"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type DeferredMountProps = {
  children: ReactNode;
  placeholder: ReactNode;
  rootMargin?: string;
};

/** Mount children only when near the viewport — defers heavy client bundles below the fold. */
export function DeferredMount({
  children,
  placeholder,
  rootMargin = "800px 0px",
}: DeferredMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{mounted ? children : placeholder}</div>;
}
