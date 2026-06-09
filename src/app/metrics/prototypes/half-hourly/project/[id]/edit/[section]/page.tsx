"use client";

import { useParams } from "next/navigation";
import {
  EditProjectSectionPage,
  isEditProjectSectionSlug,
} from "@/prototypes/half-hourly/EditProjectSections";
import { useHalfHourlyNav } from "@/prototypes/half-hourly/useHalfHourlyNav";
import { useEffect } from "react";

export default function HalfHourlyEditProjectSectionPage() {
  const params = useParams();
  const { navigate } = useHalfHourlyNav();
  const projectId = params.id as string;
  const section = params.section as string;

  useEffect(() => {
    if (!isEditProjectSectionSlug(section)) {
      navigate(`/project/${projectId}/edit`);
    }
  }, [section, projectId, navigate]);

  if (!isEditProjectSectionSlug(section)) {
    return null;
  }

  return <EditProjectSectionPage projectId={projectId} section={section} />;
}
