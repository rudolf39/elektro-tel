"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

const navigation = [
    { name: "Leistungen", href: "/leistungen" },
    { name: "Team", href: "/team" },
    { name: "News", href: "/news" },
    { name: "Referenzen", href: "/referenzen" },
    { name: "Jobs", href: "/jobs" },
    { name: "Partner", href: "/partner" },
];

/**
 * Global Header Component.
 * Contains the main navigation and logo.
 * 
 * Features:
 * - Transparent-to-black gradient overlay.
 * - Mobile Menu overlay.
 * - Scroll locking when menu is open.
 */
export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    // Lock body scroll when menu is open
    if (typeof window !== "undefined") {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* 
                Layer 1: White Background Scrim (Subpages ONLY)
                Positions behind the gradient to ensure transparency fades to white, not black/void.
                z-0
            */}
            {!isHome && (
                <div className="absolute inset-0 bg-white z-0" />
            )}

            {/* 
                Layer 2: Black Gradient (ALL Pages)
                The signature look: Black -> Transparent (actually ends at black/30).
                Must sit ON TOP of the white scrim but BEHIND content.
                z-10
            */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-black/30 backdrop-blur-sm z-10" />

            <div className="relative container mx-auto px-4 lg:px-8 z-50">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo Slot */}
                    <Link href="/" className="flex items-center gap-2 group relative">
                        <ImageWithFallback
                            src="/images/logo-elektro-tel-ag.svg"
                            alt="Elektro-Tel AG"
                            width={200}
                            height={64}
                            className="h-12 md:h-16 w-auto object-contain"
                            fallbackSrc=""
                        />
                    </Link>

                    {/* Desktop Nav - Always White Text (since gradient is always there) */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-lg font-medium text-white/95 hover:text-brand-red transition-colors uppercase tracking-wide"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/kontakt"
                            className="ml-6 px-8 py-3 bg-brand-red text-white text-lg font-bold uppercase hover:bg-red-700 transition-colors shadow-lg rounded-sm"
                        >
                            Kontakt
                        </Link>
                    </nav>

                    {/* Mobile Menu Button - Always White (since gradient is always there) */}
                    <button
                        className="lg:hidden p-2 text-white relative focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                    >
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-slate-900/95 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-center items-center gap-8",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-2xl font-bold text-white hover:text-brand-red transition-colors uppercase tracking-widest"
                        onClick={() => setIsOpen(false)}
                    >
                        {item.name}
                    </Link>
                ))}
                <Link
                    href="/kontakt"
                    className="mt-4 px-10 py-4 bg-brand-red text-white text-xl font-bold uppercase hover:bg-red-700 transition-colors shadow-lg rounded-sm"
                    onClick={() => setIsOpen(false)}
                >
                    Kontakt
                </Link>
            </div>
        </header>
    );
}
