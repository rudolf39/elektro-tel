import { getAllServices } from "@/lib/cms";

const BASE_URL = "https://elektro-tel.ch";

export function OfferCatalogSchema() {
    const services = getAllServices();

    const schema = {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: "Dienstleistungen",
        itemListElement: services.map((service: any) => ({
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: service.title,
                url: `${BASE_URL}/leistungen/${service.slug}`,
            }
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
