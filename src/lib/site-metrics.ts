import { listPublishedPosts } from "@/lib/blog";
import { projects } from "@/content/projects";
import { readAnalyticsEvents } from "@/lib/analytics-store";
import type { AnalyticsEvent } from "@/lib/analytics-types";
import {
  type AnalyticsPeriod,
  eventInPeriod,
  getPeriodLabel,
  METRICS_HOME_PERIOD,
} from "@/lib/analytics-period";
import { formatPathLabel, isArticlePath, isProjectPath, normalizeAnalyticsPath, slugFromPath } from "@/lib/analytics-paths";
import {
  type ActiveVisitor,
  type AnalyticsDashboard,
  type AudienceMetricKey,
  type ContentRow,
  type ContentSortKey,
  getAudienceMetricLabel,
  type TimeSeriesPoint,
} from "@/lib/analytics-metrics-types";

const ACTIVE_WINDOW_MS = 5 * 60 * 1000;

/**
 * Catalogue order is lexical descending. Pad so "999" does not sort above "1000".
 * Unknown paths stay "0", which still sorts last.
 */
function projectCatalogSortKey(index: number): string {
  return String(1000 - index).padStart(4, "0");
}

function emptyContentRow(path: string, slug: string, title: string, sortDate: string): ContentRow {
  return { path, slug, title, views: 0, listeners: 0, likes: 0, shares: 0, sortDate };
}

function buildContentCatalog(): { projects: ContentRow[]; articles: ContentRow[] } {
  const projectRows: ContentRow[] = projects.map((p, index) =>
    emptyContentRow(`/work/${p.slug}`, p.slug, p.title, projectCatalogSortKey(index)),
  );

  const articleRows: ContentRow[] = listPublishedPosts().map((post) =>
    emptyContentRow(`/blog/${post.slug}`, post.slug, post.title, post.date),
  );

  return { projects: projectRows, articles: articleRows };
}

function sortContentRows(rows: ContentRow[], sort: ContentSortKey): ContentRow[] {
  const sorted = [...rows];
  switch (sort) {
    case "listeners":
      return sorted.sort((a, b) => b.listeners - a.listeners || b.views - a.views);
    case "likes":
      return sorted.sort((a, b) => b.likes - a.likes || b.views - a.views);
    case "shares":
      return sorted.sort((a, b) => b.shares - a.shares || b.views - a.views);
    case "date":
      return sorted.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
    default:
      return sorted.sort((a, b) => b.views - a.views || b.listeners - a.listeners);
  }
}

function bucketKey(timestamp: string, period: AnalyticsPeriod): string {
  if (period === "24h") return timestamp.slice(0, 13);
  if (period === "12m") return timestamp.slice(0, 7);
  return timestamp.slice(0, 10);
}

type AudienceBucket = {
  pageviews: number;
  sessions: Set<string>;
  projectViews: number;
  articleViews: number;
  shares: number;
};

function audienceBucketValue(bucket: AudienceBucket, metric: AudienceMetricKey): number {
  switch (metric) {
    case "active_viewers":
      return bucket.sessions.size;
    case "project_views":
      return bucket.projectViews;
    case "article_views":
      return bucket.articleViews;
    case "views_per_viewer":
      return bucket.sessions.size > 0
        ? Math.round((bucket.pageviews / bucket.sessions.size) * 10) / 10
        : 0;
    case "shares":
      return bucket.shares;
  }
}

