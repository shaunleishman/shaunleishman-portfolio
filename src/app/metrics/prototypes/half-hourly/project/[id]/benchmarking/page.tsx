"use client";

import { useParams } from "next/navigation";
import { ProjectBenchmarkingPage } from "@/prototypes/half-hourly/HalfHourlySubPages";

export default function HalfHourlyBenchmarkingPage() {
  const params = useParams();
  const projectId = params.id as string;

  return <ProjectBenchmarkingPage projectId={projectId} />;
}
