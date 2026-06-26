import type { AnalyticsPeriod } from "@/lib/analytics-period";

export type ContentSortKey = "views" | "listeners" | "likes" | "shares" | "date";
export type AudienceMetricKey =
  | "active_viewers"
  | "project_views"
  | "article_views"
  | "views_per_viewer"
  | "shares";

export type TimeSeriesPoint = { date: string; value: number };

export type ContentRow = {
  path: string;
  slug: string;
  title: string;
  views: number;
  listeners: number;
  likes: number;
  shares: number;
  sortDate: string;
};

export type ActiveVisitor = {
  sessionId: string;
  path: string;
  lastSeen: string;
};

export type AnalyticsDashboard = {
  period: AnalyticsPeriod;
  periodLabel: string;
  overview: {
    pageviews: number;
    uniqueSessions: number;
    projectViews: number;
    articleViews: number;
    blogLikes: number;
    blogShares: number;
    cvViews: number;
    contactViews: number;
    feedbackSubmissions: number;
  };
  activeNow: {
    count: number;
    visitors: ActiveVisitor[];
    /** Timestamp of the most recent event overall, or null if there is none. */
    lastSeen: string | null;
  };
  topProjects: ContentRow[];
  topArticles: ContentRow[];
  trend: TimeSeriesPoint[];
  content: {
    projects: ContentRow[];
    articles: ContentRow[];
  };
  audience: {
    metric: AudienceMetricKey;
    metricLabel: string;
    series: TimeSeriesPoint[];
    summary: number;
  };
};

export function getAudienceMetricLabel(metric: AudienceMetricKey): string {
  switch (metric) {
    case "active_viewers":
      return "Active viewers";
    case "project_views":
      return "Project views";
    case "article_views":
      return "Article views";
    case "views_per_viewer":
      return "Views per viewer";
    case "shares":
      return "Shares";
  }
}

export function parseContentSort(value: string | null | undefined): ContentSortKey {
  if (value === "listeners" || value === "likes" || value === "shares" || value === "date") return value;
  return "views";
}

export function parseAudienceMetric(value: string | null | undefined): AudienceMetricKey {
  if (
    value === "active_viewers" ||
    value === "project_views" ||
    value === "article_views" ||
    value === "views_per_viewer" ||
    value === "shares"
  ) {
    return value;
  }
  return "active_viewers";
}

/**
 * Fills a trend series so there is one point per bucket across the whole period,
 * inserting zeros for buckets with no events. Keys match the server bucketing
 * (hourly for 24h, monthly for 12m, daily otherwise). "all" is returned sorted.
 */
export function expandTrendBuckets(
  points: TimeSeriesPoint[],
  period: AnalyticsPeriod,
  now: Date = new Date(),
): TimeSeriesPoint[] {
  const valueByKey = new Map(points.map((p) => [p.date, p.value]));

  if (period === "all") {
    return [...points].sort((a, b) => a.date.localeCompare(b.date));
  }

  const keys: string[] = [];
  if (period === "24h") {
    for (let i = 23; i >= 0; i--) {
      keys.push(new Date(now.getTime() - i * 3_600_000).toISOString().slice(0, 13));
    }
  } else if (period === "12m") {
    for (let i = 11; i >= 0; i--) {
      keys.push(
        new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1)).toISOString().slice(0, 7),
      );
    }
  } else {
    const days = period === "7d" ? 7 : 28;
    for (let i = days - 1; i >= 0; i--) {
      keys.push(new Date(now.getTime() - i * 86_400_000).toISOString().slice(0, 10));
    }
  }

  return keys.map((date) => ({ date, value: valueByKey.get(date) ?? 0 }));
}

export function formatBucketLabel(key: string, period: AnalyticsPeriod): string {
  if (period === "24h" && key.length >= 13) {
    const d = new Date(`${key}:00:00Z`);
    return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  }
  if (key.length === 7) {
    const [y, m] = key.split("-");
    return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("en-GB", { month: "short" });
  }
  return key.slice(5);
}