export async function getAnalyticsDashboard(options: {
  period?: AnalyticsPeriod;
  contentSort?: ContentSortKey;
  audienceMetric?: AudienceMetricKey;
}): Promise<AnalyticsDashboard> {
  const period = options.period ?? METRICS_HOME_PERIOD;
  const contentSort = options.contentSort ?? "views";
  const audienceMetric = options.audienceMetric ?? "active_viewers";

  const allEvents = await readAnalyticsEvents();
  const catalog = buildContentCatalog();
  const rowMap = new Map<string, ContentRow>();
  for (const row of [...catalog.projects, ...catalog.articles]) {
    rowMap.set(row.path, { ...row });
  }

  const unknownProjects = new Map<string, ContentRow>();
  const unknownArticles = new Map<string, ContentRow>();
  const listenersByPath = new Map<string, Set<string>>();
  const trendCounts = new Map<string, number>();
  const audienceBuckets = new Map<string, AudienceBucket>();

  const sessions = new Set<string>();
  let pageviews = 0;
  let projectViews = 0;
  let articleViews = 0;
  let blogLikes = 0;
  let blogShares = 0;
  let cvViews = 0;
  let contactViews = 0;
  let feedbackSubmissions = 0;

  const cutoff = Date.now() - ACTIVE_WINDOW_MS;
  const latestBySession = new Map<string, AnalyticsEvent>();
  let lastSeen: string | null = null;

  const ensureUnknown = (path: string) => {
    if (rowMap.has(path)) return;
    if (isProjectPath(path)) {
      if (!unknownProjects.has(path)) {
        unknownProjects.set(
          path,
          emptyContentRow(path, slugFromPath(path, "/work/"), formatPathLabel(path), "0"),
        );
      }
      return;
    }
    if (isArticlePath(path) && !unknownArticles.has(path)) {
      unknownArticles.set(
        path,
        emptyContentRow(path, slugFromPath(path, "/blog/"), formatPathLabel(path), "0"),
      );
    }
  };

  // One pass over the log. Active visitors use the full log; everything else
  // stays inside the selected period. A non-numeric timestamp still counts as
  // active because NaN < cutoff is false.
  for (const event of allEvents) {
    if (lastSeen === null || event.timestamp > lastSeen) lastSeen = event.timestamp;

    const ts = new Date(event.timestamp).getTime();
    if (!(ts < cutoff)) {
      const existing = latestBySession.get(event.sessionId);
      if (!existing || ts > new Date(existing.timestamp).getTime()) {
        latestBySession.set(event.sessionId, event);
      }
    }

    if (!eventInPeriod(event.timestamp, period)) continue;

    sessions.add(event.sessionId);
    const path = normalizeAnalyticsPath(event.path);
    const audienceKey = bucketKey(event.timestamp, period);
    let audienceBucket = audienceBuckets.get(audienceKey);
    if (!audienceBucket) {
      audienceBucket = {
        pageviews: 0,
        sessions: new Set(),
        projectViews: 0,
        articleViews: 0,
        shares: 0,
      };
      audienceBuckets.set(audienceKey, audienceBucket);
    }
    audienceBucket.sessions.add(event.sessionId);

    if (event.type === "pageview" || event.type === "blog_like" || event.type === "blog_share") {
      ensureUnknown(path);
    }

    const row = rowMap.get(path) ?? unknownProjects.get(path) ?? unknownArticles.get(path);

    if (event.type === "pageview") {
      pageviews += 1;
      if (isProjectPath(path)) {
        projectViews += 1;
        audienceBucket.projectViews += 1;
      }
      if (isArticlePath(path)) {
        articleViews += 1;
        audienceBucket.articleViews += 1;
      }
      if (path === "/cv" || path.startsWith("/cv")) cvViews += 1;
      if (path === "/contact") contactViews += 1;
      audienceBucket.pageviews += 1;
      trendCounts.set(audienceKey, (trendCounts.get(audienceKey) ?? 0) + 1);
      if (row) row.views += 1;

      const listeners = listenersByPath.get(path) ?? new Set<string>();
      listeners.add(event.sessionId);
      listenersByPath.set(path, listeners);
    } else if (event.type === "blog_like") {
      blogLikes += 1;
      if (row) row.likes += 1;
    } else if (event.type === "blog_share") {
      blogShares += 1;
      audienceBucket.shares += 1;
      if (row) row.shares += 1;
    } else if (event.type === "click" && event.metadata?.feedback) {
      feedbackSubmissions += 1;
    }
  }

  for (const [path, listeners] of listenersByPath) {
    const row = rowMap.get(path) ?? unknownProjects.get(path) ?? unknownArticles.get(path);
    if (row) row.listeners = listeners.size;
  }

  const projectRows = sortContentRows(
    [...catalog.projects.map((row) => rowMap.get(row.path)!), ...unknownProjects.values()],
    contentSort,
  );
  const articleRows = sortContentRows(
    [...catalog.articles.map((row) => rowMap.get(row.path)!), ...unknownArticles.values()],
    contentSort,
  );

  const audienceSeries = [...audienceBuckets.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, bucket]) => ({ date, value: audienceBucketValue(bucket, audienceMetric) }));

  let audienceSummary = 0;
  switch (audienceMetric) {
    case "active_viewers":
      audienceSummary = sessions.size;
      break;
    case "project_views":
      audienceSummary = projectViews;
      break;
    case "article_views":
      audienceSummary = articleViews;
      break;
    case "views_per_viewer":
      audienceSummary =
        sessions.size > 0 ? Math.round((pageviews / sessions.size) * 10) / 10 : 0;
      break;
    case "shares":
      audienceSummary = blogShares;
      break;
  }

  const activeVisitors: ActiveVisitor[] = [...latestBySession.values()]
    .map((event) => ({
      sessionId: event.sessionId,
      path: event.path,
      lastSeen: event.timestamp,
    }))
    .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));

  const trend: TimeSeriesPoint[] = [...trendCounts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, value]) => ({ date, value }));

  return {
    period,
    periodLabel: getPeriodLabel(period),
    overview: {
      pageviews,
      uniqueSessions: sessions.size,
      projectViews,
      articleViews,
      blogLikes,
      blogShares,
      cvViews,
      contactViews,
      feedbackSubmissions,
    },
    activeNow: {
      count: activeVisitors.length,
      visitors: activeVisitors.slice(0, 8),
      lastSeen,
    },
    topProjects: sortContentRows(projectRows, "views").slice(0, 5),
    topArticles: sortContentRows(articleRows, "views").slice(0, 5),
    trend,
    content: { projects: projectRows, articles: articleRows },
    audience: {
      metric: audienceMetric,
      metricLabel: getAudienceMetricLabel(audienceMetric),
      series: audienceSeries,
      summary: audienceSummary,
    },
  };
}
