"use client";

import { RedContactBar } from "@/components/RedContactBar";
import Link from "next/link";
import { Sun, ArrowRight, Car, Zap, ShieldAlert, Lightbulb, Cpu, Phone } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { HeroBanner } from "@/lib/cms";

interface HeroBlockProps {
    title: string;
    subtitle: string;
    image: string;
    banners?: HeroBanner[];
}

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Sun,
    Car,
    Zap,
    ShieldAlert,
    Lightbulb,
    Cpu,
    Phone,
};

// Gradient color mapping - supports all colors from CMS dropdown
const gradientColors: Record<string, string> = {
    'orange-500': 'from-orange-500',
    'yellow-500': 'from-yellow-500',
    'blue-500': 'from-blue-500',
    'cyan-500': 'from-cyan-500',
    'green-500': 'from-green-500',
    'emerald-500': 'from-emerald-500',
    'red-500': 'from-red-500',
    'pink-500': 'from-pink-500',
    'purple-500': 'from-purple-500',
    'indigo-500': 'from-indigo-500',
    'slate-700': 'from-slate-700',
};

const gradientColorsTo: Record<string, string> = {
    'orange-500': 'to-orange-500',
    'yellow-500': 'to-yellow-500',
    'blue-500': 'to-blue-500',
    'cyan-500': 'to-cyan-500',
    'green-500': 'to-green-500',
    'emerald-500': 'to-emerald-500',
    'red-500': 'to-red-500',
    'pink-500': 'to-pink-500',
    'purple-500': 'to-purple-500',
    'indigo-500': 'to-indigo-500',
    'slate-700': 'to-slate-700',
};

/**
 * HeroBlock Component with Framer Motion Animations
 * Supports dynamic banners via CMS
 */
export function HeroBlock({ title, subtitle, image, banners = [] }: HeroBlockProps) {
    return (
        <section className="relative w-full overflow-hidden">
            <div className="relative h-[85vh] min-h-[600px] w-full bg-slate-900 overflow-hidden">
                {/* Responsive Background Image with Ken Burns Effect */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="absolute inset-0 overflow-hidden"
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority
                        className="object-cover"
                        style={{ objectPosition: 'center 20%' }}
                        sizes="100vw"
                    />
                </motion.div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Content with Stagger Animation */}
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-white pt-20 md:pt-24">
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-[10px] sm:text-xs md:text-lg lg:text-xl font-medium tracking-[0.15em] md:tracking-[0.2em] mb-3 sm:mb-4 md:mb-6 opacity-90 uppercase"
                    >
                        Winterthur | Tägerwilen | Schaffhausen
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl leading-[1.15] drop-shadow-lg"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-brand-red font-bold uppercase tracking-widest mt-3 sm:mt-4 md:mt-6 lg:mt-8 text-sm sm:text-base md:text-xl lg:text-2xl drop-shadow-md"
                    >
                        {subtitle}
                    </motion.p>

                    {/* Dynamic Highlight Banners */}
                    {banners && banners.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                            className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap gap-3 sm:gap-4"
                        >
                            {banners.slice(0, 2).map((banner, index) => {
                                const IconComponent = iconMap[banner.icon] || Sun;
                                const fromColor = gradientColors[banner.gradientFrom] || 'from-orange-500';
                                const toColor = gradientColorsTo[banner.gradientTo] || 'to-yellow-500';

                                return (
                                    <Link key={index} href={banner.linkUrl} className="group inline-block">
                                        <div className={`bg-gradient-to-r ${fromColor} ${toColor} text-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-sm shadow-2xl max-w-[200px] sm:max-w-xs md:max-w-sm transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}>
                                            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                                                <div className="bg-white/20 p-2 sm:p-2.5 md:p-3 rounded-full shrink-0">
                                                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[10px] sm:text-xs uppercase tracking-wider opacity-90 mb-0.5 sm:mb-1">{banner.label}</p>
                                                    <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-2">{banner.title}</h3>
                                                    <p className="text-xs sm:text-sm opacity-90 hidden sm:block leading-snug">{banner.description}</p>
                                                    <div className="flex items-center gap-1 text-xs sm:text-sm font-bold mt-1 sm:mt-2 group-hover:gap-2 transition-all">
                                                        <span>{banner.linkText}</span>
                                                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Red Contact Bar */}
            <RedContactBar />
        </section>
    );
}
