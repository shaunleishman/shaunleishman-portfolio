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
    tagline: "Triage, monitoring oversight, and VISO usage",
    accentColor: "#c4786a",
    accentBg: "#ebb9ad",
    headingColor: "#c4786a",
    boardSrc: "/projects/omron-patient-monitoring/general-practitioner-user-group.png",
    boardAlt: "General practitioner persona board illustration",
    role: "Responsible for triaging, supervising the entire clinical staff and handling diverse medical cases.",
    keyTasks: [
      "Triages daily patient flow and designates health professionals accordingly.",
      "Focuses on home blood pressure monitoring to reduce white coat hypertension.",
      "Initiates annual blood checks for hypertension management.",
      "Uses tech tools for patient data and ensuring accurate clinical decisions.",
    ],
    interactions: [
      { label: "Administrative staff", description: "Sorting and documenting patient data." },
      { label: "Nurse practitioners and nurses", description: "Reviews patients and addresses concerns." },
      { label: "Patients", description: "Blood pressure monitoring and follow-ups." },
    ],
    visoUsage: [
      "Uses in-practice monitors for initial checks. If readings are high, patients are advised to undergo home monitoring — given either paper forms or guided to use apps.",
      "Based on results, issues treatment plans following NICE guidelines.",
      "Actions alerted cards when appropriate to their role.",
    ],
  },
  {
    id: "nurse-practitioner",
    name: "Nurse practitioner",
    shortLabel: "Nurse practitioner",
    tagline: "Remote monitoring and action cards",
    accentColor: "#7d6b9e",
    accentBg: "#d4c8e8",
    headingColor: "#7d6b9e",
    boardSrc: "/projects/omron-patient-monitoring/nurse-practitioner-user-group.png",
    boardAlt: "Nurse practitioner persona board illustration",
    role: "Acts like a GP registrar — assesses, diagnoses, treats conditions, and refers patients to secondary or specialist care.",
    keyTasks: [
      "Engages in remote monitoring of long-term diseases, especially for blood pressure, with decisions based on patient situations.",
      "Uses guidelines and templates for diagnosis and structured patient care.",
      "Promotes streamlined approaches to monitoring conditions and their administration, including by introduction of relevant technology.",
    ],
    interactions: [
      {
        label: "Practice staff",
        description: "Collaborative engagement for patient information management and care.",
      },
      { label: "Patients", description: "Remote monitoring and in-person visits." },
    ],
    visoUsage: [
      "The nurse practitioner and their team work to recruit and onboard prospective patients on VISO.",
      "Prompts patients and follows up about blood pressure readings and tests required for diagnostics and condition review.",
      "Checks alerts and action cards needing attention.",
      "Appreciates the data overviews, graphs and data pulled from other systems, but thinks further data synchronisation between primary and secondary care systems is needed.",
      "Acknowledges VISO is not an option for older and less tech-savvy patients, with slight reservations about entirely relying on remote methods.",
    ],
  },
  {
    id: "clinical-pharmacist",
    name: "Clinical pharmacist",
    shortLabel: "Pharmacist",
    tagline: "Medication management workflows",
    accentColor: "#a0894f",
    accentBg: "#f2e4bc",
    headingColor: "#a0894f",
    boardSrc: "/projects/omron-patient-monitoring/clinical-pharmacists-user-group.png",
    boardAlt: "Clinical pharmacist persona board illustration",
    role: "Oversee patient medication management in primary care settings.",
    keyTasks: [
      "Manages and reviews long-term conditions like hypertension, ensuring appropriate monitoring and treatment measures.",
      "Performs remote and on-site consultations based on the disease type and patient conditions.",
      "Diagnoses and manages hypertension using local and national guidelines.",
      "Collaborates with teams for continuous patient care.",
    ],
    interactions: [
      { label: "GPs and nurses", description: "Collaboration on patient issues." },
      { label: "Receptionists", description: "For appointments and e-consultations." },
      { label: "Patients", description: "Direct communication via Accurx." },
    ],
    visoUsage: [
      "Diagnosis and treatment: comprehensive management of hypertension, from diagnosing new cases based on local and national guidelines to managing known cases.",
      "Monitoring: emphasis on regular monitoring, involving blood tests, pulse checks, and home blood pressure readings. Also oversees anticoagulant monitoring to ensure accurate dosing.",
    ],
  },
  {
    id: "practice-nurse",
    name: "Practice nurse",
    shortLabel: "Practice nurse",
    tagline: "Patient onboarding and monitoring setup",
    accentColor: "#003da5",
    accentBg: "#b8d4eb",
    headingColor: "#003da5",
    boardSrc: "/projects/omron-patient-monitoring/senior-nurse-user-group.png",
    boardAlt: "Practice nurse persona board illustration",
    role: "Working as part of the primary healthcare team, practice nurses provide and support patient care.",
    keyTasks: [
      "Contributes to patient diagnostics, monitoring and treatment.",
      "Maintains patient records, receives, reviews, and passes on data.",
      "Follows up with patients by scheduling tests and messaging through the platform.",
      "Works in tandem with administrative and clinical staff ensuring patient engagement and recall.",
    ],
    interactions: [
      { label: "GPs", description: "For consultations around patient care and required procedures." },
      { label: "Pharmacists", description: "For treatment plans." },
      { label: "Patients", description: "For hypertension monitoring and follow-ups." },
    ],
    visoUsage: [
      "The VISO platform plays a role in remotely reviewing patients' blood pressure and other relevant data. Instead of traditional methods around readings, tests and symptom questionnaires, they can now rely on digital records from VISO.",
      "VISO supports record handling and review, reviewing and prioritising readings, assigning tests and appointment scheduling, messaging patients through the platform, and ensuring they respond to app prompts.",
    ],
  },
];

export function getOmronPractitioner(id: string) {
  return omronPractitioners.find((practitioner) => practitioner.id === id);
}
