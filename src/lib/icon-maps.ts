import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  ClipboardCheck,
  Compass,
  FlaskConical,
  Handshake,
  Layers,
  Lightbulb,
  Microscope,
  Palette,
  Presentation,
  Rocket,
  ScanSearch,
  Target,
  TrendingUp,
} from "lucide-react";

export const skillIcons: Record<string, LucideIcon> = {
  "User research": Microscope,
  "UI design": Palette,
  "Co-design & facilitation": Presentation,
  "Usability testing": ClipboardCheck,
};

export const processIcons: LucideIcon[] = [
  Compass,
  Target,
  Lightbulb,
  Layers,
  FlaskConical,
  Rocket,
];

export const valuePropIcons: LucideIcon[] = [
  ScanSearch,
  Handshake,
  TrendingUp,
  ArrowRightLeft,
];
