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

function LazyGallerySection({
  section,
  deferMount,
}: {
  section: GallerySectionMeta;
  deferMount: boolean;
}) {
  const placeholderRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(!deferMount);

  useEffect(() => {
    if (!deferMount) {
      setMounted(true);
      return;
    }

    setMounted(false);
    const node = placeholderRef.current;
    if (!node) return;

    const scrollRoot = document.querySelector(".showcase-scroll-root");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { root: scrollRoot, rootMargin: LAZY_ROOT_MARGIN, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [deferMount, section.id]);

  if (!mounted) {
    return (
      <GallerySectionSkeleton
        ref={placeholderRef}
        id={section.id}
        title={section.title}
      />
    );
  }

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
    const node = document.getElementById(hashSectionId);
    if (!node) return;
    node.scrollIntoView({ block: "start" });
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
