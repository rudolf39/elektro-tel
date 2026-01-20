"use client";

import * as Icons from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Represents a single service item in the grid.
 */
interface ServiceItem {
    title: string;
    description: string;
    /** Name of the Lucide icon to render (e.g. "Cpu", "Zap") */
    icon: string;
    /** Optional direct link URL (overrides auto-generated slug) */
    linkUrl?: string;
}

interface ServicesProps {
    title: string;
    items: ServiceItem[];
    displayMode?: "full" | "simple";
}

/**
 * ServicesBlock Component with Framer Motion Animations
 */
export function ServicesBlock({ title, items, displayMode = "full" }: ServicesProps) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const isSimple = displayMode === "simple";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/leistungen" className="block w-fit mb-8 sm:mb-10 md:mb-12 group">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-slate-900 text-left tracking-tight group-hover:text-brand-red transition-colors">
                            {title}
                        </h2>
                    </Link>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                >
                    {items.map((item, index) => {
                        const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;

                        // Use linkUrl if provided, otherwise generate from title
                        let href = item.linkUrl;
                        if (!href) {
                            let anchor = item.title.toLowerCase()
                                .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-+|-+$/g, "");

                            if (anchor === "telenet-it" || anchor === "telefonie-und-internet") anchor = "telefonie-internet";
                            if (anchor.includes("stark") || anchor.includes("schwach")) anchor = "stark-schwachstrom";
                            if (anchor.includes("service") || anchor.includes("unterhalt")) anchor = "service-unterhalt";
                            if (anchor === "e-mobilitaet" || anchor === "emobilitaet" || anchor.includes("e-mob")) anchor = "e-mobilitaet";
                            if (anchor.includes("gebaeude")) anchor = "gebaudeautomation";
                            href = `/leistungen/${anchor}`;
                        }

                        return (
                            <motion.div key={index} variants={itemVariants}>
                                <Link
                                    href={href}
                                    className={`block bg-white p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm relative group overflow-hidden h-full ${isSimple ? 'flex flex-col items-center text-center justify-center' : ''}`}
                                >
                                    {/* Top Red Line Hover Effect */}
                                    <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                                    <div className={`flex ${isSimple ? 'flex-col items-center gap-4 sm:gap-6' : 'flex-col items-start gap-3 sm:gap-4 md:flex-row'}`}>
                                        <div className="p-2.5 sm:p-3 bg-gray-100 text-brand-red rounded-sm group-hover:bg-brand-red group-hover:text-white transition-colors duration-300 shrink-0">
                                            <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover:text-brand-red transition-colors">
                                                {item.title}
                                            </h3>
                                            {!isSimple && (
                                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
