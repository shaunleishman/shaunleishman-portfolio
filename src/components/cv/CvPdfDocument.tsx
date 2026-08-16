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
 * Use density="compact" for longer tailored application CVs.
 */
export type CvPdfDensity = "default" | "compact";

type DensityTokens = {
  type: {
    label: number;
    name: number;
    headline: number;
    contact: number;
    body: number;
    section: number;
    jobTitle: number;
  };
  leading: number;
  space: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  page: {
    paddingTop: number;
    paddingBottom: number;
    paddingHorizontal: number;
  };
};

const DENSITY: Record<CvPdfDensity, DensityTokens> = {
  default: {
    type: {
      label: 8,
      name: 17,
      headline: 11,
      contact: 9,
      body: 9,
      section: 7.5,
      jobTitle: 10,
    },
    leading: 1.4,
    space: { xs: 3, sm: 5, md: 8, lg: 10 },
    page: { paddingTop: 26, paddingBottom: 30, paddingHorizontal: 30 },
  },
  compact: {
    type: {
      label: 7.5,
      name: 15,
      headline: 10,
      contact: 8.5,
      body: 8.5,
      section: 7,
      jobTitle: 9.5,
    },
    leading: 1.32,
    space: { xs: 2, sm: 3.5, md: 5.5, lg: 7 },
    page: { paddingTop: 20, paddingBottom: 26, paddingHorizontal: 28 },
  },
};

const colors = {
  accent: "#3b66f5",
  text: "#525252",
  muted: "#737373",
  dark: "#171717",
  border: "#e5e5e5",
};

function createStyles(density: CvPdfDensity) {
  const { type, leading, space, page } = DENSITY[density];

  return StyleSheet.create({
    page: {
      paddingTop: page.paddingTop,
      paddingBottom: page.paddingBottom,
      paddingHorizontal: page.paddingHorizontal,
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
      left: page.paddingHorizontal,
      right: page.paddingHorizontal,
      bottom: 14,
      paddingTop: 6,
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
}

type Styles = ReturnType<typeof createStyles>;

function BulletList({ items, styles }: { items: string[]; styles: Styles }) {
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

function Section({
  title,
  children,
  styles,
}: {
  title: string;
  children: ReactNode;
  styles: Styles;
}) {
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
  styles,
}: {
  role: string;
  company: string;
  period: string;
  paragraphs: string[];
  note?: string;
  styles: Styles;
}) {
  return (
    <View style={styles.jobBlock} wrap={false}>
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

function CvHeader({ content, styles }: { content: CvContent; styles: Styles }) {
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

function StrengthsSection({ content, styles }: { content: CvContent; styles: Styles }) {
  const midpoint = Math.ceil(content.strengths.length / 2);
  const left = content.strengths.slice(0, midpoint);
  const right = content.strengths.slice(midpoint);

  return (
    <Section title="Key strengths" styles={styles}>
      <View style={styles.strengthsGrid}>
        <View style={styles.strengthsCol}>
          <BulletList items={left} styles={styles} />
        </View>
        <View style={styles.strengthsCol}>
          <BulletList items={right} styles={styles} />
        </View>
      </View>
    </Section>
  );
}

type CvPdfDocumentProps = {
  content?: CvContent;
  density?: CvPdfDensity;
};

export function CvPdfDocument({
  content = cvContent,
  density = "default",
}: CvPdfDocumentProps) {
  const styles = createStyles(density);

  return (
    <Document title={`${siteConfig.name} CV`} author={siteConfig.name}>
      <Page size="A4" style={styles.page}>
        <CvHeader content={content} styles={styles} />
        <Text style={styles.quote}>{siteConfig.quote}</Text>

        <View style={styles.summaryBlock}>
          {content.summary.map((paragraph) => (
            <Text key={paragraph.slice(0, 24)} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        <StrengthsSection content={content} styles={styles} />

        <Section title="Experience" styles={styles}>
          {content.experience.map((job) => (
            <JobBlock
              key={`${job.company}-${job.period}`}
              role={job.role}
              company={job.company}
              period={job.period}
              paragraphs={job.paragraphs}
              note={job.note}
              styles={styles}
            />
          ))}
        </Section>

        <Section title="Education" styles={styles}>
          {content.education.map((item) => (
            <View key={item.title} style={styles.listRow}>
              <Text style={styles.listLine}>
                <Text style={styles.listStrong}>{item.title}</Text>
                <Text style={styles.listMuted}> · {item.detail}</Text>
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Skills" styles={styles}>
          {content.skills.map((group) => (
            <View key={group.label} style={styles.listRow}>
              <Text style={styles.listLine}>
                <Text style={styles.listStrong}>{group.label}. </Text>
                {group.items}
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Interests" styles={styles}>
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
