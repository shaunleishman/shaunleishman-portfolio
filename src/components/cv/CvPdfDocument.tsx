import type { ReactNode } from "react";
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { cvContent } from "@/content/cv";
import { siteConfig } from "@/content/projects";

/**
 * One-page A4 CV. Spacing is tight, but type stays at readable print sizes.
 * Do not drop below these sizes to chase fit.
 */
const type = {
  label: 8,
  name: 17,
  headline: 11,
  contact: 9,
  quote: 9,
  body: 9.25,
  bodySm: 8.75,
  section: 7.5,
  jobTitle: 10,
  jobPeriod: 8.75,
} as const;

const colors = {
  accent: "#3b66f5",
  text: "#525252",
  muted: "#737373",
  dark: "#171717",
  border: "#e5e5e5",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 26,
    paddingBottom: 30,
    paddingHorizontal: 30,
    fontFamily: "Helvetica",
    fontSize: type.body,
    color: colors.text,
    lineHeight: 1.38,
  },
  label: {
    fontSize: type.label,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: colors.muted,
    marginBottom: 5,
  },
  name: {
    fontSize: type.name,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 2,
  },
  headline: {
    fontSize: type.headline,
    color: colors.text,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  contactItem: {
    fontSize: type.contact,
    color: colors.text,
  },
  link: {
    color: colors.accent,
    textDecoration: "none",
  },
  quote: {
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    paddingLeft: 10,
    paddingVertical: 1,
    marginBottom: 10,
    fontSize: type.quote,
    fontFamily: "Helvetica-Oblique",
    color: colors.text,
    lineHeight: 1.35,
  },
  summaryBlock: {
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 5,
    fontSize: type.body,
    color: colors.text,
    lineHeight: 1.38,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: type.section,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.accent,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  strengthsGrid: {
    flexDirection: "row",
    gap: 14,
  },
  strengthsCol: {
    flex: 1,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 2,
  },
  bulletAccent: {
    width: 3.5,
    height: 3.5,
    borderRadius: 1.75,
    backgroundColor: colors.accent,
    marginTop: 4,
  },
  bulletText: {
    flex: 1,
    fontSize: type.bodySm,
    lineHeight: 1.32,
    color: colors.text,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 3,
  },
  jobTitle: {
    flex: 1,
    fontSize: type.jobTitle,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    lineHeight: 1.25,
  },
  jobPeriod: {
    fontSize: type.jobPeriod,
    color: colors.muted,
    flexShrink: 0,
  },
  jobBlock: {
    marginBottom: 7,
  },
  jobParagraph: {
    marginBottom: 2,
    fontSize: type.bodySm,
    color: colors.text,
    lineHeight: 1.32,
  },
  jobNote: {
    marginTop: 2,
    paddingLeft: 7,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
    fontSize: 8.25,
    fontFamily: "Helvetica-Oblique",
    color: colors.muted,
    lineHeight: 1.3,
  },
  educationRow: {
    marginBottom: 2,
  },
  educationLine: {
    fontSize: type.bodySm,
    color: colors.text,
    lineHeight: 1.32,
  },
  educationTitle: {
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },
  educationDetail: {
    color: colors.muted,
  },
  skillRow: {
    marginBottom: 2,
  },
  skillLine: {
    fontSize: type.bodySm,
    color: colors.text,
    lineHeight: 1.32,
  },
  skillLabel: {
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },
  interestsLine: {
    fontSize: type.bodySm,
    color: colors.text,
    lineHeight: 1.32,
  },
  footer: {
    position: "absolute",
    left: 30,
    right: 30,
    bottom: 16,
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerBrand: {
    fontSize: type.bodySm,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },
  footerUrl: {
    fontSize: 8.25,
    color: colors.muted,
  },
});

function BulletList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <View key={item.slice(0, 40)} style={styles.bulletRow}>
          <View style={styles.bulletAccent} />
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

function JobBlock({
  role,
  company,
  period,
  paragraphs,
  note,
}: {
  role: string;
  company: string;
  period: string;
  paragraphs: string[];
  note?: string;
}) {
  return (
    <View style={styles.jobBlock}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle}>
          {role} · {company}
        </Text>
        <Text style={styles.jobPeriod}>{period}</Text>
      </View>
      {paragraphs.map((paragraph) => (
        <Text key={paragraph.slice(0, 32)} style={styles.jobParagraph}>
          {paragraph}
        </Text>
      ))}
      {note ? <Text style={styles.jobNote}>{note}</Text> : null}
    </View>
  );
}

function CvHeader() {
  return (
    <View>
      <Text style={styles.label}>CV</Text>
      <Text style={styles.name}>{siteConfig.name}</Text>
      <Text style={styles.headline}>{cvContent.headline}</Text>
      <View style={styles.contactRow}>
        <Link src={`mailto:${cvContent.contact.email}`} style={[styles.contactItem, styles.link]}>
          <Text>{cvContent.contact.email}</Text>
        </Link>
        <Text style={styles.contactItem}>{cvContent.contact.phone}</Text>
        <Link src={cvContent.contact.linkedIn} style={[styles.contactItem, styles.link]}>
          <Text>LinkedIn</Text>
        </Link>
        <Link src={cvContent.contact.portfolio} style={[styles.contactItem, styles.link]}>
          <Text>{cvContent.contact.portfolioLabel}</Text>
        </Link>
      </View>
    </View>
  );
}

function StrengthsSection() {
  const midpoint = Math.ceil(cvContent.strengths.length / 2);
  const left = cvContent.strengths.slice(0, midpoint);
  const right = cvContent.strengths.slice(midpoint);

  return (
    <Section title="Key strengths">
      <View style={styles.strengthsGrid}>
        <View style={styles.strengthsCol}>
          <BulletList items={left} />
        </View>
        <View style={styles.strengthsCol}>
          <BulletList items={right} />
        </View>
      </View>
    </Section>
  );
}

export function CvPdfDocument() {
  return (
    <Document title={`${siteConfig.name} CV`} author={siteConfig.name}>
      <Page size="A4" style={styles.page}>
        <CvHeader />
        <Text style={styles.quote}>{siteConfig.quote}</Text>

        <View style={styles.summaryBlock}>
          {cvContent.summary.map((paragraph) => (
            <Text key={paragraph.slice(0, 24)} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        <StrengthsSection />

        <Section title="Experience">
          {cvContent.experience.map((job) => (
            <JobBlock
              key={`${job.company}-${job.period}`}
              role={job.role}
              company={job.company}
              period={job.period}
              paragraphs={job.paragraphs}
              note={job.note}
            />
          ))}
        </Section>

        <Section title="Education">
          {cvContent.education.map((item) => (
            <View key={item.title} style={styles.educationRow}>
              <Text style={styles.educationLine}>
                <Text style={styles.educationTitle}>{item.title}</Text>
                <Text style={styles.educationDetail}> · {item.detail}</Text>
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Skills">
          {cvContent.skills.map((group) => (
            <View key={group.label} style={styles.skillRow}>
              <Text style={styles.skillLine}>
                <Text style={styles.skillLabel}>{group.label}. </Text>
                {group.items}
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Interests">
          <Text style={styles.interestsLine}>{cvContent.interests}</Text>
        </Section>

        <View style={styles.footer} fixed>
          <Text style={styles.footerBrand}>{siteConfig.brand}</Text>
          <Link src={cvContent.contact.portfolio} style={styles.footerUrl}>
            <Text>{cvContent.contact.portfolioLabel}</Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
}
