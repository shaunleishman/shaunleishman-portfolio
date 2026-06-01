import { Button } from "@/components/ui/Button";
import { Mail, MessageCircle } from "lucide-react";

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
          ? "section-padding grid-bg text-white relative overflow-hidden"
          : "section-padding bg-white border-t border-[var(--color-border)] relative overflow-hidden"
      }
    >
      {dark && (
        <>
          <Mail
            className="absolute top-12 left-[10%] h-8 w-8 text-white/10 hidden lg:block"
            strokeWidth={1.25}
            aria-hidden
          />
          <MessageCircle
            className="absolute bottom-16 right-[12%] h-10 w-10 text-[#3b66f5]/20 hidden lg:block"
            strokeWidth={1.25}
            aria-hidden
          />
        </>
      )}
      <div className="container-site text-center max-w-2xl mx-auto relative">
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
