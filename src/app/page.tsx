"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import type { NavTheme } from "@/components/Navbar";
import IntegrationsSection from "@/components/IntegrationsSection";

export default function Home() {
  const [navTheme, setNavTheme] = useState<NavTheme>("light");

  useEffect(() => {
    const handleScroll = () => {
      // The integrations section is 500vh tall.
      // The dark background fades in around scrollYProgress 0.65-0.82.
      // Total scroll height ≈ 500vh - 100vh = 400vh of scrollable distance.
      // Dark phase starts around 0.65 * 400vh = 260vh scroll from section start.
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Switch to dark theme when background transitions (~65% through the section)
      const darkThreshold = vh * 2.6;
      setNavTheme(scrollY > darkThreshold ? "dark" : "light");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] relative">
      <Navbar theme={navTheme} />
      {/* Hero section placeholder */}
     
      <IntegrationsSection />
    </div>
  );
}
