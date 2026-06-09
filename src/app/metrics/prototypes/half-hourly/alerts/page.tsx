"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { MainSectionShell } from "@/prototypes/half-hourly/HalfHourlyPrototype";
import { MainAlertsPage } from "@/prototypes/half-hourly/HalfHourlySubPages";

export default function HalfHourlyAlertsPage() {
  return (
    <AdminShell fullWidth hideHeader title="Half-hourly synthetic data" description="">
      <MainSectionShell activeMainSection="alerts">
        <MainAlertsPage />
      </MainSectionShell>
    </AdminShell>
  );
}
