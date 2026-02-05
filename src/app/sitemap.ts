import { MetadataRoute } from 'next';
import { getAllPages, getAllNews, getAllReferences, getAllJobs, getAllServices, getAllQuality } from '@/lib/cms';

const BASE_URL = 'https://elektro-tel.ch';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/kontakt',
        '/team',
        '/leistungen',
        '/partner',
        '/news',
        '/referenzen',
        '/jobs',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Pages (e.g. AGB, Datenschutz)
    const pages = getAllPages()
        .filter((page: any) => page && page.slug !== 'home')
        .map((page: any) => ({
        url: `${BASE_URL}/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }));

    // News Articles
    const news = getAllNews().map((item: any) => ({
        url: `${BASE_URL}/news/${item.slug}`,
        lastModified: new Date(item.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // References
    const references = getAllReferences().map((item: any) => ({
        url: `${BASE_URL}/referenzen/${item.slug}`,
        lastModified: new Date(item.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Jobs
    const jobs = getAllJobs().map((item: any) => ({
        url: `${BASE_URL}/jobs/${item.slug}`,
        lastModified: new Date(item.date),
        changeFrequency: 'weekly' as const,
        priority: 0.9, // High priority for jobs
    }));

    const services = getAllServices().map((item: any) => ({
        url: `${BASE_URL}/leistungen/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const quality = getAllQuality().map((item: any) => ({
        url: `${BASE_URL}/qualitaet/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...pages, ...news, ...references, ...jobs, ...services, ...quality];
}
