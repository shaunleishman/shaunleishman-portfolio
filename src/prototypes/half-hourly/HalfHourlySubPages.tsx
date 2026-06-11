"use client";

import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Building2,
  Check,
  Cloud,
  Link2,
  Plug,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Button,
  Chip,
  ContentTabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Toggle,
} from "@/design-systems/arbnco";
import { useProjectContext } from "./context";
import { cn } from "@/lib/utils";
import { ProjectListTable } from "./ProjectListTable";
import { useHalfHourlyNav } from "./useHalfHourlyNav";

function ProjectPageHeader({
  title,
  projectName,
  description,
}: {
  title: string;
  projectName: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex flex-col items-start gap-2 lg:mb-8">
      <h3 className="font-bold text-xl text-[#404040] lg:text-2xl">{title}</h3>
      <p className="text-sm text-[#666]">{projectName}</p>
      <p className="max-w-2xl text-sm text-[#666]">{description}</p>
    </div>
  );
}

function useProjectAccent(projectId: string) {
  const { projects } = useProjectContext();
  const project = projects[projectId];
  const accentColor = project?.syntheticEnabled ? "#14a35c" : "#00a7b5";
  return { project, accentColor, syntheticEnabled: project?.syntheticEnabled ?? false };
}

function StatCard({
  label,
  value,
  hint,
  trend,
  accentColor,
}: {
  label: string;
  value: string;
  hint?: string;
  trend?: "up" | "down" | "neutral";
  accentColor: string;
}) {
  return (
    <div className="rounded-lg border border-[#e0e0e0] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#999]">{label}</p>
      <div className="mt-2 flex items-end gap-2">
        <p className="font-bold text-2xl text-[#404040]">{value}</p>
        {trend === "up" && <TrendingUp className="size-5 text-[#d04a21]" aria-hidden />}
        {trend === "down" && <TrendingDown className="size-5" style={{ color: accentColor }} aria-hidden />}
      </div>
      {hint && <p className="mt-1 text-xs text-[#666]">{hint}</p>}
    </div>
  );
}

