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

/** Matches web CV typography at print size — not scaled-down screen capture */
const type = {
  label: 8.5,
  name: 20,
  headline: 12.5,
  contact: 9.5,
  quote: 10.5,
  body: 10,
  bodySm: 9.5,
  section: 8.5,
  jobTitle: 11,
  jobPeriod: 9.5,
} as const;

const colors = {
  accent: "#3b66f5",
  text: "#525252",
  muted: "#737373",
  dark: "#0a0a0a",
  border: "#e5e5e5",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 28,
    fontFamily: "Helvetica",
    fontSize: type.body,
    color: colors.text,
    lineHeight: 1.45,
  },
  label: {
    fontSize: type.label,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.muted,
    marginBottom: 8,
  },
  name: {
    fontSize: type.name,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 4,
  },
  headline: {
    fontSize: type.headline,
    color: colors.text,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
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
    paddingLeft: 12,
    marginBottom: 14,
    fontSize: type.quote,
    fontFamily: "Helvetica-Oblique",
    color: colors.text,
    lineHeight: 1.5,
  },
  paragraph: {
    marginBottom: 8,
    fontSize: type.body,
    color: colors.text,
    lineHeight: 1.45,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: type.section,
    letterSpacing: 0.9,
    textTransform: "uppercase",
    color: colors.accent,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  strengthsGrid: {
    flexDirection: "row",
    gap: 18,
  },
  strengthsCol: {
    flex: 1,
    gap: 4,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 7,
    marginBottom: 4,
  },
  bulletAccent: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
    backgroundColor: colors.accent,
    marginTop: 5,
  },
  bulletMuted: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
    backgroundColor: colors.muted,
    marginTop: 5,
  },
  bulletText: {
    flex: 1,
    fontSize: type.bodySm,
    lineHeight: 1.35,
    color: colors.text,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 6,
  },
  jobTitle: {
    flex: 1,
    fontSize: type.jobTitle,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },
  jobPeriod: {
    fontSize: type.jobPeriod,
    color: colors.muted,
  },
  jobBlock: {
    marginBottom: 10,
  },
  educationTitle: {
    fontSize: type.body,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 2,
  },
  educationDetail: {
    fontSize: type.bodySm,
    color: colors.muted,
    marginBottom: 6,
  },
  skillLabel: {
    fontSize: type.bodySm,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 2,
  },
  skillItems: {
    fontSize: type.bodySm,
    color: colors.text,
    lineHeight: 1.35,
    marginBottom: 6,
  },
  footer: {
    marginTop: 12,
    paddingTop: 10,
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
    fontSize: type.bodySm,
    color: colors.muted,
  },
});

function BulletList({
  items,
  variant = "accent",
}: {
  items: string[];
  variant?: "accent" | "muted";
}) {
  const bulletStyle = variant === "accent" ? styles.bulletAccent : styles.bulletMuted;

  return (
    <>
      {items.map((item) => (
        <View key={item.slice(0, 40)} style={styles.bulletRow} wrap={false}>
          <View style={bulletStyle} />
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
  highlights,
}: {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}) {
  return (
    <View style={styles.jobBlock}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle}>
          {role} — {company}
        </Text>
        <Text style={styles.jobPeriod}>{period}</Text>
      </View>
      <BulletList items={highlights} variant="muted" />
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
          <Text>{siteConfig.brand}</Text>
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
          <BulletList items={left} variant="accent" />
        </View>
        <View style={styles.strengthsCol}>
          <BulletList items={right} variant="accent" />
        </View>
      </View>
    </Section>
  );
}

function CvFooter() {
  return (
    <View style={styles.footer} wrap={false}>
      <Text style={styles.footerBrand}>{siteConfig.brand}</Text>
      <Link src={cvContent.contact.portfolio} style={styles.footerUrl}>
        <Text>{siteConfig.brand}</Text>
      </Link>
    </View>
  );
}

export function CvPdfDocument() {
  const [firstJob, secondJob, ...remainingJobs] = cvContent.experience;

  return (
    <Document title={`${siteConfig.name} — CV`} author={siteConfig.name}>
      <Page size="A4" style={styles.page}>
        <CvHeader />
        <Text style={styles.quote}>{siteConfig.quote}</Text>

        <View style={{ marginBottom: 12 }}>
          {cvContent.summary.map((paragraph) => (
            <Text key={paragraph.slice(0, 24)} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        <StrengthsSection />

        <Section title="Experience">
          {firstJob ? (
            <JobBlock
              role={firstJob.role}
              company={firstJob.company}
              period={firstJob.period}
              highlights={firstJob.highlights}
            />
          ) : null}
          {secondJob ? (
            <JobBlock
              role={secondJob.role}
              company={secondJob.company}
              period={secondJob.period}
              highlights={secondJob.highlights}
            />
          ) : null}
        </Section>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {remainingJobs.map((job) => (
            <JobBlock
              key={`${job.company}-${job.period}`}
              role={job.role}
              company={job.company}
              period={job.period}
              highlights={job.highlights}
            />
          ))}
        </View>

        <Section title="Leadership, communication and AI">
          <Text style={styles.paragraph}>{cvContent.leadership}</Text>
        </Section>

        <Section title="Education">
          {cvContent.education.map((item) => (
            <View key={item.title}>
              <Text style={styles.educationTitle}>{item.title}</Text>
              <Text style={styles.educationDetail}>{item.detail}</Text>
            </View>
          ))}
        </Section>

        <Section title="Skills">
          {cvContent.skills.map((group) => (
            <View key={group.label}>
              <Text style={styles.skillLabel}>{group.label}</Text>
              <Text style={styles.skillItems}>{group.items}</Text>
            </View>
          ))}
        </Section>

        <Section title="Interests">
          <Text style={styles.paragraph}>{cvContent.interests}</Text>
        </Section>

        <CvFooter />
      </Page>
    </Document>
  );
}
