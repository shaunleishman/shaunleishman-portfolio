import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getMetricsPath } from "@/lib/metrics-config";

export default async function CoverLetterGalleryRedirect() {
  await connection();
  // A relative hop (`../applications`) is resolved against the public URL.
  // From `{metricsPath}/cover-letter` that lands on `/internal/applications`
  // and drops the secret admin prefix. `/metrics/applications` is rejected
  // by middleware, so the target is the public metrics path, read per request.
  redirect(`${getMetricsPath()}/applications`);
}
