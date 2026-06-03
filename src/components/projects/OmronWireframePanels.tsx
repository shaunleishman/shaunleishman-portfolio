import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const OMRON_WF_BLUE = "#003da5";
export const IMAGE_W = 799;
export const IMAGE_H = 1024;
const INK = "#334155";
const MUTED = "#64748b";
const LINE = "#94a3b8";
const FILL = "#f8fafc";

type PanelProps = {
  className?: string;
  /** 0–1 draw progress for entrance animation */
  draw?: number;
};

function WfSvg({
  className,
  children,
  viewBox = "0 0 360 260",
}: {
  className?: string;
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function Box({
  x,
  y,
  w,
  h,
  r = 4,
  stroke = LINE,
  fill = "white",
  sw = 1.25,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  stroke?: string;
  fill?: string;
  sw?: number;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={sw} />;
}

function Label({
  x,
  y,
  children,
  size = 8,
  fill = INK,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: string;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={size}
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}

function Line({ x1, y1, x2, y2, stroke = LINE }: { x1: number; y1: number; x2: number; y2: number; stroke?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={1.25} />;
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g stroke={MUTED} strokeWidth={1.25} fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <path d={`M${x2 - 5} ${y2 - 3} L${x2} ${y2} L${x2 - 5} ${y2 + 3}`} />
    </g>
  );
}

function Check({ x, y, checked }: { x: number; y: number; checked?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={10} height={10} rx={1.5} fill="white" stroke={LINE} strokeWidth={1} />
      {checked && (
        <path
          d={`M${x + 2} ${y + 5.5} L${x + 4.5} ${y + 8} L${x + 8.5} ${y + 3}`}
          stroke={OMRON_WF_BLUE}
          strokeWidth={1.25}
          fill="none"
        />
      )}
    </g>
  );
}

function PaperFrame({ children, refined = false, title }: { children: ReactNode; refined?: boolean; title?: string }) {
  return (
    <>
      <rect width="360" height="260" fill="#ffffff" />
      <rect
        x={6}
        y={6}
        width={348}
        height={248}
        rx={4}
        fill="#ffffff"
        stroke={refined ? OMRON_WF_BLUE : LINE}
        strokeWidth={1}
        strokeOpacity={refined ? 0.25 : 0.6}
      />
      {refined && (
        <>
          <rect x={6} y={6} width={348} height={14} rx={4} fill={FILL} />
          <line x1={6} y1={20} x2={354} y2={20} stroke={LINE} strokeWidth={0.75} strokeOpacity={0.6} />
          {title && (
            <text x={16} y={16} fill={MUTED} fontSize={6.5} fontFamily="ui-sans-serif, system-ui, sans-serif">
              {title}
            </text>
          )}
        </>
      )}
      {children}
    </>
  );
}

function Pill({
  x,
  y,
  text,
  active = false,
  alert = false,
}: {
  x: number;
  y: number;
  text: string;
  active?: boolean;
  alert?: boolean;
}) {
  const w = text.length * 5.5 + 14;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={14}
        rx={7}
        fill={alert ? "#fef2f2" : active ? "#eff6ff" : FILL}
        stroke={alert ? "#fca5a5" : active ? OMRON_WF_BLUE : LINE}
        strokeWidth={0.75}
      />
      <text
        x={x + w / 2}
        y={y + 10}
        fill={alert ? "#b91c1c" : active ? OMRON_WF_BLUE : MUTED}
        fontSize={6.5}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        textAnchor="middle"
      >
        {text}
      </text>
    </g>
  );
}

/** View of patients and clinical actions */
function ActionsPermissionsPanel({ className }: PanelProps) {
  return (
    <WfSvg className={className}>
      <PaperFrame refined title="Actions & permissions">
        <Label x={20} y={32} size={8} fill={INK}>
          View of patient actions
        </Label>
        <Pill x={248} y={24} text="Role: GP" active />

        <Label x={20} y={48} size={7} fill={MUTED}>
          Clinical actions matrix
        </Label>
        <Label x={20} y={58} size={6} fill={MUTED}>
          Assign · Review · Escalate · Complete
        </Label>
        <g>
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={20 + col * 16}
                y={64 + row * 16}
                width={12}
                height={12}
                rx={1.5}
                fill={row === 1 && col === 2 ? "#dbeafe" : FILL}
                stroke={row === 1 && col === 2 ? OMRON_WF_BLUE : LINE}
                strokeWidth={1}
              />
            )),
          )}
        </g>
        <Label x={20} y={132} size={6} fill={MUTED}>
          Selected: Review alert → Assign titration
        </Label>

        <Line x1={20} y1={140} x2={340} y2={140} />
        <Label x={20} y={152} size={7} fill={MUTED}>
          Who can see this action?
        </Label>
        {[
          { role: "GP", checked: true },
          { role: "Nurse", checked: true },
          { role: "Admin", checked: false },
          { role: "None", checked: false },
        ].map(({ role, checked }, i) => (
          <g key={role}>
            <Check x={20} y={158 + i * 16} checked={checked} />
            <Label x={36} y={167 + i * 16} size={8}>
              {role}
            </Label>
          </g>
        ))}
        <Label x={20} y={228} size={6} fill={MUTED}>
          Unchecked roles cannot view or act on this card
        </Label>
      </PaperFrame>
    </WfSvg>
  );
}

