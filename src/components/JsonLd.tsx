export function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Electrician",
        "name": "Elektro-Tel AG",
        "url": "https://elektro-tel.ch",
        "logo": "https://elektro-tel.ch/images/logo-elektro-tel-ag.svg",
        "image": "https://elektro-tel.ch/images/elektro-tel-ag-hero-image.webp",
        "telephone": "0800 800 813",
        "email": "info@elektro-tel.ch",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rudolf-Diesel-Strasse 25",
            "addressLocality": "Winterthur",
            "postalCode": "8404",
            "addressCountry": "CH"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 47.4912,
            "longitude": 8.7397
        },
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
            "https://www.facebook.com/people/Elektro-Tel-AG/100063451046079/",
            "https://www.instagram.com/elektrotelag/",
            "https://ch.linkedin.com/company/elektro-tel-ag"
        ],
        // Branches
        "subOrganization": [
            {
                "@type": "Electrician",
                "name": "Elektro-Tel AG (Tägerwilen)",
                "parentOrganization": {
                    "@type": "Organization",
                    "name": "Elektro-Tel AG"
                },
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Bahnhofstrasse 17",
                    "addressLocality": "Tägerwilen",
                    "postalCode": "8274",
                    "addressCountry": "CH"
                }
            },
            {
                "@type": "Electrician",
                "name": "Elektro-Tel AG (Schaffhausen)",
                "parentOrganization": {
                    "@type": "Organization",
                    "name": "Elektro-Tel AG"
                },
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Solenbergstrasse 35",
                    "addressLocality": "Schaffhausen",
                    "postalCode": "8207",
                    "addressCountry": "CH"
                }
            }
        ],
        // Services
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dienstleistungen",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Elektroplanung" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stark- & Schwachstrom" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Service & Unterhalt" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gebäudeautomation" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Telefonie und Internet" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sicherheit (Alarmanlagen)" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Beleuchtung" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Photovoltaik" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-Mobilität" } }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
