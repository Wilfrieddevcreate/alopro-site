import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Articles & Actualités",
  description:
    "Explorez nos articles sur le développement web, la recherche innovante, la formation et les actualités tech. Restez informé des dernières tendances digitales.",
  openGraph: {
    title: "Blog — Alopro",
    description:
      "Articles et actualités sur le développement web, la recherche et la formation digitale.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
