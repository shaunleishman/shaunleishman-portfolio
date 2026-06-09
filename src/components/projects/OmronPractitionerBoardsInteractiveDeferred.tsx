"use client";

import dynamic from "next/dynamic";
import { DeferredMount } from "@/components/ui/DeferredMount";
import { Skeleton } from "@/components/ui/Skeleton";

const OmronPractitionerBoardsInteractive = dynamic(
  () =>
    import("@/components/projects/OmronPractitionerBoardsInteractive").then((mod) => ({
      default: mod.OmronPractitionerBoardsInteractive,
    })),
  { ssr: false },
);

export function OmronPractitionerBoardsInteractiveDeferred() {
  return (
    <DeferredMount placeholder={<Skeleton className="min-h-[20rem] w-full rounded-xl" aria-hidden />}>
      <OmronPractitionerBoardsInteractive />
    </DeferredMount>
  );
}
