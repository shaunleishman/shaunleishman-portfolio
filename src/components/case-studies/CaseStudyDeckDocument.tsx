import type { ReactNode } from "react";
import {
  Document,
  Font,
  Line,
  Link,
  Page,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";

// Wrap whole words to the next line instead of hyphenating across the break.
Font.registerHyphenationCallback((word) => [word]);
import { siteConfig } from "@/content/projects";
import type {
  HeuristicEvaluation,
  Severity,
} from "@/content/heuristic-evaluations/types";
import {
  EFFORT_LABELS,
  getQuickWins,
} from "@/components/metrics/heuristic-evaluation/finding-priority";

/* A4 landscape in points */
const PAGE_W = 841.89;
const PAGE_H = 595.28;
const MARGIN = 48;

const colors = {
  bgDark: "#0a0a0a",
  bgLight: "#ffffff",
  bgMuted: "#f5f6f6",
  primary: "#171717",
  secondary: "#525252",
  muted: "#737373",
  accent: "#3b66f5",
  border: "#e5e5e5",
  inverse: "#ffffff",
} as const;

const SEVERITY_STYLE: Record<Severity, { bg: string; fg: string; label: string }> = {
  critical: { bg: "#fee2e2", fg: "#b91c1c", label: "Critical" },
  high: { bg: "#fef3c7", fg: "#b45309", label: "High" },
  medium: { bg: "#fef9c3", fg: "#a16207", label: "Medium" },
  low: { bg: "#f5f5f5", fg: "#525252", label: "Low" },
};

const SEVERITY_RANK: Record<Severity, number> = { critical: 3, high: 2, medium: 1, low: 0 };

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    color: colors.primary,
    backgroundColor: colors.bgLight,
    paddingTop: MARGIN,
    paddingHorizontal: MARGIN,
    paddingBottom: 54,
  },
  pageDark: { backgroundColor: colors.bgDark },
  kicker: {
    fontSize: 9.5,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.accent,
    fontFamily: "Helvetica-Bold",
    marginBottom: 13,
  },
  kickerDark: { color: "#7f9bff" },
  accentRule: {
    width: 46,
    height: 3,
    backgroundColor: colors.accent,
    borderRadius: 2,
    marginBottom: 18,
  },
  slideTitle: {
    fontSize: 29,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    letterSpacing: -0.6,
    lineHeight: 1.1,
    marginBottom: 10,
  },
  lead: { fontSize: 13.5, color: colors.secondary, lineHeight: 1.5, maxWidth: 640 },

  heroTitle: {
    fontSize: 42,
    fontFamily: "Helvetica-Bold",
    color: colors.inverse,
    letterSpacing: -1,
    lineHeight: 1.05,
    marginBottom: 14,
    maxWidth: 660,
  },
  heroSub: { fontSize: 15, color: "#d4d4d4", lineHeight: 1.5, maxWidth: 560 },
  heroMetaRow: { flexDirection: "row", gap: 30, marginTop: 30 },
  heroMetaLabel: {
    fontSize: 8.5,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "#9a9a9a",
    marginBottom: 4,
  },
  heroMetaValue: { fontSize: 12, color: colors.inverse, fontFamily: "Helvetica-Bold" },

  footer: {
    position: "absolute",
    left: MARGIN,
    right: MARGIN,
    bottom: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: { fontSize: 8.5, color: colors.muted },
  footerTextDark: { fontSize: 8.5, color: "#9a9a9a" },
  footerBrand: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: colors.primary },
  footerBrandDark: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: colors.inverse },

  severityRow: { flexDirection: "row", gap: 14, marginTop: 8 },
  severityCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 22,
    paddingHorizontal: 18,
    backgroundColor: colors.bgMuted,
  },
  severityCount: { fontSize: 38, fontFamily: "Helvetica-Bold", lineHeight: 1 },
  severityLabel: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.muted,
    marginTop: 8,
  },

  twoCol: { flexDirection: "row", gap: 26, marginTop: 6 },
  col: { flex: 1 },

  numberedRow: { flexDirection: "row", gap: 14, marginBottom: 15, alignItems: "flex-start" },
  numberBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.accent,
    color: colors.inverse,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    paddingTop: 7,
  },
  numberedText: { flex: 1, fontSize: 13, color: colors.primary, lineHeight: 1.4, paddingTop: 5 },

  bulletRow: { flexDirection: "row", gap: 9, marginBottom: 9 },
  bulletDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.accent, marginTop: 6 },
  bulletDotDark: { backgroundColor: "#7f9bff" },
  bulletText: { flex: 1, fontSize: 12, color: colors.secondary, lineHeight: 1.45 },
  bulletTextDark: { color: "#d4d4d4" },

  problemCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 18,
    backgroundColor: colors.bgLight,
  },
  problemChip: {
    alignSelf: "flex-start",
    borderRadius: 9,
    paddingVertical: 2.5,
    paddingHorizontal: 9,
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
  },
  problemTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    lineHeight: 1.25,
    marginBottom: 4,
  },
  problemLabel: {
    fontSize: 8,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.muted,
    marginTop: 9,
    marginBottom: 2,
  },
  problemText: { fontSize: 10.5, color: colors.secondary, lineHeight: 1.4 },

  quickRow: { flexDirection: "row", gap: 14, marginTop: 6 },
  quickCard: {
    flex: 1,
    borderRadius: 14,
    padding: 16,
    backgroundColor: colors.bgMuted,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  quickTitle: { fontSize: 12, fontFamily: "Helvetica-Bold", color: colors.primary, lineHeight: 1.3 },
  quickMeta: { fontSize: 9.5, color: colors.muted, marginTop: 6 },

  planCol: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    backgroundColor: colors.bgMuted,
  },
  planHeading: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    marginBottom: 12,
  },

  ctaButton: {
    marginTop: 26,
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    color: colors.inverse,
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 9999,
    textDecoration: "none",
  },
});

