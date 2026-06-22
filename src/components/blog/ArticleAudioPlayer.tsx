"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useAudioPlayer, type AudioTrack } from "@/components/audio/AudioPlayerProvider";
import { Waveform } from "@/components/audio/Waveform";
import { cn } from "@/lib/utils";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

type WaveformData = { duration: number; peaks: number[] };

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
  const [data, setData] = useState<WaveformData | null>(null);

  const peaksUrl = useMemo(() => src.replace(/\.[^/.]+$/, ".peaks.json"), [src]);

  useEffect(() => {
    let cancelled = false;
    fetch(peaksUrl)
      .then((response) => {
        if (!response.ok) throw new Error("No waveform");
        return response.json();
      })
      .then((json) => {
        if (cancelled) return;
        if (Array.isArray(json)) {
          setData({ duration: 0, peaks: json });
        } else {
          setData({ duration: json.duration ?? 0, peaks: json.peaks ?? [] });
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
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
  const currentTime = active ? player.currentTime : 0;
  const duration = active && player.duration ? player.duration : data.duration;
  const progress = duration > 0 ? currentTime / duration : 0;
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

          <div className="mt-3 flex items-center gap-3">
            <span className="w-10 shrink-0 text-body-sm tabular-nums text-[var(--color-text-muted)]">
              {formatTime(currentTime)}
            </span>
            <Waveform
              peaks={data.peaks}
              progress={progress}
              onSeek={(ratio) => (active ? player.seekToRatio(ratio) : player.play(track, ratio))}
              ariaLabel="Seek through narration"
              className="flex-1"
            />
            <span className="w-10 shrink-0 text-right text-body-sm tabular-nums text-[var(--color-text-muted)]">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
