import type { ReactNode } from "react";
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { cvContent, type CvContent } from "@/content/cv";
import { siteConfig } from "@/content/projects";

/**
 * One-page A4 CV with one shared leading and paragraph rhythm.
 * Hierarchy comes from weight and section gaps, not mixed line heights.
 */
const type = {
  label: 8,
  name: 17,
  headline: 11,
  contact: 9,
  body: 9,
  section: 7.5,
  jobTitle: 10,
} as const;

const leading = 1.4;

const space = {
  xs: 3,
  sm: 5,
  md: 8,
  lg: 10,
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
    lineHeight: leading,
  },
  label: {
    fontSize: type.label,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: colors.muted,
    marginBottom: space.xs,
  },
  name: {
    fontSize: type.name,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 2,
    lineHeight: 1.2,
  },
  headline: {
    fontSize: type.headline,
    color: colors.text,
    marginBottom: space.sm,
    lineHeight: 1.3,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: space.lg,
  },
  contactItem: {
    fontSize: type.contact,
    color: colors.text,
    lineHeight: leading,
  },
  link: {
    color: colors.accent,
    textDecoration: "none",
  },
  quote: {
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    paddingLeft: 10,
    marginBottom: space.lg,
    fontSize: type.body,
    fontFamily: "Helvetica-Oblique",
    color: colors.text,
    lineHeight: leading,
  },
  summaryBlock: {
    marginBottom: space.md,
  },
  paragraph: {
    marginBottom: space.sm,
    fontSize: type.body,
    color: colors.text,
    lineHeight: leading,
  },
  section: {
    marginBottom: space.md,
  },
  sectionTitle: {
    fontSize: type.section,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.accent,
    fontFamily: "Helvetica-Bold",
    marginBottom: space.sm,
    lineHeight: 1.3,
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
    marginBottom: space.xs,
  },
  bulletAccent: {
    width: 3.5,
    height: 3.5,
    borderRadius: 1.75,
    backgroundColor: colors.accent,
    marginTop: 4.5,
  },
  bulletText: {
    flex: 1,
    fontSize: type.body,
    lineHeight: leading,
    color: colors.text,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: space.xs,
  },
  jobTitle: {
    flex: 1,
    fontSize: type.jobTitle,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    lineHeight: 1.3,
  },
  jobPeriod: {
    fontSize: type.body,
    color: colors.muted,
    flexShrink: 0,
    lineHeight: 1.3,
  },
  jobBlock: {
    marginBottom: space.md,
  },
  jobParagraph: {
    marginBottom: space.sm,
    fontSize: type.body,
    color: colors.text,
    lineHeight: leading,
  },
  jobNote: {
    paddingLeft: 7,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
    fontSize: type.body,
    fontFamily: "Helvetica-Oblique",
    color: colors.muted,
    lineHeight: leading,
  },
  listRow: {
    marginBottom: space.xs,
  },
  listLine: {
    fontSize: type.body,
    color: colors.text,
    lineHeight: leading,
  },
  listStrong: {
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },
  listMuted: {
    color: colors.muted,
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
    fontSize: type.body,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },
  footerUrl: {
    fontSize: type.body,
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

function CvHeader({ content }: { content: CvContent }) {
  return (
    <View>
      <Text style={styles.label}>CV</Text>
      <Text style={styles.name}>{siteConfig.name}</Text>
      <Text style={styles.headline}>{content.headline}</Text>
      <View style={styles.contactRow}>
        <Link src={`mailto:${content.contact.email}`} style={[styles.contactItem, styles.link]}>
          <Text>{content.contact.email}</Text>
        </Link>
        <Text style={styles.contactItem}>{content.contact.phone}</Text>
        <Link src={content.contact.linkedIn} style={[styles.contactItem, styles.link]}>
          <Text>LinkedIn</Text>
        </Link>
        <Link src={content.contact.portfolio} style={[styles.contactItem, styles.link]}>
          <Text>{content.contact.portfolioLabel}</Text>
        </Link>
      </View>
    </View>
  );
}

function StrengthsSection({ content }: { content: CvContent }) {
  const midpoint = Math.ceil(content.strengths.length / 2);
  const left = content.strengths.slice(0, midpoint);
  const right = content.strengths.slice(midpoint);

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

type CvPdfDocumentProps = {
  content?: CvContent;
};

export function CvPdfDocument({ content = cvContent }: CvPdfDocumentProps) {
  return (
    <Document title={`${siteConfig.name} CV`} author={siteConfig.name}>
      <Page size="A4" style={styles.page}>
        <CvHeader content={content} />
        <Text style={styles.quote}>{siteConfig.quote}</Text>

        <View style={styles.summaryBlock}>
          {content.summary.map((paragraph) => (
            <Text key={paragraph.slice(0, 24)} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        <StrengthsSection content={content} />

        <Section title="Experience">
          {content.experience.map((job) => (
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
          {content.education.map((item) => (
            <View key={item.title} style={styles.listRow}>
              <Text style={styles.listLine}>
                <Text style={styles.listStrong}>{item.title}</Text>
                <Text style={styles.listMuted}> · {item.detail}</Text>
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Skills">
          {content.skills.map((group) => (
            <View key={group.label} style={styles.listRow}>
              <Text style={styles.listLine}>
                <Text style={styles.listStrong}>{group.label}. </Text>
                {group.items}
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Interests">
          <Text style={styles.listLine}>{content.interests}</Text>
        </Section>

        <View style={styles.footer} fixed>
          <Text style={styles.footerBrand}>{siteConfig.brand}</Text>
          <Link src={content.contact.portfolio} style={styles.footerUrl}>
            <Text>{content.contact.portfolioLabel}</Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
}
