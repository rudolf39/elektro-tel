import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

/**
 * Global Footer Component.
 * Displays contact info, social links, and legal navigation.
 * Uses a 4-column grid layout on desktop.
 */
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Logo / Claim */}
                    <div className="md:col-span-2">
                        <Link href="/" className="mb-6 block max-w-[200px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/logo-elektro-tel-ag.svg" alt="Elektro-Tel AG" className="w-full h-auto" />
                        </Link>
                        <p className="max-w-md text-slate-400 mb-6">
                            Ihr kompetenter Partner für sämtliche Elektro- und Telekommunikationsinstallationen.
                            Von der Planung bis zur Ausführung stehen wir Ihnen mit unserem Fachwissen zur Seite.
                        </p>

                        <div className="flex gap-4 mt-6">
                            <a href="https://www.facebook.com/people/Elektro-Tel-AG/100063451046079/#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={24} />
                            </a>
                            <a href="https://www.instagram.com/elektrotelag/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={24} />
                            </a>
                            <a href="https://ch.linkedin.com/company/elektro-tel-ag" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Kontakt */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Kontakt</h3>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-brand-red mt-1 flex-shrink-0" size={18} />
                                <a href="https://maps.app.goo.gl/mzRwwEr7hxoQzgyu8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    Rudolf-Diesel-Strasse 25<br />
                                    8404 Winterthur
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="text-brand-red mt-1 flex-shrink-0" size={18} />
                                <a href="https://maps.app.goo.gl/A8hcsziffBQM8r219" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    Bahnhofstrasse 17<br />
                                    8274 Tägerwilen
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="text-brand-red mt-1 flex-shrink-0" size={18} />
                                <a href="https://goo.gl/maps/Schaffhausen" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    Solenbergstrasse 35<br />
                                    8207 Schaffhausen
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-brand-red flex-shrink-0" size={18} />
                                <a href="tel:0800800813" className="hover:text-white transition-colors">0800 800 813</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-brand-red flex-shrink-0" size={18} />
                                <a href="mailto:info@elektro-tel.ch" className="hover:text-white transition-colors">info@elektro-tel.ch</a>
                            </li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/team" className="hover:text-brand-red transition-colors">Team</Link></li>
                            <li><Link href="/referenzen" className="hover:text-brand-red transition-colors">Referenzen</Link></li>
                            <li><Link href="/jobs" className="hover:text-brand-red transition-colors">Jobs</Link></li>
                            <li><Link href="/partner" className="hover:text-brand-red transition-colors">Partner</Link></li>
                            <li><Link href="/impressum" className="hover:text-brand-red transition-colors mt-4 block text-sm">Impressum</Link></li>
                            <li><Link href="/datenschutz" className="hover:text-brand-red transition-colors text-sm">Datenschutz</Link></li>
                            <li><Link href="/agb" className="hover:text-brand-red transition-colors text-sm">AGB</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t border-slate-800 mt-16 pt-8 text-sm text-slate-500 gap-4">
                    <div>
                        &copy; {currentYear} Elektro-Tel AG. Alle Rechte vorbehalten.
                    </div>
                    <div>
                        <Link href="https://infraone.ch/webagentur-winterthur" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 no-underline transition-colors">
                            Webentwicklung durch Webagentur infraone IT Solutions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
