"use client";

import { FC, useEffect, useRef, useMemo } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import dynamic from "next/dynamic";
import Bounded from "@/components/Bounded";
import Link from "next/link";

gsap.registerPlugin(TextPlugin);

const Shapes = dynamic(() => import("./Shapes"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full" />,
});

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  const component = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);

  const words = useMemo(() => {
    return [
      "Frontend Engineer",
      "React & Next.js Expert",
      "UI/UX Focused Engineer",
      "Creative Technologist",
      "MERN Stack Specialist",
      "Beyond Interfaces",
    ];
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".name-animation",
        { x: -100, opacity: 0, rotate: -10 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          transformOrigin: "left top",
          delay: 0.5,
          stagger: { each: 0.1, from: "random" },
          clearProps: "willChange",
        },
      );

      tl.fromTo(
        ".desc-animation",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3",
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
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="order-2 col-start-1 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">
          <h1
            className="mb-3 text-[clamp(2rem,6vmin,7rem)] leading-[1.05] font-bold tracking-tight"
            aria-label={`${slice.primary.first_name || ""} ${slice.primary.last_name || ""}`}
          >
            <span className="mb-1 block text-[0.45em] font-semibold tracking-wide text-slate-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="mt-1 block text-orange-500 drop-shadow-[0_0_14px_rgba(249,115,22,0.4)]">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="mb-6 flex min-h-[28px] items-center text-sm font-bold tracking-[.25em] text-slate-400 uppercase md:text-base">
            <span ref={typewriterRef}></span>
            <span className="ml-0.5 animate-pulse font-normal text-slate-300">
              |
            </span>
          </span>
          {slice.primary.description && (
            <div className="desc-animation max-w-lg opacity-0">
              <div className="text-base leading-relaxed tracking-wide text-slate-300 md:text-lg">
                <PrismicRichText field={slice.primary.description} />
              </div>
            </div>
          )}
          <div className="desc-animation mt-8 opacity-0">
            <Link
              href="/projects"
              className="rounded-full bg-orange-500 px-8 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-orange-600 hover:drop-shadow-[0_0_6px_rgba(249,115,22,0.3)]"
            >
              View Projects
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Shapes />
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
