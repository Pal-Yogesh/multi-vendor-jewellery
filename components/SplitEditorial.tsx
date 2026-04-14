"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EDITORIALS = [
  {
    image: "https://images.unsplash.com/photo-1767096612165-b5a33caa48a5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fFRIRSUyMEFSVCUyME9GJTIwQURPUk5NRU5UfGVufDB8fDB8fHww",
    tag: "EDITORIAL",
    title: "THE ART OF\nADORNMENT",
    description:
      "Jewellery is more than decoration. It is memory, identity, and intention — worn close to the skin, carried through life.",
    cta: "READ MORE",
    reverse: false,
  },
  {
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=80&auto=format&fit=crop",
    tag: "CRAFTSMANSHIP",
    title: "MADE BY\nHAND",
    description:
      "Each piece passes through the hands of master artisans. From sketch to setting, every detail is deliberate.",
    cta: "DISCOVER",
    reverse: true,
  },
];

export default function SplitEditorial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      blockRefs.current.forEach((block) => {
        if (!block) return;

        const imgWrap = block.querySelector(".split-img-wrap") as HTMLElement;
        const imgInner = block.querySelector(".split-img-inner") as HTMLElement;
        const textEls = block.querySelectorAll(".split-text-el");
        const divider = block.querySelector(".split-divider") as HTMLElement;

        // Image reveal: clip from center outward
        if (imgWrap) {
          gsap.fromTo(
            imgWrap,
            { clipPath: "inset(50% 20% 50% 20%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.4,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: block,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Inner image parallax
        if (imgInner) {
          gsap.fromTo(
            imgInner,
            { scale: 1.2, yPercent: -10 },
            {
              scale: 1,
              yPercent: 10,
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

        // Divider line
        if (divider) {
          gsap.fromTo(
            divider,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Text elements stagger
        if (textEls.length) {
          gsap.fromTo(
            textEls,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 55%",
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
    <section ref={sectionRef} className="bg-white">
      {EDITORIALS.map((item, i) => (
        <div
          key={i}
          ref={(el) => { blockRefs.current[i] = el; }}
          className={`flex flex-col ${
            item.reverse ? "md:flex-row-reverse" : "md:flex-row"
          } min-h-screen`}
        >
          {/* Image side */}
          <div className="w-full md:w-[55%] relative overflow-hidden" style={{ minHeight: "50vh" }}>
            <div className="split-img-wrap absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="split-img-inner w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text side */}
          <div className="w-full md:w-[45%] flex items-center relative">
            {/* Vertical divider */}
            <div
              className={`split-divider hidden md:block absolute top-[15%] bottom-[15%] w-px bg-black/10 origin-top ${
                item.reverse ? "right-0" : "left-0"
              }`}
            />

            <div className={`px-10 md:px-16 py-20 ${item.reverse ? "md:pr-20" : "md:pl-20"}`}>
              <p
                className="split-text-el text-black/30 text-[10px] mb-6"
                style={{ letterSpacing: "0.3em" }}
              >
                {item.tag}
              </p>
              <h2
                className="split-text-el whitespace-pre-line"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  color: "#111",
                }}
              >
                {item.title}
              </h2>
              <p
                className="split-text-el text-black/40 mt-8 text-xs leading-[1.8] max-w-sm"
                style={{ letterSpacing: "0.04em" }}
              >
                {item.description}
              </p>
              <button
                className="split-text-el mt-10 text-[10px] tracking-[0.25em] text-black border-b border-black pb-1 hover:opacity-50 transition-opacity duration-300"
              >
                {item.cta}
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
