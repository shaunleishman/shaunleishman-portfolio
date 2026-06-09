"use client";

import { useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectShell } from "@/prototypes/half-hourly/HalfHourlyPrototype";

export default function HalfHourlyProjectLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const projectId = params.id as string;

  return (
    <AdminShell fullWidth hideHeader title="Half-hourly synthetic data" description="">
      <ProjectShell projectId={projectId}>{children}</ProjectShell>
    </AdminShell>
  );
}
