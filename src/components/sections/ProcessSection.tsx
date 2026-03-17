"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";

const steps = [
  {
    key: "process.step1",
    number: "01",
    color: "#1F6FEB",
    icon: (
      <svg
        width="22"
        height="22"
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
  },
  {
    key: "process.step2",
    number: "02",
    color: "#1F6FEB",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    key: "process.step3",
    number: "03",
    color: "#059669",
    icon: (
      <svg
        width="22"
        height="22"
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
    key: "process.step4",
    number: "04",
    color: "#EA580C",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export function ProcessSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#000000] py-16 sm:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="max-w-2xl"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                },
              },
            }}
            className="flex items-center gap-3"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              className="h-px w-8 origin-left bg-[#1F6FEB]"
            />
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1F6FEB]">
              {t("process.badge")}
            </p>
          </motion.div>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                },
              },
            }}
            className="mt-4 text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white"
          >
            {t("process.title")}{" "}
            <span className="text-[#1F6FEB]">
              {t("process.titleHighlight")}
            </span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                },
              },
            }}
            className="mt-4 max-w-lg text-[16px] leading-[1.7] text-gray-500 dark:text-gray-400"
          >
            {t("process.subtitle")}
          </motion.p>
        </motion.div>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mt-12 h-px origin-left bg-gray-100 dark:bg-white/[0.04]"
        />

        {/* Steps */}
        <div className="mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              animate={
                isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.15,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="relative border-b border-gray-100 py-10 dark:border-white/[0.04] sm:border-b-0 sm:border-r sm:px-8 sm:py-12 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0 lg:last:border-r-0"
            >
              {/* Top colored accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.7 + i * 0.15,
                  ease: "easeOut",
                }}
                className="absolute left-0 top-0 hidden h-[3px] w-12 origin-left rounded-full sm:block"
                style={{ backgroundColor: step.color }}
              />

              {/* Mobile left accent */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.7 + i * 0.15,
                  ease: "easeOut",
                }}
                className="absolute left-0 top-10 h-8 w-[3px] origin-top rounded-full sm:hidden"
                style={{ backgroundColor: step.color }}
              />

              {/* Number */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.65 + i * 0.15,
                  type: "spring",
                  stiffness: 200,
                }}
                className="mb-6 block text-[56px] font-bold leading-none text-gray-100 dark:text-white/[0.04]"
              >
                {step.number}
              </motion.span>

              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + i * 0.15,
                  ease: "easeOut",
                }}
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: step.color + "10",
                  color: step.color,
                }}
              >
                {step.icon}
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.15 }}
                className="mb-2 text-[18px] font-bold text-gray-900 dark:text-white"
              >
                {t(`${step.key}.title`)}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.0 + i * 0.15 }}
                className="text-[14px] leading-[1.7] text-gray-500 dark:text-gray-400"
              >
                {t(`${step.key}.desc`)}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
