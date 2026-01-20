"use client";

import {
    FileText, Zap, Wrench, Cpu, Wifi, ShieldAlert, Lightbulb, Sun, Car,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { AnimatedHero, StaggerContainer, StaggerItem, AnimatedContent } from "@/components/ui/PageAnimations";

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, any> = {
    FileText, Zap, Wrench, Cpu, Wifi, ShieldAlert, Lightbulb, Sun, Car
};

// Border color mapping based on bg color
const borderMap: Record<string, { border: string; hoverBorder: string }> = {
    'bg-blue-50': { border: 'border-blue-100', hoverBorder: 'group-hover:border-blue-300' },
    'bg-amber-50': { border: 'border-amber-100', hoverBorder: 'group-hover:border-amber-300' },
    'bg-red-50': { border: 'border-red-100', hoverBorder: 'group-hover:border-brand-red/30' },
    'bg-purple-50': { border: 'border-purple-100', hoverBorder: 'group-hover:border-purple-300' },
    'bg-cyan-50': { border: 'border-cyan-100', hoverBorder: 'group-hover:border-cyan-300' },
    'bg-slate-100': { border: 'border-slate-200', hoverBorder: 'group-hover:border-slate-400' },
    'bg-yellow-50': { border: 'border-yellow-100', hoverBorder: 'group-hover:border-yellow-300' },
    'bg-orange-50': { border: 'border-orange-100', hoverBorder: 'group-hover:border-orange-300' },
    'bg-green-50': { border: 'border-green-100', hoverBorder: 'group-hover:border-green-300' },
};

interface Service {
    slug: string;
    title: string;
    icon: string;
    description: string;
    color: string;
    bg: string;
}

interface ServicesPageContentProps {
    title?: string;
    description?: string;
    services: Service[];
}

export function ServicesPageContent({ title, description, services }: ServicesPageContentProps) {
    return (
        <div className="bg-white">
            {/* Premium Hero Section */}
            <div className="relative bg-slate-900 text-white overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <AnimatedHero>
                        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                            {title || "Unsere Dienstleistungen"}
                        </h1>
                        <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            {description || "Ihr Partner für Elektroplanung, Installation, Telekommunikation und Photovoltaik. Wir bieten umfassende Lösungen aus einer Hand."}
                        </p>
                    </AnimatedHero>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 py-16 md:py-24 -mt-12 md:-mt-20 relative z-20">
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service) => {
                        const IconComponent = iconMap[service.icon] || FileText;
                        const borders = borderMap[service.bg] || { border: 'border-gray-100', hoverBorder: 'group-hover:border-gray-300' };

                        return (
                            <StaggerItem key={service.slug} className="h-full">
                                <Link href={`/leistungen/${service.slug}`} className="block h-full group">
                                    <article className={`bg-white h-full p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border ${borders.border} ${borders.hoverBorder} flex flex-col items-start relative overflow-hidden`}>
                                        {/* Icon Background Blob */}
                                        <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${service.bg} opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out`}></div>

                                        {/* Icon */}
                                        <div className={`relative w-16 h-16 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="w-8 h-8" strokeWidth={1.5} />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl md:text-2xl font-bold uppercase text-slate-900 mb-3 group-hover:text-brand-red transition-colors relative z-10">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-600 mb-8 leading-relaxed relative z-10 flex-grow">
                                            {service.description}
                                        </p>

                                        {/* Link Arrow */}
                                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400 group-hover:text-brand-red transition-colors mt-auto">
                                            <span>Mehr erfahren</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </article>
                                </Link>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </div>

            {/* CTA Section */}
            <AnimatedContent className="bg-slate-50 py-20 md:py-32">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase text-slate-900 mb-6">Haben Sie ein Projekt?</h2>
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                        Wir beraten Sie gerne unverbindlich. Kontaktieren Sie uns für eine Offerte oder ein persönliches Gespräch.
                    </p>
                    <Link
                        href="/kontakt"
                        className="inline-flex items-center gap-3 bg-brand-red text-white font-bold uppercase px-8 py-4 rounded-sm hover:bg-slate-900 transition-colors shadow-lg hover:shadow-xl"
                    >
                        <span>Kontakt aufnehmen</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </AnimatedContent>
        </div>
    );
}
