"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { BLOG_CATEGORIES } from "@/src/constants/blog";
import type { Blog } from "@/src/types/blog";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const categoryColors: Record<string, string> = {
  dev: "#2563EB",
  research: "#1F6FEB",
  training: "#059669",
  news: "#F59E0B",
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      <div className="h-44 animate-pulse bg-white/[0.04]" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex gap-3">
          <div className="h-3 w-20 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-3 w-14 animate-pulse rounded bg-white/[0.06]" />
        </div>
        <div className="mb-1 h-5 w-4/5 animate-pulse rounded bg-white/[0.06]" />
        <div className="mb-3 h-5 w-3/5 animate-pulse rounded bg-white/[0.06]" />
        <div className="space-y-1.5">
          <div className="h-3 w-full animate-pulse rounded bg-white/[0.04]" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-white/[0.04]" />
        </div>
      </div>
    </div>
  );
}

export function LatestArticlesSection() {
  const { locale } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [articles, setArticles] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data: Blog[]) => {
        setArticles(data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Don't render the section if there are no articles after loading
  if (!loading && articles.length === 0) return null;

  return (
    <section ref={ref} className="bg-[#000000] py-16 sm:py-24">
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
                Blog
              </p>
            </motion.div>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
              }}
              className="mt-4 text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.15] tracking-tight text-white"
            >
              {locale === "fr" ? "Derniers " : "Latest "}
              <span className="text-[#1F6FEB]">articles</span>
            </motion.h2>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-5 py-2.5 text-[13px] font-semibold text-gray-300 transition-colors hover:border-white/[0.15] hover:text-white"
            >
              {locale === "fr" ? "Voir tous les articles" : "View all articles"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-12 h-px origin-left bg-white/[0.06]"
        />

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}

          {!loading &&
            articles.map((post, i) => {
              const title = locale === "fr" ? post.titleFr : post.titleEn;
              const excerpt = locale === "fr" ? post.excerptFr : post.excerptEn;
              const categoryLabel = BLOG_CATEGORIES[post.category]?.[locale as "fr" | "en"] ?? post.category;
              const color = categoryColors[post.category] ?? "#1F6FEB";

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                  >
                    {/* Image area */}
                    <div className="relative h-44 overflow-hidden bg-white/[0.03]">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{ background: `linear-gradient(135deg, ${color}30, transparent 60%)` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl"
                          style={{ backgroundColor: color + "18", color }}
                        >
                          {post.category === "dev" && (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                            </svg>
                          )}
                          {post.category === "research" && (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                          )}
                          {post.category === "training" && (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                          )}
                          {post.category === "news" && (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                              <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="absolute left-4 top-4">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white"
                          style={{ backgroundColor: color }}
                        >
                          {categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex items-center gap-3 text-[11px] text-gray-500">
                        <span>{formatDate(post.createdAt, locale)}</span>
                        <span className="h-0.5 w-0.5 rounded-full bg-gray-600" />
                        <span>{post.readTime} min</span>
                      </div>
                      <h3 className="mb-2 text-[16px] font-bold leading-[1.3] text-white transition-colors group-hover:text-[#1F6FEB]">
                        {title}
                      </h3>
                      <p className="flex-1 text-[13px] leading-[1.7] text-gray-400 line-clamp-2">
                        {excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold" style={{ color }}>
                        {locale === "fr" ? "Lire l'article" : "Read article"}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
