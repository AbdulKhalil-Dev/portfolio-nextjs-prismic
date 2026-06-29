"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function LoadingBar() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); 

  useEffect(() => {
    if (!progressBarRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.set(containerRef.current, { display: "block", opacity: 1, y: 0 });
      gsap.set(progressBarRef.current, { scaleX: 0 });

      tl.to(progressBarRef.current, {
        scaleX: 1,
        duration: 1.2, // Page changes par 1.5 thoda slow lagta hai, 1.2 is smoother
        ease: "power2.out",
      }).to(containerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: "power1.in",
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = "none";
        },
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-[9999] h-0.5 bg-white/5 backdrop-blur-sm"
    >
      <div
        ref={progressBarRef}
        className="h-full w-full origin-left"
        style={{
          background:
            "linear-gradient(90deg, #e84393 0%, #f368e0 25%, #ff9f43 55%, #00d2d3 80%, #1dd1a1 100%)",
          boxShadow:
            "0 0 8px rgba(243, 104, 224, 0.4), 0 0 16px rgba(255, 159, 67, 0.2)",
        }}
      />
    </div>
  );
}
