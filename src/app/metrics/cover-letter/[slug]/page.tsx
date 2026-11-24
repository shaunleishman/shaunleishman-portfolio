import { connection } from "next/server";
import { notFound, redirect } from "next/navigation";
import { getApplicationBySlug } from "@/content/applications";
import { getMetricsPath } from "@/lib/metrics-config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Old cover-letter pack URL.
 * "../../applications/{slug}" drops the secret metrics segment.
 * Unknown slugs stay a 404. Do not redirect them onto a guessed pack URL.
 */
export default async function CoverLetterDetailRedirect({ params }: PageProps) {
  await connection();
  const { slug } = await params;
  const application = getApplicationBySlug(slug);
  if (!application) {
    notFound();
  }
  redirect(`${getMetricsPath()}/applications/${application.slug}`);
}
