export type OmronPractitionerInteraction = {
  label: string;
  description: string;
};

export type OmronPractitioner = {
  id: string;
  name: string;
  shortLabel: string;
  tagline: string;
  accentColor: string;
  accentBg: string;
  headingColor: string;
  /** Character illustration for the explorer header */
  illustrationSrc: string;
  illustrationWidth: number;
  illustrationHeight: number;
  /** Character illustration alt text for the explorer header */
  illustrationAlt: string;
  /** Full workshop persona board */
  boardSrc: string;
  boardAlt: string;
  role: string;
  keyTasks: string[];
  interactions: OmronPractitionerInteraction[];
  visoUsage: string[];
};

export const omronPractitioners: OmronPractitioner[] = [
  {
    id: "general-practitioner",
    name: "General practitioner",
    shortLabel: "GP",
    tagline: "Triage and monitoring oversight",
    accentColor: "#c4786a",
    accentBg: "#ebb9ad",
    headingColor: "#c4786a",
    illustrationSrc: "/projects/omron-patient-monitoring/illustrations/general-practitioner.png",
    illustrationWidth: 400,
    illustrationHeight: 480,
    illustrationAlt: "General practitioner illustration",
    boardSrc: "/projects/omron-patient-monitoring/general-practitioner-user-group.png",
    boardAlt: "General practitioner persona board",
    role: "Responsible for triaging, supervising the entire clinical staff and handling diverse medical cases.",
    keyTasks: [
      "Triages daily patient flow and designates health professionals accordingly.",
      "Focuses on home blood pressure monitoring to reduce white coat hypertension.",
      "Uses tech tools to manage patient data and support accurate clinical decisions.",
    ],
    interactions: [
      { label: "Administrative staff", description: "Sorting and documenting patient data." },
      { label: "Nurse practitioners and nurses", description: "Reviews patients and addresses concerns." },
      { label: "Patients", description: "Blood pressure monitoring and follow-ups." },
    ],
    visoUsage: [
      "Uses in-practice monitors for initial checks, then moves high readings to home monitoring.",
      "Issues treatment plans based on the results, following NICE guidelines.",
      "Actions alerted cards when appropriate to their role.",
    ],
  },
  {
    id: "nurse-practitioner",
    name: "Nurse practitioner",
    shortLabel: "Nurse practitioner",
    tagline: "Remote monitoring and alerts",
    accentColor: "#7d6b9e",
    accentBg: "#d4c8e8",
    headingColor: "#7d6b9e",
    illustrationSrc: "/projects/omron-patient-monitoring/illustrations/nurse-practitioner.png",
    illustrationWidth: 400,
    illustrationHeight: 480,
    illustrationAlt: "Nurse practitioner illustration",
    boardSrc: "/projects/omron-patient-monitoring/nurse-practitioner-user-group.png",
    boardAlt: "Nurse practitioner persona board",
    role: "Acts like a GP registrar, assesses, diagnoses, treats conditions, and refers patients to secondary or specialist care.",
    keyTasks: [
      "Remotely monitors long-term conditions like blood pressure, with care based on each patient.",
      "Uses guidelines and templates for diagnosis and structured patient care.",
      "Promotes streamlined ways to monitor conditions, including new technology.",
    ],
    interactions: [
      {
        label: "Practice staff",
        description: "Collaborative engagement for patient information management and care.",
      },
      { label: "Patients", description: "Remote monitoring and in-person visits." },
    ],
    visoUsage: [
      "Works with their team to recruit and onboard prospective patients on VISO.",
      "Prompts patients and follows up on blood pressure readings and required tests.",
      "Checks alerts and action cards needing attention.",
    ],
  },
  {
    id: "clinical-pharmacist",
    name: "Clinical pharmacist",
    shortLabel: "Pharmacist",
    tagline: "Medication management",
    accentColor: "#a0894f",
    accentBg: "#f2e4bc",
    headingColor: "#a0894f",
    illustrationSrc: "/projects/omron-patient-monitoring/illustrations/clinical-pharmacist.png",
    illustrationWidth: 400,
    illustrationHeight: 480,
    illustrationAlt: "Clinical pharmacist illustration",
    boardSrc: "/projects/omron-patient-monitoring/clinical-pharmacists-user-group.png",
    boardAlt: "Clinical pharmacist persona board",
    role: "Oversee patient medication management in primary care settings.",
    keyTasks: [
      "Manages and reviews long-term conditions like hypertension, monitoring and adjusting treatment.",
      "Runs remote and on-site consultations based on the condition and the patient.",
      "Diagnoses and manages hypertension using local and national guidelines.",
    ],
    interactions: [
      { label: "GPs and nurses", description: "Collaboration on patient issues." },
      { label: "Receptionists", description: "For appointments and e-consultations." },
      { label: "Patients", description: "Direct communication via Accurx." },
    ],
    visoUsage: [
      "Covers the full management of hypertension, from diagnosing new cases to managing known ones.",
      "Monitors through blood tests, pulse checks, and home blood pressure readings.",
    ],
  },
  {
    id: "practice-nurse",
    name: "Practice nurse",
    shortLabel: "Practice nurse",
    tagline: "Onboarding and monitoring setup",
    accentColor: "#003da5",
    accentBg: "#b8d4eb",
    headingColor: "#003da5",
    illustrationSrc: "/projects/omron-patient-monitoring/illustrations/practice-nurse.png",
    illustrationWidth: 400,
    illustrationHeight: 480,
    illustrationAlt: "Practice nurse illustration",
    boardSrc: "/projects/omron-patient-monitoring/practice-nurse-user-group.png",
    boardAlt: "Practice nurse persona board",
    role: "Working as part of the primary healthcare team, practice nurses provide and support patient care.",
    keyTasks: [
      "Contributes to patient diagnostics, monitoring, and treatment.",
      "Maintains patient records and passes data on to the right people.",
      "Follows up with patients by scheduling tests and messaging through the platform.",
    ],
    interactions: [
      { label: "GPs", description: "For consultations around patient care and required procedures." },
      { label: "Pharmacists", description: "For treatment plans." },
      { label: "Patients", description: "For hypertension monitoring and follow-ups." },
    ],
    visoUsage: [
      "Reviews patients' blood pressure and data through VISO instead of traditional readings and questionnaires.",
      "Handles records, prioritises readings, and messages patients through the platform.",
    ],
  },
  {
    id: "admin-staff",
    name: "Admin staff",
    shortLabel: "Admin",
    tagline: "Registration and scheduling",
    accentColor: "#5a8f6b",
    accentBg: "#c8e8d4",
    headingColor: "#5a8f6b",
    illustrationSrc: "/projects/omron-patient-monitoring/illustrations/admin-staff.png",
    illustrationWidth: 400,
    illustrationHeight: 480,
    illustrationAlt: "Admin staff illustration",
    boardSrc: "/projects/omron-patient-monitoring/admin-staff-user-group.png",
    boardAlt: "Admin staff persona board",
    role: "Admin staff ensure the seamless operation of the primary care practice by managing patient documentation, facilitating communication, and overseeing digital records in systems like OMRON VISO.",
    keyTasks: [
      "Responsible for registration of patients.",
      "Handles appointment scheduling, document sorting, and patient data entry.",
      "Offers basic tech support for systems like the OMRON VISO platform.",
    ],
    interactions: [
      { label: "GPs", description: "Collaborate on documentation and review." },
      {
        label: "Nurse practitioners and practice nurses",
        description: "Support remote monitoring setups.",
      },
      { label: "Patients", description: "Primary administrative point of contact." },
    ],
    visoUsage: [
      "Play one of the key roles in recruitment and signing-up patients with the system.",
      "Involved in data management, patient communication, extracting reports, and maintaining the platform's functionality and user access.",
      "Responsible for patient communications around recall for tests, reviews, and consultations.",
    ],
  },
];

export function getOmronPractitioner(id: string) {
  return omronPractitioners.find((practitioner) => practitioner.id === id);
}
