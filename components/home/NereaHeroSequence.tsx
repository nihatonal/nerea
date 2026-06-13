"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;

const currentFrame = (index: number) =>
  `/images/nerea-hero/frame_${String(index + 1).padStart(6, "0")}.webp`;

export default function NereaHeroSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    const render = () => {
      const image = imagesRef.current[Math.round(frameRef.current.frame)];
      if (!image || !image.complete || image.naturalWidth === 0) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const canvasRatio = canvas.width / canvas.height;
      const imageRatio = image.width / image.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imageRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imageRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imageRatio;
        offsetY = (canvas.height - drawHeight) / 2;
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

    let loadedImages = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imagesRef.current[i] = img;

      img.onload = () => {
        loadedImages++;
        if (loadedImages === 1) render();
      };
    }

    const tween = gsap.to(frameRef.current, {
      frame: FRAME_COUNT - 1,
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
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);

      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[500vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" />

        <div className="pointer-events-none absolute inset-0 bg-black/25" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

        <div
          id="hero-start-text"
          className="absolute inset-0 flex items-center px-6 md:px-20"
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.45em] text-white/60 md:text-sm">
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
          className="absolute inset-0 flex items-end justify-center px-6 pb-16 opacity-0 md:items-center md:pb-0"
        >
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.55em] text-white/60">
              Mediterranean House
            </p>

            <h2 className="mt-5 text-6xl font-light tracking-[-0.08em] text-white md:text-9xl">
              NEREA
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/70 md:text-base">
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
            Scroll
          </p>
          <div className="mx-auto mt-3 h-10 w-px overflow-hidden bg-white/20">
            <div className="h-1/2 w-full animate-pulse bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}   