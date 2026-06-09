"use client";

import { useParams } from "next/navigation";
import { DisaggregationTabPage } from "@/prototypes/half-hourly/HalfHourlyPrototype";

export default function HalfHourlyDisaggregationPage() {
  const params = useParams();
  const projectId = params.id as string;

  return <DisaggregationTabPage projectId={projectId} />;
}
