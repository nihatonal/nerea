"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    key: "arrival",
    eyebrow: "01 / Arrival",
    title: "Where the sea meets the evening.",
    text: "Step onto the pier as the last warmth of the day fades into candlelight.",
    image: "/images/evening/arrival.webp",
  },
  {
    key: "taste",
    eyebrow: "02 / Taste",
    title: "Mediterranean simplicity, refined.",
    text: "Fresh seafood, seasonal meze and quiet rituals shaped by the coast.",
    image: "/images/evening/taste.webp",
  },
  {
    key: "stay",
    eyebrow: "03 / Stay",
    title: "The night is still young.",
    text: "Moonlight, soft music and a table designed to be remembered.",
    image: "/images/evening/stay.webp",
  },
];

const backgrounds = [
  "radial-gradient(circle at 25% 50%, rgba(212,175,55,0.08), transparent 55%)",
  "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.05), transparent 55%)",
  "radial-gradient(circle at 25% 50%, rgba(80,120,255,0.08), transparent 55%)",
];

export default function EveningExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      const mobileSlides = gsap.utils.toArray<HTMLElement>(
        ".evening-mobile-slide",
      );

      gsap.set(mobileSlides, {
        yPercent: 100,
      });

      gsap.set(mobileSlides[0], {
        yPercent: 0,
      });

      const mobileTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#experience-mobile",
          start: "top top",
          end: "+=240%",
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
        },
      });

      mobileTimeline
        .to(mobileSlides[1], {
          yPercent: 0,
          duration: 1.2,
          ease: "none",
        })
        .to(
          mobileSlides[2],
          {
            yPercent: 0,
            duration: 1.2,
            ease: "none",
          },
          "+=0.35",
        );

      return () => {
        mobileTimeline.kill();
      };
    }

    const images = gsap.utils.toArray<HTMLElement>(".evening-image");

    gsap.set(images, { opacity: 0, scale: 1.06 });
    gsap.set(images[0], { opacity: 1, scale: 1 });

    const setScene = (index: number) => {
      if (activeIndexRef.current === index) return;

      activeIndexRef.current = index;

      gsap.to(textRef.current, {
        opacity: 0,
        y: -28,
        filter: "blur(8px)",
        duration: 0.22,
        ease: "power2.out",
        onComplete: () => {
          setActiveIndex(index);

          gsap.fromTo(
            textRef.current,
            {
              opacity: 0,
              y: 28,
              filter: "blur(8px)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.45,
              ease: "power3.out",
            },
          );
        },
      });

      images.forEach((image, i) => {
        gsap.to(image, {
          opacity: i === index ? 1 : 0,
          scale: i === index ? 1 : 1.06,
          duration: 1.1,
          ease: "power3.out",
        });
      });
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress < 0.33) {
          setScene(0);
        } else if (progress < 0.66) {
          setScene(1);
        } else {
          setScene(2);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const current = items[activeIndex];

  return (
    <div id="experience">
      <section
        ref={sectionRef}
        className="relative hidden h-[480vh] bg-[#080604] text-white md:block"
      >
        <div className="sticky top-0 grid h-screen grid-cols-1 overflow-hidden md:grid-cols-2">
          <div className="relative h-[52vh] md:h-screen">
            {items.map((item) => (
              <div key={item.key} className="evening-image absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority
                  loading="eager"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                />
                <div className="absolute inset-0 bg-black/25" />
              </div>
            ))}
          </div>

          <div
            className="relative flex h-[48vh] items-center bg-[#080604] px-8 md:h-screen md:px-20"
            style={{
              backgroundImage: backgrounds[activeIndex],
              transition: "background-image 800ms ease",
            }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  backgroundImage: backgrounds[activeIndex],
                }}
              />
            </div>

            <div ref={textRef} className="relative z-10 max-w-xl">
              <p className="text-xs uppercase tracking-[0.45em] text-white/45">
                {current.eyebrow}
              </p>

              <h2 className="mt-6 text-4xl font-light leading-[0.95] tracking-[-0.06em] md:text-7xl">
                {current.title}
              </h2>

              <p className="mt-8 max-w-md text-sm leading-7 text-white/60 md:text-base">
                {current.text}
              </p>
            </div>

            <div className="absolute bottom-10 left-8 z-10 flex gap-2 md:left-20">
              {items.map((item, index) => (
                <span
                  key={item.key}
                  className={`h-px transition-all duration-500 ${
                    index === activeIndex ? "w-14 bg-white" : "w-8 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Mobile stacked reveal */}
      <section
        id="experience-mobile"
        className="relative h-svh overflow-hidden bg-[#080604] text-white md:hidden"
      >
        {items.map((item, index) => (
          <article
            key={item.key}
            className="evening-mobile-slide absolute inset-0 overflow-hidden bg-[#080604]"
            style={{
              zIndex: index + 1,
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={index === 0}
              className="object-cover"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            />

            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.25)_34%,transparent_70%)]" />

            <div className="absolute inset-x-0 bottom-0 px-7 pb-28">
              <p className="text-[10px] uppercase tracking-[0.42em] text-white/50">
                {item.eyebrow}
              </p>

              <h2 className="mt-5 text-4xl font-light leading-[0.92] tracking-[-0.07em] text-white">
                {item.title}
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
                {item.text}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
