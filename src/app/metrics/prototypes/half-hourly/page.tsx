"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectListPage } from "@/prototypes/half-hourly/HalfHourlyPrototype";

export default function HalfHourlyListPage() {
  return (
    <AdminShell fullWidth hideHeader title="Half-hourly synthetic data" description="">
      <ProjectListPage />
    </AdminShell>
  );
}
