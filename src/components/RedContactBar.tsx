"use client";

import { Phone, MessageCircle, Mail } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * RedContactBar Component - Skewed Design with Animations
 * A distinctive red bar with angled/skewed styling.
 */
export function RedContactBar() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

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

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            transition={{ duration: 0.5 }}
            className="w-full relative z-30 -mt-12 lg:-mt-20 pointer-events-none"
        >
            {/* 
                Skewed Background Layer - Full width with angled design
            */}
            <div className="absolute inset-y-0 left-[-50%] right-[-50%] bg-brand-red md:transform md:-skew-x-[12deg] origin-center shadow-2xl pointer-events-auto" />

            {/* Content Container */}
            <div className="container mx-auto relative z-10 pointer-events-auto max-w-6xl px-4 lg:px-0">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {items.map((item: any, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Link
                                href={item.href}
                                target={item.target}
                                rel={item.rel}
                                className="group relative flex flex-col items-center justify-center py-6 md:py-10 text-white mb-[1px] md:mb-0"
                            >
                                {/* Skewed Hover Effect - Desktop */}
                                <div className="hidden md:block absolute inset-0 bg-brand-red-hover transform -skew-x-[20deg] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 origin-center" />

                                {/* Mobile Hover */}
                                <div className="md:hidden absolute inset-0 bg-brand-red-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

                                {/* Separator Line */}
                                {index < items.length - 1 && (
                                    <div className="hidden md:block absolute top-0 right-0 h-full w-[1px] bg-white/20 transform -skew-x-[20deg] z-10" />
                                )}

                                {/* Content */}
                                <div className="relative z-20 flex flex-col items-center text-center">
                                    <item.icon className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 opacity-90" />
                                    <span className="text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl font-bold uppercase tracking-wide drop-shadow-sm whitespace-nowrap">
                                        {item.label}
                                    </span>
                                    <span className="text-[10px] sm:text-xs md:text-sm lg:text-base opacity-80 mt-1 uppercase tracking-wider font-medium drop-shadow-sm whitespace-nowrap">
                                        {item.sub}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
