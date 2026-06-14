"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_FRAME_COUNT = 240;
const MOBILE_FRAME_COUNT = 149;

const currentFrame = (index: number, isMobile: boolean) => {
  const folder = isMobile ? "mobile" : "desktop";

  return `/images/nerea-hero/${folder}/frame_${String(index + 1).padStart(
    6,
    "0",
  )}.webp`;
};

export default function NereaHeroSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ frame: 0 });
  const hasPlayedMobileRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;

    if (!canvas || !section) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const isMobile = window.innerWidth < 768;
    const frameCount = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;

    imagesRef.current = [];
    frameRef.current.frame = 0;

    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      raf = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);
    }

    const setCanvasSize = () => {
      const dpr = isMobile
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    };

    const render = () => {
      const image = imagesRef.current[Math.round(frameRef.current.frame)];

      if (!image || !image.complete || image.naturalWidth === 0) return;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const canvasRatio = window.innerWidth / window.innerHeight;
      const imageRatio = image.width / image.height;

      let drawWidth = window.innerWidth;
      let drawHeight = window.innerHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imageRatio > canvasRatio) {
        drawHeight = window.innerHeight;
        drawWidth = drawHeight * imageRatio;
        offsetX = (window.innerWidth - drawWidth) / 2;
      } else {
        drawWidth = window.innerWidth;
        drawHeight = drawWidth / imageRatio;
        offsetY = (window.innerHeight - drawHeight) / 2;
      }

      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    };

    const updateTextByProgress = (progress: number) => {
      const startText = document.getElementById("hero-start-text");
      const finalText = document.getElementById("hero-final-text");
      const scrollIndicator = document.getElementById("hero-scroll-indicator");

      if (!startText || !finalText || !scrollIndicator) return;

      const startOpacity = gsap.utils.clamp(0, 1, 1 - progress / 0.22);
      const startY = gsap.utils.interpolate(0, -90, progress / 0.22);

      gsap.set(startText, {
        opacity: startOpacity,
        y: startY,
        filter: `blur(${gsap.utils.interpolate(0, 8, progress / 0.28)}px)`,
      });

      gsap.set(scrollIndicator, {
        opacity: gsap.utils.clamp(0, 1, 1 - progress / 0.15),
      });

      const finalProgress = gsap.utils.clamp(0, 1, (progress - 0.58) / 0.22);

      gsap.set(finalText, {
        opacity: finalProgress,
        y: gsap.utils.interpolate(90, 0, finalProgress),
        scale: gsap.utils.interpolate(0.94, 1, finalProgress),
        filter: `blur(${gsap.utils.interpolate(14, 0, finalProgress)}px)`,
      });
    };

    setCanvasSize();

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i, isMobile);
      imagesRef.current[i] = img;

      img.onload = () => {
        if (i === 0) {
          render();
          updateTextByProgress(0);
        }
      };
    }

    let tween: gsap.core.Tween | null = null;

    if (isMobile) {
      gsap.set(section, { height: "100svh" });
      updateTextByProgress(0);

      const playMobileHero = () => {
        if (hasPlayedMobileRef.current) return;

        hasPlayedMobileRef.current = true;

        gsap.to(frameRef.current, {
          frame: frameCount - 1,
          duration: 3.8,
          ease: "power2.inOut",
          snap: "frame",
          onUpdate: () => {
            render();
            updateTextByProgress(frameRef.current.frame / (frameCount - 1));
          },
          onComplete: () => {
            updateTextByProgress(1);
          },
        });
      };

      section.addEventListener("touchstart", playMobileHero, { passive: true });
      section.addEventListener("click", playMobileHero);

      const handleResize = () => {
        setCanvasSize();
        render();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        section.removeEventListener("touchstart", playMobileHero);
        section.removeEventListener("click", playMobileHero);
        window.removeEventListener("resize", handleResize);
      };
    }

    tween = gsap.to(frameRef.current, {
      frame: frameCount - 1,
      ease: "none",
      snap: "frame",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      onUpdate: function () {
        render();
        updateTextByProgress(this.progress());
      },
    });

    const handleResize = () => {
      setCanvasSize();
      render();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      tween?.kill();
      window.removeEventListener("resize", handleResize);

      if (raf) {
        gsap.ticker.remove(raf);
      }

      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-svh bg-black md:h-[500vh]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-svh overflow-hidden md:h-screen"
      >
        <canvas ref={canvasRef} className="h-full w-full" />

        <div className="pointer-events-none absolute inset-0 bg-black/25" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

        <div
          id="hero-start-text"
          className="absolute inset-0 flex items-center px-6 md:px-20"
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.38em] text-white/60 md:text-sm md:tracking-[0.45em]">
              Fethiye Mediterranean House
            </p>

            <h1 className="mt-6 max-w-3xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-white md:text-8xl">
              Some evenings <br />
              become memories.
            </h1>
          </div>
        </div>

        <div
          id="hero-final-text"
          className="absolute inset-0 flex items-end justify-center px-6 pb-20 opacity-0 md:items-center md:pb-0"
        >
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.45em] text-white/60 md:tracking-[0.55em]">
              Mediterranean House
            </p>

            <h2 className="mt-5 text-6xl font-light tracking-[-0.08em] text-white md:text-9xl">
              NEREA
            </h2>

            <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-white/70 md:max-w-xl md:text-base">
              An intimate seaside dining experience above the moonlit
              Mediterranean.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#reservation"
                className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition duration-300 hover:bg-white/85"
              >
                Reserve Your Table
              </a>

              <a
                href="#experience"
                className="rounded-full border border-white/30 px-7 py-3 text-sm font-medium text-white transition duration-300 hover:border-white/70 hover:bg-white/10"
              >
                Explore Experience
              </a>
            </div>
          </div>
        </div>

        <div
          id="hero-scroll-indicator"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">
            Tap / Scroll
          </p>

          <div className="mx-auto mt-3 h-10 w-px overflow-hidden bg-white/20">
            <div className="h-1/2 w-full animate-pulse bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}