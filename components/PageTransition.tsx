"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function PageTransition() {
  const [active, setActive] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const initTimer = window.setTimeout(() => setActive(false), 780);
    return () => window.clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    const handleAnchorTransition = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href^='#']") as HTMLAnchorElement | null;

      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.length < 2) return;

      const section = document.querySelector(href) as HTMLElement | null;
      if (!section) return;

      event.preventDefault();

      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      setActive(true);
      timerRef.current = window.setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setActive(false);
      }, 320);
    };

    document.addEventListener("click", handleAnchorTransition);
    return () => {
      document.removeEventListener("click", handleAnchorTransition);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="transition-veil"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-130"
        >
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.72, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-x-0 top-0 h-1/2 bg-black"
          />
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 0.72, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-black"
          />
          <motion.div
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,58,73,0.36),transparent_62%)]"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
