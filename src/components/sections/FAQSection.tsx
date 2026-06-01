import { faqs } from "@/content/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function FAQSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      data-analytics-section="faq"
      className="section-padding bg-[var(--color-bg-muted)]"
    >
      <div className="container-site max-w-3xl">
        <SectionIntro
          label={<SectionLabel>FAQ</SectionLabel>}
          title={
            <h2 id="faq-heading" className="text-h2 font-semibold mb-12">
              <span className="sr-only">Frequently asked </span>
              Frequently asked questions
            </h2>
          }
        />
        <Reveal delay={60}>
          <FAQAccordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
