"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });

    tl.fromTo(
      imageRef.current,
      {
        scale: 1.05,
      },
      {
        scale: 1,
        duration: 2,
        ease: "power3.out",
      }
    ).fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      },
      "-=1.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="final-reservation"
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/images/final/final-cta.webp"
          alt="Moonlit Mediterranean"
          fill
          className="object-cover"
           sizes="(max-width: 768px) 100vw, 55vw"
        />
      </div>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.72)_100%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <div ref={contentRef}>
          <h2 className="text-6xl font-light leading-[0.9] tracking-[-0.08em] md:text-[9rem]">
            Some evenings
            <br />
            should never
            <br />
            be rushed.
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/65 md:text-base">
            Fethiye • Mediterranean Coast • Türkiye
          </p>

          <a
            href="#reservation"
            className="mt-12 inline-flex rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition duration-300 hover:scale-[1.03] hover:bg-white/90"
          >
            Reserve Your Table
          </a>
        </div>
      </div>
    </section>
  );
}