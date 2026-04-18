"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import TiltCard from "@/components/TiltCard";
import AnimatedHeading from "@/components/AnimatedHeading";

const galleryData = [
  { id: 1, category: "exterior", url: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?q=80&w=1200&auto=format&fit=crop", alt: "Rear profile sports car" },
  { id: 2, category: "exterior", url: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?q=80&w=1200&auto=format&fit=crop", alt: "Low side silhouette" },
  { id: 3, category: "interior", url: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1200&auto=format&fit=crop", alt: "Interior steering detail" },
  { id: 4, category: "performance", url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop", alt: "Front hero lighting" },
];

export default function Gallery() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "exterior" | "interior" | "performance">("all");
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const smoothX = useSpring(px, { stiffness: 120, damping: 20, mass: 0.4 });
  const smoothY = useSpring(py, { stiffness: 120, damping: 20, mass: 0.4 });

  const handleModalMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;

    px.set(nx * 24);
    py.set(ny * 24);
  };

  const resetModalParallax = () => {
    px.set(0);
    py.set(0);
  };

  const filtered = useMemo(
    () => galleryData.filter((img) => filter === "all" || img.category === filter),
    [filter]
  );

  const activeIndex = activeId === null ? null : filtered.findIndex((img) => img.id === activeId);

  const openByIndex = (index: number) => {
    const img = filtered[index];
    if (!img) return;
    setActiveId(img.id);
  };

  const stepModal = (step: number) => {
    if (activeIndex === null || filtered.length === 0) return;
    const nextIndex = (activeIndex + step + filtered.length) % filtered.length;
    setActiveId(filtered[nextIndex].id);
  };

  useEffect(() => {
    if (activeId === null) return;
    const exists = filtered.some((img) => img.id === activeId);
    if (!exists) {
      setActiveId(filtered[0]?.id ?? null);
    }
  }, [activeId, filtered]);

  useEffect(() => {
    if (activeId === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveId(null);
      }

      if (event.key === "ArrowLeft") {
        stepModal(-1);
      }

      if (event.key === "ArrowRight") {
        stepModal(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId, activeIndex, filtered]);

  return (
    <section id="gallery" data-theme="graphite" className="section-shell py-20 md:py-24">
      <div className="section-inner">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="headline-xl text-5xl md:text-7xl"
          >
            <span className="sr-only">SELECTED WORKS</span>
            <AnimatedHeading
              lines={[
                { text: "SELECTED" },
                { text: "WORKS", className: "text-white/65" },
              ]}
              delayStart={0.02}
            />
          </motion.h2>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            A rotating archive of completed details, from subtle OEM+ cleanups to full visual overhauls.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {(["all", "exterior", "interior", "performance"] as const).map((chip) => (
            <motion.button
              key={chip}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(chip)}
              className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] transition-colors ${
                filter === chip
                  ? "border-glow-blue bg-glow-blue/14 text-white"
                  : "border-white/20 text-white/75 hover:border-white/40"
              }`}
            >
              {chip}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
          {filtered.map((img, index) => (
            <TiltCard key={img.id} intensity={6} className="perspective-[900px]">
              <motion.figure
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group relative aspect-4/5 sm:aspect-3/4 overflow-hidden border border-white/10 bg-glow-black-800"
              >
                <button
                  type="button"
                  aria-label={`Open gallery image: ${img.alt}`}
                  onClick={() => openByIndex(index)}
                  data-cursor
                  data-cursor-label="view"
                  className="absolute inset-0 z-10 cursor-zoom-in"
                />
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/68 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 z-20 translate-y-full px-3 pb-3 pt-8 text-[10px] uppercase tracking-[0.16em] text-white/70 transition duration-500 group-hover:translate-y-0">
                  Frame {String(index + 1).padStart(2, "0")}
                </figcaption>
              </motion.figure>
            </TiltCard>
          ))}
        </div>

        {activeIndex !== null && filtered[activeIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={filtered[activeIndex].alt}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/92 px-4 py-6 backdrop-blur-sm"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-6xl overflow-hidden border border-white/10 bg-glow-black-800 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close gallery"
                onClick={() => setActiveId(null)}
                data-cursor
                data-cursor-label="close"
                className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-black/50 text-white transition hover:bg-glow-purple"
              >
                <FiX />
              </button>

              <button
                type="button"
                aria-label="Previous image"
                onClick={() => stepModal(-1)}
                data-cursor
                data-cursor-label="prev"
                className="absolute left-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/10 bg-black/45 text-white transition hover:bg-glow-purple"
              >
                <FiChevronLeft />
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={() => stepModal(1)}
                data-cursor
                data-cursor-label="next"
                className="absolute right-14 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/10 bg-black/45 text-white transition hover:bg-glow-purple"
              >
                <FiChevronRight />
              </button>

              <div
                className="relative aspect-16/10 w-full overflow-hidden md:aspect-video"
                onMouseMove={handleModalMove}
                onMouseLeave={resetModalParallax}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ x: smoothX, y: smoothY }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 80) stepModal(-1);
                    if (info.offset.x < -80) stepModal(1);
                  }}
                >
                  <Image
                    src={filtered[activeIndex].url}
                    alt={filtered[activeIndex].alt}
                    fill
                    sizes="100vw"
                    className="scale-105 object-cover"
                    priority
                  />
                </motion.div>
              </div>

              <div className="border-t border-white/10 px-5 py-4 md:px-6 md:py-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-glow-blue">Showcase</span>
                  <p className="text-sm md:text-base text-white">{filtered[activeIndex].alt}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}