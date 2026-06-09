"use client";

import Link from "next/link";
import { useHalfHourlyPathname } from "./HalfHourlyEmbedContext";
import { useState, useEffect, useMemo } from "react";
import {
  Info,
  Download,
  ChevronLeft,
  Trash2,
  ChevronRight,
  MapPin,
  Zap,
  FileText,
  Building,
  Building2,
  Sparkles,
  Flame,
  Search,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Button, Chip, ContentTabs, Dropdown, Input, Toggle, Tooltip as ArbncoTooltip, TooltipAnchor } from "@/design-systems/arbnco";
import { cn } from "@/lib/utils";
import { HalfHourlySidebar, type HalfHourlyMainSection, type HalfHourlySubSection } from "./HalfHourlySidebar";
import { ProjectListTable, ProjectListPagination } from "./ProjectListTable";
import {
  BULK_SYNTHESISE_DEMO_IDS,
  BULK_SYNTHESISED_LABEL,
  useBulkDemoPlaybackStep,
} from "./HalfHourlyBulkDemoPlayback";
import { GenerateReportModal } from "./GenerateReportModal";
import { EDIT_PROJECT_SECTIONS } from "./EditProjectSections";
import { useProjectContext } from "./context";
import { useHalfHourlyNav } from "./useHalfHourlyNav";
import { TutorialGuide } from "./TutorialGuide";
import { PROJECT_TUTORIAL_STEPS } from "./tutorial-steps";
import {
  DisaggregationContent,
  OperationalPatternsContent,
} from "./HalfHourlySubPages";

function ProjectTutorialHost() {
  const {
    showTutorial,
    tutorialStep,
    setTutorialStep,
    completeTutorial,
    tutorialProjectId,
    setForceSyntheticTooltip,
  } = useProjectContext();
  const { navigate } = useHalfHourlyNav();

  if (!showTutorial) return null;

  const current = PROJECT_TUTORIAL_STEPS[tutorialStep];

  function handlePrimary() {
    if (current?.id === "go-edit" && tutorialProjectId) {
      navigate(`/project/${tutorialProjectId}/edit`);
      setForceSyntheticTooltip(true);
      setTutorialStep(tutorialStep + 1);
      return;
    }
    setTutorialStep(Math.min(tutorialStep + 1, PROJECT_TUTORIAL_STEPS.length - 1));
  }

  return (
    <TutorialGuide
      step={tutorialStep}
      steps={PROJECT_TUTORIAL_STEPS}
      onNext={() => setTutorialStep(Math.min(tutorialStep + 1, PROJECT_TUTORIAL_STEPS.length - 1))}
      onClose={completeTutorial}
      onPrimary={handlePrimary}
    />
  );
}

