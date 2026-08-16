import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  coverLetterShared,
  type Application,
} from "@/content/applications";
import { siteConfig } from "@/content/projects";

/** Matches CV PDF typography and colour so both documents feel like one set. */
const type = {
  label: 8.5,
  name: 20,
  headline: 12.5,
  contact: 9.5,
  body: 10,
  bodySm: 9.5,
  meta: 9.5,
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
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: type.body,
    color: colors.text,
    lineHeight: 1.5,
  },
  label: {
    fontSize: type.label,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.muted,
    marginBottom: 10,
  },
  name: {
    fontSize: type.name,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 6,
  },
  headline: {
    fontSize: type.headline,
    color: colors.text,
    marginBottom: 14,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 18,
  },
  contactItem: {
    fontSize: type.contact,
    color: colors.text,
  },
  link: {
    color: colors.accent,
    textDecoration: "none",
  },
  roleBand: {
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    paddingLeft: 14,
    paddingVertical: 2,
    marginBottom: 20,
  },
  roleTitle: {
    fontSize: type.headline,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 4,
  },
  roleCompany: {
    fontSize: type.meta,
    color: colors.dark,
    marginBottom: 2,
  },
  roleMeta: {
    fontSize: type.meta,
    color: colors.muted,
  },
  greeting: {
    marginBottom: 12,
    fontSize: type.body,
    color: colors.dark,
  },
  paragraph: {
    marginBottom: 10,
    fontSize: type.body,
    color: colors.text,
    lineHeight: 1.55,
  },
  closing: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: type.body,
    color: colors.text,
  },
  signOff: {
    fontSize: type.body,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },
  footer: {
    position: "absolute",
    left: 40,
    right: 40,
    bottom: 36,
    paddingTop: 14,
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

type CoverLetterPdfDocumentProps = {
  letter: Application;
};

export function CoverLetterPdfDocument({ letter }: CoverLetterPdfDocumentProps) {
  const { contact } = coverLetterShared;

  return (
    <Document
      title={`${siteConfig.name} Cover Letter · ${letter.company}`}
      author={siteConfig.name}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.label}>{coverLetterShared.label}</Text>
        <Text style={styles.name}>{siteConfig.name}</Text>
        <Text style={styles.headline}>{coverLetterShared.headline}</Text>

        <View style={styles.contactRow}>
          <Link src={`mailto:${contact.email}`} style={[styles.contactItem, styles.link]}>
            <Text>{contact.email}</Text>
          </Link>
          <Text style={styles.contactItem}>{contact.phone}</Text>
          <Link src={contact.linkedIn} style={[styles.contactItem, styles.link]}>
            <Text>LinkedIn</Text>
          </Link>
          <Link src={contact.portfolio} style={[styles.contactItem, styles.link]}>
            <Text>{contact.portfolioLabel}</Text>
          </Link>
        </View>

        <View style={styles.roleBand}>
          <Text style={styles.roleTitle}>{letter.jobTitle}</Text>
          <Text style={styles.roleCompany}>{letter.company}</Text>
          <Text style={styles.roleMeta}>{letter.roleMeta}</Text>
        </View>

        <Text style={styles.greeting}>{letter.greeting}</Text>

        {(letter.paragraphs ?? []).map((paragraph) => (
          <Text key={paragraph.slice(0, 40)} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}

        <Text style={styles.closing}>{letter.closing}</Text>
        <Text style={styles.signOff}>{coverLetterShared.signOff}</Text>

        <View style={styles.footer} fixed>
          <Text style={styles.footerBrand}>{siteConfig.brand}</Text>
          <Link src={contact.portfolio} style={styles.footerUrl}>
            <Text>{contact.portfolioLabel}</Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
}
