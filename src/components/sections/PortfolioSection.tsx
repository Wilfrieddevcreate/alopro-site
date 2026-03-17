"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/src/contexts/LanguageContext";
import type { Project } from "@/src/types/project";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const categoryColors: Record<string, string> = {
  web: "#1F6FEB",
  mobile: "#059669",
  design: "#EA580C",
  ai: "#8B5CF6",
};

const categoryLabels: Record<string, Record<string, string>> = {
  web: { fr: "Web", en: "Web" },
  mobile: { fr: "Mobile", en: "Mobile" },
  design: { fr: "Design", en: "Design" },
  ai: { fr: "IA", en: "AI" },
};

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      <div className="h-48 animate-pulse bg-white/[0.04] sm:h-56" />
      <div className="p-6">
        <div className="mb-2 h-3 w-20 animate-pulse rounded bg-white/[0.06]" />
        <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-white/[0.06]" />
        <div className="mb-5 space-y-1.5">
          <div className="h-3 w-full animate-pulse rounded bg-white/[0.04]" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-white/[0.04]" />
        </div>
        <div className="h-3 w-24 animate-pulse rounded bg-white/[0.06]" />
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const { t, locale } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section
      id="portfolio"
      ref={ref}
      className="bg-gray-50 py-16 dark:bg-[#000000] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
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
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
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
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
              }}
              className="mt-4 text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white"
            >
              {t("portfolio.title")}{" "}
              <span className="text-[#1F6FEB]">{t("portfolio.titleHighlight")}</span>
            </motion.h2>
          </div>
          <div>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="max-w-sm text-[16px] leading-[1.7] text-gray-500 dark:text-gray-400 lg:text-right"
            >
              {t("portfolio.subtitle")}
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease } },
              }}
              className="mt-4 lg:text-right"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-5 py-2.5 text-[13px] font-semibold text-gray-300 transition-colors hover:border-white/[0.15] hover:text-white"
              >
                {locale === "fr" ? "Voir tous les projets" : "View all projects"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-12 h-px origin-left bg-gray-200 dark:bg-white/[0.06]"
        />

        {/* Loading skeletons */}
        {loading && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Projects grid */}
        {!loading && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {projects.map((project, i) => {
              const color = categoryColors[project.category] ?? "#1F6FEB";
              const title = locale === "fr" ? project.titleFr : project.titleEn;
              const desc = locale === "fr" ? project.descriptionFr : project.descriptionEn;
              const catLabel = categoryLabels[project.category]?.[locale] ?? project.category;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease }}
                  className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-200 hover:border-white/[0.12]"
                >
                  <div className="relative h-48 overflow-hidden bg-white/[0.03] sm:h-56">
                    <div
                      className="absolute left-0 top-0 h-[3px] w-full"
                      style={{ backgroundColor: color }}
                    />
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{ backgroundColor: color + "12", color }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <p
                      className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em]"
                      style={{ color }}
                    >
                      {catLabel}
                    </p>
                    <h3 className="mb-2 text-[18px] font-bold text-white">{title}</h3>
                    <p className="mb-5 text-[14px] leading-[1.7] text-gray-400">{desc}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-150"
                        style={{ color }}
                      >
                        {t("portfolio.viewProject")}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-150 group-hover:translate-x-0.5">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Empty state */}
            {projects.length === 0 && (
              <div className="col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] py-16 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F6FEB]/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F6FEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <p className="text-[15px] font-medium text-gray-400">
                  {locale === "fr" ? "Nos projets arrivent bientôt !" : "Our projects are coming soon!"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
