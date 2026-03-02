"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type NavTheme = "dark" | "light";

// ─── Menu Data ───────────────────────────────────────────────────────────────

const menuItems = [
  { label: "PRODUCT", hasDropdown: true },
  { label: "CUSTOMERS", hasDropdown: true },
  { label: "PRICING", hasDropdown: false },
  { label: "INTEGRATIONS", hasDropdown: true },
  { label: "RESOURCES", hasDropdown: true },
  { label: "COMPANY", hasDropdown: true },
];

// ─── Chargeflow Logo (chain-link / infinity style) ───────────────────────────

const LogoIcon = ({ size = 28, color = "white" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path
      d="M20 8c-4.4 0-8 3.6-8 8 0 2.2.9 4.2 2.3 5.7L20 16l5.7 5.7A8 8 0 0028 16c0-4.4-3.6-8-8-8z"
      fill={color}
    />
    <path
      d="M20 32c4.4 0 8-3.6 8-8 0-2.2-.9-4.2-2.3-5.7L20 24l-5.7-5.7A8 8 0 0012 24c0 4.4 3.6 8 8 8z"
      fill={color}
    />
  </svg>
);

const ChargeflowLogo = ({ color = "white" }: { color?: string }) => (
  <div className="flex items-center gap-2.5 cursor-pointer">
    <LogoIcon size={30} color={color} />
    <span className="text-lg font-semibold tracking-tight" style={{ color }}>
      chargeflow
    </span>
  </div>
);

// ─── Arrow Up-Right Icon ─────────────────────────────────────────────────────

const ArrowUpRight = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path
      d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Decorative card background (radial grid) ───────────────────────────────

const CardBg = ({ variant = "circle" }: { variant?: "circle" | "grid" | "waves" | "bars" | "rings" | "dashed" }) => {
  switch (variant) {
    case "circle":
      return (
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-28 h-28 rounded-full border border-white/10" />
          <div className="absolute w-20 h-20 rounded-full border border-white/[0.07]" />
          <div className="absolute w-12 h-12 rounded-full border border-white/[0.05]" />
        </div>
      );
    case "waves":
      return (
        <div className="absolute inset-0 flex items-end justify-center overflow-hidden opacity-25 pointer-events-none">
          <svg viewBox="0 0 200 80" className="w-full h-20">
            <path d="M0,60 Q25,40 50,50 T100,35 T150,45 T200,25" fill="none" stroke="white" strokeWidth="1" />
            <path d="M0,60 Q25,40 50,50 T100,35 T150,45 T200,25 V80 H0Z" fill="white" fillOpacity="0.05" />
          </svg>
        </div>
      );
    case "bars":
      return (
        <div className="absolute inset-0 flex items-center justify-center gap-[3px] opacity-20 pointer-events-none">
          {[14, 22, 10, 28, 18, 12, 26, 16, 20, 8, 24, 14].map((h, i) => (
            <div key={i} className="w-[3px] bg-white rounded-full" style={{ height: `${h}px` }} />
          ))}
        </div>
      );
    case "rings":
      return (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-24 h-24 rounded-full border border-white/20 absolute" />
          <div className="w-20 h-20 rounded-full border border-white/15 absolute rotate-45" />
          <div className="w-16 h-16 rounded-full border border-dashed border-white/10 absolute" />
        </div>
      );
    case "dashed":
      return (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-24 h-24 rounded-full border border-dashed border-white/15" />
          <div className="absolute w-2 h-2 bg-white/20 rounded-full" />
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border border-white/5" />
            ))}
          </div>
        </div>
      );
  }
};

// ─── Product Dropdown ────────────────────────────────────────────────────────

