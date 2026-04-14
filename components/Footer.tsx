"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Zara footer: very minimal. On desktop, columns of links.
  On mobile, accordion-style collapsible sections.
  Tiny 9px text. Social links. Region selector at bottom.
*/

const footerSections = [
  {
    title: "HELP",
    links: ["FAQ", "My Purchases", "Shipping", "Returns & Exchanges", "Contact Us", "Size Guide", "Gift Card Conditions"],
  },
  {
    title: "FOLLOW US",
    links: ["Instagram", "Pinterest", "Facebook", "X (Twitter)", "YouTube"],
  },
  {
    title: "COMPANY",
    links: ["About Us", "Join Life", "Careers", "Stores", "Press"],
  },
  {
    title: "POLICIES",
    links: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Accessibility"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-10 md:py-14">
        {/* Desktop: columns */}
        <div className="hidden md:grid grid-cols-4 gap-10">
          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="text-[9px] tracking-[0.25em] text-black/40 mb-4">{section.title}</p>
              {section.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-[11px] tracking-[0.04em] text-black/40 py-[3px] hover:text-black transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden">
          {footerSections.map((section) => (
            <FooterAccordion key={section.title} section={section} />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-black/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[9px] tracking-[0.15em] text-black/25">INDIA</span>
            <span className="text-[9px] tracking-[0.15em] text-black/25">|</span>
            <span className="text-[9px] tracking-[0.15em] text-black/25">
              © {new Date().getFullYear()} ZARA JEWELLERY
            </span>
          </div>
          {/* Bottom links like Zara */}
          <div className="flex gap-4">
            {["TRAVEL MODE", "GIFT CARD", "DOWNLOAD APP", "STORES"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[9px] tracking-[0.12em] text-black/25 hover:text-black transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterAccordion({ section }: { section: (typeof footerSections)[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/5">
      <button
        className="w-full flex items-center justify-between py-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[9px] tracking-[0.25em] text-black/40">{section.title}</span>
        <motion.span
          className="text-[8px] text-black/30"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pb-4"
          >
            {section.links.map((link) => (
              <a
                key={link}
                href="#"
                className="block text-[11px] tracking-[0.04em] text-black/40 py-[3px] hover:text-black transition-colors"
              >
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
