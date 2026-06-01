import Image from "next/image";
import { companies } from "@/content/companies";
import { cn } from "@/lib/utils";

/** Fixed slot size — every logo occupies the same footprint in the carousel */
const LOGO_SLOT = {
  width: 176,
  height: 48,
  imageMaxH: 36,
  imageMaxW: 148,
} as const;

type CompanyLogoImageProps = {
  name: string;
  logo: string;
  invert?: boolean;
  className?: string;
};

export function CompanyLogoImage({ name, logo, invert, className }: CompanyLogoImageProps) {
  return (
    <div
      className={cn("flex items-center justify-center shrink-0", className)}
      style={{ width: LOGO_SLOT.width, height: LOGO_SLOT.height }}
    >
      <Image
        src={logo}
        alt={`${name} logo`}
        width={LOGO_SLOT.imageMaxW}
        height={LOGO_SLOT.imageMaxH}
        className={cn(
          "object-contain w-auto h-auto transition-opacity duration-200",
          "opacity-70 hover:opacity-100",
          invert && "brightness-0 invert",
        )}
        style={{
          maxHeight: LOGO_SLOT.imageMaxH,
          maxWidth: LOGO_SLOT.imageMaxW,
        }}
      />
    </div>
  );
}

export function LogoMarquee() {
  const doubled = [...companies, ...companies];

  return (
    <section
      aria-label="Companies worked with"
      data-analytics-section="companies"
      className="py-12 bg-[var(--color-bg-dark)] text-white overflow-hidden border-y border-white/10"
    >
      <p className="text-label text-neutral-500 text-center mb-8 px-4">
        Companies worked with
      </p>

      <div className="flex animate-marquee items-center">
        {doubled.map((company, i) => (
          <div
            key={`${company.name}-${i}`}
            className="inline-flex items-center justify-center border-r border-white/10 px-6"
          >
            <CompanyLogoImage
              name={company.name}
              logo={company.logo}
              invert={company.invert}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
