"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./enhance-animations.css";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Check, X, Search, Bell, Clipboard, Users, Activity, UserPlus, HelpCircle, AlertTriangle, AlertOctagon, ChevronLeft, ChevronRight, Info, Pencil, Plus, Trash2, User, ArrowDown, ArrowUp, ChevronsUp } from 'lucide-react';
import CheckBox from "@/design-systems/showcase/imports/CheckBox";

type Patient = {
  id: string;
  name: string;
  alerts: { type: string; severity: 'high' | 'medium' | 'low'; count: number }[];
  nhsNumber: string;
  age: number;
  sex: string;
  bloodPressure: string;
  assignedBy?: string;
  assignedByRole?: string;
  assignedDate?: string;
};

type View = 'monitoring' | 'patient-detail';

type PatientProgram = {
  id: string;
  name: string;
  enrolled: string;
  active: boolean;
};

type PatientMedication = {
  id: string;
  medication: string;
  brand: string;
  dosageMg: string;
  instructions: string;
};

const MEDICATION_CATALOG: Record<string, { brands: string[]; dosages: string[] }> = {
  Amlodipine: { brands: ["Istin", "Amlostin", "Generic"], dosages: ["2.5", "5", "10"] },
  Atorvastatin: { brands: ["Lipitor", "Generic"], dosages: ["10", "20", "40", "80"] },
  Ramipril: { brands: ["Tritace", "Generic"], dosages: ["1.25", "2.5", "5", "10"] },
  Bisoprolol: { brands: ["Cardicor", "Generic"], dosages: ["1.25", "2.5", "5", "10"] },
  Losartan: { brands: ["Cozaar", "Generic"], dosages: ["25", "50", "100"] },
};

const MEDICATION_NAMES = Object.keys(MEDICATION_CATALOG);

function getMedicationBrands(medication: string) {
  return MEDICATION_CATALOG[medication]?.brands ?? ["Generic"];
}

function getMedicationDosages(medication: string) {
  return MEDICATION_CATALOG[medication]?.dosages ?? ["5"];
}

function formatMedicationDisplay(medication: PatientMedication) {
  return `${medication.medication} ${medication.dosageMg}mg`;
}

const DEFAULT_PATIENT_MEDICATIONS: PatientMedication[] = [
  { id: "amlodipine", medication: "Amlodipine", brand: "Istin", dosageMg: "5", instructions: "Once daily" },
  { id: "atorvastatin", medication: "Atorvastatin", brand: "Lipitor", dosageMg: "20", instructions: "Once daily at bedtime" },
];

const MEDICATION_INSTRUCTION_OPTIONS = [
  "Once daily",
  "Once daily at bedtime",
  "Twice daily",
  "Three times daily",
  "Every morning",
  "Every evening",
  "As required",
] as const;

function medicationInstructionOptions(currentValue: string) {
  if (currentValue && !MEDICATION_INSTRUCTION_OPTIONS.includes(currentValue as (typeof MEDICATION_INSTRUCTION_OPTIONS)[number])) {
    return [currentValue, ...MEDICATION_INSTRUCTION_OPTIONS];
  }

  return MEDICATION_INSTRUCTION_OPTIONS;
}

const selectFieldClassName =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#003153] focus:outline-none";

const DEFAULT_PATIENT_PROGRAMS: PatientProgram[] = [
  { id: "hypertension-plus", name: "Hypertension Plus", enrolled: "Enrolled 3 months ago", active: true },
  { id: "cardiovascular-screening", name: "Cardiovascular Screening", enrolled: "Enrolled 6 months ago", active: true },
];

type PatientAssignment = {
  practitionerId: string;
  practitionerName: string;
  role: string;
  assignedDate: string;
};

type PatientActivityEntry = {
  id: string;
  date: string;
  author: string;
  summary: string;
  detail?: string;
};

const DEFAULT_PATIENT_ACTIVITY: Record<string, PatientActivityEntry[]> = {
  "1": [
    {
      id: "1-assignment",
      date: "2 days ago",
      author: "Dr. Sarah Johnson",
      summary: "Patient assigned to case load",
      detail: "Handover from GP surgery for hypertension monitoring.",
    },
    {
      id: "1-bp-review",
      date: "3 days ago",
      author: "Freya Vincent",
      summary: "Blood pressure reviewed",
      detail: "Latest reading above target. Repeat readings requested.",
    },
    {
      id: "1-med-note",
      date: "1 week ago",
      author: "Dr. Sarah Johnson",
      summary: "Medication review completed",
      detail: "Amlodipine dose unchanged pending next review cycle.",
    },
  ],
  "4": [
    {
      id: "4-assignment",
      date: "1 week ago",
      author: "Freya Vincent",
      summary: "Patient assigned to case load",
      detail: "Medication management follow-up required.",
    },
  ],
  "8": [
    {
      id: "8-assignment",
      date: "3 days ago",
      author: "Jack Bramble",
      summary: "Patient assigned to case load",
      detail: "Escalated for clinical review due to persistently high readings.",
    },
  ],
  "12": [
    {
      id: "12-assignment",
      date: "5 days ago",
      author: "Samantha Hue",
      summary: "Patient assigned to case load",
      detail: "Routine pharmacist-led medication review.",
    },
  ],
};

const practitioners = [
  {
    id: "ext-sarah",
    name: "Dr. Sarah Johnson",
    role: "Clinical Pharmacist",
    patients: "12/32",
    team: "Hypertension monitoring",
    bio: "Leads pharmacist reviews for patients with elevated blood pressure and coordinates medication changes with GPs.",
  },
  {
    id: "1",
    name: "Samantha Hue",
    role: "Clinical Pharmacist",
    patients: "8/32",
    team: "Medication management",
    bio: "Supports medicine optimisation and adherence for patients enrolled in remote monitoring programmes.",
  },
  {
    id: "2",
    name: "Freya Vincent",
    role: "Nurse Practitioner",
    patients: "9/32",
    team: "Clinical review",
    bio: "Conducts clinical reviews, triages alerts, and contacts patients when readings move out of range.",
  },
  {
    id: "3",
    name: "Jack Bramble",
    role: "General Practitioner",
    patients: "6/32",
    team: "Primary care liaison",
    bio: "Provides GP oversight for complex cases and signs off treatment plan changes.",
  },
  {
    id: "4",
    name: "Leon Tenet",
    role: "Nurse Practitioner",
    patients: "9/32",
    team: "Engagement",
    bio: "Focuses on patient engagement, follow-up calls, and keeping monitoring schedules on track.",
  },
] as const;

type Practitioner = (typeof practitioners)[number];

