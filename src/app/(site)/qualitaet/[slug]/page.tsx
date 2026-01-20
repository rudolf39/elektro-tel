import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
    ShieldCheck, Leaf, Recycle, ArrowLeft, Download, CheckCircle2
} from "lucide-react";
import { AnimatedContent, AnimatedHero } from "@/components/ui/PageAnimations";
import { ProjectCTA } from "@/components/ProjectCTA";
import { getAllQuality, getQualityById } from "@/lib/cms";

const iconMap: { [key: string]: any } = {
    ShieldCheck, Leaf, Recycle, ShieldAlert: ShieldCheck
};

export async function generateStaticParams() {
    const items = getAllQuality();
    return items.map((item: any) => ({ slug: item.slug }));
}

type Props = {
    params: Promise<{ slug: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const content = getQualityById(slug);
    if (!content) return {};
    return {
        title: content.seoTitle || `${content.title} | Elektro-Tel`,
        description: content.seoDescription || content.description,
    };
}

export default async function QualityDetailPage({ params }: Props) {
    const { slug } = await params;
    const content = getQualityById(slug);

    if (!content) {
        notFound();
    }

    const allQuality = getAllQuality();
    const IconComponent = iconMap[content.icon] || ShieldCheck;
    const bgClass = content.bg || 'bg-green-50';
    const colorClass = content.color || 'text-green-600';

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-28 md:pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedHero className="text-white max-w-4xl">
                        {/* Breadcrumb */}
                        <Link href="/qualitaet" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 group transition-colors">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="uppercase tracking-wider">Qualitätsmanagement und Nachhaltigkeit</span>
                        </Link>

                        {/* Icon */}
                        <div className="mb-8">
                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${bgClass}`}>
                                <IconComponent className={`w-10 h-10 ${colorClass}`} />
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                            {content.title}
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mb-8">
                            {content.description}
                        </p>

                        {/* PDF Download Button */}
                        {content.pdfDownload && (
                            <a
                                href={content.pdfDownload}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-green-600 text-white font-bold px-8 py-4 rounded-sm hover:bg-green-700 transition-all shadow-lg"
                            >
                                <Download className="w-5 h-5" />
                                PDF herunterladen
                            </a>
                        )}
                    </AnimatedHero>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    {/* Left Column - Content */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Details List */}
                        {content.details && content.details.length > 0 && (
                            <AnimatedContent>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    Kernpunkte
                                    <div className="h-1 w-12 bg-green-600 rounded-full"></div>
                                </h2>
                                <div className="grid gap-4">
                                    {content.details.map((detail: string, i: number) => (
                                        <div key={i} className={`flex items-start gap-3 p-4 ${bgClass} rounded-sm border-l-4 ${colorClass.replace('text-', 'border-')}`}>
                                            <CheckCircle2 className={`w-6 h-6 ${colorClass} shrink-0 mt-0.5`} />
                                            <span className="text-slate-700 text-lg">{detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </AnimatedContent>
                        )}

                        {/* Markdown Body */}
                        {content.body && (
                            <AnimatedContent delay={0.1}>
                                <div className="prose prose-lg prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: content.body }} />
                            </AnimatedContent>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <AnimatedContent delay={0.2} className="space-y-6 md:sticky md:top-28 md:self-start">
                        {/* PDF Download Card */}
                        {content.pdfDownload && (
                            <div className="bg-slate-900 text-white p-6 rounded-sm">
                                <h3 className="font-bold text-xl mb-4">Dokument herunterladen</h3>
                                <p className="text-slate-300 mb-6">
                                    Laden Sie das vollständige Dokument als PDF herunter.
                                </p>
                                <a
                                    href={content.pdfDownload}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold uppercase px-6 py-3 rounded-sm hover:bg-green-700 transition-all w-full"
                                >
                                    <Download className="w-5 h-5" />
                                    PDF Download
                                </a>
                            </div>
                        )}

                        {/* Links to other quality pages */}
                        <div className="border border-gray-200 p-6 rounded-sm">
                            <h3 className="font-bold text-slate-900 mb-4">Weitere Dokumente</h3>
                            <div className="space-y-3">
                                {allQuality.filter((p: any) => p.slug !== slug).map((page: any) => {
                                    const PageIcon = iconMap[page.icon] || ShieldCheck;
                                    return (
                                        <Link
                                            key={page.slug}
                                            href={`/qualitaet/${page.slug}`}
                                            className="flex items-center gap-3 text-slate-600 hover:text-green-600 transition-colors"
                                        >
                                            <PageIcon className="w-5 h-5" />
                                            <span>{page.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </div>

            {/* CTA Section */}
            <ProjectCTA variant="light" />
        </div>
    );
}
