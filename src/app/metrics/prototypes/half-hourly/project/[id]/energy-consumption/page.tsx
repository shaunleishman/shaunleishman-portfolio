"use client";

import { useParams } from "next/navigation";
import { EnergyConsumptionTabPage } from "@/prototypes/half-hourly/HalfHourlyPrototype";

export default function HalfHourlyEnergyConsumptionPage() {
  const params = useParams();
  const projectId = params.id as string;

  return <EnergyConsumptionTabPage projectId={projectId} />;
}
