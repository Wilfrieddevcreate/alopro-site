"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function ContactSection() {
  const { t, locale } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          department: formData.get("department"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Erreur serveur");
      setSubmitted(true);
    } catch {
      setError(
        locale === "fr"
          ? "Une erreur est survenue. Veuillez réessayer."
          : "An error occurred. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  const departments = [
    { value: "dev", label: locale === "fr" ? "Développement" : "Development" },
    {
      value: "research",
      label: locale === "fr" ? "Recherches Innovantes" : "Innovative Research",
    },
    { value: "training", label: locale === "fr" ? "Formations" : "Training" },
    { value: "other", label: locale === "fr" ? "Autre" : "Other" },
  ];

  const inputBase =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-900 outline-none transition-colors duration-150 placeholder:text-gray-400 focus:border-[#1F6FEB] focus:ring-1 focus:ring-[#1F6FEB]/20 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#1F6FEB]/60";

  return (
    <section
      id="contact"
      className="bg-gray-50 py-16 dark:bg-[#000000] sm:py-24"
    >
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* ---- Left: Info ---- */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease }}
          >
            <div className="mb-4 flex items-center gap-3">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="hidden h-px w-8 origin-left bg-[#1F6FEB] sm:block"
              />
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1F6FEB]">
                {t("contact.badge")}
              </p>
            </div>

            <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white">
              {t("contact.title")}{" "}
              <span className="text-[#1F6FEB]">
                {t("contact.titleHighlight")}
              </span>
            </h2>

            <p className="mt-4 max-w-md text-[16px] leading-[1.7] text-gray-500 dark:text-gray-400">
              {t("contact.subtitle")}
            </p>

            {/* Contact info cards */}
            <div className="mt-10 space-y-4">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4, ease }}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 dark:border-white/[0.06] dark:bg-white/[0.02]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1F6FEB]/[0.08] text-[#1F6FEB]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-gray-400 dark:text-gray-500">
                    Email
                  </p>
                  <p className="text-[14px] font-semibold text-gray-900 dark:text-white">
                    contact@alopro.com
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5, ease }}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 dark:border-white/[0.06] dark:bg-white/[0.02]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1F6FEB]/[0.08] text-[#1F6FEB]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-gray-400 dark:text-gray-500">
                    {locale === "fr" ? "Téléphone" : "Phone"}
                  </p>
                  <p className="text-[14px] font-semibold text-gray-900 dark:text-white">
                    +33 1 23 45 67 89
                  </p>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6, ease }}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 dark:border-white/[0.06] dark:bg-white/[0.02]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1F6FEB]/[0.08] text-[#1F6FEB]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-gray-400 dark:text-gray-500">
                    {locale === "fr" ? "Adresse" : "Address"}
                  </p>
                  <p className="text-[14px] font-semibold text-gray-900 dark:text-white">
                    Paris, France
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ---- Right: Form ---- */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02] sm:p-8">
              {submitted ? (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 12 2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h3 className="text-[22px] font-bold text-gray-900 dark:text-white">
                    {t("contact.success.title")}
                  </h3>
                  <p className="mt-2 max-w-sm text-[15px] leading-[1.7] text-gray-500 dark:text-gray-400">
                    {t("contact.success.desc")}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-[13px] font-semibold text-[#1F6FEB] transition-opacity hover:opacity-80"
                  >
                    {t("contact.success.another")}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[13px] font-medium text-gray-700 dark:text-gray-300">
                        {t("contact.form.name")}{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder={t("contact.form.namePlaceholder")}
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[13px] font-medium text-gray-700 dark:text-gray-300">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder={t("contact.form.emailPlaceholder")}
                        className={inputBase}
                      />
                    </div>
                  </div>

                  {/* Phone + Department row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[13px] font-medium text-gray-700 dark:text-gray-300">
                        {t("contact.form.phone")}
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder={t("contact.form.phonePlaceholder")}
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[13px] font-medium text-gray-700 dark:text-gray-300">
                        {t("contact.form.department")}{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="department"
                        required
                        className={inputBase + " appearance-none"}
                      >
                        <option value="" className="dark:bg-[#0a1628]">
                          {t("contact.form.departmentPlaceholder")}
                        </option>
                        {departments.map((dept) => (
                          <option
                            key={dept.value}
                            value={dept.value}
                            className="dark:bg-[#0a1628]"
                          >
                            {dept.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-gray-700 dark:text-gray-300">
                      {t("contact.form.subject")}{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="subject"
                      type="text"
                      required
                      placeholder={t("contact.form.subjectPlaceholder")}
                      className={inputBase}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-gray-700 dark:text-gray-300">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder={t("contact.form.messagePlaceholder")}
                      className={inputBase + " resize-none"}
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-[14px] font-medium text-red-400">{error}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F6FEB] px-6 py-3 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#1a5fd4] disabled:opacity-60 sm:w-auto"
                  >
                    {sending
                      ? (locale === "fr" ? "Envoi en cours..." : "Sending...")
                      : t("contact.form.submit")}
                    {!sending && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
