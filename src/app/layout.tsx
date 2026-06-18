import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import LoadingBar from "@/components/LoadingBar";

const urbanist = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdul Khalil | Creative Developer",
  description:
    "Creative Full-Stack Developer specializing in 3D web experiences, interactive React/Next.js applications, and high-performance user interfaces.",
  metadataBase: new URL("https://abdulkhalildev.vercel.app"),
  openGraph: {
    title: "Abdul Khalil | Creative Developer",
    description: "Crafting Premium Web Experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdul Khalil | Creative Developer Portfolio Preview",
      },
    ],
  },
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" className="scroll-smooth">
      <body
        className={`${urbanist.className} bg-[#130f40] text-slate-100 overflow-x-hidden antialiased`}
        suppressHydrationWarning
      >
        <LoadingBar />
        <CustomCursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
