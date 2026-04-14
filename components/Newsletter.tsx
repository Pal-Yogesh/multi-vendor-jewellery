"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.fromTo(
          children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Decorative line expand
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white text-black py-28 md:py-36 px-8 relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div ref={contentRef} className="max-w-2xl mx-auto text-center relative z-10">
        <p
          className="text-black/30 text-xs mb-6"
          style={{ letterSpacing: "0.3em" }}
        >
          STAY CONNECTED
        </p>

        <h2
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
          }}
        >
          BE THE FIRST TO KNOW
        </h2>

        <p
          className="text-black/40 mt-5 text-xs leading-relaxed max-w-md mx-auto"
          style={{ letterSpacing: "0.08em" }}
        >
          Subscribe to receive updates on new collections, exclusive offers, and
          the latest from our jewellery atelier.
        </p>

        {/* Decorative line */}
        <div
          ref={lineRef}
          className="h-px bg-white/10 my-10 mx-auto max-w-xs origin-center"
        />

        {/* Email input */}
        <div className="relative max-w-sm mx-auto">
          <div
            className="flex items-center border-b transition-colors duration-300"
            style={{
              borderColor: focused ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-1 bg-transparent py-4 text-xs tracking-[0.2em] text-black placeholder:text-black/20 outline-none"
              aria-label="Email address"
            />
            <button
              className="text-[10px] tracking-[0.25em] text-black/50 hover:text-black transition-colors duration-300 pl-4"
              aria-label="Subscribe"
            >
              SUBSCRIBE →
            </button>
          </div>
        </div>

        {/* Fine print */}
        <p
          className="text-black/15 text-[9px] mt-8 max-w-xs mx-auto leading-relaxed"
          style={{ letterSpacing: "0.05em" }}
        >
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates from ZARA Jewellery.
        </p>
      </div>
    </section>
  );
}