/** Task 1 — action card flow */
function TaskFlowPanel({ className }: PanelProps) {
  return (
    <WfSvg className={className}>
      <PaperFrame refined title="Action card flow">
        <Label x={20} y={32} size={8} fill={INK}>
          Task 1 — hypertension alert
        </Label>
        <Pill x={268} y={24} text="Step 2 of 3" active />

        {[
          { x: 24, step: "1", label: "Review\nalert", done: true },
          { x: 136, step: "2", label: "Check\npatient", done: false, current: true },
          { x: 248, step: "3", label: "Complete\naction", done: false },
        ].map(({ x, step, label, done, current }, i) => (
          <g key={x}>
            <Box
              x={x}
              y={44}
              w={88}
              h={52}
              stroke={current ? OMRON_WF_BLUE : done ? "#86efac" : LINE}
              fill={current ? "#eff6ff" : "white"}
            />
            <circle cx={x + 12} cy={56} r={8} fill={current ? OMRON_WF_BLUE : done ? "#dcfce7" : FILL} stroke={LINE} strokeWidth={0.75} />
            <Label x={x + 12} y={59} size={7} fill={current ? "white" : INK} anchor="middle">
              {step}
            </Label>
            <Label x={x + 44} y={66} size={7} anchor="middle">
              {label.split("\n")[0]}
            </Label>
            <Label x={x + 44} y={78} size={7} anchor="middle">
              {label.split("\n")[1]}
            </Label>
            {i < 2 && <Arrow x1={x + 90} y1={70} x2={x + 112} y2={70} />}
          </g>
        ))}

        <Label x={20} y={108} size={6} fill={MUTED}>
          Practitioner must confirm patient context before completing
        </Label>
        <Line x1={20} y1={114} x2={340} y2={114} />
        {[
          { x: 24, w: 96, label: "Back to list" },
          { x: 132, w: 96, label: "Complete task" },
          { x: 240, w: 96, label: "Pass to…" },
        ].map(({ x, w, label }) => (
          <g key={label}>
            <Box x={x} y={122} w={w} h={22} r={3} fill={label === "Complete task" ? OMRON_WF_BLUE : "white"} stroke={LINE} />
            <Label
              x={x + w / 2}
              y={137}
              size={7}
              fill={label === "Complete task" ? "white" : INK}
              anchor="middle"
            >
              {label}
            </Label>
          </g>
        ))}
        <Label x={20} y={156} size={6} fill={MUTED}>
          Pass to… opens reassignment with mandatory reason
        </Label>
      </PaperFrame>
    </WfSvg>
  );
}

