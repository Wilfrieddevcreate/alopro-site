import { HeroSection } from "@/src/components/sections/HeroSection";
import { ServicesSection } from "@/src/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/src/components/sections/WhyChooseUsSection";
import { PortfolioSection } from "@/src/components/sections/PortfolioSection";
import { ProcessSection } from "@/src/components/sections/ProcessSection";
import { LatestArticlesSection } from "@/src/components/sections/LatestArticlesSection";
import { StatsSection } from "@/src/components/sections/StatsSection";
import { CTASection } from "@/src/components/sections/CTASection";
import { ContactSection } from "@/src/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PortfolioSection />
      <ProcessSection />
      <LatestArticlesSection />
      <StatsSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
