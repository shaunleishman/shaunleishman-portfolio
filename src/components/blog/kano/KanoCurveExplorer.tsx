"use client";

import { useMemo, useState } from "react";
import {
  KANO_CATEGORIES,
  satisfactionAt,
  satisfactionLabel,
  type KanoCategory,
} from "./kano-math";
import { pathForCategory } from "./kano-chart";
import { KanoChart } from "./KanoChart";
import { KanoChip, FilterChipRow, KanoDetail, ClientMount } from "./KanoControls";
import { KanoWidget } from "./KanoWidget";

export function KanoCurveExplorer() {
  const [active, setActive] = useState<KanoCategory>("basic");
  const [level, setLevel] = useState(0.65);

  const meta = KANO_CATEGORIES.find((c) => c.id === active)!;
  const satisfaction = satisfactionAt(level, active);

  const curves = useMemo(
    () =>
      KANO_CATEGORIES.map((cat) => ({
        id: cat.id,
        d: pathForCategory(cat.id),
        color: cat.color,
      })),
    [],
  );

  return (
    <KanoWidget
      title="Satisfaction curves"
      hint="Hover the chart to explore. Select a feature type to compare curves."
    >
      <FilterChipRow label="Feature type">
        {KANO_CATEGORIES.map((cat) => (
          <KanoChip
            key={cat.id}
            label={cat.shortLabel}
            selected={active === cat.id}
            color={cat.color}
            onClick={() => setActive(cat.id)}
          />
        ))}
      </FilterChipRow>

      <ClientMount>
        <KanoChart
          curves={curves}
          categories={KANO_CATEGORIES}
          activeId={active}
          activeColor={meta.color}
          onHighlightTChange={setLevel}
          valueAt={(t) => satisfactionAt(t, active)}
          metricLabel="Satisfaction"
          metricValue={satisfactionLabel(satisfaction)}
          ariaLabel="Kano satisfaction curve"
        />
      </ClientMount>

      <KanoDetail color={meta.color} title={meta.example} body={meta.description} />
    </KanoWidget>
  );
}
