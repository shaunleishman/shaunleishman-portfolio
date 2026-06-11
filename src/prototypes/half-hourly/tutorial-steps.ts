import type { TutorialGuideStep } from "./TutorialGuide";

export const PROJECT_TUTORIAL_STEPS: TutorialGuideStep[] = [
  {
    id: "welcome",
    title: "New: synthetic hourly data",
    description:
      "You can now turn low-resolution meter data into half-hourly readings. This walkthrough shows where to find it and how to switch it on.",
    mode: "center",
    primaryLabel: "Show me",
  },
  {
    id: "go-edit",
    title: "Open Edit project",
    description:
      "Synthetic data is enabled in project settings. Open Edit project from the sidebar to find the new switch.",
    mode: "spotlight",
    targetId: "hh-edit-project-nav",
    primaryLabel: "Open edit project",
  },
  {
    id: "toggle",
    title: "Enable synthetic hourly data",
    description:
      "Use this switch to turn on AI-powered half-hourly aggregation. A tooltip explains what it does. Try toggling it on.",
    mode: "spotlight",
    targetId: "synthetic-toggle",
    primaryLabel: "Next",
  },
  {
    id: "green-theme",
    title: "Green means synthetic",
    description:
      "When synthetic data is on, the interface turns green as a reminder that some charts use AI-generated readings. Save and return to the overview to see the updated chart.",
    mode: "center",
    secondaryLabel: "Skip",
  },
];

export const TUTORIAL_STORAGE_KEY = "half-hourly-prototype-tutorial-complete";
