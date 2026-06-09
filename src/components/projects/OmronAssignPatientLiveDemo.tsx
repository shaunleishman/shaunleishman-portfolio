"use client";

import { EnhanceScenarioEmbed } from "@/components/projects/EnhanceScenarioEmbed";

type OmronAssignPatientLiveDemoProps = {
  caption?: string;
  className?: string;
};

export function OmronAssignPatientLiveDemo({
  caption = "Assign patient, reason for transfer required",
  className,
}: OmronAssignPatientLiveDemoProps) {
  return (
    <EnhanceScenarioEmbed
      demoScene="assign-john-smith"
      caption={caption}
      className={className}
    />
  );
}
