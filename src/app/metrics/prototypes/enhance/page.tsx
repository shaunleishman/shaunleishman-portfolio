"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { EnhancePrototype } from "@/prototypes/enhance/EnhancePrototype";

export default function EnhancePrototypePage() {
  return (
    <AdminShell fullWidth hideHeader title="Patient monitoring & assignment" description="">
      <EnhancePrototype />
    </AdminShell>
  );
}