function GridBackground() {
  const step = 42;
  const verticals: number[] = [];
  for (let x = 0; x <= PAGE_W; x += step) verticals.push(x);
  const horizontals: number[] = [];
  for (let y = 0; y <= PAGE_H; y += step) horizontals.push(y);

  return (
    <Svg
      fixed
      width={PAGE_W}
      height={PAGE_H}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <Rect x={0} y={0} width={PAGE_W} height={PAGE_H} fill={colors.bgDark} />
      {verticals.map((x) => (
        <Line key={`v${x}`} x1={x} y1={0} x2={x} y2={PAGE_H} stroke="#ffffff" strokeWidth={0.5} opacity={0.05} />
      ))}
      {horizontals.map((y) => (
        <Line key={`h${y}`} x1={0} y1={y} x2={PAGE_W} y2={y} stroke="#ffffff" strokeWidth={0.5} opacity={0.05} />
      ))}
    </Svg>
  );
}

function Footer({ tone = "light", label }: { tone?: "light" | "dark"; label: string }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={tone === "dark" ? styles.footerBrandDark : styles.footerBrand}>
        {siteConfig.brand}
      </Text>
      <Text style={tone === "dark" ? styles.footerTextDark : styles.footerText}>{label}</Text>
    </View>
  );
}

function LightSlide({
  kicker,
  title,
  lead,
  footerLabel,
  children,
}: {
  kicker: string;
  title: string;
  lead?: string;
  footerLabel: string;
  children: ReactNode;
}) {
  return (
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text style={styles.kicker}>{kicker}</Text>
      <View style={styles.accentRule} />
      <Text style={styles.slideTitle}>{title}</Text>
      {lead ? <Text style={[styles.lead, { marginBottom: 22 }]}>{lead}</Text> : null}
      {children}
      <Footer label={footerLabel} />
    </Page>
  );
}

function Bullets({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <>
      {items.map((item, i) => (
        <View key={`${i}-${item.slice(0, 20)}`} style={styles.bulletRow} wrap={false}>
          <View style={dark ? [styles.bulletDot, styles.bulletDotDark] : styles.bulletDot} />
          <Text style={dark ? [styles.bulletText, styles.bulletTextDark] : styles.bulletText}>
            {item}
          </Text>
        </View>
      ))}
    </>
  );
}

