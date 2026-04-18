"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function AmbientAura() {
  const x = useMotionValue(50);
  const y = useMotionValue(22);

  const smoothX = useSpring(x, { stiffness: 80, damping: 22, mass: 0.6 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 22, mass: 0.6 });
  const background = useMotionTemplate`radial-gradient(44rem 44rem at ${smoothX}% ${smoothY}%, rgba(29,58,73,0.2), transparent 68%)`;

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      x.set((event.clientX / width) * 100);
      y.set((event.clientY / height) * 100);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-1 animate-gradient-breathe"
      style={{ background }}
    />
  );
}
