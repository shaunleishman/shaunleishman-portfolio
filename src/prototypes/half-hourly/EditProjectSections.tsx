"use client";

import { useState } from "react";
import {
  Building,
  Building2,
  ChevronLeft,
  FileText,
  MapPin,
  Zap,
} from "lucide-react";
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from "@/design-systems/arbnco";
import { useProjectContext } from "./context";
import { useHalfHourlyNav } from "./useHalfHourlyNav";

export const EDIT_PROJECT_SECTIONS = [
  {
    slug: "name-and-location",
    title: "Name and location",
    subtitle: "Insert essential building information",
    icon: MapPin,
    status: "Complete" as const,
  },
  {
    slug: "energy-consumption",
    title: "Energy consumption",
    subtitle: "Add your meters and fuels",
    icon: Zap,
    status: "Complete" as const,
  },
  {
    slug: "building-details-1",
    title: "Building details part 1",
    subtitle: "Age, size, and type",
    icon: FileText,
    status: "Complete" as const,
  },
  {
    slug: "building-details-2",
    title: "Building details part 2",
    subtitle: "Heating and cooling",
    icon: Building,
    status: "Complete" as const,
  },
  {
    slug: "building-details-3",
    title: "Building details part 3",
    subtitle: "Fine-tune your building details",
    icon: Building2,
    status: "Complete" as const,
  },
] as const;

export type EditProjectSectionSlug = (typeof EDIT_PROJECT_SECTIONS)[number]["slug"];

export function isEditProjectSectionSlug(value: string): value is EditProjectSectionSlug {
  return EDIT_PROJECT_SECTIONS.some((section) => section.slug === value);
}

