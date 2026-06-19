/** Shared timeline data shape for case study Gantt sections */

export type CaseStudyTimelineTask = {
  label: string;
  startWeek: number;
  endWeek: number;
  involved: boolean;
  /** Short description of what this task involved, shown in the tooltip */
  detail?: string;
};

export type CaseStudyTimelinePhase = {
  label: string;
  tasks: readonly CaseStudyTimelineTask[];
};

export type CaseStudyProjectTimelineData = {
  totalWeeks: number;
  lead: string;
  intro: string;
  phases: readonly CaseStudyTimelinePhase[];
};
