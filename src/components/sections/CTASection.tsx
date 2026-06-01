import { Button } from "@/components/ui/Button";

type CTASectionProps = {
  title?: string;
  description?: string;
  dark?: boolean;
};

export function CTASection({
  title = "Open to new opportunities",
  description = "I'm actively looking for UX/UI design roles. If my work resonates, I'd love to hear from you.",
  dark = true,
}: CTASectionProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      data-analytics-section="cta"
      className={
        dark
          ? "section-padding grid-bg text-white"
          : "section-padding bg-white border-t border-[var(--color-border)]"
      }
    >
      <div className="container-site text-center max-w-2xl mx-auto">
        <h2 id="cta-heading" className="text-h2 font-semibold mb-4">
          {title}
        </h2>
        <p
          className={`text-body-lg mb-8 ${dark ? "text-neutral-300" : "text-[var(--color-text-secondary)]"}`}
        >
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contact" variant={dark ? "inverse" : "primary"}>
            Get in touch
          </Button>
          <Button href="/work" variant={dark ? "secondary" : "secondary"} className={dark ? "!border-white/30 !text-white hover:!border-white" : ""}>
            View my work
          </Button>
        </div>
      </div>
    </section>
  );
}