/** Overview dashboard */
function DashboardPanel({ className }: PanelProps) {
  const rows = [
    { name: "D. Crawford", alerts: ["", "", "", "", "red", ""] },
    { name: "H. Grange", alerts: ["", "yellow", "", "", "", ""] },
    { name: "M. Lane", alerts: ["", "", "green", "", "", ""] },
    { name: "J. Patel", alerts: ["", "", "", "green", "", ""] },
    { name: "S. Wright", alerts: ["", "", "", "", "", "green"] },
  ];
  const alertFill = (type: string) =>
    type === "red" ? "#fecaca" : type === "yellow" ? "#fef08a" : type === "green" ? "#bbf7d0" : FILL;

  return (
    <WfSvg className={className}>
      <PaperFrame refined title="Monitoring dashboard">
        <Label x={20} y={32} size={8} fill={INK}>
          Overview / patient list
        </Label>
        <Box x={20} y={40} w={200} h={14} fill={FILL} stroke={LINE} sw={0.75} />
        <Label x={28} y={50} size={6.5} fill={MUTED}>
          Search patients…
        </Label>
        <Pill x={248} y={38} text="Assigned to me" active />

        <Box x={20} y={58} w={320} h={12} fill={FILL} stroke={LINE} sw={0.75} />
        <Label x={44} y={67} size={6} fill={MUTED}>
          Patient
        </Label>
        <Label x={200} y={67} size={6} fill={MUTED} anchor="middle">
          Alert categories
        </Label>

        {rows.map((row, i) => (
          <g key={row.name}>
            <rect x={20} y={74 + i * 26} width={320} height={22} rx={2} fill="white" stroke={LINE} strokeWidth={1} />
            <rect x={26} y={79 + i * 26} width={10} height={10} rx={2} fill={FILL} stroke={LINE} strokeWidth={0.75} />
            <Label x={40} y={88 + i * 26} size={7}>
              {row.name}
            </Label>
            {row.alerts.map((type, col) => (
              <rect
                key={col}
                x={112 + col * 18}
                y={79 + i * 26}
                width={12}
                height={12}
                rx={1.5}
                fill={alertFill(type)}
                stroke={LINE}
                strokeWidth={0.75}
              />
            ))}
          </g>
        ))}
        <Label x={20} y={210} size={6} fill={MUTED}>
          Red = out of limits · Yellow = review · Green = on track
        </Label>
      </PaperFrame>
    </WfSvg>
  );
}

/** Sub-task detail */
function SubtaskPanel({ className, refined = true }: PanelProps & { refined?: boolean }) {
  return (
    <WfSvg className={className}>
      <PaperFrame refined={refined} title="Sub-task detail">
        <Box x={20} y={28} w={56} h={16} r={2} fill="#eff6ff" stroke={OMRON_WF_BLUE} sw={1} />
        <Label x={48} y={39} size={7} fill={OMRON_WF_BLUE} anchor="middle">
          on click
        </Label>
        <Arrow x1={80} y1={36} x2={98} y2={36} />

        <Label x={20} y={54} size={8.5} fill={INK}>
          Sub-task detail
        </Label>
        <Box x={20} y={60} w={320} h={72} fill={FILL} stroke={LINE} sw={0.75} />
        <Label x={28} y={76} size={7} fill={MUTED}>
          Information about the sub task
        </Label>
        <Label x={28} y={88} size={7} fill={INK}>
          Confirm GP has reviewed latest reading
        </Label>
        {[0, 1, 2].map((i) => (
          <Box key={i} x={28} y={96 + i * 10} w={200 - i * 20} h={5} r={1.5} fill="white" stroke={LINE} sw={0.75} />
        ))}

        <Label x={20} y={144} size={7} fill={MUTED}>
          Visible to
        </Label>
        {["GP", "Nurse", "Admin", "None"].map((role, i) => (
          <g key={role}>
            <rect x={20 + i * 58} y={150} width={36} height={14} rx={7} fill={i < 3 ? "#eff6ff" : FILL} stroke={i < 3 ? OMRON_WF_BLUE : LINE} strokeWidth={0.75} />
            <Label x={38 + i * 58} y={161} size={6.5} fill={i < 3 ? OMRON_WF_BLUE : MUTED} anchor="middle">
              {role}
            </Label>
          </g>
        ))}

        <rect x={20} y={178} width={320} height={32} rx={3} fill="#eff6ff" stroke={OMRON_WF_BLUE} strokeWidth={1} strokeDasharray="4 3" />
        <Label x={180} y={198} size={7.5} fill={OMRON_WF_BLUE} anchor="middle">
          Ability to reassign action
        </Label>
        <Label x={20} y={222} size={6} fill={MUTED}>
          Opens handover flow with mandatory reason field
        </Label>
      </PaperFrame>
    </WfSvg>
  );
}

