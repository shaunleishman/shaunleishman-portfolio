"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { MainSectionShell } from "@/prototypes/half-hourly/HalfHourlyPrototype";
import { MainOverviewPage } from "@/prototypes/half-hourly/HalfHourlySubPages";

export default function HalfHourlyOverviewPage() {
  return (
    <AdminShell fullWidth hideHeader title="Half-hourly synthetic data" description="">
      <MainSectionShell activeMainSection="overview">
        <MainOverviewPage />
      </MainSectionShell>
    </AdminShell>
  );
}
