"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Magnetic from "@/components/Magnetic";
import TiltCard from "@/components/TiltCard";
import AnimatedHeading from "@/components/AnimatedHeading";
import SplitRevealText from "@/components/SplitRevealText";

const services = [
  {
    id: "01",
    title: "Body Kits",
    description: "Platform-specific aero kits aligned and finished for OEM-level fit with aggressive silhouette control.",
    image: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?q=80&w=1400&auto=format&fit=crop",
    cta: "Discuss Aero Program",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "02",
    title: "Custom Paint",
    description: "Layered color systems from glass-like gloss to satin stealth with premium prep and clear depth.",
    image: "/assets/uploads/screen.png",
    cta: "Build Color Direction",
    className: "md:col-span-2",
  },
  {
    id: "03",
    title: "Performance",
    description: "Targeted tuning and hardware combinations for cleaner response and confident everyday drivability.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1400&auto=format&fit=crop",
    cta: "Plan A Stage Package",
    className: "md:col-span-2",
  },
  {
    id: "04",
    title: "Parts Supply",
    description: "Sourcing support for platform-correct parts, from rare aero pieces to proven performance essentials.",
    image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?q=80&w=1400&auto=format&fit=crop",
    cta: "Source Components",
    className: "md:col-span-4",
  },
];

export default function Services() {
  const [activeServiceId, setActiveServiceId] = useState("01");
  const activeService = useMemo(
    () => services.find((service) => service.id === activeServiceId) ?? services[0],
    [activeServiceId]
  );

  return (
    <section id="services" data-theme="steel" className="section-shell py-20 md:py-24">
      <div className="section-inner">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="headline-xl text-5xl md:text-7xl"
          >
            <span className="sr-only">SERVICES BUILT AS SYSTEMS</span>
            <AnimatedHeading
              lines={[
                { text: "SERVICES" },
                { text: "BUILT AS SYSTEMS", className: "text-white/65" },
              ]}
              delayStart={0.04}
            />
          </motion.h2>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-glow-blue"
          >
            Precision. Character. Reliability.
          </motion.span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[210px]">
          {services.map((service, index) => (
            <TiltCard
              key={index}
              intensity={7}
              className={`perspective-[1000px] ${service.className}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ scale: 1.02, y: -4 }}
                onMouseEnter={() => setActiveServiceId(service.id)}
                onFocusCapture={() => setActiveServiceId(service.id)}
                onClick={() => setActiveServiceId(service.id)}
                className={`group relative h-full overflow-hidden border bg-glow-black-800 transition-colors ${
                  activeServiceId === service.id ? "border-glow-blue" : "border-white/10"
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-75 transition duration-700 group-hover:scale-110 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/92 via-black/42 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-black/36 to-transparent" />

                <div className="absolute bottom-0 z-10 p-5 md:p-6">
                  <span className="text-[10px] uppercase tracking-[0.17em] text-glow-blue/90">{service.id}</span>
                  <h3 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-white leading-[0.85]">
                    <span className="sr-only">{service.title}</span>
                    <SplitRevealText
                      text={service.title}
                      by="words"
                      stagger={0.06}
                      duration={0.5}
                      delay={0.04}
                      once={true}
                      maskLine={true}
                    />
                  </h3>
                  <p className="mt-2 max-w-[34ch] sm:max-w-[38ch] text-sm leading-relaxed text-gray-200/90">
                    {service.description}
                  </p>
                  <Magnetic strength={0.18}>
                    <a
                      href="#contact"
                      data-cursor
                      data-cursor-label="open"
                      className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-glow-blue"
                    >
                      {service.cta}
                      <FiArrowRight />
                    </a>
                  </Magnetic>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        <motion.div
          key={activeService.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="mt-5 panel-soft p-5 md:p-6"
        >
          <p className="section-label">Interactive Service Spotlight</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-2xl md:text-3xl font-heading tracking-[-0.03em] text-white">{activeService.title}</p>
              <p className="mt-2 max-w-2xl text-sm md:text-base text-white/75">{activeService.description}</p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-white transition hover:border-glow-blue hover:text-glow-blue"
            >
              {activeService.cta}
              <FiArrowRight />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}