"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// ─── Integration brand icons as inline SVGs ─────────────────────────────────

const NiceIcon = () => (
  <svg width="64" height="28" viewBox="0 0 48 20" fill="none">
    <text x="2" y="16" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="16" fill="#0a2463" letterSpacing="-0.5">
      NICE
    </text>
    <circle cx="16.5" cy="4" r="2" fill="#0a2463" />
  </svg>
);

const LatitudeIcon = () => (
  <svg width="64" height="48" viewBox="0 0 48 36" fill="none">
    <path d="M14 8C14 8 22 4 30 8C38 12 34 20 26 18C18 16 14 8 14 8Z" stroke="#e8572a" strokeWidth="1.5" fill="none" />
    <text x="8" y="30" fontFamily="Arial, sans-serif" fontSize="7" fill="#e8572a" fontWeight="500">
      Latitude
    </text>
  </svg>
);

const DiceIcon = () => (
  <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="6" r="4" fill="#e8432a" />
    <circle cx="7" cy="16" r="4" fill="#e8432a" />
    <circle cx="21" cy="16" r="4" fill="#e8432a" />
    <circle cx="14" cy="24" r="3" fill="#e8432a" />
  </svg>
);

const EngageIcon = () => (
  <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
    <rect x="2" y="2" width="32" height="32" rx="8" fill="#00b4a0" />
    <circle cx="18" cy="18" r="9" stroke="white" strokeWidth="2.5" fill="none" />
    <circle cx="18" cy="18" r="4" stroke="white" strokeWidth="2" fill="none" />
    <path d="M27 18H22" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SpotifyIcon = () => (
  <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="#0a2463" />
    <path d="M10 12C14 10 20 10 24 13" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M11 16.5C14.5 15 19 15 22.5 17" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M12.5 20.5C15 19.5 18.5 19.5 21 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

const SalesforceIcon = () => (
  <svg width="64" height="48" viewBox="0 0 56 36" fill="none">
    <path d="M12 24C12 18 16 14 22 14C24 10 28 8 32 8C38 8 42 12 42 16C46 16 48 20 48 24C48 28 44 30 40 30H16C12 30 10 28 12 24Z" fill="#00a1e0" />
    <text x="14" y="26" fontFamily="Arial, sans-serif" fontSize="7" fill="white" fontWeight="600">
      salesforce
    </text>
  </svg>
);

const StarIcon = () => (
  <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
    <path d="M16 4L20 12L28 12L22 18L24 28L16 22L8 28L10 18L4 12L12 12Z" stroke="#1a3fa0" strokeWidth="1.5" fill="none" />
    <path d="M16 8L18 14L24 14L19.5 18L21 24L16 20L11 24L12.5 18L8 14L14 14Z" fill="#1a3fa0" fillOpacity="0.2" />
  </svg>
);

const PipedriveIcon = () => (
  <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
    <path d="M8 22C8 22 10 10 16 10C22 10 20 18 16 18C12 18 14 22 18 24" stroke="#e8572a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M14 24C14 24 12 28 16 28C20 28 18 24 18 24" stroke="#00b4a0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

const FiservIcon = () => (
  <svg width="56" height="56" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="20" fill="#e8572a" />
    <text x="8" y="26" fontFamily="Georgia, serif" fontSize="12" fill="white" fontStyle="italic" fontWeight="600">
      fiserv.
    </text>
  </svg>
);

const ZapierIcon = () => (
  <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
    <path d="M14 2L18 10H24L16 16L20 26L14 20L8 26L12 16L4 10H10L14 2Z" fill="none" stroke="#e8572a" strokeWidth="2" />
    <path d="M14 6L16.5 12H21L17 16L19 22L14 18.5L9 22L11 16L7 12H11.5L14 6Z" fill="#e8572a" />
  </svg>
);

// ─── Main Logo (Omnistra "D" icon) ──────────────────────────────────────────

const OmnistraLogo = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <rect width="56" height="56" rx="12" fill="#0040ff" />
    <path
      d="M22 16C22 16 22 40 22 40M22 16C30 16 38 20 38 28C38 36 30 40 22 40"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="34" cy="28" r="4" fill="white" />
  </svg>
);

// ─── Animated Glowing Lines Background ──────────────────────────────────────

const glowKeyframes = `
@keyframes glowFloat1 {
  0%, 100% { d: path('M-200 300 Q200 100 500 280 Q800 460 1200 250'); }
  50% { d: path('M-200 250 Q150 400 500 200 Q850 50 1200 350'); }
}
@keyframes glowFloat2 {
  0%, 100% { d: path('M-100 500 Q250 350 550 400 Q750 200 1100 300'); }
  50% { d: path('M-100 400 Q300 200 550 350 Q800 500 1100 200'); }
}
@keyframes glowFloat3 {
  0%, 100% { d: path('M0 100 Q300 300 600 150 Q900 0 1200 200'); }
  50% { d: path('M0 200 Q250 50 600 250 Q950 400 1200 100'); }
}
@keyframes glowFloat4 {
  0%, 100% { d: path('M-150 450 Q200 500 500 350 Q800 200 1150 400'); }
  50% { d: path('M-150 350 Q250 200 500 450 Q750 300 1150 250'); }
}
@keyframes glowPulse {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.5; }
}
`;

const AnimatedGlowLines = () => (
  <>
    <style dangerouslySetInnerHTML={{ __html: glowKeyframes }} />
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1024 560"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="glowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#93b3d4" stopOpacity="0" />
          <stop offset="30%" stopColor="#93b3d4" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#7ba4cc" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7ba4cc" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="glowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a0c4e8" stopOpacity="0" />
          <stop offset="40%" stopColor="#a0c4e8" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#8ab4d8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8ab4d8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Animated glowing curve 1 */}
      <path
        d="M-200 300 Q200 100 500 280 Q800 460 1200 250"
        stroke="url(#glowGrad1)"
        strokeWidth="1.5"
        fill="none"
        filter="url(#glow)"
        style={{
          animation: 'glowFloat1 12s ease-in-out infinite, glowPulse 4s ease-in-out infinite',
        }}
      />

      {/* Animated glowing curve 2 */}
      <path
        d="M-100 500 Q250 350 550 400 Q750 200 1100 300"
        stroke="url(#glowGrad2)"
        strokeWidth="1.2"
        fill="none"
        filter="url(#glow)"
        style={{
          animation: 'glowFloat2 15s ease-in-out infinite, glowPulse 5s ease-in-out infinite 1s',
        }}
      />

      {/* Animated glowing curve 3 */}
      <path
        d="M0 100 Q300 300 600 150 Q900 0 1200 200"
        stroke="url(#glowGrad1)"
        strokeWidth="1"
        fill="none"
        filter="url(#glow)"
        style={{
          animation: 'glowFloat3 18s ease-in-out infinite, glowPulse 6s ease-in-out infinite 2s',
        }}
      />

      {/* Animated glowing curve 4 */}
      <path
        d="M-150 450 Q200 500 500 350 Q800 200 1150 400"
        stroke="url(#glowGrad2)"
        strokeWidth="0.8"
        fill="none"
        filter="url(#glow)"
        style={{
          animation: 'glowFloat4 20s ease-in-out infinite, glowPulse 7s ease-in-out infinite 0.5s',
        }}
      />

      {/* Static subtle dashed curves */}
      <path
        d="M120 100 Q300 180 500 280 Q700 380 900 320"
        stroke="#b0bec5"
        strokeWidth="0.6"
        strokeDasharray="4 6"
        fill="none"
        opacity="0.15"
      />
      <path
        d="M50 200 Q200 150 350 200 Q500 250 650 180 Q800 110 950 160"
        stroke="#b0bec5"
        strokeWidth="0.6"
        fill="none"
        opacity="0.12"
      />
    </svg>
  </>
);

// ─── Vertical dashed line from logo ─────────────────────────────────────────

const VerticalDashedLine = ({ opacity }: { opacity: number }) => (
  <div
    className="absolute left-1/2 -translate-x-1/2 w-px"
    style={{
      top: "calc(50% + 40px)",
      height: "200px",
      backgroundImage: "linear-gradient(to bottom, rgba(180,190,200,0.4) 50%, transparent 50%)",
      backgroundSize: "1px 8px",
      opacity,
    }}
  />
);

// ─── Integration icon positions (spread state) ─────────────────────────────

interface IconConfig {
  id: string;
  icon: React.FC;
  // Positions as percentage offsets from center
  x: number; // px from center
  y: number; // px from center
  size: number; // container size
  mobileX?: number;
  mobileY?: number;
  mobileSize?: number;
}

const integrationIcons: IconConfig[] = [
  { id: "nice", icon: NiceIcon, x: -440, y: -220, size: 80, mobileX: -160, mobileY: -170, mobileSize: 58 },
  { id: "star", icon: StarIcon, x: -140, y: -200, size: 72, mobileX: -40, mobileY: -150, mobileSize: 52 },
  { id: "latitude", icon: LatitudeIcon, x: 160, y: -220, size: 80, mobileX: 85, mobileY: -170, mobileSize: 58 },
  { id: "dice", icon: DiceIcon, x: 440, y: -200, size: 72, mobileX: 160, mobileY: -130, mobileSize: 52 },
  { id: "engage", icon: EngageIcon, x: -380, y: -20, size: 80, mobileX: -160, mobileY: -25, mobileSize: 58 },
  { id: "spotify", icon: SpotifyIcon, x: 400, y: -20, size: 72, mobileX: 160, mobileY: -20, mobileSize: 52 },
  { id: "salesforce", icon: SalesforceIcon, x: -300, y: 140, size: 80, mobileX: -120, mobileY: 110, mobileSize: 58 },
  { id: "pipedrive", icon: PipedriveIcon, x: -380, y: 260, size: 72, mobileX: -160, mobileY: 185, mobileSize: 52 },
  { id: "fiserv", icon: FiservIcon, x: 160, y: 260, size: 80, mobileX: 90, mobileY: 180, mobileSize: 58 },
  { id: "zapier", icon: ZapierIcon, x: 440, y: 230, size: 72, mobileX: 160, mobileY: 135, mobileSize: 52 },
];

// ─── IntegrationsSection ────────────────────────────────────────────────────

export default function IntegrationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Phase breakdown across scrollYProgress [0, 1]:
  // 0.0 - 0.15: Icons spread, fully visible (Image 1)
  // 0.15 - 0.35: Icons converge toward center (Image 2 -> 3)
  // 0.35 - 0.50: Icons stack and merge, text fades (Image 3)
  // 0.50 - 0.60: Transform to Omnistra logo (Image 4)
  // 0.60 - 0.70: Logo visible with dashed line
  // 0.70 - 1.0: Dashboard section fades in (Image 5)

  // Text opacity: visible until icons start converging
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.45], [1, 1, 0.3, 0]) as MotionValue<number>;
  const textScale = useTransform(scrollYProgress, [0, 0.15, 0.45], [1, 1, 0.8]) as MotionValue<number>;

  // Button opacity
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.4], [1, 1, 0.5, 0]) as MotionValue<number>;

  // Curves opacity
  const curvesOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.5], [1, 1, 0.3, 0]) as MotionValue<number>;

  // Icons convergence factor: 0 = spread, 1 = converged to center
  const convergeFactor = useTransform(scrollYProgress, [0, 0.15, 0.5], [0, 0, 1]) as MotionValue<number>;

  // Icons opacity: fade out after converging
  const iconsOpacity = useTransform(scrollYProgress, [0, 0.45, 0.55], [1, 1, 0]) as MotionValue<number>;
  const iconsScale = useTransform(scrollYProgress, [0.4, 0.55], [1, 0.3]) as MotionValue<number>;

  // Omnistra logo: appear after icons converge
  const logoOpacity = useTransform(scrollYProgress, [0.5, 0.58, 0.72, 0.78], [0, 1, 1, 0]) as MotionValue<number>;
  const logoScale = useTransform(scrollYProgress, [0.5, 0.58], [0.5, 1]) as MotionValue<number>;

  // Dashed line below logo
  const dashedLineOpacity = useTransform(scrollYProgress, [0.55, 0.62, 0.72, 0.78], [0, 1, 1, 0]) as MotionValue<number>;

  // Dashboard section
  const dashboardOpacity = useTransform(scrollYProgress, [0.72, 0.85], [0, 1]) as MotionValue<number>;
  const dashboardY = useTransform(scrollYProgress, [0.72, 0.85], [100, 0]) as MotionValue<number>;

  // Background color transition: light blue -> dark navy
  const bgOpacity = useTransform(scrollYProgress, [0.65, 0.82], [0, 1]) as MotionValue<number>;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Light blue background (integrations phase) */}
        <div className="absolute inset-0 bg-[#e8ecf4]" />

        {/* Dark background (dashboard phase) */}
        <motion.div
          className="absolute inset-0 bg-[#0a1628]"
          style={{ opacity: bgOpacity }}
        />

        {/* ─── Integrations Phase ─── */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Animated glowing lines */}
          <motion.div className="absolute inset-0" style={{ opacity: curvesOpacity }}>
            <AnimatedGlowLines />
          </motion.div>

          {/* Integration icons */}
          {integrationIcons.map((item) => {
            const Icon = item.icon;
            return (
              <IntegrationIcon
                key={item.id}
                icon={<Icon />}
                x={item.x}
                y={item.y}
                size={item.size}
                mobileX={item.mobileX}
                mobileY={item.mobileY}
                mobileSize={item.mobileSize}
                convergeFactor={convergeFactor}
                opacity={iconsOpacity}
                scale={iconsScale}
              />
            );
          })}

          {/* Center text */}
          <motion.div
            className="relative z-10 text-center pointer-events-none px-6"
            style={{ opacity: textOpacity, scale: textScale }}
          >
            <h2 className="text-[#0a1e3d] text-[28px] sm:text-[36px] md:text-[52px] font-bold leading-[1.1] tracking-tight">
              One platform,
              <br />
              unlimited integrations
            </h2>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="absolute z-20"
            style={{
              opacity: buttonOpacity,
              top: "calc(50% + 50px)",
            }}
          >
            <button className="bg-[#0a1e3d] text-white text-[12px] sm:text-[13px] font-semibold px-5 py-2.5 mt-5 rounded-full flex items-center gap-2 hover:bg-[#0d2a5c] transition-colors">
              View all integrations
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="#3b82f6" />
                <path d="M6 5l4 3-4 3" fill="white" />
              </svg>
            </button>
          </motion.div>

          {/* Omnistra Logo (appears when icons converge) */}
          <motion.div
            className="absolute z-30 flex flex-col items-center"
            style={{
              opacity: logoOpacity,
              scale: logoScale,
            }}
          >
            <OmnistraLogo />
            <motion.div style={{ opacity: dashedLineOpacity }}>
              <VerticalDashedLine opacity={1} />
            </motion.div>
          </motion.div>
        </div>

        {/* ─── Dashboard Phase ─── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: dashboardOpacity, y: dashboardY }}
        >
          <div className="w-full max-w-[1600px] mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <DashboardTextContent />
            <LaptopMockup className="mt-12 md:mt-0 w-full max-w-[420px] sm:max-w-[520px] mx-auto md:mx-0 md:max-w-none md:flex-1" />
          </div>

          {/* Decorative grid lines in dark background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
            <svg width="100%" height="100%" viewBox="0 0 1200 800">
              {Array.from({ length: 20 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 60}
                  y1="0"
                  x2={i * 60}
                  y2="800"
                  stroke="white"
                  strokeWidth="0.5"
                />
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={i * 60}
                  x2="1200"
                  y2={i * 60}
                  stroke="white"
                  strokeWidth="0.5"
                />
              ))}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Individual Integration Icon ────────────────────────────────────────────

interface IntegrationIconProps {
  icon: React.ReactNode;
  x: number;
  y: number;
  size: number;
  mobileX?: number;
  mobileY?: number;
  mobileSize?: number;
  convergeFactor: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

function IntegrationIcon({
  icon,
  x,
  y,
  size,
  mobileX,
  mobileY,
  mobileSize,
  convergeFactor,
  opacity,
  scale,
}: IntegrationIconProps) {
  const resolvedMobileX = mobileX ?? x * 0.45;
  const resolvedMobileY = mobileY ?? y * 0.45;
  const resolvedMobileSize = mobileSize ?? size * 0.65;

  const posX = useTransform(convergeFactor, [0, 1], [x, 0]) as MotionValue<number>;
  const posY = useTransform(convergeFactor, [0, 1], [y, 0]) as MotionValue<number>;
  const mobilePosX = useTransform(convergeFactor, [0, 1], [resolvedMobileX, 0]) as MotionValue<number>;
  const mobilePosY = useTransform(convergeFactor, [0, 1], [resolvedMobileY, 0]) as MotionValue<number>;

  return (
    <>
      {/* Desktop icon */}
      <motion.div
        className="absolute z-20 bg-white rounded-xl shadow-lg items-center justify-center hidden md:flex"
        style={{
          width: size,
          height: size,
          x: posX,
          y: posY,
          opacity,
          scale,
        }}
      >
        {icon}
      </motion.div>
      {/* Mobile icon */}
      <motion.div
        className="absolute z-20 bg-white rounded-lg shadow-lg items-center justify-center flex md:hidden"
        style={{
          width: resolvedMobileSize,
          height: resolvedMobileSize,
          x: mobilePosX,
          y: mobilePosY,
          opacity,
          scale,
        }}
      >
        {icon}
      </motion.div>
    </>
  );
}

