import type { PrototypeCalloutConfig } from "@/components/projects/PrototypeDesignCallout";
import type { EnhanceDemoScene } from "@/prototypes/enhance/EnhancePrototype";

/** Design-space coords for 1280×800 — highlight targets + callout placement. */
export const omronPrototypeCallouts: Record<EnhanceDemoScene, PrototypeCalloutConfig> = {
  "assign-john-smith": {
    title: "Inflexible handover",
    severity: "high",
    issue: "Silent reassignments with no handover note or audit trail.",
    resolution: "Mandatory reason before confirm.",
    highlight: { x: 328, y: 508, width: 624, height: 132 },
    calloutSide: "left",
    maxWidth: "12.25rem",
  },
  "resolve-bp-alert": {
    title: "Undocumented actions",
    severity: "high",
    issue: "Alerts cleared without recording what was done.",
    resolution: "Must select a resolution action first.",
    highlight: { x: 408, y: 292, width: 464, height: 196 },
    calloutSide: "right",
    maxWidth: "12.25rem",
  },
};
