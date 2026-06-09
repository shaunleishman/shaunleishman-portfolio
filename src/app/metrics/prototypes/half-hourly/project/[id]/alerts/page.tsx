"use client";

import { useParams } from "next/navigation";
import { ProjectAlertsPage } from "@/prototypes/half-hourly/HalfHourlySubPages";

export default function HalfHourlyProjectAlertsPage() {
  const params = useParams();
  const projectId = params.id as string;

  return <ProjectAlertsPage projectId={projectId} />;
}