/** Patient detail / action card */
function PatientActionPanel({ className }: PanelProps) {
  return (
    <WfSvg className={className}>
      <PaperFrame refined title="Patient action card">
        <circle cx={28} cy={32} r={10} fill={FILL} stroke={LINE} strokeWidth={1.25} />
        <Label x={44} y={28} size={9}>
          JOHN DOE
        </Label>
        <Label x={44} y={40} size={7} fill={MUTED}>
          Hypertension · NHS 482 991 0023
        </Label>
        <Pill x={268} y={24} text="Out of limits" alert />

        <Box x={20} y={50} w={72} h={18} r={3} fill={OMRON_WF_BLUE} />
        <Label x={56} y={63} size={7} fill="white" anchor="middle">
          Action card
        </Label>
        <Box x={98} y={50} w={72} h={18} r={3} fill="white" stroke={LINE} />
        <Label x={134} y={63} size={7} anchor="middle">
          History
        </Label>
        <Box x={176} y={50} w={72} h={18} r={3} fill="white" stroke={LINE} />
        <Label x={212} y={63} size={7} anchor="middle">
          Notes
        </Label>

        <Box x={20} y={76} w={320} h={44} fill="#fef2f2" stroke="#fca5a5" sw={0.75} />
        <Label x={28} y={90} size={7} fill="#b91c1c">
          Blood pressure reading — out of range
        </Label>
        <Label x={28} y={104} size={9} fill="#b91c1c">
          162 / 95 mmHg
        </Label>
        <Label x={28} y={116} size={6} fill={MUTED}>
          Recorded today · above titration threshold
        </Label>

        <Box x={20} y={128} w={320} h={52} fill="white" stroke={LINE} />
        <Label x={28} y={142} size={7} fill={MUTED}>
          Recommended action
        </Label>
        <Label x={28} y={154} size={7} fill={INK}>
          Review medication plan and assign follow-up
        </Label>
        <Box x={28} y={162} w={180} h={5} r={1.5} fill={FILL} stroke={LINE} sw={0.75} />

        <Box x={20} y={190} w={96} h={22} r={3} fill={OMRON_WF_BLUE} />
        <Label x={68} y={205} size={7} fill="white" anchor="middle">
          Assign task
        </Label>
        <Box x={124} y={190} w={96} h={22} r={3} fill="white" stroke={LINE} />
        <Label x={172} y={205} size={7} anchor="middle">
          Mark reviewed
        </Label>
      </PaperFrame>
    </WfSvg>
  );
}

/** My feed dashboard */
function MyFeedPanel({ className }: PanelProps) {
  return (
    <WfSvg className={className}>
      <PaperFrame refined title="My feed">
        <Label x={20} y={32} size={8} fill={INK}>
          MY FEED
        </Label>
        <Label x={20} y={42} size={6} fill={MUTED}>
          Personal queue · tap a card to open list
        </Label>

        <Box x={20} y={50} w={148} h={56} stroke={LINE} fill="white" />
        <Label x={94} y={74} size={22} anchor="middle">
          4
        </Label>
        <Label x={94} y={90} size={7} fill={MUTED} anchor="middle">
          Assigned to me
        </Label>
        <circle cx={148} cy={62} r={4} fill="#ef4444" />

        <Box x={178} y={50} w={162} h={56} stroke={OMRON_WF_BLUE} fill="#eff6ff" />
        <Label x={259} y={74} size={22} fill={OMRON_WF_BLUE} anchor="middle">
          7
        </Label>
        <Label x={259} y={90} size={7} fill={OMRON_WF_BLUE} anchor="middle">
          Out of limits →
        </Label>
        <circle cx={322} cy={62} r={4} fill="#eab308" />

        <Box x={20} y={116} w={120} h={88} fill={FILL} stroke={LINE} />
        <circle cx={80} cy={156} r={24} fill="white" stroke={LINE} strokeWidth={1} />
        <path d="M80 156 L80 132 A24 24 0 0 1 98 146 Z" fill={OMRON_WF_BLUE} opacity={0.25} />
        <path d="M80 156 L98 146 A24 24 0 0 1 102 168 Z" fill={OMRON_WF_BLUE} opacity={0.45} />
        <Label x={80} y={212} size={6.5} fill={MUTED} anchor="middle">
          By category
        </Label>

        <Box x={152} y={116} w={188} h={88} fill={FILL} stroke={LINE} />
        <polyline
          points="168,188 192,172 216,178 240,156 264,162 288,140 312,146"
          fill="none"
          stroke={OMRON_WF_BLUE}
          strokeWidth={1.5}
        />
        <Label x={246} y={212} size={6.5} fill={MUTED} anchor="middle">
          Alerts over 7 days
        </Label>
        <Arrow x1={300} y1={78} x2={320} y2={78} />
      </PaperFrame>
    </WfSvg>
  );
}

