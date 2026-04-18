"use client";

import { useState, useRef, useEffect, useCallback, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuMoveHorizontal } from "react-icons/lu";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerRect(containerRef.current.getBoundingClientRect());
    }
    const updateRect = () => {
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
    };
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !containerRect) return;
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging, containerRect]);

  const handleMouseMove = (e: ReactMouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: ReactTouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleStop = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;
      handleMove(event.clientX);
    };
    const handleWindowTouchMove = (event: TouchEvent) => {
      if (!isDragging) return;
      handleMove(event.touches[0].clientX);
    };

    window.addEventListener("mouseup", handleStop);
    window.addEventListener("touchend", handleStop);
    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("touchmove", handleWindowTouchMove, { passive: false });

    return () => {
        window.removeEventListener("mouseup", handleStop);
        window.removeEventListener("touchend", handleStop);
        window.removeEventListener("mousemove", handleWindowMouseMove);
        window.removeEventListener("touchmove", handleWindowTouchMove);
    };
  }, [handleMove, handleStop, isDragging]);

  const beforeImage = "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1600&auto=format&fit=crop"; // Stock standard
  const afterImage = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop"; // Tuned/customized

  return (
    <section className="py-24 bg-glow-black-900 border-b border-glow-black-800">
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-medium font-heading tracking-[-0.04em] uppercase"
          >
            Real <span className="text-glow-chrome">Build Results</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            Slide to compare stock versus completed build. This is the level of fit, finish, and visual impact you can expect from a GlowTech project.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
             <button className="bg-glow-black-800 border border-glow-purple text-white px-8 py-3 rounded font-medium uppercase tracking-[0.16em] hover:bg-glow-purple hover:text-white transition-all duration-300">
               Get A Quote
             </button>
          </motion.div>
        </div>

        {/* Slider Element */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 border border-glow-black-700 rounded-xl overflow-hidden shadow-2xl relative select-none"
        >
          <div
            ref={containerRef}
            className="relative w-full cursor-ew-resize overflow-hidden"
            style={{ aspectRatio: "21 / 9" }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            {...{ onMouseMove: handleMouseMove, onTouchMove: handleTouchMove }}
          >
            {/* Background Image (After) */}
            <div className="absolute inset-0">
               <Image
                 src={afterImage}
                 alt="Tuned vehicle after"
                 fill
                 className="object-cover pointer-events-none"
                 priority
               />
               <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white px-3 py-1 rounded text-xs font-medium font-heading uppercase tracking-[0.14em]">
                 Completed Build
               </span>
            </div>

            {/* Foreground Image (Before) with Clip Path */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
               <Image
                 src={beforeImage}
                 alt="Stock vehicle before"
                 fill
                 className="object-cover grayscale pointer-events-none" 
                 priority 
               />
               <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur text-white px-3 py-1 rounded text-xs font-medium font-heading uppercase tracking-[0.14em]">
                 Stock Vehicle
               </span>
            </div>

            {/* Slider Handle overlay */}
            <div
               className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(255,255,255,0.7)] z-10"
               style={{ left: `calc(${sliderPosition}% - 2px)` }}
            >
                <div className="absolute top-1/2 -mt-6 -ml-5 w-10 h-12 bg-white rounded flex items-center justify-center text-black text-xl shadow-[0_0_15px_rgba(255,255,255,0.8)] border border-glow-black-700">
                   <LuMoveHorizontal />
                </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}