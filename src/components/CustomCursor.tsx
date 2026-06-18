"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;

    if (!dot || !outline) return;

    gsap.set([dot, outline], { xPercent: -50, yPercent: -50 });

    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3.out" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3.out" });

    const outlineXTo = gsap.quickTo(outline, "x", { duration: 0.25, ease: "power3.out" });
    const outlineYTo = gsap.quickTo(outline, "y", { duration: 0.25, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      dotXTo(e.clientX);
      dotYTo(e.clientY);
      
      outlineXTo(e.clientX);
      outlineYTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a") || target.closest("button") || window.getComputedStyle(target).cursor === "pointer";

      if (isInteractive) {
        gsap.to(outline, {
          scale: 1.5,
          borderColor: "transparent",
          backgroundColor: "rgba(0, 255, 255, 0.1)", 
          duration: 0.2,
          overwrite: "auto"
        });
        gsap.to(dot, {
          scale: 1.2,
          backgroundColor: "#00f3ff",
          duration: 0.2,
          overwrite: "auto"
        });
      } else {
        gsap.to(outline, {
          scale: 1,
          borderColor: "#00ffff",
          backgroundColor: "rgba(0, 255, 255, 0.05)",
          duration: 0.2,
          overwrite: "auto"
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#39ff14",
          duration: 0.2,
          overwrite: "auto"
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-[#39ff14] hidden md:block"
      />

      <div
        ref={cursorOutlineRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-6 w-6 rounded-full border border-[#00ffff] bg-[#00ffff]/5 hidden md:block"
      />
    </>
  );
}