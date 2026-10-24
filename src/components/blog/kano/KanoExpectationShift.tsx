"use client";

import { memo, useMemo, useState } from "react";
import { shiftedSatisfactionAt, satisfactionAt, satisfactionLabel } from "./kano-math";
import { areaPathFromFn, pathFromFn } from "./kano-chart";
import { KanoChart } from "./KanoChart";
import { KanoChip, FilterChipRow, KanoStat, KanoStatRow, ClientMount } from "./KanoControls";
import { KanoWidget } from "./KanoWidget";

const MATURITY_STAGES = [
  { label: "At launch", value: 0 },
  { label: "Adapting", value: 0.5 },
  { label: "Expected", value: 1 },
] as const;

const PRIMARY = "#14b8a6";

const MaturityControls = memo(function MaturityControls({
  maturityIdx,
  onSelect,
}: {
  maturityIdx: number;
  onSelect: (index: number) => void;
}) {
  const maturityLabel = MATURITY_STAGES[maturityIdx].label.toLowerCase();

  return (
    <>
      <FilterChipRow label="Market maturity">
        {MATURITY_STAGES.map((stage, i) => (
          <KanoChip
            key={stage.label}
            label={stage.label}
            selected={maturityIdx === i}
            onClick={() => onSelect(i)}
          />
        ))}
      </FilterChipRow>

      <p className="mb-3 text-[0.8125rem] text-[var(--color-text-secondary)]">
        A feature like <span className="font-medium text-[var(--color-text-primary)]">AI summaries</span> can
        feel like a delighter at launch, then drift toward a{" "}
        <span className="font-medium text-[#eab308]">basic expectation</span> as competitors catch up. With
        the market <span className="font-medium text-[var(--color-text-primary)]">{maturityLabel}</span>, the
        same capability sits further along that shift.
      </p>
    </>
  );
});

export function KanoExpectationShift() {
  const [maturityIdx, setMaturityIdx] = useState(1);
  const [probeT, setProbeT] = useState(0.8);

  const maturity = MATURITY_STAGES[maturityIdx].value;

  const delighterPath = useMemo(
    () => pathFromFn((t) => satisfactionAt(t, "delighter")),
    [],
  );
  const shiftedPath = useMemo(
    () => pathFromFn((t) => shiftedSatisfactionAt(t, maturity)),
    [maturity],
  );
  const shiftedArea = useMemo(
    () => areaPathFromFn((t) => shiftedSatisfactionAt(t, maturity)),
    [maturity],
  );
  const curves = useMemo(
    () => [
      { id: "launch", d: delighterPath, color: "#22c55e", dashed: true as const, opacity: 0.35 },
      { id: "now", d: shiftedPath, areaD: shiftedArea, color: PRIMARY },
    ],
    [delighterPath, shiftedPath, shiftedArea],
  );

  const currentSat = shiftedSatisfactionAt(probeT, maturity);

  return (
    <KanoWidget
      title="Delighters become expectations"
      hint="Hover the chart to explore. Switch maturity to see the curve shift."
    >
      <MaturityControls maturityIdx={maturityIdx} onSelect={setMaturityIdx} />

      <ClientMount>
        <KanoChart
          curves={curves}
          activeColor={PRIMARY}
          onHighlightTChange={setProbeT}
          valueAt={(t) => shiftedSatisfactionAt(t, maturity)}
          metricLabel="Satisfaction"
          metricValue={satisfactionLabel(currentSat)}
          ariaLabel="Feature curve shifting from delighter to basic"
        />
      </ClientMount>

      <KanoStatRow>
        <KanoStat
          label="At launch"
          value={satisfactionLabel(shiftedSatisfactionAt(probeT, 0))}
          accent="#22c55e"
        />
        <KanoStat
          label="Now"
          value={satisfactionLabel(currentSat)}
          accent={PRIMARY}
          highlight
        />
        <KanoStat
          label="Fully mature"
          value={satisfactionLabel(shiftedSatisfactionAt(probeT, 1))}
          accent="#eab308"
        />
      </KanoStatRow>
    </KanoWidget>
  );
}