function DashboardTextContent({ className = "" }: { className?: string }) {
  return (
    <div className={`flex-shrink-0 max-w-full md:max-w-[720px] text-center md:text-left ${className}`}>
      <span className="inline-block border border-white/20 text-white/70 text-[11px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded mb-6">
        Dashboard
      </span>
      <h2 className="text-white text-[28px] sm:text-[36px] md:text-[44px] font-bold leading-[1.1] tracking-tight mb-5">
        Your Mission Control
        <br />
        for End-To-End
        <br />
        Servicing
      </h2>
      <p className="text-white/50 text-[14px] leading-[1.7] mb-8">
        A centralized command center for high-stakes recovery. Track performance and agent activity in real-time with a continuous data stream designed for rapid, informed decision-making.
      </p>
      <button className="bg-[#3b82f6] text-white text-[13px] font-semibold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#2563eb] transition-colors mx-auto md:mx-0">
        Start a Pilot
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" fill="white" fillOpacity="0.2" />
          <path d="M6 5l4 3-4 3" fill="white" />
        </svg>
      </button>
    </div>
  );
}

function LaptopMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {/* Laptop screen */}
        <div className="bg-[#111827] rounded-t-xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-4 py-2 bg-[#1a2332] border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <div className="flex-1 flex justify-center">
              <div className="bg-[#0d1520] rounded-md px-12 py-1">
                <span className="text-white/30 text-[9px]">dashboard.omnistra.ai</span>
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="flex min-h-[360px]">
            {/* Sidebar */}
            <div className="w-[140px] bg-[#0d1520] border-r border-white/5 p-3 flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-[6px] font-bold">O</span>
                </div>
                <span className="text-white/70 text-[9px] font-semibold">omni</span>
              </div>
              {["Inbox", "Alerts", "Dashboard", "Calls", "Company Manager", "Workflow Studio", "Analytics", "Help"].map(
                (item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-[8px] ${
                      i === 2
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    <div className="w-3 h-3 rounded bg-white/10" />
                    {item}
                  </div>
                )
              )}
            </div>

            {/* Main content area */}
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white text-[11px] font-semibold">Welcome back, John</h3>
                  <p className="text-white/30 text-[7px]">Track call performance, distributions, and analytics.</p>
                </div>
                <button className="bg-[#1a2332] text-white/50 text-[7px] px-3 py-1.5 rounded border border-white/10">
                  Download Report
                </button>
              </div>

              <p className="text-white/40 text-[8px] mb-3 font-semibold">Overview</p>

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Total Calls", value: "78,324", change: "+22%", color: "text-green-400" },
                  { label: "Avg Call Duration", value: "155s", change: "-3.6%", color: "text-red-400" },
                  { label: "Contact Rate", value: "82%", change: "+2.1%", color: "text-green-400" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#1a2332] rounded-lg p-3 border border-white/5"
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-4 h-4 rounded-full bg-blue-600/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      </div>
                      <span className="text-white/40 text-[7px]">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-white text-[16px] font-bold">{stat.value}</span>
                      <span className={`text-[7px] ${stat.color}`}>{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tables */}
              <div className="grid grid-cols-2 gap-2">
                {/* Client Priority */}
                <div className="bg-[#1a2332] rounded-lg p-3 border border-white/5">
                  <p className="text-white/50 text-[8px] font-semibold mb-2">Client Priority</p>
                  <div className="space-y-1">
                    {["Rebecca", "Nike", "Alex", "Rebecca", "Evelyn"].map((name, i) => (
                      <div key={i} className="flex items-center gap-2 text-[7px]">
                        <span className="text-white/30 w-12 truncate">TBD-x9{i}0{i}92...</span>
                        <div className="w-4 h-4 rounded-full bg-white/10" />
                        <span className="text-white/50 flex-1">{name}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[6px] font-medium ${
                          i === 0
                            ? "bg-red-500/20 text-red-400"
                            : i === 3
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }`}>
                          {i === 0 ? "High" : i === 3 ? "Medium" : "Low"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contactability */}
                <div className="bg-[#1a2332] rounded-lg p-3 border border-white/5">
                  <p className="text-white/50 text-[8px] font-semibold mb-2">Contactability</p>
                  <div className="space-y-1">
                    {["Answered", "Outbound", "Answered", "Answered", "Answered"].map((status, i) => (
                      <div key={i} className="flex items-center gap-2 text-[7px]">
                        <span className="text-white/30 w-10 truncate">cLaH{i}1...</span>
                        <span className={`px-1.5 py-0.5 rounded text-[6px] font-medium ${
                          status === "Answered"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}>
                          {status}
                        </span>
                        <span className="text-white/30 flex-1">Outbound</span>
                        <span className="text-white/30">0.{i}1</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop base */}
        <div className="h-4 bg-gradient-to-b from-[#2a3444] to-[#3a4454] rounded-b-xl mx-8" />
        <div className="h-2 bg-[#4a5464] rounded-b-2xl mx-16" />
      </div>

      {/* User avatar at bottom-left of laptop */}
      <div className="absolute -bottom-2 left-4 flex items-center gap-2 bg-[#1a2332] rounded-full px-3 py-1.5 border border-white/10">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
        <div>
          <span className="text-white text-[8px] font-semibold block">John Smith</span>
          <span className="text-white/30 text-[6px]">john@omnistra.ai</span>
        </div>
      </div>
    </div>
  );
}
