import { getPageContent, getHeroSettings, getAboutSettings, getHomepageServicesSettings } from "@/lib/cms";
import { SectionRenderer } from "@/components/SectionRenderer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { OfferCatalogSchema } from "@/components/OfferCatalogSchema";
import { notFound } from "next/navigation";
import { ProjectCTA } from "@/components/ProjectCTA";

export default function Home() {
  const page = getPageContent("home");
  const heroSettings = getHeroSettings();
  const aboutSettings = getAboutSettings();
  const homepageServicesSettings = getHomepageServicesSettings();

  if (!page) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }]} />
      <OfferCatalogSchema />
      <SectionRenderer
        blocks={page.blocks}
        heroSettings={heroSettings}
        aboutSettings={aboutSettings}
        homepageServicesSettings={homepageServicesSettings}
      />
      <ProjectCTA variant="light" />
    </>
  );
}
