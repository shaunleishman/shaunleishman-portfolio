import type { MetadataRoute } from "next";
import { getMetricsPath } from "@/lib/metrics-config";

export default function robots(): MetadataRoute.Robots {
  const metricsPath = getMetricsPath();

  return {
    rules: {
      userAgent: "*",
      disallow: ["/admin", "/admin/", "/metrics", "/metrics/", metricsPath, `${metricsPath}/`],
    },
  };
}
