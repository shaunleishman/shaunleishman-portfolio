"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("analytics_session");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("analytics_session", id);
  }
  return id;
}

async function track(
  type: "pageview" | "scroll" | "section_view" | "exit",
  metadata?: Record<string, string | number>,
) {
  const sessionId = getSessionId();
  if (!sessionId) return;

  await fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId,
      type,
      path: window.location.pathname,
      metadata,
    }),
    keepalive: type === "exit",
  });
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const scrollTracked = useRef(new Set<number>());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    scrollTracked.current = new Set();
    track("pageview");

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
      );
      const milestones = [25, 50, 75, 100];
      milestones.forEach((m) => {
        if (scrollPercent >= m && !scrollTracked.current.has(m)) {
          scrollTracked.current.add(m);
          track("scroll", { depth: `${m}%` });
        }
      });
    };

    const handleExit = () => {
      track("exit");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleExit);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute("data-analytics-section");
            if (section) {
              track("section_view", { section });
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.4 },
    );

    document.querySelectorAll("[data-analytics-section]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleExit);
      observerRef.current?.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
