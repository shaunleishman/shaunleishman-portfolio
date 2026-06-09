// @ts-nocheck — Figma-exported component previews
"use client";

import { InteractiveTabsDemo } from "./interactive/InteractiveTabsDemo";
import { InteractiveStepsDemo } from "./interactive/InteractiveStepsDemo";
import { InteractiveCardsDemo } from "./interactive/InteractiveCardsDemo";
import { InteractiveModalsDemo } from "./interactive/InteractiveModalsDemo";
import { InteractiveDrawerDemo } from "./interactive/InteractiveDrawerDemo";
import { InteractiveTooltipsDemo } from "./interactive/InteractiveTooltipsDemo";
import { InteractiveLineGraph } from "./interactive/InteractiveLineGraph";
import { InteractiveTableDemo } from "./interactive/InteractiveTableDemo";
import { InteractiveAccordionDemo } from "./interactive/InteractiveNavDemo";
import { InteractiveFormControlsDemo } from "./interactive/InteractiveFormControlsDemo";
import { InteractiveButtonsDemo } from "./interactive/InteractiveButtonsDemo";
import { InteractiveInputsDemo } from "./interactive/InteractiveInputsDemo";
import { InteractiveBadgesDemo } from "./interactive/InteractiveBadgesDemo";
import { InteractiveProgressDemo } from "./interactive/InteractiveProgressDemo";
import { InteractiveCalendarsDemo } from "./interactive/InteractiveCalendarsDemo";
import { InteractiveIconsDemo } from "./interactive/InteractiveIconsDemo";
import { InteractiveDropdownsDemo } from "./interactive/InteractiveDropdownsDemo";
import { InteractiveNavigationDemo } from "./interactive/InteractiveNavigationDemo";
import { InteractiveFiltersDemo } from "./interactive/InteractiveFiltersDemo";

export function GallerySectionBody({ id }: { id: string }) {
  switch (id) {
    case "buttons":
      return <InteractiveButtonsDemo />;
    case "inputs":
      return <InteractiveInputsDemo />;
    case "dropdowns":
      return <InteractiveDropdownsDemo />;
    case "form-controls":
      return <InteractiveFormControlsDemo />;
    case "progress":
      return <InteractiveProgressDemo />;
    case "calendars":
      return <InteractiveCalendarsDemo />;
    case "filters":
      return <InteractiveFiltersDemo />;
    case "badges":
      return <InteractiveBadgesDemo />;
    case "tables":
      return <InteractiveTableDemo />;
    case "navigation":
      return <InteractiveNavigationDemo />;
    case "tabs":
      return <InteractiveTabsDemo />;
    case "cards":
      return <InteractiveCardsDemo />;
    case "steps":
      return <InteractiveStepsDemo />;
    case "modals":
      return <InteractiveModalsDemo />;
    case "tooltips":
      return <InteractiveTooltipsDemo />;
    case "drawers":
      return <InteractiveDrawerDemo />;
    case "charts":
      return <InteractiveLineGraph />;
    case "accordions":
      return <InteractiveAccordionDemo />;
    case "icons":
      return <InteractiveIconsDemo />;
    default:
      return null;
  }
}
