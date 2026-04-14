"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface EditorialBlock {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  layout: "full" | "split-left" | "split-right" | "stacked";
}

const BLOCKS: EditorialBlock[] = [
  {
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80&auto=format&fit=crop",
    title: "DIAMONDS",
    subtitle: "ETERNAL BRILLIANCE",
    cta: "DISCOVER",
    layout: "full",
  },
  {
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1920&q=80&auto=format&fit=crop",
    title: "GOLD CHAINS",
    subtitle: "HANDCRAFTED LINKS",
    cta: "EXPLORE",
    layout: "split-left",
  },
  {
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&q=80&auto=format&fit=crop",
    title: "PEARL COLLECTION",
    subtitle: "OCEAN'S FINEST",
    cta: "SHOP NOW",
    layout: "split-right",
  },
  {
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=80&auto=format&fit=crop",
    title: "WEDDING BANDS",
    subtitle: "FOREVER YOURS",
    cta: "VIEW ALL",
    layout: "full",
  },
  {
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920&q=80&auto=format&fit=crop",
    title: "VINTAGE",
    subtitle: "CURATED TREASURES",
    cta: "EXPLORE",
    layout: "stacked",
  },
  {
    image: "https://images.unsplash.com/photo-1612314317004-d650718f188a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhcHBoaXJlfGVufDB8fDB8fHww",
    title: "SAPPHIRES",
    subtitle: "ROYAL BLUE",
    cta: "DISCOVER",
    layout: "split-left",
  },
];

