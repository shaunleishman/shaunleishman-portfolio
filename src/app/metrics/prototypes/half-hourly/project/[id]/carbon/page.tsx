"use client";

import { useParams } from "next/navigation";
import { ProjectCarbonPage } from "@/prototypes/half-hourly/HalfHourlySubPages";

export default function HalfHourlyCarbonPage() {
  const params = useParams();
  const projectId = params.id as string;

  return <ProjectCarbonPage projectId={projectId} />;
}
