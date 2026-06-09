import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/projects";

type SiteLogoProps = {
  className?: string;
  /** Use image asset instead of HTML wordmark */
  asImage?: boolean;
  /** Dark wordmark for light backgrounds (e.g. admin header) */
  variant?: "default" | "dark";
};

export function SiteLogo({ className, asImage = false, variant = "default" }: SiteLogoProps) {
  if (asImage) {
    const src = variant === "dark" ? siteConfig.logoDark : siteConfig.logo;
    return (
      <Image
        src={src}
        alt={siteConfig.brand}
        width={1024}
        height={124}
        className={cn("h-7 w-auto object-contain object-left", className)}
        priority
        sizes="200px"
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
  variant,
  href = "/",
  ariaCurrent,
}: SiteLogoLinkProps) {
  return (
    <Link
      href={href}
      data-metrics-gate="logo"
      className={cn("inline-flex shrink-0 items-center min-h-[44px] focus-visible:outline-offset-4", className)}
      aria-current={ariaCurrent ? "page" : undefined}
      aria-label={`${siteConfig.brand} home`}
    >
      <SiteLogo asImage={asImage} variant={variant} />
    </Link>
  );
}
