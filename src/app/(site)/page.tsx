import { getPageContent, getHeroSettings, getAboutSettings, getHomepageServicesSettings } from "@/lib/cms";
import { SectionRenderer } from "@/components/SectionRenderer";
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
