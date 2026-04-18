"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const links = [
    { label: "Privacy Policy", cursor: "privacy" },
    { label: "Terms Of Service", cursor: "terms" },
    { label: "Instagram", cursor: "insta" },
    { label: "YouTube", cursor: "youtube" },
  ];

  return (
    <motion.footer
      data-theme="black"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-t border-white/10 bg-glow-black-900 py-8"
    >
      <div className="section-inner grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center text-[11px] uppercase tracking-[0.14em] text-glow-muted">
        <Link href="/" data-cursor data-cursor-label="home" className="flex items-center gap-3">
          <Image
            src="/assets/brand/glowlogo.jpeg"
            alt="Glow Tech logo"
            width={36}
            height={36}
            className="h-8 w-8 rounded-full border border-white/10 object-cover md:h-9 md:w-9"
          />
          <div>
            <span className="font-heading text-xl tracking-[-0.03em] text-white">Glow Tech</span>
            <p className="mt-0.5 text-[9px] tracking-[0.18em] text-white/45">Automotive Craft Studio</p>
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-5 md:justify-center">
          {links.map((link, idx) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.1 + idx * 0.05, duration: 0.35, ease: "easeOut" }}
              whileHover={{ y: -2 }}
            >
              <Link href="#" data-cursor data-cursor-label={link.cursor} className="transition hover:text-white">
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-white/60 md:text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.24, duration: 0.4, ease: "easeOut" }}
        >
          © {currentYear} Glow Tech Automotive
        </motion.p>
      </div>
    </motion.footer>
  );
}