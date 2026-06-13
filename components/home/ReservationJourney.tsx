"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: CalendarDays,
    eyebrow: "01",
    title: "Choose your evening",
    text: "Select the night you want to remember.",
  },
  {
    icon: MapPin,
    eyebrow: "02",
    title: "Select your table",
    text: "Pier, terrace or private dining above the sea.",
  },
  {
    icon: Sparkles,
    eyebrow: "03",
    title: "Confirm the moment",
    text: "We prepare the rest quietly, before you arrive.",
  },
];

export default function ReservationJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current?.children;

    if (!section || !heading || !cards) return;

    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        once: true,
      },
    });

    animation
      .fromTo(
        heading,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      )
      .fromTo(
        cards,
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.55",
      );

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080604] px-6 py-24 text-white md:px-10 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.09),transparent_45%)]" />

      <div className="relative z-10 mx-auto grid max-w-375 gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <div ref={headingRef}>
          <p className="text-xs uppercase tracking-[0.45em] text-white/45">
            Reservation Journey
          </p>

          <h2 className="mt-6 max-w-4xl text-5xl font-light leading-[0.9] tracking-[-0.07em] md:text-8xl">
            Reserve the
            <br />
            evening quietly.
          </h2>

          <p className="mt-8 max-w-md text-sm leading-7 text-white/60 md:text-base">
            No rush. No noise. Just a considered path toward a table prepared
            above the Mediterranean.
          </p>

          <a
            href="#final-reservation"
            className="mt-10 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition duration-300 hover:bg-white/85"
          >
            Begin Reservation
          </a>
        </div>

        <div ref={cardsRef} className="grid gap-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.eyebrow}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition duration-500 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.06] md:p-8"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                </div>

                <div className="relative z-10 flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white/70">
                    <Icon size={18} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/35">
                      {step.eyebrow}
                    </p>

                    <h3 className="mt-3 text-2xl font-light tracking-[-0.04em] md:text-4xl">
                      {step.title}
                    </h3>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-white/55 md:text-base">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}