"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollIndicator() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressBarRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "html",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5 backdrop-blur-sm">
      <div
        ref={progressBarRef}
        className="h-full w-full origin-left bg-gradient-to-r from-[#39ff14] via-[#00f3ff] to-[#9d00ff] shadow-[0_0_10px_rgba(0,243,255,0.6)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}