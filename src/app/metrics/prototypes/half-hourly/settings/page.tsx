"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { MainSectionShell } from "@/prototypes/half-hourly/HalfHourlyPrototype";
import { MainSettingsPage } from "@/prototypes/half-hourly/HalfHourlySubPages";

export default function HalfHourlySettingsPage() {
  return (
    <AdminShell fullWidth hideHeader title="Half-hourly synthetic data" description="">
      <MainSectionShell activeMainSection="settings">
        <MainSettingsPage />
      </MainSectionShell>
    </AdminShell>
  );
}
