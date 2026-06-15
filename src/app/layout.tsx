import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ScrollIndicator from "@/components/ScrollIndicator";

const urbanist = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdul Khalil | Creative Developer",
  description: "Abdul Khalil is a Creative Full-Stack Developer specializing in building interactive 3D web experiences, modern React/Next.js applications, and clean user interfaces.",
  metadataBase: new URL("https://abdulkhalildev.vercel.app"),
  openGraph: {
    title: "Abdul Khalil | Creative Developer",
    description: "Creative Developer crafting interactive 3D web experiences and Next.js applications.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#130f40] text-slate-100 scroll-smooth">
      <body className={urbanist.className} suppressHydrationWarning>
        <ScrollIndicator/>
        <Header />
        {children}
      </body>
    </html>
  );
}
