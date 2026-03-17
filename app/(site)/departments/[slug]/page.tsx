import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEPARTMENT_SLUGS, getDepartmentBySlug } from "@/src/constants/departments";
import { DeptHeroSection } from "@/src/components/departments/DeptHeroSection";
import { DeptOverviewSection } from "@/src/components/departments/DeptOverviewSection";
import { DeptServicesSection } from "@/src/components/departments/DeptServicesSection";
import { DeptProjectsSection } from "@/src/components/departments/DeptProjectsSection";
import { DeptTeamSection } from "@/src/components/departments/DeptTeamSection";
import { DeptCTASection } from "@/src/components/departments/DeptCTASection";

const deptMeta: Record<string, { title: string; description: string }> = {
  dev: {
    title: "Développement Web & Mobile",
    description:
      "Services de développement web et mobile sur mesure. Sites vitrines, e-commerce, applications SaaS et solutions performantes avec les dernières technologies.",
  },
  research: {
    title: "Recherche & Innovation",
    description:
      "Pôle recherche et innovation d'Alopro. Intelligence artificielle, blockchain, IoT et solutions technologiques avancées pour transformer votre business.",
  },
  training: {
    title: "Formation Digitale",
    description:
      "Formations professionnelles en développement web, cybersécurité, cloud et IA. Programmes certifiants sur mesure pour vos équipes.",
  },
};

export function generateStaticParams() {
  return DEPARTMENT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = deptMeta[slug];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} — Alopro`,
      description: meta.description,
    },
  };
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dept = getDepartmentBySlug(slug);
  if (!dept) notFound();

  return (
    <>
      <DeptHeroSection dept={dept} />
      <DeptOverviewSection dept={dept} />
      <DeptServicesSection dept={dept} />
      <DeptProjectsSection dept={dept} />
      <DeptTeamSection dept={dept} />
      <DeptCTASection dept={dept} />
    </>
  );
}
