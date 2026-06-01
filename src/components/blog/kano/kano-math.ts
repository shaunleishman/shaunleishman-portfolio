export type KanoCategory = "basic" | "performance" | "delighter" | "indifferent" | "reverse";

export type KanoCategoryMeta = {
  id: KanoCategory;
  label: string;
  shortLabel: string;
  color: string;
  example: string;
  description: string;
};

export const KANO_CATEGORIES: KanoCategoryMeta[] = [
  {
    id: "basic",
    label: "Basic needs (must-haves)",
    shortLabel: "Basic",
    color: "#eab308",
    example: "Search on a content-heavy site",
    description:
      "Expected baseline. Absence causes frustration; presence rarely delights.",
  },
  {
    id: "performance",
    label: "Performance needs",
    shortLabel: "Performance",
    color: "#3b66f5",
    example: "Report speed or filter accuracy",
    description: "More is better. Satisfaction scales with how well it works.",
  },
  {
    id: "delighter",
    label: "Delighters",
    shortLabel: "Delighter",
    color: "#22c55e",
    example: "A thoughtful shortcut you did not expect",
    description: "Unexpected extras that create a positive reaction when present.",
  },
  {
    id: "indifferent",
    label: "Indifferent features",
    shortLabel: "Indifferent",
    color: "#a3a3a3",
    example: "A setting nobody ever changes",
    description: "Presence or absence barely moves satisfaction either way.",
  },
  {
    id: "reverse",
    label: "Reverse features",
    shortLabel: "Reverse",
    color: "#ef4444",
    example: "Cluttered UI or forced upsells",
    description: "More of this feature can actively reduce satisfaction.",
  },
];

/** Satisfaction from -1 (dissatisfied) to 1 (delighted) at implementation level t (0–1). */
export function satisfactionAt(t: number, category: KanoCategory): number {
  const x = Math.min(1, Math.max(0, t));

  switch (category) {
    case "basic":
      return -0.88 + 0.88 * Math.pow(x, 0.38);
    case "performance":
      return 2 * x - 1;
    case "delighter":
      return Math.pow(x, 1.75) * 0.92;
    case "indifferent":
      return 0;
    case "reverse":
      return 0.75 - 1.5 * x;
    default:
      return 0;
  }
}

export function satisfactionLabel(value: number): string {
  if (value >= 0.55) return "Delighted";
  if (value >= 0.15) return "Satisfied";
  if (value >= -0.15) return "Neutral";
  if (value >= -0.55) return "Dissatisfied";
  return "Frustrated";
}

export function sampleCurve(category: KanoCategory, steps = 40): Array<{ t: number; y: number }> {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    return { t, y: satisfactionAt(t, category) };
  });
}

/** Morph delighter curve toward basic as market maturity increases (0–1). */
export function shiftedSatisfactionAt(
  t: number,
  maturity: number,
): number {
  const delighter = satisfactionAt(t, "delighter");
  const basic = satisfactionAt(t, "basic");
  const m = Math.min(1, Math.max(0, maturity));
  return delighter * (1 - m) + basic * m;
}
