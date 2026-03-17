"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";

const departments = [
  {
    id: "dev",
    titleKey: "services.dev.title",
    descKey: "services.dev.desc",
    tagKey: "services.dev.tag",
    items: [
      "services.dev.item1",
      "services.dev.item2",
      "services.dev.item3",
      "services.dev.item4",
    ],
    number: "01",
    color: "#1F6FEB",
    icon: (
      <svg
        width="24"
        height="24"
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
    id: "research",
    titleKey: "services.research.title",
    descKey: "services.research.desc",
    tagKey: "services.research.tag",
    items: [
      "services.research.item1",
      "services.research.item2",
      "services.research.item3",
      "services.research.item4",
    ],
    number: "02",
    color: "#1F6FEB",
    icon: (
      <svg
        width="24"
        height="24"
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
    id: "training",
    titleKey: "services.training.title",
    descKey: "services.training.desc",
    tagKey: "services.training.tag",
    items: [
      "services.training.item1",
      "services.training.item2",
      "services.training.item3",
      "services.training.item4",
    ],
    number: "03",
    color: "#059669",
    icon: (
      <svg
        width="24"
        height="24"
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
  },
];

export function ServicesSection() {
  const { t, locale } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="bg-gray-50 py-16 dark:bg-[#000000] sm:py-24"
    >
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-xl">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as [
                      number,
                      number,
                      number,
                      number,
                    ],
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
                {t("services.badge")}
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
                    ease: [0.22, 1, 0.36, 1] as [
                      number,
                      number,
                      number,
                      number,
                    ],
                  },
                },
              }}
              className="mt-4 text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white"
            >
              {t("services.title")}{" "}
              <span className="text-[#1F6FEB]">
                {t("services.titleHighlight")}
              </span>
            </motion.h2>
          </div>

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
            className="max-w-sm text-[16px] leading-[1.7] text-gray-500 dark:text-gray-400 lg:text-right"
          >
            {t("services.subtitle")}
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
          className="mt-12 h-px origin-left bg-gray-200 dark:bg-white/[0.06]"
        />

        {/* Cards */}
        <div className="mt-0 grid divide-y divide-gray-200 dark:divide-white/[0.06] md:grid-cols-3 md:divide-x md:divide-y-0">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              animate={
                isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.15,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="group relative px-0 py-10 first:pt-10 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0"
            >
              {/* Number + Icon row */}
              <div className="mb-8 flex items-center justify-between">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.7 + i * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="text-[48px] font-bold leading-none text-gray-200 dark:text-white/[0.06]"
                >
                  {dept.number}
                </motion.span>
                <motion.div
                  initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + i * 0.15,
                    ease: "easeOut",
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: dept.color + "10",
                    color: dept.color,
                  }}
                >
                  {dept.icon}
                </motion.div>
              </div>

              {/* Left accent bar */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.6 + i * 0.15,
                  ease: "easeOut",
                }}
                className="absolute left-0 top-10 hidden h-10 w-[3px] origin-top rounded-full md:block"
                style={{ backgroundColor: dept.color }}
              />

              {/* Tag */}
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.85 + i * 0.15 }}
                className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: dept.color }}
              >
                {t(dept.tagKey)}
              </motion.p>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.15 }}
                className="mb-3 text-[20px] font-bold text-gray-900 dark:text-white"
              >
                {t(dept.titleKey)}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.95 + i * 0.15 }}
                className="mb-8 text-[15px] leading-[1.7] text-gray-500 dark:text-gray-400"
              >
                {t(dept.descKey)}
              </motion.p>

              {/* Items */}
              <ul className="space-y-3">
                {dept.items.map((key, j) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.35,
                      delay: 1.0 + i * 0.15 + j * 0.07,
                      ease: [0.22, 1, 0.36, 1] as [
                        number,
                        number,
                        number,
                        number,
                      ],
                    }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px]"
                      style={{
                        backgroundColor: dept.color + "12",
                        color: dept.color,
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-[14px] leading-[1.5] text-gray-600 dark:text-gray-400">
                      {t(key)}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Link */}
              <motion.a
                href={`/departments/${dept.id}`}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: 1.3 + i * 0.15 }}
                className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-150"
                style={{ color: dept.color }}
              >
                {locale === "fr" ? "En savoir plus" : "Learn more"}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* CTA Band */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.6,
            delay: 1.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mt-8 rounded-2xl border border-gray-200 bg-white px-8 py-8 dark:border-white/[0.06] dark:bg-white/[0.02] sm:px-12 sm:py-14"
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-lg">
              <h3 className="text-[clamp(22px,2.5vw,30px)] font-bold leading-[1.2] text-gray-900 dark:text-white">
                {t("services.cta.text")}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.7] text-gray-500 dark:text-gray-400">
                {t("services.cta.sub")}
              </p>
            </div>
            <motion.a
              href="/contact"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: 1.8,
                type: "spring",
                stiffness: 200,
              }}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#1F6FEB] px-6 py-3 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#1a5fd4]"
            >
              {t("services.cta.button")}
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
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
