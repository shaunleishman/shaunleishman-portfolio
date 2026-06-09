"use client";

import dynamic from "next/dynamic";
import { DeferredMount } from "@/components/ui/DeferredMount";
import { Skeleton } from "@/components/ui/Skeleton";

const NhsPersonasInteractive = dynamic(
  () =>
    import("@/components/projects/NhsPersonasInteractive").then((mod) => ({
      default: mod.NhsPersonasInteractive,
    })),
  { ssr: false },
);

export function NhsPersonasInteractiveDeferred() {
  return (
    <DeferredMount placeholder={<Skeleton className="min-h-[28rem] w-full rounded-xl" aria-hidden />}>
      <NhsPersonasInteractive />
    </DeferredMount>
  );
}
