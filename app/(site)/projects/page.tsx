"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/src/contexts/LanguageContext";
import type { Project } from "@/src/types/project";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BATCH_SIZE = 6;

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

const allCategories = [
  { key: "all", fr: "Tous", en: "All" },
  { key: "web", fr: "Web", en: "Web" },
  { key: "mobile", fr: "Mobile", en: "Mobile" },
  { key: "design", fr: "Design", en: "Design" },
  { key: "ai", fr: "IA", en: "AI" },
];

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      <div className="h-52 animate-pulse bg-white/[0.04]" />
      <div className="p-6">
        <div className="mb-2 h-3 w-16 animate-pulse rounded bg-white/[0.06]" />
        <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-white/[0.06]" />
        <div className="mb-4 space-y-1.5">
          <div className="h-3 w-full animate-pulse rounded bg-white/[0.04]" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-white/[0.04]" />
        </div>
        <div className="h-3 w-24 animate-pulse rounded bg-white/[0.06]" />
      </div>
    </div>
  );
}

function ProjectCard({ project, locale, index }: { project: Project; locale: string; index: number }) {
  const color = categoryColors[project.category] ?? "#1F6FEB";
  const title = locale === "fr" ? project.titleFr : project.titleEn;
  const desc = locale === "fr" ? project.descriptionFr : project.descriptionEn;
  const catLabel = categoryLabels[project.category]?.[locale] ?? project.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % BATCH_SIZE) * 0.08, ease }}
      className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-white/[0.03]">
        <div
          className="absolute left-0 top-0 h-[3px] w-full"
          style={{ backgroundColor: color }}
        />
        {project.image ? (
          <img
            src={project.image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: color + "18", color }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white"
            style={{ backgroundColor: color }}
          >
            {catLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 text-[18px] font-bold text-white transition-colors group-hover:text-[#1F6FEB]">
          {title}
        </h3>
        <p className="mb-5 text-[14px] leading-[1.7] text-gray-400 line-clamp-3">{desc}</p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-150"
            style={{ color }}
          >
            {locale === "fr" ? "Voir le projet" : "View project"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-150 group-hover:translate-x-0.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { locale } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setAllProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "all"
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Reset visible count when category changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(BATCH_SIZE);
  };

  // Infinite scroll with IntersectionObserver
  const loadMore = useCallback(() => {
    if (hasMore) {
      setVisibleCount((prev) => prev + BATCH_SIZE);
    }
  }, [hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="min-h-screen bg-[#000000] pt-16">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease }}
            className="mb-12"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="hidden h-px w-8 origin-left bg-[#1F6FEB] sm:block" />
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1F6FEB]">
                Portfolio
              </p>
            </div>
            <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.12] tracking-tight text-white">
              {locale === "fr" ? "Nos " : "Our "}
              <span className="text-[#1F6FEB]">
                {locale === "fr" ? "projets" : "projects"}
              </span>
            </h1>
            <p className="mt-4 max-w-lg text-[17px] leading-[1.7] text-gray-400">
              {locale === "fr"
                ? "Découvrez l'ensemble de nos réalisations et projets qui illustrent notre savoir-faire."
                : "Discover all our achievements and projects that showcase our expertise."}
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="mb-10 flex flex-wrap gap-2"
          >
            {allCategories.map((cat) => {
              const active = activeCategory === cat.key;
              const color = cat.key === "all" ? "#1F6FEB" : (categoryColors[cat.key] ?? "#1F6FEB");
              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                    active
                      ? "text-white"
                      : "border border-white/[0.08] text-gray-400 hover:border-white/[0.15] hover:text-white"
                  }`}
                  style={active ? { backgroundColor: color } : undefined}
                >
                  {cat[locale as "fr" | "en"]}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Projects grid */}
        {!loading && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  locale={locale}
                  index={i}
                />
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F6FEB]/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F6FEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <p className="text-[16px] text-gray-500">
                  {locale === "fr"
                    ? "Aucun projet dans cette catégorie."
                    : "No projects in this category."}
                </p>
              </div>
            )}

            {/* Infinite scroll sentinel */}
            {hasMore && (
              <div ref={sentinelRef} className="mt-8 flex justify-center py-8">
                <div className="flex items-center gap-2 text-[13px] text-gray-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  {locale === "fr" ? "Chargement..." : "Loading..."}
                </div>
              </div>
            )}
          </>
        )}

        {/* Bottom CTA */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="mt-20 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-14 text-center sm:px-16"
          >
            <h2 className="text-[24px] font-bold text-white sm:text-[28px]">
              {locale === "fr" ? "Un projet en tête ?" : "Have a project in mind?"}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[16px] leading-[1.7] text-gray-400">
              {locale === "fr"
                ? "Discutons de votre vision et trouvons ensemble la meilleure solution."
                : "Let's discuss your vision and find the best solution together."}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#1F6FEB] px-6 py-3 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#1a5fd4]"
            >
              {locale === "fr" ? "Nous contacter" : "Contact us"}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
