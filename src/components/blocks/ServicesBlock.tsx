import * as Icons from "lucide-react";
import Link from "next/link";

/**
 * Represents a single service item in the grid.
 */
interface ServiceItem {
    title: string;
    description: string;
    /** Name of the Lucide icon to render (e.g. "Cpu", "Zap") */
    icon: string;
}

interface ServicesProps {
    title: string;
    items: ServiceItem[];
    displayMode?: "full" | "simple";
}

/**
 * ServicesBlock Component
 * 
 * Renders a grid of service items with icons. 
 * Includes logic to dynamically map icon string names to Lucide react components.
 * Also generates anchor links to the specific /leistungen page sections based on title.
 */
export function ServicesBlock({ title, items, displayMode = "full" }: ServicesProps) {
    const isSimple = displayMode === "simple";

    if (!items || items.length === 0) {
        console.warn("ServicesBlock: No items provided", { title, displayMode });
        return (
            <section className="py-20 bg-gray-50 border-4 border-red-500">
                <div className="mx-auto w-full max-w-[1200px] px-4 text-center text-red-500 font-bold">
                    DEBUG: Services Block Loaded - No Items Found<br />
                    Title: {title}, Mode: {displayMode}
                </div>
            </section>
        );
    }

    return (
        <section className="py-10 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <Link href="/leistungen" className="block w-fit mb-8 md:mb-12 group">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase text-slate-900 text-left tracking-tight group-hover:text-brand-red transition-colors">
                        {title}
                    </h2>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {items.map((item, index) => {
                        // Dynamically load icon
                        const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;

                        // Generate anchor link
                        let anchor = item.title.toLowerCase()
                            .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-+|-+$/g, "");

                        // Special case mapping based on known IDs in detailedServices
                        if (anchor === "telenet-it" || anchor === "telefonie-und-internet") anchor = "telefonie-internet";
                        if (anchor.includes("stark") || anchor.includes("schwach")) anchor = "stark-schwachstrom";
                        if (anchor.includes("service") || anchor.includes("unterhalt")) anchor = "service-unterhalt";
                        if (anchor === "e-mobilitaet" || anchor === "emobilitaet" || anchor.includes("e-mob")) anchor = "e-mobilitaet";
                        if (anchor.includes("gebaeude")) anchor = "gebaudeautomation"; // fix umlaut if needed

                        return (
                            <Link key={index} href={`/leistungen#${anchor}`} className={`block bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm relative group overflow-hidden ${isSimple ? 'flex flex-col items-center text-center justify-center h-full' : ''}`}>
                                {/* Top Red Line Hover Effect */}
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                                {<div className={`flex ${isSimple ? 'flex-col items-center gap-6' : 'flex-col items-start gap-4 md:flex-row'}`}>
                                    <div className="p-3 bg-gray-100 text-brand-red rounded-sm group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                                        <IconComponent className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-red transition-colors">{item.title}</h3>
                                        {!isSimple && (
                                            <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                        )}
                                    </div>
                                </div>}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
