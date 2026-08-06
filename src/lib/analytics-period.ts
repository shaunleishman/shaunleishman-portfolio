export const ANALYTICS_PERIODS = ["24h", "7d", "28d", "12m"] as const;
export type AnalyticsPeriod = (typeof ANALYTICS_PERIODS)[number];

/** Home dashboard always uses this window. */
export const METRICS_HOME_PERIOD: AnalyticsPeriod = "7d";

const LEGACY_PERIOD_MAP: Record<string, AnalyticsPeriod> = {
  month: "28d",
  year: "12m",
  /** Former unbounded "all time" — use a 12-month window so charts match KPIs. */
  all: "12m",
};

export function parseAnalyticsPeriod(value: string | null | undefined): AnalyticsPeriod {
  if (value && value in LEGACY_PERIOD_MAP) {
    return LEGACY_PERIOD_MAP[value];
  }
  if (value && ANALYTICS_PERIODS.includes(value as AnalyticsPeriod)) {
    return value as AnalyticsPeriod;
  }
  return "12m";
}

export function getPeriodStart(period: AnalyticsPeriod, now = new Date()): Date {
  const start = new Date(now);

  if (period === "24h") {
    start.setTime(start.getTime() - 24 * 60 * 60 * 1000);
    return start;
  }

  if (period === "7d") {
    start.setTime(start.getTime() - 7 * 24 * 60 * 60 * 1000);
    return start;
  }

  if (period === "28d") {
    start.setTime(start.getTime() - 28 * 24 * 60 * 60 * 1000);
    return start;
  }

  start.setTime(start.getTime() - 365 * 24 * 60 * 60 * 1000);
  return start;
}

export function getPeriodLabel(period: AnalyticsPeriod): string {
  switch (period) {
    case "24h":
      return "Last 24 hours";
    case "7d":
      return "Last 7 days";
    case "28d":
      return "Last 28 days";
    case "12m":
      return "Last 12 months";
  }
}

export function eventInPeriod(timestamp: string, period: AnalyticsPeriod, now = new Date()): boolean {
  const start = getPeriodStart(period, now);
  return timestamp >= start.toISOString();
}
