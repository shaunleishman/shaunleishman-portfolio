"use client";

import { EnhanceScenarioEmbed } from "@/components/projects/EnhanceScenarioEmbed";

type OmronActionCardLiveDemoProps = {
  caption?: string;
  className?: string;
};

export function OmronActionCardLiveDemo({
  caption = "Action card, task detail and completion states",
  className,
}: OmronActionCardLiveDemoProps) {
  return (
    <EnhanceScenarioEmbed
      demoScene="resolve-bp-alert"
      caption={caption}
      className={className}
    />
  );
}
