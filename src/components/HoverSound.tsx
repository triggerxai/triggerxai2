import { useEffect } from "react";

/**
 * Global subtle hover sound for primary interactive elements.
 * - Disabled on touch / coarse-pointer devices
 * - Respects prefers-reduced-motion
 * - Unlocks audio on first user interaction (autoplay policy)
 * - Uses Web Audio API for reliable, low-latency playback
 * - Throttled per element so re-entering quickly doesn't spam
 */
const HoverSound = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarsePointer || !hasHover || reducedMotion) return;

    const SELECTOR = [
      'a[href]',
      'button',
      '[role="button"]',
      'input[type="submit"]',
      'input[type="button"]',
      '.social-icon',
      '[data-hover-sound]',
    ].join(",");

    const COOLDOWN_MS = 400;
    const DELAY_MS = 50;
    const VOLUME = 0.25;

    const AudioCtx: typeof AudioContext | undefined =
      (window as any).AudioContext || (window as any).webkitAudioContext;

    let audioCtx: AudioContext | null = null;
    let buffer: AudioBuffer | null = null;
    let bufferLoading: Promise<void> | null = null;

    // HTMLAudio fallback pool (used if Web Audio fails)
    const fallbackPool: HTMLAudioElement[] = [];
    let fallbackIdx = 0;
    const FALLBACK_POOL_SIZE = 6;
    const initFallbackPool = () => {
      if (fallbackPool.length) return;
      for (let i = 0; i < FALLBACK_POOL_SIZE; i++) {
        const a = new Audio("/sounds/hover.mp3");
        a.preload = "auto";
        a.volume = VOLUME;
        fallbackPool.push(a);
      }
    };

    const ensureContext = () => {
      if (!AudioCtx) return null;
      if (!audioCtx) {
        try {
          audioCtx = new AudioCtx();
        } catch {
          return null;
        }
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    };

    const loadBuffer = () => {
      const ctx = ensureContext();
      if (!ctx || buffer || bufferLoading) return bufferLoading;
      bufferLoading = fetch("/sounds/hover.mp3")
        .then((r) => r.arrayBuffer())
        .then(
          (data) =>
            new Promise<AudioBuffer>((resolve, reject) => {
              ctx.decodeAudioData(data.slice(0), resolve, reject);
            })
        )
        .then((buf) => {
          buffer = buf;
        })
        .catch(() => {
          // Fall back to HTMLAudio
          initFallbackPool();
        });
      return bufferLoading;
    };

    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      const ctx = ensureContext();
      if (ctx) {
        // Play a silent buffer to fully unlock
        try {
          const silent = ctx.createBuffer(1, 1, 22050);
          const src = ctx.createBufferSource();
          src.buffer = silent;
          src.connect(ctx.destination);
          src.start(0);
        } catch {
          /* noop */
        }
        loadBuffer();
      } else {
        initFallbackPool();
      }
    };

    const interactionEvents = ["pointerdown", "mousedown", "touchstart", "keydown"];
    interactionEvents.forEach((ev) =>
      window.addEventListener(ev, unlock, { capture: true, passive: true })
    );

    const playFallback = () => {
      if (!fallbackPool.length) initFallbackPool();
      const a = fallbackPool[fallbackIdx % fallbackPool.length];
      fallbackIdx++;
      try {
        a.currentTime = 0;
        void a.play().catch(() => {});
      } catch {
        /* noop */
      }
    };

    const play = () => {
      const ctx = audioCtx;
      if (ctx && buffer) {
        try {
          if (ctx.state === "suspended") ctx.resume().catch(() => {});
          const src = ctx.createBufferSource();
          src.buffer = buffer;
          const gain = ctx.createGain();
          gain.gain.value = VOLUME;
          src.connect(gain).connect(ctx.destination);
          src.start(0);
          return;
        } catch {
          /* fall through to fallback */
        }
      }
      playFallback();
    };

    const lastPlayMap = new WeakMap<Element, number>();
    const pendingMap = new WeakMap<Element, number>();

    const onPointerOver = (e: PointerEvent) => {
      if (!unlocked) return;
      if (e.pointerType && e.pointerType !== "mouse") return;

      const target = e.target as Element | null;
      if (!target) return;
      const el = target.closest(SELECTOR) as Element | null;
      if (!el) return;
      if (el.hasAttribute("data-no-hover-sound")) return;
      if ((el as HTMLButtonElement).disabled) return;

      const related = (e as any).relatedTarget as Node | null;
      if (related && el.contains(related)) return;

      const last = lastPlayMap.get(el) ?? 0;
      const now = Date.now();
      if (now - last < COOLDOWN_MS) return;

      const pending = pendingMap.get(el);
      if (pending) window.clearTimeout(pending);

      const handle = window.setTimeout(() => {
        lastPlayMap.set(el, Date.now());
        pendingMap.delete(el);
        play();
      }, DELAY_MS);
      pendingMap.set(el, handle);
    };

    const onPointerOut = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const el = target.closest(SELECTOR) as Element | null;
      if (!el) return;
      const related = (e as any).relatedTarget as Node | null;
      if (related && el.contains(related)) return;
      const pending = pendingMap.get(el);
      if (pending) {
        window.clearTimeout(pending);
        pendingMap.delete(el);
      }
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      interactionEvents.forEach((ev) =>
        window.removeEventListener(ev, unlock, { capture: true } as any)
      );
      if (audioCtx) {
        audioCtx.close().catch(() => {});
        audioCtx = null;
      }
    };
  }, []);

  return null;
};

export default HoverSound;
