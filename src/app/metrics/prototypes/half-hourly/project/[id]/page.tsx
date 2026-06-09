"use client";

import { useParams } from "next/navigation";
import { ProjectAboutPage } from "@/prototypes/half-hourly/HalfHourlyPrototype";

export default function HalfHourlyProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  return <ProjectAboutPage projectId={projectId} />;
}
