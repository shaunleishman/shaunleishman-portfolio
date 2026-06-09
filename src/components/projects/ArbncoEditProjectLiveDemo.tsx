"use client";

import { HalfHourlyScenarioEmbed } from "@/components/projects/HalfHourlyScenarioEmbed";

type ArbncoEditProjectLiveDemoProps = {
  caption?: string;
  className?: string;
};

export function ArbncoEditProjectLiveDemo({
  caption = "Example: enabling generated hourly data from project settings",
  className,
}: ArbncoEditProjectLiveDemoProps) {
  return (
    <HalfHourlyScenarioEmbed
      demoScene="edit-project-synthetic"
      caption={caption}
      className={className}
    />
  );
}
