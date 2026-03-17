"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, NAV_ITEMS } from "@/src/constants/site";
import { useLanguage } from "@/src/contexts/LanguageContext";

const departmentLinks = [
  { key: "footer.dev", href: "/departments/dev" },
  { key: "footer.research", href: "/departments/research" },
  { key: "footer.training", href: "/departments/training" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

function NewsletterForm({ locale }: { locale: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 201) {
        setStatus("success");
        setEmail("");
      } else if (res.status === 409) {
        setStatus("already");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={locale === "fr" ? "Votre email" : "Your email"}
          required
          className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#1F6FEB]/50 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-gray-600"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-[#1F6FEB] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1a5fd4] disabled:opacity-50"
        >
          {status === "loading" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-[12px] font-medium text-emerald-400">
          {locale === "fr" ? "Inscription réussie !" : "Successfully subscribed!"}
        </p>
      )}
      {status === "already" && (
        <p className="mt-2 text-[12px] font-medium text-amber-400">
          {locale === "fr" ? "Vous êtes déjà inscrit" : "Already subscribed"}
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-[12px] font-medium text-red-400">
          {locale === "fr" ? "Une erreur est survenue" : "An error occurred"}
        </p>
      )}
    </div>
  );
}

export function Footer() {
  const { t, locale } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-200 bg-gray-50 dark:border-white/[0.04] dark:bg-[#000000]">
      {/* Dot grid background */}
      <div className="pointer-events-none absolute inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="footer-dot-grid"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="1"
                cy="1"
                r="0.8"
                className="fill-gray-900/[0.03] dark:fill-white/[0.02]"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-dot-grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Top: 4 columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Company */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt={SITE_NAME}
                width={36}
                height={36}
                className="rounded-lg object-cover"
              />
              <span className="text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">
                {SITE_NAME}
              </span>
            </Link>
            <p className="mt-5 max-w-[280px] text-[15px] leading-[1.75] text-gray-500 dark:text-gray-400">
              {t("footer.desc")}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600 dark:border-white/[0.06] dark:text-gray-500 dark:hover:bg-white/[0.04] dark:hover:text-gray-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.15em] text-gray-900 dark:text-white">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.15em] text-gray-900 dark:text-white">
              {t("footer.services")}
            </h4>
            <ul className="space-y-3">
              {departmentLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.15em] text-gray-900 dark:text-white">
              Newsletter
            </h4>
            <p className="mb-4 text-[14px] leading-[1.7] text-gray-500 dark:text-gray-400">
              {t("footer.newsletterDesc")}
            </p>
            <NewsletterForm locale={locale} />
          </div>
        </div>

        {/* Separator */}
        <div className="mb-8 mt-14 h-px bg-gray-200 dark:bg-white/[0.06]" />

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[13px] text-gray-400 dark:text-gray-500">
            &copy; {currentYear} {SITE_NAME}. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <Link
              href="/legal"
              className="text-[13px] text-gray-400 transition-colors duration-200 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              {t("footer.legal")}
            </Link>
            <Link
              href="/privacy"
              className="text-[13px] text-gray-400 transition-colors duration-200 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
