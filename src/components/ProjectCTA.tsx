"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedContent } from "@/components/ui/PageAnimations";

interface ProjectCTAProps {
    title?: string;
    description?: string;
    buttonText?: string;
    variant?: "light" | "dark";
}

export function ProjectCTA({
    title = "Haben Sie ein Projekt?",
    description = "Wir beraten Sie gerne unverbindlich. Kontaktieren Sie uns für eine Offerte oder ein persönliches Gespräch.",
    buttonText = "Kontakt aufnehmen",
    variant = "light"
}: ProjectCTAProps) {
    const isLight = variant === "light";

    return (
        <AnimatedContent className={isLight ? "bg-slate-50 py-20 md:py-32" : "bg-slate-900 py-16 md:py-24"}>
            <div className="container mx-auto px-4 text-center">
                <h2 className={`text-3xl md:text-4xl font-bold uppercase mb-6 ${isLight ? "text-slate-900" : "text-white"}`}>
                    {title}
                </h2>
                <p className={`text-xl mb-10 max-w-2xl mx-auto ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                    {description}
                </p>
                <Link
                    href="/kontakt"
                    className={`inline-flex items-center gap-3 font-bold uppercase px-8 py-4 rounded-sm transition-colors shadow-lg hover:shadow-xl ${isLight
                            ? "bg-brand-red text-white hover:bg-slate-900"
                            : "bg-brand-red text-white hover:bg-white hover:text-brand-red"
                        }`}
                >
                    <span>{buttonText}</span>
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </AnimatedContent>
    );
}