/** Assigned to filters */
function AssignedToPanel({ className }: PanelProps) {
  return (
    <WfSvg className={className}>
      <PaperFrame refined title="Assigned to filter">
        <Label x={20} y={32} size={8.5} fill={INK}>
          ASSIGNED TO
        </Label>
        <Label x={20} y={42} size={6} fill={MUTED}>
          Filter patient list by ownership
        </Label>

        {[
          { x: 24, label: "CLEAR", active: false },
          { x: 128, label: "TODAY", active: false },
          { x: 232, label: "ME ▾", active: true, count: "12" },
        ].map(({ x, label, active, count }) => (
          <g key={label}>
            <Box
              x={x}
              y={52}
              w={96}
              h={64}
              r={4}
              fill={active ? "#eff6ff" : "white"}
              stroke={active ? OMRON_WF_BLUE : LINE}
              sw={active ? 1.5 : 1.25}
            />
            <Label x={x + 48} y={86} size={10} fill={active ? OMRON_WF_BLUE : INK} anchor="middle">
              {label}
            </Label>
            {count && (
              <Label x={x + 48} y={100} size={7} fill={OMRON_WF_BLUE} anchor="middle">
                {`${count} patients`}
              </Label>
            )}
          </g>
        ))}

        <line x1={20} y1={126} x2={340} y2={126} stroke={LINE} strokeWidth={1.25} strokeDasharray="3 3" />
        <Label x={20} y={142} size={7} fill={MUTED}>
          Showing patients assigned to me today
        </Label>
        {[
          { name: "John Doe", status: "Review BP" },
          { name: "Jane Smith", status: "Follow-up" },
          { name: "Alex Brown", status: "New alert" },
        ].map(({ name, status }, i) => (
          <g key={name}>
            <rect x={20} y={150 + i * 24} width={320} height={20} rx={2} fill="white" stroke={LINE} strokeWidth={1} />
            <Label x={28} y={164 + i * 24} size={7.5}>
              {name}
            </Label>
            <Pill x={248} y={154 + i * 24} text={status} active={i === 0} />
          </g>
        ))}
      </PaperFrame>
    </WfSvg>
  );
}

/** Out of limits alert list */
function OutOfLimitsPanel({ className }: PanelProps) {
  return (
    <WfSvg className={className}>
      <PaperFrame refined title="Out of limits list">
        <Label x={20} y={32} size={9} fill={INK}>
          OUT OF LIMITS: 4
        </Label>
        <Pill x={248} y={24} text="Priority" alert />
        <Label x={20} y={44} size={6} fill={MUTED}>
          Opened from My feed · review and mark done
        </Label>

        <Box x={20} y={52} w={320} h={14} fill={FILL} stroke={LINE} sw={0.75} />
        <Label x={28} y={62} size={7} fill={MUTED}>
          Patient
        </Label>
        <Label x={180} y={62} size={7} fill={MUTED} anchor="middle">
          Reading
        </Label>
        <Label x={310} y={62} size={7} fill={MUTED} anchor="end">
          Done
        </Label>

        {[
          { name: "Patient A", reading: "140/80", done: true },
          { name: "Patient B", reading: "150/90", done: true },
          { name: "Patient C", reading: "138/88", done: false },
          { name: "Patient D", reading: "162/95", done: false, urgent: true },
        ].map(({ name, reading, done, urgent }, i) => (
          <g key={name}>
            <rect
              x={20}
              y={72 + i * 32}
              width={320}
              height={28}
              rx={2}
              fill={urgent ? "#fef2f2" : "white"}
              stroke={urgent ? "#fca5a5" : LINE}
              strokeWidth={1}
            />
            <Label x={28} y={90 + i * 32} size={8}>
              {name}
            </Label>
            <Label x={180} y={90 + i * 32} size={8} anchor="middle" fill={urgent ? "#b91c1c" : INK}>
              {reading}
            </Label>
            <Check x={318} y={81 + i * 32} checked={done} />
          </g>
        ))}
      </PaperFrame>
    </WfSvg>
  );
}

