"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;

    if (!dot || !outline) return;

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
      if (
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        document.body.style.cursor === "pointer"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
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
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00f3ff] shadow-[0_0_8px_rgba(0,243,255,0.8)] transition-transform duration-150 ease-out hidden md:block"
        style={{ transform: "translate(-50%, -50%) scale(1)" }}
      />

      <div
        ref={cursorOutlineRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b721ff] bg-[#b721ff]/5 shadow-[0_0_15px_rgba(183,33,255,0.3)] transition-all duration-300 ease-out hidden md:block"
        style={{
          transform: `translate(-50%, -50%) ${isHovered ? "scale(1.8)" : "scale(1)"}`,
          borderColor: isHovered ? "#ff007f" : "#b721ff",
          backgroundColor: isHovered ? "rgba(255, 0, 127, 0.1)" : "rgba(183, 33, 255, 0.05)",
        }}
      />
    </>
  );
}