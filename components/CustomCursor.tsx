"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type PointerState = {
  x: number;
  y: number;
};

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const pointer = useRef<PointerState>({ x: 0, y: 0 });
  const ring = useRef<PointerState>({ x: 0, y: 0 });
  const glow = useRef<PointerState>({ x: 0, y: 0 });
  const velocity = useRef(0);
  const prev = useRef<PointerState>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const interactiveSelector = useMemo(
    () => "a, button, [data-cursor], input, textarea, select, label",
    []
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = () => setEnabled(mq.matches);

    updateCapability();
    mq.addEventListener("change", updateCapability);

    return () => mq.removeEventListener("change", updateCapability);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      const now = performance.now();
      const dotEl = dotRef.current;
      const ringEl = ringRef.current;
      const glowEl = glowRef.current;
      const labelEl = labelRef.current;

      if (dotEl) {
        dotEl.style.transform = `translate3d(${pointer.current.x}px, ${pointer.current.y}px, 0)`;
      }

      ring.current.x += (pointer.current.x - ring.current.x) * 0.18;
      ring.current.y += (pointer.current.y - ring.current.y) * 0.18;
      glow.current.x += (pointer.current.x - glow.current.x) * 0.09;
      glow.current.y += (pointer.current.y - glow.current.y) * 0.09;

      velocity.current *= 0.9;

      if (ringEl) {
        const orbitX = Math.cos(now * 0.006) * (isHovering ? 8 : 5);
        const orbitY = Math.sin(now * 0.006) * (isHovering ? 8 : 5);
        const rotate = (now * 0.06) % 360;
        const scale = 1 + Math.min(velocity.current * 0.018, 0.2);

        ringEl.style.transform = `translate3d(${ring.current.x + orbitX}px, ${ring.current.y + orbitY}px, 0) rotate(${rotate}deg) scale(${scale})`;
      }

      if (glowEl) {
        const glowScale = isHovering ? 1.25 : 1;
        glowEl.style.transform = `translate3d(${glow.current.x}px, ${glow.current.y}px, 0) scale(${glowScale})`;
      }

      if (labelEl) {
        labelEl.style.transform = `translate3d(${ring.current.x + 20}px, ${ring.current.y + 18}px, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(rafRef.current);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      const dx = event.clientX - prev.current.x;
      const dy = event.clientY - prev.current.y;
      velocity.current = Math.sqrt(dx * dx + dy * dy);
      pointer.current = { x: event.clientX, y: event.clientY };
      prev.current = { x: event.clientX, y: event.clientY };
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(interactiveSelector) as HTMLElement | null;

      if (!interactive) {
        setIsHovering(false);
        setLabel("");
        return;
      }

      setIsHovering(true);
      setLabel(interactive.dataset.cursorLabel ?? "");
    };

    const handleLeaveWindow = () => {
      setIsHovering(false);
      setLabel("");
      velocity.current = 0;
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    window.addEventListener("blur", handleLeaveWindow);
    document.addEventListener("mouseleave", handleLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      window.removeEventListener("blur", handleLeaveWindow);
      document.removeEventListener("mouseleave", handleLeaveWindow);
    };
  }, [enabled, interactiveSelector]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-118 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-purple/35 blur-2xl transition-transform duration-300"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-121 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-120 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28%] border border-white/70 text-[9px] uppercase tracking-[0.16em] text-white mix-blend-difference transition-[width,height,background-color,border-color,opacity] duration-300 ${
          isHovering ? "h-14 w-14 border-white bg-white/12" : "bg-transparent"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/85" />
      </div>
      <div
        ref={labelRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-122 -translate-x-1/2 -translate-y-1/2 border border-white/15 bg-black/55 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm transition-opacity duration-200 ${
          label ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
      </div>
    </>
  );
}
