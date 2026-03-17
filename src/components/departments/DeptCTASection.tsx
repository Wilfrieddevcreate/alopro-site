"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";
import type { Department } from "@/src/constants/departments";
import Link from "next/link";

interface Props {
  dept: Department;
}

export function DeptCTASection({ dept }: Props) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#000000] py-16 sm:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="rounded-2xl border border-gray-200 bg-gray-50 px-8 py-16 text-center dark:border-white/[0.06] dark:bg-white/[0.02] sm:px-16 sm:py-20"
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-6" style={{ backgroundColor: dept.color }} />
            <p
              className="text-[12px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: dept.color }}
            >
              {t(`${dept.translationPrefix}.cta.badge`)}
            </p>
            <span className="h-px w-6" style={{ backgroundColor: dept.color }} />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mx-auto max-w-2xl text-[clamp(26px,3.5vw,40px)] font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white"
          >
            {t(`${dept.translationPrefix}.cta.title`)}{" "}
            <span style={{ color: dept.color }}>
              {t(`${dept.translationPrefix}.cta.titleHighlight`)}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mx-auto mt-4 max-w-lg text-[16px] leading-[1.7] text-gray-500 dark:text-gray-400"
          >
            {t(`${dept.translationPrefix}.cta.subtitle`)}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[14px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
              style={{ backgroundColor: dept.color }}
            >
              {t(`${dept.translationPrefix}.cta.button`)}
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
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-6 py-3 text-[14px] font-semibold text-gray-700 transition-colors duration-150 hover:bg-gray-50 dark:border-white/10 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/[0.04]"
            >
              {t(`${dept.translationPrefix}.cta.secondary`)}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
