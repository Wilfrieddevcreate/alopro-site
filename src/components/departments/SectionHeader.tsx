"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface SectionHeaderProps {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle?: string;
  accentColor: string;
  isInView: boolean;
  align?: "left" | "center";
}

export function SectionHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  accentColor,
  isInView,
  align = "left",
}: SectionHeaderProps) {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease },
    },
  };

  if (align === "center") {
    return (
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={container}
        className="flex flex-col items-center text-center"
      >
        {/* Overline: line -- badge -- line */}
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
            className="h-px w-8 origin-right"
            style={{ backgroundColor: accentColor }}
          />
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: accentColor }}
          >
            {badge}
          </p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="h-px w-8 origin-left"
            style={{ backgroundColor: accentColor }}
          />
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={slideUp}
          className="mt-4 text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white"
        >
          {title}{" "}
          <span style={{ color: accentColor }}>{titleHighlight}</span>
        </motion.h2>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            variants={fadeIn}
            className="mt-4 max-w-lg text-[16px] leading-[1.7] text-gray-500 dark:text-gray-400"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    );
  }

  // align === "left"
  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={container}
      className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
    >
      <div className="max-w-xl">
        {/* Overline: line + badge */}
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
            className="h-px w-8 origin-left"
            style={{ backgroundColor: accentColor }}
          />
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: accentColor }}
          >
            {badge}
          </p>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={slideUp}
          className="mt-4 text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white"
        >
          {title}{" "}
          <span style={{ color: accentColor }}>{titleHighlight}</span>
        </motion.h2>
      </div>

      {/* Subtitle on right */}
      {subtitle && (
        <motion.p
          variants={fadeIn}
          className="max-w-sm text-[16px] leading-[1.7] text-gray-500 dark:text-gray-400 lg:text-right"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
