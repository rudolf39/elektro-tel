const BASE_URL = "https://elektro-tel.ch";

type ServiceSchemaProps = {
    service: {
        title: string;
        slug: string;
        description?: string;
    };
    areaServed?: string[];
};

export function ServiceSchema({ service, areaServed = ["Winterthur", "Tägerwilen", "Schaffhausen"] }: ServiceSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.description,
        keywords: [service.title, ...areaServed].join(", "),
        provider: {
            "@type": "LocalBusiness",
            name: "Elektro-Tel AG",
            url: BASE_URL,
        },
        areaServed: areaServed.map((area) => ({
            "@type": "Place",
            name: area,
        })),
        url: `${BASE_URL}/leistungen/${service.slug}`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
