"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";

/* ---- Animation variants ---- */

const containerLeft = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ---- Animated counter ---- */

function AnimatedNumber({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(duration / value);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <>{count}{suffix}</>;
}

/* ---- Animated progress bar ---- */

function AnimatedBar({ width, color, delay, inView }: { width: string; color: string; delay: number; inView: boolean }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-white/[0.06]">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width } : {}}
        transition={{ duration: 1, delay, ease }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

/* ---- Component ---- */

export function HeroSection() {
  const { t, locale } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  const departments = [
    {
      label: locale === "fr" ? "Développement" : "Development",
      desc: locale === "fr" ? "Sites, Apps & Logiciels" : "Sites, Apps & Software",
      color: "#2563EB",
      progress: "85%",
      projects: 24,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      label: locale === "fr" ? "Recherche" : "Research",
      desc: locale === "fr" ? "IA, IoT & Blockchain" : "AI, IoT & Blockchain",
      color: "#1F6FEB",
      progress: "72%",
      projects: 12,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      label: "Formation",
      desc: locale === "fr" ? "Cours & Certifications" : "Courses & Certifications",
      color: "#059669",
      progress: "91%",
      projects: 18,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
  ];

  const stats = [
    { value: 50, suffix: "+", label: locale === "fr" ? "Projets livrés" : "Projects delivered" },
    { value: 98, suffix: "%", label: "Satisfaction" },
    { value: 5, suffix: "+", label: locale === "fr" ? "Ans d'expertise" : "Years of expertise" },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#000814]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/herosection.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16 lg:px-8 lg:pt-40 lg:pb-28">

        {/* ---- Left: Content ---- */}
        <motion.div
          variants={containerLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Overline */}
          <motion.div variants={slideUp} className="mb-4 flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="hidden h-px w-8 origin-left bg-[#1F6FEB] sm:block"
            />
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1F6FEB]">
              {t("hero.badge")}
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={slideUp}
            className="text-[clamp(32px,4.8vw,56px)] font-bold leading-[1.12] tracking-tight text-gray-900 dark:text-white"
          >
            {t("hero.titleLine1")}{" "}
            <span className="text-[#1F6FEB]">{t("hero.titleHighlight")}</span>{" "}
            {t("hero.titleLine2")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={slideUp}
            className="mt-5 max-w-md text-[17px] leading-[1.7] text-gray-500 dark:text-gray-400"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={slideUp} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1F6FEB] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#1a5fd4]"
            >
              {t("hero.cta1")}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-[14px] font-semibold text-gray-900 transition-colors duration-150 hover:bg-gray-100"
            >
              {t("hero.cta2")}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Link>
          </motion.div>

          {/* Metrics */}
          <motion.div
            variants={slideUp}
            className="mt-12 flex gap-8 border-t border-gray-200 pt-7 dark:border-white/[0.06]"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-[24px] font-bold tracking-tight text-gray-900 dark:text-white">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
                </p>
                <p className="mt-0.5 text-[12px] text-gray-400 dark:text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---- Right: macOS Dashboard Window ---- */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.35 }}
          className="relative hidden lg:block"
        >
          <div className="rounded-xl border border-white/[0.08] bg-[#010409] shadow-2xl shadow-black/50">
            {/* ---- macOS title bar ---- */}
            <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3 dark:border-white/[0.06]">
              {/* Traffic lights */}
              <motion.span
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="h-3 w-3 rounded-full bg-[#FF5F57]"
              />
              <motion.span
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.68 }}
                className="h-3 w-3 rounded-full bg-[#FEBC2E]"
              />
              <motion.span
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.76 }}
                className="h-3 w-3 rounded-full bg-[#28C840]"
              />
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="ml-3 text-[12px] font-medium text-gray-400 dark:text-gray-500"
              >
                ALOPRO
              </motion.span>
            </div>

            {/* ---- Window content ---- */}
            <div className="p-5">
              {/* Top metrics row */}
              <div className="mb-5 grid grid-cols-3 gap-3">
                {[
                  { label: locale === "fr" ? "Projets actifs" : "Active projects", value: "54", color: "#1F6FEB" },
                  { label: locale === "fr" ? "Satisfaction" : "Satisfaction", value: "98%", color: "#059669" },
                  { label: locale === "fr" ? "Équipe" : "Team", value: "25+", color: "#2563EB" },
                ].map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.95 + i * 0.08, ease }}
                    className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-4 py-3"
                  >
                    <p className="text-[22px] font-bold tracking-tight" style={{ color: metric.color }}>
                      {metric.value}
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">{metric.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Department cards */}
              <div className="space-y-3">
                {departments.map((dept, i) => (
                  <motion.div
                    key={dept.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 + i * 0.12, ease }}
                    className="group flex items-center gap-4 rounded-lg border border-white/[0.05] bg-white/[0.015] px-4 py-3.5 transition-all duration-200 hover:border-white/[0.1]"
                  >
                    {/* Icon */}
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: dept.color + "12", color: dept.color }}
                    >
                      {dept.icon}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{dept.label}</p>
                        <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">
                          {dept.projects} {locale === "fr" ? "projets" : "projects"}
                        </span>
                      </div>
                      <p className="mb-2 text-[12px] text-gray-400 dark:text-gray-500">{dept.desc}</p>
                      <AnimatedBar width={dept.progress} color={dept.color} delay={1.5 + i * 0.15} inView={inView} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom status bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.9 }}
                className="mt-4 flex items-center justify-between rounded-lg border border-dashed border-gray-200 px-4 py-2.5 dark:border-white/[0.06]"
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 2.1, type: "spring", stiffness: 300 }}
                    className="h-2 w-2 rounded-full bg-emerald-500"
                  />
                  <span className="text-[12px] font-medium text-gray-500 dark:text-gray-400">
                    {locale === "fr" ? "Tous les systèmes opérationnels" : "All systems operational"}
                  </span>
                </div>
                <span className="text-[12px] font-medium text-emerald-600 dark:text-emerald-400">99.9%</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Separator */}
      <div className="h-px bg-white/[0.04]" />
    </section>
  );
}
