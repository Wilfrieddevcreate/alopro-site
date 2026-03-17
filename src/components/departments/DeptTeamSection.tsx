"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { SectionHeader } from "@/src/components/departments/SectionHeader";
import type { Department } from "@/src/constants/departments";

interface Props {
  dept: Department;
}

export function DeptTeamSection({ dept }: Props) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-gray-50 py-16 dark:bg-[#000000] sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t(`${dept.translationPrefix}.team.badge`)}
          title={t(`${dept.translationPrefix}.team.title`)}
          titleHighlight={t(`${dept.translationPrefix}.team.titleHighlight`)}
          accentColor={dept.color}
          isInView={isInView}
        />

        {/* Team grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {dept.team.map((member, i) => {
            const initials = t(`${dept.translationPrefix}.team.${member.key}.name`)
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <motion.div
                key={member.key}
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-gray-300 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12]"
              >
                {/* Avatar placeholder */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.45 + i * 0.12,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-full text-[16px] font-bold"
                  style={{
                    backgroundColor: dept.color + "12",
                    color: dept.color,
                  }}
                >
                  {initials}
                </motion.div>

                {/* Name */}
                <h4 className="mb-1 text-[16px] font-bold text-gray-900 dark:text-white">
                  {t(`${dept.translationPrefix}.team.${member.key}.name`)}
                </h4>

                {/* Role */}
                <p
                  className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em]"
                  style={{ color: dept.color }}
                >
                  {t(`${dept.translationPrefix}.team.${member.key}.role`)}
                </p>

                {/* Description */}
                <p className="text-[14px] leading-[1.7] text-gray-500 dark:text-gray-400">
                  {t(`${dept.translationPrefix}.team.${member.key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
