import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../loader.css";

// ─── Audio: pre-unlock on first pointer gesture, play on flash ──
let _audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (_audioCtx) return _audioCtx;
  try {
    type W = { webkitAudioContext?: typeof AudioContext };
    const AC =
      window.AudioContext ?? (window as unknown as W).webkitAudioContext;
    if (!AC) return null;
    _audioCtx = new AC();
  } catch {
    /* blocked */
  }
  return _audioCtx;
}

function unlockAudio() {
  const ctx = getAudioCtx();
  if (ctx && ctx.state === "suspended") ctx.resume();
}

function playStartupSound() {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    // If still suspended (no user interaction yet) bail out — don't error
    if (ctx.state === "suspended") {
      ctx.resume();
      return;
    }

    const now = ctx.currentTime;

    // Simple lush reverb via convolver
    const conv = ctx.createConvolver();
    const sr = ctx.sampleRate;
    const ibuf = ctx.createBuffer(2, Math.floor(sr * 3), sr);
    for (let c = 0; c < 2; c++) {
      const d = ibuf.getChannelData(c);
      for (let i = 0; i < d.length; i++)
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.2);
    }
    conv.buffer = ibuf;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.5, now);
    master.connect(ctx.destination);

    const dry = ctx.createGain();
    dry.gain.value = 0.3;
    dry.connect(master);
    const wet = ctx.createGain();
    wet.gain.value = 0.7;
    wet.connect(conv);
    conv.connect(master);

    function voice(
      freq: number,
      type: OscillatorType,
      t0: number,
      t1: number,
      peak: number,
    ) {
      const o = ctx!.createOscillator();
      const g = ctx!.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(0, now + t0);
      g.gain.linearRampToValueAtTime(peak, now + t0 + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, now + t1);
      o.connect(g);
      g.connect(dry);
      g.connect(wet);
      o.start(now + t0);
      o.stop(now + t1 + 0.05);
    }

    // Deep sub
    voice(55, "sine", 0, 2.5, 0.85);
    // E major chord swell
    [164.81, 207.65, 246.94, 329.63, 415.3, 493.88].forEach((f, i) => {
      voice(f, "sine", 0.05 + i * 0.04, 3.8, 0.2);
    });
    // High shimmer
    [1318.5, 2093].forEach((f, i) => {
      voice(f, "sine", 0.25 + i * 0.06, 2.5, 0.05);
    });
  } catch {
    /* audio blocked */
  }
}

type Phase = "loading" | "ready" | "flash" | "exit";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = React.useState<Phase>("loading");
  const [progress, setProgress] = React.useState(0);
  const [soundPreference, setSoundPreference] = React.useState<
    "pending" | "allowed" | "muted"
  >("pending");

  const handleAllowSound = React.useCallback(() => {
    unlockAudio();
    setSoundPreference("allowed");
  }, []);

  const handleMuteSound = React.useCallback(() => {
    setSoundPreference("muted");
  }, []);

  // Lock scrolling while the loader is visible
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  React.useEffect(() => {
    let dead = false;

    if (soundPreference === "pending") {
      return () => {
        dead = true;
      };
    }

    async function run() {
      // Fake progress tick until resources are ready
      let p = 0;
      const tick = setInterval(() => {
        if (dead) return;
        p = Math.min(p + (Math.random() * 6 + 2), 88);
        setProgress(p);
      }, 80);

      // Wait for fonts + full page load in parallel
      await Promise.all([
        document.fonts.ready,
        new Promise<void>((r) => {
          if (document.readyState === "complete") {
            r();
            return;
          }
          window.addEventListener("load", () => r(), { once: true });
        }),
      ]);

      clearInterval(tick);
      if (dead) return;

      // Snap to 100%
      setProgress(100);
      await new Promise((r) => setTimeout(r, 300));
      if (dead) return;

      setPhase("ready");
      await new Promise((r) => setTimeout(r, 220));
      if (dead) return;

      // Flash + optional sound
      if (soundPreference === "allowed") {
        playStartupSound();
      }
      setPhase("flash");
      await new Promise((r) => setTimeout(r, 600));
      if (dead) return;

      setPhase("exit");
      await new Promise((r) => setTimeout(r, 600));
      if (dead) return;

      onDone();
    }

    run();
    return () => {
      dead = true;
    };
  }, [onDone, soundPreference]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="loader"
          className="loader-root"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {soundPreference === "pending" && (
            <motion.div
              className="loader-sound-toast"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="loader-sound-text">Allow startup sound?</p>
              <div className="loader-sound-actions">
                <button
                  type="button"
                  className="loader-sound-btn loader-sound-btn-primary"
                  onClick={handleAllowSound}
                >
                  OK
                </button>
                <button
                  type="button"
                  className="loader-sound-btn"
                  onClick={handleMuteSound}
                >
                  No
                </button>
              </div>
            </motion.div>
          )}

          {/* Progress bar */}
          <div className="loader-bar-wrap">
            <motion.div
              className="loader-bar-fill"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          {/* Label */}
          <div
            className={`loader-label${phase === "ready" || phase === "flash" ? " ready" : ""}`}
          >
            {soundPreference === "pending"
              ? "Awaiting Sound Choice"
              : phase === "ready" || phase === "flash"
                ? "Ready"
                : "Initializing"}
          </div>

          {/* White flash overlay */}
          <motion.div
            className="loader-flash"
            animate={{ opacity: phase === "flash" ? 1 : 0 }}
            transition={{
              duration: phase === "flash" ? 0.08 : 0.55,
              ease: phase === "flash" ? "easeOut" : "easeIn",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
