import Link from "next/link";
import { testimonialsSourceUrl } from "@/content/testimonials";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      data-analytics-section="testimonials"
      className="section-padding bg-white border-y border-[var(--color-border)]"
    >
      <div className="container-site">
        <SectionIntro
          label={<SectionLabel>Recommendations</SectionLabel>}
          title={
            <h2 id="testimonials-heading" className="text-h2 font-semibold mb-4">
              What colleagues say
            </h2>
          }
          description={
            <p className="text-body text-[var(--color-text-secondary)] max-w-2xl mb-12">
              Recommendations from my{" "}
              <Link
                href={testimonialsSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--color-accent)] hover:underline"
              >
                LinkedIn recommendations
              </Link>
              .
            </p>
          }
        />

        <Reveal>
          <TestimonialsCarousel />
        </Reveal>
      </div>
    </section>
  );
}
