"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";

function AnimatedNumber({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(duration / value);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <>{count}{suffix}</>;
}

const stats = [
  { value: 50, suffix: "+", key: "stats.projects", color: "#1F6FEB" },
  { value: 98, suffix: "%", key: "stats.satisfaction", color: "#1F6FEB" },
  { value: 5, suffix: "+", key: "stats.years", color: "#059669" },
  { value: 30, suffix: "+", key: "stats.technologies", color: "#EA580C" },
];

export function StatsSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-gray-50 py-16 dark:bg-[#000000] sm:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.1,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="relative px-6 text-center lg:px-8"
            >
              {i > 0 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  className="absolute left-0 top-1/2 hidden h-12 w-px origin-center -translate-y-1/2 bg-gray-200 dark:bg-white/[0.06] lg:block"
                />
              )}
              <p className="text-[48px] font-bold leading-none tracking-tight text-gray-900 dark:text-white">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
              </p>
              <motion.span
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
                className="mx-auto mt-3 mb-2 block h-1 w-1 rounded-full"
                style={{ backgroundColor: stat.color }}
              />
              <p className="text-[13px] text-gray-500 dark:text-gray-400">
                {t(stat.key)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
