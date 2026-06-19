import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  BriefcaseBusiness,
  ClipboardCheck,
  Compass,
  FlaskConical,
  Handshake,
  HeartPulse,
  Landmark,
  Layers,
  Leaf,
  Lightbulb,
  Microscope,
  Palette,
  Presentation,
  Rocket,
  ScanSearch,
  Target,
  TrendingUp,
  Wallet,
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

export const heroFocusIcons: Record<string, LucideIcon> = {
  "Energy & sustainability": Leaf,
  Healthcare: HeartPulse,
  Government: Landmark,
  Finance: Wallet,
  "Mostly B2B products": BriefcaseBusiness,
};
