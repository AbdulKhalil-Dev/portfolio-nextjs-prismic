import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import LoadingBar from "@/components/LoadingBar";
import Footer from "@/components/Footer";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

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
        url: "/og-image.avif",
        width: 1200,
        height: 630,
        alt: "Abdul Khalil | Creative Developer Portfolio Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" data-scroll-behavior="smooth" className="bg-slate-900 text-slate-100">
      <body
        className="antialiased relative min-h-screen"
        style={{ fontFamily: "'Urbanist', sans-serif" }}
        suppressHydrationWarning
      >
        <LoadingBar />
        <CustomCursor />
        <Header />
        {children}
        <Footer />
        <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
        <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
      </body>
    </html>
  );
}