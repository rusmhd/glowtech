"use client";

import { useEffect } from "react";

export default function SectionThemeWatcher() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          const theme = visible.target.dataset.theme;
          if (theme) {
            document.body.setAttribute("data-theme", theme);
          }
        }
      },
      {
        threshold: [0.35, 0.6, 0.85],
        rootMargin: "-10% 0px -30% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return null;
}
