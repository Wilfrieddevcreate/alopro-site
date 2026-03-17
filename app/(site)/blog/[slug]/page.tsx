"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/src/contexts/LanguageContext";
import type { Blog } from "@/src/types/blog";
import { BLOG_CATEGORIES } from "@/src/constants/blog";

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

function SkeletonPage() {
  return (
    <div className="min-h-screen bg-[#000000] pt-16">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="mb-6 h-4 w-24 animate-pulse rounded bg-white/[0.06]" />
        <div className="mb-4 h-10 w-4/5 animate-pulse rounded bg-white/[0.06]" />
        <div className="mb-2 h-10 w-3/5 animate-pulse rounded bg-white/[0.06]" />
        <div className="mb-8 flex gap-4">
          <div className="h-4 w-32 animate-pulse rounded bg-white/[0.04]" />
          <div className="h-4 w-20 animate-pulse rounded bg-white/[0.04]" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-4 animate-pulse rounded bg-white/[0.04]" style={{ width: `${70 + Math.random() * 30}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/blogs/${slug}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((data) => {
        if (data) setBlog(data);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) return <SkeletonPage />;

  if (notFound || !blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#000000] pt-16">
        <div className="text-center">
          <h1 className="text-[48px] font-bold text-white">404</h1>
          <p className="mt-2 text-[16px] text-gray-400">
            {locale === "fr" ? "Article introuvable" : "Article not found"}
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1F6FEB] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1a5fd4]"
          >
            {locale === "fr" ? "Retour au blog" : "Back to blog"}
          </Link>
        </div>
      </div>
    );
  }

  const title = locale === "fr" ? blog.titleFr : blog.titleEn;
  const content = locale === "fr" ? blog.contentFr : blog.contentEn;
  const excerpt = locale === "fr" ? blog.excerptFr : blog.excerptEn;
  const keywords = locale === "fr" ? blog.keywordsFr : blog.keywordsEn;
  const categoryLabel = BLOG_CATEGORIES[blog.category]?.[locale as "fr" | "en"] ?? blog.category;
  const color = categoryColors[blog.category] ?? "#1F6FEB";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    author: { "@type": "Organization", name: blog.author },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    keywords: keywords?.join(", "),
    articleSection: categoryLabel,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
  };

  return (
    <div className="min-h-screen bg-[#000000] pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-24">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-500 transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {locale === "fr" ? "Retour au blog" : "Back to blog"}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Category badge */}
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white"
            style={{ backgroundColor: color }}
          >
            {categoryLabel}
          </span>

          {/* Title */}
          <h1 className="mt-5 text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-tight text-white">
            {title}
          </h1>

          {/* Excerpt */}
          <p className="mt-4 text-[17px] leading-[1.7] text-gray-400">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-white/[0.06] pb-8">
            <span className="text-[13px] font-medium text-gray-500">{blog.author}</span>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <span className="text-[13px] text-gray-500">{formatDate(blog.createdAt, locale)}</span>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <span className="text-[13px] text-gray-500">
              {blog.readTime} min {locale === "fr" ? "de lecture" : "read"}
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="prose-blog mt-10"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Keywords */}
        {keywords && keywords.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-2 border-t border-white/[0.06] pt-8"
          >
            {keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-white/[0.06] px-3 py-1 text-[12px] text-gray-500"
              >
                {kw}
              </span>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-10 text-center"
        >
          <h3 className="text-[20px] font-bold text-white">
            {locale === "fr" ? "Un projet en tête ?" : "Have a project in mind?"}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-[14px] leading-[1.7] text-gray-400">
            {locale === "fr"
              ? "Discutons de votre vision et trouvons ensemble la meilleure solution."
              : "Let's discuss your vision and find the best solution together."}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1F6FEB] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1a5fd4]"
          >
            {locale === "fr" ? "Nous contacter" : "Contact us"}
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
