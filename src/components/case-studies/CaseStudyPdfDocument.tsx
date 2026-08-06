import type { ReactNode } from "react";
import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// Wrap whole words to the next line instead of hyphenating across the break.
Font.registerHyphenationCallback((word) => [word]);
import { siteConfig } from "@/content/projects";
import type {
  HeuristicEvaluation,
  HeuristicFinding,
  HeuristicId,
  Severity,
} from "@/content/heuristic-evaluations/types";
import {
  computePriorityPoints,
  EFFORT_LABELS,
  getPriorityTier,
  getQuickWins,
  sortFindingsByPriority,
} from "@/components/metrics/heuristic-evaluation/finding-priority";

const type = {
  label: 8.5,
  title: 19,
  subtitle: 11,
  meta: 9,
  section: 8.5,
  heading: 12,
  body: 9.5,
  small: 8.5,
  chip: 8,
} as const;

const colors = {
  accent: "#3b66f5",
  text: "#404040",
  muted: "#737373",
  dark: "#171717",
  border: "#e5e5e5",
  faint: "#f5f5f5",
} as const;

const SEVERITY_STYLE: Record<Severity, { bg: string; fg: string; label: string }> = {
  critical: { bg: "#fee2e2", fg: "#b91c1c", label: "Critical" },
  high: { bg: "#fef3c7", fg: "#b45309", label: "High" },
  medium: { bg: "#fef9c3", fg: "#a16207", label: "Medium" },
  low: { bg: "#f5f5f5", fg: "#525252", label: "Low" },
};

const SEVERITY_RANK: Record<Severity, number> = { critical: 3, high: 2, medium: 1, low: 0 };

const HEURISTIC_ONE_WORD: Record<HeuristicId, string> = {
  H01: "Visibility",
  H02: "Familiarity",
  H03: "Control",
  H04: "Consistency",
  H05: "Prevention",
  H06: "Recognition",
  H07: "Efficiency",
  H08: "Minimalism",
  H09: "Recovery",
  H10: "Help",
};

const TIER_LABEL: Record<ReturnType<typeof getPriorityTier>, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 48,
    paddingHorizontal: 42,
    fontFamily: "Helvetica",
    fontSize: type.body,
    color: colors.text,
    lineHeight: 1.5,
  },
  label: {
    fontSize: type.label,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.accent,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  title: {
    fontSize: type.title,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: type.subtitle,
    color: colors.text,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 18,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  metaItem: { fontSize: type.meta, color: colors.muted, marginRight: 10, marginBottom: 2 },
  metaDot: { fontSize: type.meta, color: colors.border, marginRight: 10, marginBottom: 2 },
  metaItemStrong: { fontSize: type.meta, color: colors.text, fontFamily: "Helvetica-Bold" },
  section: { marginBottom: 18 },
  sectionTitle: {
    fontSize: type.section,
    letterSpacing: 0.9,
    textTransform: "uppercase",
    color: colors.accent,
    fontFamily: "Helvetica-Bold",
    marginBottom: 9,
  },
  heading: {
    fontSize: type.heading,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 6,
  },
  paragraph: { fontSize: type.body, color: colors.text, lineHeight: 1.5, marginBottom: 8 },
  bulletRow: { flexDirection: "row", marginBottom: 6, paddingRight: 4 },
  bulletDotWrap: {
    width: 12,
    flexShrink: 0,
    paddingTop: 5,
  },
  bulletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  bulletText: { flex: 1, fontSize: type.body, lineHeight: 1.45, color: colors.text },
  severityGrid: { flexDirection: "row", marginBottom: 16 },
  severityCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    marginRight: 8,
  },
  severityCardLast: { marginRight: 0 },
  severityCount: { fontSize: 16, fontFamily: "Helvetica-Bold", color: colors.dark },
  severityLabel: {
    fontSize: type.small,
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginTop: 2,
  },
  // Chips must be Views. Text with backgroundColor overlaps when the row wraps.
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 8,
  },
  chip: {
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 4,
    maxWidth: "100%",
  },
  chipText: { fontSize: type.chip, lineHeight: 1.2 },
  locationText: {
    fontSize: type.small,
    color: colors.muted,
    marginTop: 2,
    marginBottom: 8,
    lineHeight: 1.35,
  },
  finding: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  findingHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  rank: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.faint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginTop: 1,
    flexShrink: 0,
  },
  rankText: {
    fontSize: type.small,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    lineHeight: 1,
  },
  findingTitle: {
    flex: 1,
    fontSize: type.body + 1,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    lineHeight: 1.35,
  },
  findingBody: { fontSize: type.body, color: colors.text, lineHeight: 1.45, marginBottom: 8 },
  evidenceRow: { flexDirection: "row", marginBottom: 5, alignItems: "flex-start" },
  evidenceLabel: {
    width: 92,
    fontSize: type.small,
    fontFamily: "Helvetica-Bold",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginRight: 8,
    flexShrink: 0,
  },
  evidenceValue: { flex: 1, fontSize: type.small, color: colors.text, lineHeight: 1.4 },
  priorityLine: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.faint,
    fontSize: type.small,
    color: colors.muted,
    lineHeight: 1.4,
  },
  quickWin: {
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
    paddingLeft: 10,
    marginBottom: 8,
  },
  quickWinTitle: { fontSize: type.body, fontFamily: "Helvetica-Bold", color: colors.dark },
  quickWinMeta: { fontSize: type.small, color: colors.muted, marginTop: 2 },
  actionGroup: { marginBottom: 12 },
  actionGroupTitle: {
    fontSize: type.body,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 6,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 42,
    right: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerBrand: { fontSize: type.small, fontFamily: "Helvetica-Bold", color: colors.dark },
  footerUrl: { fontSize: type.small, color: colors.muted },
});

