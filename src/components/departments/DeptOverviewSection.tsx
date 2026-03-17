"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { SectionHeader } from "./SectionHeader";
import type { Department } from "@/src/constants/departments";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

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

/* ---- Component ---- */

interface DeptOverviewSectionProps {
  dept: Department;
}

export function DeptOverviewSection({ dept }: DeptOverviewSectionProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
      value: parseInt(t(`${prefix}.overview.stat3.value`)) || 15,
      suffix: t(`${prefix}.overview.stat3.value`).replace(/[0-9]/g, ""),
      label: t(`${prefix}.overview.stat3.label`),
    },
  ];

  return (
    <section className="bg-[#000000] py-16 sm:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          badge={t(`${prefix}.overview.badge`)}
          title={t(`${prefix}.overview.title`)}
          titleHighlight={t(`${prefix}.overview.titleHighlight`)}
          subtitle={t(`${prefix}.overview.subtitle`)}
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

        {/* Text blocks */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="mt-12 max-w-3xl space-y-6"
        >
          <p className="text-[16px] leading-[1.8] text-gray-600 dark:text-gray-400">
            {t(`${prefix}.overview.text1`)}
          </p>
          <p className="text-[16px] leading-[1.8] text-gray-600 dark:text-gray-400">
            {t(`${prefix}.overview.text2`)}
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              animate={
                isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.7 + i * 0.15,
                ease,
              }}
              className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-8 text-center dark:border-white/[0.06] dark:bg-white/[0.02]"
            >
              <p
                className="text-[36px] font-bold tracking-tight"
                style={{ color: dept.color }}
              >
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </p>
              <p className="mt-2 text-[14px] text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
