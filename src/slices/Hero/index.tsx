"use client";

import { FC, useEffect, useRef, useState, useMemo } from "react";

import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes";

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
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

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
  
useEffect(() => {
    const currentWord = words[index];

    const timeout = setTimeout(() => {
      if (!deleting) {
        const nextText = currentWord.substring(0, text.length + 1);
        setText(nextText);

        if (nextText === currentWord) {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        const nextText = currentWord.substring(0, text.length - 1);
        setText(nextText);

        if (nextText === "") {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [deleting, index, words, text]);

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
          delay: 0.5,
          stagger: {
            each: 0.1,
            from: "random",
          },
        },
      );

      tl.fromTo(
        ".job-title",
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scale: 1,
          ease: "elastic.out(1,0.3)",
          onComplete: () => gsap.set(".job-title", { clearProps: "opacity" }),
        },
      );
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
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
            className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
            aria-label={`${slice.primary.first_name || ""} ${slice.primary.last_name || ""}`}
          >
            <span className="block text-slate-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[0.2em] block text-[#7f8fa6] drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span
            className="job-title min-h-[40px] block bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-xl font-bold uppercase tracking-[.2em] text-transparent md:text-2xl"
            style={{ opacity: text ? 1 : 0 }}
          >
            {text}
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
