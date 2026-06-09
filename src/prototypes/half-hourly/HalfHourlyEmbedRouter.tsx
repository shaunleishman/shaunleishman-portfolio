"use client";

import {
  DisaggregationTabPage,
  EditProjectPage,
  EnergyConsumptionTabPage,
  EnergyOverviewShell,
  MainSectionShell,
  OperationalPatternsTabPage,
  ProjectAboutPage,
  ProjectListPage,
  ProjectShell,
} from "@/prototypes/half-hourly/HalfHourlyPrototype";
import {
  EditProjectSectionPage,
  isEditProjectSectionSlug,
} from "@/prototypes/half-hourly/EditProjectSections";
import {
  MainAlertsPage,
  MainOverviewPage,
  MainSettingsPage,
  ProjectAlertsPage,
  ProjectBenchmarkingPage,
  ProjectCarbonPage,
  ProjectEcmPage,
  ProjectIntegrationPage,
} from "@/prototypes/half-hourly/HalfHourlySubPages";
import { useHalfHourlyPathname } from "@/prototypes/half-hourly/HalfHourlyEmbedContext";

function ProjectRoute({
  projectId,
  children,
}: {
  projectId: string;
  children: React.ReactNode;
}) {
  return (
    <ProjectShell projectId={projectId} embedded>
      {children}
    </ProjectShell>
  );
}

export function HalfHourlyEmbedRouter() {
  const pathname = useHalfHourlyPathname();

  if (pathname === "/" || pathname === "") {
    return <ProjectListPage />;
  }

  if (pathname === "/overview") {
    return (
      <MainSectionShell activeMainSection="overview">
        <MainOverviewPage />
      </MainSectionShell>
    );
  }

  if (pathname === "/alerts") {
    return (
      <MainSectionShell activeMainSection="alerts">
        <MainAlertsPage />
      </MainSectionShell>
    );
  }

  if (pathname === "/settings") {
    return (
      <MainSectionShell activeMainSection="settings">
        <MainSettingsPage />
      </MainSectionShell>
    );
  }

  const projectMatch = pathname.match(/^\/project\/([^/]+)(\/.*)?$/);
  if (!projectMatch) {
    return <ProjectListPage />;
  }

  const projectId = projectMatch[1];
  const rest = projectMatch[2] ?? "";

  if (rest === "" || rest === "/") {
    return (
      <ProjectRoute projectId={projectId}>
        <ProjectAboutPage projectId={projectId} />
      </ProjectRoute>
    );
  }

  if (rest === "/edit") {
    return (
      <ProjectRoute projectId={projectId}>
        <EditProjectPage projectId={projectId} />
      </ProjectRoute>
    );
  }

  const editSectionMatch = rest.match(/^\/edit\/([^/]+)$/);
  if (editSectionMatch && isEditProjectSectionSlug(editSectionMatch[1])) {
    return (
      <ProjectRoute projectId={projectId}>
        <EditProjectSectionPage projectId={projectId} section={editSectionMatch[1]} />
      </ProjectRoute>
    );
  }

  if (rest.startsWith("/energy-consumption")) {
    let tabPage = <EnergyConsumptionTabPage projectId={projectId} />;
    if (rest.includes("/operational-patterns")) {
      tabPage = <OperationalPatternsTabPage projectId={projectId} />;
    } else if (rest.includes("/disaggregation")) {
      tabPage = <DisaggregationTabPage projectId={projectId} />;
    }

    return (
      <ProjectRoute projectId={projectId}>
        <EnergyOverviewShell projectId={projectId}>{tabPage}</EnergyOverviewShell>
      </ProjectRoute>
    );
  }

  if (rest === "/benchmarking") {
    return (
      <ProjectRoute projectId={projectId}>
        <ProjectBenchmarkingPage projectId={projectId} />
      </ProjectRoute>
    );
  }

  if (rest === "/carbon") {
    return (
      <ProjectRoute projectId={projectId}>
        <ProjectCarbonPage projectId={projectId} />
      </ProjectRoute>
    );
  }

  if (rest === "/energy-conservation-measures") {
    return (
      <ProjectRoute projectId={projectId}>
        <ProjectEcmPage projectId={projectId} />
      </ProjectRoute>
    );
  }

  if (rest === "/alerts") {
    return (
      <ProjectRoute projectId={projectId}>
        <ProjectAlertsPage projectId={projectId} />
      </ProjectRoute>
    );
  }

  if (rest === "/integration") {
    return (
      <ProjectRoute projectId={projectId}>
        <ProjectIntegrationPage projectId={projectId} />
      </ProjectRoute>
    );
  }

  return (
    <ProjectRoute projectId={projectId}>
      <ProjectAboutPage projectId={projectId} />
    </ProjectRoute>
  );
}
