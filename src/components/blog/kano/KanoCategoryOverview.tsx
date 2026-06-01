"use client";

import { useState } from "react";
import { KANO_CATEGORIES } from "./kano-math";
import { KanoChip, FilterChipRow, KanoDetail } from "./KanoControls";
import { KanoWidget } from "./KanoWidget";

export function KanoCategoryOverview() {
  const [active, setActive] = useState(KANO_CATEGORIES[0].id);
  const meta = KANO_CATEGORIES.find((c) => c.id === active)!;

  return (
    <KanoWidget
      title="Five feature types"
      hint="Pick a category for a quick definition."
    >
      <FilterChipRow>
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
      <KanoDetail
        color={meta.color}
        title={meta.label}
        body={`${meta.description} e.g. ${meta.example}`}
      />
    </KanoWidget>
  );
}
