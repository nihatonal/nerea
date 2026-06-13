"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const items = [
  {
    key: "fresh-catch",
    eyebrow: "01 / Signature",
    title: "Fresh Catch",
    subtitle: "Wild Mediterranean seafood, selected with quiet precision.",
    image: "/images/signature/fresh-catch.webp",
  },
  {
    key: "raw-bar",
    eyebrow: "02 / Signature",
    title: "Raw Bar",
    subtitle: "Oysters, scallops and chilled seafood over crushed ice.",
    image: "/images/signature/raw-bar.webp",
  },
  {
    key: "meze",
    eyebrow: "03 / Signature",
    title: "Mediterranean Meze",
    subtitle: "Small plates shaped by fire, olive oil and the coast.",
    image: "/images/signature/meze.webp",
  },
  {
    key: "private-dining",
    eyebrow: "04 / Signature",
    title: "Private Dining",
    subtitle: "A table above the moonlit sea, designed to be remembered.",
    image: "/images/signature/private-dining.webp",
  },
  {
    key: "sunset-terrace",
    eyebrow: "05 / Signature",
    title: "Sunset Terrace",
    subtitle: "Golden-hour rituals on the edge of the Mediterranean.",
    image: "/images/signature/sunset-terrace.webp",
  },
];

export default function SignatureCollection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? items.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === items.length - 1 ? 0 : current + 1,
    );
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartX.current = null;
  };

  return (
    <section id="signature"
     className="relative overflow-hidden bg-[#080604] py-16 text-white md:py-20">
      <div className="mb-10 flex items-end justify-between gap-6 px-6 md:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-white/45">
            Signature Collection
          </p>

          <h2 className="mt-5 max-w-5xl text-5xl font-light leading-[0.9] tracking-[-0.07em] md:text-8xl">
            Crafted for the evening.
          </h2>
        </div>

        <div className="hidden gap-3 md:flex">
          <button
            onClick={goToPrevious}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/60 hover:bg-white/10"
            aria-label="Previous slide"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={goToNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/60 hover:bg-white/10"
            aria-label="Next slide"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {items.map((item, index) => (
            <article
              key={item.key}
              className="relative h-[64vh] w-full shrink-0 overflow-hidden md:h-[68vh]"
              style={{ minHeight: "520px" }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82),transparent_60%)]" />

              <div className="absolute inset-x-0 bottom-0 p-8 md:p-16">
                <p className="text-xs uppercase tracking-[0.45em] text-white/55">
                  {item.eyebrow}
                </p>

                <h3 className="mt-4 text-5xl font-light leading-[0.9] tracking-[-0.07em] md:text-8xl">
                  {item.title}
                </h3>

                <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 md:text-base">
                  {item.subtitle}
                </p>
              </div>

              <div className="absolute right-8 top-8 text-xs uppercase tracking-[0.35em] text-white/45 md:right-10 md:top-10">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </div>
            </article>
          ))}
        </div>

        <div className="absolute bottom-8 right-8 flex gap-2 md:right-16">
          {items.map((item, index) => (
            <button
              key={item.key}
              onClick={() => setActiveIndex(index)}
              className={`h-px transition-all duration-500 ${
                index === activeIndex ? "w-14 bg-white" : "w-8 bg-white/25"
              }`}
              aria-label={`Go to ${item.title}`}
            />
          ))}
        </div>

       
      </div>
    </section>
  );
}
