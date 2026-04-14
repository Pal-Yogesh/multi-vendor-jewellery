
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "WOMAN" | "MAN" | "BRAND";

interface NavItem {
  label: string;
  badge?: string;
}

interface NavSection {
  number: string;
  title: string;
  items: NavItem[];
}

// ─── Content Data ─────────────────────────────────────────────────────────────

const NAV_DATA: Record<Category, NavSection[]> = {
  WOMAN: [
    {
      number: "01",
      title: "NEW IN",
      items: [
        { label: "The New" },
        { label: "The Item" },
        { label: "Dylan's T-Shirt Club", badge: "NEW" },
      ],
    },
    {
      number: "02",
      title: "TRENDS",
      items: [
        { label: "Spring Looks" },
        { label: "All Whites" },
        { label: "Linen", badge: "NEW" },
      ],
    },
    {
      number: "03",
      title: "COLLECTION",
      items: [
        { label: "Best Sellers" },
        { label: "Dresses" },
        { label: "Tops" },
        { label: "Shirts" },
      ],
    },
  ],
  MAN: [
    {
      number: "01",
      title: "NEW IN",
      items: [
        { label: "The New" },
        { label: "The Item" },
        { label: "Essentials Edit", badge: "NEW" },
      ],
    },
    {
      number: "02",
      title: "TRENDS",
      items: [
        { label: "Summer Looks" },
        { label: "All Neutrals" },
        { label: "Linen", badge: "NEW" },
      ],
    },
    {
      number: "03",
      title: "COLLECTION",
      items: [
        { label: "Best Sellers" },
        { label: "Suits" },
        { label: "Shirts" },
        { label: "Trousers" },
      ],
    },
  ],
  BRAND: [
    {
      number: "01",
      title: "NEW IN",
      items: [
        { label: "Latest Arrivals" },
        { label: "Collaborations", badge: "NEW" },
        { label: "Limited Editions" },
      ],
    },
    {
      number: "02",
      title: "STORIES",
      items: [
        { label: "Campaigns" },
        { label: "Sustainability" },
        { label: "Zara Origins" },
      ],
    },
    {
      number: "03",
      title: "WORLD",
      items: [
        { label: "Zara Home" },
        { label: "SRPLS" },
        { label: "Origins" },
        { label: "Zara Beauty" },
      ],
    },
  ],
};

const CATEGORIES: Category[] = ["WOMAN", "MAN", "BRAND"];

const ease = [0.76, 0, 0.24, 1] as const;

const overlayVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.7, ease },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.55, ease },
  },
};

const logoVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: 0.2 },
  },
};

const dividerVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease, delay: 0.25 },
  },
};

const catListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.28 } },
};

const catItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.0 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2, ease } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease, delay: 0.12 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.3, ease },
  },
};

// ─── Hamburger ────────────────────────────────────────────────────────────────

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="fixed top-6 left-6 z-[400] flex flex-col justify-center items-start gap-[7px] w-8 h-8 bg-transparent border-0 cursor-pointer p-0"
    >
      <motion.span
        className="block h-px bg-black rounded-full"
        animate={open ? { width: 44, rotate: 45, y: 3.5 } : { width: 44, rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease }}
      />
      <motion.span
        className="block h-px bg-black rounded-full"
        animate={open ? { width: 44, rotate: -45, y: -3.5 } : { width: 44, rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease }}
      />
    </button>
  );
}

// ─── Category List ────────────────────────────────────────────────────────────

function CategoryList({
  active,
  onSelect,
}: {
  active: Category;
  onSelect: (c: Category) => void;
}) {
  return (
    <motion.ul
      variants={catListVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-56 shrink-0 mt-1"
    >
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <motion.li key={cat} variants={catItemVariants}>
            <button
              onClick={() => onSelect(cat)}
              className="flex items-center gap-2.5 text-left w-full py-0.5 bg-transparent border-0 cursor-pointer"
            >
              {/* Active dot */}
              <motion.span
                className="text-black font-serif text-2xl leading-none"
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                transition={{ duration: 0.25, ease }}
              >
                ·
              </motion.span>
              <span
                className={[
                  "font-serif text-[2rem] font-bold leading-tight tracking-tight",
                  "transition-colors duration-300",
                  isActive ? "text-black" : "text-black/25 hover:text-black/50",
                ].join(" ")}
              >
                {cat}
              </span>
            </button>
          </motion.li>
        );
      })}

    </motion.ul>
  );
}

