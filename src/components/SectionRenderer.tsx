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

interface SectionRendererProps {
    blocks: any[];
}

/**
 * The SectionRenderer is the core component for building dynamic pages.
 * It takes an array of "blocks" (defined in the content CMS) and maps them
 * to the corresponding React component.
 * 
 * New blocks must be registered here in the switch statement to be visible.
 */
export function SectionRenderer({ blocks }: SectionRendererProps) {
    if (!blocks) return null;

    return (
        <div className="flex flex-col">
            {blocks.map((block, index) => {
                // Map the 'type' field from the CMS to a React Component
                switch (block.type) {
                    case "hero":
                        return (
                            <div key={index}>
                                <HeroBlock {...block} />
                                {/* TrustIndicators are currently hardcoded attached to Hero, 
                                    could be moved to main page if needed */}
                                <TrustIndicatorsBlock />
                            </div>
                        );
                    case "about":
                        return <AboutBlock key={index} {...block} />;
                    case "services":
                        return <ServicesBlock key={index} {...block} />;
                    case "newsPreview":
                        return <NewsPreviewBlock key={index} {...block} />;
                    case "partnerGrid":
                        // User wants Marquee on Home (which uses partnerGrid block type in config for now?)
                        // Or we can just render the Marquee block here regardless of name if its the partner block.
                        // Ideally we rename, but "partnerGrid" content type exists.
                        return <PartnerMarqueeBlock key={index} {...block} />;
                    case "teamGrid":
                        return <TeamGridBlock key={index} {...block} />;
                    case "jobsPreview":
                        return <JobsPreviewBlock key={index} {...block} />;
                    case "referencesSlider":
                        return <ReferencesSliderBlock key={index} {...block} />;
                    case "contactLocations":
                        return <ContactLocationsBlock key={index} {...block} />;
                    default:
                        // If a block type is not known, we render nothing.
                        // Can be replaced with a debug message if needed.
                        return null;
                }
            })}
        </div>
    );
}
