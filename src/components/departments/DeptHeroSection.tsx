"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import type { Department } from "@/src/constants/departments";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container = {
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
    transition: { duration: 0.6, ease },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease },
  },
};

/* ---- Animated counter ---- */

function AnimatedNumber({
  value,
  suffix = "",
  inView,
}: {
  value: number;
  suffix?: string;
  inView: boolean;
}) {
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

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

/* ---- Icon map ---- */

function DeptIcon({ slug, color }: { slug: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    dev: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    research: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    training: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  };

  return (
    <div
      className="flex h-28 w-28 items-center justify-center rounded-2xl"
      style={{ backgroundColor: color + "14", color }}
    >
      {icons[slug] ?? icons.dev}
    </div>
  );
}

/* ---- Component ---- */

interface DeptHeroSectionProps {
  dept: Department;
}

export function DeptHeroSection({ dept }: DeptHeroSectionProps) {
  const { t, locale } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  const prefix = dept.translationPrefix;

  const stats = [
    {
      value: parseInt(t(`${prefix}.overview.stat1.value`)) || 50,
      suffix: t(`${prefix}.overview.stat1.value`).replace(/[0-9]/g, ""),
      label: t(`${prefix}.overview.stat1.label`),
    },
    {
      value: parseInt(t(`${prefix}.overview.stat2.value`)) || 98,
      suffix: t(`${prefix}.overview.stat2.value`).replace(/[0-9]/g, ""),
      label: t(`${prefix}.overview.stat2.label`),
    },
    {
      value: parseInt(t(`${prefix}.overview.stat3.value`)) || 5,
      suffix: t(`${prefix}.overview.stat3.value`).replace(/[0-9]/g, ""),
      label: t(`${prefix}.overview.stat3.label`),
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#000000]"
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

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pt-32 pb-16 sm:px-6 sm:pt-36 sm:pb-24 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:px-8 lg:pt-40 lg:pb-28">
        {/* ---- Left: Content ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Overline badge */}
          <motion.div variants={slideUp} className="mb-4 flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="hidden h-px w-8 origin-left sm:block"
              style={{ backgroundColor: dept.color }}
            />
            <p
              className="text-[13px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: dept.color }}
            >
              {t(`${prefix}.hero.badge`)}
            </p>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={slideUp}
            className="text-[clamp(32px,4.8vw,56px)] font-bold leading-[1.12] tracking-tight text-gray-900 dark:text-white"
          >
            {t(`${prefix}.hero.title`)}{" "}
            <span style={{ color: dept.color }}>
              {t(`${prefix}.hero.titleHighlight`)}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={slideUp}
            className="mt-5 max-w-md text-[17px] leading-[1.7] text-gray-500 dark:text-gray-400"
          >
            {t(`${prefix}.hero.subtitle`)}
          </motion.p>

          {/* Buttons */}
          <motion.div variants={slideUp} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-[14px] font-semibold text-gray-700 transition-colors duration-150 hover:bg-gray-50 dark:border-white/10 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/[0.04]"
            >
              {locale === "fr" ? "Retour accueil" : "Back to home"}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[14px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
              style={{ backgroundColor: dept.color }}
            >
              {locale === "fr" ? "Nous contacter" : "Contact us"}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
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
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </p>
                <p className="mt-0.5 text-[12px] text-gray-400 dark:text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---- Right: Icon visual ---- */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.35 }}
          className="hidden lg:flex lg:items-center lg:justify-center"
        >
          <div className="flex h-48 w-48 items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.08] dark:bg-white/[0.02]">
            <DeptIcon slug={dept.slug} color={dept.color} />
          </div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.4, ease }}
        className="h-px origin-left bg-gray-200 dark:bg-white/[0.06]"
      />
    </section>
  );
}
