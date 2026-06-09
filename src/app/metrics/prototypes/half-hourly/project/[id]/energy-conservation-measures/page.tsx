"use client";

import { useParams } from "next/navigation";
import { ProjectEcmPage } from "@/prototypes/half-hourly/HalfHourlySubPages";

export default function HalfHourlyEcmPage() {
  const params = useParams();
  const projectId = params.id as string;

  return <ProjectEcmPage projectId={projectId} />;
}
