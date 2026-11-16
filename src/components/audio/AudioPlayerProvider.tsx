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
  isActive: (slug: string) => boolean;
  play: (track: AudioTrack, startRatio?: number) => void;
  toggle: (track: AudioTrack) => void;
  seekToRatio: (ratio: number) => void;
  rewind: (seconds?: number) => void;
  cycleRate: () => void;
  close: () => void;
};

// The playhead is not React state. timeupdate would otherwise re-render the
// provider and every layout child for the whole time the narration is playing.
const audioTimeListeners = new Set<() => void>();
let audioCurrentTime = 0;

function subscribeAudioCurrentTime(listener: () => void) {
  audioTimeListeners.add(listener);
  return () => audioTimeListeners.delete(listener);
}

function getAudioCurrentTime() {
  return audioCurrentTime;
}

function getServerAudioCurrentTime() {
  return 0;
}

function publishAudioCurrentTime(next: number) {
  const time = Number.isFinite(next) && next > 0 ? next : 0;
  if (Object.is(time, audioCurrentTime)) return;
  audioCurrentTime = time;
  audioTimeListeners.forEach((listener) => listener());
}

export function useAudioCurrentTime() {
  return useSyncExternalStore(
    subscribeAudioCurrentTime,
    getAudioCurrentTime,
    getServerAudioCurrentTime,
  );
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function useAudioPlayer() {
  const value = useContext(AudioPlayerContext);
  if (!value) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return value;
}

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const loadedSrcRef = useRef<string | null>(null);
  const pendingSeekRef = useRef<number | null>(null);

  const [track, setTrack] = useState<AudioTrack | null>(null);
  const [activated, setActivated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [rateIndex, setRateIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.playbackRate = PLAYBACK_RATES[rateIndex];
  }, [rateIndex]);

  const play = useCallback(
    (next: AudioTrack, startRatio?: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (loadedSrcRef.current !== next.src) {
        // Assign the ratio first. A cached file fires loadedmetadata inside
        // the src setter, before the next line would have stored it.
        pendingSeekRef.current = startRatio ?? null;
        audio.src = next.src;
        loadedSrcRef.current = next.src;
        setTrack(next);
        setDuration(next.duration || 0);
        if (pendingSeekRef.current == null) {
          if (startRatio == null) publishAudioCurrentTime(0);
        } else if (next.duration && startRatio != null) {
          const clamped = Math.min(1, Math.max(0, startRatio));
          publishAudioCurrentTime(clamped * next.duration);
        }
      } else if (startRatio != null) {
        const clamped = Math.min(1, Math.max(0, startRatio));
        if (audio.duration) {
          audio.currentTime = clamped * audio.duration;
          publishAudioCurrentTime(audio.currentTime);
        } else {
          pendingSeekRef.current = clamped;
          if (next.duration) publishAudioCurrentTime(clamped * next.duration);
        }
      }

      audio.playbackRate = PLAYBACK_RATES[rateIndex];
      void audio.play().catch(() => {
        // Autoplay can reject. The play and pause events own isPlaying.
      });
      setActivated(true);
    },
    [rateIndex],
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
      const clamped = Math.min(1, Math.max(0, ratio));
      const total = audio.duration || 0;
      if (!total) {
        pendingSeekRef.current = clamped;
        if (duration) publishAudioCurrentTime(clamped * duration);
        return;
      }
      audio.currentTime = clamped * total;
      publishAudioCurrentTime(audio.currentTime);
    },
    [duration],
  );

  const rewind = useCallback((seconds = 15) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - seconds);
    publishAudioCurrentTime(audio.currentTime);
  }, []);

  const cycleRate = useCallback(() => {
    setRateIndex((index) => (index + 1) % PLAYBACK_RATES.length);
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
          const audio = event.currentTarget;
          setDuration(audio.duration);
          if (pendingSeekRef.current != null && audio.duration) {
            audio.currentTime = pendingSeekRef.current * audio.duration;
            pendingSeekRef.current = null;
            publishAudioCurrentTime(audio.currentTime);
          }
        }}
        onTimeUpdate={(event) => publishAudioCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </AudioPlayerContext.Provider>
  );
}
