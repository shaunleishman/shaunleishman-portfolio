export type FigmaEmbedScaling =
  | "scale-down"
  | "contain"
  | "min-zoom"
  | "scale-down-width"
  | "fit-width"
  | "free";

export type FigmaEmbedOptions = {
  scaling?: FigmaEmbedScaling;
  contentScaling?: "fixed" | "responsive";
  footer?: boolean;
  deviceFrame?: boolean;
  viewportControls?: boolean;
};

const DEFAULT_EMBED_OPTIONS: Required<FigmaEmbedOptions> = {
  /** Scale the full frame down so nothing is cropped inside the iframe */
  scaling: "scale-down",
  contentScaling: "fixed",
  footer: false,
  deviceFrame: false,
  viewportControls: false,
};

/** Apply embed-friendly scaling params to a Figma prototype share URL. */
export function figmaPrototypeShareUrl(prototypeUrl: string, options: FigmaEmbedOptions = {}): string {
  const merged = { ...DEFAULT_EMBED_OPTIONS, ...options };
  const url = new URL(prototypeUrl);

  url.searchParams.set("scaling", merged.scaling);
  url.searchParams.set("content-scaling", merged.contentScaling);
  url.searchParams.delete("viewport");

  return url.toString();
}

/** Build a Figma iframe embed URL from a prototype share link. */
export function figmaPrototypeEmbedUrl(prototypeUrl: string, options: FigmaEmbedOptions = {}): string {
  const merged = { ...DEFAULT_EMBED_OPTIONS, ...options };
  const shareUrl = figmaPrototypeShareUrl(prototypeUrl, merged);
  const parsed = new URL(shareUrl);
  const pathMatch = parsed.pathname.match(/\/proto\/([^/]+)\/([^/?]+)/);

  if (pathMatch) {
    const [, fileKey, slug] = pathMatch;
    const embed = new URL(`https://embed.figma.com/proto/${fileKey}/${slug}`);

    for (const [key, value] of parsed.searchParams.entries()) {
      embed.searchParams.set(key, value);
    }

    embed.searchParams.set("embed-host", "shaunleishman-portfolio");
    embed.searchParams.set("scaling", merged.scaling);
    embed.searchParams.set("content-scaling", merged.contentScaling);
    embed.searchParams.set("footer", String(merged.footer));
    embed.searchParams.set("device-frame", String(merged.deviceFrame));
    embed.searchParams.set("viewport-controls", String(merged.viewportControls));

    return embed.toString();
  }

  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(shareUrl)}`;
}
