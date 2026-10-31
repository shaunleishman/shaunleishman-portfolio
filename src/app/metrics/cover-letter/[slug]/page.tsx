import { connection } from "next/server";
import { notFound, redirect } from "next/navigation";
import { getApplicationBySlug } from "@/content/applications";
import { getMetricsPath } from "@/lib/metrics-config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CoverLetterDetailRedirect({ params }: PageProps) {
  await connection();
  const { slug } = await params;
  const application = getApplicationBySlug(slug);

  if (!application) {
    notFound();
  }

  // `../../applications/{slug}` resolves one segment too high and leaves the
  // admin prefix behind. Keep the visitor on the public metrics path.
  redirect(`${getMetricsPath()}/applications/${application.slug}`);
}
