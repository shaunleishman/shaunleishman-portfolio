import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/projects";

type SiteLogoProps = {
  className?: string;
  /** Use image asset instead of HTML wordmark */
  asImage?: boolean;
};

export function SiteLogo({ className, asImage = false }: SiteLogoProps) {
  if (asImage) {
    return (
      <Image
        src={siteConfig.logo}
        alt={siteConfig.brand}
        width={180}
        height={32}
        className={cn("h-7 w-auto object-contain", className)}
        priority
      />
    );
  }

  return (
    <span className={cn("inline-flex items-baseline tracking-tight leading-none", className)}>
      <span className="font-bold">{siteConfig.brandHandle}</span>
      <span className="font-light">.design</span>
    </span>
  );
}

type SiteLogoLinkProps = SiteLogoProps & {
  href?: string;
  ariaCurrent?: boolean;
};

export function SiteLogoLink({
  className,
  asImage,
  href = "/",
  ariaCurrent,
}: SiteLogoLinkProps) {
  return (
    <Link
      href={href}
      data-metrics-gate="logo"
      className={cn("inline-flex items-center min-h-[44px] focus-visible:outline-offset-4", className)}
      aria-current={ariaCurrent ? "page" : undefined}
      aria-label={`${siteConfig.brand} home`}
    >
      <SiteLogo asImage={asImage} />
    </Link>
  );
}
