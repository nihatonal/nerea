"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
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
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 92%",
          once: true,
        },
      }
    );

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <footer className="bg-[#080604] text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-24">
        <div
          ref={contentRef}
          className="border-t border-white/10 pt-16"
        >
          <p className="text-lg font-light tracking-[0.35em]">
            NEREA
          </p>

          <p className="mt-6 text-sm leading-7 text-white/50">
            Fethiye • Mediterranean Coast • Türkiye
          </p>

          <nav className="mt-12 flex flex-col gap-5 text-sm uppercase tracking-[0.28em] text-white/55 md:flex-row md:gap-10">
            <a
              href="#experience"
              className="transition hover:text-white"
            >
              Experience
            </a>

            <a
              href="#signature"
              className="transition hover:text-white"
            >
              Signature
            </a>

            <a
              href="#location"
              className="transition hover:text-white"
            >
              Location
            </a>

            <a
              href="#reservation"
              className="transition hover:text-white"
            >
              Reserve
            </a>
          </nav>

          <div className="mt-14 flex flex-col gap-6 text-sm text-white/50 md:flex-row md:justify-between">
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href="mailto:hello@nerea.house"
                className="transition hover:text-white"
              >
                hello@nerea.house
              </a>
            </div>

            <p className="text-white/35">
              © 2026 NEREA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}