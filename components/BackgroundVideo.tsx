"use client";

// Background video with bullet-proof mobile autoplay.
//
// iOS Safari quirks this component fixes:
//  - LOW POWER MODE blocks every <video autoplay>, no exceptions. We can't
//    override it — but we can hide the video element until it actually plays
//    so iOS never gets a chance to draw its "Tap to play" overlay button.
//  - iOS sometimes silently rejects the initial autoplay attempt on a cold
//    cellular start. We retry on every reasonable signal: timed retries,
//    loadedmetadata / canplay / canplaythrough, IntersectionObserver, page
//    visibility, page focus, AND any user input (touchstart/touchend/click/
//    pointerdown/scroll/keydown). The first one that succeeds wins.
//  - iOS may reset `muted` between SPA navigations. Force-mute on mount.
//  - A `poster` attribute renders a tappable play overlay until the video
//    starts. We don't use it — we render a separate <img> as a fallback
//    that fades out when the video begins playing.
//
// The fallbackImage MUST be a still WebP frame from the same video. Generate
// with:
//   ffmpeg -ss 1.5 -i input.webm -frames:v 1 /tmp/p.png
//   cwebp -q 80 /tmp/p.png -o public/assets/<name>-poster.webp

import { useEffect, useRef, useState } from "react";

interface Props {
  /** Primary WebM source */
  src: string;
  /** Optional fallback WebM source */
  fallbackSrc?: string;
  /**
   * Static WebP frame shown until the video starts playing. Stays visible
   * if iOS blocks autoplay (Low Power Mode etc.) so the user never sees a
   * play-button overlay.
   */
  fallbackImage?: string;
  className?: string;
  /**
   * `auto` preloads the whole file (best for above-the-fold heroes).
   * `metadata` for below-the-fold so we don't burn bandwidth.
   */
  preload?: "auto" | "metadata" | "none";
}

export default function BackgroundVideo({
  src,
  fallbackSrc,
  fallbackImage,
  className = "absolute inset-0 w-full h-full object-cover",
  preload = "auto",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // Force-mute (some iOS versions reset this between page transitions).
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");

    let cancelled = false;
    let started = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const tryPlay = () => {
      if (cancelled || started) return;
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          if (cancelled) return;
          started = true;
          setPlaying(true);
          removeUserListeners();
        }).catch(() => {
          /* will retry from another trigger */
        });
      }
    };

    // Initial attempt + spaced retries — covers cases where iOS rejects
    // the very first call but accepts a slightly delayed one once the
    // page is fully painted.
    tryPlay();
    [50, 200, 500, 1500, 3000].forEach((ms) => {
      timers.push(setTimeout(tryPlay, ms));
    });

    // Reflect real playback state — only flip "playing" once frames hit
    // the screen.
    const onPlaying = () => {
      started = true;
      setPlaying(true);
      removeUserListeners();
    };
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);

    // Retry as soon as the browser has any data
    const onLoaded = () => tryPlay();
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("loadeddata", onLoaded);
    v.addEventListener("canplay", onLoaded);
    v.addEventListener("canplaythrough", onLoaded);

    // Retry on any user input — these synchronously inherit the user-
    // activation state, which iOS Safari requires under Low Power Mode.
    const userEvents = [
      "touchstart",
      "touchend",
      "pointerdown",
      "click",
      "scroll",
      "keydown",
      "wheel",
    ] as const;
    const onGesture = () => tryPlay();
    userEvents.forEach((ev) =>
      window.addEventListener(ev, onGesture, { passive: true })
    );
    const removeUserListeners = () => {
      userEvents.forEach((ev) => window.removeEventListener(ev, onGesture));
    };

    // Retry whenever the page becomes visible / focused again
    const onVis = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", onGesture);
    window.addEventListener("focus", onGesture);

    // Retry whenever the video element enters the viewport (covers
    // below-the-fold heroes that aren't visible at mount time).
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) tryPlay();
          });
        },
        { threshold: 0.05 }
      );
      io.observe(v);
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("loadeddata", onLoaded);
      v.removeEventListener("canplay", onLoaded);
      v.removeEventListener("canplaythrough", onLoaded);
      removeUserListeners();
      window.removeEventListener("pageshow", onGesture);
      window.removeEventListener("focus", onGesture);
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, []);

  return (
    <>
      {fallbackImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fallbackImage}
          alt=""
          aria-hidden="true"
          className={className}
          style={{
            opacity: playing ? 0 : 1,
            transition: "opacity 600ms ease-out",
            pointerEvents: "none",
          }}
        />
      )}
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        controls={false}
        disablePictureInPicture
        // No poster — iOS shows a play-button overlay until the video starts.
        className={className}
        style={{
          opacity: playing ? 1 : 0,
          transition: "opacity 600ms ease-out",
          // Block taps on the video element so iOS never shows its native
          // play overlay (the gesture listener on `window` still fires).
          pointerEvents: "none",
        }}
      >
        <source src={src} type="video/webm" />
        {fallbackSrc && <source src={fallbackSrc} type="video/webm" />}
      </video>
    </>
  );
}
