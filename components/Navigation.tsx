"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Magnetic from "@/components/Magnetic";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const linkVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 + i * 0.05, duration: 0.35, ease: "easeOut" },
    }),
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -26, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-glow-black-900/88 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-glow-black-900/50 backdrop-blur-sm border-b border-white/8 py-4"
      }`}
    >
      <div className="section-inner flex items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.4, ease: "easeOut" }}
        >
          <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/brand/glowlogo.jpeg"
            alt="Glow Tech logo"
            width={44}
            height={44}
            className="h-10 w-10 rounded-full border border-white/10 object-cover md:h-11 md:w-11"
            priority
          />
          <span className="text-2xl md:text-3xl font-heading font-medium tracking-[-0.03em] text-white leading-none">
            GLOW <span className="text-glow-blue">TECH</span>
          </span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navLinks.map((link, idx) => (
            <motion.div
              key={link.name}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              custom={idx}
              whileHover={{ y: -2 }}
            >
              <Link
                href={link.href}
                data-cursor
                data-cursor-label={link.name.toLowerCase()}
                className="text-xs lg:text-sm font-light uppercase tracking-[0.2em] text-glow-chrome/80 hover:text-glow-blue transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          className="hidden md:flex items-center"
        >
          <Magnetic strength={0.22}>
            <a
              href="#contact"
              data-cursor
              data-cursor-label="quote"
              className="bg-glow-purple px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#24485a] hover:shadow-[0_8px_26px_rgba(29,58,73,0.28)]"
            >
              Start A Build
            </a>
          </Magnetic>
        </motion.div>

        <button
          className="md:hidden text-2xl text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-glow-black-900/95 backdrop-blur-lg border-b border-white/10"
          >
            <div className="section-inner flex flex-col py-6 space-y-5 shadow-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-light uppercase tracking-[0.16em] border-b border-white/10 pb-3 hover:text-glow-blue transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center justify-center bg-glow-purple px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white"
              >
                Start A Build
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}