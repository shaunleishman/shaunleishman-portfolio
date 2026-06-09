"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useComponentSectionCode } from "../ComponentSectionContext";

const MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

const DATA_BY_YEAR: Record<string, { month: string; value: number }[]> = {
  "Year 1": MONTHS.map((month, i) => ({ month, value: 1.2 + Math.sin(i / 2) * 0.4 + i * 0.05 })),
  "Year 2": MONTHS.map((month, i) => ({ month, value: 1.5 + Math.cos(i / 1.8) * 0.5 + i * 0.04 })),
  "Year 3": MONTHS.map((month, i) => ({ month, value: 1.8 + Math.sin(i / 1.5) * 0.35 + i * 0.03 })),
};

export function InteractiveLineGraph() {
  const [activeYear, setActiveYear] = useState<keyof typeof DATA_BY_YEAR>("Year 2");
  const data = DATA_BY_YEAR[activeYear];
  const total = useMemo(() => Math.round(data.reduce((sum, point) => sum + point.value, 0) * 120000), [data]);

  useComponentSectionCode(`import { InteractiveLineGraph } from './interactive/InteractiveLineGraph';

// Year toggle updates chart data and tooltips
<InteractiveLineGraph />`);

  return (
    <div className="w-full rounded-[var(--radius-medium-radius)] border border-[var(--colour-outlines-neutral)] bg-white p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold tracking-[var(--typography-letter-spacing-md)] text-[var(--colour-labels-neutral)]">
            DD/MM/YY to DD/MM/YY usage
          </p>
          <p className="mt-1 text-3xl font-bold text-[var(--colour-labels-neutral)]">
            {total.toLocaleString()}{" "}
            <span className="text-xl font-bold text-[var(--colour-labels-neutral)]">kWh</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(DATA_BY_YEAR) as (keyof typeof DATA_BY_YEAR)[]).map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => setActiveYear(year)}
              className="h-10 rounded-[var(--radius-medium-radius)] px-4 text-sm font-semibold transition-colors"
              style={{
                backgroundColor:
                  activeYear === year ? "var(--colour-surfaces-primary)" : "var(--colour-surfaces-neutral)",
                color: activeYear === year ? "var(--colour-labels-reverse)" : "var(--colour-labels-neutral)",
                border:
                  activeYear === year
                    ? "1px solid transparent"
                    : "1px solid var(--colour-outlines-neutral)",
              }}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="consumptionFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="18%" stopColor="#00A7B5" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#E0F7FA" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E9E9E9" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#AAB6B4", fontSize: 12 }}
              axisLine={{ stroke: "#8B8B8B" }}
              tickLine={false}
              interval={0}
              angle={0}
              height={40}
            />
            <YAxis
              tick={{ fill: "#AAB6B4", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={36}
              label={{
                value: "Consumption (mWh)",
                angle: -90,
                position: "insideLeft",
                fill: "#AAB6B4",
                fontSize: 12,
                offset: 10,
              }}
            />
            <Tooltip
              cursor={{ stroke: "#00A7B5", strokeWidth: 1 }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #AAB6B4",
                fontSize: 12,
              }}
              formatter={(value) => [`${Number(value ?? 0).toFixed(2)} mWh`, "Consumption"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00A7B5"
              strokeWidth={3}
              fill="url(#consumptionFill)"
              dot={{ r: 5, fill: "#fff", stroke: "#00A7B5", strokeWidth: 3 }}
              activeDot={{ r: 7, fill: "#fff", stroke: "#106C7A", strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
