"use client";

import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";

type AvatarProps = {
  image: ImageField;
  className?: string;
};

export default function Avatar({ image, className }: AvatarProps) {
  const component = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        { opacity: 0, scale: 1.4 },
        { scale: 1, opacity: 1, duration: 1.3, ease: "power3.inOut" },
      );

      const handleMouseMove = (e: MouseEvent) => {
        if (!component.current) return;
        const componentReact = component.current.getBoundingClientRect();
        const componentCenterX = componentReact.left + componentReact.width / 2;

        const componentPercent = {
          x: (e.clientX - componentCenterX) / (componentReact.width / 2),
        };

        const distFromCenter = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
              duration: 0.5,
            },
            0,
          )
          .to(
            ".highlight",
            {
              opacity: distFromCenter - 0.7,
              x: -10 + 20 * componentPercent.x,
            },
            0,
          );
      };
      window.addEventListener("mousemove", handleMouseMove);

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={component} className={clsx("relative h-full w-full", className)}>
      <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
        <PrismicNextImage
          field={image}
          fallbackAlt =""
          className="avatar-image h-full w-full object-cover"
          imgixParams={{ q: 90 }}
        />
        <div className="highlight absolute inset-0 hidden w-full scale-105 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
}
