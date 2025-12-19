import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from 'marked';

const contentDirectory = path.join(process.cwd(), "content");

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
 * Retrieves content for a specific single page (e.g. home.md).
 * Reads the markdown file, parses frontmatter, and converts body to HTML.
 * 
 * @param slug - The filename (without extension) in content/pages
 * @returns The page data object or null if not found
 */
export function getPageContent(slug: string): PageContent | null {
    const filePath = path.join(contentDirectory, "pages", `${slug}.md`);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    // Parse markdown to HTML
    const contentHtml = marked.parse(content) as string;
    return { ...data, blocks: data.blocks || [], slug, body: contentHtml } as unknown as PageContent;
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
    return files.map((file) => {
        const slug = file.replace(/\.md$/, "");
        const filePath = path.join(dir, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);
        return { ...data, slug, body: content } as any;
    });
}

/**
 * Fetches all news items and sorts them by date (newest first).
 */
export function getAllNews() {
    const items = getCollectionItems("news");
    // Sort by date desc
    return items.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
 */
export function getAllReferences() {
    return getCollectionItems("references");
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

    // Synchronous parsing with marked
    const contentHtml = marked.parse(content);

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
export function getAllJobs() {
    return getCollectionItems("jobs");
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
 * Fetches all team member entries.
 */
export function getAllTeam() {
    return getCollectionItems("team");
}
