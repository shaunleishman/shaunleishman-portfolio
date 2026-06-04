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
