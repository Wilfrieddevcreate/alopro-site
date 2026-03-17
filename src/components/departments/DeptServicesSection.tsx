"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { SectionHeader } from "./SectionHeader";
import type { Department } from "@/src/constants/departments";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ---- Component ---- */

interface DeptServicesSectionProps {
  dept: Department;
}

export function DeptServicesSection({ dept }: DeptServicesSectionProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const prefix = dept.translationPrefix;

  const services = [
    { number: "01", key: "s1" },
    { number: "02", key: "s2" },
    { number: "03", key: "s3" },
    { number: "04", key: "s4" },
    { number: "05", key: "s5" },
    { number: "06", key: "s6" },
  ];

  return (
    <section className="bg-gray-50 py-16 dark:bg-[#000000] sm:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          badge={t(`${prefix}.services.badge`)}
          title={t(`${prefix}.services.title`)}
          titleHighlight={t(`${prefix}.services.titleHighlight`)}
          subtitle={t(`${prefix}.services.subtitle`)}
          accentColor={dept.color}
          isInView={isInView}
          align="left"
        />

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-12 h-px origin-left bg-gray-200 dark:bg-white/[0.06]"
        />

        {/* Services grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              animate={
                isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.1,
                ease,
              }}
              className="rounded-2xl border border-gray-200 bg-white px-6 py-7 dark:border-white/[0.06] dark:bg-white/[0.02]"
            >
              {/* Number + icon placeholder */}
              <div className="mb-5 flex items-center justify-between">
                <span
                  className="text-[32px] font-bold leading-none"
                  style={{ color: dept.color + "30" }}
                >
                  {service.number}
                </span>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: dept.color + "10",
                    color: dept.color,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 12h6" />
                    <path d="M12 9v6" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-[17px] font-bold text-gray-900 dark:text-white">
                {t(`${prefix}.services.${service.key}.title`)}
              </h3>

              {/* Description */}
              <p className="text-[15px] leading-[1.7] text-gray-500 dark:text-gray-400">
                {t(`${prefix}.services.${service.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
