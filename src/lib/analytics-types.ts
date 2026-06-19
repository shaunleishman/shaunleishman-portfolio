export type AnalyticsEvent = {
  id: string;
  sessionId: string;
  type:
    | "pageview"
    | "scroll"
    | "section_view"
    | "click"
    | "exit"
    | "heatmap_dwell"
    | "click_map"
    | "page_meta"
    | "scroll_band"
    | "blog_like"
    | "blog_share";
  path: string;
  timestamp: string;
  metadata?: Record<string, string | number>;
};

import type { AnalyticsPeriod } from "@/lib/analytics-period";

export type AnalyticsSummary = {
  filterPath: string | null;
  filterPeriod: AnalyticsPeriod;
  filterPeriodLabel: string;
  paths: string[];
  totalPageviews: number;
  uniqueSessions: number;
  totalDwellMs: number;
  avgDwellPerSession: number;
  topPages: { path: string; views: number }[];
  topSections: { section: string; views: number }[];
  scrollDepth: { depth: string; count: number }[];
  exitPages: { path: string; count: number }[];
  hourlyActivity: { hour: string; count: number }[];
  eventTypes: { type: string; count: number }[];
  feedback: {
    total: number;
    averageScore: number;
    byBucket: { bucket: string; count: number }[];
    byQuality: { quality: string; label: string; count: number }[];
    byImprovementArea: { area: string; label: string; count: number }[];
    byContentType: { contentType: string; count: number }[];
    byPage: { path: string; count: number; averageScore: number; contentType: string }[];
    otherComments: { path: string; comment: string; timestamp: string }[];
    /** @deprecated Use byPage and byImprovementArea */
    byCaseStudy: { path: string; count: number; averageScore: number }[];
    /** @deprecated Use byImprovementArea and otherComments */
    topReasons: { reason: string; count: number }[];
  };
  dailyPageviews: { date: string; count: number }[];
  recentEvents: AnalyticsEvent[];
};
