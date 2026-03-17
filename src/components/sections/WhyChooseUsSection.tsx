"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const values = [
  {
    titleKey: "why.innovation.title",
    descKey: "why.innovation.desc",
    number: "01",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
  },
  {
    titleKey: "why.expertise.title",
    descKey: "why.expertise.desc",
    number: "02",
    icon: (
      <svg
        width="28"
        height="28"
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
  },
  {
    titleKey: "why.tailored.title",
    descKey: "why.tailored.desc",
    number: "03",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export function WhyChooseUsSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="bg-[#000000] py-16 sm:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mb-14 max-w-2xl"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease },
              },
            }}
            className="mb-4 flex items-center gap-3"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="hidden h-px w-8 origin-left bg-[#1F6FEB] sm:block"
            />
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1F6FEB]">
              {t("why.badge")}
            </p>
          </motion.div>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.6, ease },
              },
            }}
            className="text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white"
          >
            {t("why.title")}{" "}
            <span className="text-[#1F6FEB]">{t("why.titleHighlight")}</span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease },
              },
            }}
            className="mt-4 max-w-lg text-[16px] leading-[1.7] text-gray-500 dark:text-gray-400"
          >
            {t("why.subtitle")}
          </motion.p>
        </motion.div>

        {/* Value cards - 3 columns */}
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((value, i) => (
            <motion.div
              key={value.titleKey}
              initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
              animate={
                isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.15,
                ease,
              }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:border-[#1F6FEB]/30 hover:shadow-lg hover:shadow-[#1F6FEB]/[0.04] dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-[#1F6FEB]/20 lg:p-10"
            >
              {/* Big number - visible in background */}
              <span className="pointer-events-none absolute -top-4 -right-2 text-[120px] font-black leading-none text-gray-900/[0.04] transition-colors duration-300 group-hover:text-[#1F6FEB]/[0.08] dark:text-white/[0.03] dark:group-hover:text-[#1F6FEB]/[0.06] lg:text-[140px]">
                {value.number}
              </span>

              {/* Icon */}
              <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1F6FEB]/[0.08] text-[#1F6FEB] transition-colors duration-300 group-hover:bg-[#1F6FEB]/[0.12]">
                {value.icon}
              </div>

              {/* Number label */}
              <p className="relative mb-3 text-[13px] font-bold uppercase tracking-[0.15em] text-[#1F6FEB]">
                {value.number}
              </p>

              {/* Title */}
              <h3 className="relative mb-3 text-[20px] font-bold tracking-tight text-gray-900 dark:text-white lg:text-[22px]">
                {t(value.titleKey)}
              </h3>

              {/* Description */}
              <p className="relative text-[15px] leading-[1.8] text-gray-500 dark:text-gray-400 lg:text-[16px]">
                {t(value.descKey)}
              </p>

              {/* Bottom accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.15, ease }}
                className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#1F6FEB]/30"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
