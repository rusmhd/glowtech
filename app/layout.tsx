import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ScriptProvider from "@/components/ScriptProvider";
import SectionThemeWatcher from "@/components/SectionThemeWatcher";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientAura from "@/components/AmbientAura";
import PageTransition from "@/components/PageTransition";
import ScrollSectionTransition from "@/components/ScrollSectionTransition";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const headingFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GlowTech Automotive | Beyond The Finish",
  description: "Automotive craft studio for body kits, custom paint, performance upgrades, and curated parts.",
  keywords: ["automotive craft", "body kits", "custom paint", "performance upgrades", "car customization"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://glowtech-auto.com",
    title: "GlowTech Automotive | Beyond The Finish",
    description: "Automotive craft studio for body kits, custom paint, performance upgrades, and curated parts.",
    images: [{
      url: "/assets/uploads/screen.png",
      width: 1200,
      height: 630,
      alt: "GlowTech Automotive Showcase",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlowTech Automotive",
    description: "Beyond the finish. Redefining excellence.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bodyFont.variable} ${headingFont.variable} dark scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased bg-glow-black-900 text-glow-chrome transition-[background-color] duration-700 ease-out">
        <ScriptProvider>
          <PageTransition />
          <ScrollSectionTransition />
          <AmbientAura />
          <SectionThemeWatcher />
          <ScrollProgress />
          <Navigation />
          <main className="relative z-2 grow">{children}</main>
        </ScriptProvider>
      </body>
    </html>
  );
}
