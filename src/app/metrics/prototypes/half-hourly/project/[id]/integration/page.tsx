"use client";

import { useParams } from "next/navigation";
import { ProjectIntegrationPage } from "@/prototypes/half-hourly/HalfHourlySubPages";

export default function HalfHourlyIntegrationPage() {
  const params = useParams();
  const projectId = params.id as string;

  return <ProjectIntegrationPage projectId={projectId} />;
}
