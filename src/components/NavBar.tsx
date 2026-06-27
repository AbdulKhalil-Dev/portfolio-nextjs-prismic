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
      <nav aria-label="Main navigation">
        <ul className="flex flex-col justify-between rounded-full border-2 border-slate-900/30 bg-slate-100 px-6 py-2.5 md:m-4 md:flex-row md:items-center md:rounded-full">
          <div className="flex items-center justify-between">
            <div className="group relative flex cursor-pointer items-center gap-2 select-none">
              <div className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-600 shadow-[0_0_8px_#c2410c]"></span>
              </div>

              <div className="text-xl font-black tracking-wider text-slate-100 transition-colors duration-300 group-hover:text-orange-500 [&&_p]:m-0">
                <NameLogo name={settings.data.name} />
              </div>
            </div>
            <button
              aria-expanded={open}
              aria-label="Open menu"
              className="block p-2 text-2xl text-slate-800 md:hidden"
              onClick={() => setOpen(true)}
            >
              <MdMenu />
            </button>
          </div>
          
          {/* Mobile Menu */}
          <div
            className={clsx(
              "fixed top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-500/50 via-gray-100/70 to-gray-300/80 pt-0 pr-0 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden",
              open ? "translate-x-0" : "translate-x-[100%]",
            )}
          >
            <button
              aria-label="Close menu"
              aria-expanded={open}
              className="fixed top-5 right-6 block rounded-xl border-2 border-slate-900/30 p-0.5 text-2xl text-red-700 md:hidden"
              onClick={() => setOpen(false)}
            >
              <MdClose />
            </button>
            {settings?.data?.nav_items?.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li className="first:mt-8">
                  <PrismicNextLink
                    className="group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-900"
                    field={link}
                    onClick={() => setOpen(false)}
                    aria-current={pathname.includes(asLink(link) as string) ? "page" : undefined}
                  >
                    <span
                      className={clsx(
                        "absolute inset-0 z-0 h-full translate-y-12 rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                        pathname.includes(asLink(link) as string) ? "translate-y-6" : "translate-y-16",
                      )}
                    />
                    <span className="relative">{label}</span>
                  </PrismicNextLink>
                </li>
                {index < (settings?.data?.nav_items?.length ?? 0) - 1 && (
                  <span className="hidden text-4xl leading-[0] font-thin text-slate-400 md:inline" aria-hidden="true">/</span>
                )}
              </React.Fragment>
            ))}
            
            <li>
              <button
                onClick={handleContactClick}
                className="ml-3 px-6 py-2 bg-slate-900 text-white font-bold rounded-full hover:bg-cyan-300 transition duration-300 shadow-md"
              >
                {settings.data.cta_label || "Contact"}
              </button>
            </li>
          </div>
          
          <DesktopMenu settings={settings} pathname={pathname} onContactClick={handleContactClick} />
        </ul>
      </nav>

      <Contact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

function NameLogo({ name }: { name: KeyTextField }) {
  return (
    <Link href="/" aria-label="Home page" className="text-xl font-extrabold tracking-tighter text-slate-900">
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
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 backdrop-blur-md md:flex">
      {settings?.data?.nav_items?.map(({ link, label }, index) => (
        <React.Fragment key={label}>
          <li>
            <PrismicNextLink
              className="group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900"
              field={link}
              aria-current={pathname.includes(asLink(link) as string) ? "page" : undefined}
            >
              <span
                className={clsx(
                  "absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                  pathname.includes(asLink(link) as string) ? "translate-y-6" : "translate-y-8",
                )}
              />
              <span className="relative">{label}</span>
            </PrismicNextLink>
          </li>
          {index < (settings?.data?.nav_items?.length ?? 0) - 1 && (
            <span className="hidden text-4xl leading-[0] font-thin text-slate-400 md:inline" aria-hidden="true">/</span>
          )}
        </React.Fragment>
      ))}
      
      <li>
        <button
          onClick={onContactClick}
          className="ml-3 px-6 py-2 bg-cyan-200 text-slate-950 text-sm font-bold rounded-full hover:bg-cyan-400 transition duration-300 shadow-sm cursor-pointer"
        >
          {settings.data.cta_label || "Contact"}
        </button>
      </li>
    </div>
  );
}