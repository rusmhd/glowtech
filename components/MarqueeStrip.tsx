"use client";

import gsap from "gsap";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const items = [
  "Precision Fitment",
  "Custom Paint",
  "Performance Tuning",
  "Aero Programs",
  "Track-Ready Builds",
  "Detail Craft",
  "Signature Delivery"
];

export default function MarqueeStrip() {
  const laneTopRef = useRef<HTMLDivElement | null>(null);
  const laneBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!laneTopRef.current || !laneBottomRef.current) return;

    const topTween = gsap.to(laneTopRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    const bottomTween = gsap.to(laneBottomRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 24,
      repeat: -1,
    });

    const root = laneTopRef.current.closest("section");

    const handleEnter = () => {
      gsap.to(topTween, { timeScale: 0.2, duration: 0.35, ease: "power2.out" });
      gsap.to(bottomTween, { timeScale: 0.2, duration: 0.35, ease: "power2.out" });
    };

    const handleLeave = () => {
      gsap.to(topTween, { timeScale: 1, duration: 0.45, ease: "power2.out" });
      gsap.to(bottomTween, { timeScale: 1, duration: 0.45, ease: "power2.out" });
    };

    root?.addEventListener("mouseenter", handleEnter);
    root?.addEventListener("mouseleave", handleLeave);

    return () => {
      root?.removeEventListener("mouseenter", handleEnter);
      root?.removeEventListener("mouseleave", handleLeave);
      topTween.kill();
      bottomTween.kill();
    };
  }, []);

  return (
    <motion.section
      className="section-shell overflow-hidden py-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="marquee-mask space-y-2">
        <div className="overflow-hidden">
          <div ref={laneTopRef} className="ticker-inner flex w-max items-center text-[11px] uppercase tracking-[0.24em] text-glow-blue/80">
            <div className="flex items-center gap-8 pr-8">
              {items.map((text, idx) => (
                <span key={`top-a-${text}-${idx}`} className="inline-flex items-center gap-8">
                  <span>{text}</span>
                  <span className="text-white/30">•</span>
                </span>
              ))}
            </div>
            <div aria-hidden="true" className="flex items-center gap-8 pr-8">
              {items.map((text, idx) => (
                <span key={`top-b-${text}-${idx}`} className="inline-flex items-center gap-8">
                  <span>{text}</span>
                  <span className="text-white/30">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <div ref={laneBottomRef} className="ticker-inner flex w-max items-center text-[10px] uppercase tracking-[0.22em] text-white/35">
            <div className="flex items-center gap-8 pr-8">
              {items.map((text, idx) => (
                <span key={`bottom-a-${text}-${idx}`} className="inline-flex items-center gap-8">
                  <span>{`Glow Tech ${text}`}</span>
                  <span className="text-white/30">/</span>
                </span>
              ))}
            </div>
            <div aria-hidden="true" className="flex items-center gap-8 pr-8">
              {items.map((text, idx) => (
                <span key={`bottom-b-${text}-${idx}`} className="inline-flex items-center gap-8">
                  <span>{`Glow Tech ${text}`}</span>
                  <span className="text-white/30">/</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
