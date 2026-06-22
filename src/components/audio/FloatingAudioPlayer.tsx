"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play, RotateCcw, X } from "lucide-react";
import { useAudioPlayer } from "@/components/audio/AudioPlayerProvider";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function ProgressBar({
  progress,
  onSeek,
}: {
  progress: number;
  onSeek: (ratio: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const pct = `${Math.min(100, Math.max(0, progress * 100))}%`;

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
    if (dragging.current) onSeek(ratioFromClientX(event.clientX));
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
      aria-label="Seek through narration"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={handleKeyDown}
      className="group relative mt-1.5 flex h-3 cursor-pointer touch-none select-none items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
        <div
          className="h-full rounded-full bg-[var(--color-accent)]"
          style={{ width: pct }}
        />
      </div>
      <span
        aria-hidden
        className="absolute size-2.5 -translate-x-1/2 rounded-full bg-[var(--color-accent)] opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
        style={{ left: pct }}
      />
    </div>
  );
}

export function FloatingAudioPlayer() {
  const player = useAudioPlayer();
  const { track, activated, isPlaying, currentTime, duration } = player;

  if (!activated || !track) return null;

  const total = duration || track.duration;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="container-site max-w-3xl px-0">
        <div className="pointer-events-auto flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-white/95 px-3 py-2 shadow-[0_6px_24px_rgb(0_0_0_/_0.12)] backdrop-blur-sm sm:gap-3 motion-safe:animate-[fade-in_0.2s_ease-out]">
          <button
            type="button"
            onClick={() => player.toggle(track)}
            aria-label={isPlaying ? "Pause narration" : "Play narration"}
            aria-pressed={isPlaying}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-white transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            {isPlaying ? (
              <Pause className="size-4 fill-current" aria-hidden />
            ) : (
              <Play className="ml-0.5 size-4 fill-current" aria-hidden />
            )}
          </button>

          <button
            type="button"
            onClick={() => player.rewind(15)}
            aria-label="Rewind 15 seconds"
            className="hidden size-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text-primary)] sm:flex"
          >
            <RotateCcw className="size-3.5" aria-hidden />
          </button>

          {track.thumbnail && (
            <Link
              href={track.href}
              aria-hidden
              tabIndex={-1}
              className="relative hidden size-10 shrink-0 overflow-hidden rounded-lg border border-[var(--color-border)] sm:block"
            >
              <Image src={track.thumbnail} alt="" fill className="object-cover" sizes="40px" />
            </Link>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <Link
                href={track.href}
                className="min-w-0 truncate text-[0.8125rem] font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
              >
                {track.title}
              </Link>
              <span className="shrink-0 text-[0.6875rem] tabular-nums text-[var(--color-text-muted)]">
                {formatTime(currentTime)} / {formatTime(total)}
              </span>
            </div>
            <ProgressBar
              progress={total > 0 ? currentTime / total : 0}
              onSeek={player.seekToRatio}
            />
          </div>

          <button
            type="button"
            onClick={player.cycleRate}
            aria-label={`Playback speed ${player.playbackRate} times`}
            className="hidden min-w-[2.5rem] shrink-0 rounded-full border border-[var(--color-border)] bg-white px-2 py-1 text-[0.6875rem] font-medium tabular-nums text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text-primary)] sm:block"
          >
            {player.playbackRate}&times;
          </button>

          <button
            type="button"
            onClick={player.close}
            aria-label="Close player"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)]"
          >
            <X className="size-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
