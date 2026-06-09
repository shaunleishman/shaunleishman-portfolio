"use client";

import { useParams } from "next/navigation";
import { EnergyOverviewShell } from "@/prototypes/half-hourly/HalfHourlyPrototype";

export default function HalfHourlyEnergyConsumptionLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const projectId = params.id as string;

  return <EnergyOverviewShell projectId={projectId}>{children}</EnergyOverviewShell>;
}
