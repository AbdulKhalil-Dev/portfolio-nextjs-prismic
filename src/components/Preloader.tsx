"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressObj = { val: 0 };

    const tween = gsap.to(progressObj, {
      val: 100,
      duration: 1.5,
      ease: "power1.inOut",
      onUpdate: () => {
        setProgress(Math.round(progressObj.val));
      },
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          y: "-100%",
          duration: 0.8,
          delay: 0.3,
          ease: "power4.inOut",
          onComplete: () => setShouldRender(false),
        });
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0516]/95 backdrop-blur-md text-white w-full h-full px-4"
    >
      {/* Rotating ring + 3 dots container */}
      <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28">
        <div
          className="absolute inset-0 rounded-full border animate-spin [animation-duration:3s]"
          style={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
        >
          <div
            className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_4px_rgba(10, 189, 227, 0.7)]"
            style={{ backgroundColor: "#0abde3" }}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.4)] animate-pulse" />

          <div className="flex gap-5">
            <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.4)] animate-pulse [animation-delay:0.2s]" />
            <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.4)] animate-pulse [animation-delay:0.4s]" />
          </div>
        </div>
      </div>

      <div className="mt-8 w-full max-w-[160px] sm:max-w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#0abde3] via-[#ee5253] to-white rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 font-mono text-[11px] sm:text-xs tracking-widest text-zinc-400 font-medium uppercase">
        {progress < 100 ? `Loading ${progress}%` : "Initializing..."}
      </div>
    </div>
  );
}