const ProductDropdown = () => {
  const products = [
    {
      title: "Prevent",
      badge: "NEW",
      desc: "Stop friendly fraud, block digital shoplifters & prevent the next chargeback before it happens.",
      bg: "circle" as const,
    },
    {
      title: "Automation",
      badge: null,
      desc: "Fully automated chargeback recovery with 4x ROI guarantee.",
      bg: "circle" as const,
    },
    {
      title: "Alerts",
      badge: null,
      desc: "Cut 90% of chargebacks before they happen, powered by Visa and Mastercard.",
      bg: "waves" as const,
    },
    {
      title: "Insights",
      badge: "FREE",
      desc: "Get a bird's-eye view into your payments and chargebacks, all in a single, powerful dashboard.",
      bg: "waves" as const,
    },
    {
      title: "Connect",
      badge: "FOR PLATFORMS",
      desc: "Integrate Chargeflow into your platform, either via Embedding, Whitelabel or API.",
      bg: "rings" as const,
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-3 p-3.5">
      {products.map((p) => (
        <div
          key={p.title}
          className="group bg-[#141418] rounded-2xl p-5 pb-4 flex flex-col min-h-[240px] border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <span className="text-white font-semibold text-[13px]">{p.title}</span>
            {p.badge && (
              <span className="bg-white/[0.08] text-white/60 text-[9px] px-2 py-[2px] rounded-full font-semibold uppercase tracking-[0.08em]">
                {p.badge}
              </span>
            )}
          </div>
          <p className="text-white/40 text-[11px] leading-[1.5] relative z-10">
            {p.desc}
          </p>
          <div className="flex-1 relative mt-3">
            <CardBg variant={p.bg} />
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Customers Dropdown ──────────────────────────────────────────────────────

const CustomersDropdown = () => {
  const studies = [
    { brand: "obvi.", icon: null, stat: "170", unit: "%", desc: "win-rate increase", tag: "eCommerce" },
    { brand: "elementor", icon: "circle", stat: "90", unit: "%", desc: "reduction in time spent managing chargebacks", tag: "SaaS" },
    { brand: "Fanatics", icon: "flag", stat: "2X", unit: "", desc: "Chargeback Win Rate", tag: "Marketplace" },
    { brand: "HEXCLAD", icon: "diamond", stat: "328", unit: "hrs.", desc: "and 40 minutes saved", tag: "Travel" },
  ];

  return (
    <div className="grid grid-cols-5 gap-3 p-3.5">
      {/* All Case Studies */}
      <div className="bg-[#141418] rounded-2xl p-5 flex flex-col min-h-[260px] border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer relative overflow-hidden">
        <span className="text-white font-semibold text-[13px] mb-3 relative z-10">All Case Studies</span>
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative w-32 h-32">
            {/* Central circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/[0.04] border border-white/[0.08]" />
            {/* Surrounding brand circles */}
            <div className="absolute top-0 left-8 w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <span className="text-white/25 text-[5px] font-bold">ID</span>
            </div>
            <div className="absolute top-4 right-0 w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <span className="text-white/25 text-[5px] font-medium">Caraway</span>
            </div>
            <div className="absolute bottom-8 right-0 w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08]" />
            <div className="absolute bottom-2 right-6 w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <span className="text-white/20 text-[5px] font-bold">Huel</span>
            </div>
            <div className="absolute bottom-4 left-0 w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <span className="text-white/30 text-[6px] font-bold">obvi.</span>
            </div>
            <div className="absolute top-8 left-0 w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08]" />
            <div className="absolute bottom-0 left-10 w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <span className="text-white/15 text-[5px] font-bold">HC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      {studies.map((s) => (
        <div
          key={s.brand}
          className="bg-[#141418] rounded-2xl p-5 flex flex-col min-h-[260px] border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            {s.icon === "circle" && (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
                <circle cx="8" cy="8" r="2" fill="white" fillOpacity="0.5" />
              </svg>
            )}
            {s.icon === "flag" && (
              <svg width="10" height="12" viewBox="0 0 12 14" fill="none">
                <path d="M2 1v12M2 1l8 4-8 4" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {s.icon === "diamond" && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M6 1l5 5-5 5-5-5 5-5z" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
              </svg>
            )}
            <span className="text-white/60 text-[11px] font-bold tracking-wide">{s.brand}</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-1">
            <div className="relative w-[76px] h-[76px]">
              <svg viewBox="0 0 76 76" className="w-full h-full -rotate-90">
                <circle cx="38" cy="38" r="32" fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="2" />
                <circle
                  cx="38" cy="38" r="32" fill="none"
                  stroke="white" strokeOpacity="0.25" strokeWidth="2"
                  strokeDasharray={`${Math.min(201, parseFloat(s.stat) > 100 ? 201 : parseFloat(s.stat) * 2.01)} 201`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-center mt-1.5">
              <span className="text-white text-[24px] font-bold leading-none">{s.stat}</span>
              {s.unit && <span className="text-white/50 text-[13px] ml-0.5">{s.unit}</span>}
            </div>
            <p className="text-white/35 text-[10px] text-center leading-tight mt-1 px-1">{s.desc}</p>
          </div>
          <div className="flex justify-center pt-2">
            <span className="bg-[#4f46e5] text-white text-[9px] px-3 py-1 rounded-full font-medium tracking-wide">
              {s.tag}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Integrations Dropdown ───────────────────────────────────────────────────

const IntegrationsDropdown = () => (
  <div className="grid grid-cols-12 gap-3 p-3.5">
    {/* All Integrations - left */}
    <div className="col-span-7 bg-[#141418] rounded-2xl p-5 flex flex-col min-h-[240px] border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer relative overflow-hidden">
      <span className="text-white font-semibold text-[13px] relative z-10">All Integrations</span>
      <p className="text-white/35 text-[11px] mt-1 relative z-10">
        Choose from hundreds of integrated platforms.
      </p>
      <div className="flex-1 flex items-center justify-center relative">
        {/* Central hub */}
        <div className="w-14 h-14 rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center z-10">
          <LogoIcon size={18} />
        </div>
        {/* Orbiting platform icons */}
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => {
          const radius = 65 + (i % 2) * 20;
          return (
            <div
              key={angle}
              className="absolute w-6 h-6 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center"
              style={{
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
          );
        })}
        {/* Radial lines */}
        <svg className="absolute w-[240px] h-[240px] opacity-[0.04]" viewBox="0 0 240 240">
          {[0, 30, 60, 90, 120, 150].map((angle) => (
            <line key={angle} x1="120" y1="120" x2={120 + 120 * Math.cos((angle * Math.PI) / 180)} y2={120 + 120 * Math.sin((angle * Math.PI) / 180)} stroke="white" strokeWidth="0.5" />
          ))}
        </svg>
      </div>
    </div>

    {/* Right stack */}
    <div className="col-span-5 flex flex-col gap-3">
      {/* Stripe */}
      <div className="bg-[#141418] rounded-2xl p-4 flex items-center justify-between border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer flex-1">
        <div>
          <span className="text-white font-semibold text-[13px] block">Stripe</span>
          <p className="text-white/35 text-[11px] mt-1">#1 Chargeback Solution for Stripe Merchants</p>
        </div>
        <span className="text-[#635bff] font-bold text-xl tracking-tight">stripe</span>
      </div>
      {/* Shopify */}
      <div className="bg-[#141418] rounded-2xl p-4 flex items-center justify-between border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer flex-1">
        <div>
          <span className="text-white font-semibold text-[13px] block">Shopify</span>
          <p className="text-white/35 text-[11px] mt-1">Powering 30K+ Shopify Merchants</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-[#95bf47]/10 flex items-center justify-center">
          <svg width="20" height="22" viewBox="0 0 24 28" fill="none">
            <path d="M15.5 3.5C15.5 3.5 15 3 14 3c-2 0-4 1.5-4 4 0 1 .5 1.5.5 1.5L8 9.5s-1 .5-1 2v10l5 3 7-3V8.5l-3.5-5z" fill="#95bf47" fillOpacity="0.6"/>
          </svg>
        </div>
      </div>
      {/* WooCommerce */}
      <div className="bg-[#141418] rounded-2xl p-4 flex items-center justify-between border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer flex-1">
        <div>
          <span className="text-white font-semibold text-[13px] block">WooCommerce</span>
          <p className="text-white/35 text-[11px] mt-1">Native WooCommerce Integration</p>
        </div>
        <span className="text-[#7f54b3] font-bold text-lg tracking-tight">woo</span>
      </div>
    </div>
  </div>
);

// ─── Resources Dropdown ──────────────────────────────────────────────────────

const ResourcesDropdown = () => {
  const resources = [
    { title: "Blog", bg: "circle" as const },
    { title: "Reports", bg: "grid" as const },
    { title: "Podcast", bg: "bars" as const },
    { title: "Webinars", bg: "rings" as const },
  ];

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-3 p-3.5">
      {/* 4 resource cards */}
      {resources.map((r, i) => (
        <div
          key={r.title}
          className="bg-[#141418] rounded-2xl p-5 flex flex-col min-h-[240px] border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer relative overflow-hidden"
        >
          <span className="text-white font-semibold text-[13px] relative z-10">{r.title}</span>
          <div className="flex-1 relative mt-3">
            <CardBg variant={r.bg} />
            {i === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="opacity-20">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="white" strokeWidth="1.5"/>
                  <path d="M8 8h8M8 12h5M16 16l-4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Right column */}
      <div className="w-[200px] flex flex-col gap-3">
        {/* ROI Calculator */}
        <div className="bg-[#141418] rounded-2xl p-4 border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer">
          <span className="text-white font-semibold text-[13px] block mb-3">ROI Calculator</span>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-[#0c0c10] rounded-lg px-3 py-2.5 border border-white/[0.06]">
              <span className="text-white/40 text-[12px]">1,000</span>
              <span className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">Hours</span>
            </div>
            <div className="flex items-center justify-between bg-[#0c0c10] rounded-lg px-3 py-2.5 border border-white/[0.06]">
              <span className="text-white/40 text-[12px]">$7,500</span>
              <span className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">USD</span>
            </div>
          </div>
        </div>

        {/* Reason Codes */}
        <div className="bg-[#141418] rounded-2xl p-4 border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer">
          <span className="text-white font-semibold text-[13px] block mb-3">Reason Codes</span>
          <div className="flex items-center bg-[#0c0c10] rounded-lg px-3 py-2.5 border border-white/[0.06]">
            <span className="text-white/30 text-[12px] flex-1">Enter Code: 12.7</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/30">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Company Dropdown ────────────────────────────────────────────────────────

const CompanyDropdown = () => (
  <div className="grid grid-cols-12 gap-3 p-3.5">
    {/* Who We Are - large */}
    <div className="col-span-6 row-span-2 bg-[#141418] rounded-2xl p-5 flex flex-col min-h-[240px] border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer relative overflow-hidden">
      <span className="text-white font-semibold text-[13px] relative z-10">Who We Are</span>
      <p className="text-white/35 text-[11px] mt-1 relative z-10">The story behind the Chargeflow.</p>
      <div className="flex-1 flex items-center justify-center relative mt-4">
        {/* Orbital rings */}
        <div className="relative w-36 h-36">
          <div className="absolute inset-0 rounded-full border border-white/[0.06]" style={{ transform: "rotateX(60deg) rotateZ(15deg)" }} />
          <div className="absolute inset-4 rounded-full border border-white/[0.05]" style={{ transform: "rotateX(60deg) rotateZ(-30deg)" }} />
          <div className="absolute inset-8 rounded-full border border-white/[0.04]" style={{ transform: "rotateX(60deg) rotateZ(45deg)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LogoIcon size={16} />
          </div>
          <div className="absolute top-2 left-1/2 w-1.5 h-1.5 bg-white/15 rotate-45" />
          <div className="absolute bottom-4 right-6 w-1.5 h-1.5 bg-white/15 rotate-45" />
          <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-white/15 rotate-45" />
          <div className="absolute bottom-2 left-1/3 w-1.5 h-1.5 bg-white/15 rotate-45" />
        </div>
      </div>
    </div>

    {/* Brand */}
    <div className="col-span-3 bg-[#141418] rounded-2xl p-4 flex flex-col border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer relative overflow-hidden min-h-[115px]">
      <span className="text-white font-semibold text-[13px] relative z-10">Brand</span>
      <div className="flex-1 flex items-center justify-center relative">
        <CardBg variant="grid" />
      </div>
    </div>

    {/* Careers */}
    <div className="col-span-3 bg-[#141418] rounded-2xl p-4 flex flex-col border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer relative overflow-hidden min-h-[115px]">
      <div className="flex items-center gap-2 relative z-10">
        <span className="text-white font-semibold text-[13px]">Careers</span>
        <span className="bg-[#4f46e5] text-white text-[9px] px-2 py-[2px] rounded-full font-medium">
          We&apos;re Hiring!
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center relative">
        <CardBg variant="dashed" />
      </div>
    </div>

    {/* Become a Partner */}
    <div className="col-span-3 bg-[#141418] rounded-2xl p-4 flex flex-col border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer relative overflow-hidden min-h-[115px]">
      <span className="text-white font-semibold text-[13px] relative z-10">Become a Partner</span>
      <div className="flex-1 flex items-center justify-center relative">
        <div className="flex items-center gap-3 z-10">
          <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center">
            <LogoIcon size={12} />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-dashed border-white/[0.1]" />
        </div>
      </div>
    </div>

    {/* Contact Us */}
    <div className="col-span-3 bg-[#141418] rounded-2xl p-4 flex flex-col border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer relative overflow-hidden min-h-[115px]">
      <span className="text-white font-semibold text-[13px] relative z-10">Contact Us</span>
      <div className="flex-1 flex items-center justify-center relative">
        <CardBg variant="rings" />
      </div>
    </div>
  </div>
);

// ─── Dropdown Map ────────────────────────────────────────────────────────────

const dropdownMap: Record<string, React.FC> = {
  PRODUCT: ProductDropdown,
  CUSTOMERS: CustomersDropdown,
  INTEGRATIONS: IntegrationsDropdown,
  RESOURCES: ResourcesDropdown,
  COMPANY: CompanyDropdown,
};

// ─── Main Navbar ─────────────────────────────────────────────────────────────

// ─── Mobile Menu Dropdown Items ─────────────────────────────────────────────

const mobileDropdownItems: Record<string, string[]> = {
  PRODUCT: ["Prevent", "Automation", "Alerts", "Insights", "Connect"],
  CUSTOMERS: ["All Case Studies", "obvi.", "elementor", "Fanatics", "HEXCLAD"],
  INTEGRATIONS: ["All Integrations", "Stripe", "Shopify", "WooCommerce"],
  RESOURCES: ["Blog", "Reports", "Podcast", "Webinars", "ROI Calculator", "Reason Codes"],
  COMPANY: ["Who we are", "Brand", "Become a Partner", "Careers", "Contact us"],
};

// ─── Mobile Navbar ──────────────────────────────────────────────────────────

const MobileNav = ({ theme }: { theme: NavTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleItem = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4">
        <LogoIcon size={28} color={isOpen ? "white" : theme === "light" ? "#0a1e3d" : "white"} />
        <button
          onClick={() => { setIsOpen(!isOpen); setExpandedItem(null); }}
          className="relative w-8 h-8 flex items-center justify-center z-50"
        >
          <div className="flex flex-col gap-[5px]">
            <motion.div
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-6 h-[2px] rounded-full"
              style={{ backgroundColor: isOpen ? "white" : theme === "light" ? "#0a1e3d" : "white" }}
            />
            <motion.div
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="w-6 h-[2px] rounded-full"
              style={{ backgroundColor: isOpen ? "white" : theme === "light" ? "#0a1e3d" : "white" }}
            />
            <motion.div
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-6 h-[2px] rounded-full"
              style={{ backgroundColor: isOpen ? "white" : theme === "light" ? "#0a1e3d" : "white" }}
            />
          </div>
        </button>
      </div>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#050508] z-40 overflow-y-auto"
          >
            <div className="pt-20 px-5 pb-10">
              {/* Sign In + Schedule */}
              <div className="flex items-center gap-4 mb-8">
                <button className="text-white/80 text-[12px] font-semibold tracking-[0.1em] flex items-center gap-1.5">
                  SIGN IN <ArrowUpRight />
                </button>
                <button className="bg-[#4f46e5] text-white text-[12px] font-semibold tracking-[0.08em] px-5 py-2.5 rounded-full flex items-center gap-1.5">
                  SCHEDULE A DEMO <ArrowUpRight />
                </button>
              </div>

              {/* Menu items */}
              <div className="space-y-0">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() => item.hasDropdown ? toggleItem(item.label) : null}
                      className="w-full flex items-center justify-between py-4 border-t border-dashed border-white/10"
                    >
                      <span className="text-white text-[14px] font-semibold tracking-wide">
                        {item.label}
                      </span>
                      {item.hasDropdown && (
                        <motion.svg
                          animate={{ rotate: expandedItem === item.label ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          width="14" height="14" viewBox="0 0 14 14" fill="none"
                        >
                          <path d="M3 5l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      )}
                    </button>

                    {/* Expandable sub-items */}
                    <AnimatePresence>
                      {expandedItem === item.label && item.hasDropdown && mobileDropdownItems[item.label] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-2 space-y-3">
                            {mobileDropdownItems[item.label].map((sub) => (
                              <button
                                key={sub}
                                className="block text-white/70 text-[13px] font-medium hover:text-white transition-colors"
                              >
                                {sub}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                {/* Bottom border */}
                <div className="border-t border-dashed border-white/10" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Navbar({ theme = "dark" }: { theme?: NavTheme }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDropdownOpen = activeMenu !== null && activeMenu in dropdownMap;

  const logoColor = theme === "light" && !isDropdownOpen ? "#0a1e3d" : "white";
  const textColor = theme === "light" && !isDropdownOpen ? "text-[#0a1e3d]" : "text-white";
  const textMutedColor = theme === "light" && !isDropdownOpen ? "text-[#0a1e3d]/60" : "text-white/60";
  const textMutedHover = theme === "light" && !isDropdownOpen ? "hover:text-[#0a1e3d]" : "hover:text-white";
  const pillBg = theme === "light" && !isDropdownOpen ? "bg-white/70" : "bg-[#18181d]/90";
  const pillBorder = theme === "light" && !isDropdownOpen ? "border-[#0a1e3d]/10" : "border-white/[0.06]";
  const signInColor = theme === "light" && !isDropdownOpen ? "text-[#0a1e3d]/70 hover:text-[#0a1e3d]" : "text-white/70 hover:text-white";

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startCloseTimer = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  const handleMenuEnter = useCallback(
    (label: string) => {
      clearTimer();
      if (label in dropdownMap) {
        setActiveMenu(label);
      } else {
        setActiveMenu(null);
      }
    },
    [clearTimer]
  );

  const DropdownContent = activeMenu ? dropdownMap[activeMenu] : null;

  return (
    <>
    <MobileNav theme={theme} />
    <div className="fixed top-0 left-0 right-0 z-50 hidden md:flex flex-col items-center pt-4 px-4">
      <motion.div
        className="relative"
        animate={{
          width: isDropdownOpen ? "58.33vw" : "83.33vw",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 30,
          mass: 0.8,
        }}
        onMouseLeave={startCloseTimer}
        onMouseEnter={clearTimer}
      >
        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between w-full h-12">
          {/* Logo area */}
          <AnimatePresence mode="wait">
            {isDropdownOpen ? (
              <motion.div
                key="icon-only"
                initial={{ opacity: 0, scale: 0.7, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: "auto" }}
                exit={{ opacity: 0, scale: 0.7, width: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex-shrink-0 cursor-pointer overflow-hidden"
              >
                <LogoIcon size={28} color={logoColor} />
              </motion.div>
            ) : (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex-shrink-0 overflow-hidden"
              >
                <ChargeflowLogo color={logoColor} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blue diamond decoration (visible in default state) */}
          <AnimatePresence>
            {!isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-shrink-0 ml-4"
              >
                <div className="w-2.5 h-2.5 bg-[#4f6ef7] rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Center pill */}
          <div className={`flex items-center ${pillBg} backdrop-blur-xl rounded-full px-1 py-[3px] border ${pillBorder} mx-auto transition-colors duration-300`}>
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`px-3.5 py-[7px] text-[10.5px] font-semibold tracking-[0.1em] transition-colors rounded-full whitespace-nowrap ${
                  activeMenu === item.label
                    ? textColor
                    : `${textMutedColor} ${textMutedHover}`
                }`}
                onMouseEnter={() => handleMenuEnter(item.label)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className={`${signInColor} text-[10.5px] font-semibold tracking-[0.08em] flex items-center gap-1.5 transition-colors whitespace-nowrap`}>
              SIGN IN <ArrowUpRight />
            </button>
            <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[10.5px] font-semibold tracking-[0.08em] px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors whitespace-nowrap">
              SIGN UP <ArrowUpRight />
            </button>
          </div>
        </div>

        {/* ── Dropdown Panel ── */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              key="dropdown-container"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 28,
                mass: 0.7,
                opacity: { duration: 0.2 },
              }}
              style={{ transformOrigin: "top center" }}
              className="mt-2 rounded-2xl bg-[#0a0a0f] backdrop-blur-2xl border border-white/[0.06] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              onMouseEnter={clearTimer}
              onMouseLeave={startCloseTimer}
            >
              <AnimatePresence mode="wait">
                {DropdownContent && (
                  <motion.div
                    key={activeMenu}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <DropdownContent />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    </>
  );
}
