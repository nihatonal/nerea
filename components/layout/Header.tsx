"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Signature", href: "#signature" },
  { label: "Location", href: "#location" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#080604]/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 text-white md:px-10">
          <a
            href="#"
            onClick={closeMenu}
            className="text-lg font-light tracking-[0.28em]"
          >
            NEREA
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#reservation"
              className="rounded-full border border-white/25 px-5 py-2.5 text-xs uppercase tracking-[0.25em] text-white transition hover:border-white/70 hover:bg-white/10"
            >
              Reserve
            </a>
          </nav>

          <button
            onClick={() => setIsOpen((value) => !value)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white backdrop-blur-md md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute transition-all duration-300 ${
                isOpen ? "rotate-90 opacity-0 scale-75" : "rotate-0 opacity-100 scale-100"
              }`}
            >
              <Menu size={20} />
            </span>

            <span
              className={`absolute transition-all duration-300 ${
                isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-75"
              }`}
            >
              <X size={20} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile sidebar */}
      <aside
        className={`fixed right-0 top-0 z-40 h-screen w-[86vw] max-w-sm bg-[#080604]/95 text-white shadow-2xl backdrop-blur-2xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-7 pb-8 pt-28">
          <p className="text-xs uppercase tracking-[0.45em] text-white/35">
            Menu
          </p>

          <nav className="mt-10 flex flex-col gap-7">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`text-4xl font-light tracking-[-0.06em] transition duration-700 ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 90 + 180}ms` : "0ms",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto">
            <a
              href="#reservation"
              onClick={closeMenu}
              className="flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-medium text-black"
            >
              Reserve Your Table
            </a>

            <p className="mt-8 text-xs uppercase leading-6 tracking-[0.3em] text-white/35">
              Fethiye
              <br />
              Mediterranean Coast
              <br />
              Türkiye
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}