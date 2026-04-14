"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    title: "RINGS",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80&auto=format&fit=crop",
    span: "col-span-1 row-span-2",
  },
  {
    title: "NECKLACES",
    image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6c2?w=800&q=80&auto=format&fit=crop",
    span: "col-span-1 row-span-1",
  },
  {
    title: "EARRINGS",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80&auto=format&fit=crop",
    span: "col-span-1 row-span-1",
  },
  {
    title: "BRACELETS",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80&auto=format&fit=crop",
    span: "col-span-1 row-span-1",
  },
  {
    title: "WATCHES",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80&auto=format&fit=crop",
    span: "col-span-1 row-span-2",
  },
  {
    title: "PEARLS",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80&auto=format&fit=crop",
    span: "col-span-1 row-span-1",
  },
];

export default function CategoryGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        const h = headingRef.current.querySelector("h2");
        const p = headingRef.current.querySelector("p");
        gsap.fromTo(
          [h, p],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Card animations
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const img = card.querySelector(".cat-img") as HTMLElement;
        const overlay = card.querySelector(".cat-overlay") as HTMLElement;
        const title = card.querySelector(".cat-title") as HTMLElement;
        const line = card.querySelector(".cat-line") as HTMLElement;

        // Staggered fade-up entry
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Image parallax inside card
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15, yPercent: -5 },
            {
              yPercent: 5,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // Title slide up
        if (title) {
          gsap.fromTo(
            title,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Underline expand
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 65%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 px-6 md:px-10">
      {/* Section heading */}
      <div ref={headingRef} className="text-center mb-16">
        <h2
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            color: "#111",
          }}
        >
          SHOP BY CATEGORY
        </h2>
        <p className="text-gray-400 mt-3 text-xs" style={{ letterSpacing: "0.2em" }}>
          FIND YOUR PERFECT PIECE
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-3">
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.title}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`${cat.span} relative overflow-hidden cursor-pointer group`}
          >
            {/* Image */}
            <div className="absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.title}
                className="cat-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Dark overlay */}
            <div
              className="cat-overlay absolute inset-0 transition-opacity duration-500 group-hover:opacity-40"
              style={{ background: "rgba(0,0,0,0.25)", opacity: 0.25 }}
            />

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3
                className="cat-title text-white text-sm tracking-[0.2em] font-light"
              >
                {cat.title}
              </h3>
              <div
                className="cat-line h-px bg-white/50 mt-2 origin-left"
                style={{ transformOrigin: "left" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
