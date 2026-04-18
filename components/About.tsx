"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "./CountUp";
import AnimatedHeading from "./AnimatedHeading";

export default function About() {
  const pillars = [
    {
      id: "01",
      title: "Strategy",
      detail: "We map your references, budget, and usage goals into a practical build blueprint.",
    },
    {
      id: "02",
      title: "Craft",
      detail: "Bodywork, paint, and fitment are coordinated in one workflow for cleaner results.",
    },
    {
      id: "03",
      title: "Delivery",
      detail: "Final checks, calibration, and handover walkthrough ensure the build is road-ready.",
    },
  ] as const;

  const [activePillar, setActivePillar] = useState<(typeof pillars)[number]["id"]>("01");
  const active = pillars.find((pillar) => pillar.id === activePillar) ?? pillars[0];

  return (
    <motion.section
      id="about"
      data-theme="charcoal"
      className="section-shell section-grid py-20 md:py-24"
    >
      <div className="section-inner grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="panel-soft p-7 md:p-10"
        >
          <p className="section-label">Studio Manifesto</p>
          <h2 className="headline-xl mt-3 text-5xl md:text-7xl">
            <span className="sr-only">AUTOMOTIVE DESIGN, ENGINEERED AS EXPERIENCE.</span>
            <AnimatedHeading
              lines={[
                { text: "AUTOMOTIVE DESIGN," },
                { text: "ENGINEERED AS EXPERIENCE.", className: "text-white/70" },
              ]}
              delayStart={0.03}
            />
          </h2>
          <p className="mt-7 max-w-2xl text-base md:text-lg leading-relaxed text-white/78">
            Glow Tech is a build studio for owners who want one clear identity across shape, finish, sound, and response. We translate references into executable road-ready programs.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {pillars.map((pillar) => {
              const isActive = pillar.id === activePillar;

              return (
                <motion.button
                  key={pillar.id}
                  type="button"
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onMouseEnter={() => setActivePillar(pillar.id)}
                  onFocus={() => setActivePillar(pillar.id)}
                  onClick={() => setActivePillar(pillar.id)}
                  className={`border px-4 py-3 text-left transition-colors ${
                    isActive ? "border-glow-blue bg-white/6" : "border-white/10 hover:border-white/30"
                  }`}
                  aria-pressed={isActive}
                >
                  <p className={`text-[10px] uppercase tracking-[0.17em] ${isActive ? "text-glow-blue" : "text-white/50"}`}>
                    {pillar.id} {pillar.title}
                  </p>
                  <p className="mt-2 text-sm text-white/80">Tap to preview this phase.</p>
                </motion.button>
              );
            })}
          </div>
          <motion.p
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-4 border-l-2 border-glow-blue pl-4 text-sm text-white/82"
          >
            {active.detail}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="grid gap-4"
        >
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.14, ease: "easeOut" }}
            className="panel-soft border-l-2 border-l-glow-blue p-6 md:p-8"
          >
            <div className="text-5xl font-heading text-glow-blue font-semibold">
              <CountUp
                to={9}
                from={0}
                duration={2.5}
                delay={0.14}
                separator=""
              />
              <span>+</span>
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-glow-muted">Years In Custom Builds</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.22, ease: "easeOut" }}
            className="panel-soft border-l-2 border-l-glow-blue p-6 md:p-8"
          >
            <div className="text-5xl font-heading text-glow-blue font-semibold">
              <CountUp
                to={100}
                from={0}
                duration={2.5}
                delay={0.22}
                separator=""
              />
              <span>+</span>
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-glow-muted">Completed Transformations</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.28, ease: "easeOut" }}
            className="panel-soft p-6 md:p-8"
          >
            <p className="section-label">Commitment</p>
            <p className="mt-2 text-lg leading-snug text-white">
              Limited intake. Direct communication. No assembly-line shortcuts.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}