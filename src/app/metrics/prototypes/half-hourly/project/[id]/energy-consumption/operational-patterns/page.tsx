"use client";

import { useParams } from "next/navigation";
import { OperationalPatternsTabPage } from "@/prototypes/half-hourly/HalfHourlyPrototype";

export default function HalfHourlyOperationalPatternsPage() {
  const params = useParams();
  const projectId = params.id as string;

  return <OperationalPatternsTabPage projectId={projectId} />;
}
