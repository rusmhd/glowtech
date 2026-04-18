"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

type SplitRevealTextProps = {
  text: string;
  className?: string;
  by?: "chars" | "words";
  once?: boolean;
  delay?: number;
  stagger?: number;
  duration?: number;
  maskLine?: boolean;
};

type Unit = {
  key: string;
  text: string;
};

export default function SplitRevealText({
  text,
  className = "",
  by = "chars",
  once = true,
  delay = 0,
  stagger = 0.028,
  duration = 0.62,
  maskLine = true,
}: SplitRevealTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -18% 0px" });

  const units = useMemo<Unit[]>(() => {
    if (by === "words") {
      const words = text.split(" ");
      return words.map((word, idx) => ({
        key: `${word}-${idx}`,
        text: idx === words.length - 1 ? word : `${word}\u00A0`,
      }));
    }

    return Array.from(text).map((char, idx) => ({
      key: `char-${char}-${idx}`,
      text: char === " " ? "\u00A0" : char,
    }));
  }, [by, text]);

  return (
    <span ref={ref} className={className} aria-hidden="true">
      {units.map((unit, idx) => (
        <span key={unit.key} className="relative inline-block overflow-hidden align-bottom pb-[0.08em]">
          {maskLine ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-current/45"
            />
          ) : null}
          <motion.span
            initial={{ y: "115%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
            transition={{
              duration,
              delay: delay + idx * stagger,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="inline-block will-change-transform"
          >
            {unit.text}
          </motion.span>
        </span>
      ))}
    </span>
  );
}