export type OmronWireframePanelId =
  | "actions"
  | "task-flow"
  | "dashboard"
  | "subtask"
  | "patient"
  | "feed"
  | "assigned"
  | "limits";

export const OMRON_WIREFRAME_PANELS: {
  id: OmronWireframePanelId;
  label: string;
  trace: { x: number; y: number; w: number; h: number };
  /** Photo crop for zooming into the hand-drawn panel on the workshop sheet */
  crop: { objectPosition: string; scale: number };
}[] = [
  { id: "actions", label: "Actions & permissions", trace: { x: 28, y: 28, w: 358, h: 228 }, crop: { objectPosition: "26% 14%", scale: 2.35 } },
  { id: "task-flow", label: "Action card flow", trace: { x: 414, y: 28, w: 358, h: 228 }, crop: { objectPosition: "74% 14%", scale: 2.35 } },
  { id: "dashboard", label: "Overview dashboard", trace: { x: 28, y: 268, w: 358, h: 228 }, crop: { objectPosition: "26% 36%", scale: 2.35 } },
  { id: "subtask", label: "Sub-task detail", trace: { x: 414, y: 268, w: 358, h: 228 }, crop: { objectPosition: "74% 36%", scale: 2.35 } },
  { id: "patient", label: "Patient action card", trace: { x: 28, y: 538, w: 358, h: 228 }, crop: { objectPosition: "26% 62%", scale: 2.35 } },
  { id: "feed", label: "My feed", trace: { x: 414, y: 538, w: 358, h: 228 }, crop: { objectPosition: "74% 62%", scale: 2.35 } },
  { id: "assigned", label: "Assigned to", trace: { x: 28, y: 778, w: 358, h: 228 }, crop: { objectPosition: "26% 84%", scale: 2.35 } },
  { id: "limits", label: "Out of limits", trace: { x: 414, y: 778, w: 358, h: 228 }, crop: { objectPosition: "74% 84%", scale: 2.35 } },
];

/** Left column panels on the workshop sketch (x < centre) */
export const OMRON_LEFT_PANELS = OMRON_WIREFRAME_PANELS.filter((p) => p.trace.x < IMAGE_W / 2);

/** Right column panels on the workshop sketch */
export const OMRON_RIGHT_PANELS = OMRON_WIREFRAME_PANELS.filter((p) => p.trace.x >= IMAGE_W / 2);

const PANEL_COMPONENTS: Record<OmronWireframePanelId, (props: PanelProps) => React.ReactElement> = {
  actions: ActionsPermissionsPanel,
  "task-flow": TaskFlowPanel,
  dashboard: DashboardPanel,
  subtask: SubtaskPanel,
  patient: PatientActionPanel,
  feed: MyFeedPanel,
  assigned: AssignedToPanel,
  limits: OutOfLimitsPanel,
};

export function panelRevealFromScan(
  scanProgress: number,
  trace: { y: number; h: number },
  imageH = 1024,
): number {
  const top = trace.y / imageH;
  const bottom = (trace.y + trace.h) / imageH;
  if (scanProgress <= top) return 0;
  if (scanProgress >= bottom) return 1;
  const t = (scanProgress - top) / (bottom - top);
  return t * t * (3 - 2 * t);
}

