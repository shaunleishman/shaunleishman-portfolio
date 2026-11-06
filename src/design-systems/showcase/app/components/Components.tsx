"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ComponentSection } from "./ComponentSection";
import { ComponentGalleryToolbar, type GalleryCategory } from "./ComponentGalleryToolbar";
import { GALLERY_SECTIONS, matchesGallerySection, type GallerySectionMeta } from "./component-gallery-meta";
import { GallerySectionBody } from "./gallery-section-body";
import { GallerySectionSkeleton } from "./GallerySectionSkeleton";
import { ShowcasePageShell } from "./ShowcasePageShell";

const EAGER_SECTION_COUNT = 2;
const LAZY_ROOT_MARGIN = "600px 0px 800px 0px";
const HASH_ALIGN_FRAMES = 45;

/**
 * Offset of a gallery section inside the showcase pane.
 * The loading placeholder shares the section id (`aria-busy`). Aligning to
 * that short block leaves the real heading above the pane once it mounts.
 * Returns null until the real section is in the document.
 * `scrollIntoView` is not used: it also scrolls ancestors outside this pane.
 */
function gallerySectionScrollTop(sectionId: string): number | null {
  const root = document.querySelector(".showcase-scroll-root");
  const node = document.getElementById(sectionId);
  if (!(root instanceof HTMLElement) || !(node instanceof HTMLElement)) return null;
  if (node.getAttribute("aria-busy") === "true") return null;

  const marginTop = Number.parseFloat(window.getComputedStyle(node).scrollMarginTop) || 0;
  return Math.max(
    0,
    node.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - marginTop,
  );
}

function useHashSectionId() {
  const [hashSectionId, setHashSectionId] = useState("");

  useEffect(() => {
    const readHash = () => setHashSectionId(window.location.hash.slice(1));
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  return hashSectionId;
}

function MountedGallerySection({ section }: { section: GallerySectionMeta }) {
  return (
    <div className="gallery-section-enter min-w-0">
      <ComponentSection
        id={section.id}
        title={section.title}
        description={section.description}
        code={section.code}
      >
        <GallerySectionBody id={section.id} />
      </ComponentSection>
    </div>
  );
}

function DeferredGallerySection({ section }: { section: GallerySectionMeta }) {
  const placeholderRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const node = placeholderRef.current;
    if (!node) return;

    const scrollRoot = document.querySelector(".showcase-scroll-root");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMounted(true);
        observer.disconnect();
      },
      { root: scrollRoot, rootMargin: LAZY_ROOT_MARGIN, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [section.id]);

  if (!mounted) {
    return (
      <GallerySectionSkeleton
        ref={placeholderRef}
        id={section.id}
        title={section.title}
      />
    );
  }

  return <MountedGallerySection section={section} />;
}

function LazyGallerySection({
  section,
  deferMount,
}: {
  section: GallerySectionMeta;
  deferMount: boolean;
}) {
  // A hashed section mounts immediately. Flipping this with setState in an
  // effect left the placeholder up for an extra commit, so the hash align
  // targeted the short skeleton.
  if (!deferMount) return <MountedGallerySection section={section} />;
  return <DeferredGallerySection key={section.id} section={section} />;
}

export default function Components() {
  const [category, setCategory] = useState<GalleryCategory>("All");
  const hashSectionId = useHashSectionId();

  const visibleSections = useMemo(
    () => GALLERY_SECTIONS.filter((s) => matchesGallerySection(s, category)),
    [category],
  );

  const useLazyMounting = visibleSections.length > EAGER_SECTION_COUNT;

  useEffect(() => {
    document.querySelector(".showcase-scroll-root")?.scrollTo({ top: 0 });
  }, [category]);

  useEffect(() => {
    if (!hashSectionId) return;
    const root = document.querySelector(".showcase-scroll-root");
    if (!(root instanceof HTMLElement)) return;

    let userMoved = false;
    let suppressScroll = 0;
    let frames = 0;
    let stableFrames = 0;
    let raf = 0;

    const align = () => {
      if (userMoved) return;
      const top = gallerySectionScrollTop(hashSectionId);
      if (top === null) {
        stableFrames = 0;
        return;
      }
      if (Math.abs(root.scrollTop - top) <= 1) {
        stableFrames += 1;
        return;
      }
      stableFrames = 0;
      // scrollTo dispatches scroll before it returns. Mark that event as ours
      // before moving, or the listener treats the alignment as a user scroll.
      suppressScroll += 1;
      root.scrollTo({ top });
      window.requestAnimationFrame(() => {
        suppressScroll -= 1;
      });
    };

    const onScroll = () => {
      if (suppressScroll === 0) userMoved = true;
    };
    root.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      align();
      frames += 1;
      if (!userMoved && frames < HASH_ALIGN_FRAMES && stableFrames < 8) {
        raf = window.requestAnimationFrame(tick);
      }
    };
    raf = window.requestAnimationFrame(tick);

    const shell = root.firstElementChild;
    const observer = new ResizeObserver(() => align());
    if (shell instanceof HTMLElement) observer.observe(shell);
    const stopTimer = window.setTimeout(() => observer.disconnect(), 1500);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(stopTimer);
      observer.disconnect();
      root.removeEventListener("scroll", onScroll);
    };
  }, [hashSectionId, visibleSections]);

  return (
    <ShowcasePageShell maxWidth="7xl" className="space-y-8 sm:space-y-12">
      <ComponentGalleryToolbar
        category={category}
        onCategoryChange={setCategory}
      />

      {visibleSections.map((section, index) => (
        <LazyGallerySection
          key={section.id}
          section={section}
          deferMount={
            useLazyMounting && index >= EAGER_SECTION_COUNT && section.id !== hashSectionId
          }
        />
      ))}
    </ShowcasePageShell>
  );
}
