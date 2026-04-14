"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "DIAMONDS",
  "✦",
  "GOLD",
  "✦",
  "PEARLS",
  "✦",
  "SAPPHIRES",
  "✦",
  "EMERALDS",
  "✦",
  "PLATINUM",
  "✦",
  "RUBIES",
  "✦",
  "SILVER",
  "✦",
];

export default function MarqueeTicker() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1: scroll-driven move left
      if (row1Ref.current) {
        gsap.fromTo(
          row1Ref.current,
          { xPercent: 0 },
          {
            xPercent: -50,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }

      // Row 2: scroll-driven move right (opposite direction)
      if (row2Ref.current) {
        gsap.fromTo(
          row2Ref.current,
          { xPercent: -50 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderWords = () =>
    [...WORDS, ...WORDS].map((word, i) => (
      <span
        key={i}
        className={`mx-6 md:mx-10 whitespace-nowrap ${
          word === "✦" ? "text-black/15 text-lg" : ""
        }`}
      >
        {word}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 md:py-24 overflow-hidden select-none"
    >
      {/* Row 1 */}
      <div className="overflow-hidden mb-4">
        <div
          ref={row1Ref}
          className="flex items-center whitespace-nowrap will-change-transform"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "rgba(0,0,0,0.08)",
            lineHeight: 1.1,
          }}
        >
          {renderWords()}
        </div>
      </div>

      {/* Row 2 — opposite direction, outlined style */}
      <div className="overflow-hidden">
        <div
          ref={row2Ref}
          className="flex items-center whitespace-nowrap will-change-transform"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            WebkitTextStroke: "1px rgba(0,0,0,0.08)",
            color: "transparent",
            lineHeight: 1.1,
          }}
        >
          {renderWords()}
        </div>
      </div>
    </section>
  );
}
