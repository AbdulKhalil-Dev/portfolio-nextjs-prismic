"use client";

import { FC, useEffect, useRef, useMemo } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import dynamic from "next/dynamic";
import Bounded from "@/components/Bounded";

gsap.registerPlugin(TextPlugin);

const Shapes = dynamic(() => import("./Shapes"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full" />,
});

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const component = useRef<HTMLDivElement>(null);

  /**
   * Typewriter.
   */
  const typewriterRef = useRef<HTMLSpanElement>(null);

  const words = useMemo(() => {
    return [
      "Frontend Engineer",
      "React & Next.js Expert",
      "UI/UX Focused Engineer",
      "Creative Technologist",
      "MERN Stack Specialist",
      "Full Stack Developer",
    ];
  }, []);

  /**
   * Gsap.
   */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          transformOrigin: "left top",
          delay: 0.8,
          stagger: {
            each: 0.1,
            from: "random",
          },
          clearProps: "willChange",
        },
      );

      if (typewriterRef.current) {
        const typewriterTl = gsap.timeline({ repeat: -1 });
        words.forEach((word) => {
          typewriterTl
            .to(typewriterRef.current, {
              duration: word.length * 0.08,
              text: word,
              ease: "none",
            })
            .to({}, { duration: 1.5 })
            .to(typewriterRef.current, {
              duration: word.length * 0.04,
              text: "",
              ease: "none",
            });
        });
      }
    }, component);
    return () => ctx.revert();
  }, [words]);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0 will-change-transform`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes />
        <div className="col-start-1 md:row-start-1 flex flex-col items-center text-center">
          <h1
            className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter whitespace-nowrap"
            aria-label={`${slice.primary.first_name || ""} ${slice.primary.last_name || ""}`}
          >
            <span className="block text-slate-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[0.2em] block text-[#7f8fa6] drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="min-h-[40px] block bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-xl font-bold uppercase tracking-[.2em] text-transparent md:text-2xl">
            <span ref={typewriterRef}></span>
            <span className="animate-pulse text-slate-100 ml-0.5 font-normal">
              |
            </span>
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
