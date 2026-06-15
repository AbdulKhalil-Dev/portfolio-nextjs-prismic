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
        opacity: 1,
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
    <div className="fixed top-1.5 left-4 right-4 z-50 h-1 rounded-full bg-white/5 md:left-12 md:right-12">
      <div
        ref={progressBarRef}
        className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#39ff14] via-[#00f3ff] to-[#9d00ff] shadow-[0_0_10px_rgba(0,243,255,0.6)]"
        style={{ transform: "scaleX(0)" , opacity: 0 }}
      />
    </div>
  );
}