const ACTION_LABELS = { fix_now: "Fix now", fix_next: "Fix next" } as const;

export function CaseStudyDeckDocument({ evaluation }: { evaluation: HeuristicEvaluation }) {
  const { executiveSummary: exec, scope, severitySummary } = evaluation;
  const totalFindings = evaluation.findings.length;
  const footerLabel = `${evaluation.client} · Heuristic evaluation`;

  const quickWins = getQuickWins(evaluation.findings).slice(0, 3);

  const severeProblems =
    evaluation.criticalProblems && evaluation.criticalProblems.length > 0
      ? evaluation.criticalProblems.slice(0, 2).map((p) => ({
          title: p.title,
          severity: p.severity,
          recommendation: p.recommendation,
          impact: p.userImpact,
        }))
      : [...evaluation.findings]
          .sort((a, b) => {
            const bySeverity = SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity];
            if (bySeverity !== 0) return bySeverity;
            return (
              b.priority.frequency * b.priority.impact - a.priority.frequency * a.priority.impact
            );
          })
          .slice(0, 2)
          .map((f) => ({
            title: f.title,
            severity: f.severity,
            recommendation: f.recommendation,
            impact: f.user_impact,
          }));

  const fixNow = evaluation.actionPlan.filter((a) => a.priority === "fix_now");
  const fixNext = evaluation.actionPlan.filter((a) => a.priority === "fix_next");

  return (
    <Document title={`${evaluation.title} — Summary deck`} author={siteConfig.name}>
      {/* 1 — Title */}
      <Page size="A4" orientation="landscape" style={[styles.page, styles.pageDark]}>
        <GridBackground />
        <Text style={[styles.kicker, styles.kickerDark]}>Heuristic evaluation</Text>
        <View style={styles.accentRule} />
        <Text style={styles.heroTitle}>{evaluation.title}</Text>
        <Text style={styles.heroSub}>{evaluation.client}</Text>
        <View style={styles.heroMetaRow}>
          <View>
            <Text style={styles.heroMetaLabel}>Evaluator</Text>
            <Text style={styles.heroMetaValue}>{siteConfig.name}</Text>
          </View>
          <View>
            <Text style={styles.heroMetaLabel}>Date</Text>
            <Text style={styles.heroMetaValue}>{scope.evaluationDate}</Text>
          </View>
          <View>
            <Text style={styles.heroMetaLabel}>Findings</Text>
            <Text style={styles.heroMetaValue}>{totalFindings} documented</Text>
          </View>
          {scope.timeSpent ? (
            <View>
              <Text style={styles.heroMetaLabel}>Effort</Text>
              <Text style={styles.heroMetaValue}>
                {scope.timeSpent.replace(/^Around\s*/i, "~")}
              </Text>
            </View>
          ) : null}
        </View>
        <Footer tone="dark" label={siteConfig.domain} />
      </Page>

      {/* 2 — At a glance */}
      <LightSlide
        kicker="At a glance"
        title="Where the experience stands"
        lead={exec.usabilityHealth}
        footerLabel={footerLabel}
      >
        <View style={styles.severityRow}>
          {(["critical", "high", "medium", "low"] as Severity[]).map((sev) => (
            <View key={sev} style={styles.severityCard}>
              <Text style={[styles.severityCount, { color: SEVERITY_STYLE[sev].fg }]}>
                {severitySummary[sev]}
              </Text>
              <Text style={styles.severityLabel}>{SEVERITY_STYLE[sev].label}</Text>
            </View>
          ))}
        </View>
      </LightSlide>

      {/* 3 — Scope */}
      <LightSlide kicker="Method and scope" title="What was reviewed" footerLabel={footerLabel}>
        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.problemLabel}>Product</Text>
            <Text style={[styles.bulletText, { marginBottom: 12 }]}>{scope.evaluatedUrl}</Text>
            <Text style={styles.problemLabel}>User groups</Text>
            <Text style={[styles.bulletText, { marginBottom: 12 }]}>
              {scope.userGroups.join(", ")}
            </Text>
            <Text style={styles.problemLabel}>Approach</Text>
            <Text style={styles.bulletText}>
              {scope.heuristicsUsed.length} usability heuristics across desktop and mobile
              {scope.timeSpent ? `, ${scope.timeSpent.toLowerCase()}` : ""}.
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.problemLabel}>Tasks evaluated</Text>
            <View style={{ marginTop: 6 }}>
              <Bullets items={scope.tasksEvaluated.slice(0, 5)} />
            </View>
          </View>
        </View>
      </LightSlide>

      {/* 4 — Top issues */}
      <LightSlide kicker="Key findings" title="The issues that matter most" footerLabel={footerLabel}>
        <View style={{ marginTop: 4 }}>
          {exec.topIssues.slice(0, 5).map((issue, i) => (
            <View key={i} style={styles.numberedRow} wrap={false}>
              <Text style={styles.numberBadge}>{i + 1}</Text>
              <Text style={styles.numberedText}>{issue}</Text>
            </View>
          ))}
        </View>
      </LightSlide>

      {/* 5 — Most severe problems */}
      <LightSlide kicker="Most severe problems" title="Where users get stuck" footerLabel={footerLabel}>
        <View style={[styles.twoCol, { marginTop: 8 }]}>
          {severeProblems.map((p, i) => (
            <View key={i} style={styles.problemCard}>
              <Text
                style={[
                  styles.problemChip,
                  {
                    backgroundColor: SEVERITY_STYLE[p.severity].bg,
                    color: SEVERITY_STYLE[p.severity].fg,
                  },
                ]}
              >
                {SEVERITY_STYLE[p.severity].label}
              </Text>
              <Text style={styles.problemTitle}>{p.title}</Text>
              <Text style={styles.problemLabel}>Impact</Text>
              <Text style={styles.problemText}>{p.impact}</Text>
              <Text style={styles.problemLabel}>Recommendation</Text>
              <Text style={styles.problemText}>{p.recommendation}</Text>
            </View>
          ))}
        </View>
      </LightSlide>

      {/* 6 — Quick wins */}
      {quickWins.length > 0 ? (
        <LightSlide
          kicker="Quick wins"
          title="High payoff, low effort"
          lead="Frequent, high-impact issues that are quick to build and test — the fastest way to move the needle."
          footerLabel={footerLabel}
        >
          <View style={styles.quickRow}>
            {quickWins.map((f) => (
              <View key={f.finding_id} style={styles.quickCard}>
                <Text style={styles.quickTitle}>{f.title}</Text>
                <Text style={styles.quickMeta}>
                  {SEVERITY_STYLE[f.severity].label} severity · {EFFORT_LABELS[f.priority.effort]}
                </Text>
              </View>
            ))}
          </View>
        </LightSlide>
      ) : null}

      {/* 7 — Action plan */}
      <LightSlide kicker="Action plan" title="What to do, and in what order" footerLabel={footerLabel}>
        <View style={[styles.twoCol, { marginTop: 8 }]}>
          <View style={styles.planCol}>
            <Text style={styles.planHeading}>{ACTION_LABELS.fix_now}</Text>
            <Bullets items={fixNow.map((a) => a.action)} />
          </View>
          <View style={styles.planCol}>
            <Text style={styles.planHeading}>{ACTION_LABELS.fix_next}</Text>
            <Bullets items={fixNext.map((a) => a.action)} />
          </View>
        </View>
      </LightSlide>

      {/* 8 — Next steps / closing */}
      <Page size="A4" orientation="landscape" style={[styles.page, styles.pageDark]}>
        <GridBackground />
        <Text style={[styles.kicker, styles.kickerDark]}>Recommended next steps</Text>
        <View style={styles.accentRule} />
        <Text style={[styles.heroTitle, { fontSize: 30, marginBottom: 18 }]}>
          From findings to fixes
        </Text>
        <View style={{ maxWidth: 660 }}>
          <Bullets items={exec.recommendedNextSteps.slice(0, 4)} dark />
        </View>
        <Link src={siteConfig.siteUrl} style={styles.ctaButton}>
          <Text>View the full interactive report</Text>
        </Link>
        <Footer tone="dark" label={`${siteConfig.name} · ${siteConfig.domain}`} />
      </Page>
    </Document>
  );
}
