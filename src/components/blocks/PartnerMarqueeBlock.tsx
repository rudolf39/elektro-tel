import { getAllPartners } from "@/lib/cms";
import { PartnerMarqueeClient } from "./PartnerMarqueeClient";

/**
 * Server Component wrapper for the Partner Marquee.
 * Fetches partner data from the filesystem (markdow files) and passes it to the client component.
 */
export function PartnerMarqueeBlock({ title }: { title: string }) {
    const partners = getAllPartners();
    return <PartnerMarqueeClient partners={partners} title={title} />;
}
