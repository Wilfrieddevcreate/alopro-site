import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets — Nos Réalisations",
  description:
    "Découvrez nos projets web, mobile, design et IA. Des réalisations sur mesure qui illustrent notre savoir-faire et notre créativité.",
  openGraph: {
    title: "Nos Projets — Alopro",
    description:
      "Portfolio de nos réalisations : sites web, applications mobiles, design UI/UX et solutions IA.",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
