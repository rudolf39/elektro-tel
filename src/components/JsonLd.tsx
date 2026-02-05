import { getSiteSettings } from "@/lib/cms";

const BASE_URL = "https://elektro-tel.ch";

export function JsonLd() {
    const settings = getSiteSettings();
    const locations = settings?.locations || [];
    const mainLocation = locations[0];

    const schema = {
        "@context": "https://schema.org",
        "@type": "Electrician",
        "name": settings?.companyName || "Elektro-Tel AG",
        "url": BASE_URL,
        "logo": `${BASE_URL}/images/logo-elektro-tel-ag.svg`,
        "image": `${BASE_URL}/images/elektro-tel-ag-hero-image.webp`,
        "telephone": settings?.phone || "0800 800 813",
        "email": settings?.email || "info@elektro-tel.ch",
        "address": mainLocation
            ? {
                "@type": "PostalAddress",
                "streetAddress": mainLocation.street,
                "addressLocality": mainLocation.city,
                "addressCountry": "CH"
            }
            : undefined,
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "07:30",
            "closes": "17:00"
        },
        "sameAs": [
            settings?.socialLinks?.facebook,
            settings?.socialLinks?.instagram,
            settings?.socialLinks?.linkedin
        ].filter(Boolean),
        "subOrganization": locations.slice(1).map((loc) => ({
            "@type": "Electrician",
            "name": `${settings?.companyName || "Elektro-Tel AG"} (${loc.name})`,
            "parentOrganization": {
                "@type": "Organization",
                "name": settings?.companyName || "Elektro-Tel AG"
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": loc.street,
                "addressLocality": loc.city,
                "addressCountry": "CH"
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
