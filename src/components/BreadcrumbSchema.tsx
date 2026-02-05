type BreadcrumbItem = {
    name: string;
    url: string;
};

const BASE_URL = "https://elektro-tel.ch";

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const itemListElement = items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    }));

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