export default function ScrollEditorial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      blockRefs.current.forEach((block) => {
        if (!block) return;

        const img = block.querySelector(".editorial-img") as HTMLElement;
        const imgInner = block.querySelector(".editorial-img-inner") as HTMLElement;
        const title = block.querySelector(".editorial-title") as HTMLElement;
        const subtitle = block.querySelector(".editorial-subtitle") as HTMLElement;
        const cta = block.querySelector(".editorial-cta") as HTMLElement;
        const overlay = block.querySelector(".editorial-overlay") as HTMLElement;

        // Image clip-path reveal: starts clipped, reveals to full
        if (img) {
          gsap.fromTo(
            img,
            { clipPath: "inset(15% 15% 15% 15%)", scale: 1.15 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
                end: "top 20%",
                scrub: 0.8,
              },
            }
          );
        }

        // Parallax on inner image — image moves slower than container
        if (imgInner) {
          gsap.fromTo(
            imgInner,
            { yPercent: -10, scale: 1.1 },
            {
              yPercent: 10,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: block,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // On scroll past: image scales down slightly and fades, Zara-style exit
        if (img) {
          gsap.to(img, {
            scale: 0.92,
            opacity: 0.3,
            ease: "power1.in",
            scrollTrigger: {
              trigger: block,
              start: "bottom 40%",
              end: "bottom -10%",
              scrub: 0.6,
            },
          });
        }

        // Overlay darkens as you scroll into view
        if (overlay) {
          gsap.fromTo(
            overlay,
            { opacity: 0.6 },
            {
              opacity: 0.15,
              scrollTrigger: {
                trigger: block,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
              },
            }
          );
        }

        // Title: slides up and fades in
        if (title) {
          gsap.fromTo(
            title,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 55%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Subtitle: slides up with delay
        if (subtitle) {
          gsap.fromTo(
            subtitle,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // CTA button: fades in last
        if (cta) {
          gsap.fromTo(
            cta,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 45%",
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
    <div ref={sectionRef} className="bg-white">
      {/* Section header */}
      <div className="py-20 px-8 text-center">
        <h3
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            color: "#111",
          }}
        >
          NEW ARRIVALS
        </h3>
        <p
          className="text-gray-400 mt-4 text-sm"
          style={{ letterSpacing: "0.2em" }}
        >
          EXPLORE THE LATEST COLLECTION
        </p>
      </div>

      {/* Editorial blocks */}
      {BLOCKS.map((block, i) => {
        const isFullWidth = block.layout === "full" || block.layout === "stacked";
        const isSplitLeft = block.layout === "split-left";
        const isSplitRight = block.layout === "split-right";
        const isStacked = block.layout === "stacked";

        return (
          <div
            key={i}
            ref={(el) => {
              blockRefs.current[i] = el;
            }}
            className={`relative ${isFullWidth ? "mb-4" : "mb-4"}`}
            style={{
              minHeight: isFullWidth ? "100vh" : "85vh",
            }}
          >
            {isSplitLeft || isSplitRight ? (
              /* Split layout: image on one side, text on the other */
              <div className="flex flex-col md:flex-row h-full min-h-[85vh]">
                {/* Image side */}
                <div
                  className={`relative w-full md:w-[60%] overflow-hidden ${
                    isSplitRight ? "md:order-2" : ""
                  }`}
                  style={{ minHeight: "60vh" }}
                >
                  <div className="editorial-img absolute inset-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={block.image}
                      alt={block.title}
                      className="editorial-img-inner w-full h-full object-cover"
                    />
                    <div
                      className="editorial-overlay absolute inset-0"
                      style={{ background: "rgba(0,0,0,0.15)" }}
                    />
                  </div>
                </div>

                {/* Text side */}
                <div
                  className={`flex flex-col justify-center w-full md:w-[40%] px-10 md:px-16 py-16 ${
                    isSplitRight ? "md:order-1 md:items-end md:text-right" : ""
                  }`}
                >
                  <p
                    className="editorial-subtitle text-gray-400 text-xs mb-4"
                    style={{ letterSpacing: "0.25em" }}
                  >
                    {block.subtitle}
                  </p>
                  <h2
                    className="editorial-title text-black"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "clamp(2.5rem, 5vw, 5rem)",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {block.title}
                  </h2>
                  <button
                    className="editorial-cta mt-8 text-xs tracking-[0.25em] text-black border-b border-black pb-1 self-start hover:opacity-60 transition-opacity"
                    style={isSplitRight ? { alignSelf: "flex-end" } : {}}
                  >
                    {block.cta}
                  </button>
                </div>
              </div>
            ) : isStacked ? (
              /* Stacked: smaller centered image with text below */
              <div className="flex flex-col items-center justify-center min-h-[100vh] px-8">
                <div
                  className="editorial-img relative overflow-hidden w-full max-w-3xl mx-auto"
                  style={{ aspectRatio: "3/4" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.image}
                    alt={block.title}
                    className="editorial-img-inner w-full h-full object-cover"
                  />
                  <div
                    className="editorial-overlay absolute inset-0"
                    style={{ background: "rgba(0,0,0,0.1)" }}
                  />
                </div>
                <div className="text-center mt-10">
                  <p
                    className="editorial-subtitle text-gray-400 text-xs mb-3"
                    style={{ letterSpacing: "0.25em" }}
                  >
                    {block.subtitle}
                  </p>
                  <h2
                    className="editorial-title text-black"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "clamp(2rem, 4vw, 4rem)",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {block.title}
                  </h2>
                  <button className="editorial-cta mt-6 text-xs tracking-[0.25em] text-black border-b border-black pb-1 hover:opacity-60 transition-opacity">
                    {block.cta}
                  </button>
                </div>
              </div>
            ) : (
              /* Full-width: image fills viewport with text overlay */
              <div className="relative w-full h-screen overflow-hidden">
                <div className="editorial-img absolute inset-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.image}
                    alt={block.title}
                    className="editorial-img-inner w-full h-full object-cover"
                  />
                  <div
                    className="editorial-overlay absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 60%)",
                    }}
                  />
                </div>
                {/* Text overlay at bottom */}
                <div className="absolute bottom-16 left-10 z-10">
                  <p
                    className="editorial-subtitle text-white text-xs mb-3"
                    style={{ letterSpacing: "0.25em" }}
                  >
                    {block.subtitle}
                  </p>
                  <h2
                    className="editorial-title text-white"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "clamp(3rem, 6vw, 6rem)",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      lineHeight: 0.95,
                    }}
                  >
                    {block.title}
                  </h2>
                  <button className="editorial-cta mt-6 text-xs tracking-[0.25em] text-white border-b border-white pb-1 hover:opacity-60 transition-opacity">
                    {block.cta}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
