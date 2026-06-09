"use client";

import { ShowcaseRoot } from "@/design-systems/showcase/ShowcaseRoot";

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return <ShowcaseRoot>{children}</ShowcaseRoot>;
}
