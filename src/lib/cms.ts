import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";
import Markdoc, { nodes, Tag } from '@markdoc/markdoc';

const contentDirectory = path.join(process.cwd(), "content");

// Markdoc Configuration for transforming content
const markdocConfig = {
    nodes: {
        link: {
            ...nodes.link,
            transform(node: any, config: any) {
                const attributes = node.transformAttributes(config);
                const children = node.transformChildren(config);
                let href = attributes.href;

                // Fix www. links
                if (href?.startsWith('www.')) {
                    href = `https://${href}`;
                }

                const props: any = { ...attributes, href };

                // Force external links to open in new tab
                if (href?.startsWith('http')) {
                    props.target = '_blank';
                    props.rel = 'noopener noreferrer';
                }

                return new Tag('a', props, children);
            },
        },
        // Ensure standard table nodes are handled correctly
        table: nodes.table,
        tbody: nodes.tbody,
        thead: nodes.thead,
        tr: nodes.tr,
        td: nodes.td,
        th: nodes.th,
    },
    tags: {
        // Support Keystatic's {% table %} tag
        table: {
            render: 'table',
            attributes: {},
        },
    },
};

// Helper to parse content using Markdoc
function processMarkdoc(content: string): string {
    const ast = Markdoc.parse(content);
    const transformed = Markdoc.transform(ast, markdocConfig);
    return Markdoc.renderers.html(transformed);
}

/**
 * Interface representing standard Page content structure.
 */
export interface PageContent {
    slug: string;
    title: string;
    blocks: any[];
    [key: string]: any;
}

/**
 * Interface for Site Settings (Header, Footer, etc.)
 */
export interface SiteSettings {
    companyName: string;
    phone: string;
    email: string;
    whatsapp: string;
    footerText: string;
    socialLinks: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
    };
    locations: Array<{
        name: string;
        street: string;
        city: string;
        mapsUrl: string;
    }>;
}

/**
 * Retrieves site-wide settings from content/settings/site.yaml
 */
export function getSiteSettings(): SiteSettings | null {
    const filePath = path.join(contentDirectory, "settings", "site.yaml");
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(fileContents) as SiteSettings;
    return data;
}

/**
 * Generic function to read a settings YAML file
 */
function getSettingsFile<T>(filename: string): T | null {
    const filePath = path.join(contentDirectory, "settings", `${filename}.yaml`);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const fileContents = fs.readFileSync(filePath, "utf8");
    return yaml.load(fileContents) as T;
}

/**
 * Hero banner configuration
 */
export interface HeroBanner {
    label: string;
    title: string;
    description: string;
    linkText: string;
    linkUrl: string;
    icon: string;
    gradientFrom: string;
    gradientTo: string;
}

/**
 * Hero settings for homepage
 */
export interface HeroSettings {
    title: string;
    subtitle: string;
    image: string;
    banners?: HeroBanner[];
}
export const getHeroSettings = () => getSettingsFile<HeroSettings>("hero");

/**
 * About section settings for homepage
 */
export interface AboutSettings {
    title: string;
    body: string;
    image: string;
}
export const getAboutSettings = () => getSettingsFile<AboutSettings>("about");

/**
 * Services hero settings for Leistungen page
 */
export interface ServicesHeroSettings {
    title: string;
    description: string;
}
export const getServicesHeroSettings = () => getSettingsFile<ServicesHeroSettings>("services-hero");

/**
 * Team experience settings ("50 Jahre")
 */
export interface TeamExperienceSettings {
    title: string;
    body: string;
    image: string;
}
export const getTeamExperienceSettings = () => getSettingsFile<TeamExperienceSettings>("team-experience");

/**
 * Navigation settings for header and footer menus
 */
export interface NavMenuItem {
    name: string;
    href: string;
}
export interface NavMenuItemWithSubmenu extends NavMenuItem {
    hasSubmenu: boolean;
    submenu?: NavMenuItem[];
}
export interface NavigationSettings {
    headerMenu: NavMenuItemWithSubmenu[];
    footerMenu: NavMenuItem[];
}
export const getNavigationSettings = () => getSettingsFile<NavigationSettings>("navigation");

