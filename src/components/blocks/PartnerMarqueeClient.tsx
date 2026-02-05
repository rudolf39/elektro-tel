"use client";

import { Marquee } from "@/components/ui/marquee";

/**
 * Client Component for the Partner Marquee.
 * Renders an infinite scrolling list of partner logos.
 * 
 * @param partners - Array of partner objects containing logo and title
 * @param title - Section title
 */
export function PartnerMarqueeClient({ partners, title }: { partners: any[], title: string }) {
    return (
        <section className="py-20 bg-white border-t border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-12">
                <h2 className="text-3xl font-bold uppercase text-slate-900 tracking-tight">{title}</h2>
            </div>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                {/* User requested flow from left to right. Normal marquee is right to left. So we reverse it. */}
                <Marquee pauseOnHover reverse className="[--duration:40s]">
                    {partners.map((partner: any, i: number) => (
                        <div key={i} className="mx-8 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={partner.logo || "/partners/partner-placeholder.svg"}
                                alt={partner.title}
                                width={160}
                                height={80}
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerText = partner.title;
                                }}
                            />
                        </div>
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            </div>
        </section>
    );
}
