"use client";

import { HalfHourlyScenarioEmbed } from "@/components/projects/HalfHourlyScenarioEmbed";

type ArbncoBulkSynthesiseLiveDemoProps = {
  caption?: string;
  className?: string;
};

export function ArbncoBulkSynthesiseLiveDemo({
  caption = "Example: bulk synthesise and revert flow across the projects list",
  className,
}: ArbncoBulkSynthesiseLiveDemoProps) {
  return (
    <HalfHourlyScenarioEmbed
      demoScene="bulk-synthesise-flow"
      caption={caption}
      className={className}
      layout="framed"
      autoPlaySteps
    />
  );
}