/**
 * Homepage services tiles (independent from services collection)
 */
export interface HomepageServiceItem {
    title: string;
    description: string;
    icon: string;
    linkUrl?: string;
}
export interface HomepageServicesSettings {
    title: string;
    items: HomepageServiceItem[];
}
export const getHomepageServicesSettings = () => getSettingsFile<HomepageServicesSettings>("homepage-services");

/**
 * Contact page settings
 */
export interface ContactSettings {
    pageTitle: string;
    pageSubtitle: string;
    locationsTitle: string;
    ctaTitle: string;
    ctaText: string;
    ctaPhone: string;
    formTitle: string;
}
export const getContactSettings = () => getSettingsFile<ContactSettings>("contact");

/**
 * Retrieves content for a specific single page (e.g. home.yaml or home.md).
 * Checks for YAML file first (Keystatic format), then falls back to MD.
 * 
 * @param slug - The filename (without extension) in content/pages
 * @returns The page data object or null if not found
 */
export function getPageContent(slug: string): PageContent | null {
    // Try YAML first (Keystatic managed)
    const yamlPath = path.join(contentDirectory, "pages", `${slug}.yaml`);
    if (fs.existsSync(yamlPath)) {
        const fileContents = fs.readFileSync(yamlPath, "utf8");
        const data = yaml.load(fileContents) as Record<string, any>;
        return { ...data, blocks: data.blocks || [], slug, body: '' } as unknown as PageContent;
    }

    // Fall back to MD (legacy format)
    const mdPath = path.join(contentDirectory, "pages", `${slug}.md`);
    if (fs.existsSync(mdPath)) {
        const fileContents = fs.readFileSync(mdPath, "utf8");
        const { data, content } = matter(fileContents);
        const contentHtml = processMarkdoc(content);
        return { ...data, blocks: data.blocks || [], slug, body: contentHtml } as unknown as PageContent;
    }

    return null;
}

/**
 * Retrieves all pages in the content/pages directory.
 * Useful for generating static paths.
 */
export function getAllPages() {
    const pagesDir = path.join(contentDirectory, "pages");
    if (!fs.existsSync(pagesDir)) return [];
    const files = fs.readdirSync(pagesDir);
    return files.map((file) => {
        const slug = file.replace(/\.md$/, "");
        return getPageContent(slug);
    });
}

/**
 * Helper function to retrieve all items from a specific collection directory.
 * 
 * @param collectionName - The folder name inside 'content/' (e.g., 'news', 'jobs')
 * @returns Array of parsed content items
 */
function getCollectionItems(collectionName: string) {
    const dir = path.join(contentDirectory, collectionName);
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir);

    return files
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
            const slug = file.replace(/\.md$/, "");
            const filePath = path.join(dir, file);

            // Safety check to ensure it's a file
            if (fs.statSync(filePath).isDirectory()) return null;

            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(fileContents);

            // Parse Markdown to HTML
            const bodyHtml = processMarkdoc(content);

            // Generate excerpt if missing (strip HTML for excerpt ideally, but raw content slice is okay for now)
            const fallbackExcerpt = content.slice(0, 160).replace(/[#*`]/g, '') + '...';

            return {
                ...data,
                slug,
                body: bodyHtml, // Return HTML
                excerpt: data.excerpt || fallbackExcerpt
            } as any;
        })
        .filter(item => item !== null);
}

// Helper to parsing various date formats (ISO and DD.MM.YYYY)
function parseDateString(dateInput: any): Date {
    if (!dateInput) return new Date();
    if (dateInput instanceof Date) return dateInput;

    const dateStr = String(dateInput);

    // Check for DD.MM.YYYY
    const dmy = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (dmy) {
        return new Date(parseInt(dmy[3]), parseInt(dmy[2]) - 1, parseInt(dmy[1]));
    }
    const d = new Date(dateStr);
    // If invalid, try to be lenient or return current date to avoid build crash
    return isNaN(d.getTime()) ? new Date() : d;
}

