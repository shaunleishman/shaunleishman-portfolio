/**
 * Route Check scores.
 * Ten questions. Each option scores 1–5 in the order it is listed.
 * The total stays null until every answer is set, then falls between 10 and 50.
 * Bands: 10–20 heavy, 21–30 stop-start, 31–40 clear, 41–50 smooth.
 * Tones: smooth is positive, heavy is negative, and the middle two are mixed.
 * Arrow keys, Home, and End move that 1-based score and wrap.
 * The options stay in the tab order.
 */

export type RouteCheckQuestion = {
  id: number;
  question: string;
  hint?: string;
  options: [string, string, string, string, string];
};

export const ROUTE_CHECK_QUESTIONS: RouteCheckQuestion[] = [
  {
    id: 1,
    question: "How clear is the main purpose of this page?",
    options: ["Very unclear", "Somewhat unclear", "Neutral", "Somewhat clear", "Very clear"],
  },
  {
    id: 2,
    question: "How obvious is the main action or task?",
    options: ["Very unclear", "Somewhat unclear", "Neutral", "Somewhat obvious", "Very obvious"],
  },
  {
    id: 3,
    question: "How well does the page guide attention to the right place first?",
    options: ["Very poorly", "Somewhat poorly", "Neutral", "Somewhat well", "Very well"],
  },
  {
    id: 4,
    question: "How manageable are the choices on the page?",
    options: [
      "Very unmanageable",
      "Somewhat unmanageable",
      "Neutral",
      "Somewhat manageable",
      "Very manageable",
    ],
  },
  {
    id: 5,
    question: "How clear is the language on the page?",
    hint: "Labels, buttons, statuses, headings, helper text, and instructions.",
    options: ["Very unclear", "Somewhat unclear", "Neutral", "Somewhat clear", "Very clear"],
  },
  {
    id: 6,
    question: "How relevant is the visible information to the user's current task?",
    options: [
      "Very irrelevant",
      "Somewhat irrelevant",
      "Neutral",
      "Somewhat relevant",
      "Very relevant",
    ],
  },
  {
    id: 7,
    question: "How much memory burden does the page create?",
    options: ["Very high", "Somewhat high", "Neutral", "Somewhat low", "Very low"],
  },
  {
    id: 8,
    question: "How calm and focused is the page?",
    options: [
      "Very distracting",
      "Somewhat distracting",
      "Neutral",
      "Somewhat calm",
      "Very calm",
    ],
  },
  {
    id: 9,
    question: "How clear is the next step?",
    options: ["Very unclear", "Somewhat unclear", "Neutral", "Somewhat clear", "Very clear"],
  },
  {
    id: 10,
    question: "How well would this page work under pressure?",
    options: ["Very poorly", "Somewhat poorly", "Neutral", "Somewhat well", "Very well"],
  },
];

export type RouteBand = {
  id: string;
  label: string;
  min: number;
  max: number;
  description: string;
  color: string;
};

export const ROUTE_BANDS: RouteBand[] = [
  {
    id: "heavy",
    label: "Heavy route",
    min: 10,
    max: 20,
    description: "The page is likely making users work too hard.",
    color: "#dc2626",
  },
  {
    id: "stop-start",
    label: "Stop-start route",
    min: 21,
    max: 30,
    description: "The page is usable, but it creates noticeable friction.",
    color: "#d97706",
  },
  {
    id: "clear",
    label: "Clear route",
    min: 31,
    max: 40,
    description: "The page is mostly easy to use, with some room to improve.",
    color: "#3b66f5",
  },
  {
    id: "smooth",
    label: "Smooth route",
    min: 41,
    max: 50,
    description: "The page gives users a clear route and keeps mental effort low.",
    color: "#16a34a",
  },
];

export function getRouteBand(total: number): RouteBand {
  return (
    ROUTE_BANDS.find((band) => total >= band.min && total <= band.max) ?? ROUTE_BANDS[0]
  );
}

export type RouteBandTone = "positive" | "mixed" | "negative";

export function getRouteBandTone(bandId: RouteBand["id"]): RouteBandTone {
  if (bandId === "smooth") return "positive";
  if (bandId === "heavy") return "negative";
  return "mixed";
}

export function sumAnswers(answers: Array<number | null>): number | null {
  if (answers.some((value) => value === null)) return null;
  return answers.reduce<number>((sum, value) => sum + (value ?? 0), 0);
}

/** Next 1-based option for a radio key, or null when the key does not move the score. */
export function nextOptionScore(
  current: number | null,
  key: string,
  optionCount: number,
): number | null {
  if (optionCount < 1) return null;
  if (key === "Home") return 1;
  if (key === "End") return optionCount;

  const forward = key === "ArrowRight" || key === "ArrowDown";
  const backward = key === "ArrowLeft" || key === "ArrowUp";
  if (!forward && !backward) return null;

  if (current === null || current < 1 || current > optionCount) {
    return forward ? 1 : optionCount;
  }

  if (forward) return current === optionCount ? 1 : current + 1;
  return current === 1 ? optionCount : current - 1;
}