function Header({ accentColor }: { accentColor: string }) {
  const { navigate } = useHalfHourlyNav();

  return (
    <div
      className="bg-white px-6 lg:px-10 py-4 flex items-center justify-between border-b-[1.5px] sticky top-0 z-10"
      style={{ borderColor: accentColor }}
    >
      <div className="flex cursor-pointer items-center gap-2" onClick={() => navigate("/")}>
        <span className="hh-display text-sm font-light text-[#4A5453] lg:text-[14.627px]">arbnco energy</span>
        <span className="hh-display text-sm font-light lg:text-[14.627px]" style={{ color: accentColor }}>
          Insight
        </span>
      </div>
      <div>
        <button
          type="button"
          className="text-sm font-semibold hover:opacity-80 lg:text-base"
          style={{ color: accentColor }}
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function ProjectNotFound() {
  const { base } = useHalfHourlyNav();

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8">
      <p className="text-sm text-[#666]">Project not found.</p>
      <Link href={base} className="font-semibold text-sm text-[#00a7b5] hover:underline">
        Back to project list
      </Link>
    </div>
  );
}

/** Top-level app shell for main navigation sections (overview, project list, alerts, settings). */
export function MainSectionShell({
  activeMainSection,
  children,
  embedded = false,
}: {
  activeMainSection: HalfHourlyMainSection;
  children: React.ReactNode;
  embedded?: boolean;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#f5f6f6] lg:flex-row">
      <HalfHourlySidebar accentColor="#00a7b5" activeMainSection={activeMainSection} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header accentColor="#00a7b5" />
        <div
          className={cn(
            "min-h-0 flex-1",
            embedded ? "overflow-hidden" : "overflow-y-auto overscroll-contain",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function MainPlaceholderPage({
  activeMainSection,
  title,
  description,
}: {
  activeMainSection: HalfHourlyMainSection;
  title: string;
  description: string;
}) {
  return (
    <MainSectionShell activeMainSection={activeMainSection}>
      <div className="p-4 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-col items-start gap-2 lg:mb-8">
            <h3 className="font-bold text-xl lg:text-2xl text-[#404040]">{title}</h3>
          </div>
          <div className="rounded-lg border border-[#aab6b4] bg-white p-6 shadow-sm lg:p-8">
            <p className="text-sm text-[#666]">{description}</p>
          </div>
        </div>
      </div>
    </MainSectionShell>
  );
}

function resolveActiveSubSection(pathname: string, projectId: string): HalfHourlySubSection {
  const base = `/project/${projectId}`;
  const routes: [string, HalfHourlySubSection][] = [
    [`${base}/edit`, "edit-project"],
    [`${base}/energy-consumption`, "energy-consumption"],
    [`${base}/benchmarking`, "benchmarking"],
    [`${base}/carbon`, "carbon"],
    [`${base}/energy-conservation-measures`, "ecm"],
    [`${base}/alerts`, "alerts"],
    [`${base}/integration`, "integration"],
  ];

  for (const [path, section] of routes) {
    if (pathname.includes(path)) return section;
  }

  return "about";
}

/** Persistent shell for project sub-routes — sidebar and header stay mounted while content swaps. */
export function ProjectShell({
  projectId,
  children,
  activeSubSection,
  embedded = false,
}: {
  projectId: string;
  children: React.ReactNode;
  activeSubSection?: HalfHourlySubSection;
  embedded?: boolean;
}) {
  const pathname = useHalfHourlyPathname();
  const { projects } = useProjectContext();
  const project = projects[projectId];

  if (!project) {
    return (
      <div className="flex h-full min-h-0 flex-col bg-[#f5f6f6]">
        <ProjectNotFound />
      </div>
    );
  }

  const accentColor = project.syntheticEnabled ? "#14a35c" : "#00a7b5";
  const resolvedSubSection =
    activeSubSection ?? resolveActiveSubSection(pathname, projectId);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#f5f6f6] lg:flex-row">
      <HalfHourlySidebar
        currentProject={project}
        currentProjectId={projectId}
        accentColor={accentColor}
        activeMainSection="project-list"
        activeSubSection={resolvedSubSection}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header accentColor={accentColor} />
        <div
          className={cn(
            "min-h-0 flex-1",
            embedded ? "overflow-hidden" : "overflow-y-auto overscroll-contain",
          )}
        >
          {children}
        </div>
      </div>

      {!embedded && <ProjectTutorialHost />}
    </div>
  );
}

export function ProjectListPage({ demoMode = false }: { demoMode?: boolean }) {
  const { navigate } = useHalfHourlyNav();
  const { projects, beginProjectTutorial, bulkSetSynthetic } = useProjectContext();
  const playbackStep = useBulkDemoPlaybackStep();
  const [resolutionFilter, setResolutionFilter] = useState<"all" | "synthetic" | "mixed">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (!demoMode) return;

    const ids = [...BULK_SYNTHESISE_DEMO_IDS];

    switch (playbackStep) {
      case "idle":
        bulkSetSynthetic(ids, false);
        setSelectedIds(new Set());
        break;
      case "pick-2":
        bulkSetSynthetic(ids, false);
        setSelectedIds(new Set(["2"]));
        break;
      case "pick-3":
        bulkSetSynthetic(ids, false);
        setSelectedIds(new Set(["2", "3"]));
        break;
      case "pick-4":
        bulkSetSynthetic(ids, false);
        setSelectedIds(new Set(["2", "3", "4"]));
        break;
      case "selected":
      case "synthesise":
        bulkSetSynthetic(ids, false);
        setSelectedIds(new Set(ids));
        break;
      case "synthesised":
        bulkSetSynthetic(ids, true);
        setSelectedIds(new Set(ids));
        break;
    }
  }, [bulkSetSynthetic, demoMode, playbackStep]);

  const projectList = Object.entries(projects).map(([id, data]) => ({
    id,
    name: data.name,
    dataResolution: data.dataResolution,
  }));

  const syntheticCount = projectList.filter(
    (p) => p.dataResolution === "Synthetic" || p.dataResolution === BULK_SYNTHESISED_LABEL,
  ).length;
  const mixedCount = projectList.filter((p) => p.dataResolution === "Mixed").length;

  const filteredProjects = useMemo(() => {
    if (resolutionFilter === "synthetic") {
      return projectList.filter(
        (p) => p.dataResolution === "Synthetic" || p.dataResolution === BULK_SYNTHESISED_LABEL,
      );
    }
    if (resolutionFilter === "mixed") {
      return projectList.filter((p) => p.dataResolution === "Mixed");
    }
    return projectList;
  }, [projectList, resolutionFilter]);

  const synthesisableSelectedIds = useMemo(
    () => Array.from(selectedIds).filter((id) => projects[id]?.dataResolution === "Mixed"),
    [projects, selectedIds],
  );

  const revertableSelectedIds = useMemo(
    () =>
      Array.from(selectedIds).filter((id) => {
        const project = projects[id];
        return project?.syntheticEnabled || project?.dataResolution === BULK_SYNTHESISED_LABEL;
      }),
    [projects, selectedIds],
  );

  const canSynthesiseSelection = synthesisableSelectedIds.length > 0;
  const canRevertSelection = revertableSelectedIds.length > 0;
  const showBulkToolbarActions =
    selectedIds.size > 0 && (canSynthesiseSelection || canRevertSelection);

  function handleBulkSynthesise() {
    if (synthesisableSelectedIds.length === 0) return;
    bulkSetSynthetic(synthesisableSelectedIds, true);
  }

  function handleBulkRevert() {
    if (revertableSelectedIds.length === 0) return;
    bulkSetSynthetic(revertableSelectedIds, false);
  }

  return (
    <MainSectionShell activeMainSection="project-list" embedded={demoMode}>
      <div className={demoMode ? "p-3" : "p-4 lg:p-8"}>
        <div className="mx-auto max-w-7xl">
          <div
            className={cn(
              "mb-4 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center",
              demoMode && "mb-2 gap-2",
            )}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <FileText className="size-5 shrink-0 text-[#666] lg:size-6" aria-hidden />
                <h3
                  className={cn(
                    "font-bold text-[#404040]",
                    demoMode ? "text-lg" : "text-xl lg:text-2xl",
                  )}
                >
                  Project list
                </h3>
              </div>
              <p
                className={cn(
                  "mt-1 text-[#666] lg:pl-9",
                  demoMode ? "line-clamp-1 text-xs" : "text-sm",
                )}
              >
                All buildings in your portfolio — open a project to view energy data, run reports, or configure meters.
              </p>
            </div>
            <div className="flex w-full shrink-0 gap-2 lg:w-auto lg:gap-3">
              <Button variant="tertiary" size="md" className="flex-1 lg:flex-none">
                Generate report
                <Download className="size-4" />
              </Button>
              <Button variant="primary" size="md" className="flex-1 lg:flex-none">
                Add project
              </Button>
            </div>
          </div>

          {!demoMode ? (
            <div className="mb-6 rounded-lg border border-[#00a7b5]/25 bg-[#00a7b5]/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#00838f]">What this page is for</p>
              <p className="mt-2 text-sm text-[#404040]">
                Search and select buildings, compare data resolution at a glance, and jump into the tutorial to see how
                synthetic hourly data unlocks half-hourly charts. Resolution chips show whether a building uses actual
                reads, mixed-frequency data, or AI-generated hourly profiles.
              </p>
            </div>
          ) : null}

          <ContentTabs
            value={resolutionFilter}
            tabs={[
              { value: "all", label: "All projects", count: projectList.length },
              { value: "synthetic", label: "Synthetic", count: syntheticCount },
              { value: "mixed", label: "Mixed resolution", count: mixedCount },
            ]}
            onChange={(value) => setResolutionFilter(value as "all" | "synthetic" | "mixed")}
            fillRemaining={false}
            className={demoMode ? "mb-3" : "mb-6"}
          />

          <div
            className={cn(
              "rounded-lg border border-[#aab6b4] bg-white shadow-sm",
              demoMode ? "overflow-hidden p-3" : "p-4 lg:p-8",
            )}
          >
            <div
              id="project-list-table-toolbar"
              className={cn(
                "mb-4 flex flex-wrap items-center justify-between gap-[var(--measurement-spacing-md)]",
                demoMode && "mb-3",
              )}
            >
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[var(--measurement-spacing-md)]">
                <p className="shrink-0 self-center whitespace-nowrap text-sm font-semibold leading-none tracking-[var(--typography-letter-spacing-md)] text-[#404040]">
                  {selectedIds.size > 0
                    ? `${selectedIds.size} selected`
                    : `${filteredProjects.length} buildings`}
                </p>
                <Input
                  className="min-w-[12rem] flex-1 self-center lg:max-w-md"
                  placeholder="Search by name, asset ID, meter ID or reference"
                  leadingIcon={<Search className="size-4" aria-hidden />}
                  readOnly={demoMode}
                  tabIndex={demoMode ? -1 : undefined}
                  showTooltip={false}
                />
              </div>

              <div
                id="project-list-toolbar-actions"
                className="flex flex-wrap items-center gap-[var(--measurement-spacing-xs)]"
              >
                {showBulkToolbarActions ? (
                  <>
                    {canSynthesiseSelection ? (
                      <Button
                        id="demo-bulk-synthesise"
                        variant="primary"
                        size="md"
                        type="button"
                        onClick={demoMode ? undefined : handleBulkSynthesise}
                      >
                        Synthesise
                      </Button>
                    ) : null}
                    {canRevertSelection ? (
                      <Button
                        id="demo-bulk-revert"
                        variant="tertiary"
                        size="md"
                        type="button"
                        onClick={demoMode ? undefined : handleBulkRevert}
                      >
                        Revert project
                      </Button>
                    ) : null}
                  </>
                ) : null}
                {!demoMode && !showBulkToolbarActions ? (
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={() => {
                      beginProjectTutorial("2");
                      navigate("/project/2");
                    }}
                  >
                    <Sparkles className="size-4" />
                    Tutorial
                  </Button>
                ) : null}
              </div>
            </div>

            <ProjectListTable projects={filteredProjects} compact={demoMode} selectedIds={selectedIds} onSelectedIdsChange={setSelectedIds} disableRowNavigation={demoMode} />

            <ProjectListPagination
              resultCount={filteredProjects.length}
              compact={demoMode}
              pageSizeDisabled={demoMode}
              menuPlacement={demoMode ? "above" : "below"}
            />
          </div>
        </div>
      </div>
      {!demoMode ? <ProjectTutorialHost /> : null}
    </MainSectionShell>
  );
}

export function HalfHourlyBulkSynthesiseDemo() {
  return <ProjectListPage demoMode />;
}

export function EditProjectPage({
  projectId,
  demoMode = false,
}: {
  projectId: string;
  demoMode?: boolean;
}) {
  const { navigate } = useHalfHourlyNav();
  const {
    projects,
    toggleSynthetic,
    forceSyntheticTooltip,
    setForceSyntheticTooltip,
    showTutorial,
    tutorialStep,
    setTutorialStep,
  } = useProjectContext();
  const [showTooltip, setShowTooltip] = useState(false);

  const project = projects[projectId];

  useEffect(() => {
    if (demoMode) return;
    if (forceSyntheticTooltip) {
      setShowTooltip(true);
    }
  }, [demoMode, forceSyntheticTooltip]);

  useEffect(() => {
    if (demoMode) return;
    const seen = sessionStorage.getItem("half-hourly-synthetic-tooltip-seen");
    if (!seen && project && !project.syntheticEnabled && !forceSyntheticTooltip) {
      setShowTooltip(true);
      sessionStorage.setItem("half-hourly-synthetic-tooltip-seen", "1");
    }
  }, [demoMode, project, forceSyntheticTooltip]);

  if (!project) {
    return null;
  }

  const accentColor = project.syntheticEnabled ? "#14a35c" : undefined;

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
              <Button
                variant="tertiary"
                size="md"
                onClick={() => navigate(`/project/${projectId}`)}
                className="gap-2"
              >
                <ChevronLeft className="size-5" />
                Back
              </Button>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-base text-[#666]">Edit Project</span>
                <span className="text-base text-[#666]">{project.name}</span>
                {project.syntheticEnabled && (
                  <Chip tone="success-solid" size="sm" className="gap-1">
                    <Sparkles className="size-2.5" />
                    Synthetic data
                  </Chip>
                )}
              </div>
              <div className="flex-1"></div>
              <div className="flex gap-2 w-full lg:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  accentColor={accentColor}
                  onClick={() => navigate(`/project/${projectId}`)}
                  className="flex-1 lg:flex-none"
                >
                  Save and exit
                </Button>
                <Button
                  variant="tertiary"
                  size="md"
                  aria-label="Delete project"
                  className="text-[var(--colour-states-error)] hover:bg-[var(--colour-states-error-bg)]"
                >
                  <Trash2 className="size-5" />
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#aab6b4] p-6 lg:p-8 shadow-sm">
              <h1 className="font-bold text-2xl lg:text-3xl text-[#404040] mb-4">Edit Project</h1>
              <p className="text-sm text-[#666] mb-2">
                Review, edit and update your project details here.
              </p>
              <p className="text-xs text-[#999] mb-8">
                Your edits will be applied and reprocessing triggered only after saving the changes.
              </p>

              <div className="relative mb-8">
                <div
                  id="synthetic-toggle"
                  className="p-5 rounded-lg border-2 transition-all"
                  style={{
                    borderColor: project.syntheticEnabled ? "#14a35c" : "#e0e0e0",
                    backgroundColor: project.syntheticEnabled ? "#f0f9f4" : "#fff",
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="font-bold text-base lg:text-lg text-[#404040] mb-2 flex items-center gap-2">
                        Enable synthetic hourly data
                        <TooltipAnchor
                          open={showTooltip}
                          onOpenChange={setShowTooltip}
                          placement="bottom-start"
                          tooltip={
                            <ArbncoTooltip
                              title="Synthetic hourly data"
                              variant="dark"
                              pointerSide="top"
                              showIcon
                              icon={<Sparkles className="mt-0.5 size-5 shrink-0 text-white" aria-hidden />}
                              onClose={() => {
                                setShowTooltip(false);
                                setForceSyntheticTooltip(false);
                              }}
                            >
                              Transform your low-resolution data into detailed hourly readings. Toggle the switch to
                              see half-hourly charts on the overview.
                            </ArbncoTooltip>
                          }
                        >
                          <Button
                            type="button"
                            variant="tertiary"
                            size="sm"
                            onClick={() => setShowTooltip(!showTooltip)}
                            className="size-8 min-w-8 border-transparent p-0 text-[var(--colour-labels-primary)] hover:bg-transparent hover:text-[var(--colour-surfaces-primary-hover)]"
                            aria-label="About synthetic hourly data"
                            aria-expanded={showTooltip}
                          >
                            <Info className="size-4" />
                          </Button>
                        </TooltipAnchor>
                      </h3>
                      <p className="text-sm text-[#666] mb-3">
                        {project.syntheticEnabled
                          ? "Get more gradular results"
                          : "Only available for projects that include electricity or natural gas data, with a minimum of 12 months of low resolution data."}
                      </p>
                      {project.syntheticEnabled && (
                        <div className="flex items-start gap-2 p-3 rounded bg-[#e3f2fd] border border-[#90caf9]">
                          <Info className="size-4 text-[#1976d2] mt-0.5 shrink-0" />
                          <p className="text-xs text-[#1565c0]">
                            The graphs presented here are based on high resolution data. This is because the relevant
                            calculations require hourly or sub-hourly consumption data.
                          </p>
                        </div>
                      )}
                    </div>
                    <Toggle
                      checked={project.syntheticEnabled}
                      onCheckedChange={() => {
                        toggleSynthetic(projectId);
                        if (!demoMode && showTutorial && tutorialStep === 2) {
                          setTutorialStep(3);
                        }
                      }}
                      className="shrink-0"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {EDIT_PROJECT_SECTIONS.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.slug}
                      type="button"
                      variant="tertiary"
                      className="h-auto w-full justify-between p-4 text-left"
                      onClick={() => navigate(`/project/${projectId}/edit/${section.slug}`)}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="size-6 text-[#666]" />
                        <div>
                          <h4 className="font-semibold text-sm lg:text-base text-[#404040]">
                            {section.title}
                          </h4>
                          <p className="text-xs lg:text-sm text-[#999]">{section.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Chip tone="success">{section.status}</Chip>
                        <ChevronRight className="size-5 text-[#999]" />
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
      </div>
    </div>
  );
}

export function ProjectPlaceholderPage({
  projectId,
  title,
  description,
}: {
  projectId: string;
  title: string;
  description: string;
}) {
  const { projects } = useProjectContext();
  const project = projects[projectId];

  if (!project) {
    return null;
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col items-start gap-2 lg:mb-8">
          <h3 className="font-bold text-xl lg:text-2xl text-[#404040]">{title}</h3>
          <p className="text-sm text-[#666]">{project.name}</p>
        </div>

        <div className="rounded-lg border border-[#aab6b4] bg-white p-6 shadow-sm lg:p-8">
          <p className="text-sm text-[#666]">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function ProjectAboutPage({ projectId }: { projectId: string }) {
  const { projects, shouldAutoTutorial, beginProjectTutorial } = useProjectContext();

  const project = projects[projectId];

  useEffect(() => {
    if (shouldAutoTutorial(projectId)) {
      beginProjectTutorial(projectId);
    }
  }, [projectId, shouldAutoTutorial, beginProjectTutorial]);

  if (!project) {
    return null;
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col items-start gap-2 lg:mb-8">
          <h3 className="font-bold text-xl lg:text-2xl text-[#404040]">About the building</h3>
          <p className="text-sm text-[#666]">{project.name}</p>
        </div>

        <div className="bg-white rounded-lg border border-[#aab6b4] p-6 lg:p-8 shadow-sm">
          <h1 className="font-bold text-2xl lg:text-3xl text-[#404040] mb-4">{project.name}</h1>
          <p className="text-sm text-[#666] mb-8">
            Essential building information for this project. Review address, size, and type before exploring energy
            data.
          </p>

          <div className="space-y-4">
            {[
              { icon: MapPin, label: "Address", value: "123 Sample St" },
              { icon: Building2, label: "Area", value: "5000 m²" },
              { icon: Building, label: "Building type", value: "Office" },
              { icon: FileText, label: "Data resolution", value: project.dataResolution },
            ].map((field) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.label}
                  className="flex items-start gap-4 rounded-lg border border-[#e0e0e0] p-4"
                >
                  <Icon className="mt-0.5 size-5 shrink-0 text-[#666]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#999]">{field.label}</p>
                    <p className="mt-1 text-sm font-medium text-[#404040]">{field.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const CHART_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const CHART_ACTUAL_VALUES = [1200, 1150, 1300, 450, 520, 580, 640, 695, 755, 810, 875, 920];
const CHART_SYNTHETIC_VALUES = [450, 520, 580, 640, 695, 755, 810, 875, 920, 980, 1035, 1090];
const CHART_GAS_ACTUAL_VALUES = [620, 590, 660, 240, 275, 305, 335, 360, 385, 410, 430, 455];
const CHART_GAS_SYNTHETIC_VALUES = [240, 275, 305, 335, 360, 385, 410, 430, 455, 480, 505, 530];

const METER_OPTIONS = [
  { value: "all", label: "All meters" },
  { value: "elec-main", label: "Electricity — Main" },
  { value: "gas-main", label: "Gas — Main" },
  { value: "elec-solar", label: "Electricity — Solar" },
];

function buildEnergyChartData(syntheticEnabled: boolean, fuel: "electricity" | "gas") {
  const actualValues = fuel === "gas" ? CHART_GAS_ACTUAL_VALUES : CHART_ACTUAL_VALUES;
  const syntheticValues = fuel === "gas" ? CHART_GAS_SYNTHETIC_VALUES : CHART_SYNTHETIC_VALUES;

  return CHART_MONTHS.map((month, index) => {
    const useSynthetic = syntheticEnabled && index >= 3;
    return {
      month,
      value: useSynthetic ? syntheticValues[index] : actualValues[index],
      series: useSynthetic ? ("synthetic" as const) : ("actual" as const),
    };
  });
}

/** Slightly lower consumption in earlier years so year filters visibly change the chart. */
function yearChartScale(year: string) {
  return 1 + (Number(year) - 2023) * 0.04;
}

export type EnergyOverviewTab = "consumption" | "patterns" | "wastage";

function resolveEnergyOverviewTab(pathname: string, projectId: string): EnergyOverviewTab {
  if (pathname.includes(`/project/${projectId}/energy-consumption/operational-patterns`)) return "patterns";
  if (pathname.includes(`/project/${projectId}/energy-consumption/disaggregation`)) return "wastage";
  return "consumption";
}

function energyOverviewTabHref(projectId: string, tab: EnergyOverviewTab) {
  if (tab === "patterns") return `/project/${projectId}/energy-consumption/operational-patterns`;
  if (tab === "wastage") return `/project/${projectId}/energy-consumption/disaggregation`;
  return `/project/${projectId}/energy-consumption`;
}

export function EnergyOverviewShell({
  projectId,
  children,
}: {
  projectId: string;
  children: React.ReactNode;
}) {
  const pathname = useHalfHourlyPathname();
  const { navigate } = useHalfHourlyNav();
  const { projects } = useProjectContext();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportStatus, setReportStatus] = useState<string | null>(null);
  const project = projects[projectId];

  if (!project) {
    return null;
  }

  const syntheticEnabled = project.syntheticEnabled;
  const accentColor = syntheticEnabled ? "#14a35c" : "#00a7b5";
  const activeTab = resolveEnergyOverviewTab(pathname, projectId);

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {!syntheticEnabled && (
          <button
            type="button"
            onClick={() => navigate(`/project/${projectId}/edit`)}
            className="mb-6 flex w-full items-start gap-3 rounded-lg border border-[#00a7b5]/30 bg-[#00a7b5]/10 p-4 text-left transition-colors hover:bg-[#00a7b5]/15"
          >
            <Sparkles className="mt-0.5 size-5 shrink-0 text-[#00a7b5]" />
            <span>
              <span className="block text-sm font-bold text-[#00838f]">Try synthetic hourly data</span>
              <span className="mt-1 block text-sm text-[#4a5453]">
                Open Edit project to enable the new switch and unlock half-hourly charts.
              </span>
            </span>
            <ChevronRight className="ml-auto size-5 shrink-0 text-[#00a7b5]" />
          </button>
        )}

        <div className="mb-6 flex flex-col items-start justify-between gap-4 lg:mb-8 lg:flex-row lg:items-baseline">
          <h3 className="font-bold text-xl lg:text-2xl text-[#404040]">Energy Consumption Overview</h3>
          <Button
            variant="tertiary"
            size="md"
            className="w-full gap-3 lg:w-auto"
            onClick={() => setReportModalOpen(true)}
          >
            Generate report
            <Download className="size-4" />
          </Button>
        </div>

        {reportStatus && (
          <p className="mb-4 text-sm text-[#4a5453]" role="status">
            {reportStatus}
          </p>
        )}

        <GenerateReportModal
          open={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          onGenerate={({ reportType, from, to }) => {
            const label =
              {
                "energy-summary": "Energy consumption summary",
                "operational-patterns": "Operational patterns",
                "carbon-emissions": "Carbon emissions",
                disaggregation: "Disaggregation & wastage",
                "full-building": "Full building report",
              }[reportType] ?? "Report";

            setReportStatus(`Generating ${label} (${from} to ${to})…`);
            setReportModalOpen(false);
          }}
        />

        <div className="mb-6 lg:mb-8">
          <ContentTabs
            value={activeTab}
            accentColor={accentColor}
            onChange={(tab) => navigate(energyOverviewTabHref(projectId, tab as EnergyOverviewTab))}
            tabs={[
              { value: "consumption", label: "Energy Consumption" },
              { value: "patterns", label: "Operational Patterns" },
              { value: "wastage", label: "Disaggregation & Potential Wastage" },
            ]}
          />
        </div>

        {children}
      </div>
    </div>
  );
}

export function EnergyConsumptionTabPage({ projectId }: { projectId: string }) {
  const { projects } = useProjectContext();
  const [fuel, setFuel] = useState<"electricity" | "gas">("electricity");
  const [activeYear, setActiveYear] = useState("2023");
  const [activeMeter, setActiveMeter] = useState("all");

  const project = projects[projectId];

  if (!project) {
    return null;
  }

  const syntheticEnabled = project.syntheticEnabled;
  const accentColor = syntheticEnabled ? "#14a35c" : "#00a7b5";
  const chartData = useMemo(() => {
    const meterScale =
      activeMeter === "elec-main" ? 0.72 : activeMeter === "gas-main" ? 0.41 : activeMeter === "elec-solar" ? 0.18 : 1;
    const yearScale = yearChartScale(activeYear);

    return buildEnergyChartData(syntheticEnabled, fuel).map((row) => ({
      ...row,
      value: Math.round(row.value * meterScale * yearScale),
    }));
  }, [syntheticEnabled, activeMeter, fuel, activeYear]);

  return (
    <>
            <div className="mb-6 lg:mb-8">
              <h4 className="font-normal text-base lg:text-lg text-[#313131] mb-3 lg:mb-4">
                Energy Consumption Time Series
              </h4>
              <p className="font-normal text-sm lg:text-base text-[#404040] mb-4 lg:mb-6">
                The energy consumption time series graph shows how much energy was used at different times and the
                predicted energy consumption in your building.{" "}
                <span className="cursor-pointer hover:underline" style={{ color: accentColor }}>
                  See more…
                </span>
              </p>

              <div className="mb-6 flex gap-2">
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => setFuel("electricity")}
                  className="border-transparent"
                  style={{
                    backgroundColor: fuel === "electricity" ? accentColor : "#e5e8e7",
                    color: fuel === "electricity" ? "#fff" : "#4a5453",
                  }}
                >
                  <Zap className="size-3" />
                  Electricity
                </Button>
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => setFuel("gas")}
                  className="border-transparent"
                  style={{
                    backgroundColor: fuel === "gas" ? accentColor : "#e5e8e7",
                    color: fuel === "gas" ? "#fff" : "#4a5453",
                  }}
                >
                  <Flame className="size-3" />
                  Gas
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#aab6b4] p-4 lg:p-8 shadow-sm">
              {syntheticEnabled && (
                <div className="mb-6 p-4 rounded-lg bg-[#e8f5e9] border border-[#4caf50]">
                  <div className="flex items-start gap-3">
                    <Info className="size-5 text-[#2e7d32] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs lg:text-sm text-[#2e7d32]">
                        <strong>The graphs presented here are based on high resolution data.</strong> This is because
                        the relevant calculations require hourly or sub-hourly consumption data.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 lg:gap-4 mb-6">
                <div className="w-full lg:w-52">
                  <Dropdown
                    label="Meter"
                    value={activeMeter}
                    options={METER_OPTIONS}
                    onChange={setActiveMeter}
                    accentColor={accentColor}
                    className="!w-full"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {["2019", "2020", "2021", "2022", "2023"].map((year) => (
                    <Button
                      key={year}
                      variant="tertiary"
                      size="sm"
                      onClick={() => setActiveYear(year)}
                      className="min-w-[80px] border-transparent"
                      style={{
                        backgroundColor: activeYear === year ? accentColor : "#e5e8e7",
                        color: activeYear === year ? "#fff" : "#000",
                      }}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="h-64 lg:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
                    barCategoryGap="18%"
                    barSize={28}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E6E6E6" />
                    <XAxis
                      dataKey="month"
                      interval={0}
                      tick={{ fill: "#333", fontSize: 11 }}
                      label={{
                        value: "Months",
                        position: "insideBottom",
                        offset: -10,
                        style: { fontSize: 12, fontWeight: "bold" },
                      }}
                    />
                    <YAxis
                      tick={{ fill: "#333", fontSize: 11 }}
                      label={{
                        value: "kWh",
                        angle: -90,
                        position: "insideLeft",
                        style: { fontSize: 12, fontWeight: "bold" },
                      }}
                    />
                    <Tooltip
                      formatter={(value, _name, item) => [
                        value ?? 0,
                        item.payload.series === "synthetic" ? "AI-Generated (Synthetic)" : "Actual Data",
                      ]}
                    />
                    <Bar dataKey="value" legendType="none">
                      {chartData.map((entry) => (
                        <Cell
                          key={entry.month}
                          fill={entry.series === "synthetic" ? "#9E9E9E" : "#212121"}
                          fillOpacity={entry.series === "synthetic" ? 0.7 : 1}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <ul className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-[#4a5453]">
                  <li className="flex items-center gap-2">
                    <span className="size-3 rounded-sm bg-[#212121]" aria-hidden />
                    Actual Data
                  </li>
                  {syntheticEnabled && (
                    <li className="flex items-center gap-2">
                      <span className="size-3 rounded-sm bg-[#9E9E9E]/70" aria-hidden />
                      AI-Generated (Synthetic)
                    </li>
                  )}
                </ul>
              </div>
            </div>
    </>
  );
}

export function OperationalPatternsTabPage({ projectId }: { projectId: string }) {
  const { projects } = useProjectContext();
  const project = projects[projectId];

  if (!project) {
    return null;
  }

  const accentColor = project.syntheticEnabled ? "#14a35c" : "#00a7b5";

  return (
    <div className="bg-white rounded-lg border border-[#aab6b4] p-4 lg:p-8 shadow-sm">
      <OperationalPatternsContent
        projectName={project.name}
        accentColor={accentColor}
        syntheticEnabled={project.syntheticEnabled}
      />
    </div>
  );
}

export function DisaggregationTabPage({ projectId }: { projectId: string }) {
  const { projects } = useProjectContext();
  const project = projects[projectId];

  if (!project) {
    return null;
  }

  const accentColor = project.syntheticEnabled ? "#14a35c" : "#00a7b5";

  return (
    <div className="bg-white rounded-lg border border-[#aab6b4] p-4 lg:p-8 shadow-sm">
      <DisaggregationContent
        projectName={project.name}
        accentColor={accentColor}
        syntheticEnabled={project.syntheticEnabled}
      />
    </div>
  );
}

const HALF_HOURLY_EDIT_PROJECT_DEMO_ID = "1";

export type HalfHourlyDemoScene = "edit-project-synthetic" | "bulk-synthesise-flow";

export function HalfHourlyEditProjectDemo() {
  return (
    <ProjectShell
      projectId={HALF_HOURLY_EDIT_PROJECT_DEMO_ID}
      activeSubSection="edit-project"
      embedded
    >
      <EditProjectPage projectId={HALF_HOURLY_EDIT_PROJECT_DEMO_ID} demoMode />
    </ProjectShell>
  );
}
