"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PrivateDiningSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    animation
      .fromTo(
        imageRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 1.4, ease: "power3.out" }
      )
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
        "-=0.9"
      );

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#080604] text-white"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/images/private-dining/private-dining.webp"
          alt="Private dining above the Mediterranean Sea"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,6,4,0.9),transparent_55%)]" />

      <div className="relative z-10 flex min-h-screen items-end px-7 pb-20 md:items-center md:px-20 md:pb-0">
        <div ref={contentRef} className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.45em] text-white/55">
            Private Dining
          </p>

          <h2 className="mt-6 text-6xl font-light leading-[0.82] tracking-[-0.08em] md:text-9xl">
            Table
            <br />
            for Two.
          </h2>

          <div className="mt-8 max-w-lg space-y-4 text-sm leading-7 text-white/70 md:text-base">
            <p>
              Some evenings are meant to be shared with only one other person.
            </p>

            <p>Moonlight. Sea. Silence.</p>

            <p>Nothing more.</p>
          </div>

          <a
            href="#reservation"
            className="mt-10 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition duration-300 hover:bg-white/85"
          >
            Reserve Private Table
          </a>
        </div>
      </div>
    </section>
  );
}