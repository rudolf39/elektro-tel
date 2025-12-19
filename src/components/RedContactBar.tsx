"use client";

import { Phone, MessageCircle, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * RedContactBar Component.
 * A distinctive red bar overlaid on the Hero section (or others).
 * Contains quick contact actions: Phone, WhatsApp, Email.
 * 
 * Design:
 * - Uses skewed CSS transforms for dynamic look.
 * - Overlaps the section above it via negative margins.
 */
export function RedContactBar() {
    const items = [
        {
            icon: Phone,
            label: "0800 800 813",
            href: "tel:0800800813",
            sub: "Kostenlos anrufen",
        },
        {
            icon: MessageCircle,
            label: "WhatsApp",
            href: "https://wa.me/41763145553",
            target: "_blank",
            rel: "noopener noreferrer",
            sub: "Chat starten",
        },
        {
            icon: Mail,
            label: "info@elektro-tel.ch",
            href: "mailto:info@elektro-tel.ch",
            sub: "E-Mail schreiben",
        },
    ];

    return (
        <div className="w-full relative z-30 -mt-12 lg:-mt-20 pointer-events-none">
            {/* 
        Main Background Layer:
        - Full screen width (edge-to-edge).
        - Fixed red color.
        - Skewed right.
      */}
            {/* 
        Main Background Layer:
        - Mobile: Simple red background, no skew, standard width.
        - Desktop (md+): Full screen width with skew.
      */}
            <div className="absolute inset-y-0 left-[-50%] right-[-50%] bg-brand-red md:transform md:-skew-x-[12deg] origin-center shadow-2xl pointer-events-auto border-t border-brand-red"></div>

            {/* 
         Container for Content:
         - Constrained width (max-w-5xl) to center the items as requested ("in der mitte konfiguriert").
         - Centered in the page.
      */}
            <div className="container mx-auto relative z-10 pointer-events-auto max-w-6xl px-4 lg:px-0">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {items.map((item: any, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            target={item.target}
                            rel={item.rel}
                            className="group relative flex flex-col items-center justify-center py-6 md:py-10 text-white md:bg-transparent bg-transparent mb-[1px] md:mb-0"
                        >
                            {/* 
                 Hover Effect:
                 - "beidseitig schrägung" -> skewed parallelogram.
                 - "nicht grösser als die box" -> Removed negative inset. Now inset-0.
                 - transform -skew-x-[20deg] matches the main bar skew.
              */}
                            <div className="hidden md:block absolute inset-0 bg-brand-red-hover transform -skew-x-[20deg] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 origin-center"></div>

                            {/* Mobile Hover: Simple fade, no skew needed for stacked mobile view usually, or keep simple */}
                            <div className="md:hidden absolute inset-0 bg-brand-red-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

                            {/* Separator Line: Right side of item, skewed */}
                            {index < items.length - 1 && (
                                <div className="hidden md:block absolute top-0 right-0 h-full w-[1px] bg-white/20 transform -skew-x-[20deg] z-10" />
                            )}

                            {/* Content */}
                            <div className="relative z-20 flex flex-col items-center">
                                <item.icon className="w-8 h-8 mb-3 opacity-90" />
                                <span className="text-2xl md:text-3xl font-bold uppercase tracking-wide whitespace-nowrap drop-shadow-sm">
                                    {item.label}
                                </span>
                                <span className="text-base opacity-80 mt-1 uppercase tracking-wider font-medium drop-shadow-sm">
                                    {item.sub}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
