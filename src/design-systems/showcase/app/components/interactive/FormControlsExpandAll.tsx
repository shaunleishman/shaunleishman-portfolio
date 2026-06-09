"use client";

import { useState } from "react";
import CheckBox from "../../../imports/CheckBox";
import RadioButton from "../../../imports/RadioButton";
import SliderComponent from "../../../imports/SliderComponent";
import Toggle from "../../../imports/Toggle";

function InteractiveCheckboxRow({ label, initial = false }: { label: string; initial?: boolean }) {
  const [checked, setChecked] = useState(initial);
  return (
    <button type="button" onClick={() => setChecked((value) => !value)} className="flex items-center gap-2">
      <CheckBox checkBox={checked ? "On" : "Off"} comp={false} />
      <span className="text-xs text-[var(--colour-labels-disabled)]">{label}</span>
    </button>
  );
}

function InteractiveRadioGroup() {
  const [selected, setSelected] = useState<"a" | "b">("a");
  return (
    <div className="flex flex-wrap gap-6">
      {(["a", "b"] as const).map((value) => (
        <button key={value} type="button" onClick={() => setSelected(value)} className="flex items-center gap-2">
          <RadioButton radioButton={selected === value ? "On" : "Off-inactive"} />
          <span className="text-xs text-[var(--colour-labels-disabled)]">Option {value.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

function InteractiveToggleRow({ label, initial = false }: { label: string; initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button type="button" onClick={() => setOn((value) => !value)} className="flex items-center gap-2">
      <Toggle toggle={on ? "On" : "Off"} />
      <span className="text-xs text-[var(--colour-labels-disabled)]">{label}</span>
    </button>
  );
}

function InteractiveSliderRow({ label, initial = 42, disabled = false }: { label: string; initial?: number; disabled?: boolean }) {
  const [value, setValue] = useState(initial);
  return (
    <div className="max-w-[311px] space-y-2">
      <p className="text-xs text-[var(--colour-labels-disabled)]">{label}</p>
      <SliderComponent slider={disabled ? "Disabled" : "Active"} value={value} onChange={disabled ? undefined : setValue} className="w-full" />
    </div>
  );
}

export function FormControlsExpandAll() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-8">
        <InteractiveCheckboxRow label="Off" />
        <InteractiveCheckboxRow label="On" initial />
        <CheckBox checkBox="Indeterminate" />
      </div>
      <InteractiveRadioGroup />
      <div className="flex flex-wrap gap-8">
        <InteractiveToggleRow label="Off" />
        <InteractiveToggleRow label="On" initial />
      </div>
      <InteractiveSliderRow label="Active slider" />
      <InteractiveSliderRow label="Disabled slider" initial={13} disabled />
    </div>
  );
}
