"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { BULK_SYNTHESISED_LABEL } from "./HalfHourlyBulkDemoPlayback";
import { TUTORIAL_STORAGE_KEY } from "./tutorial-steps";

export type ProjectData = {
  name: string;
  syntheticEnabled: boolean;
  dataResolution: string;
};

type ProjectContextValue = {
  projects: Record<string, ProjectData>;
  toggleSynthetic: (id: string) => void;
  bulkSetSynthetic: (ids: string[], enabled: boolean) => void;
  showTutorial: boolean;
  setShowTutorial: (show: boolean) => void;
  tutorialStep: number;
  setTutorialStep: (step: number) => void;
  tutorialProjectId: string | null;
  beginProjectTutorial: (projectId: string) => void;
  completeTutorial: () => void;
  shouldAutoTutorial: (projectId: string) => boolean;
  forceSyntheticTooltip: boolean;
  setForceSyntheticTooltip: (show: boolean) => void;
};

export const ProjectContext = createContext<ProjectContextValue>({
  projects: {},
  toggleSynthetic: () => {},
  bulkSetSynthetic: () => {},
  showTutorial: false,
  setShowTutorial: () => {},
  tutorialStep: 0,
  setTutorialStep: () => {},
  tutorialProjectId: null,
  beginProjectTutorial: () => {},
  completeTutorial: () => {},
  shouldAutoTutorial: () => false,
  forceSyntheticTooltip: false,
  setForceSyntheticTooltip: () => {},
});

export function useProjectContext() {
  return useContext(ProjectContext);
}

const DEFAULT_PROJECTS: Record<string, ProjectData> = {
  "1": { name: "Building Alpha", syntheticEnabled: true, dataResolution: "Synthetic" },
  "2": { name: "Building Beta", syntheticEnabled: false, dataResolution: "Mixed" },
  "3": { name: "Building Gamma", syntheticEnabled: false, dataResolution: "Mixed" },
  "4": { name: "Building Delta", syntheticEnabled: false, dataResolution: "Mixed" },
  "5": { name: "Building Epsilon", syntheticEnabled: false, dataResolution: "High" },
};

export const HALF_HOURLY_EDIT_PROJECT_DEMO_PROJECTS: Record<string, ProjectData> = {
  "1": {
    name: "Energy Savings test - 1",
    syntheticEnabled: true,
    dataResolution: "Synthetic",
  },
};

export function ProjectProvider({
  children,
  initialProjects = DEFAULT_PROJECTS,
}: {
  children: React.ReactNode;
  initialProjects?: Record<string, ProjectData>;
}) {
  const [projects, setProjects] = useState<Record<string, ProjectData>>(initialProjects);

  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialProjectId, setTutorialProjectId] = useState<string | null>(null);
  const [forceSyntheticTooltip, setForceSyntheticTooltip] = useState(false);

  const toggleSynthetic = useCallback((id: string) => {
    setProjects((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        syntheticEnabled: !prev[id].syntheticEnabled,
        dataResolution: !prev[id].syntheticEnabled ? "Synthetic" : "Mixed",
      },
    }));
  }, []);

  const bulkSetSynthetic = useCallback((ids: string[], enabled: boolean) => {
    setProjects((prev) => {
      let changed = false;
      const next = { ...prev };

      for (const id of ids) {
        if (!next[id]) continue;

        const targetResolution = enabled ? BULK_SYNTHESISED_LABEL : "Mixed";
        if (next[id].syntheticEnabled === enabled && next[id].dataResolution === targetResolution) {
          continue;
        }

        changed = true;
        next[id] = {
          ...next[id],
          syntheticEnabled: enabled,
          dataResolution: targetResolution,
        };
      }

      return changed ? next : prev;
    });
  }, []);

  const completeTutorial = useCallback(() => {
    setShowTutorial(false);
    setTutorialStep(0);
    setTutorialProjectId(null);
    setForceSyntheticTooltip(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(TUTORIAL_STORAGE_KEY, "1");
    }
  }, []);

  const beginProjectTutorial = useCallback((projectId: string) => {
    setTutorialProjectId(projectId);
    setTutorialStep(0);
    setShowTutorial(true);
    setForceSyntheticTooltip(false);
  }, []);

  const shouldAutoTutorial = useCallback((projectId: string) => {
    if (typeof window === "undefined") return false;
    if (sessionStorage.getItem(TUTORIAL_STORAGE_KEY) === "1") return false;
    const project = projects[projectId];
    return Boolean(project && !project.syntheticEnabled);
  }, [projects]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        toggleSynthetic,
        bulkSetSynthetic,
        showTutorial,
        setShowTutorial,
        tutorialStep,
        setTutorialStep,
        tutorialProjectId,
        beginProjectTutorial,
        completeTutorial,
        shouldAutoTutorial,
        forceSyntheticTooltip,
        setForceSyntheticTooltip,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
