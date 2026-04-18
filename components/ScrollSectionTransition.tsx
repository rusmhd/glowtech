"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ScrollSectionTransition() {
  const [token, setToken] = useState(0);
  const [visible, setVisible] = useState(false);
  const activeSectionRef = useRef<string | null>(null);
  const cooldownRef = useRef(false);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;
        const section = visibleEntry.target as HTMLElement;
        if (!section.id) return;

        if (activeSectionRef.current === null) {
          activeSectionRef.current = section.id;
          return;
        }

        if (activeSectionRef.current === section.id || cooldownRef.current) {
          return;
        }

        activeSectionRef.current = section.id;
        cooldownRef.current = true;
        setToken((prev) => prev + 1);
        setVisible(true);

        if (hideTimerRef.current) {
          window.clearTimeout(hideTimerRef.current);
        }

        hideTimerRef.current = window.setTimeout(() => {
          setVisible(false);
          cooldownRef.current = false;
        }, 560);
      },
      {
        threshold: [0.42, 0.62, 0.82],
        rootMargin: "-12% 0px -22% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={`scroll-transition-${token}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-125"
          aria-hidden="true"
        >
          <motion.div
            initial={{ scaleX: 0, opacity: 0.65 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.46, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute left-0 top-0 h-px w-full origin-left bg-white/70"
          />
          <motion.div
            initial={{ scaleX: 0, opacity: 0.65 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.46, delay: 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute bottom-0 right-0 h-px w-full origin-right bg-white/55"
          />
          <motion.div
            initial={{ opacity: 0.34 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,58,73,0.22),transparent_62%)]"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
