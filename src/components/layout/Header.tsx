"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_NAME, NAV_ITEMS } from "@/src/constants/site";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useLanguage } from "@/src/contexts/LanguageContext";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const toggleLocale = () => setLocale(locale === "fr" ? "en" : "fr");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-gray-200/60 bg-white/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#000814]/80"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo-alopro.jpeg"
              alt={SITE_NAME}
              width={36}
              height={36}
              className="rounded-lg object-cover"
            />
            <span className="text-[17px] font-bold tracking-tight text-gray-900 dark:text-white">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setActiveSection(item.href)}
                  className={`rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors duration-150 ${
                    active
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors duration-150 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label={theme === "dark" ? "Mode clair" : "Mode sombre"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              onClick={toggleLocale}
              className="flex h-9 items-center justify-center rounded-lg px-2 text-[12px] font-bold uppercase tracking-widest text-gray-400 transition-colors duration-150 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label="Changer de langue"
            >
              {locale === "fr" ? "EN" : "FR"}
            </button>

            <Link
              href="/contact"
              className="ml-2 rounded-lg bg-[#1F6FEB] px-5 py-2 text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-[#1a5fd4]"
            >
              {t("nav.cta")}
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 dark:text-gray-500"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400"
              aria-label={mobileMenuOpen ? "Fermer" : "Menu"}
            >
              <div className="flex h-3.5 w-[18px] flex-col justify-between">
                <span
                  className="block h-[1.5px] w-full origin-center bg-current transition-transform duration-200"
                  style={{ transform: mobileMenuOpen ? "translateY(5px) rotate(45deg)" : "none" }}
                />
                <span
                  className="block h-[1.5px] w-full bg-current transition-opacity duration-200"
                  style={{ opacity: mobileMenuOpen ? 0 : 1 }}
                />
                <span
                  className="block h-[1.5px] w-full origin-center bg-current transition-transform duration-200"
                  style={{ transform: mobileMenuOpen ? "translateY(-5px) rotate(-45deg)" : "none" }}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white dark:bg-[#000814] lg:hidden"
            style={{ paddingTop: "64px" }}
          >
            <div className="flex h-full flex-col px-5 pt-4">
              <div className="flex flex-col gap-0.5">
                {NAV_ITEMS.map((item, i) => {
                  const active = activeSection === item.href;
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => { setMobileMenuOpen(false); setActiveSection(item.href); }}
                        className={`block rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors duration-150 ${
                          active
                            ? "bg-gray-50 text-gray-900 dark:bg-white/[0.04] dark:text-white"
                            : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        }`}
                      >
                        {t(item.key)}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-3 px-4">
                <button
                  onClick={toggleLocale}
                  className="text-[12px] font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  {locale === "fr" ? "English" : "Français"}
                </button>
              </div>

              <div className="mt-5 px-4">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl bg-[#1F6FEB] px-5 py-3 text-center text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#1a5fd4]"
                >
                  {t("nav.cta")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
