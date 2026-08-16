import type { CvContent } from "@/content/cv";
import { ollyFsUxUiProductCv } from "@/content/application-cvs/olly-fs-ux-ui-product";

/** Slug → tailored CV body. Public site CV stays in `src/content/cv.ts`. */
export const applicationCvBySlug: Record<string, CvContent> = {
  "olly-fs-ux-ui-product-designer": ollyFsUxUiProductCv,
};

export function getApplicationCvContent(slug: string) {
  return applicationCvBySlug[slug];
}
