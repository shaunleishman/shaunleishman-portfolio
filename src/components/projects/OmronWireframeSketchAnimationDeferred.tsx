"use client";

import dynamic from "next/dynamic";
import { DeferredMount } from "@/components/ui/DeferredMount";
import { Skeleton } from "@/components/ui/Skeleton";

const OmronWireframeSketchAnimation = dynamic(
  () =>
    import("@/components/projects/OmronWireframeSketchAnimation").then((mod) => ({
      default: mod.OmronWireframeSketchAnimation,
    })),
  { ssr: false },
);

type OmronWireframeSketchAnimationDeferredProps = {
  alt: string;
  caption?: string;
};

export function OmronWireframeSketchAnimationDeferred({
  alt,
  caption,
}: OmronWireframeSketchAnimationDeferredProps) {
  return (
    <DeferredMount placeholder={<Skeleton className="min-h-[24rem] w-full rounded-xl" aria-hidden />}>
      <OmronWireframeSketchAnimation alt={alt} caption={caption} />
    </DeferredMount>
  );
}
