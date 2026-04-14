"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Slide =
  | { id: number; type: "video"; video: string; poster: string; label: string; sub: string }
  | { id: number; type: "image"; image: string; label: string; sub: string };

const SLIDES: Slide[] = [
  {
    id: 1,
    type: "image",
    image: "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
    label: "NEW COLLECTION",
    sub: "FINE JEWELLERY 2025",
  },
  {
    id: 2,
    type: "image",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&q=80&auto=format&fit=crop",
    label: "NECKLACES",
    sub: "TIMELESS ELEGANCE",
  },
  {
    id: 3,
    type: "image",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1920&q=80&auto=format&fit=crop",
    label: "RINGS",
    sub: "ARTISAN CRAFT",
  },
  {
    id: 4,
    type: "image",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80&auto=format&fit=crop",
    label: "BRACELETS",
    sub: "GOLDEN HOUR",
  },
  {
    id: 5,
    type: "image",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920&q=80&auto=format&fit=crop",
    label: "EARRINGS",
    sub: "STATEMENT PIECES",
  },
];

const FALLBACK_COLORS = [
  "linear-gradient(135deg, #1a1a1a 0%, #3d3d3d 100%)",
  "linear-gradient(135deg, #2c2c2c 0%, #555 100%)",
  "linear-gradient(135deg, #1e1e1e 0%, #444 100%)",
  "linear-gradient(135deg, #262626 0%, #4a4a4a 100%)",
  "linear-gradient(135deg, #1a1a1a 0%, #3d3d3d 100%)",
];

export default function ZaraHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const slidesWrapRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoFixedRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // Play/pause videos based on active slide
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeSlide) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(slides, { yPercent: (i) => (i === 0 ? 0 : 100), opacity: 1 });

      // Fixed logo fades out when hero section ends
      if (logoFixedRef.current && heroRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "bottom bottom",
          end: "bottom top",
          onEnter: () => {
            gsap.to(logoFixedRef.current, {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: "power2.in",
            });
          },
          onLeaveBack: () => {
            gsap.to(logoFixedRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          },
        });
      }

      // Each slide scrolls up to reveal next
      slides.forEach((slide, i) => {
        if (i === slides.length - 1) return;

        ScrollTrigger.create({
          trigger: heroRef.current,
          start: `${(i / (slides.length - 1)) * 85}% top`,
          end: `${((i + 1) / (slides.length - 1)) * 85}% top`,
          scrub: 1.2,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(slide, { yPercent: -progress * 100 });
            gsap.set(slides[i + 1], { yPercent: (1 - progress) * 100 });
            setActiveSlide(progress > 0.5 ? i + 1 : i);
          },
        });
      });

      // Parallax inner media
      slides.forEach((slide) => {
        const media = slide.querySelector(".hero-media") as HTMLElement;
        if (!media) return;
        gsap.to(media, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: slide,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Slide label text reveal
      slides.forEach((slide) => {
        const label = slide.querySelector(".slide-label") as HTMLElement;
        const sub = slide.querySelector(".slide-sub") as HTMLElement;
        if (!label || !sub) return;
        gsap.fromTo(
          [label, sub],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: slide,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Fixed ZARA Logo — only visible during hero */}
      <div
        ref={logoFixedRef}
        className="fixed bottom-16 right-10 z-[999] pointer-events-none mix-blend-normal"
        style={{ willChange: "transform, opacity" }}
      >
        <span
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(12rem, 21vw, 14rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "#fff",
            lineHeight: 1,
            display: "block",
            textShadow: "0 2px 40px rgba(0,0,0,0.18)",
          }}
        >
          ZARA
        </span>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-start justify-between px-6 pt-5">
        <button className="flex flex-col gap-[5px] group" aria-label="Menu">
          {/* <span className="block w-7 h-px bg-white transition-all group-hover:w-5" />
          <span className="block w-5 h-px bg-white transition-all group-hover:w-7" /> */}
        </button>
        <div className="flex flex-col items-end gap-1 text-black text-[11px] tracking-widest">
          <button className="hover:opacity-60 transition-opacity">SEARCH</button>
          <button className="hover:opacity-60 transition-opacity">
            SHOPPING BAG [0]
          </button>
          <button className="hover:opacity-60 transition-opacity">LOG IN</button>
          <button className="hover:opacity-60 transition-opacity">HELP</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative"
        style={{ height: `${SLIDES.length * 100}vh` }}
      >
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <div ref={slidesWrapRef} className="relative w-full h-full">
            {SLIDES.map((slide, i) => (
              <div
                key={slide.id}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ zIndex: SLIDES.length - i }}
              >
                {/* Media with parallax inner wrapper */}
                <div
                  className="hero-media absolute inset-0 w-full"
                  style={{ height: "115%", top: "-7.5%" }}
                >
                  {slide.type === "video" ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      src={slide.video}
                      poster={slide.poster}
                      muted
                      loop
                      playsInline
                      autoPlay={i === 0}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget.parentElement;
                        if (target) {
                          target.style.background = FALLBACK_COLORS[i];
                          e.currentTarget.style.display = "none";
                        }
                      }}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slide.image}
                      alt={slide.label}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget.parentElement;
                        if (target) {
                          target.style.background = FALLBACK_COLORS[i];
                          e.currentTarget.style.display = "none";
                        }
                      }}
                    />
                  )}
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.15) 100%)",
                    }}
                  />
                </div>

                {/* Bottom left content */}
                <div className="absolute bottom-12 left-8 z-10">
                  <p
                    className="slide-sub text-white tracking-[0.25em] text-xs mb-2"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    {slide.sub}
                  </p>
                  <h2
                    className="slide-label text-white tracking-[0.15em] text-sm font-light"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    {slide.label}
                  </h2>
                </div>

                {/* Slide counter */}
                <div className="absolute bottom-12 right-8 z-10">
                  <span
                    className="text-white text-xs tracking-widest"
                    style={{ opacity: 0.7 }}
                  >
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(SLIDES.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Video indicator badge */}
                {slide.type === "video" && (
                  <div className="absolute top-20 left-8 z-10 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    <span className="text-white text-[10px] tracking-[0.3em] opacity-60">
                      PLAYING
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[200] flex flex-col gap-2">
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className="transition-all duration-500"
                style={{
                  width: "2px",
                  height: activeSlide === i ? "28px" : "12px",
                  background:
                    activeSlide === i
                      ? "rgba(255,255,255,1)"
                      : "rgba(255,255,255,0.35)",
                  borderRadius: "2px",
                }}
              />
            ))}
          </div>

          {/* Scroll hint */}
          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2"
            style={{ opacity: activeSlide === 0 ? 1 : 0, transition: "opacity 0.4s" }}
          >
            <span className="text-white text-[10px] tracking-[0.3em]">SCROLL</span>
            <div
              className="w-px bg-white animate-pulse"
              style={{ height: "32px", opacity: 0.6 }}
            />
          </div>
        </div>
      </section>

      {/* Spacer so scroll editorial starts cleanly */}
      <div className="h-1 bg-white" />
    </>
  );
}
