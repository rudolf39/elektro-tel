import { getAllNews } from "@/lib/cms";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Metadata } from "next";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import {
    Calendar, Newspaper, Trophy, Wrench, ShieldCheck, Handshake, Info
} from "lucide-react";

export const metadata: Metadata = {
    title: "News | Elektro-Tel",
    description: "Aktuelles von Elektro-Tel: Modelle, Partnerschaften und Erfolge.",
};

// Helper to determine icon based on title or content keywords
function getNewsIcon(title: string) {
    const t = title.toLowerCase();
    if (t.includes("partner") || t.includes("infraone")) return { icon: Handshake, color: "text-blue-600", bg: "bg-blue-50" };
    if (t.includes("lehr") || t.includes("gratulation") || t.includes("schluss")) return { icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" };
    if (t.includes("service") || t.includes("hotline")) return { icon: Wrench, color: "text-brand-red", bg: "bg-red-50" };
    if (t.includes("sicher") || t.includes("quali")) return { icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" };
    return { icon: Newspaper, color: "text-slate-600", bg: "bg-slate-100" };
}

export default function NewsPage() {
    const news = getAllNews();
    // sort descending by date
    const sortedNews = news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-slate-900 text-white py-14 md:py-20 mt-20 md:mt-24">
                <div className="container mx-auto px-4 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">News – Aktuelles</h1>
                    <p className="text-xl text-slate-300 max-w-2xl">
                        Neuigkeiten aus unserem Unternehmen. Partnerschaften, Erfolge und Informationen.
                    </p>
                </div>
            </div>

            {/* News List */}
            <div className="container mx-auto px-4 py-16">
                <div className="space-y-12">
                    {sortedNews.map((item: any, index: number) => {
                        const style = getNewsIcon(item.title);
                        const Icon = style.icon;

                        return (
                            <article key={index} id={item.slug} className="scroll-mt-32 flex flex-col md:flex-row gap-6 md:gap-8 bg-white p-6 md:p-8 rounded-sm shadow-sm md:hover:shadow-md transition-shadow border border-gray-100 items-start">
                                {/* Date & Icon Column */}
                                <div className="flex md:flex-col items-center gap-4 md:w-32 shrink-0 text-center md:pt-2">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${style.bg} ${style.color}`}>
                                        <Icon size={28} />
                                    </div>
                                    <div className="flex flex-col items-start md:items-center">
                                        <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                                            <Calendar size={14} />
                                            <time dateTime={item.date}>
                                                {item.date ? format(new Date(item.date), "dd.MM.yyyy", { locale: de }) : "-"}
                                            </time>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Column */}
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold uppercase text-slate-900 mb-4">{item.title}</h2>

                                    {item.heroImage && (
                                        <div className="mb-6 rounded-sm overflow-hidden bg-gray-100 max-h-[300px]">
                                            <ImageWithFallback
                                                src={item.heroImage}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="prose prose-slate text-slate-600 max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: item.body }} />
                                    </div>
                                </div>
                            </article>
                        );
                    })}

                    {sortedNews.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 rounded-sm">
                            <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500">Momentan gibt es keine News.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
