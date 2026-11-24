import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getMetricsPath } from "@/lib/metrics-config";

/**
 * Old cover-letter gallery URL.
 * A relative "../applications" is resolved against a path with no trailing slash,
 * so the secret metrics segment is dropped. Read the path on the request.
 */
export default async function CoverLetterGalleryRedirect() {
  await connection();
  redirect(`${getMetricsPath()}/applications`);
}
