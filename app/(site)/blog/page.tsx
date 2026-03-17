"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";
import Link from "next/link";
import type { Blog } from "@/src/types/blog";
import { BLOG_CATEGORIES } from "@/src/constants/blog";

const POSTS_PER_PAGE = 6;
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

/* ---- Skeleton Card ---- */

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      <div className="h-48 animate-pulse bg-white/[0.04] sm:h-52" />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex gap-3">
          <div className="h-3 w-24 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-3 w-16 animate-pulse rounded bg-white/[0.06]" />
        </div>
        <div className="mb-2 h-5 w-4/5 animate-pulse rounded bg-white/[0.06]" />
        <div className="mb-1 h-5 w-3/5 animate-pulse rounded bg-white/[0.06]" />
        <div className="mb-5 mt-3 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-white/[0.04]" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-white/[0.04]" />
        </div>
        <div className="mt-auto flex justify-between border-t border-white/[0.06] pt-4">
          <div className="h-3 w-24 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-3 w-12 animate-pulse rounded bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

/* ---- Blog Card ---- */

function BlogCard({ post, locale, index }: { post: Blog; locale: string; index: number }) {
  const title = locale === "fr" ? post.titleFr : post.titleEn;
  const excerpt = locale === "fr" ? post.excerptFr : post.excerptEn;
  const categoryLabel = BLOG_CATEGORIES[post.category]?.[locale as "fr" | "en"] ?? post.category;
  const color = categoryColors[post.category] ?? "#1F6FEB";

  return (
    <Link href={`/blog/${post.slug}`}>
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-white/[0.03] sm:h-52">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `linear-gradient(135deg, ${color}30, transparent 60%)` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ backgroundColor: color + "18", color }}
          >
            {post.category === "dev" && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
            )}
            {post.category === "research" && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            )}
            {post.category === "training" && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            )}
            {post.category === "news" && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
              </svg>
            )}
          </div>
        </div>
        <div className="absolute left-4 top-4">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white"
            style={{ backgroundColor: color }}
          >
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3 text-[12px] text-gray-500">
          <span>{formatDate(post.createdAt, locale)}</span>
          <span className="h-1 w-1 rounded-full bg-gray-600" />
          <span>{post.readTime} min {locale === "fr" ? "de lecture" : "read"}</span>
        </div>
        <h3 className="mb-3 text-[18px] font-bold leading-[1.3] text-white transition-colors duration-200 group-hover:text-[#1F6FEB]">
          {title}
        </h3>
        <p className="mb-5 flex-1 text-[14px] leading-[1.7] text-gray-400">{excerpt}</p>
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
          <span className="text-[13px] font-medium text-gray-500">{post.author}</span>
          <span
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200"
            style={{ color }}
          >
            {locale === "fr" ? "Lire" : "Read"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </motion.article>
    </Link>
  );
}

/* ---- Pagination ---- */

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] text-gray-400 transition-all duration-200 hover:border-white/[0.12] hover:text-white disabled:opacity-30"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg text-[14px] font-semibold transition-all duration-200 ${
            page === currentPage
              ? "bg-[#1F6FEB] text-white"
              : "border border-white/[0.06] text-gray-400 hover:border-white/[0.12] hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] text-gray-400 transition-all duration-200 hover:border-white/[0.12] hover:text-white disabled:opacity-30"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

/* ---- Page ---- */

export default function BlogPage() {
  const { locale } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return blogs;
    return blogs.filter((p) => p.category === activeCategory);
  }, [activeCategory, blogs]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#000000] pt-16">
      <div ref={ref} className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="hidden h-px w-8 origin-left bg-[#1F6FEB] sm:block" />
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1F6FEB]">Blog</p>
          </div>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.12] tracking-tight text-white">
            {locale === "fr" ? "Nos " : "Our "}
            <span className="text-[#1F6FEB]">articles</span>
          </h1>
          <p className="mt-4 max-w-lg text-[17px] leading-[1.7] text-gray-400">
            {locale === "fr"
              ? "Explorez nos dernières publications sur le développement, la recherche et la formation."
              : "Explore our latest publications on development, research and training."}
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {Object.entries(BLOG_CATEGORIES).map(([key, labels]) => {
            const active = activeCategory === key;
            const color = key === "all" ? "#1F6FEB" : categoryColors[key];
            return (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                  active
                    ? "text-white"
                    : "border border-white/[0.08] text-gray-400 hover:border-white/[0.15] hover:text-white"
                }`}
                style={active ? { backgroundColor: color } : undefined}
              >
                {labels[locale as "fr" | "en"]}
              </button>
            );
          })}
        </motion.div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Posts grid */}
        {!loading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {paginatedPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} locale={locale} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty state */}
        {!loading && filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[16px] text-gray-500">
              {locale === "fr"
                ? "Aucun article pour le moment."
                : "No articles yet."}
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
      </div>
    </div>
  );
}
