"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { finiteMediaDuration } from "@/components/audio/format-time";

/**
 * One shared audio element for narrated articles.
 * The article card and the floating bar both control it. Playback continues
 * across page changes because this provider sits in the site layout.
 *
 * The playhead is not React state. `timeupdate` fires several times a second,
 * and storing it here would re-render the header, page, and footer on every
 * tick. `useAudioCurrentTime` subscribes to that clock directly.
 */

export const PLAYBACK_RATES = [1, 1.25, 1.5, 2] as const;

export type AudioTrack = {
  slug: string;
  src: string;
  title: string;
  narrator: string;
  /** Link back to the article this audio belongs to. */
  href: string;
  /** Article thumbnail shown in the floating player. */
  thumbnail?: string;
  /** Normalised waveform peaks (0-100). */
  peaks: number[];
  /** Total duration in seconds (from the generated peaks file). */
  duration: number;
};

type AudioPlayerContextValue = {
  track: AudioTrack | null;
  /** True once playback has been started at least once (drives the floating bar). */
  activated: boolean;
  isPlaying: boolean;
  duration: number;
  playbackRate: number;
  /** Stable subscription for the playhead. Prefer `useAudioCurrentTime`. */
  subscribeTime: (listener: () => void) => () => void;
  getCurrentTime: () => number;
  isActive: (slug: string) => boolean;
  play: (track: AudioTrack, startRatio?: number) => void;
  toggle: (track: AudioTrack) => void;
  seekToRatio: (ratio: number) => void;
  rewind: (seconds?: number) => void;
  cycleRate: () => void;
  close: () => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function useAudioPlayer() {
  const value = useContext(AudioPlayerContext);
  if (!value) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return value;
}

/** Playhead in seconds. Only the controls that draw it re-render on each tick. */
export function useAudioCurrentTime() {
  const { subscribeTime, getCurrentTime } = useAudioPlayer();
  return useSyncExternalStore(subscribeTime, getCurrentTime, getCurrentTime);
}

function clamp01(ratio: number) {
  if (!Number.isFinite(ratio)) return 0;
  return Math.min(1, Math.max(0, ratio));
}

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const loadedSrcRef = useRef<string | null>(null);
  const pendingSeekRef = useRef<number | null>(null);
  const knownDurationRef = useRef(0);
  const rateIndexRef = useRef(0);
  const playRequestRef = useRef(0);
  const currentTimeRef = useRef(0);
  const timeListenersRef = useRef(new Set<() => void>());

  const [track, setTrack] = useState<AudioTrack | null>(null);
  const [activated, setActivated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [rateIndex, setRateIndex] = useState(0);

  const subscribeTime = useCallback((listener: () => void) => {
    const listeners = timeListenersRef.current;
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  const getCurrentTime = useCallback(() => currentTimeRef.current, []);

  const publishTime = useCallback((time: number) => {
    const next = Number.isFinite(time) && time > 0 ? time : 0;
    if (currentTimeRef.current === next) return;
    currentTimeRef.current = next;
    for (const listener of [...timeListenersRef.current]) listener();
  }, []);

  const rememberDuration = useCallback((value: number) => {
    const next = finiteMediaDuration(value);
    if (!next) return 0;
    knownDurationRef.current = next;
    setDuration(next);
    return next;
  }, []);

  const applyPendingSeek = useCallback(
    (media: HTMLAudioElement, nextDuration: number) => {
      const ratio = pendingSeekRef.current;
      if (ratio == null || !nextDuration) return;
      media.currentTime = ratio * nextDuration;
      pendingSeekRef.current = null;
      publishTime(media.currentTime);
    },
    [publishTime],
  );

  useEffect(() => {
    rateIndexRef.current = rateIndex;
    const audio = audioRef.current;
    if (audio) audio.playbackRate = PLAYBACK_RATES[rateIndex];
  }, [rateIndex]);

  const play = useCallback(
    (next: AudioTrack, startRatio?: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      const known = finiteMediaDuration(next.duration);
      if (known) knownDurationRef.current = known;

      if (loadedSrcRef.current !== next.src) {
        // Assign the ratio before `src`. A cached file can fire `loadedmetadata`
        // synchronously, and that listener is what applies the waveform click.
        pendingSeekRef.current = startRatio == null ? null : clamp01(startRatio);
        audio.src = next.src;
        loadedSrcRef.current = next.src;
        setTrack(next);

        const elementDuration = finiteMediaDuration(audio.duration);
        rememberDuration(elementDuration || known);

        if (pendingSeekRef.current == null) {
          // No seek was requested, or the synchronous listener already applied it.
          if (startRatio == null) publishTime(0);
        } else if (elementDuration) {
          audio.currentTime = pendingSeekRef.current * elementDuration;
          pendingSeekRef.current = null;
          publishTime(audio.currentTime);
        } else {
          publishTime(pendingSeekRef.current * (known || 0));
        }
      } else if (startRatio != null) {
        const clamped = clamp01(startRatio);
        const elementDuration = finiteMediaDuration(audio.duration);
        if (elementDuration) {
          pendingSeekRef.current = null;
          audio.currentTime = clamped * elementDuration;
          publishTime(audio.currentTime);
        } else {
          pendingSeekRef.current = clamped;
          publishTime(clamped * (knownDurationRef.current || 0));
        }
      } else if (audio.ended) {
        pendingSeekRef.current = null;
        audio.currentTime = 0;
        publishTime(0);
      }

      audio.playbackRate = PLAYBACK_RATES[rateIndexRef.current];
      const request = ++playRequestRef.current;
      // `void` does not swallow a rejection. An interrupted play() rejects, and a
      // newer request must not be marked paused by the older one.
      void audio.play().catch(() => {
        if (playRequestRef.current === request) setIsPlaying(false);
      });
      setActivated(true);
    },
    [publishTime, rememberDuration],
  );

  const toggle = useCallback(
    (next: AudioTrack) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (loadedSrcRef.current === next.src && !audio.paused) {
        audio.pause();
      } else {
        play(next);
      }
    },
    [play],
  );

  const seekToRatio = useCallback(
    (ratio: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const clamped = clamp01(ratio);
      const total = finiteMediaDuration(audio.duration);
      if (!total) {
        // Metadata is not in yet. Keep the ratio and show the peaks-file estimate.
        pendingSeekRef.current = clamped;
        publishTime(clamped * (knownDurationRef.current || 0));
        return;
      }
      pendingSeekRef.current = null;
      audio.currentTime = clamped * total;
      publishTime(audio.currentTime);
    },
    [publishTime],
  );

  const rewind = useCallback(
    (seconds = 15) => {
      const audio = audioRef.current;
      if (!audio) return;
      const total = finiteMediaDuration(audio.duration);
      if (!total) {
        const estimate = knownDurationRef.current;
        const next = Math.max(0, currentTimeRef.current - seconds);
        pendingSeekRef.current = estimate ? clamp01(next / estimate) : 0;
        publishTime(next);
        return;
      }
      audio.currentTime = Math.max(0, audio.currentTime - seconds);
      publishTime(audio.currentTime);
    },
    [publishTime],
  );

  const cycleRate = useCallback(() => {
    setRateIndex((index) => {
      const next = (index + 1) % PLAYBACK_RATES.length;
      // play() reads the ref, and it can run before this render's effect.
      rateIndexRef.current = next;
      return next;
    });
  }, []);

  const close = useCallback(() => {
    const audio = audioRef.current;
    if (audio) audio.pause();
    setActivated(false);
    setIsPlaying(false);
  }, []);

  const isActive = useCallback((slug: string) => track?.slug === slug, [track]);

  const value = useMemo<AudioPlayerContextValue>(
    () => ({
      track,
      activated,
      isPlaying,
      duration,
      playbackRate: PLAYBACK_RATES[rateIndex],
      subscribeTime,
      getCurrentTime,
      isActive,
      play,
      toggle,
      seekToRatio,
      rewind,
      cycleRate,
      close,
    }),
    [
      track,
      activated,
      isPlaying,
      duration,
      rateIndex,
      subscribeTime,
      getCurrentTime,
      isActive,
      play,
      toggle,
      seekToRatio,
      rewind,
      cycleRate,
      close,
    ],
  );

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(event) => {
          const media = event.currentTarget;
          applyPendingSeek(media, rememberDuration(media.duration));
        }}
        onDurationChange={(event) => {
          const media = event.currentTarget;
          // Duration can arrive after loadedmetadata (it is NaN on the first event
          // for some files). Apply a waveform click that is still waiting.
          applyPendingSeek(media, rememberDuration(media.duration));
        }}
        onTimeUpdate={(event) => publishTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </AudioPlayerContext.Provider>
  );
}