function getPractitionerInitials(name: string) {
  return name
    .replace(/^(dr|mr|mrs|ms|prof)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function findPractitionerProfile(assignment: PatientAssignment) {
  const match =
    practitioners.find((practitioner) => practitioner.id === assignment.practitionerId) ??
    practitioners.find((practitioner) => practitioner.name === assignment.practitionerName);

  return {
    name: assignment.practitionerName,
    role: assignment.role,
    patients: match?.patients ?? "-",
    team: match?.team ?? "Patient monitoring",
    bio:
      match?.bio ??
      `${assignment.practitionerName} is a ${assignment.role} supporting patients on the monitoring platform.`,
  };
}

function PractitionerAvatar({ name, className = "size-12 text-sm" }: { name: string; className?: string }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#003153] font-semibold text-white ${className}`}
      aria-hidden
    >
      {getPractitionerInitials(name) || <User className="size-5" />}
    </div>
  );
}

function PatientProfileHeader({
  patient,
  priority,
}: {
  patient: Patient;
  priority: PatientPriority;
}) {
  const priorityConfig = getPatientPriorityDisplay(priority);

  return (
    <div className="rounded-lg bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-5">
          <PractitionerAvatar name={patient.name} className="size-14 text-sm" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold leading-tight text-[#003153]">{patient.name}</h1>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
              <span>{patient.age} years</span>
              <span className="text-gray-300" aria-hidden>
                ·
              </span>
              <span>{patient.sex}</span>
              <span className="text-gray-300" aria-hidden>
                ·
              </span>
              <span>
                NHS <span className="font-medium text-gray-800">{patient.nhsNumber}</span>
              </span>
            </p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <PatientPriorityBadge priority={priority} />
          <p className="mt-1 max-w-[12rem] text-xs text-gray-500">{priorityConfig.description}</p>
        </div>
      </div>
    </div>
  );
}

function PractitionerProfileModal({
  assignment,
  onClose,
}: {
  assignment: PatientAssignment;
  onClose: () => void;
}) {
  const profile = findPractitionerProfile(assignment);

  return (
    <div className="enhance-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="enhance-modal-panel w-full max-w-md overflow-hidden rounded-lg bg-white">
        <div className="flex items-start justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#003153]">Practitioner profile</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-200/50 transition-colors hover:bg-gray-300"
          >
            <X className="size-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-center gap-4">
            <PractitionerAvatar name={profile.name} className="size-16 text-base" />
            <div>
              <p className="text-lg font-semibold text-[#003153]">{profile.name}</p>
              <p className="text-sm text-gray-600">{profile.role}</p>
              <p className="mt-1 text-xs text-gray-500">{profile.team}</p>
            </div>
          </div>

          <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            {profile.bio}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md border border-gray-200 p-3">
              <p className="text-xs text-gray-500">Current caseload</p>
              <p className="mt-1 font-semibold text-gray-900">{profile.patients} patients</p>
            </div>
            <div className="rounded-md border border-gray-200 p-3">
              <p className="text-xs text-gray-500">Assigned to this patient</p>
              <p className="mt-1 font-semibold text-gray-900">{assignment.assignedDate}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-5 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function getPatientAssignment(
  patient: Patient,
  overrides: Record<string, PatientAssignment>,
): PatientAssignment | null {
  if (overrides[patient.id]) {
    return overrides[patient.id];
  }

  if (!patient.assignedBy) {
    return null;
  }

  const matchedPractitioner = practitioners.find((practitioner) => practitioner.name === patient.assignedBy);

  return {
    practitionerId: matchedPractitioner?.id ?? "",
    practitionerName: patient.assignedBy,
    role: patient.assignedByRole ?? "",
    assignedDate: patient.assignedDate ?? "",
  };
}

function SectionEditButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-[#003153] transition-colors hover:bg-[#003153]/5"
    >
      <Pencil className="size-4" aria-hidden />
      {label}
    </button>
  );
}

function EditProgramsModal({
  programs,
  onClose,
  onSave,
}: {
  programs: PatientProgram[];
  onClose: () => void;
  onSave: (programs: PatientProgram[]) => void;
}) {
  const [draft, setDraft] = useState(programs);

  const updateProgram = (id: string, updates: Partial<PatientProgram>) => {
    setDraft((prev) => prev.map((program) => (program.id === id ? { ...program, ...updates } : program)));
  };

  return (
    <div className="enhance-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="enhance-modal-panel max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white">
        <div className="flex items-start justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-bold text-[#003153]">Edit programs</h2>
            <p className="mt-1 text-sm text-gray-600">Update enrolment details or mark programs as inactive.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-200/50 transition-colors hover:bg-gray-300"
          >
            <X className="size-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          {draft.map((program) => (
            <div key={program.id} className="space-y-3 rounded-md border border-gray-200 p-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Program name</label>
                <input
                  type="text"
                  value={program.name}
                  onChange={(event) => updateProgram(program.id, { name: event.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#003153] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Enrolment status</label>
                <input
                  type="text"
                  value={program.enrolled}
                  onChange={(event) => updateProgram(program.id, { enrolled: event.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#003153] focus:outline-none"
                />
              </div>
              <EnhanceCheckbox
                label="Active program"
                checked={program.active}
                onChange={() => updateProgram(program.id, { active: !program.active })}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-5 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(draft)}
            className="rounded-md bg-[#003153] px-5 py-2 text-sm text-white transition-colors hover:bg-[#004266]"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function EditMedicationsModal({
  medications,
  onClose,
  onSave,
}: {
  medications: PatientMedication[];
  onClose: () => void;
  onSave: (medications: PatientMedication[]) => void;
}) {
  const [draft, setDraft] = useState(medications);

  const updateMedication = (id: string, updates: Partial<PatientMedication>) => {
    setDraft((prev) => prev.map((medication) => (medication.id === id ? { ...medication, ...updates } : medication)));
  };

  const addMedication = () => {
    const defaultMedication = MEDICATION_NAMES[0];
    setDraft((prev) => [
      ...prev,
      {
        id: `med-${Date.now()}`,
        medication: defaultMedication,
        brand: getMedicationBrands(defaultMedication)[0],
        dosageMg: getMedicationDosages(defaultMedication)[0],
        instructions: MEDICATION_INSTRUCTION_OPTIONS[0],
      },
    ]);
  };

  const updateMedicationSelection = (id: string, medicationName: string) => {
    const brands = getMedicationBrands(medicationName);
    const dosages = getMedicationDosages(medicationName);
    updateMedication(id, {
      medication: medicationName,
      brand: brands[0],
      dosageMg: dosages[0],
    });
  };

  const removeMedication = (id: string) => {
    setDraft((prev) => prev.filter((medication) => medication.id !== id));
  };

  return (
    <div className="enhance-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="enhance-modal-panel max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white">
        <div className="flex items-start justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-bold text-[#003153]">Edit medication</h2>
            <p className="mt-1 text-sm text-gray-600">Update current prescriptions and dosing instructions.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-200/50 transition-colors hover:bg-gray-300"
          >
            <X className="size-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          {draft.map((medication) => (
            <div key={medication.id} className="space-y-3 rounded-md border border-gray-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">Medication</label>
                      <select
                        value={medication.medication}
                        onChange={(event) => updateMedicationSelection(medication.id, event.target.value)}
                        className={selectFieldClassName}
                      >
                        {MEDICATION_NAMES.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">Brand</label>
                      <select
                        value={medication.brand}
                        onChange={(event) => updateMedication(medication.id, { brand: event.target.value })}
                        className={selectFieldClassName}
                      >
                        {getMedicationBrands(medication.medication).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">Milligrams</label>
                      <select
                        value={medication.dosageMg}
                        onChange={(event) => updateMedication(medication.id, { dosageMg: event.target.value })}
                        className={selectFieldClassName}
                      >
                        {getMedicationDosages(medication.medication).map((option) => (
                          <option key={option} value={option}>
                            {option} mg
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Instructions</label>
                    <select
                      value={medication.instructions}
                      onChange={(event) => updateMedication(medication.id, { instructions: event.target.value })}
                      className={selectFieldClassName}
                    >
                      {medicationInstructionOptions(medication.instructions).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {draft.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMedication(medication.id)}
                    className="rounded p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove medication"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addMedication}
            className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-[#003153] transition-colors hover:border-[#003153] hover:bg-[#003153]/5"
          >
            <Plus className="size-4" aria-hidden />
            Add medication
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-5 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(draft.filter((medication) => medication.medication))}
            className="rounded-md bg-[#003153] px-5 py-2 text-sm text-white transition-colors hover:bg-[#004266]"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function PatientActivityEntry({ entry }: { entry: PatientActivityEntry }) {
  return (
    <div className="text-sm">
      <p className="font-medium text-gray-900">{entry.summary}</p>
      {entry.detail && <p className="mt-0.5 text-xs text-gray-600">{entry.detail}</p>}
      <p className="mt-1 text-xs text-gray-500">
        {entry.author} · {entry.date}
      </p>
    </div>
  );
}

function PatientActivityHistoryModal({
  patientName,
  activity,
  onClose,
}: {
  patientName: string;
  activity: PatientActivityEntry[];
  onClose: () => void;
}) {
  return (
    <div className="enhance-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="enhance-modal-panel flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white">
        <div className="flex items-start justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-bold text-[#003153]">Patient activity history</h2>
            <p className="mt-1 text-sm text-gray-600">Full record of notes and actions for {patientName}.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-200/50 transition-colors hover:bg-gray-300"
          >
            <X className="size-5 text-gray-600" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {activity.length > 0 ? (
            <ul className="space-y-4">
              {activity.map((entry) => (
                <li key={entry.id} className="rounded-md border border-gray-200 p-4">
                  <PatientActivityEntry entry={entry} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No activity recorded for this patient.</p>
          )}
        </div>

        <div className="border-t border-gray-200 p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-5 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function PatientAssignmentPanel({
  patientName,
  assignment,
  activity,
  onReassign,
}: {
  patientName: string;
  assignment: PatientAssignment | null;
  activity: PatientActivityEntry[];
  onReassign: () => void;
}) {
  const [showHistory, setShowHistory] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const latestActivity = activity[0];

  return (
    <>
      <div className="flex h-full w-full flex-col rounded-lg bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-[#003153]">Assigned practitioner</h2>
        {assignment ? (
          <div className="rounded-md border border-gray-200 bg-white p-3">
            <button
              type="button"
              onClick={() => setShowProfile(true)}
              className="group w-full text-left"
            >
              <div className="flex items-start gap-3">
                <PractitionerAvatar name={assignment.practitionerName} />
                <div className="min-w-0">
                  <p className="font-semibold text-[#003153] group-hover:underline">{assignment.practitionerName}</p>
                  <p className="text-sm text-gray-600">{assignment.role}</p>
                  <p className="mt-1 text-xs text-gray-500">Assigned {assignment.assignedDate}</p>
                </div>
              </div>
            </button>
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
              <button
                type="button"
                onClick={() => setShowProfile(true)}
                className="text-xs font-medium text-[#003153]/80 hover:underline"
              >
                View profile
              </button>
              <button
                type="button"
                onClick={onReassign}
                className="rounded-md bg-[#003153] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#004266]"
              >
                Reassign
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-gray-200 bg-white p-3">
            <p className="text-sm text-gray-600">No practitioner assigned</p>
            <button
              type="button"
              onClick={onReassign}
              className="mt-3 rounded-md bg-[#003153] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#004266]"
            >
              Assign
            </button>
          </div>
        )}

        <div className="mt-4 border-t border-gray-200 pt-4">
          <h2 className="mb-3 text-lg font-bold text-[#003153]">Latest activity</h2>
          {latestActivity ? (
            <div className="mt-2">
              <PatientActivityEntry entry={latestActivity} />
              {activity.length > 1 && (
                <button
                  type="button"
                  onClick={() => setShowHistory(true)}
                  className="mt-3 text-sm font-medium text-[#003153] underline-offset-2 hover:underline"
                >
                  View full history ({activity.length})
                </button>
              )}
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-500">No notes or actions recorded yet.</p>
          )}
        </div>
      </div>

      {showHistory && (
        <PatientActivityHistoryModal
          patientName={patientName}
          activity={activity}
          onClose={() => setShowHistory(false)}
        />
      )}

      {showProfile && assignment && (
        <PractitionerProfileModal assignment={assignment} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
}

function ReassignPractitionerModal({
  patientName,
  practitioners: practitionerList,
  selectedPractitionerId,
  reason,
  onSelectPractitioner,
  onReasonChange,
  onClose,
  onConfirm,
}: {
  patientName: string;
  practitioners: typeof practitioners;
  selectedPractitionerId: string;
  reason: string;
  onSelectPractitioner: (id: string) => void;
  onReasonChange: (reason: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="enhance-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="enhance-modal-panel max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white">
        <div className="flex items-start justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-bold text-[#003153]">Reassign practitioner</h2>
            <p className="mt-1 text-sm text-gray-600">
              Choose a new practitioner for {patientName} and add a handover note.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-200/50 transition-colors hover:bg-gray-300"
          >
            <X className="size-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div className="space-y-2">
            {practitionerList.map((practitioner) => (
              <label
                key={practitioner.id}
                className={`flex cursor-pointer items-center gap-4 rounded-md border p-3 transition-colors ${
                  selectedPractitionerId === practitioner.id
                    ? "border-[#003153] bg-[#003153]/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="reassign-practitioner"
                  value={practitioner.id}
                  checked={selectedPractitionerId === practitioner.id}
                  onChange={() => onSelectPractitioner(practitioner.id)}
                  className="size-4 text-[#003153] focus:ring-[#003153]"
                />
                <div className="grid flex-1 grid-cols-3 gap-4 text-sm">
                  <p className="font-medium text-[#003153]">{practitioner.name}</p>
                  <p className="text-gray-900">{practitioner.role}</p>
                  <p className="text-gray-900">{practitioner.patients}</p>
                </div>
              </label>
            ))}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Handover note</label>
            <textarea
              value={reason}
              onChange={(event) => onReasonChange(event.target.value)}
              placeholder="Summarise recent actions, outstanding tasks, or reason for reassignment..."
              className="h-28 w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:border-[#003153] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-5 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!selectedPractitionerId || !reason.trim()}
            className="rounded-md bg-[#003153] px-5 py-2 text-sm text-white transition-colors hover:bg-[#004266] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm reassignment
          </button>
        </div>
      </div>
    </div>
  );
}

function EnhanceCheckbox({
  checked,
  indeterminate = false,
  onChange,
  id,
  label,
  className = "",
  "aria-label": ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  id?: string;
  label?: string;
  className?: string;
  "aria-label"?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const visual = indeterminate ? "Indeterminate" : checked ? "On" : "Off";

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label className={`inline-flex cursor-pointer items-center gap-2 ${className}`}>
      <input
        ref={inputRef}
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel ?? label}
      />
      <CheckBox
        checkBox={visual}
        comp={false}
        className={`flex size-4 items-center justify-center rounded p-0.5 ${
          visual === "On" || visual === "Indeterminate"
            ? "border-2 border-[#003153] bg-[#003153]"
            : "border-2 border-[#64748b] bg-white"
        }`}
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}

type BpLevel = "low" | "normal" | "elevated" | "high";

function parseBloodPressure(value: string) {
  const match = value.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (!match) return null;
  return { systolic: Number(match[1]), diastolic: Number(match[2]) };
}

function systolicLevel(value: number): BpLevel {
  if (value < 90) return "low";
  if (value < 120) return "normal";
  if (value < 140) return "elevated";
  return "high";
}

function diastolicLevel(value: number): BpLevel {
  if (value < 60) return "low";
  if (value < 80) return "normal";
  if (value < 90) return "elevated";
  return "high";
}

function bloodPressureValueClass(level: BpLevel) {
  switch (level) {
    case "low":
      return "text-blue-700";
    case "normal":
      return "text-green-700";
    case "elevated":
      return "text-orange-600";
    case "high":
      return "text-red-700";
  }
}

function bloodPressureStatusIndicator(level: BpLevel) {
  switch (level) {
    case "low":
      return { Icon: ArrowDown, description: "Below target" };
    case "normal":
      return { Icon: null, description: "Within target" };
    case "elevated":
      return { Icon: ArrowUp, description: "Above target" };
    case "high":
      return { Icon: ChevronsUp, description: "Well above target" };
  }
}

function BloodPressureValue({
  value,
  part,
}: {
  value: string;
  part: "systolic" | "diastolic";
}) {
  const parsed = parseBloodPressure(value);
  if (!parsed) {
    return <span className="text-sm text-gray-500">-</span>;
  }

  const status = part === "systolic" ? systolicLevel(parsed.systolic) : diastolicLevel(parsed.diastolic);
  const reading = part === "systolic" ? parsed.systolic : parsed.diastolic;
  const label = part === "systolic" ? "Systolic" : "Diastolic";
  const indicator = bloodPressureStatusIndicator(status);
  const Icon = indicator.Icon;
  const valueClass = bloodPressureValueClass(status);

  return (
    <span
      className="inline-flex items-center gap-1"
      title={`${label}: ${indicator.description}`}
      aria-label={`${label} ${reading}, ${indicator.description}`}
    >
      {Icon && <Icon className={`size-3.5 shrink-0 ${valueClass}`} aria-hidden />}
      <span className={`text-sm font-semibold tabular-nums ${valueClass}`}>{reading}</span>
    </span>
  );
}

type BloodPressureHistoryPoint = {
  label: string;
  systolic: number;
  diastolic: number;
  pulse: number;
};

function generateBloodPressureHistory(patient: Patient): BloodPressureHistoryPoint[] {
  const current = parseBloodPressure(patient.bloodPressure);
  if (!current) {
    return [];
  }

  const weekOffsets = [8, 7, 6, 5, 4, 3, 2, 1, 0];
  const variance = Number(patient.id) % 4;

  return weekOffsets.map((weeksAgo) => {
    if (weeksAgo === 0) {
      return {
        label: "Today",
        systolic: current.systolic,
        diastolic: current.diastolic,
        pulse: Math.max(58, Math.round(72 - variance)),
      };
    }

    return {
      label: `${weeksAgo}w ago`,
      systolic: Math.max(85, Math.round(current.systolic + weeksAgo * 1.6 + (variance - 1))),
      diastolic: Math.max(55, Math.round(current.diastolic + weeksAgo * 0.9 + (variance - 2) * 0.5)),
      pulse: Math.max(58, Math.round(72 + weeksAgo * 0.4 - variance)),
    };
  });
}

function averageBloodPressure(points: BloodPressureHistoryPoint[]) {
  if (points.length === 0) {
    return null;
  }

  const totals = points.reduce(
    (acc, point) => ({
      systolic: acc.systolic + point.systolic,
      diastolic: acc.diastolic + point.diastolic,
      pulse: acc.pulse + point.pulse,
    }),
    { systolic: 0, diastolic: 0, pulse: 0 },
  );

  return {
    systolic: Math.round(totals.systolic / points.length),
    diastolic: Math.round(totals.diastolic / points.length),
    pulse: Math.round(totals.pulse / points.length),
  };
}

function BloodPressureHistoryChart({ history }: { history: BloodPressureHistoryPoint[] }) {
  if (history.length === 0) {
    return <p className="text-sm text-gray-500">No blood pressure history available.</p>;
  }

  return (
    <div className="rounded-md border border-gray-200 bg-[#fafbfc] p-4">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#003153]">Blood pressure reading history</h3>
          <p className="mt-0.5 text-xs text-gray-600">
            Patient-submitted systolic and diastolic readings over the last 8 weeks
          </p>
        </div>
        <p className="text-xs font-medium text-gray-500">Target: &lt;140 / &lt;90 mmHg</p>
      </div>
      <div className="h-64 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={false}
            />
            <YAxis
              domain={[50, 180]}
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={32}
              label={{
                value: "mmHg",
                angle: -90,
                position: "insideLeft",
                fill: "#9ca3af",
                fontSize: 11,
                offset: 8,
              }}
            />
            <ReferenceLine
              y={140}
              stroke="#fca5a5"
              strokeDasharray="4 4"
              label={{ value: "140", position: "right", fill: "#dc2626", fontSize: 10 }}
            />
            <ReferenceLine
              y={90}
              stroke="#fdba74"
              strokeDasharray="4 4"
              label={{ value: "90", position: "right", fill: "#ea580c", fontSize: 10 }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) {
                  return null;
                }

                const point = payload[0].payload as BloodPressureHistoryPoint;
                return (
                  <div className="rounded-md border border-gray-200 bg-white p-3 text-xs shadow-md">
                    <p className="font-semibold text-gray-900">{label}</p>
                    <p className="mt-1 text-red-700">Systolic: {point.systolic} mmHg</p>
                    <p className="text-blue-700">Diastolic: {point.diastolic} mmHg</p>
                    <p className="text-gray-600">Pulse: {point.pulse} bpm</p>
                  </div>
                );
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: 12, paddingBottom: 8 }}
            />
            <Line
              type="monotone"
              dataKey="systolic"
              name="Systolic"
              stroke="#dc2626"
              strokeWidth={2}
              dot={{ r: 3, fill: "#dc2626", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              name="Diastolic"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 3, fill: "#2563eb", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function BloodPressureSection({ patient }: { patient: Patient }) {
  const history = useMemo(
    () => generateBloodPressureHistory(patient),
    [patient.id, patient.bloodPressure],
  );
  const sevenDayAverage = useMemo(() => averageBloodPressure(history.slice(-3)), [history]);
  const cycleAverage = useMemo(() => averageBloodPressure(history), [history]);
  const latestReading = history[history.length - 1];

  return (
    <div id="blood-pressure-metrics" className="rounded-lg bg-white p-6">
      <h2 className="mb-4 text-lg font-bold text-[#003153]">Blood Pressure</h2>
      <BloodPressureHistoryChart history={history} />
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="rounded-md border border-[#00f0ff]/20 bg-[#f0f9ff] p-4">
          <p className="mb-1 text-xs text-gray-600">7-day average</p>
          <p className="text-2xl font-bold text-[#003153]">
            {sevenDayAverage ? `${sevenDayAverage.systolic}/${sevenDayAverage.diastolic}` : "-"}
          </p>
          <p className="mt-1 text-xs text-gray-500">mmHg</p>
        </div>
        <div className="rounded-md border border-[#00f0ff]/20 bg-[#f0f9ff] p-4">
          <p className="mb-1 text-xs text-gray-600">Cycle average</p>
          <p className="text-2xl font-bold text-[#003153]">
            {cycleAverage ? `${cycleAverage.systolic}/${cycleAverage.diastolic}` : "-"}
          </p>
          <p className="mt-1 text-xs text-gray-500">mmHg</p>
        </div>
        <div className="rounded-md border border-[#00f0ff]/20 bg-[#f0f9ff] p-4">
          <p className="mb-1 text-xs text-gray-600">Latest pulse</p>
          <p className="text-2xl font-bold text-[#003153]">{latestReading?.pulse ?? "-"}</p>
          <p className="mt-1 text-xs text-gray-500">bpm</p>
        </div>
      </div>
    </div>
  );
}

type PatientDetailAlert = {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  detail: string;
  actionLabel: string;
  actionTarget: "blood-pressure" | "medication" | "clinical-review" | "engagement" | "investigation";
};

const PATIENT_LIST_ALERT_DETAILS: Record<
  string,
  Omit<PatientDetailAlert, "id" | "severity"> & { severity?: PatientDetailAlert["severity"] }
> = {
  "Clinical review": {
    title: "Clinical review required",
    detail: "Scheduled review is overdue",
    actionLabel: "Review clinical notes",
    actionTarget: "clinical-review",
  },
  "Medication management": {
    title: "Medication adjustment needed",
    detail: "Medication items require review",
    actionLabel: "Review medication",
    actionTarget: "medication",
  },
  Engagement: {
    title: "Patient engagement low",
    detail: "No readings submitted in the last 7 days",
    actionLabel: "Review engagement",
    actionTarget: "engagement",
  },
  Investigation: {
    title: "Investigation follow-up needed",
    detail: "Outstanding investigation requires action",
    actionLabel: "Review investigation",
    actionTarget: "investigation",
  },
};

function getPatientDetailAlerts(patient: Patient): PatientDetailAlert[] {
  const alerts: PatientDetailAlert[] = [];
  const bp = parseBloodPressure(patient.bloodPressure);

  if (bp && (bp.systolic >= 140 || bp.diastolic >= 90)) {
    alerts.push({
      id: `${patient.id}-bp`,
      severity: "high",
      title: "Blood pressure above target",
      detail: `Latest reading: ${patient.bloodPressure} mmHg (Target: <140/90)`,
      actionLabel: "Review blood pressure",
      actionTarget: "blood-pressure",
    });
  }

  for (const alert of patient.alerts) {
    const template = PATIENT_LIST_ALERT_DETAILS[alert.type];
    if (!template) continue;

    const severity =
      template.severity ??
      (alert.severity === "low" ? "medium" : alert.severity);

    let detail = template.detail;
    if (alert.type === "Medication management") {
      detail =
        alert.count > 1
          ? `${alert.count} medication items require review`
          : "Consider increasing Amlodipine dosage";
    } else if (alert.type === "Clinical review" && alert.count > 1) {
      detail = `${alert.count} items pending clinical review`;
    } else if (alert.type === "Engagement" && alert.count > 1) {
      detail = `${alert.count} missed reading cycles this month`;
    } else if (alert.type === "Investigation" && alert.count > 1) {
      detail = `${alert.count} investigations require follow-up`;
    }

    alerts.push({
      id: `${patient.id}-${alert.type.toLowerCase().replace(/\s+/g, "-")}`,
      severity,
      title: template.title,
      detail,
      actionLabel: template.actionLabel,
      actionTarget: template.actionTarget,
    });
  }

  return alerts;
}

const ALERT_SEVERITY_POINTS: Record<PatientDetailAlert["severity"], number> = {
  high: 10,
  medium: 5,
  low: 2,
};

type PatientPriorityLevel = "critical" | "high" | "moderate" | "low" | "stable";

type PatientPriority = {
  score: number;
  level: PatientPriorityLevel;
  activeAlertCount: number;
  highSeverityCount: number;
  topAlertTitles: string[];
};

const PATIENT_PRIORITY_LEVELS: Record<
  PatientPriorityLevel,
  { label: string; description: string; badgeClass: string }
> = {
  critical: {
    label: "Critical",
    description: "Requires urgent review",
    badgeClass: "bg-red-100 text-red-800 border-red-200",
  },
  high: {
    label: "High priority",
    description: "Should be reviewed soon",
    badgeClass: "bg-orange-100 text-orange-800 border-orange-200",
  },
  moderate: {
    label: "Moderate",
    description: "Monitor and review when available",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
  },
  low: {
    label: "Low priority",
    description: "Routine follow-up recommended",
    badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  stable: {
    label: "Stable",
    description: "No active alerts",
    badgeClass: "bg-green-100 text-green-800 border-green-200",
  },
};

function getPatientPriorityDisplay(priority: PatientPriority) {
  const { score, level, activeAlertCount, highSeverityCount, topAlertTitles } = priority;
  const alertSummary =
    activeAlertCount > 0
      ? `${activeAlertCount} active alert${activeAlertCount === 1 ? "" : "s"}`
      : "No active alerts";
  const severitySummary =
    highSeverityCount > 0
      ? `${highSeverityCount} high severity`
      : undefined;
  const tooltip =
    topAlertTitles.length > 0 ? topAlertTitles.join(" · ") : PATIENT_PRIORITY_LEVELS[level].description;

  if (level === "critical") {
    if (score >= 35) {
      return {
        label: "Immediate",
        badgeClass: "bg-red-600 text-white border-red-700",
        description: [alertSummary, severitySummary].filter(Boolean).join(" · "),
        title: tooltip,
        showAlertCount: true,
      };
    }

    return {
      label: "Critical",
      badgeClass: "bg-red-100 text-red-800 border-red-200",
      description: [alertSummary, severitySummary].filter(Boolean).join(" · "),
      title: tooltip,
      showAlertCount: true,
    };
  }

  if (level === "high" && score >= 17) {
    return {
      label: "High priority",
      badgeClass: "bg-orange-500 text-white border-orange-600",
      description: [alertSummary, severitySummary].filter(Boolean).join(" · "),
      title: tooltip,
      showAlertCount: true,
    };
  }

  const base = PATIENT_PRIORITY_LEVELS[level];

  return {
    label: base.label,
    badgeClass: base.badgeClass,
    description:
      level === "stable"
        ? base.description
        : [alertSummary, severitySummary].filter(Boolean).join(" · "),
    title: tooltip,
    showAlertCount: level !== "stable" && activeAlertCount > 1,
  };
}

function getPatientPriorityLevel(score: number): PatientPriorityLevel {
  if (score >= 20) return "critical";
  if (score >= 12) return "high";
  if (score >= 6) return "moderate";
  if (score >= 1) return "low";
  return "stable";
}

function getPatientPriority(
  patient: Patient,
  resolvedAlerts: Record<string, string> = {},
): PatientPriority {
  const alerts = sortPatientDetailAlerts(
    getPatientDetailAlerts(patient).filter((alert) => !resolvedAlerts[alert.id]),
  );
  const score = alerts.reduce((total, alert) => total + ALERT_SEVERITY_POINTS[alert.severity], 0);

  return {
    score,
    level: getPatientPriorityLevel(score),
    activeAlertCount: alerts.length,
    highSeverityCount: alerts.filter((alert) => alert.severity === "high").length,
    topAlertTitles: alerts.slice(0, 3).map((alert) => alert.title),
  };
}

function sortPatientsByPriority(patients: Patient[], resolvedAlerts: Record<string, string> = {}) {
  return [...patients].sort((a, b) => {
    const priorityA = getPatientPriority(a, resolvedAlerts);
    const priorityB = getPatientPriority(b, resolvedAlerts);

    if (priorityB.score !== priorityA.score) {
      return priorityB.score - priorityA.score;
    }

    if (priorityB.highSeverityCount !== priorityA.highSeverityCount) {
      return priorityB.highSeverityCount - priorityA.highSeverityCount;
    }

    if (priorityB.activeAlertCount !== priorityA.activeAlertCount) {
      return priorityB.activeAlertCount - priorityA.activeAlertCount;
    }

    return a.name.localeCompare(b.name);
  });
}

function PatientPriorityBadge({ priority }: { priority: PatientPriority }) {
  const display = getPatientPriorityDisplay(priority);

  return (
    <StatusChip badgeClass={display.badgeClass} title={display.title}>
      {display.label}
      {display.showAlertCount && priority.activeAlertCount > 0 && (
        <span className="ml-1 font-normal opacity-90">({priority.activeAlertCount})</span>
      )}
    </StatusChip>
  );
}

const STATUS_CHIP_BASE_CLASS =
  "inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold";

function StatusChip({
  badgeClass,
  title,
  children,
}: {
  badgeClass: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={`${STATUS_CHIP_BASE_CLASS} ${badgeClass}`} title={title}>
      {children}
    </span>
  );
}

function getSoftSeverityChipClass(severity: PatientDetailAlert["severity"]) {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
}

function getDetailAlertShortLabel(alert: PatientDetailAlert) {
  switch (alert.actionTarget) {
    case "blood-pressure":
      return "Blood pressure";
    case "medication":
      return "Medication";
    case "clinical-review":
      return "Clinical review";
    case "engagement":
      return "Engagement";
    case "investigation":
      return "Investigation";
  }
}

function detailAlertMatchesFilter(alert: PatientDetailAlert, filter: string) {
  if (filter === "All patients") {
    return true;
  }

  const filterTargets: Record<string, PatientDetailAlert["actionTarget"]> = {
    "Clinical review": "clinical-review",
    "Medication management": "medication",
    Investigation: "investigation",
    Engagement: "engagement",
  };

  return alert.actionTarget === filterTargets[filter];
}

function getVisibleDetailAlerts(
  patient: Patient,
  filter: string,
  resolvedAlerts: Record<string, string> = {},
) {
  return sortPatientDetailAlerts(
    getPatientDetailAlerts(patient).filter(
      (alert) => !resolvedAlerts[alert.id] && detailAlertMatchesFilter(alert, filter),
    ),
  );
}

const ALERT_RESOLUTION_OPTIONS: Record<PatientDetailAlert["actionTarget"], string[]> = {
  "blood-pressure": [
    "Contacted patient by phone",
    "Requested repeat home readings",
    "Provided lifestyle and self-care advice",
    "Referred to GP for review",
    "Escalated to senior clinician",
    "Marked as device or reading error",
  ],
  medication: [
    "Increased medication dosage",
    "Changed medication",
    "Counselled patient on adherence",
    "Referred to clinical pharmacist",
    "Updated prescription in system",
    "Deferred pending clinician review",
  ],
  "clinical-review": [
    "Completed clinical review",
    "Booked follow-up appointment",
    "Referred to GP for review",
    "Escalated to senior clinician",
    "Added review notes to record",
    "Deferred pending test results",
  ],
  engagement: [
    "Contacted patient by phone",
    "Sent reminder message",
    "Provided device troubleshooting support",
    "Rescheduled reading schedule",
    "Marked as temporarily unavailable",
    "Escalated to care coordinator",
  ],
  investigation: [
    "Requested follow-up tests",
    "Reviewed investigation results",
    "Referred to specialist",
    "Contacted patient with results",
    "Updated care plan",
    "Deferred pending clinician review",
  ],
};

function patientAlertStyles(severity: PatientDetailAlert["severity"]) {
  switch (severity) {
    case "high":
      return {
        container: "bg-red-50 border-red-200",
        icon: AlertTriangle,
        iconColor: "text-red-600",
        title: "text-red-900",
        detail: "text-red-700",
      };
    case "medium":
      return {
        container: "bg-orange-50 border-orange-200",
        icon: AlertOctagon,
        iconColor: "text-orange-600",
        title: "text-orange-900",
        detail: "text-orange-700",
      };
    case "low":
      return {
        container: "bg-blue-50 border-blue-200",
        icon: Info,
        iconColor: "text-blue-600",
        title: "text-blue-900",
        detail: "text-blue-700",
      };
  }
}

function getDetailAlertIdFromListAlertType(patientId: string, alertType: string) {
  return `${patientId}-${alertType.toLowerCase().replace(/\s+/g, "-")}`;
}

function PatientActionAlert({
  alert,
  resolved,
  resolutionAction,
  highlighted = false,
  onAction,
  onResolve,
}: {
  alert: PatientDetailAlert;
  resolved: boolean;
  resolutionAction?: string;
  highlighted?: boolean;
  onAction: () => void;
  onResolve: () => void;
}) {
  const styles = patientAlertStyles(alert.severity);
  const Icon = styles.icon;

  return (
    <div
      id={`patient-alert-${alert.id}`}
      className={`flex items-start gap-3 rounded-md border p-3 transition-shadow duration-200 ${styles.container} ${resolved ? "opacity-70" : ""} ${highlighted ? "enhance-alert-highlight ring-2 ring-[#003153] ring-offset-2 shadow-md" : ""}`}
    >
      <Icon className={`mt-0.5 size-5 shrink-0 ${styles.iconColor}`} />
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold ${styles.title} ${resolved ? "line-through decoration-gray-400" : ""}`}>
          {alert.title}
        </p>
        <p className={`text-sm ${styles.detail}`}>{alert.detail}</p>
        {resolved && resolutionAction && (
          <p className="mt-1 text-xs text-gray-600">Resolved: {resolutionAction}</p>
        )}
      </div>
      {resolved ? (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
          <Check className="size-3" aria-hidden />
          Actioned
        </span>
      ) : (
        <div className="flex shrink-0 flex-col items-end gap-2">
          <button
            type="button"
            onClick={onAction}
            className="whitespace-nowrap text-sm font-medium text-[#003153] underline-offset-2 hover:underline"
          >
            {alert.actionLabel}
          </button>
          <button
            type="button"
            onClick={onResolve}
            className="inline-flex items-center gap-1 whitespace-nowrap rounded px-2 py-1 text-sm font-medium text-[#003153] hover:bg-[#003153]/5"
          >
            <Check className="size-4" aria-hidden />
            Resolve alert
          </button>
        </div>
      )}
    </div>
  );
}

const PATIENT_ALERTS_PREVIEW_COUNT = 2;

const ALERT_SEVERITY_RANK: Record<PatientDetailAlert["severity"], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function sortPatientDetailAlerts(alerts: PatientDetailAlert[]) {
  return alerts
    .map((alert, index) => ({ alert, index }))
    .sort((a, b) => {
      const severityDiff = ALERT_SEVERITY_RANK[a.alert.severity] - ALERT_SEVERITY_RANK[b.alert.severity];
      return severityDiff !== 0 ? severityDiff : a.index - b.index;
    })
    .map(({ alert }) => alert);
}

function PatientAlertsModal({
  patientName,
  alerts,
  resolvedAlerts,
  highlightedAlertId,
  onAction,
  onResolve,
  onClose,
}: {
  patientName: string;
  alerts: PatientDetailAlert[];
  resolvedAlerts: Record<string, string>;
  highlightedAlertId?: string | null;
  onAction: (alert: PatientDetailAlert) => void;
  onResolve: (alert: PatientDetailAlert) => void;
  onClose: () => void;
}) {
  return (
    <div className="enhance-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="enhance-modal-panel flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white">
        <div className="flex items-start justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-bold text-[#003153]">All alerts</h2>
            <p className="mt-1 text-sm text-gray-600">
              {alerts.length} alert{alerts.length === 1 ? "" : "s"} for {patientName}, ordered by severity.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-200/50 transition-colors hover:bg-gray-300"
          >
            <X className="size-5 text-gray-600" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <PatientActionAlert
                key={alert.id}
                alert={alert}
                resolved={Boolean(resolvedAlerts[alert.id])}
                resolutionAction={resolvedAlerts[alert.id]}
                highlighted={highlightedAlertId === alert.id}
                onAction={() => onAction(alert)}
                onResolve={() => onResolve(alert)}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-md bg-[#003153] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#004266]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function PatientAlertsPanel({
  patientName,
  alerts,
  resolvedAlerts,
  highlightedAlertId,
  onAction,
  onResolve,
}: {
  patientName: string;
  alerts: PatientDetailAlert[];
  resolvedAlerts: Record<string, string>;
  highlightedAlertId?: string | null;
  onAction: (alert: PatientDetailAlert) => void;
  onResolve: (alert: PatientDetailAlert) => void;
}) {
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const sortedAlerts = useMemo(() => sortPatientDetailAlerts(alerts), [alerts]);
  const previewAlerts = useMemo(() => {
    const base = sortedAlerts.slice(0, PATIENT_ALERTS_PREVIEW_COUNT);
    if (!highlightedAlertId) return base;

    const highlighted = sortedAlerts.find((alert) => alert.id === highlightedAlertId);
    if (!highlighted || base.some((alert) => alert.id === highlightedAlertId)) {
      return base;
    }

    return [highlighted, ...base.filter((alert) => alert.id !== highlighted.id)].slice(
      0,
      PATIENT_ALERTS_PREVIEW_COUNT,
    );
  }, [sortedAlerts, highlightedAlertId]);
  const hasMoreAlerts = sortedAlerts.length > previewAlerts.length;
  const panelHighlighted = Boolean(
    highlightedAlertId && previewAlerts.some((alert) => alert.id === highlightedAlertId),
  );

  return (
    <>
      <div
        id="patient-alerts-panel"
        className={`flex h-full flex-col rounded-lg bg-white p-6 transition-shadow duration-200 ${panelHighlighted ? "enhance-alert-panel-highlight ring-2 ring-[#003153]/30 ring-offset-2" : ""}`}
      >
        <h2 className="mb-4 text-lg font-bold text-[#003153]">
          Alerts{sortedAlerts.length > 0 ? ` (${sortedAlerts.length})` : ""}
        </h2>
        {sortedAlerts.length > 0 ? (
          <>
            <div className="space-y-3">
              {previewAlerts.map((alert) => (
                <PatientActionAlert
                  key={alert.id}
                  alert={alert}
                  resolved={Boolean(resolvedAlerts[alert.id])}
                  resolutionAction={resolvedAlerts[alert.id]}
                  highlighted={highlightedAlertId === alert.id}
                  onAction={() => onAction(alert)}
                  onResolve={() => onResolve(alert)}
                />
              ))}
            </div>
            {hasMoreAlerts && (
              <button
                type="button"
                onClick={() => setShowAllAlerts(true)}
                className="mt-4 text-sm font-medium text-[#003153] underline-offset-2 hover:underline"
              >
                View all alerts ({sortedAlerts.length})
              </button>
            )}
          </>
        ) : (
          <div className="rounded-md border border-dashed border-gray-200 p-4">
            <p className="text-sm text-gray-500">No alerts for this patient.</p>
          </div>
        )}
      </div>

      {showAllAlerts && (
        <PatientAlertsModal
          patientName={patientName}
          alerts={sortedAlerts}
          resolvedAlerts={resolvedAlerts}
          highlightedAlertId={highlightedAlertId}
          onAction={onAction}
          onResolve={onResolve}
          onClose={() => setShowAllAlerts(false)}
        />
      )}
    </>
  );
}

function AlertResolutionModal({
  alert,
  selectedOption,
  onSelectOption,
  onClose,
  onConfirm,
}: {
  alert: PatientDetailAlert;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const options = ALERT_RESOLUTION_OPTIONS[alert.actionTarget];

  return (
    <div className="enhance-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="enhance-modal-panel max-h-[90vh] w-full max-w-lg overflow-auto rounded-lg bg-white">
        <div className="flex items-start justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-bold text-[#003153]">Resolve alert</h2>
            <p className="mt-1 text-sm text-gray-600">{alert.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-200/50 transition-colors hover:bg-gray-300"
          >
            <X className="size-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-3 p-6">
          <p className="text-sm font-medium text-gray-700">What action did you take?</p>
          <div className="space-y-2 rounded-md">
            {options.map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors ${
                  selectedOption === option
                    ? "border-[#003153] bg-[#003153]/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name={`alert-resolution-${alert.id}`}
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => onSelectOption(option)}
                  className="mt-0.5 size-4 text-[#003153] focus:ring-[#003153]"
                />
                <span className="text-sm text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-5 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!selectedOption}
            className="rounded-md bg-[#003153] px-5 py-2 text-sm text-white transition-colors hover:bg-[#004266] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm resolution
          </button>
        </div>
      </div>
    </div>
  );
}

function PatientRecordNav({
  currentIndex,
  total,
  onPrevious,
  onNext,
  onBack,
  className = "",
}: {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onBack?: () => void;
  className?: string;
}) {
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < total - 1;
  const iconButtonClass =
    "flex size-9 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div
      className={`flex items-center gap-4 ${onBack ? "justify-between" : "justify-end"} ${className}`}
    >
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-[#003153] transition-opacity hover:opacity-70"
        >
          <ChevronLeft className="size-5" />
          Back to Monitoring
        </button>
      ) : null}

      <div className="flex items-center gap-3">
        <p className="whitespace-nowrap text-sm text-gray-500">
          Patient {currentIndex + 1} of {total}
        </p>
        <div className="inline-flex overflow-hidden rounded-md border border-gray-300 bg-white">
          <button
            type="button"
            onClick={onPrevious}
            disabled={!hasPrevious}
            aria-label="Previous patient"
            className={`${iconButtonClass} border-r border-gray-300 hover:bg-gray-50`}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            aria-label="Next patient"
            className={`${iconButtonClass} hover:bg-gray-50`}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

const CORE_MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    alerts: [
      { type: 'Clinical review', severity: 'high', count: 1 },
      { type: 'Medication management', severity: 'medium', count: 2 },
      { type: 'Engagement', severity: 'low', count: 1 },
      { type: 'Investigation', severity: 'medium', count: 1 },
    ],
    nhsNumber: '123 456 7890',
    age: 68,
    sex: 'Male',
    bloodPressure: '145/92',
    assignedBy: 'Dr. Sarah Johnson',
    assignedByRole: 'Clinical Pharmacist',
    assignedDate: '2 days ago',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    alerts: [{ type: 'Investigation', severity: 'medium', count: 1 }],
    nhsNumber: '234 567 8901',
    age: 54,
    sex: 'Female',
    bloodPressure: '138/88',
  },
  {
    id: '3',
    name: 'Michael Brown',
    alerts: [
      { type: 'Clinical review', severity: 'high', count: 2 },
      { type: 'Engagement', severity: 'low', count: 1 },
    ],
    nhsNumber: '345 678 9012',
    age: 72,
    sex: 'Male',
    bloodPressure: '152/95',
  },
  {
    id: '4',
    name: 'Sarah Patel',
    alerts: [{ type: 'Medication management', severity: 'medium', count: 1 }],
    nhsNumber: '456 789 0123',
    age: 61,
    sex: 'Female',
    bloodPressure: '132/84',
    assignedBy: 'Freya Vincent',
    assignedByRole: 'Nurse Practitioner',
    assignedDate: '1 week ago',
  },
  {
    id: '5',
    name: 'David Thompson',
    alerts: [],
    nhsNumber: '567 890 1234',
    age: 45,
    sex: 'Male',
    bloodPressure: '118/76',
  },
  {
    id: '6',
    name: 'Olivia Hughes',
    alerts: [
      { type: 'Investigation', severity: 'high', count: 1 },
      { type: 'Clinical review', severity: 'medium', count: 1 },
    ],
    nhsNumber: '678 901 2345',
    age: 58,
    sex: 'Female',
    bloodPressure: '141/89',
  },
  {
    id: '7',
    name: 'James O\'Connor',
    alerts: [{ type: 'Engagement', severity: 'low', count: 2 }],
    nhsNumber: '789 012 3456',
    age: 39,
    sex: 'Male',
    bloodPressure: '124/80',
  },
  {
    id: '8',
    name: 'Amelia Khan',
    alerts: [
      { type: 'Clinical review', severity: 'high', count: 1 },
      { type: 'Medication management', severity: 'high', count: 1 },
      { type: 'Investigation', severity: 'medium', count: 1 },
    ],
    nhsNumber: '890 123 4567',
    age: 76,
    sex: 'Female',
    bloodPressure: '158/98',
    assignedBy: 'Jack Bramble',
    assignedByRole: 'General Practitioner',
    assignedDate: '3 days ago',
  },
  {
    id: '9',
    name: 'Robert Davies',
    alerts: [
      { type: 'Clinical review', severity: 'high', count: 1 },
      { type: 'Medication management', severity: 'high', count: 3 },
      { type: 'Investigation', severity: 'medium', count: 1 },
    ],
    nhsNumber: '901 234 5678',
    age: 67,
    sex: 'Male',
    bloodPressure: '149/91',
  },
  {
    id: '10',
    name: 'Grace Williams',
    alerts: [{ type: 'Engagement', severity: 'medium', count: 1 }],
    nhsNumber: '012 345 6789',
    age: 52,
    sex: 'Female',
    bloodPressure: '86/94',
  },
  {
    id: '11',
    name: 'Thomas Wright',
    alerts: [{ type: 'Investigation', severity: 'low', count: 1 }],
    nhsNumber: '123 987 6543',
    age: 63,
    sex: 'Male',
    bloodPressure: '136/86',
  },
  {
    id: '12',
    name: 'Priya Sharma',
    alerts: [
      { type: 'Clinical review', severity: 'medium', count: 2 },
      { type: 'Medication management', severity: 'low', count: 1 },
    ],
    nhsNumber: '234 876 5432',
    age: 49,
    sex: 'Female',
    bloodPressure: '130/85',
    assignedBy: 'Samantha Hue',
    assignedByRole: 'Clinical Pharmacist',
    assignedDate: '5 days ago',
  },
];

const GENERATED_PATIENT_FIRST_NAMES = [
  "Liam", "Charlotte", "Noah", "Sophie", "Daniel", "Emily", "William", "Hannah",
  "Benjamin", "Lucy", "Henry", "Grace", "Arthur", "Chloe", "Leo", "Megan",
  "Oscar", "Rebecca", "Finley", "Zoe", "Theo", "Laura", "Jacob", "Niamh",
  "Ethan", "Aisha", "Mohammed", "Fatima", "Chen", "Mei", "Raj", "Anita",
  "Piotr", "Ewa", "Sean", "Aoife", "Callum", "Isla", "Rhys", "Eleri", "Tariq",
];

const GENERATED_PATIENT_LAST_NAMES = [
  "Taylor", "Evans", "Morgan", "Campbell", "Stewart", "Murray", "Reid", "Fraser",
  "Hamilton", "McDonald", "Sinclair", "Barker", "Walsh", "Pearson", "Newton",
  "Hart", "Brooks", "Fletcher", "Graham", "Holmes", "Ingram", "Jennings", "Kerr",
  "Lowe", "Marsh", "Nash", "Owen", "Palmer", "Quinn", "Riley", "Sharp", "Turner",
  "Underwood", "Vaughan", "Wallace", "Yates", "Abbott", "Bishop", "Cross", "Dunn", "Ellis",
];

const GENERATED_BLOOD_PRESSURES = [
  "118/76", "122/78", "120/80", "124/80", "128/82", "130/85", "132/84", "136/86",
  "138/88", "141/89", "145/92", "149/91", "152/95", "158/98", "134/88", "126/79",
  "119/77", "121/79", "127/83", "133/87", "139/89", "142/90", "147/93", "151/94",
  "116/74", "123/81", "129/84", "135/86", "140/88", "144/91", "148/92", "155/96",
  "117/75", "125/80", "131/83", "137/87", "143/90", "146/92", "150/95", "153/95", "86/94",
];

const GENERATED_ALERT_PATTERNS: Patient["alerts"][] = [
  [],
  [{ type: "Clinical review", severity: "high", count: 1 }],
  [{ type: "Medication management", severity: "medium", count: 1 }],
  [{ type: "Investigation", severity: "medium", count: 1 }],
  [{ type: "Engagement", severity: "low", count: 1 }],
  [{ type: "Clinical review", severity: "high", count: 2 }],
  [{ type: "Medication management", severity: "high", count: 2 }],
  [
    { type: "Clinical review", severity: "high", count: 1 },
    { type: "Engagement", severity: "low", count: 1 },
  ],
  [
    { type: "Medication management", severity: "medium", count: 2 },
    { type: "Investigation", severity: "medium", count: 1 },
  ],
  [
    { type: "Clinical review", severity: "medium", count: 1 },
    { type: "Medication management", severity: "low", count: 1 },
  ],
  [
    { type: "Investigation", severity: "high", count: 1 },
    { type: "Clinical review", severity: "medium", count: 1 },
  ],
  [
    { type: "Engagement", severity: "medium", count: 2 },
    { type: "Medication management", severity: "medium", count: 1 },
  ],
  [
    { type: "Clinical review", severity: "medium", count: 1 },
    { type: "Medication management", severity: "medium", count: 1 },
    { type: "Investigation", severity: "medium", count: 1 },
  ],
];

function formatNhsNumber(seed: number) {
  const part1 = String(100 + (seed % 800)).padStart(3, "0");
  const part2 = String(100 + ((seed * 7) % 800)).padStart(3, "0");
  const part3 = String(1000 + ((seed * 13) % 9000)).padStart(4, "0");
  return `${part1} ${part2} ${part3}`;
}

function buildGeneratedMockPatients(startId: number, count: number): Patient[] {
  const practitioners = [
    { name: "Dr. Sarah Johnson", role: "Clinical Pharmacist", date: "2 days ago" },
    { name: "Freya Vincent", role: "Nurse Practitioner", date: "1 week ago" },
    { name: "Jack Bramble", role: "General Practitioner", date: "3 days ago" },
    { name: "Samantha Hue", role: "Clinical Pharmacist", date: "5 days ago" },
  ];

  return Array.from({ length: count }, (_, index) => {
    const id = String(startId + index);
    const seed = startId + index;
    const firstName = GENERATED_PATIENT_FIRST_NAMES[index % GENERATED_PATIENT_FIRST_NAMES.length];
    const lastName = GENERATED_PATIENT_LAST_NAMES[index % GENERATED_PATIENT_LAST_NAMES.length];
    const assignment = seed % 4 === 0 ? practitioners[seed % practitioners.length] : null;

    return {
      id,
      name: `${firstName} ${lastName}`,
      alerts: GENERATED_ALERT_PATTERNS[seed % GENERATED_ALERT_PATTERNS.length],
      nhsNumber: formatNhsNumber(seed),
      age: 38 + ((seed * 5) % 43),
      sex: seed % 2 === 0 ? "Female" : "Male",
      bloodPressure: GENERATED_BLOOD_PRESSURES[index % GENERATED_BLOOD_PRESSURES.length],
      ...(assignment
        ? {
            assignedBy: assignment.name,
            assignedByRole: assignment.role,
            assignedDate: assignment.date,
          }
        : {}),
    };
  });
}

const mockPatients: Patient[] = [
  ...CORE_MOCK_PATIENTS,
  ...buildGeneratedMockPatients(13, 41),
];

const categories = ['All patients', 'Clinical review', 'Medication management', 'Investigation', 'Engagement'];

const PATIENT_LIST_BATCH_SIZE = 20;

type PlatformNotification = {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
  time: string;
};

function buildPlatformNotifications(): PlatformNotification[] {
  const times = ["10 min ago", "25 min ago", "1 hour ago", "3 hours ago", "Yesterday", "2 days ago"];
  let timeIndex = 0;

  return mockPatients.flatMap((patient) =>
    patient.alerts.map((alert) => {
      const notification: PlatformNotification = {
        id: `${patient.id}-${alert.type}`,
        patientId: patient.id,
        patientName: patient.name,
        title: alert.type,
        detail: `${alert.count} alert${alert.count > 1 ? "s" : ""} for ${patient.name}`,
        severity: alert.severity,
        time: times[timeIndex % times.length],
      };
      timeIndex += 1;
      return notification;
    }),
  );
}

const PLATFORM_NOTIFICATIONS = buildPlatformNotifications();

function notificationSeverityDot(severity: PlatformNotification["severity"]) {
  switch (severity) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-orange-500";
    case "low":
      return "bg-blue-500";
  }
}

function NotificationBell({
  notifications,
  readIds,
  isOpen,
  onToggle,
  onClose,
  onMarkAllRead,
  onSelect,
}: {
  notifications: PlatformNotification[];
  readIds: Set<string>;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onMarkAllRead: () => void;
  onSelect: (notification: PlatformNotification) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((notification) => !readIds.has(notification.id)).length;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"}
        className={`relative flex size-10 items-center justify-center rounded transition-colors ${
          isOpen ? "bg-gray-100" : "hover:bg-gray-100"
        }`}
      >
        <Bell className="size-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="enhance-dropdown absolute right-0 top-full z-50 mt-2 w-[22rem] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <h2 className="text-sm font-semibold text-[#003153]">Notifications</h2>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="text-xs font-medium text-[#003153] hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-gray-500">No notifications right now.</li>
            ) : (
              notifications.map((notification) => {
                const isRead = readIds.has(notification.id);
                return (
                  <li key={notification.id} className="border-b border-gray-100 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => onSelect(notification)}
                      className={`flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                        isRead ? "opacity-70" : "bg-[#003153]/5"
                      }`}
                    >
                      <span
                        className={`mt-1.5 size-2 shrink-0 rounded-full ${notificationSeverityDot(notification.severity)}`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-2">
                          <span className={`text-sm ${isRead ? "font-medium text-gray-700" : "font-semibold text-gray-900"}`}>
                            {notification.title}
                          </span>
                          <span className="shrink-0 text-xs text-gray-500">{notification.time}</span>
                        </span>
                        <span className="mt-0.5 block text-xs text-gray-600">{notification.detail}</span>
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function filterPatientsByCategory(patients: Patient[], filter: string) {
  if (filter === "All patients") {
    return patients;
  }

  return patients.filter((patient) => patient.alerts.some((alert) => alert.type === filter));
}

function getFilterCount(patients: Patient[], filter: string) {
  return filterPatientsByCategory(patients, filter).length;
}

function PatientListAlertsCell({
  patient,
  activeFilter,
  resolvedAlerts,
}: {
  patient: Patient;
  activeFilter: string;
  resolvedAlerts: Record<string, string>;
}) {
  const priority = getPatientPriority(patient, resolvedAlerts);
  const display = getPatientPriorityDisplay(priority);
  const alerts = getVisibleDetailAlerts(patient, activeFilter, resolvedAlerts);

  if (alerts.length === 0) {
    return <span className="text-sm text-gray-400">-</span>;
  }

  if (alerts.length === 1) {
    const alert = alerts[0];

    return (
      <StatusChip badgeClass={display.badgeClass} title={alert.title}>
        1 {getDetailAlertShortLabel(alert)}
      </StatusChip>
    );
  }

  return (
    <div className="group relative">
      <StatusChip badgeClass={display.badgeClass} title={alerts.map((alert) => alert.title).join(" · ")}>
        {alerts.length} alerts
      </StatusChip>
      <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden min-w-[14rem] rounded-md border border-gray-200 bg-white p-3 shadow-lg group-hover:block">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">All alerts</p>
        <div className="flex flex-col items-start gap-1.5">
          {alerts.map((alert) => (
            <StatusChip
              key={alert.id}
              badgeClass={getSoftSeverityChipClass(alert.severity)}
              title={alert.detail}
            >
              {getDetailAlertShortLabel(alert)}
            </StatusChip>
          ))}
        </div>
      </div>
    </div>
  );
}

export type EnhanceDemoScene = "assign-john-smith" | "resolve-bp-alert";

type EnhancePrototypeProps = {
  demoScene?: EnhanceDemoScene;
};

function getDemoInitialState(demoScene?: EnhanceDemoScene) {
  if (demoScene === "assign-john-smith") {
    return {
      currentView: "monitoring" as View,
      selectedPatients: new Set(["1"]),
      showAssignModal: true,
      selectedPractitioner: "1",
      selectedPatient: null as Patient | null,
      alertToResolve: null as PatientDetailAlert | null,
    };
  }

  if (demoScene === "resolve-bp-alert") {
    const patient = CORE_MOCK_PATIENTS.find((entry) => entry.id === "1") ?? null;
    const bpAlert =
      patient != null
        ? (getPatientDetailAlerts(patient).find((alert) => alert.id === `${patient.id}-bp`) ?? null)
        : null;

    return {
      currentView: "patient-detail" as View,
      selectedPatients: new Set<string>(),
      showAssignModal: false,
      selectedPractitioner: "",
      selectedPatient: patient,
      alertToResolve: bpAlert,
    };
  }

  return {
    currentView: "monitoring" as View,
    selectedPatients: new Set<string>(),
    showAssignModal: false,
    selectedPractitioner: "",
    selectedPatient: null as Patient | null,
    alertToResolve: null as PatientDetailAlert | null,
  };
}

export function EnhancePrototype({ demoScene }: EnhancePrototypeProps = {}) {
  const demoInitialState = getDemoInitialState(demoScene);
  const [currentView, setCurrentView] = useState<View>(demoInitialState.currentView);
  const [selectedPatients, setSelectedPatients] = useState<Set<string>>(demoInitialState.selectedPatients);
  const [showAssignModal, setShowAssignModal] = useState(demoInitialState.showAssignModal);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedPractitioner, setSelectedPractitioner] = useState<string>(demoInitialState.selectedPractitioner);
  const [assignmentReason, setAssignmentReason] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(demoInitialState.selectedPatient);
  const [activeFilter, setActiveFilter] = useState("All patients");
  const [resolvedAlerts, setResolvedAlerts] = useState<Record<string, string>>({});
  const [alertToastMessage, setAlertToastMessage] = useState<string | null>(null);
  const [alertToResolve, setAlertToResolve] = useState<PatientDetailAlert | null>(demoInitialState.alertToResolve);
  const [selectedResolutionOption, setSelectedResolutionOption] = useState<string | null>(null);
  const [patientPrograms, setPatientPrograms] = useState<Record<string, PatientProgram[]>>({});
  const [patientMedications, setPatientMedications] = useState<Record<string, PatientMedication[]>>({});
  const [showEditPrograms, setShowEditPrograms] = useState(false);
  const [showEditMedications, setShowEditMedications] = useState(false);
  const [patientAssignments, setPatientAssignments] = useState<Record<string, PatientAssignment>>({});
  const [patientActivityLogs, setPatientActivityLogs] = useState<Record<string, PatientActivityEntry[]>>(DEFAULT_PATIENT_ACTIVITY);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [reassignPractitionerId, setReassignPractitionerId] = useState("");
  const [reassignReason, setReassignReason] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [readNotificationIds, setReadNotificationIds] = useState<Set<string>>(new Set());
  const [highlightedAlertId, setHighlightedAlertId] = useState<string | null>(null);
  const [visiblePatientCount, setVisiblePatientCount] = useState(PATIENT_LIST_BATCH_SIZE);
  const monitoringListRef = useRef<HTMLDivElement>(null);
  const loadMorePatientsRef = useRef<HTMLTableRowElement>(null);
  const filteredPatients = useMemo(
    () =>
      sortPatientsByPriority(
        filterPatientsByCategory(mockPatients, activeFilter),
        resolvedAlerts,
      ),
    [activeFilter, resolvedAlerts],
  );
  const visiblePatients = useMemo(
    () => filteredPatients.slice(0, visiblePatientCount),
    [filteredPatients, visiblePatientCount],
  );
  const hasMorePatients = visiblePatientCount < filteredPatients.length;
  const allPatientsSelected = selectedPatients.size === filteredPatients.length && filteredPatients.length > 0;
  const somePatientsSelected = selectedPatients.size > 0 && !allPatientsSelected;

  useEffect(() => {
    setVisiblePatientCount(PATIENT_LIST_BATCH_SIZE);
    monitoringListRef.current?.scrollTo({ top: 0 });
  }, [activeFilter]);

  useEffect(() => {
    const sentinel = loadMorePatientsRef.current;
    const scrollContainer = monitoringListRef.current;
    if (!sentinel || !scrollContainer || !hasMorePatients) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisiblePatientCount((count) =>
            Math.min(count + PATIENT_LIST_BATCH_SIZE, filteredPatients.length),
          );
        }
      },
      { root: scrollContainer, rootMargin: "160px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredPatients.length, hasMorePatients, visiblePatientCount]);

  useEffect(() => {
    setResolvedAlerts({});
    setAlertToastMessage(null);
    if (!demoScene) {
      setAlertToResolve(null);
      setSelectedResolutionOption(null);
    }
    setShowEditPrograms(false);
    setShowEditMedications(false);
    setShowReassignModal(false);
    setReassignPractitionerId("");
    setReassignReason("");
  }, [demoScene, selectedPatient?.id]);

  const appendPatientActivity = (patientId: string, entry: Omit<PatientActivityEntry, "id">) => {
    setPatientActivityLogs((prev) => ({
      ...prev,
      [patientId]: [
        {
          ...entry,
          id: `${patientId}-${Date.now()}`,
        },
        ...(prev[patientId] ?? []),
      ],
    }));
  };

  const showAlertToast = (message: string) => {
    setAlertToastMessage(message);
    setTimeout(() => setAlertToastMessage(null), 3000);
  };

  const handleAlertAction = (alert: PatientDetailAlert) => {
    const targetId = alert.actionTarget === "medication" ? "current-medication" : "blood-pressure-metrics";
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    const toastMessages: Record<PatientDetailAlert["actionTarget"], string> = {
      "blood-pressure": "Opened blood pressure metrics",
      medication: "Opened current medication",
      "clinical-review": "Opened clinical review section",
      engagement: "Opened patient engagement details",
      investigation: "Opened investigation follow-up",
    };
    showAlertToast(toastMessages[alert.actionTarget]);
  };

  const openAlertResolution = (alert: PatientDetailAlert) => {
    setAlertToResolve(alert);
    setSelectedResolutionOption(null);
  };

  const closeAlertResolution = () => {
    setAlertToResolve(null);
    setSelectedResolutionOption(null);
  };

  const handleConfirmAlertResolution = () => {
    if (!alertToResolve || !selectedResolutionOption || !selectedPatient) return;

    setResolvedAlerts((prev) => ({
      ...prev,
      [alertToResolve.id]: selectedResolutionOption,
    }));
    appendPatientActivity(selectedPatient.id, {
      date: "Just now",
      author: "You",
      summary: `${alertToResolve.title} resolved`,
      detail: selectedResolutionOption,
    });
    closeAlertResolution();
    showAlertToast(`Alert resolved: ${selectedResolutionOption}`);
  };

  const handleSelectPatient = (id: string) => {
    const newSelected = new Set(selectedPatients);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPatients(newSelected);
  };

  const handleAssignClick = () => {
    setShowAssignModal(true);
  };

  const handleConfirmAssignment = () => {
    setShowAssignModal(false);
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    setShowConfirmModal(false);
    setShowToast(true);
    setSelectedPatients(new Set());
    setSelectedPractitioner('');
    setAssignmentReason('');
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleViewPatient = (patient: Patient, options?: { clearHighlight?: boolean }) => {
    if (options?.clearHighlight !== false) {
      setHighlightedAlertId(null);
    }
    setSelectedPatient(patient);
    setCurrentView('patient-detail');
    setNotificationsOpen(false);
  };

  const handleNotificationSelect = (notification: PlatformNotification) => {
    setReadNotificationIds((prev) => new Set(prev).add(notification.id));
    const patient = mockPatients.find((entry) => entry.id === notification.patientId);
    if (patient) {
      setHighlightedAlertId(getDetailAlertIdFromListAlertType(notification.patientId, notification.title));
      handleViewPatient(patient, { clearHighlight: false });
    }
  };

  const markAllNotificationsRead = () => {
    setReadNotificationIds(new Set(PLATFORM_NOTIFICATIONS.map((notification) => notification.id)));
  };

  const patientDetailContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!highlightedAlertId || currentView !== "patient-detail" || !selectedPatient) {
      return;
    }

    const scrollTimer = window.setTimeout(() => {
      patientDetailContentRef.current
        ?.querySelector(`#patient-alert-${highlightedAlertId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);

    const clearTimer = window.setTimeout(() => {
      setHighlightedAlertId(null);
    }, 5000);

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(clearTimer);
    };
  }, [highlightedAlertId, currentView, selectedPatient?.id]);

  const navigatePatientRecord = (direction: "previous" | "next") => {
    if (!selectedPatient) return;

    const currentIndex = mockPatients.findIndex((patient) => patient.id === selectedPatient.id);
    if (currentIndex === -1) return;

    const nextIndex = direction === "previous" ? currentIndex - 1 : currentIndex + 1;
    const nextPatient = mockPatients[nextIndex];
    if (!nextPatient) return;

    setHighlightedAlertId(null);
    setSelectedPatient(nextPatient);
    patientDetailContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentView === 'patient-detail' && selectedPatient) {
    const patientAlerts = getPatientDetailAlerts(selectedPatient);
    const patientPriority = getPatientPriority(selectedPatient, resolvedAlerts);
    const currentPatientIndex = mockPatients.findIndex((patient) => patient.id === selectedPatient.id);
    const programs = patientPrograms[selectedPatient.id] ?? DEFAULT_PATIENT_PROGRAMS;
    const medications = patientMedications[selectedPatient.id] ?? DEFAULT_PATIENT_MEDICATIONS;
    const assignment = getPatientAssignment(selectedPatient, patientAssignments);
    const activity = patientActivityLogs[selectedPatient.id] ?? [];

    const savePrograms = (updatedPrograms: PatientProgram[]) => {
      setPatientPrograms((prev) => ({ ...prev, [selectedPatient.id]: updatedPrograms }));
      setShowEditPrograms(false);
      appendPatientActivity(selectedPatient.id, {
        date: "Just now",
        author: "You",
        summary: "Programs updated",
        detail: `${updatedPrograms.filter((program) => program.active).length} active program(s) on record.`,
      });
      showAlertToast("Programs updated");
    };

    const saveMedications = (updatedMedications: PatientMedication[]) => {
      setPatientMedications((prev) => ({ ...prev, [selectedPatient.id]: updatedMedications }));
      setShowEditMedications(false);
      appendPatientActivity(selectedPatient.id, {
        date: "Just now",
        author: "You",
        summary: "Medication updated",
        detail: updatedMedications.map((medication) => formatMedicationDisplay(medication)).join(", "),
      });
      showAlertToast("Medication updated");
    };

    const openReassignModal = () => {
      setReassignPractitionerId(assignment?.practitionerId ?? "");
      setReassignReason("");
      setShowReassignModal(true);
    };

    const handleConfirmReassignment = () => {
      const practitioner = practitioners.find((entry) => entry.id === reassignPractitionerId);
      if (!practitioner || !reassignReason.trim()) return;

      const updatedAssignment: PatientAssignment = {
        practitionerId: practitioner.id,
        practitionerName: practitioner.name,
        role: practitioner.role,
        assignedDate: "Just now",
      };

      setPatientAssignments((prev) => ({
        ...prev,
        [selectedPatient.id]: updatedAssignment,
      }));
      appendPatientActivity(selectedPatient.id, {
        date: "Just now",
        author: "You",
        summary: `Reassigned to ${practitioner.name}`,
        detail: reassignReason.trim(),
      });
      setSelectedPatient({
        ...selectedPatient,
        assignedBy: practitioner.name,
        assignedByRole: practitioner.role,
        assignedDate: "Just now",
      });
      setShowReassignModal(false);
      setReassignPractitionerId("");
      setReassignReason("");
      showAlertToast(`Patient reassigned to ${practitioner.name}`);
    };

    return (
      <div key="patient-detail" className="enhance-view-enter flex h-full min-h-0 bg-[#f5f7fa]">
        {/* Navigation Sidebar */}
        <div className="w-20 bg-[#003153] flex flex-col items-center py-6 gap-3">
          <button className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <Clipboard className="w-6 h-6 text-[#003153]" />
          </button>
          <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
            <Users className="w-6 h-6 text-white/60" />
          </button>
          <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
            <Activity className="w-6 h-6 text-white/60" />
          </button>
          <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
            <UserPlus className="w-6 h-6 text-white/60" />
          </button>
          <button className="mt-auto w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
            <HelpCircle className="w-6 h-6 text-white/60" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header */}
          <div className="flex h-16 items-center justify-end border-b border-gray-200 bg-white px-6">
            <NotificationBell
              notifications={PLATFORM_NOTIFICATIONS}
              readIds={readNotificationIds}
              isOpen={notificationsOpen}
              onToggle={() => setNotificationsOpen((open) => !open)}
              onClose={() => setNotificationsOpen(false)}
              onMarkAllRead={markAllNotificationsRead}
              onSelect={handleNotificationSelect}
            />
          </div>

          {/* Patient Detail Content */}
          <div ref={patientDetailContentRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6">
            <div className="mx-auto max-w-7xl">
              <PatientRecordNav
                className="mb-6"
                currentIndex={currentPatientIndex}
                total={mockPatients.length}
                onBack={() => setCurrentView("monitoring")}
                onPrevious={() => navigatePatientRecord("previous")}
                onNext={() => navigatePatientRecord("next")}
              />

              <div className="enhance-panel-stagger space-y-4">
                  <PatientProfileHeader patient={selectedPatient} priority={patientPriority} />

                  <div className="grid gap-4 md:grid-cols-2">
                    <PatientAlertsPanel
                      patientName={selectedPatient.name}
                      alerts={patientAlerts}
                      resolvedAlerts={resolvedAlerts}
                      highlightedAlertId={highlightedAlertId}
                      onAction={handleAlertAction}
                      onResolve={openAlertResolution}
                    />

                    <div className="h-full">
                      <PatientAssignmentPanel
                        patientName={selectedPatient.name}
                        assignment={assignment}
                        activity={activity}
                        onReassign={openReassignModal}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Programs */}
                    <div className="rounded-lg bg-white p-6">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-lg font-bold text-[#003153]">Programs</h2>
                        <SectionEditButton label="Edit" onClick={() => setShowEditPrograms(true)} />
                      </div>
                      <div className="space-y-2">
                        {programs.filter((program) => program.active).map((program) => (
                          <div
                            key={program.id}
                            className="flex items-center justify-between rounded-md border border-[#00f0ff]/20 bg-[#f0f9ff] p-3"
                          >
                            <div>
                              <p className="text-sm font-semibold text-[#003153]">{program.name}</p>
                              <p className="text-xs text-gray-600">{program.enrolled}</p>
                            </div>
                            <Check className="size-5 text-green-600" />
                          </div>
                        ))}
                        {programs.filter((program) => program.active).length === 0 && (
                          <p className="text-sm text-gray-500">No active programs.</p>
                        )}
                      </div>
                    </div>

                    {/* Current Medication */}
                    <div id="current-medication" className="rounded-lg bg-white p-6">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-lg font-bold text-[#003153]">Current Medication</h2>
                        <SectionEditButton label="Edit" onClick={() => setShowEditMedications(true)} />
                      </div>
                      <div className="space-y-2">
                        {medications.map((medication) => (
                          <div key={medication.id} className="rounded-md border border-gray-200 p-3">
                            <p className="text-sm font-semibold text-gray-900">{formatMedicationDisplay(medication)}</p>
                            <p className="text-xs text-gray-600">
                              {medication.brand} · {medication.instructions}
                            </p>
                          </div>
                        ))}
                        {medications.length === 0 && (
                          <p className="text-sm text-gray-500">No current medication recorded.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <BloodPressureSection patient={selectedPatient} />
              </div>

              {/* Navigation */}
              <PatientRecordNav
                className="mt-6"
                currentIndex={currentPatientIndex}
                total={mockPatients.length}
                onPrevious={() => navigatePatientRecord("previous")}
                onNext={() => navigatePatientRecord("next")}
              />
            </div>
          </div>
        </div>

        {alertToastMessage && (
          <div className="enhance-toast fixed bottom-6 right-6 z-50">
            <div className="flex items-center gap-3 rounded-md bg-[#003153] px-5 py-3 text-white shadow-lg">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white">
                <Check className="size-4 text-[#003153]" />
              </div>
              <p className="text-sm">{alertToastMessage}</p>
              <button
                type="button"
                onClick={() => setAlertToastMessage(null)}
                className="flex size-6 shrink-0 items-center justify-center rounded hover:bg-white/10"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        )}

        {alertToResolve && (
          <AlertResolutionModal
            alert={alertToResolve}
            selectedOption={selectedResolutionOption}
            onSelectOption={setSelectedResolutionOption}
            onClose={closeAlertResolution}
            onConfirm={handleConfirmAlertResolution}
          />
        )}

        {showEditPrograms && (
          <EditProgramsModal
            programs={programs}
            onClose={() => setShowEditPrograms(false)}
            onSave={savePrograms}
          />
        )}

        {showEditMedications && (
          <EditMedicationsModal
            medications={medications}
            onClose={() => setShowEditMedications(false)}
            onSave={saveMedications}
          />
        )}

        {showReassignModal && (
          <ReassignPractitionerModal
            patientName={selectedPatient.name}
            practitioners={practitioners}
            selectedPractitionerId={reassignPractitionerId}
            reason={reassignReason}
            onSelectPractitioner={setReassignPractitionerId}
            onReasonChange={setReassignReason}
            onClose={() => setShowReassignModal(false)}
            onConfirm={handleConfirmReassignment}
          />
        )}
      </div>
    );
  }

  return (
    <div key="monitoring" className="enhance-view-enter flex h-full min-h-0 bg-[#f5f7fa]">
      {/* Navigation Sidebar */}
      <div className="w-20 bg-[#003153] flex flex-col items-center py-6 gap-3">
        <button className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
          <Clipboard className="w-6 h-6 text-[#003153]" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <Users className="w-6 h-6 text-white/60" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <Activity className="w-6 h-6 text-white/60" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <UserPlus className="w-6 h-6 text-white/60" />
        </button>
        <button className="mt-auto w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <HelpCircle className="w-6 h-6 text-white/60" />
        </button>
      </div>

      {/* Filter Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-bold text-[#072235] mb-4">Monitoring</h2>
          <div className="space-y-2">
            {categories.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex w-full items-center justify-between rounded-md px-4 py-2.5 text-left text-sm transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#003153] text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    activeFilter === filter ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {getFilterCount(mockPatients, filter)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div>
            <h1 className="text-xl font-bold text-[#072235]">{activeFilter}</h1>
            <p className="text-sm text-gray-500">
              {filteredPatients.length} patient{filteredPatients.length === 1 ? "" : "s"}
              {activeFilter !== "All patients" ? ` with ${activeFilter.toLowerCase()} alerts` : ""}
              {" · "}Sorted by priority
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="h-9 w-52 rounded-md border border-gray-300 py-0 pl-8 pr-3 text-sm focus:border-[#003153] focus:outline-none"
              />
            </div>
            <NotificationBell
              notifications={PLATFORM_NOTIFICATIONS}
              readIds={readNotificationIds}
              isOpen={notificationsOpen}
              onToggle={() => setNotificationsOpen((open) => !open)}
              onClose={() => setNotificationsOpen(false)}
              onMarkAllRead={markAllNotificationsRead}
              onSelect={handleNotificationSelect}
            />
          </div>
        </div>

        {/* Patient Table */}
        <div ref={monitoringListRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-3 text-left">
                    <EnhanceCheckbox
                      checked={allPatientsSelected}
                      indeterminate={somePatientsSelected}
                      aria-label={allPatientsSelected ? "Deselect all patients" : "Select all patients"}
                      onChange={() => {
                        if (allPatientsSelected) {
                          setSelectedPatients(new Set());
                        } else {
                          setSelectedPatients(new Set(filteredPatients.map((patient) => patient.id)));
                        }
                      }}
                    />
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700 text-sm">Name</th>
                  <th className="min-w-[7rem] p-3 text-left font-semibold text-gray-700 text-sm">Priority</th>
                  <th className="min-w-[5.5rem] p-3 text-left font-semibold text-gray-700 text-sm">Alerts</th>
                  <th className="p-3 text-left font-semibold text-gray-700 text-sm">NHS Number</th>
                  <th className="p-3 text-left font-semibold text-gray-700 text-sm">Age</th>
                  <th className="p-3 text-left font-semibold text-gray-700 text-sm">Sex</th>
                  <th className="p-3 text-left font-semibold text-gray-700 text-sm">Systolic (mmHg)</th>
                  <th className="p-3 text-left font-semibold text-gray-700 text-sm">Diastolic (mmHg)</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-sm text-gray-500">
                      No patients with {activeFilter.toLowerCase()} alerts.
                    </td>
                  </tr>
                ) : (
                  <>
                  {visiblePatients.map((patient) => {
                    const priority = getPatientPriority(patient, resolvedAlerts);

                    return (
                  <tr
                    key={patient.id}
                    className={`cursor-pointer border-b border-gray-100 transition-[background-color,box-shadow] duration-200 ease-out ${
                      selectedPatients.has(patient.id)
                        ? 'bg-[#003153]/5 shadow-[inset_3px_0_0_0_#003153]'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleViewPatient(patient)}
                  >
                    <td className="p-3" onClick={(event) => event.stopPropagation()}>
                      <EnhanceCheckbox
                        checked={selectedPatients.has(patient.id)}
                        aria-label={selectedPatients.has(patient.id) ? `Deselect ${patient.name}` : `Select ${patient.name}`}
                        onChange={() => handleSelectPatient(patient.id)}
                      />
                    </td>
                    <td className="p-3">
                      <p className="font-medium text-gray-900 text-sm">{patient.name}</p>
                    </td>
                    <td className="whitespace-nowrap p-3">
                      <PatientPriorityBadge priority={priority} />
                    </td>
                    <td className="whitespace-nowrap p-3">
                      <PatientListAlertsCell
                        patient={patient}
                        activeFilter={activeFilter}
                        resolvedAlerts={resolvedAlerts}
                      />
                    </td>
                    <td className="p-3 text-gray-700 text-sm">{patient.nhsNumber}</td>
                    <td className="p-3 text-gray-700 text-sm">{patient.age}</td>
                    <td className="p-3 text-gray-700 text-sm">{patient.sex}</td>
                    <td className="p-3">
                      <BloodPressureValue value={patient.bloodPressure} part="systolic" />
                    </td>
                    <td className="p-3">
                      <BloodPressureValue value={patient.bloodPressure} part="diastolic" />
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleViewPatient(patient);
                        }}
                        className="px-4 py-1.5 bg-[#003153] text-white rounded-md hover:bg-[#004266] transition-colors text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                    );
                  })}
                  {hasMorePatients && (
                    <tr ref={loadMorePatientsRef}>
                      <td colSpan={10} className="enhance-fade-in p-4 text-center text-sm text-gray-500">
                        Showing {visiblePatients.length} of {filteredPatients.length} patients
                      </td>
                    </tr>
                  )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Assign Button */}
          {selectedPatients.size > 0 && (
            <div className="enhance-fade-up mt-6 flex justify-center">
              <button
                onClick={handleAssignClick}
                className="px-8 py-2.5 bg-[#00f0ff] text-[#003153] font-semibold rounded-md hover:bg-[#00d9e8] transition-colors"
              >
                Assign to ({selectedPatients.size})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="enhance-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="enhance-modal-panel max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#003153]">
                  Assign {Array.from(selectedPatients).map((id) => mockPatients.find((p) => p.id === id)?.name).join(', ')} to
                </h2>
                <p className="text-sm text-gray-600 mt-1">This is the section where you can assign a different health care practitioner to a patient</p>
              </div>
              <button
                onClick={() => setShowAssignModal(false)}
                className="w-10 h-10 rounded-full bg-gray-200/50 hover:bg-gray-300 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Column Headers */}
              <div className="bg-white rounded-md p-2">
                <div className="grid grid-cols-[40px_1fr_1fr_1fr] gap-4 text-xs text-[#003153]">
                  <div></div>
                  <div>Name</div>
                  <div>Role</div>
                  <div>Number of patients</div>
                </div>
              </div>

              {/* Practitioner List */}
              <div className="space-y-2">
                {practitioners.map((practitioner) => (
                  <label
                    key={practitioner.id}
                    className={`flex items-center gap-4 p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedPractitioner === practitioner.id
                        ? 'border-[#003153] bg-[rgba(0,240,255,0.05)]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="practitioner"
                      value={practitioner.id}
                      checked={selectedPractitioner === practitioner.id}
                      onChange={(e) => setSelectedPractitioner(e.target.value)}
                      className="w-4 h-4 text-[#003153] focus:ring-[#003153]"
                    />
                    <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-[#003153]">{practitioner.name}</p>
                      </div>
                      <div>
                        <p className="text-black">{practitioner.role}</p>
                      </div>
                      <div>
                        <p className="text-black">{practitioner.patients}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Reason Textarea */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-sm font-medium text-gray-700">Reason for assignment</label>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <textarea
                  value={assignmentReason}
                  onChange={(e) => setAssignmentReason(e.target.value)}
                  placeholder="Enter reason..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#003153] resize-none text-sm"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
                >
                  Close
                </button>
                <button
                  onClick={handleConfirmAssignment}
                  disabled={!selectedPractitioner}
                  className="px-5 py-2 bg-[#003153] text-white rounded-md hover:bg-[#004266] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#003153]"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="enhance-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="enhance-modal-panel w-full max-w-md rounded-lg bg-white">
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-[#003153]">Are you sure that you would like to continue?</h2>
              <p className="text-[#003153]">
                {practitioners.find((p) => p.id === selectedPractitioner)?.name} will be assigned{' '}
                {Array.from(selectedPatients).map((id) => mockPatients.find((p) => p.id === id)?.name).join(', ')}.
              </p>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setShowAssignModal(true);
                  }}
                  className="flex-1 px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
                >
                  No, go back
                </button>
                <button
                  onClick={handleFinalConfirm}
                  className="flex-1 px-5 py-2 bg-[#003153] text-white rounded-md hover:bg-[#004266] transition-colors text-sm"
                >
                  Yes, continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="enhance-toast fixed bottom-6 right-6 z-50">
          <div className="flex items-center gap-3 rounded-md bg-[#00a106] px-5 py-3 text-white">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-[#00a106]" />
            </div>
            <p className="text-sm">
              Patient has been reassigned to {practitioners.find((p) => p.id === selectedPractitioner)?.name}
            </p>
            <button
              onClick={() => setShowToast(false)}
              className="w-6 h-6 hover:bg-[#009105] flex items-center justify-center transition-colors rounded flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
