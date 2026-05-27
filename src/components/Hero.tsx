"use client";

import { useEffect, useRef, useCallback } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  const sampleEdgeColors = useCallback(() => {
    const video = videoRef.current;
    const sticky = stickyRef.current;
    if (!video || !sticky || video.videoWidth === 0) return;

    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
    const canvas = canvasRef.current;
    // Sample at small size for performance
    const sw = 1;
    const sh = video.videoHeight;
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Draw center column of the video
    const centerX = Math.floor(video.videoWidth / 2);
    ctx.drawImage(video, centerX, 0, 1, sh, 0, 0, 1, sh);

    // Sample top pixels (average of top 3)
    const topData = ctx.getImageData(0, 0, 1, 3).data;
    const topR = Math.round((topData[0] + topData[4] + topData[8]) / 3);
    const topG = Math.round((topData[1] + topData[5] + topData[9]) / 3);
    const topB = Math.round((topData[2] + topData[6] + topData[10]) / 3);

    // Sample bottom pixels (average of bottom 3)
    const botData = ctx.getImageData(0, sh - 3, 1, 3).data;
    const botR = Math.round((botData[0] + botData[4] + botData[8]) / 3);
    const botG = Math.round((botData[1] + botData[5] + botData[9]) / 3);
    const botB = Math.round((botData[2] + botData[6] + botData[10]) / 3);

    sticky.style.setProperty("--edge-top", `rgb(${topR},${topG},${topB})`);
    sticky.style.setProperty("--edge-bot", `rgb(${botR},${botG},${botB})`);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.pause();
    video.load();
    video.currentTime = 0;

    let scrollTriggerInstance: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    const init = async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      scrollTriggerInstance = ScrollTrigger;
      gsapModule.gsap.registerPlugin(ScrollTrigger);

      const setupScrub = () => {
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });
      };

      if (video.readyState >= 2) {
        setupScrub();
        sampleEdgeColors();
      } else {
        video.addEventListener("loadeddata", () => {
          setupScrub();
          sampleEdgeColors();
        }, { once: true });
      }
    };

    // Sample colors on each frame seek
    const onSeeked = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(sampleEdgeColors);
    };
    video.addEventListener("seeked", onSeeked);

    init();

    return () => {
      video.removeEventListener("seeked", onSeeked);
      cancelAnimationFrame(rafRef.current);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.getAll().forEach((t) => t.kill());
      }
    };
  }, [sampleEdgeColors]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div
        ref={stickyRef}
        className="sticky top-0 min-h-[100dvh] w-full overflow-hidden bg-black"
        style={{
          ["--edge-top" as string]: "rgb(0,0,0)",
          ["--edge-bot" as string]: "rgb(0,0,0)",
        }}
      >
        {/* Background fill that matches video edge colors */}
        <div className="absolute inset-0 z-[1]" style={{ background: "var(--edge-top)" }} />

        {/* Video — slightly zoomed out on mobile to show more width */}
        <video
          ref={videoRef}
          className="absolute inset-0 z-[2] w-full h-full object-cover max-sm:scale-[1.2] max-sm:object-contain max-sm:video-edge-fade"
          muted
          playsInline
          preload="metadata"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay gradient — warm dark tones */}
        <div className="absolute inset-0 z-[4] bg-gradient-to-b from-charcoal/50 via-transparent to-charcoal/70" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-end min-h-[100dvh] px-6 pb-16 sm:pb-20 text-center">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-warm-white tracking-tight mb-6">
            Grillhaus 214
            <br className="hidden sm:block" />
            <span className="hidden sm:inline text-gold-light italic font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Drehspieß, Yufka, Pide
            </span>
          </h1>
          <p className="text-warm-white/60 text-sm sm:text-base max-w-md mb-12">
            Eppelheim &middot; Hauptstraße 48
          </p>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2 animate-pulse">
            <span className="text-gold-light/40 text-[10px] uppercase tracking-[0.3em]">
              Scroll
            </span>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              className="text-gold-light/40"
            >
              <rect
                x="1"
                y="1"
                width="14"
                height="22"
                rx="7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="8" cy="8" r="2" fill="currentColor">
                <animate
                  attributeName="cy"
                  from="8"
                  to="16"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="1"
                  to="0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
