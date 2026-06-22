"use client";

import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type WaveformProps = {
  peaks: number[];
  /** Playback progress, 0-1. */
  progress: number;
  onSeek: (ratio: number) => void;
  className?: string;
  ariaLabel?: string;
  /** Target number of bars to render; source peaks are downsampled to fit. */
  maxBars?: number;
};

/** Reduce a peaks array to at most `count` bars by taking the max of each block. */
function resample(peaks: number[], count: number) {
  if (peaks.length <= count) return peaks;
  const out = new Array<number>(count);
  const block = peaks.length / count;
  for (let i = 0; i < count; i++) {
    const start = Math.floor(i * block);
    const end = Math.floor((i + 1) * block);
    let max = 0;
    for (let j = start; j < end; j++) {
      if (peaks[j] > max) max = peaks[j];
    }
    out[i] = max;
  }
  return out;
}

export function Waveform({
  peaks,
  progress,
  onSeek,
  className,
  ariaLabel = "Seek",
  maxBars = 100,
}: WaveformProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bars = useMemo(() => resample(peaks, maxBars), [peaks, maxBars]);
  const dragging = useRef(false);
  const [hover, setHover] = useState<number | null>(null);

  const ratioFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    ref.current?.setPointerCapture(event.pointerId);
    onSeek(ratioFromClientX(event.clientX));
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const ratio = ratioFromClientX(event.clientX);
    setHover(ratio);
    if (dragging.current) onSeek(ratio);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    ref.current?.releasePointerCapture(event.pointerId);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onSeek(Math.min(1, progress + 0.02));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onSeek(Math.max(0, progress - 0.02));
    } else if (event.key === "Home") {
      event.preventDefault();
      onSeek(0);
    } else if (event.key === "End") {
      event.preventDefault();
      onSeek(1);
    }
  };

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => setHover(null)}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex h-10 cursor-pointer touch-none select-none items-center gap-[2px] overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]",
        className,
      )}
    >
      {bars.map((peak, index) => {
        const barRatio = (index + 0.5) / bars.length;
        const played = barRatio <= progress;
        const hovered = hover != null && barRatio <= hover;
        const background = played
          ? "var(--color-accent)"
          : hovered
            ? "color-mix(in srgb, var(--color-accent) 35%, var(--color-border))"
            : "var(--color-border)";
        return (
          <span
            key={index}
            aria-hidden
            className="min-w-0 flex-1 rounded-full transition-colors"
            style={{ height: `${Math.max(8, peak)}%`, backgroundColor: background }}
          />
        );
      })}
    </div>
  );
}
