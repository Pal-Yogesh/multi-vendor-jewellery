"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LOOKS = [
  {
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80&auto=format&fit=crop",
    title: "THE DIAMOND EDIT",
    price: "FROM ₹12,500",
  },
  {
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=900&q=80&auto=format&fit=crop",
    title: "GOLD ESSENTIALS",
    price: "FROM ₹8,900",
  },
  {
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=80&auto=format&fit=crop",
    title: "PEARL DROPS",
    price: "FROM ₹5,200",
  },
  {
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80&auto=format&fit=crop",
    title: "STATEMENT EARRINGS",
    price: "FROM ₹3,800",
  },
  {
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=80&auto=format&fit=crop",
    title: "VINTAGE COLLECTION",
    price: "FROM ₹15,000",
  },
  {
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80&auto=format&fit=crop",
    title: "WEDDING BANDS",
    price: "FROM ₹22,000",
  },
];

export default function HorizontalLookbook() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Horizontal scroll
      const totalScroll = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Each card: scale + fade in as it enters viewport
      cardRefs.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f8f7f5]  overflow-hidden pb-10">
      {/* Heading */}
      <div ref={headingRef} className="pt-10 pb-6 px-10">
        <p className="text-gray-400 text-xs mb-2" style={{ letterSpacing: "0.25em" }}>
          CURATED FOR YOU
        </p>
        <h2
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            color: "#111",
          }}
        >
          THE LOOKBOOK
        </h2>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex gap-4 px-10 pb-6 will-change-transform" style={{ height: "calc(100vh - 120px)" }}>
        {LOOKS.map((look, i) => (
          <div
            key={look.title}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="shrink-0 w-[280px] md:w-[420px] group cursor-pointer flex flex-col"
          >
            {/* Image */}
            <div className="relative overflow-hidden flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={look.image}
                alt={look.title}
                className="look-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              {/* Quick add button */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <button className="w-full py-3 bg-white text-black text-[10px] tracking-[0.25em] hover:bg-black hover:text-white transition-colors duration-300">
                  QUICK VIEW
                </button>
              </div>
            </div>
            {/* Info */}
            <div className="mt-3 pb-2 text-left">
              <h3 className="text-xs tracking-[0.15em] text-black font-light leading-normal">
                {look.title}
              </h3>
              <p className="text-[10px] tracking-widest text-black/40 mt-1 leading-normal">
                {look.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
