"use client";

import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { Content, asLink, KeyTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Contact from "./Contact";

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [open, setOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const pathname = usePathname();

  // Background body scroll ko lock karne ke liye jab menu open ho
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleContactClick = () => {
    setOpen(false);
    setIsContactOpen(true);
  };

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-br from-[#273468]/60 to-[#394b97]/50 backdrop-blur-md"
      >
        <ul className="flex flex-row items-center justify-between px-6 py-4 md:mx-auto md:w-full md:max-w-4xl">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-600 shadow-[0_0_8px_#16a34a]"></span>
            </div>
            <NameLogo name={settings.data.name} />
          </div>

          {/* Double Line Hamburger Button */}
          <button
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-6 w-6 flex-col justify-center gap-1.5 md:hidden focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <span
              className={clsx(
                "h-0.5 w-6 bg-white transition-all duration-300 ease-in-out",
                open ? "translate-y-1 rotate-45" : ""
              )}
            />
            <span
              className={clsx(
                "h-0.5 w-6 bg-white transition-all duration-300 ease-in-out",
                open ? "-translate-y-1 -rotate-45" : ""
              )}
            />
          </button>

          {/* Backdrop Overlay */}
          <div
            className={clsx(
              "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
              open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            )}
            onClick={() => setOpen(false)}
          />

          {/* Transparent Glassmorphism Mobile Menu */}
          <div
            className={clsx(
              "fixed top-0 right-0 bottom-0 z-40 flex w-72 flex-col border-l border-white/10 px-8 pt-24 pb-10 md:hidden",
              "bg-gradient-to-b from-[#273468] to-[#394b97] backdrop-blur-xl shadow-2xl",
              "transition-transform duration-300 ease-in-out",
              open ? "translate-x-0" : "translate-x-full"
            )}
          >
            {/* Menu Options */}
            <div className="flex flex-col gap-4">
              {settings?.data?.nav_items?.map(({ link, label }) => {
                const isActive = pathname.includes(asLink(link) as string);
                return (
                  <li key={label} className="list-none">
                    <PrismicNextLink
                      className="group/link relative flex w-full items-center justify-between py-2 text-xl font-semibold text-white/90 transition-colors duration-200 hover:text-orange-400"
                      field={link}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                      <span
                        className={clsx(
                          "relative flex h-2 w-2 items-center justify-center transition-all duration-300",
                          isActive ? "opacity-100 scale-100" : "opacity-0 scale-50 group-hover/link:opacity-100 group-hover/link:scale-100"
                        )}
                      >
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" />
                      </span>
                    </PrismicNextLink>
                  </li>
                );
              })}
            </div>

            {/* CTA Button at Bottom */}
            <div className="mt-auto">
              <button
                onClick={handleContactClick}
                className="w-full rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:bg-orange-600 active:scale-95"
              >
                {settings.data.cta_label || "Contact"}
              </button>
            </div>
          </div>

          {/* Desktop Menu */}
          <DesktopMenu
            settings={settings}
            pathname={pathname}
            onContactClick={handleContactClick}
          />
        </ul>
      </nav>

      {/* Contact Modal */}
      <Contact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

function NameLogo({ name }: { name: KeyTextField }) {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className="text-xl font-extrabold tracking-tighter text-white transition-colors duration-200 hover:text-orange-400"
    >
      {name}
    </Link>
  );
}

function DesktopMenu({
  settings,
  pathname,
  onContactClick,
}: {
  settings: Content.SettingsDocument;
  pathname: string;
  onContactClick: () => void;
}) {
  return (
    <div className="hidden flex-row items-center justify-end gap-1 md:flex md:flex-1 md:shrink-0">
      {settings?.data?.nav_items?.map(({ link, label }, index) => {
        const isActive = pathname.includes(asLink(link) as string);
        return (
          <React.Fragment key={label}>
            <li className="list-none">
              <PrismicNextLink
                className="group relative block overflow-hidden px-3 py-1 text-base font-bold text-white/90 transition-colors duration-200 hover:text-orange-400"
                field={link}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={clsx(
                    "absolute bottom-0 left-0 h-[2px] bg-orange-500 transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
                {label}
              </PrismicNextLink>
            </li>
            {index < (settings?.data?.nav_items?.length ?? 0) - 1 && (
              <span
                className="hidden text-xl leading-[0] font-light text-white/20 md:inline"
                aria-hidden="true"
              >
                /
              </span>
            )}
          </React.Fragment>
        );
      })}

      <li className="list-none">
        <button
          onClick={onContactClick}
          className="ml-4 cursor-pointer rounded-full bg-orange-500 px-6 py-2 text-sm font-bold text-white shadow-md transition duration-300 hover:bg-orange-600 active:scale-95"
        >
          {settings.data.cta_label || "Contact"}
        </button>
      </li>
    </div>
  );
}