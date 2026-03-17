"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function LegalPage() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("legal.editor.title"),
      content: t("legal.editor.content"),
    },
    {
      title: t("legal.hosting.title"),
      content: t("legal.hosting.content"),
    },
    {
      title: t("legal.ip.title"),
      content: t("legal.ip.content"),
    },
    {
      title: t("legal.liability.title"),
      content: t("legal.liability.content"),
    },
    {
      title: t("legal.data.title"),
      content: t("legal.data.content"),
    },
    {
      title: t("legal.cookies.title"),
      content: t("legal.cookies.content"),
    },
    {
      title: t("legal.law.title"),
      content: t("legal.law.content"),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#000814]">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            {t("legal.back")}
          </Link>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t("legal.title")}
          </h1>
          <p className="mb-12 text-sm text-gray-400 dark:text-gray-500">
            {t("legal.lastUpdated")}
          </p>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * (index + 1), ease: "easeOut" as const }}
              >
                <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                  {section.content}
                </p>
              </motion.section>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
