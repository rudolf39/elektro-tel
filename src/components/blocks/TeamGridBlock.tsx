import { getTeamMembersSettings } from "@/lib/cms";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import fs from "fs";
import path from "path";

type TeamMember = {
    name: string;
    position: string;
    jobTitle?: string;
    email?: string;
    image?: string;
    showOnHomepage?: boolean;
};

const departmentOrder: Array<{ key: "management" | "project" | "administration"; label: string }> = [
    { key: "management", label: "Geschäftsleitung" },
    { key: "project", label: "Projektleitung" },
    { key: "administration", label: "Administration" },
];

function getCacheBustedSrc(src?: string) {
    if (!src) return src;
    if (src.startsWith("http")) return src;
    const normalized = src.startsWith("/") ? src.slice(1) : src;
    const filePath = path.join(process.cwd(), "public", normalized);
    try {
        const stat = fs.statSync(filePath);
        return `${src}?v=${stat.mtimeMs}`;
    } catch {
        return src;
    }
}

/**
 * Renders a grid of team members.
 * Fetches all team data from the CMS.
 */
export async function TeamGridBlock({ title, subtitle, count }: { title: string, subtitle?: string, count?: number }) {
    const teamSettings = getTeamMembersSettings();
    const groupedMembers = departmentOrder.map((department) => ({
        key: department.key,
        label: department.label,
        members: (teamSettings?.[department.key] || []) as TeamMember[],
    }));

    const isHomepageBlock = typeof count === "number";
    const homepageMembers = groupedMembers
        .flatMap((group) => group.members)
        .filter((member) => member.showOnHomepage);

    return (
        <section className="py-10 md:py-20 bg-white">
            <div className="container mx-auto px-4 text-left">
                {subtitle && (
                    <p className="text-brand-red font-bold uppercase tracking-widest mb-2 text-sm md:text-base">
                        {title}
                    </p>
                )}
                <Link href="/team" className="inline-block group mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase text-slate-900 group-hover:text-brand-red transition-colors tracking-tight">
                        {subtitle || title}
                    </h2>
                </Link>

                {isHomepageBlock ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {homepageMembers.map((member, i) => (
                            <div key={i} className="group text-center">
                                <div className="aspect-[4/5] bg-gray-100 mb-6 relative overflow-hidden rounded-sm mx-auto max-w-[300px]">
                                    {member.image ? (
                                        <Image
                                            src={getCacheBustedSrc(member.image) ?? member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                                            Kein Bild
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 uppercase mb-1">{member.name}</h3>
                                <p className="text-slate-600 text-sm mb-4 min-h-[40px] whitespace-pre-line">
                                    {[member.position, member.jobTitle].filter(Boolean).join(" / ")}
                                </p>

                                <a href={`mailto:${member.email || "info@elektro-tel.ch"}`} className="inline-flex items-center gap-2 text-brand-red font-bold uppercase text-xs tracking-wider border border-brand-red px-4 py-2 hover:bg-brand-red hover:text-white transition-colors">
                                    <Mail size={14} /> Nachricht schicken
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-12 md:space-y-16">
                        {groupedMembers.map((group) => {
                            if (group.members.length === 0) return null;
                            return (
                                <div key={group.key}>
                                    <h3 className="text-2xl md:text-3xl font-bold uppercase text-slate-900 mb-8 md:mb-10 text-left">
                                        {group.label}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {group.members.map((member, i) => (
                                            <div key={i} className="group text-center">
                                                <div className="aspect-[4/5] bg-gray-100 mb-6 relative overflow-hidden rounded-sm mx-auto max-w-[300px]">
                                                    {member.image ? (
                                                        <Image
                                                            src={getCacheBustedSrc(member.image) ?? member.image}
                                                            alt={member.name}
                                                            fill
                                                            className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                                                            Kein Bild
                                                        </div>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 uppercase mb-1">{member.name}</h3>
                                                <p className="text-slate-600 text-sm mb-4 min-h-[40px] whitespace-pre-line">
                                                    {[member.position, member.jobTitle].filter(Boolean).join(" / ")}
                                                </p>

                                                <a href={`mailto:${member.email || "info@elektro-tel.ch"}`} className="inline-flex items-center gap-2 text-brand-red font-bold uppercase text-xs tracking-wider border border-brand-red px-4 py-2 hover:bg-brand-red hover:text-white transition-colors">
                                                    <Mail size={14} /> Nachricht schicken
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
