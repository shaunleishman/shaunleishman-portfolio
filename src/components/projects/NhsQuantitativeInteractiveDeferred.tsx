"use client";

import dynamic from "next/dynamic";
import { DeferredMount } from "@/components/ui/DeferredMount";
import { Skeleton } from "@/components/ui/Skeleton";

const NhsQuantitativeInteractive = dynamic(
  () =>
    import("@/components/projects/NhsQuantitativeInteractive").then((mod) => ({
      default: mod.NhsQuantitativeInteractive,
    })),
  { ssr: false },
);

export function NhsQuantitativeInteractiveDeferred() {
  return (
    <DeferredMount placeholder={<Skeleton className="min-h-[24rem] w-full rounded-xl" aria-hidden />}>
      <NhsQuantitativeInteractive />
    </DeferredMount>
  );
}
