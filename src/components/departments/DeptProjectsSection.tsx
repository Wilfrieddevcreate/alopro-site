"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { SectionHeader } from "@/src/components/departments/SectionHeader";
import type { Department } from "@/src/constants/departments";

interface Props {
  dept: Department;
}

export function DeptProjectsSection({ dept }: Props) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#00000] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t(`${dept.translationPrefix}.projects.badge`)}
          title={t(`${dept.translationPrefix}.projects.title`)}
          titleHighlight={t(`${dept.translationPrefix}.projects.titleHighlight`)}
          accentColor={dept.color}
          isInView={isInView}
        />

        {/* Current Projects */}
        <motion.h3
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-12 mb-8 text-[22px] font-bold text-gray-900 dark:text-white"
        >
          {t("dept.currentProjects")}
        </motion.h3>

        <div className="grid gap-5 md:grid-cols-2">
          {dept.currentProjects.map((project, i) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.6,
                delay: 0.4 + i * 0.12,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors duration-200 hover:border-gray-300 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12]"
            >
              {/* Colored top bar */}
              <div
                className="h-[3px] w-full"
                style={{ backgroundColor: project.color }}
              />

              <div className="p-6">
                {/* Status badge */}
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]"
                    style={{
                      backgroundColor: dept.color + "12",
                      color: dept.color,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: dept.color }}
                    />
                    {t("dept.inProgress")}
                  </span>
                </div>

                <h4 className="mb-2 text-[18px] font-bold text-gray-900 dark:text-white">
                  {t(`${dept.translationPrefix}.projects.current.${project.key}.title`)}
                </h4>

                <p className="text-[14px] leading-[1.7] text-gray-500 dark:text-gray-400">
                  {t(`${dept.translationPrefix}.projects.current.${project.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Completed Projects */}
        <motion.h3
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.5,
            delay: 0.4 + dept.currentProjects.length * 0.12 + 0.2,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mt-16 mb-8 text-[22px] font-bold text-gray-900 dark:text-white"
        >
          {t("dept.completedProjects")}
        </motion.h3>

        <div className="grid gap-5 md:grid-cols-3">
          {dept.completedProjects.map((project, i) => {
            const baseDelay = 0.5 + dept.currentProjects.length * 0.12 + 0.3;
            return (
              <motion.div
                key={project.key}
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.6,
                  delay: baseDelay + i * 0.12,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors duration-200 hover:border-gray-300 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12]"
              >
                {/* Colored top bar */}
                <div
                  className="h-[3px] w-full"
                  style={{ backgroundColor: project.color }}
                />

                <div className="p-6">
                  {/* Completion date */}
                  <p
                    className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: project.color }}
                  >
                    {t(`${dept.translationPrefix}.projects.completed.${project.key}.date`)}
                  </p>

                  <h4 className="mb-2 text-[18px] font-bold text-gray-900 dark:text-white">
                    {t(`${dept.translationPrefix}.projects.completed.${project.key}.title`)}
                  </h4>

                  <p className="text-[14px] leading-[1.7] text-gray-500 dark:text-gray-400">
                    {t(`${dept.translationPrefix}.projects.completed.${project.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