function Bullets({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, i) => (
        <View key={`${i}-${item.slice(0, 24)}`} style={styles.bulletRow} wrap={false}>
          <View style={styles.bulletDotWrap}>
            <View style={styles.bulletDot} />
          </View>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function SeverityChip({ severity }: { severity: Severity }) {
  const s = SEVERITY_STYLE[severity];
  return (
    <View style={[styles.chip, { backgroundColor: s.bg }]} wrap={false}>
      <Text style={[styles.chipText, { color: s.fg }]}>{s.label}</Text>
    </View>
  );
}

function MetaChip({ children }: { children: string }) {
  return (
    <View
      style={[
        styles.chip,
        { backgroundColor: colors.faint, borderWidth: 1, borderColor: colors.border },
      ]}
      wrap={false}
    >
      <Text style={[styles.chipText, { color: colors.text }]}>{children}</Text>
    </View>
  );
}

function Evidence({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.evidenceRow}>
      <Text style={styles.evidenceLabel}>{label}</Text>
      <Text style={styles.evidenceValue}>{value}</Text>
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerBrand}>{siteConfig.brand}</Text>
      <Link src={siteConfig.siteUrl} style={styles.footerUrl}>
        <Text>{siteConfig.domain}</Text>
      </Link>
    </View>
  );
}

function FindingBlock({ finding, rank }: { finding: HeuristicFinding; rank: number }) {
  const points = computePriorityPoints(finding.priority);
  const tier = getPriorityTier(points);
  const { frequency, impact, effort } = finding.priority;

  return (
    <View style={styles.finding} minPresenceAhead={80}>
      <View style={styles.findingHead} wrap={false}>
        <View style={styles.rank}>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
        <Text style={styles.findingTitle}>{finding.title}</Text>
      </View>
      <View style={styles.chipRow} wrap={false}>
        <SeverityChip severity={finding.severity} />
        <MetaChip>{HEURISTIC_ONE_WORD[finding.primary_heuristic]}</MetaChip>
      </View>
      <Text style={styles.locationText}>{finding.screen_or_flow}</Text>
      <Text style={styles.findingBody}>{finding.description}</Text>
      <Evidence label="Observed" value={finding.evidence.observed_behaviour} />
      <Evidence label="Expected" value={finding.evidence.expected_behaviour} />
      <Evidence label="Impact" value={finding.user_impact} />
      <Evidence label="Fix" value={finding.recommendation} />
      <Text style={styles.priorityLine}>
        Frequency {frequency}/5 · Impact {impact}/5 · Effort {effort}/5 (
        {EFFORT_LABELS[effort]}) · Priority score {points} ({TIER_LABEL[tier]})
      </Text>
    </View>
  );
}

const ACTION_GROUPS: { key: "fix_now" | "fix_next" | "monitor" | "validate"; label: string }[] = [
  { key: "fix_now", label: "Fix now" },
  { key: "fix_next", label: "Fix next" },
  { key: "monitor", label: "Monitor" },
  { key: "validate", label: "Validate and research" },
];

