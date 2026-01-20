import { HeroBlock } from "./blocks/HeroBlock";
import { AboutBlock } from "./blocks/AboutBlock";
import { ServicesBlock } from "./blocks/ServicesBlock";
import { NewsPreviewBlock } from "./blocks/NewsPreviewBlock";
import { PartnerMarqueeBlock } from "./blocks/PartnerMarqueeBlock";
import { ContactLocationsBlock } from "./blocks/ContactLocationsBlock";
import { TeamGridBlock } from "./blocks/TeamGridBlock";
import { JobsPreviewBlock } from "./blocks/JobsPreviewBlock";
import { ReferencesSliderBlock } from "./blocks/ReferencesSliderBlock";
import { TrustIndicatorsBlock } from "./blocks/TrustIndicatorsBlock";
import { AnimatedSection } from "./ui/AnimatedSection";
import type { HeroSettings, AboutSettings, TeamExperienceSettings, HomepageServicesSettings } from "@/lib/cms";

interface SectionRendererProps {
    blocks: any[];
    heroSettings?: HeroSettings | null;
    aboutSettings?: AboutSettings | null;
    homepageServicesSettings?: HomepageServicesSettings | null;
}

/**
 * The SectionRenderer is the core component for building dynamic pages.
 * It takes an array of "blocks" (defined in the content CMS) and maps them
 * to the corresponding React component.
 * 
 * New blocks must be registered here in the switch statement to be visible.
 * Server components are wrapped with AnimatedSection for scroll animations.
 * 
 * heroSettings, aboutSettings, and homepageServicesSettings allow CMS-managed content to override block defaults.
 */
export function SectionRenderer({ blocks, heroSettings, aboutSettings, homepageServicesSettings }: SectionRendererProps) {
    if (!blocks) return null;

    return (
        <div className="flex flex-col">
            {blocks.map((block, index) => {
                // Map the 'type' field from the CMS to a React Component
                switch (block.type) {
                    case "hero":
                        // Merge CMS heroSettings with block defaults
                        const heroData = heroSettings
                            ? { ...block, ...heroSettings }
                            : block;
                        return (
                            <div key={index}>
                                <HeroBlock {...heroData} />
                                <AnimatedSection delay={0.3}>
                                    <TrustIndicatorsBlock />
                                </AnimatedSection>
                            </div>
                        );
                    case "about":
                        // Merge CMS aboutSettings with block defaults
                        const aboutData = aboutSettings
                            ? { ...block, ...aboutSettings }
                            : block;
                        return <AboutBlock key={index} {...aboutData} />;
                    case "services":
                        // Use homepage services settings if available
                        const servicesData = homepageServicesSettings
                            ? { title: homepageServicesSettings.title, items: homepageServicesSettings.items }
                            : block;
                        return <ServicesBlock key={index} {...servicesData} />;
                    case "newsPreview":
                        return (
                            <AnimatedSection key={index} delay={0.1}>
                                <NewsPreviewBlock {...block} />
                            </AnimatedSection>
                        );
                    case "partnerGrid":
                        return (
                            <AnimatedSection key={index}>
                                <PartnerMarqueeBlock {...block} />
                            </AnimatedSection>
                        );
                    case "teamGrid":
                        return (
                            <AnimatedSection key={index} delay={0.1}>
                                <TeamGridBlock {...block} />
                            </AnimatedSection>
                        );
                    case "jobsPreview":
                        return (
                            <AnimatedSection key={index}>
                                <JobsPreviewBlock {...block} />
                            </AnimatedSection>
                        );
                    case "referencesSlider":
                        return (
                            <AnimatedSection key={index}>
                                <ReferencesSliderBlock {...block} />
                            </AnimatedSection>
                        );
                    case "contactLocations":
                        return (
                            <AnimatedSection key={index}>
                                <ContactLocationsBlock {...block} />
                            </AnimatedSection>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}
