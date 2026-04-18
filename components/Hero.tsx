"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FiPlay, FiChevronDown, FiArrowUpRight } from "react-icons/fi";
import Magnetic from "@/components/Magnetic";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const modes = useMemo(
    () => [
      {
        id: "street",
        label: "Street",
        kicker: "Coachbuilt Aesthetics. Street-Legal Execution.",
        lines: [
          { text: "SHAPE", className: "text-white" },
          { text: "A LEGACY", className: "text-glow-blue" },
          { text: "ON WHEELS.", className: "text-white" },
        ],
        copy: "We design and execute complete automotive transformations from aero and paint to performance and details, built as one coherent statement.",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2200&auto=format&fit=crop",
        window: "May 2026",
        programs: "100+",
        years: "9",
      },
      {
        id: "track",
        label: "Track",
        kicker: "Data-Led Upgrades. Circuit-Capable Setup.",
        lines: [
          { text: "PUSH", className: "text-white" },
          { text: "PAST LIMITS", className: "text-glow-blue" },
          { text: "WITH CONTROL.", className: "text-white" },
        ],
        copy: "Track-focused packages balancing grip, brake confidence, cooling, and response without sacrificing daily usability.",
        image: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2200&auto=format&fit=crop",
        window: "June 2026",
        programs: "42",
        years: "9",
      },
      {
        id: "show",
        label: "Show",
        kicker: "Visual Drama. Precision Finish.",
        lines: [
          { text: "TURN", className: "text-white" },
          { text: "EYES INTO", className: "text-glow-blue" },
          { text: "LOYALTY.", className: "text-white" },
        ],
        copy: "Show-ready builds with layered paint depth, stance refinement, and detail treatment designed for visual impact.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2200&auto=format&fit=crop",
        window: "Open Intake",
        programs: "58",
        years: "9",
      },
    ],
    []
  );
  const [modeIndex, setModeIndex] = useState(0);
  const activeMode = modes[modeIndex] ?? modes[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setModeIndex((prev) => (prev + 1) % modes.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [modes.length]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const entrance = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={heroRef}
      id="home"
      data-theme="deep"
      className="relative min-h-screen w-full overflow-hidden section-shell section-grid pt-24"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeMode.image}
              alt="Performance car hero"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-linear-to-r from-black/88 via-black/48 to-black/72" />
      <motion.div
        style={{ y: glowY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_24%,rgba(29,58,73,0.28),transparent_42%)] animate-drift-glow"
      />
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.02, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-glow-purple/18 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.22, 0.48, 0.22], x: [0, 14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-white/6 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.18, 0.32, 0.18], y: [0, -10, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-6 hidden h-24 w-24 rounded-full border border-white/12 bg-white/5 backdrop-blur-sm md:block"
      />

      <div className="section-inner relative z-10 grid min-h-[88vh] items-end gap-8 pb-12 pt-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <motion.span
                variants={entrance}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="display-kicker w-fit animate-soft-pulse"
              >
                {activeMode.kicker}
              </motion.span>

              <motion.h1
                variants={entrance}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.72, delay: 0.08, ease: "easeOut" }}
                className="headline-xl mt-5 max-w-4xl text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                <span className="sr-only">{activeMode.lines.map((line) => line.text).join(" ")}</span>
                <AnimatedHeading
                  lines={activeMode.lines}
                  delayStart={0.06}
                />
              </motion.h1>

              <motion.p
                variants={entrance}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.14, ease: "easeOut" }}
                className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-white/80"
              >
                {activeMode.copy}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            variants={entrance}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
            className="mt-9 flex flex-col flex-wrap items-stretch gap-4 sm:flex-row sm:items-center"
          >
            <Magnetic strength={0.24}>
              <motion.a
                href="#contact"
                data-cursor
                data-cursor-label="book"
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 bg-glow-purple px-7 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#24485a] hover:shadow-[0_12px_30px_rgba(29,58,73,0.28)]"
              >
                Start A Build
                <FiArrowUpRight />
              </motion.a>
            </Magnetic>

            <Magnetic strength={0.2}>
              <motion.a
                href="#gallery"
                data-cursor
                data-cursor-label="reel"
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 border border-white/30 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition duration-300 hover:border-glow-purple hover:text-glow-purple"
              >
                <FiPlay className="text-sm" />
                Watch Showcase
              </motion.a>
            </Magnetic>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.aside
            key={`aside-${activeMode.id}`}
            variants={entrance}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="panel-soft grid gap-4 p-5 md:p-6"
          >
            <div>
              <p className="section-label">Current Build Window</p>
              <p className="mt-1 text-3xl font-heading tracking-[-0.04em] text-white">{activeMode.window}</p>
            </div>
            <div className="h-px w-full bg-white/10" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-4xl font-heading tracking-[-0.04em] text-glow-blue">{activeMode.programs}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.17em] text-white/55">Finished Programs</p>
              </div>
              <div>
                <p className="text-4xl font-heading tracking-[-0.04em] text-glow-blue">{activeMode.years}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.17em] text-white/55">Years Crafting</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/72">
              Every package is engineered around your platform and daily use, then refined until it photographs as cleanly as it drives.
            </p>
          </motion.aside>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 transform md:block"
      >
        <a href="#about" className="text-gray-400 transition-colors hover:text-glow-blue">
          <FiChevronDown className="text-4xl" />
        </a>
      </motion.div>
    </section>
  );
}