export function CaseStudyPdfDocument({ evaluation }: { evaluation: HeuristicEvaluation }) {
  const { executiveSummary: exec, scope, severitySummary } = evaluation;
  const rankedFindings = sortFindingsByPriority(evaluation.findings);
  const quickWins = getQuickWins(evaluation.findings);
  const severeFindings = [...evaluation.findings]
    .sort((a, b) => {
      const bySeverity = SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity];
      if (bySeverity !== 0) return bySeverity;
      return b.priority.frequency * b.priority.impact - a.priority.frequency * a.priority.impact;
    })
    .slice(0, 2);

  return (
    <Document title={`${evaluation.title} - Heuristic evaluation`} author={siteConfig.name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.label}>Heuristic evaluation</Text>
        <Text style={styles.title}>{evaluation.title}</Text>
        <Text style={styles.subtitle}>{evaluation.client}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaItem}>
            Evaluated <Text style={styles.metaItemStrong}>{scope.evaluationDate}</Text>
          </Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaItem}>{scope.evaluator}</Text>
          {scope.timeSpent ? (
            <>
              <Text style={styles.metaDot}>·</Text>
              <Text style={styles.metaItem}>{scope.timeSpent}</Text>
            </>
          ) : null}
        </View>

        <Section title="Executive summary">
          <Text style={styles.paragraph}>{exec.usabilityHealth}</Text>
          <Text style={styles.paragraph}>{exec.whatWasEvaluated}</Text>
        </Section>

        <View style={styles.severityGrid}>
          {(["critical", "high", "medium", "low"] as Severity[]).map((sev, index, list) => (
            <View
              key={sev}
              style={[styles.severityCard, index === list.length - 1 ? styles.severityCardLast : {}]}
            >
              <Text style={[styles.severityCount, { color: SEVERITY_STYLE[sev].fg }]}>
                {severitySummary[sev]}
              </Text>
              <Text style={styles.severityLabel}>{SEVERITY_STYLE[sev].label}</Text>
            </View>
          ))}
        </View>

        <Section title="Top issues">
          <Bullets items={exec.topIssues} />
        </Section>

        <Section title="Main risks">
          <Bullets items={exec.mainRisks} />
        </Section>

        <Section title="Recommended next steps">
          <Bullets items={exec.recommendedNextSteps} />
        </Section>

        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Section title="Method and scope">
          <Evidence label="URL" value={scope.evaluatedUrl} />
          <Evidence label="Evaluator" value={scope.evaluator} />
          <Evidence label="User groups" value={scope.userGroups.join(", ")} />
          <Evidence label="Tasks" value={scope.tasksEvaluated.join("; ")} />
          <Evidence label="Heuristics" value={scope.heuristicsUsed.join(", ")} />
          {scope.additionalLenses.length > 0 ? (
            <Evidence label="Other lenses" value={scope.additionalLenses.join(", ")} />
          ) : null}
        </Section>

        <Section title="Limitations">
          <Bullets items={scope.limitations} />
        </Section>

        {quickWins.length > 0 ? (
          <Section title="Quick wins">
            {quickWins.map((finding) => (
              <View key={finding.finding_id} style={styles.quickWin} wrap={false}>
                <Text style={styles.quickWinTitle}>{finding.title}</Text>
                <Text style={styles.quickWinMeta}>
                  {SEVERITY_STYLE[finding.severity].label} · Effort{" "}
                  {EFFORT_LABELS[finding.priority.effort].toLowerCase()}
                </Text>
              </View>
            ))}
          </Section>
        ) : null}

        <Section title="Action plan">
          {ACTION_GROUPS.map((group) => {
            const items = evaluation.actionPlan.filter((a) => a.priority === group.key);
            if (items.length === 0) return null;
            return (
              <View key={group.key} style={styles.actionGroup} wrap={false}>
                <Text style={styles.actionGroupTitle}>{group.label}</Text>
                <Bullets items={items.map((a) => a.action)} />
              </View>
            );
          })}
        </Section>

        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Section title="Most severe problems">
          {severeFindings.map((finding) => (
            <FindingBlock
              key={finding.finding_id}
              finding={finding}
              rank={rankedFindings.findIndex((f) => f.finding_id === finding.finding_id) + 1}
            />
          ))}
        </Section>

        <Section title="All findings, by priority">
          {rankedFindings.map((finding, index) => (
            <FindingBlock key={finding.finding_id} finding={finding} rank={index + 1} />
          ))}
        </Section>

        <Footer />
      </Page>
    </Document>
  );
}
