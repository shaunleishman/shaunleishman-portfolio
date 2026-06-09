"use client";

import { useParams } from "next/navigation";
import { EditProjectPage } from "@/prototypes/half-hourly/HalfHourlyPrototype";

export default function HalfHourlyEditProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  return <EditProjectPage projectId={projectId} />;
}
