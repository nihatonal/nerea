"use client";

import Image from "next/image";

export default function LocationSection() {
  return (
    <section id="location" className="relative overflow-hidden bg-[#080604] text-white">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[60vh] md:min-h-screen">
          <Image
            src="/images/location/location.webp"
            alt="Fethiye Mediterranean Coast"
            fill
            className="object-cover object-right"
            sizes="(max-width: 768px) 100vw, 55vw"
          />

          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(8,6,4,0.72))]" />
        </div>

        <div className="relative flex min-h-[70vh] items-center px-8 py-20 md:min-h-screen md:px-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_45%,rgba(80,120,255,0.08),transparent_55%)]" />

          <div className="relative z-10 max-w-xl">
            <p className="text-xs uppercase tracking-[0.45em] text-white/45">
              Location
            </p>

            <h2 className="mt-8 text-5xl font-light leading-[0.9] tracking-[-0.07em] md:text-8xl">
              Fethiye,
              <br />
              quietly by
              <br />
              the sea.
            </h2>

            <p className="mt-10 max-w-md text-sm leading-7 text-white/60 md:text-base">
              Set above the calm Mediterranean, NEREA is designed as a place to
              arrive slowly, stay longer and remember clearly.
            </p>

            <div className="mt-12 grid gap-5 border-t border-white/10 pt-8 text-sm text-white/55 md:grid-cols-2">
              <div>
                <p className="uppercase tracking-[0.35em] text-white/35">
                  Coast
                </p>
                <p className="mt-3 text-white/70">Mediterranean</p>
              </div>

              <div>
                <p className="uppercase tracking-[0.35em] text-white/35">
                  Region
                </p>
                <p className="mt-3 text-white/70">Fethiye, Türkiye</p>
              </div>
            </div>

            <a
              href="#final-reservation"
              className="mt-10 inline-flex rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition duration-300 hover:border-white/60 hover:bg-white/10"
            >
              Plan Your Arrival
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}