"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type HeadingLine = {
  text: string;
  className?: string;
};

type AnimatedHeadingProps = {
  lines: HeadingLine[];
  delayStart?: number;
};

export default function AnimatedHeading({ lines, delayStart = 0 }: AnimatedHeadingProps) {
  const headingRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(headingRef, {
    once: true,
    margin: "0px 0px -15% 0px",
  });

  return (
    <span ref={headingRef}>
      {lines.map((line, lineIndex) => (
        <span
          key={`${line.text}-${lineIndex}`}
          className="line-wrapper block overflow-hidden"
        >
          <motion.span
            className={`line-inner block will-change-transform ${line.className ?? ""}`}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.9,
              delay: delayStart + lineIndex * 0.12,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            aria-hidden="true"
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
