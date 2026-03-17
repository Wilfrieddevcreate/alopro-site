import { notFound } from "next/navigation";
import { DEPARTMENT_SLUGS, getDepartmentBySlug } from "@/src/constants/departments";
import { DeptHeroSection } from "@/src/components/departments/DeptHeroSection";
import { DeptOverviewSection } from "@/src/components/departments/DeptOverviewSection";
import { DeptServicesSection } from "@/src/components/departments/DeptServicesSection";
import { DeptProjectsSection } from "@/src/components/departments/DeptProjectsSection";
import { DeptTeamSection } from "@/src/components/departments/DeptTeamSection";
import { DeptCTASection } from "@/src/components/departments/DeptCTASection";

export function generateStaticParams() {
  return DEPARTMENT_SLUGS.map((slug) => ({ slug }));
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
