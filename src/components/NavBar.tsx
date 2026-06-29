"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { Content, asLink, KeyTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
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

  const handleContactClick = () => {
    setOpen(false);
    setIsContactOpen(true);
  };

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="sticky top-0 z-50 w-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(39,52,104,0.60) 0%, rgba(57,75,151,0.50) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <ul className="flex flex-row items-center justify-between px-6 py-3 md:mx-auto md:w-full md:max-w-4xl">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-600 drop-shadow-[0_0_8px_#16a34a]"></span>
            </div>
            <NameLogo name={settings.data.name} />
          </div>

          <button
            aria-expanded={open}
            aria-label="Open menu"
            className="flex items-center justify-center p-2 text-2xl text-white md:hidden"
            onClick={() => setOpen(true)}
          >
            <MdMenu />
          </button>

          <div
            className={clsx(
              "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
              open
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0",
            )}
            onClick={() => setOpen(false)}
          />

          <div
            className={clsx(
              "fixed top-0 right-0 bottom-0 z-50 flex w-72 flex-col px-8 pt-16 pb-10 md:hidden",
              "transition-transform duration-300 ease-in-out",
              open ? "translate-x-0" : "translate-x-full",
            )}
            style={{
              background:
                "linear-gradient(160deg, rgba(39,52,104,0.98) 0%, rgba(57,75,151,0.98) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "-8px 0 32px rgba(0,0,0,0.5)",
            }}
          >
            <button
              aria-label="Close menu"
              className={clsx(
                "absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-xl text-white",
                "bg-white/10 transition-all duration-300 hover:bg-white/20",
                open
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-75 opacity-0",
              )}
              onClick={() => setOpen(false)}
            >
              <MdClose />
            </button>

            <div className="mt-4 flex flex-col gap-2">
              {settings?.data?.nav_items?.map(({ link, label }) => (
                <li key={label} className="list-none">
                  <PrismicNextLink
                    className={clsx(
                      "group/link relative flex w-full items-center justify-between py-2 text-xl font-bold text-white",
                      "transition-colors duration-200 hover:text-orange-400",
                    )}
                    field={link}
                    onClick={() => setOpen(false)}
                    aria-current={
                      pathname.includes(asLink(link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {label}
                    <span
                      className={clsx(
                        "relative flex h-3 w-3 items-center justify-center opacity-0 transition-all duration-300",
                        "group-hover/link:opacity-100",
                        pathname.includes(asLink(link) as string) &&
                          "opacity-100",
                      )}
                    >
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500 drop-shadow-[0_0_6px_#f97316]" />
                    </span>
                  </PrismicNextLink>
                </li>
              ))}
            </div>

            <div className="mt-auto">
              <button
                onClick={handleContactClick}
                className="w-full rounded-full bg-orange-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition duration-300 hover:bg-orange-600"
              >
                {settings.data.cta_label || "Contact"}
              </button>
            </div>
          </div>

          <DesktopMenu
            settings={settings}
            pathname={pathname}
            onContactClick={handleContactClick}
          />
        </ul>
      </nav>

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
      {settings?.data?.nav_items?.map(({ link, label }, index) => (
        <React.Fragment key={label}>
          <li className="list-none">
            <PrismicNextLink
              className={clsx(
                "group relative block overflow-hidden px-3 py-1 text-base font-bold text-white",
                "transition-colors duration-200 hover:text-orange-400",
              )}
              field={link}
              aria-current={
                pathname.includes(asLink(link) as string) ? "page" : undefined
              }
            >
              <span
                className={clsx(
                  "absolute bottom-0 left-0 h-[2px] bg-orange-500 transition-all duration-300",
                  pathname.includes(asLink(link) as string)
                    ? "w-full"
                    : "w-0 group-hover:w-full",
                )}
              />
              {label}
            </PrismicNextLink>
          </li>
          {index < (settings?.data?.nav_items?.length ?? 0) - 1 && (
            <span
              className="hidden text-2xl leading-[0] font-thin text-white/30 md:inline"
              aria-hidden="true"
            >
              /
            </span>
          )}
        </React.Fragment>
      ))}

      <li className="list-none">
        <button
          onClick={onContactClick}
          className="ml-3 cursor-pointer rounded-full bg-orange-500 px-6 py-2 text-sm font-bold text-white shadow-sm transition duration-300 hover:bg-orange-600"
        >
          {settings.data.cta_label || "Contact"}
        </button>
      </li>
    </div>
  );
}