// ─── Section Content ──────────────────────────────────────────────────────────

function SectionContent({ sections }: { sections: NavSection[] }) {
  // Pre-compute label offsets so labels align with their group of items
  const ROW_H = 23; // px per item row
  const GROUP_GAP = 34; // px between section groups

  let cumOffset = 0;
  const labelOffsets: number[] = sections.map((sec, i) => {
    const offset = i === 0 ? 0 : cumOffset;
    cumOffset += sec.items.length * ROW_H + GROUP_GAP;
    return offset;
  });
  // reset for real calculation
  cumOffset = 0;
  const realOffsets = sections.map((sec, i) => {
    if (i === 0) {
      cumOffset = sec.items.length * ROW_H + GROUP_GAP;
      return 0;
    }
    const off = cumOffset;
    cumOffset += sec.items.length * ROW_H + GROUP_GAP;
    return off;
  });

  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex gap-14 flex-1 min-w-0"
    >
      {/* Numbered labels — absolutely positioned so they align precisely */}
      <div className="relative w-36 shrink-0">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.number}
            variants={rowVariants}
            className="absolute flex items-center gap-2"
            style={{ top: realOffsets[i] + 2 }}
          >
            <span className="text-[10px] text-black/35 tracking-[0.18em] font-light" style={{ fontFamily: "inherit" }}>
              |{sec.number}|
            </span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-black/45 uppercase">
              {sec.title}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Item lists */}
      <div className="flex flex-col">
        {sections.map((sec, si) => (
          <div key={sec.number} className={si > 0 ? "mt-[34px]" : ""}>
            {sec.items.map((item) => (
              <motion.div
                key={item.label}
                variants={rowVariants}
                className="flex items-baseline gap-1.5 py-[1.5px] group"
              >
                <a
                  href="#"
                  className={[
                    "text-[0.95rem] font-medium tracking-[0.05em] text-black",
                    "relative inline-block",
                    "after:absolute after:bottom-[-1px] after:left-0 after:h-px after:w-0 after:bg-black",
                    "after:transition-[width] after:duration-300 after:ease-out",
                    "hover:after:w-full",
                    "transition-opacity duration-200 hover:opacity-60",
                  ].join(" ")}
                >
                  {item.label}
                </a>
                {item.badge && (
                  <span className="text-[0.48rem] font-bold tracking-[0.18em] text-black/40 uppercase">
                    {item.badge}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Image Panel ──────────────────────────────────────────────────────────────

const IMAGE_BG: Record<Category, string> = {
  WOMAN: "#ece8e1",
  MAN: "#dde1e5",
  BRAND: "#e1e5de",
};

function ImagePanel({ category }: { category: Category }) {
  return (
    <div className="shrink-0 w-[260px] h-[210px] relative overflow-hidden ml-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: IMAGE_BG[category] }}
        >
          <span className="text-[9px] tracking-[0.3em] text-black/20 uppercase font-light">
            {category} — SS25
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── ZaraNavbar ───────────────────────────────────────────────────────────────

export default function ZaraNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("WOMAN");

  return (
    <>
      <Hamburger open={isOpen} onClick={() => setIsOpen((v) => !v)} />

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="zara-nav"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[300] bg-white overflow-y-auto"
            style={{ willChange: "clip-path" }}
          >
            {/* ── Logo ── */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              className="pt-[22px] pb-4 pl-[13%] pr-10"
            >
              <span
                className="text-[3.5rem] font-black leading-none tracking-[-0.015em] select-none"
                style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
              >
                ZARA
              </span>
            </motion.div>

            {/* ── Divider ── */}
            <motion.div
              variants={dividerVariants}
              initial="hidden"
              animate="visible"
              className="h-px bg-black/10 mx-[13%] mb-10"
            />

            {/* ── Main grid ── */}
            <div className="flex pl-[13%] pr-10 gap-16 pb-20 min-h-[460px] items-start">
              {/* Col 1 – categories */}
              <CategoryList active={activeCategory} onSelect={setActiveCategory} />

              {/* Col 2+3 – animated content */}
              <div className="flex gap-14 flex-1 min-w-0 min-h-[380px]">
                <AnimatePresence mode="wait">
                  <SectionContent
                    key={activeCategory}
                    sections={NAV_DATA[activeCategory]}
                  />
                </AnimatePresence>
              </div>

              {/* Col 4 – image */}
              <ImagePanel category={activeCategory} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}