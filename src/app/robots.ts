import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/keystatic/', '/api/'],
        },
        sitemap: 'https://elektro-tel.ch/sitemap.xml',
    };
}