export function OmronWireframeOverview({
  imageSrc,
  scanProgress,
  showScanLine = false,
  highlightId = null,
  dimOthers = false,
  revealScale = 1,
  className,
}: {
  imageSrc: string;
  /** 0–1 vertical scan position (maps to image height) */
  scanProgress: number;
  showScanLine?: boolean;
  highlightId?: OmronWireframePanelId | null;
  dimOthers?: boolean;
  /** Multiplier applied to each panel's reveal opacity (e.g. fade-out on return) */
  revealScale?: number;
  className?: string;
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-contain object-center transition-[filter] duration-500"
        style={{ filter: scanProgress > 0.05 && revealScale > 0.05 ? "saturate(0.55) contrast(1.05) brightness(1.02)" : undefined }}
      />

      {OMRON_WIREFRAME_PANELS.map((panel) => {
        const reveal = panelRevealFromScan(scanProgress, panel.trace, IMAGE_H);
        const isHighlight = highlightId === panel.id;
        const isDimmed = dimOthers && highlightId && !isHighlight;
        const { x, y, w, h } = panel.trace;
        const panelOpacity = (isDimmed ? reveal * 0.28 : reveal) * revealScale;

        return (
          <div
            key={panel.id}
            className={cn(
              "absolute overflow-hidden rounded-[3px] bg-white shadow-sm ring-1 transition-[opacity,transform,box-shadow] duration-500",
              isHighlight ? "z-20 ring-[var(--case-study-accent,#003da5)]/50 shadow-md" : "ring-[var(--case-study-accent,#003da5)]/15",
            )}
            style={{
              left: `${(x / IMAGE_W) * 100}%`,
              top: `${(y / IMAGE_H) * 100}%`,
              width: `${(w / IMAGE_W) * 100}%`,
              height: `${(h / IMAGE_H) * 100}%`,
              opacity: panelOpacity,
              transform: isHighlight ? "scale(1.02)" : undefined,
            }}
          >
            <OmronWireframePanel id={panel.id} solid />
          </div>
        );
      })}

      {showScanLine && (
        <div
          className="pointer-events-none absolute left-0 right-0 z-30 h-[2px] bg-[var(--case-study-accent,#003da5)]/80 shadow-[0_0_16px_rgba(0,61,165,0.35)]"
          style={{ top: `${scanProgress * 100}%`, transform: "translateY(-50%)" }}
          aria-hidden
        />
      )}
      {showScanLine && (
        <div
          className="pointer-events-none absolute left-0 right-0 z-20 h-[10%]"
          style={{
            top: `${scanProgress * 100}%`,
            transform: "translateY(-50%)",
            background: "linear-gradient(to bottom, transparent, rgba(0,61,165,0.06), transparent)",
          }}
          aria-hidden
        />
      )}
    </div>
  );
}

export function OmronWireframePanel({
  id,
  className,
  draw = 1,
  solid = false,
}: {
  id: OmronWireframePanelId;
  className?: string;
  draw?: number;
  solid?: boolean;
}) {
  const Component = PANEL_COMPONENTS[id];
  if (solid) {
    return (
      <div className={cn("h-full w-full bg-white", className)}>
        <Component />
      </div>
    );
  }
  return (
    <div
      className={cn("h-full w-full", className)}
      style={{ opacity: 0.35 + draw * 0.65, transform: `scale(${0.94 + draw * 0.06})` }}
    >
      <Component />
    </div>
  );
}

/** Cropped view of the workshop photo for one hand-drawn panel */
export function OmronSketchPanelCrop({
  id,
  imageSrc,
  className,
}: {
  id: OmronWireframePanelId;
  imageSrc: string;
  className?: string;
}) {
  const panel = OMRON_WIREFRAME_PANELS.find((p) => p.id === id)!;
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-white", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt=""
        className="absolute left-1/2 top-1/2 max-w-none origin-center"
        style={{
          width: `${panel.crop.scale * 100}%`,
          height: `${panel.crop.scale * 100}%`,
          objectFit: "cover",
          objectPosition: panel.crop.objectPosition,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

/** Mini grid matching the two-sheet sketch layout */
export function OmronWireframeGrid({
  className,
  highlightId,
  opacity = 1,
}: {
  className?: string;
  highlightId?: OmronWireframePanelId | null;
  opacity?: number;
}) {
  return (
    <div
      className={cn("grid grid-rows-2 gap-2 p-3 transition-opacity duration-700", className)}
      style={{ opacity }}
    >
      {[0, 1].map((sheet) => (
        <div
          key={sheet}
          className="grid grid-cols-2 gap-2 rounded-md border border-dashed border-[#003da5]/20 bg-white/80 p-2"
        >
          {OMRON_WIREFRAME_PANELS.slice(sheet * 4, sheet * 4 + 4).map((panel) => (
            <div
              key={panel.id}
              className={cn(
                "aspect-[360/260] overflow-hidden rounded border transition-[border-color,box-shadow,opacity] duration-500",
                highlightId === panel.id
                  ? "border-[#003da5] shadow-md shadow-[#003da5]/10"
                  : "border-[var(--color-border)] opacity-90",
              )}
            >
              <OmronWireframePanel id={panel.id} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