function EditSectionShell({
  projectId,
  title,
  subtitle,
  impactNote,
  children,
}: {
  projectId: string;
  title: string;
  subtitle: string;
  impactNote: string;
  children: React.ReactNode;
}) {
  const { navigate } = useHalfHourlyNav();
  const { projects } = useProjectContext();
  const project = projects[projectId];

  if (!project) {
    return null;
  }

  const accentColor = project.syntheticEnabled ? "#14a35c" : undefined;

  return (
    <div className="p-4 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col items-start gap-3 lg:mb-8 lg:flex-row lg:items-center">
          <Button
            variant="tertiary"
            size="md"
            onClick={() => navigate(`/project/${projectId}/edit`)}
            className="gap-2"
          >
            <ChevronLeft className="size-5" />
            Back to Edit project
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base text-[#666]">{project.name}</span>
          </div>
        </div>

        <div className="rounded-lg border border-[#aab6b4] bg-white p-6 shadow-sm lg:p-8">
          <h1 className="mb-2 font-bold text-2xl text-[#404040] lg:text-3xl">{title}</h1>
          <p className="mb-6 text-sm text-[#666]">{subtitle}</p>

          <div className="mb-8 rounded-lg border border-[#90caf9] bg-[#e3f2fd] p-4">
            <p className="text-sm text-[#1565c0]">
              <strong>What this affects:</strong> {impactNote}
            </p>
          </div>

          {children}

          <div className="mt-8 flex flex-wrap gap-3 border-t border-[#e0e0e0] pt-6">
            <Button
              variant="primary"
              size="md"
              accentColor={accentColor}
              onClick={() => navigate(`/project/${projectId}/edit`)}
            >
              Save and return
            </Button>
            <Button variant="tertiary" size="md" onClick={() => navigate(`/project/${projectId}/edit`)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NameAndLocationForm({ projectId }: { projectId: string }) {
  const { projects } = useProjectContext();
  const project = projects[projectId];
  const [country, setCountry] = useState("uk");

  if (!project) return null;

  return (
    <EditSectionShell
      projectId={projectId}
      title="Name and location"
      subtitle="Essential building information used across reports and portfolio views."
      impactNote="Updates the project name shown in the sidebar, project list, and all generated reports. Location data drives weather normalisation and regional benchmarking."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Project name" required defaultValue={project.name} />
        <Input label="Building reference" required={false} defaultValue="BLD-ALPHA-001" />
        <Input label="Address line 1" required={false} defaultValue="123 Sample Street" className="sm:col-span-2" />
        <Input label="City" required={false} defaultValue="Manchester" />
        <Input label="Postcode" required={false} defaultValue="M1 2AB" />
        <Dropdown
          label="Country"
          value={country}
          onChange={setCountry}
          options={[
            { value: "uk", label: "United Kingdom" },
            { value: "ie", label: "Ireland" },
          ]}
          className="!w-full"
        />
        <Input
          label="Latitude"
          required={false}
          defaultValue="53.4808"
          hint="Used for weather-adjusted consumption models."
        />
        <Input label="Longitude" required={false} defaultValue="-2.2426" />
      </div>
    </EditSectionShell>
  );
}

function EnergyConsumptionForm({ projectId }: { projectId: string }) {
  const { projects } = useProjectContext();
  const project = projects[projectId];
  const [primaryMeter, setPrimaryMeter] = useState("elec-main");
  const [dataResolution, setDataResolution] = useState(() =>
    projects[projectId]?.syntheticEnabled ? "synthetic" : "mixed",
  );

  if (!project) return null;

  return (
    <EditSectionShell
      projectId={projectId}
      title="Energy consumption"
      subtitle="Meters and fuels configured for this building."
      impactNote="Meter configuration determines which fuels appear on the energy overview chart, disaggregation models, and whether synthetic hourly data can be generated from low-resolution readings."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-6">
          <Checkbox label="Electricity" defaultChecked />
          <Checkbox label="Natural gas" defaultChecked />
          <Checkbox label="Solar PV export" defaultChecked />
        </div>

        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Meter</TableHead>
                <TableHead>Fuel</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Resolution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Electricity — Main", "Electricity", "MPAN 1234567890123", project.syntheticEnabled ? "Synthetic" : "Mixed"],
                ["Gas — Main", "Natural gas", "MPRN 9876543210", "Low"],
                ["Electricity — Solar", "Electricity", "MPAN 1234567890999", "High"],
              ].map(([meter, fuel, ref, resolution]) => (
                <TableRow key={meter} className="cursor-default hover:bg-transparent">
                  <TableCell>{meter}</TableCell>
                  <TableCell className="text-[#666]">{fuel}</TableCell>
                  <TableCell className="text-[#666]">{ref}</TableCell>
                  <TableCell className="text-[#666]">{resolution}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Dropdown
            label="Primary electricity meter"
            value={primaryMeter}
            onChange={setPrimaryMeter}
            options={[
              { value: "elec-main", label: "Electricity — Main" },
              { value: "elec-solar", label: "Electricity — Solar" },
            ]}
            className="!w-full"
          />
          <Dropdown
            label="Data resolution"
            value={dataResolution}
            onChange={setDataResolution}
            options={[
              { value: "synthetic", label: "Synthetic (half-hourly)" },
              { value: "mixed", label: "Mixed" },
              { value: "low", label: "Low (monthly)" },
              { value: "high", label: "High (half-hourly)" },
            ]}
            className="!w-full"
          />
        </div>
      </div>
    </EditSectionShell>
  );
}

function BuildingDetailsPart1Form({ projectId }: { projectId: string }) {
  const [ownership, setOwnership] = useState("leased");

  return (
    <EditSectionShell
      projectId={projectId}
      title="Building details part 1"
      subtitle="Age, size, and type of the building."
      impactNote="Floor area and building type feed into EUI benchmarks, carbon intensity calculations, and the baseline models used when generating synthetic hourly profiles."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Year built" required={false} defaultValue="1995" />
        <Input label="Last major refurbishment" required={false} defaultValue="2018" />
        <Input label="Gross internal floor area (m²)" required={false} defaultValue="5000" />
        <Input label="Number of floors" required={false} defaultValue="5" />
        <div className="sm:col-span-2">
          <p className="mb-3 font-['Open_Sans:regular',sans-serif] text-[14px] leading-5 tracking-[-0.1px] text-[#4a5453]">
            Building type
          </p>
          <div className="flex flex-wrap gap-4">
            <Radio name="building-type" label="Office" defaultChecked />
            <Radio name="building-type" label="Retail" />
            <Radio name="building-type" label="Industrial" />
            <Radio name="building-type" label="Residential" />
          </div>
        </div>
        <Dropdown
          label="Ownership"
          value={ownership}
          onChange={setOwnership}
          options={[
            { value: "owned", label: "Owned" },
            { value: "leased", label: "Leased" },
          ]}
          className="!w-full"
        />
        <Input label="Typical occupancy" required={false} defaultValue="320 people" />
      </div>
    </EditSectionShell>
  );
}

function BuildingDetailsPart2Form({ projectId }: { projectId: string }) {
  const [heatingSystem, setHeatingSystem] = useState("gas-boiler");
  const [coolingSystem, setCoolingSystem] = useState("central-ac");

  return (
    <EditSectionShell
      projectId={projectId}
      title="Building details part 2"
      subtitle="Heating, cooling, and HVAC configuration."
      impactNote="HVAC settings shape operational pattern detection, heating/cooling disaggregation, and the seasonal curves applied when synthetic data fills gaps in meter readings."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Dropdown
          label="Primary heating system"
          value={heatingSystem}
          onChange={setHeatingSystem}
          options={[
            { value: "gas-boiler", label: "Gas boiler" },
            { value: "heat-pump", label: "Air-source heat pump" },
            { value: "district", label: "District heating" },
          ]}
          className="!w-full"
        />
        <Dropdown
          label="Cooling system"
          value={coolingSystem}
          onChange={setCoolingSystem}
          options={[
            { value: "central-ac", label: "Central air conditioning" },
            { value: "split", label: "Split units" },
            { value: "none", label: "None" },
          ]}
          className="!w-full"
        />
        <Input label="Heating setpoint (°C)" required={false} defaultValue="20" />
        <Input label="Cooling setpoint (°C)" required={false} defaultValue="24" />
        <Input label="HVAC operating hours" required={false} defaultValue="Mon–Fri, 07:00–19:00" className="sm:col-span-2" />
        <Checkbox label="Weekend heating enabled" className="sm:col-span-2" />
        <Checkbox label="Night setback enabled" defaultChecked className="sm:col-span-2" />
      </div>
    </EditSectionShell>
  );
}

function BuildingDetailsPart3Form({ projectId }: { projectId: string }) {
  const [equipmentDensity, setEquipmentDensity] = useState("medium");

  return (
    <EditSectionShell
      projectId={projectId}
      title="Building details part 3"
      subtitle="Fine-tune operational assumptions for this building."
      impactNote="Occupancy and equipment profiles refine wastage detection, after-hours baseload estimates, and the half-hourly shape of synthetic data when actual meter resolution is low."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Weekday occupancy (people)" required={false} defaultValue="320" />
        <Input label="Weekend occupancy (people)" required={false} defaultValue="45" />
        <Input label="Core hours" required={false} defaultValue="08:00 – 18:00" />
        <Input label="Lighting type" required={false} defaultValue="LED with occupancy sensors" />
        <Dropdown
          label="Equipment density"
          value={equipmentDensity}
          onChange={setEquipmentDensity}
          options={[
            { value: "low", label: "Low (storage / warehouse)" },
            { value: "medium", label: "Medium (standard office)" },
            { value: "high", label: "High (server room / trading floor)" },
          ]}
          className="!w-full"
        />
        <Input
          label="Baseload estimate (kWh/day)"
          required={false}
          defaultValue="185"
          hint="Used to validate synthetic overnight profiles."
        />
        <Textarea
          label="Operational notes"
          className="sm:col-span-2"
          defaultValue="Building operates as a multi-tenant office. Floor 3 has extended hours for a data centre tenant. Solar export meter on roof array installed 2021."
        />
      </div>
    </EditSectionShell>
  );
}

const SECTION_FORMS: Record<EditProjectSectionSlug, React.ComponentType<{ projectId: string }>> = {
  "name-and-location": NameAndLocationForm,
  "energy-consumption": EnergyConsumptionForm,
  "building-details-1": BuildingDetailsPart1Form,
  "building-details-2": BuildingDetailsPart2Form,
  "building-details-3": BuildingDetailsPart3Form,
};

export function EditProjectSectionPage({
  projectId,
  section,
}: {
  projectId: string;
  section: EditProjectSectionSlug;
}) {
  const Form = SECTION_FORMS[section];
  const meta = EDIT_PROJECT_SECTIONS.find((item) => item.slug === section);

  if (!Form || !meta) {
    return null;
  }

  return <Form projectId={projectId} />;
}
