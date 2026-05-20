import { Chess, Move } from "chess.js";

const SOUND_PREF_KEY = "offline-chess-sound-enabled";

/** Master volume (0–1). Chess.com-style clips play at this level. */
export const MASTER_VOLUME = 0.6;

type SoundKind =
  | "move"
  | "capture"
  | "check"
  | "castle"
  | "promote"
  | "victory"
  | "undo";

/** Lichess standard set has no Castle/Promote MP3s — reuse move/capture clips. */
const SAMPLE_PATHS: Record<SoundKind, string> = {
  move: "/sounds/move.mp3",
  capture: "/sounds/capture.mp3",
  check: "/sounds/check.mp3",
  castle: "/sounds/move.mp3",
  promote: "/sounds/capture.mp3",
  victory: "/sounds/victory.mp3",
  undo: "/sounds/move.mp3"
};

let audioContext: AudioContext | null = null;
const sampleCache = new Map<SoundKind, HTMLAudioElement>();
const sampleReady = new Map<SoundKind, boolean>();

let soundEnabled = true;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

export function loadSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;

  try {
    const value = window.localStorage.getItem(SOUND_PREF_KEY);
    if (value === null) return true;
    return value === "true";
  } catch {
    return true;
  }
}

export function saveSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(SOUND_PREF_KEY, String(enabled));
  } catch {
    // Ignore storage errors.
  }
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  saveSoundEnabled(enabled);
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function initSoundPreference(): void {
  soundEnabled = loadSoundEnabled();
  preloadSamples();
}

function preloadSamples(): void {
  if (typeof window === "undefined") return;

  const loadedPaths = new Set<string>();

  (Object.keys(SAMPLE_PATHS) as SoundKind[]).forEach((kind) => {
    const path = SAMPLE_PATHS[kind];
    if (loadedPaths.has(path)) {
      const existing = sampleCache.get(
        (Object.keys(SAMPLE_PATHS) as SoundKind[]).find(
          (k) => SAMPLE_PATHS[k] === path
        )!
      );
      if (existing) sampleCache.set(kind, existing);
      return;
    }
    loadedPaths.add(path);

    const audio = new Audio(path);
    audio.preload = "auto";
    audio.volume = MASTER_VOLUME;

    const markReady = () => {
      sampleReady.set(kind, true);
      (Object.keys(SAMPLE_PATHS) as SoundKind[])
        .filter((k) => SAMPLE_PATHS[k] === path)
        .forEach((k) => sampleReady.set(k, true));
    };
    audio.addEventListener("canplaythrough", markReady, { once: true });
    audio.addEventListener("error", () => sampleReady.set(kind, false), {
      once: true
    });

    sampleCache.set(kind, audio);
    audio.load();
  });
}

async function resumeAudioContext(): Promise<void> {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    await ctx.resume();
  }
}

/** Short wooden tap (Chess.com-like) via filtered noise — works offline. */
function playWoodTap(options: {
  pitchHz?: number;
  durationSec?: number;
  volume?: number;
}): void {
  const ctx = getAudioContext();
  const duration = options.durationSec ?? 0.07;
  const pitchHz = options.pitchHz ?? 1100;
  const length = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const channel = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / length;
    const envelope = Math.exp(-t * 14);
    const noise = Math.random() * 2 - 1;
    const tone =
      Math.sin((2 * Math.PI * pitchHz * i) / ctx.sampleRate) * 0.25;
    channel[i] = (noise * 0.9 + tone) * envelope;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 350;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = pitchHz * 2.2;
  lowpass.Q.value = 0.9;

  const gain = ctx.createGain();
  const peak = Math.min((options.volume ?? 1) * MASTER_VOLUME, 1);
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(peak, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  source.connect(highpass);
  highpass.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
}

function playSample(kind: SoundKind): boolean {
  if (!soundEnabled || !sampleReady.get(kind)) return false;

  const cached = sampleCache.get(kind);
  if (!cached) return false;

  try {
    const audio = cached.cloneNode(true) as HTMLAudioElement;
    audio.volume = MASTER_VOLUME;
    audio.currentTime = 0;
    void audio.play();
    return true;
  } catch {
    return false;
  }
}

function playWood(kind: SoundKind): void {
  if (playSample(kind)) return;

  switch (kind) {
    case "move":
      playWoodTap({ pitchHz: 1200, durationSec: 0.055, volume: 1 });
      break;
    case "capture":
      playWoodTap({ pitchHz: 750, durationSec: 0.085, volume: 1.25 });
      break;
    case "check":
      playWoodTap({ pitchHz: 1650, durationSec: 0.07, volume: 1.15 });
      break;
    case "castle":
      playWoodTap({ pitchHz: 1000, durationSec: 0.05, volume: 0.95 });
      window.setTimeout(
        () => playWoodTap({ pitchHz: 1150, durationSec: 0.05, volume: 0.9 }),
        45
      );
      break;
    case "promote":
      playWoodTap({ pitchHz: 950, durationSec: 0.09, volume: 1.1 });
      break;
    case "victory":
      playWoodTap({ pitchHz: 600, durationSec: 0.1, volume: 1.2 });
      window.setTimeout(
        () => playWoodTap({ pitchHz: 800, durationSec: 0.1, volume: 1.1 }),
        90
      );
      window.setTimeout(
        () => playWoodTap({ pitchHz: 1000, durationSec: 0.12, volume: 1.15 }),
        180
      );
      break;
    case "undo":
      playWoodTap({ pitchHz: 900, durationSec: 0.05, volume: 0.75 });
      break;
  }
}

function resolveMoveSound(game: Chess, move: Move): SoundKind {
  if (game.isCheckmate()) return "victory";
  if (game.isStalemate() || game.isDraw()) return "victory";
  if (move.flags.includes("p")) return "promote";
  if (move.flags.includes("k") || move.flags.includes("q")) return "castle";
  if (move.captured) return "capture";
  if (game.isCheck()) return "check";
  return "move";
}

export async function playMoveSound(game: Chess, move: Move): Promise<void> {
  if (!soundEnabled) return;
  await resumeAudioContext();
  playWood(resolveMoveSound(game, move));
}

export async function playUndoSound(): Promise<void> {
  if (!soundEnabled) return;
  await resumeAudioContext();
  playWood("undo");
}
