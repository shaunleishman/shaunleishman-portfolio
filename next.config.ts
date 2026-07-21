import type { NextConfig } from "next";
import { FIXED_SECURITY_HEADERS } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
    // Build-time integrity hashes on scripts (Observatory SRI bonus).
    sri: {
      algorithm: "sha256",
    },
  },
  async headers() {
    return [
      {
        // Static assets still get fixed headers; CSP is set per-request in middleware.
        source: "/:path*",
        headers: FIXED_SECURITY_HEADERS,
      },
      {
        source: "/:folder(companies|projects|brand|images)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
