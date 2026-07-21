import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/metrics", "/metrics/", "/internal/", "/api/"],
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/metrics", "/metrics/", "/internal/", "/api/"],
      },
    ],
    sitemap: "https://www.shaunleishmanportfolio.com/sitemap.xml",
  };
}
