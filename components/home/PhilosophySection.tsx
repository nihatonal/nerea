"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const animation = gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#080604] text-white">
      <div className="grid min-h-[80vh] grid-cols-1 md:grid-cols-2">
        {/* Image Side */}
        <div className="relative min-h-[45vh] md:min-h-[80vh]">
          <Image
            src="/images/philosophy/philosophy.webp"
            alt="Mediterranean Philosophy"
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/5" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,6,4,0.02),rgba(8,6,4,0.4))]" />
        </div>

        {/* Content Side */}
        <div className="relative flex min-h-[35vh] items-center px-8 py-20 md:min-h-[80vh] md:px-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.08),transparent_60%)]" />

          <div
            ref={contentRef}
            className="relative z-10 max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.45em] text-white/45">
              Philosophy
            </p>

            <h2 className="mt-8 text-5xl font-light leading-[0.9] tracking-[-0.07em] md:text-8xl">
              The Mediterranean
              <br />
              does not need
              <br />
              reinvention.
            </h2>

            <div className="mt-10 max-w-md space-y-5 text-sm leading-7 text-white/60 md:text-base">
              <p>
                We work with what the coast already provides.
              </p>

              <p>
                Seasonal seafood. Olive oil. Fire. Time.
              </p>

              <p>
                Nothing more.
                <br />
                Nothing less.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}