export function ProjectBenchmarkingPage({ projectId }: { projectId: string }) {
  const { project, accentColor, syntheticEnabled } = useProjectAccent(projectId);
  if (!project) return null;

  const peers = [
    { name: "Peer office, Manchester", eui: 168, percentile: 50 },
    { name: "Peer office, Leeds", eui: 152, percentile: 62 },
    { name: project.name, eui: 145, percentile: 72, current: true },
    { name: "Peer office, Birmingham", eui: 131, percentile: 84 },
  ].sort((a, b) => b.eui - a.eui);

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <ProjectPageHeader
          title="Benchmarking"
          projectName={project.name}
          description="Compare energy use intensity against similar office buildings in the same climate zone. Lower EUI indicates better relative performance."
        />

        {syntheticEnabled && (
          <div
            className="mb-6 flex items-start gap-3 rounded-lg border p-4"
            style={{ borderColor: `${accentColor}40`, backgroundColor: "#f0f9f4" }}
          >
            <Sparkles className="mt-0.5 size-5 shrink-0" style={{ color: accentColor }} />
            <p className="text-sm text-[#404040]">
              Synthetic hourly data improves benchmarking accuracy by filling gaps in low-resolution meter readings,
              giving a fuller picture of out-of-hours baseload and peak demand.
            </p>
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Your EUI" value="145" hint="kWh/m² per year" trend="down" accentColor={accentColor} />
          <StatCard label="Peer median" value="160" hint="kWh/m² per year" accentColor={accentColor} />
          <StatCard label="Percentile rank" value="72nd" hint="Better than 72% of peers" accentColor={accentColor} />
        </div>

        <div className="rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm lg:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h4 className="font-semibold text-[#404040]">Energy use intensity comparison</h4>
            <Chip tone="success">Better than median</Chip>
          </div>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Building</TableHead>
                  <TableHead>EUI (kWh/m²)</TableHead>
                  <TableHead>Percentile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {peers.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>
                      <span className={row.current ? "font-semibold" : ""}>{row.name}</span>
                      {row.current && (
                        <Chip tone="neutral" className="ml-2">
                          This project
                        </Chip>
                      )}
                    </TableCell>
                    <TableCell>{row.eui}</TableCell>
                    <TableCell>{row.percentile}th</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

const CARBON_MONTHLY = [
  { month: "Jan", emissions: 18.2 },
  { month: "Feb", emissions: 17.4 },
  { month: "Mar", emissions: 19.1 },
  { month: "Apr", emissions: 16.8 },
  { month: "May", emissions: 15.2 },
  { month: "Jun", emissions: 14.6 },
];

export function ProjectCarbonPage({ projectId }: { projectId: string }) {
  const { project, accentColor, syntheticEnabled } = useProjectAccent(projectId);
  if (!project) return null;

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <ProjectPageHeader
          title="Carbon emissions"
          projectName={project.name}
          description="Track operational carbon from grid electricity and on-site gas. Emissions factors are applied using the best available temporal resolution for each fuel."
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total (YTD)" value="198" hint="tonnes CO₂e" trend="down" accentColor={accentColor} />
          <StatCard label="Scope 2 (electricity)" value="142" hint="tonnes CO₂e" accentColor={accentColor} />
          <StatCard label="Scope 1 (gas)" value="56" hint="tonnes CO₂e" accentColor={accentColor} />
        </div>

        <div className="rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm lg:p-6">
          <h4 className="mb-1 font-semibold text-[#404040]">Monthly operational emissions</h4>
          <p className="mb-4 text-xs text-[#666]">
            {syntheticEnabled
              ? "Hourly grid carbon factors applied using synthetic half-hourly electricity profiles."
              : "Monthly totals based on billed consumption. Enable synthetic data for hourly carbon reporting."}
          </p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CARBON_MONTHLY} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#666" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#666" }} axisLine={false} tickLine={false} unit=" t" />
                <Tooltip />
                <Bar dataKey="emissions" radius={[4, 4, 0, 0]}>
                  {CARBON_MONTHLY.map((_, i) => (
                    <Cell key={i} fill={accentColor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

const ECM_ROWS = [
  { measure: "LED lighting retrofit, floors 2–4", savings: "8%", status: "Complete", payback: "2.1 yrs" },
  { measure: "BMS schedule optimisation", savings: "5%", status: "In progress", payback: "0.5 yrs" },
  { measure: "Variable speed drives, AHUs", savings: "12%", status: "Planned", payback: "3.4 yrs" },
  { measure: "Solar PV, roof array (50 kWp)", savings: "15%", status: "Planned", payback: "6.2 yrs" },
];

function ecmStatusTone(status: string) {
  if (status === "Complete") return "success" as const;
  if (status === "In progress") return "primary" as const;
  return "neutral" as const;
}

export function ProjectEcmPage({ projectId }: { projectId: string }) {
  const { project, accentColor } = useProjectAccent(projectId);
  if (!project) return null;

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <ProjectPageHeader
          title="Energy conservation measures"
          projectName={project.name}
          description="Track planned and delivered efficiency upgrades. Savings estimates are modelled from half-hourly baselines where available."
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard label="Identified savings" value="40%" hint="Combined potential from active ECMs" accentColor={accentColor} />
          <StatCard label="Realised (YTD)" value="8%" hint="From completed measures" trend="down" accentColor={accentColor} />
        </div>

        <div className="rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm lg:p-6">
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Measure</TableHead>
                  <TableHead>Est. savings</TableHead>
                  <TableHead>Payback</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ECM_ROWS.map((row) => (
                  <TableRow key={row.measure}>
                    <TableCell>{row.measure}</TableCell>
                    <TableCell>{row.savings}</TableCell>
                    <TableCell>{row.payback}</TableCell>
                    <TableCell>
                      <Chip tone={ecmStatusTone(row.status)} size="sm">
                        {row.status}
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

type AlertResolveRoute =
  | "integration"
  | "operational-patterns"
  | "benchmarking"
  | "energy-consumption"
  | "edit";

type AlertRow = {
  id: string;
  title: string;
  detail: string;
  severity: "warning" | "error" | "info";
  date: string;
  acknowledged?: boolean;
  resolveRoute: AlertResolveRoute;
  actionLabel: string;
};

function alertResolveHref(projectId: string, route: AlertResolveRoute) {
  const paths: Record<AlertResolveRoute, string> = {
    integration: `/project/${projectId}/integration`,
    "operational-patterns": `/project/${projectId}/energy-consumption/operational-patterns`,
    benchmarking: `/project/${projectId}/benchmarking`,
    "energy-consumption": `/project/${projectId}/energy-consumption`,
    edit: `/project/${projectId}/edit`,
  };
  return paths[route];
}

const PROJECT_ALERTS: AlertRow[] = [
  {
    id: "1",
    title: "Out-of-hours electricity spike",
    detail: "Consumption 34% above expected baseload between 02:00–04:00 on Tuesday.",
    severity: "warning",
    date: "2 days ago",
    resolveRoute: "operational-patterns",
    actionLabel: "View operational patterns",
  },
  {
    id: "2",
    title: "Missing gas meter readings",
    detail: "No data received for Gas (Main) since 14 May. Reports may use estimated values.",
    severity: "error",
    date: "5 days ago",
    resolveRoute: "integration",
    actionLabel: "Go to integration",
  },
  {
    id: "3",
    title: "Benchmark threshold crossed",
    detail: "Monthly EUI improved. Now in the 72nd percentile vs peer offices.",
    severity: "info",
    date: "1 week ago",
    resolveRoute: "benchmarking",
    actionLabel: "View benchmarking",
  },
];

function alertTone(severity: AlertRow["severity"]) {
  if (severity === "error") return "error" as const;
  if (severity === "warning") return "warning" as const;
  return "primary" as const;
}

export function ProjectAlertsPage({ projectId }: { projectId: string }) {
  const { project, accentColor } = useProjectAccent(projectId);
  const { navigate } = useHalfHourlyNav();
  const [alerts, setAlerts] = useState(PROJECT_ALERTS);
  if (!project) return null;

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <ProjectPageHeader
          title="Alerts"
          projectName={project.name}
          description="Automated checks on data quality, consumption anomalies, and performance thresholds for this building."
        />

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "flex flex-col gap-3 rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm transition-colors sm:flex-row sm:items-start sm:justify-between",
                alert.acknowledged && "border-[#e0e0e0] bg-[#f5f6f6]",
              )}
            >
              <div className={cn("flex min-w-0 flex-1 gap-3", alert.acknowledged && "opacity-75")}>
                <AlertTriangle
                  className={`mt-0.5 size-5 shrink-0 ${
                    alert.severity === "error"
                      ? "text-[var(--colour-states-error)]"
                      : alert.severity === "warning"
                        ? "text-[var(--colour-states-warning)]"
                        : "text-[var(--colour-labels-primary)]"
                  }`}
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4
                      className={cn(
                        "font-semibold text-sm text-[#404040]",
                        alert.acknowledged && "line-through decoration-[#aab6b4]",
                      )}
                    >
                      {alert.title}
                    </h4>
                    <Chip tone={alertTone(alert.severity)} size="sm" className="capitalize">
                      {alert.severity}
                    </Chip>
                  </div>
                  <p className="mt-1 text-sm text-[#666]">{alert.detail}</p>
                  <p className="mt-2 text-xs text-[#999]">{alert.date}</p>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:min-w-[11.5rem]">
                <Button
                  variant="primary"
                  size="md"
                  accentColor={accentColor}
                  onClick={() => navigate(alertResolveHref(projectId, alert.resolveRoute))}
                >
                  {alert.actionLabel}
                </Button>
                {alert.acknowledged ? (
                  <div
                    role="status"
                    className="inline-flex h-[var(--measurement-height-md)] w-full items-center justify-center gap-[var(--measurement-spacing-xs)] rounded-[var(--radius-medium-radius)] border border-transparent bg-[var(--accents-growth,#14a35c)] px-[var(--measurement-spacing-sm)] text-[length:var(--typography-font-size-xs)] font-normal leading-5 tracking-[var(--typography-letter-spacing-sm)] text-white"
                  >
                    <Check className="size-4" aria-hidden />
                    Done
                  </div>
                ) : (
                  <Button
                    variant="tertiary"
                    size="md"
                    onClick={() =>
                      setAlerts((prev) =>
                        prev.map((a) => (a.id === alert.id ? { ...a, acknowledged: true } : a)),
                      )
                    }
                  >
                    <Check className="size-4" aria-hidden />
                    Mark as done
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const INTEGRATIONS = [
  {
    name: "Smart meter API, Electricity",
    type: "Automated feed",
    status: "Connected",
    lastSync: "12 minutes ago",
    icon: Plug,
  },
  {
    name: "Gas supplier portal",
    type: "Monthly import",
    status: "Connected",
    lastSync: "3 days ago",
    icon: Cloud,
  },
  {
    name: "BMS export, Trend logs",
    type: "SFTP drop",
    status: "Pending setup",
    lastSync: "-",
    icon: Link2,
  },
];

export function ProjectIntegrationPage({ projectId }: { projectId: string }) {
  const { project, accentColor, syntheticEnabled } = useProjectAccent(projectId);
  if (!project) return null;

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <ProjectPageHeader
          title="Integration"
          projectName={project.name}
          description="Data sources feeding this project. Connection health affects report accuracy and whether synthetic hourly data can be generated."
        />

        <div className="space-y-3">
          {INTEGRATIONS.map((item) => {
            const Icon = item.icon;
            const connected = item.status === "Connected";
            return (
              <div
                key={item.name}
                className="flex flex-col gap-4 rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex gap-4">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: connected ? `${accentColor}15` : "#f5f6f6" }}
                  >
                    <Icon className="size-5" style={{ color: connected ? accentColor : "#999" }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#404040]">{item.name}</h4>
                    <p className="text-xs text-[#666]">{item.type}</p>
                    <p className="mt-1 text-xs text-[#999]">Last sync: {item.lastSync}</p>
                  </div>
                </div>
                <Chip tone={connected ? "success-solid" : "warning"} size="sm">
                  {item.status}
                </Chip>
              </div>
            );
          })}
        </div>

        {syntheticEnabled && (
          <p className="mt-6 text-sm text-[#666]">
            Synthetic hourly profiles are derived from low-resolution electricity and gas feeds above. Improving BMS
            integration would unlock finer disaggregation in future reports.
          </p>
        )}
      </div>
    </div>
  );
}

const PORTFOLIO_TREND = [
  { month: "Jan", kWh: 4200 },
  { month: "Feb", kWh: 3950 },
  { month: "Mar", kWh: 4100 },
  { month: "Apr", kWh: 3800 },
  { month: "May", kWh: 3650 },
  { month: "Jun", kWh: 3520 },
];

function PageIntro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6 rounded-lg border border-[#00a7b5]/25 bg-[#00a7b5]/5 p-4 lg:mb-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#00838f]">{title}</p>
      <p className="mt-2 text-sm text-[#404040]">{children}</p>
    </div>
  );
}

export function MainOverviewPage() {
  const { projects } = useProjectContext();
  const { navigate } = useHalfHourlyNav();

  const projectList = Object.entries(projects).map(([id, data]) => ({
    id,
    name: data.name,
    dataResolution: data.dataResolution,
  }));

  const syntheticCount = projectList.filter((p) => p.dataResolution === "Synthetic").length;
  const mixedCount = projectList.filter((p) => p.dataResolution === "Mixed").length;
  const openAlerts = 3;

  const needsAttention = [
    { id: "2", name: "Building Beta", issue: "Missing gas meter data", severity: "error" as const },
    { id: "3", name: "Building Gamma", issue: "Low resolution. Synthetic not enabled.", severity: "info" as const },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 lg:mb-6">
          <h3 className="font-bold text-xl text-[#404040] lg:text-2xl">Portfolio overview</h3>
          <p className="mt-1 text-sm text-[#666]">
            Your starting point for portfolio health: consumption trends, data coverage, and buildings that need action.
          </p>
        </div>

        <PageIntro title="What this page is for">
          Use Overview to scan all buildings at once before drilling into a project. Compare data resolution coverage,
          spot open alerts, and jump straight to projects that need meter fixes or synthetic data setup.
        </PageIntro>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Active projects" value={String(projectList.length)} accentColor="#00a7b5" />
          <StatCard
            label="Synthetic enabled"
            value={String(syntheticCount)}
            hint="Hourly AI profiles active"
            accentColor="#14a35c"
          />
          <StatCard label="Mixed resolution" value={String(mixedCount)} hint="Eligible for synthetic upgrade" accentColor="#00a7b5" />
          <StatCard label="Open alerts" value={String(openAlerts)} hint="Across portfolio" trend="up" accentColor="#00a7b5" />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm lg:p-6">
            <h4 className="mb-1 font-semibold text-[#404040]">Portfolio electricity trend</h4>
            <p className="mb-4 text-xs text-[#666]">Combined monthly consumption across all metered buildings (MWh).</p>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PORTFOLIO_TREND} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#666" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#666" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="kWh" fill="#00a7b5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm lg:p-6">
            <h4 className="mb-4 font-semibold text-[#404040]">Needs attention</h4>
            <div className="space-y-3">
              {needsAttention.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 rounded-lg border border-[#e0e0e0] p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-sm text-[#404040]">{item.name}</span>
                      <Chip tone={alertTone(item.severity)} size="sm">
                        {item.severity}
                      </Chip>
                    </div>
                    <p className="mt-1 text-xs text-[#666]">{item.issue}</p>
                  </div>
                  <Button variant="tertiary" size="sm" className="shrink-0" onClick={() => navigate(`/project/${item.id}`)}>
                    Open project
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="tertiary" size="sm" className="mt-4" onClick={() => navigate("/alerts")}>
              View all alerts
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm lg:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Building2 className="size-5 text-[#666]" />
              <h4 className="font-semibold text-[#404040]">Projects at a glance</h4>
            </div>
            <Button variant="tertiary" size="sm" onClick={() => navigate("/")}>
              Open full project list
            </Button>
          </div>
          <p className="mb-4 text-xs text-[#666]">
            Data resolution shows whether a building has hourly reads, mixed-frequency data, or synthetic profiles enabled.
          </p>
          <ProjectListTable projects={projectList} />
        </div>
      </div>
    </div>
  );
}

const PORTFOLIO_ALERTS: (AlertRow & { project: string; projectId: string })[] = [
  {
    id: "p1",
    project: "Building Beta",
    projectId: "2",
    title: "Missing gas meter readings",
    detail: "No data received for Gas (Main) since 14 May. Carbon and ECM reports may use estimated values until restored.",
    severity: "error",
    date: "5 days ago",
    resolveRoute: "integration",
    actionLabel: "Go to integration",
  },
  {
    id: "p2",
    project: "Building Alpha",
    projectId: "1",
    title: "Out-of-hours electricity spike",
    detail: "Baseload 34% above expected between 02:00–04:00. Review overnight HVAC or IT load schedules.",
    severity: "warning",
    date: "2 days ago",
    resolveRoute: "operational-patterns",
    actionLabel: "View operational patterns",
  },
  {
    id: "p3",
    project: "Building Gamma",
    projectId: "3",
    title: "Low data resolution",
    detail: "Only monthly electricity reads on file. Enable synthetic hourly data in Edit project to unlock granular charts.",
    severity: "info",
    date: "1 week ago",
    resolveRoute: "edit",
    actionLabel: "Enable synthetic data",
  },
  {
    id: "p4",
    project: "Building Delta",
    projectId: "4",
    title: "Benchmarking data stale",
    detail: "Peer comparison has not refreshed in 90 days. Re-save building details to update EUI benchmarks.",
    severity: "info",
    date: "2 weeks ago",
    resolveRoute: "benchmarking",
    actionLabel: "View benchmarking",
  },
];

export function MainAlertsPage() {
  const { projects } = useProjectContext();
  const { navigate } = useHalfHourlyNav();
  const [filter, setFilter] = useState<"all" | AlertRow["severity"]>("all");

  const filtered =
    filter === "all" ? PORTFOLIO_ALERTS : PORTFOLIO_ALERTS.filter((a) => a.severity === filter);

  const errorCount = PORTFOLIO_ALERTS.filter((a) => a.severity === "error").length;
  const warningCount = PORTFOLIO_ALERTS.filter((a) => a.severity === "warning").length;
  const infoCount = PORTFOLIO_ALERTS.filter((a) => a.severity === "info").length;

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 lg:mb-6">
          <h3 className="font-bold text-xl text-[#404040] lg:text-2xl">Alerts</h3>
          <p className="mt-1 text-sm text-[#666]">
            Automated checks across every project: data gaps, odd consumption, and setup issues.
          </p>
        </div>

        <PageIntro title="What this page is for">
          Alerts surface problems before they affect reports. Errors usually mean missing or invalid meter data; warnings
          flag unusual consumption; info items suggest improvements like enabling synthetic hourly data.
        </PageIntro>

        <div className="mb-6 grid grid-cols-3 gap-3">
          <StatCard label="Errors" value={String(errorCount)} hint="Needs immediate action" accentColor="#d04a21" />
          <StatCard label="Warnings" value={String(warningCount)} hint="Review consumption" accentColor="#f5a50d" />
          <StatCard label="Info" value={String(infoCount)} hint="Suggested improvements" accentColor="#00a7b5" />
        </div>

        <ContentTabs
          className="mb-4"
          value={filter}
          fillRemaining={false}
          onChange={(value) => setFilter(value as "all" | AlertRow["severity"])}
          tabs={[
            { value: "all", label: "All alerts", count: PORTFOLIO_ALERTS.length },
            { value: "error", label: "Error", count: errorCount },
            { value: "warning", label: "Warning", count: warningCount },
            { value: "info", label: "Info", count: infoCount },
          ]}
        />

        <div className="space-y-3">
          {filtered.map((alert) => (
            <div key={alert.id} className="rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="neutral" size="sm">
                    {alert.project}
                  </Chip>
                  <Chip tone={alertTone(alert.severity)} size="sm" className="capitalize">
                    {alert.severity}
                  </Chip>
                <span className="text-xs text-[#999]">{alert.date}</span>
              </div>
              <h4 className="mt-2 font-semibold text-sm text-[#404040]">{alert.title}</h4>
              <p className="mt-1 text-sm text-[#666]">{alert.detail}</p>
              <Button
                variant="primary"
                size="md"
                accentColor={projects[alert.projectId]?.syntheticEnabled ? "#14a35c" : undefined}
                className="mt-3"
                onClick={() => navigate(alertResolveHref(alert.projectId, alert.resolveRoute))}
              >
                {alert.actionLabel}
              </Button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="rounded-lg border border-[#e0e0e0] bg-white p-6 text-center text-sm text-[#666]">
              No alerts match this filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function MainSettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [defaultSynthetic, setDefaultSynthetic] = useState(false);
  const [metricUnits, setMetricUnits] = useState<"metric" | "imperial">("metric");
  const [defaultReportRange, setDefaultReportRange] = useState("12-months");

  const sections = [
    {
      title: "Notifications",
      description: "Control how and when the platform reaches you about portfolio changes.",
      items: [
        {
          label: "Email alerts",
          description: "Receive an email when a project alert is raised or escalated to error severity.",
          checked: emailAlerts,
          onChange: setEmailAlerts,
        },
        {
          label: "Weekly portfolio digest",
          description: "Summary of consumption trends, new alerts, and synthetic data coverage every Monday.",
          checked: weeklyDigest,
          onChange: setWeeklyDigest,
        },
      ],
    },
    {
      title: "Data & reporting",
      description: "Defaults applied when creating projects or generating portfolio reports.",
      items: [
        {
          label: "Offer synthetic data on new projects",
          description:
            "Show the synthetic hourly toggle by default when a project has mixed-resolution electricity or gas data.",
          checked: defaultSynthetic,
          onChange: setDefaultSynthetic,
        },
      ],
    },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 lg:mb-6">
          <h3 className="font-bold text-xl text-[#404040] lg:text-2xl">Settings</h3>
          <p className="mt-1 text-sm text-[#666]">
            Organisation preferences for notifications, reporting defaults, and display options.
          </p>
        </div>

        <PageIntro title="What this page is for">
          Settings apply across your entire portfolio. Changes here affect new projects, scheduled reports, and how
          Teammates are notified. Use Edit project for individual building settings.
        </PageIntro>

        <div className="mb-6 rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#999]">Organisation</p>
          <p className="mt-2 font-semibold text-[#404040]">Demo Energy Portfolio</p>
          <p className="text-sm text-[#666]">Role: Portfolio manager · Timezone: Europe/London</p>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <h4 className="font-semibold text-[#404040]">{section.title}</h4>
            <p className="mt-1 mb-3 text-sm text-[#666]">{section.description}</p>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-6 rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm"
                >
                  <div>
                    <h5 className="font-semibold text-sm text-[#404040]">{item.label}</h5>
                    <p className="mt-1 text-sm text-[#666]">{item.description}</p>
                  </div>
                  <Toggle checked={item.checked} onCheckedChange={item.onChange} className="shrink-0" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mb-6">
          <h4 className="font-semibold text-[#404040]">Display</h4>
          <p className="mt-1 mb-3 text-sm text-[#666]">Units and formats shown in charts and exported reports.</p>
          <div className="space-y-3">
            <div className="rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm">
              <p className="mb-3 font-semibold text-sm text-[#404040]">Measurement units</p>
              <div className="flex gap-2">
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => setMetricUnits("metric")}
                  style={
                    metricUnits === "metric"
                      ? { backgroundColor: "#00a7b5", color: "#fff", borderColor: "transparent" }
                      : undefined
                  }
                >
                  Metric (kWh, m²)
                </Button>
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => setMetricUnits("imperial")}
                  style={
                    metricUnits === "imperial"
                      ? { backgroundColor: "#00a7b5", color: "#fff", borderColor: "transparent" }
                      : undefined
                  }
                >
                  Imperial (kBtu, ft²)
                </Button>
              </div>
            </div>
            <div className="rounded-lg border border-[#aab6b4] bg-white p-4 shadow-sm">
              <p className="mb-2 font-semibold text-sm text-[#404040]">Default report date range</p>
              <p className="mb-3 text-sm text-[#666]">Pre-selected period when generating portfolio or project reports.</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "12-months", label: "Last 12 months" },
                  { value: "ytd", label: "Year to date" },
                  { value: "fy", label: "Financial year" },
                ].map((opt) => (
                  <Button
                    key={opt.value}
                    variant="tertiary"
                    size="sm"
                    onClick={() => setDefaultReportRange(opt.value)}
                    style={
                      defaultReportRange === opt.value
                        ? { backgroundColor: "#00a7b5", color: "#fff", borderColor: "transparent" }
                        : undefined
                    }
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const HOURLY_PATTERN = [
  { hour: "00", kWh: 12 },
  { hour: "04", kWh: 10 },
  { hour: "08", kWh: 45 },
  { hour: "12", kWh: 62 },
  { hour: "16", kWh: 58 },
  { hour: "20", kWh: 28 },
];

const END_USE = [
  { use: "HVAC", share: 42 },
  { use: "Lighting", share: 28 },
  { use: "Plug loads", share: 18 },
  { use: "Gas heating", share: 12 },
];

export function OperationalPatternsContent({
  projectName,
  accentColor,
  syntheticEnabled,
}: {
  projectName: string;
  accentColor: string;
  syntheticEnabled: boolean;
}) {
  return (
    <>
      <h4 className="mb-3 font-normal text-base text-[#313131] lg:mb-4 lg:text-lg">Operational Patterns</h4>
      <p className="mb-6 font-normal text-sm text-[#404040] lg:text-base">
        Typical weekday profile for {projectName}. Peak demand matches core office hours (08:00–18:00).
        {syntheticEnabled
          ? " Profile derived from synthetic half-hourly data."
          : " Enable synthetic data for a full hourly breakdown."}
      </p>

      <div className="mb-6 h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={HOURLY_PATTERN} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#666" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#666" }} axisLine={false} tickLine={false} unit=" kWh" />
            <Tooltip />
            <Bar dataKey="kWh" radius={[4, 4, 0, 0]}>
              {HOURLY_PATTERN.map((_, i) => (
                <Cell key={i} fill={accentColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { day: "Mon–Fri", value: "High", icon: ArrowUp },
          { day: "Sat", value: "Low", icon: ArrowDown },
          { day: "Sun", value: "Low", icon: ArrowDown },
          { day: "Peak hour", value: "12:00", icon: TrendingUp },
        ].map((row) => {
          const Icon = row.icon;
          return (
            <div key={row.day} className="rounded-lg border border-[#e0e0e0] p-3 text-center">
              <Icon className="mx-auto size-4 text-[#666]" />
              <p className="mt-1 text-xs text-[#999]">{row.day}</p>
              <p className="font-semibold text-sm text-[#404040]">{row.value}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function DisaggregationContent({
  projectName,
  accentColor,
  syntheticEnabled,
}: {
  projectName: string;
  accentColor: string;
  syntheticEnabled: boolean;
}) {
  return (
    <>
      <h4 className="mb-3 font-normal text-base text-[#313131] lg:mb-4 lg:text-lg">
        Disaggregation & Potential Wastage
      </h4>
      <p className="mb-6 font-normal text-sm text-[#404040] lg:text-base">
        Estimated end-use split for {projectName}.
        {syntheticEnabled
          ? " Synthetic hourly profiles improve confidence in out-of-hours baseload detection."
          : " Results are indicative until half-hourly or sub-hourly data is available."}
      </p>

      <div className="mb-6 space-y-3">
        {END_USE.map((row) => (
          <div key={row.use}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-[#404040]">{row.use}</span>
              <span className="font-medium text-[#404040]">{row.share}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#e5e8e7]">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${row.share}%`, backgroundColor: accentColor }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-[#f5a50d]/40 bg-[#fff4e5] p-4">
        <p className="text-sm font-semibold text-[#404040]">Potential wastage</p>
        <p className="mt-1 text-sm text-[#666]">
          Out-of-hours baseload is ~12% above the expected profile for an office this size. Worth investigating.
          overnight HVAC schedules and IT load.
        </p>
      </div>
    </>
  );
}
