import { redirect } from "next/navigation";
import { applications } from "@/content/applications";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return applications.map((application) => ({ slug: application.slug }));
}

export default async function CoverLetterDetailRedirect({ params }: PageProps) {
  const { slug } = await params;
  redirect(`../../applications/${slug}`);
}
