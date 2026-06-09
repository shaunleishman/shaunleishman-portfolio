"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { ShowcasePrototype } from "@/design-systems/showcase/ShowcasePrototype";

export default function ShowcasePage() {
  return (
    <AdminShell fullWidth hideHeader title="Design System Showcase" description="">
      <ShowcasePrototype />
    </AdminShell>
  );
}
