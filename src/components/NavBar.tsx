"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { Content, KeyTextField, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import Button from "./Button";
import { usePathname } from "next/navigation";

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col justify-between rounded-full bg-slate-100 px-6 py-2.5 border-2 border-slate-900/30 md:m-4 md:flex-row md:items-center md:rounded-full">
        <div className="flex items-center justify-between">
          <div className="relative flex items-center gap-2 group cursor-pointer select-none">
            {/* Professional Dynamic Logo Indicator (Replaced Rotating Dot) */}
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-600 shadow-[0_0_8px_#c2410c]"></span>
            </div>

            <div className="font-black text-xl text-slate-100 tracking-wider transition-colors duration-300 group-hover:text-orange-500 [&&_p]:m-0">
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
        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-500/50 via-gray-100/70 to-gray-300/80 backdrop-blur-md pr-0 pt-0 transition-transform duration-300 ease-in-out md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <button
            aria-label="Close menu"
            aria-expanded={open}
            className="fixed right-6 top-5 block p-0.5 text-2xl text-red-700 rounded-xl md:hidden border-2 border-slate-900/30"
            onClick={() => setOpen(false)}
          >
            <MdClose />
          </button>
          {settings?.data?.nav_items?.map(({ link, label }, index) => (
            <React.Fragment key={label}>
              <li className="first:mt-8">
                <PrismicNextLink
                  className={clsx(
                    "group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-900",
                  )}
                  field={link}
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathname.includes(asLink(link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  <span
                    className={clsx(
                      "absolute inset-0 z-0 h-full translate-y-12 rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                      pathname.includes(asLink(link) as string)
                        ? "translate-y-6"
                        : "translate-y-16",
                    )}
                  />
                  <span className="relative">{label}</span>
                </PrismicNextLink>
              </li>
              {index < (settings?.data?.nav_items?.length ?? 0) - 1 && (
                <span
                  className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </React.Fragment>
          ))}
          <li>
            <Button
              linkField={settings.data.cta_link}
              label={settings.data.cta_label}
              className="ml-3"
            />
          </li>
        </div>
        <DesktopMenu settings={settings} pathname={pathname} />
      </ul>
    </nav>
  );
}

function NameLogo({ name }: { name: KeyTextField }) {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className="text-xl font-extrabold tracking-tighter text-slate-900"
    >
      {name}
    </Link>
  );
}

function DesktopMenu({
  settings,
  pathname,
}: {
  settings: Content.SettingsDocument;
  pathname: string;
}) {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent backdrop-blur-md py-0 md:flex">
      {settings?.data?.nav_items?.map(({ link, label }, index) => (
        <React.Fragment key={label}>
          <li>
            <PrismicNextLink
              className={clsx(
                "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900",
              )}
              field={link}
              aria-current={
                pathname.includes(asLink(link) as string) ? "page" : undefined
              }
            >
              <span
                className={clsx(
                  "absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                  pathname.includes(asLink(link) as string)
                    ? "translate-y-6"
                    : "translate-y-8",
                )}
              />
              <span className="relative">{label}</span>
            </PrismicNextLink>
          </li>
          {index < (settings?.data?.nav_items?.length ?? 0) - 1 && (
            <span
              className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
              aria-hidden="true"
            >
              /
            </span>
          )}
        </React.Fragment>
      ))}
      <li>
        <Button
          linkField={settings.data.cta_link}
          label={settings.data.cta_label}
          className="ml-3"
        />
      </li>
    </div>
  );
}
