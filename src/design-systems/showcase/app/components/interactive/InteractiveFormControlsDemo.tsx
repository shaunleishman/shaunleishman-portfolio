"use client";

import { useMemo, useState } from "react";
import CheckBox from "../../../imports/CheckBox";
import RadioButton from "../../../imports/RadioButton";
import SliderComponent from "../../../imports/SliderComponent";
import Toggle from "../../../imports/Toggle";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";
import { FormControlsExpandAll } from "./FormControlsExpandAll";

type ControlType = "checkbox" | "radio" | "toggle" | "slider";

export function InteractiveFormControlsDemo() {
  const [control, setControl] = useState<ControlType>("checkbox");
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState<"a" | "b">("a");
  const [toggleOn, setToggleOn] = useState(true);
  const [slider, setSlider] = useState(42);
  const [showAll, setShowAll] = useState(false);

  const liveCode = useMemo(() => {
    switch (control) {
      case "checkbox":
        return `import CheckBox from './imports/CheckBox';

<CheckBox checkBox="${checked ? "On" : "Off"}" />`;
      case "radio":
        return `import RadioButton from './imports/RadioButton';

<RadioButton radioButton="${radio === "a" ? "On" : "Off-inactive"}" />`;
      case "toggle":
        return `import Toggle from './imports/Toggle';

<Toggle toggle="${toggleOn ? "On" : "Off"}" />`;
      case "slider":
        return `import SliderComponent from './imports/SliderComponent';

<SliderComponent slider="Active" value={value} onChange={setValue} />`;
    }
  }, [control, checked, radio, toggleOn, slider]);

  useComponentSectionCode(liveCode, !showAll);

  const preview = (() => {
    switch (control) {
      case "checkbox":
        return (
          <button type="button" onClick={() => setChecked((v) => !v)} className="flex items-center gap-3">
            <CheckBox checkBox={checked ? "On" : "Off"} />
            <span className="text-sm text-[var(--colour-labels-neutral)]">{checked ? "Checked" : "Unchecked"}</span>
          </button>
        );
      case "radio":
        return (
          <div className="flex flex-wrap gap-6">
            {(["a", "b"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRadio(value)}
                className="flex items-center gap-2"
              >
                <RadioButton radioButton={radio === value ? "On" : "Off-inactive"} />
                <span className="text-sm text-[var(--colour-labels-neutral)]">Option {value.toUpperCase()}</span>
              </button>
            ))}
          </div>
        );
      case "toggle":
        return (
          <button type="button" onClick={() => setToggleOn((v) => !v)} className="flex items-center gap-3">
            <Toggle toggle={toggleOn ? "On" : "Off"} />
            <span className="text-sm text-[var(--colour-labels-neutral)]">{toggleOn ? "On" : "Off"}</span>
          </button>
        );
      case "slider":
        return (
          <SliderComponent slider="Active" value={slider} onChange={setSlider} className="w-full max-w-[311px]" />
        );
    }
  })();

  return (
    <div>
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        filters={[
          {
            id: "control",
            label: "Control",
            value: control,
            onChange: (value) => setControl(value as ControlType),
            options: [
              { value: "checkbox", label: "Checkbox" },
              { value: "radio", label: "Radio button" },
              { value: "toggle", label: "Toggle" },
              { value: "slider", label: "Slider" },
            ],
          },
        ]}
      />

      {showAll ? (
        <FormControlsExpandAll />
      ) : (
        <VariantPreviewFrame label={control}>{preview}</VariantPreviewFrame>
      )}
    </div>
  );
}
