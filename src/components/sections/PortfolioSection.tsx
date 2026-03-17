"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";

const projects = [
  { key: "portfolio.project1", color: "#1F6FEB", tag: "E-Commerce" },
  { key: "portfolio.project2", color: "#1F6FEB", tag: "Dashboard" },
  { key: "portfolio.project3", color: "#059669", tag: "Mobile" },
  { key: "portfolio.project4", color: "#EA580C", tag: "SaaS" },
];

export function PortfolioSection() {
  const { t, locale } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="portfolio"
      ref={ref}
      className="bg-gray-50 py-16 dark:bg-[#060e1e] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-xl">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
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
                {t("portfolio.badge")}
              </p>
            </motion.div>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
                visible: {
                  opacity: 1, y: 0, filter: "blur(0px)",
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
                },
              }}
              className="mt-4 text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white"
            >
              {t("portfolio.title")}{" "}
              <span className="text-[#1F6FEB]">{t("portfolio.titleHighlight")}</span>
            </motion.h2>
          </div>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
            }}
            className="max-w-sm text-[15px] leading-[1.7] text-gray-500 dark:text-gray-400 lg:text-right"
          >
            {t("portfolio.subtitle")}
          </motion.p>
        </motion.div>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-12 h-px origin-left bg-gray-200 dark:bg-white/[0.06]"
        />

        {/* Projects grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.12,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors duration-200 hover:border-gray-300 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12]"
            >
              {/* Image placeholder */}
              <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-white/[0.03] sm:h-56">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.12, ease: "easeOut" }}
                  className="absolute left-0 top-0 h-[3px] w-full origin-left"
                  style={{ backgroundColor: project.color }}
                />
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.9 + i * 0.12, type: "spring", stiffness: 200 }}
                      className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: project.color + "12", color: project.color }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </motion.div>
                    <p className="text-[12px] text-gray-300 dark:text-gray-600">
                      {locale === "fr" ? "Aperçu du projet" : "Project preview"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.95 + i * 0.12 }}
                  className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: project.color }}
                >
                  {project.tag}
                </motion.p>

                <h3 className="mb-2 text-[18px] font-bold text-gray-900 dark:text-white">
                  {t(`${project.key}.title`)}
                </h3>

                <p className="mb-5 text-[13px] leading-[1.7] text-gray-500 dark:text-gray-400">
                  {t(`${project.key}.desc`)}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-150"
                  style={{ color: project.color }}
                >
                  {t("portfolio.viewProject")}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-150 group-hover:translate-x-0.5">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