/**
 * Fetches all news items and sorts them by date (newest first).
 * Normalizes dates to ISO string.
 */
export function getAllNews() {
    const items = getCollectionItems("news");

    const normalizedItems = items.map((item: any) => {
        const d = parseDateString(item.date);
        return {
            ...item,
            date: d.toISOString()
        };
    });

    // Sort by date desc
    return normalizedItems.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Fetches a single news item by slug.
 */
export function getNewsItem(slug: string) {
    const items = getAllNews();
    return items.find((item: any) => item.slug === slug);
}

/**
 * Fetches all reference projects.
 * Sorts by manual order (if present) -> then by date (newest first).
 */
export function getAllReferences() {
    const items = getCollectionItems("references");
    return items.sort((a: any, b: any) => {
        // 1. Manual Order (Ascending)
        const aHasOrder = typeof a.order === 'number';
        const bHasOrder = typeof b.order === 'number';

        if (aHasOrder && bHasOrder) return a.order - b.order;
        if (aHasOrder) return -1;
        if (bHasOrder) return 1;

        // 2. Date (Descending)
        // Parse dates safely using our helper if needed, but assuming ISO from new creation
        // or normalizing logic if we applied it everywhere. 
        // We'll use basic new Date() here usually works if format is standard, 
        // but if we want robust, we can use parseDateString helper if strictly available in scope.
        // I will use parseDateString since I added it to this file 2 turns ago.
        const dateA = parseDateString(a.date).getTime();
        const dateB = parseDateString(b.date).getTime();
        return dateB - dateA;
    });
}

/**
 * Fetches a single reference project by slug.
 */
export function getReferenceItem(slug: string) {
    const items = getAllReferences();
    return items.find((item: any) => item.slug === slug);
}

/**
 * Fetches specific job data including parsing markdown body to HTML.
 */
export const getJobData = (slug: string): any => {
    const fullPath = path.join(process.cwd(), "content", "jobs", `${slug}.md`);

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Synchronous parsing with Markdoc
    const contentHtml = processMarkdoc(content);

    return {
        slug,
        ...data,
        html: contentHtml,
        content
    };
};

/**
 * Fetches all job listings.
 */
/**
 * Fetches all job listings, sorted by date (newest first).
 */
export function getAllJobs() {
    const items = getCollectionItems("jobs");
    return items.sort((a: any, b: any) => {
        // If sorting by date, ensure date exists. 
        // Newly created items via Keystatic will have date.
        // Existing items might not.
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

/**
 * Fetches a single job listing by slug.
 */
export function getJobItem(slug: string) {
    const items = getAllJobs();
    return items.find((item: any) => item.slug === slug);
}

/**
 * Fetches all partner entries.
 */
export function getAllPartners() {
    return getCollectionItems("partners");
}

/**
 * Fetches all team members, sorted by order (ascending).
 */
export function getAllTeam() {
    const items = getCollectionItems("team");
    return items.sort((a: any, b: any) => {
        // Undefined order goes to end
        if (a.order === undefined && b.order === undefined) return 0;
        if (a.order === undefined) return 1;
        if (b.order === undefined) return -1;
        return a.order - b.order;
    });
}

/**
 * Fetches all service pages from content/services directory.
 */
export function getAllServices() {
    return getCollectionItems("services");
}

/**
 * Fetches a single service by its slug (filename without extension).
 */
export function getServiceById(id: string) {
    const items = getAllServices();
    return items.find((item: any) => item.slug === id);
}

/**
 * Fetches all quality pages from content/quality directory.
 */
export function getAllQuality() {
    return getCollectionItems("quality");
}

/**
 * Fetches a single quality page by its slug.
 */
export function getQualityById(id: string) {
    const items = getAllQuality();
    return items.find((item: any) => item.slug === id);
}
