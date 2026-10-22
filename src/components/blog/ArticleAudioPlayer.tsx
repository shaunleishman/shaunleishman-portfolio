"use client";

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import {
  useAudioCurrentTime,
  useAudioPlayer,
  type AudioTrack,
} from "@/components/audio/AudioPlayerProvider";
import { finiteMediaDuration, formatPlaybackTime } from "@/components/audio/format-time";
import { Waveform } from "@/components/audio/Waveform";
import { cn } from "@/lib/utils";

type WaveformData = { duration: number; peaks: number[] };

/**
 * Peaks for the session. The file is static, and navigating back to an article
 * should not wait on the network before the same waveform can draw.
 */
const waveformCache = new Map<string, WaveformData>();
const waveformListeners = new Set<() => void>();

function subscribeWaveform(listener: () => void) {
  waveformListeners.add(listener);
  return () => waveformListeners.delete(listener);
}

function getServerWaveform() {
  return null;
}

function storeWaveform(url: string, data: WaveformData) {
  waveformCache.set(url, data);
  for (const listener of [...waveformListeners]) listener();
}

/**
 * `/audio/post.m4a` -> `/audio/post.peaks.json`.
 * Query strings are ignored so a cache-busted audio URL still finds its peaks.
 */
export function peaksUrlFor(src: string) {
  const path = src.split(/[?#]/, 1)[0];
  return `${path.replace(/\.[^/.]+$/, "")}.peaks.json`;
}

function parseWaveform(json: unknown): WaveformData | null {
  if (Array.isArray(json)) {
    if (!isPeakList(json)) return null;
    return { duration: 0, peaks: json };
  }
  if (!json || typeof json !== "object") return null;
  const record = json as { duration?: unknown; peaks?: unknown };
  if (!isPeakList(record.peaks)) return null;
  const duration = finiteMediaDuration(
    typeof record.duration === "number" ? record.duration : 0,
  );
  return { duration, peaks: record.peaks };
}

function isPeakList(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((peak) => typeof peak === "number" && Number.isFinite(peak))
  );
}

type ArticleAudioPlayerProps = {
  src: string;
  slug: string;
  title: string;
  /** Link back to the article (used by the floating player). */
  href: string;
  /** Article thumbnail (shown in the floating player). */
  thumbnail?: string;
  narrator?: string;
  className?: string;
};

export function ArticleAudioPlayer({
  src,
  slug,
  title,
  href,
  thumbnail,
  narrator = "Read by Shaun Leishman",
  className,
}: ArticleAudioPlayerProps) {
  const player = useAudioPlayer();
  const peaksUrl = useMemo(() => peaksUrlFor(src), [src]);
  // The snapshot is the cached object for this URL, or null. A reused instance
  // cannot show another article's peaks, and the server render stays empty.
  const getWaveform = useCallback(() => waveformCache.get(peaksUrl) ?? null, [peaksUrl]);
  const data = useSyncExternalStore(subscribeWaveform, getWaveform, getServerWaveform);

  useEffect(() => {
    if (waveformCache.has(peaksUrl)) return;

    const controller = new AbortController();
    let cancelled = false;
    fetch(peaksUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("No waveform");
        return response.json();
      })
      .then((json: unknown) => {
        if (cancelled) return;
        const parsed = parseWaveform(json);
        if (!parsed) return;
        storeWaveform(peaksUrl, parsed);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [peaksUrl]);

  const track = useMemo<AudioTrack | null>(() => {
    if (!data) return null;
    return {
      slug,
      src,
      title,
      narrator,
      href,
      thumbnail,
      peaks: data.peaks,
      duration: data.duration,
    };
  }, [data, slug, src, title, narrator, href, thumbnail]);

  if (!data || !track) return null;

  const active = player.isActive(slug);
  const isPlaying = active && player.isPlaying;

  return (
    <section
      aria-label="Listen to this article"
      className={cn("not-prose surface-muted p-4 sm:p-5", className)}
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => player.toggle(track)}
          aria-label={isPlaying ? "Pause narration" : "Play narration"}
          aria-pressed={isPlaying}
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-white transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          {isPlaying ? (
            <Pause className="size-5 fill-current" aria-hidden />
          ) : (
            <Play className="ml-0.5 size-5 fill-current" aria-hidden />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-label text-[var(--color-text-muted)]">Listen to this article</p>
              <p className="truncate text-body-sm font-medium text-[var(--color-text-primary)]">
                {narrator}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => (active ? player.rewind(15) : player.play(track))}
                aria-label="Rewind 15 seconds"
                className="flex size-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text-primary)]"
              >
                <RotateCcw className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={player.cycleRate}
                aria-label={`Playback speed ${player.playbackRate} times`}
                className="min-w-[3rem] rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-body-sm font-medium tabular-nums text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text-primary)]"
              >
                {player.playbackRate}&times;
              </button>
            </div>
          </div>

          <ArticleTimeline
            active={active}
            peaks={data.peaks}
            fallbackDuration={data.duration}
            onSeek={(ratio) => (active ? player.seekToRatio(ratio) : player.play(track, ratio))}
          />
        </div>
      </div>
    </section>
  );
}

function ArticleTimeline({
  active,
  peaks,
  fallbackDuration,
  onSeek,
}: {
  active: boolean;
  peaks: number[];
  fallbackDuration: number;
  onSeek: (ratio: number) => void;
}) {
  const player = useAudioPlayer();
  const clock = useAudioCurrentTime();
  const currentTime = active ? clock : 0;
  const duration =
    active && finiteMediaDuration(player.duration) ? player.duration : fallbackDuration;
  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="mt-3 flex items-center gap-3">
      <span className="w-10 shrink-0 text-body-sm tabular-nums text-[var(--color-text-muted)]">
        {formatPlaybackTime(currentTime)}
      </span>
      <Waveform
        peaks={peaks}
        progress={progress}
        onSeek={onSeek}
        ariaLabel="Seek through narration"
        className="flex-1"
      />
      <span className="w-10 shrink-0 text-right text-body-sm tabular-nums text-[var(--color-text-muted)]">
        {formatPlaybackTime(duration)}
      </span>
    </div>
  );
}
