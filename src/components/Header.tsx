"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

// Default navigation (fallback if CMS data is not available)
const defaultServiceLinks = [
    { name: "Elektroplanung", href: "/leistungen/elektroplanung" },
    { name: "Stark- & Schwachstrom", href: "/leistungen/stark-schwachstrom" },
    { name: "Service & Unterhalt", href: "/leistungen/service-unterhalt" },
    { name: "Gebäudeautomation", href: "/leistungen/gebaudeautomation" },
    { name: "Telefonie & Internet", href: "/leistungen/telefonie-internet" },
    { name: "Sicherheit", href: "/leistungen/sicherheit" },
    { name: "Beleuchtung", href: "/leistungen/beleuchtung" },
    { name: "Photovoltaik", href: "/leistungen/photovoltaik" },
    { name: "E-Mobilität", href: "/leistungen/e-mobilitaet" },
];

const defaultNavigation = [
    { name: "Team", href: "/team" },
    { name: "News", href: "/news" },
    { name: "Referenzen", href: "/referenzen" },
    { name: "Jobs", href: "/jobs" },
    { name: "Partner", href: "/partner" },
];

interface NavMenuItem {
    name: string;
    href: string;
}

interface NavMenuItemWithSubmenu extends NavMenuItem {
    hasSubmenu?: boolean;
    submenu?: NavMenuItem[];
}

interface HeaderProps {
    headerMenu?: NavMenuItemWithSubmenu[];
}

/**
 * Global Header Component.
 * Contains the main navigation and logo.
 * 
 * Features:
 * - Transparent-to-black gradient overlay.
 * - Mobile Menu overlay.
 * - Scroll locking when menu is open.
 * - Dropdown menu for Leistungen.
 * - CMS-managed navigation with fallbacks.
 */
export function Header({ headerMenu }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    // Lock body scroll when menu is open
    if (typeof window !== "undefined") {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }

    // Find Leistungen menu item (has submenu) and other navigation items
    const leistungenItem = headerMenu?.find(item => item.hasSubmenu && item.submenu && item.submenu.length > 0);
    const serviceLinks = leistungenItem?.submenu || defaultServiceLinks;
    const leistungenHref = leistungenItem?.href || "/leistungen";
    const leistungenName = leistungenItem?.name || "Leistungen";

    // Get non-submenu items for main navigation
    const navigation = headerMenu
        ? headerMenu.filter(item => !item.hasSubmenu).map(item => ({ name: item.name, href: item.href }))
        : defaultNavigation;

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* 
                Transparent gradient on ALL pages (same as homepage)
                Black -> Transparent gradient for signature look
            */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-transparent z-10" />

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
                        {/* Leistungen Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsServicesOpen(true)}
                            onMouseLeave={() => setIsServicesOpen(false)}
                        >
                            <Link
                                href={leistungenHref}
                                className="flex items-center gap-1 text-lg font-medium text-white/95 hover:text-brand-red transition-colors uppercase tracking-wide"
                            >
                                {leistungenName}
                                <ChevronDown className={cn("w-4 h-4 transition-transform", isServicesOpen && "rotate-180")} />
                            </Link>

                            {/* Dropdown Menu */}
                            <div className={cn(
                                "absolute top-full left-0 mt-2 w-64 bg-white rounded-sm shadow-xl border border-gray-100 py-2 transition-all duration-200",
                                isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                            )}>
                                {serviceLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block px-4 py-2 text-slate-700 hover:bg-gray-50 hover:text-brand-red transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="border-t border-gray-100 mt-2 pt-2">
                                    <Link
                                        href={leistungenHref}
                                        className="block px-4 py-2 text-brand-red font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Alle {leistungenName} →
                                    </Link>
                                </div>
                            </div>
                        </div>

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
                    "fixed inset-0 bg-slate-900/95 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-start items-center gap-4 pt-24 overflow-y-auto pb-8",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Leistungen with sub-items */}
                <div className="w-full px-8">
                    <Link
                        href={leistungenHref}
                        className="text-2xl font-bold text-white hover:text-brand-red transition-colors uppercase tracking-widest block text-center mb-4"
                        onClick={() => setIsOpen(false)}
                    >
                        {leistungenName}
                    </Link>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                        {serviceLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm text-white/80 hover:text-brand-red transition-colors text-center py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

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
