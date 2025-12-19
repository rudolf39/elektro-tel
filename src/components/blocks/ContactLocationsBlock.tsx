import { MapPin, Phone, Mail } from "lucide-react";

// Hardcoded locations as fallback/default
const defaultLocations = [
    {
        name: "Winterthur",
        address: "Rudolf-Diesel-Strasse 25, 8404 Winterthur",
        phone: "0800 800 813",
        email: "info@elektro-tel.ch",
        mapLink: "https://maps.app.goo.gl/mzRwwEr7hxoQzgyu8"
    },
    {
        name: "Tägerwilen",
        address: "Bahnhofstrasse 17, 8274 Tägerwilen",
        phone: "0800 800 813",
        email: "info@elektro-tel.ch",
        mapLink: "https://maps.app.goo.gl/A8hcsziffBQM8r219"
    },
    {
        name: "Schaffhausen",
        address: "Solenbergstrasse 35, 8207 Schaffhausen",
        phone: "0800 800 813",
        email: "info@elektro-tel.ch",
        mapLink: "https://goo.gl/maps/Schaffhausen"
    }
];

/**
 * Displays a list of company locations with contact details (Map, Phone, Email).
 * Used on the Contact page and potentially others.
 */
export function ContactLocationsBlock({ title, locations }: { title: string, locations?: any[] }) {
    const displayLocations = (locations && locations.length > 0) ? locations : defaultLocations;

    return (
        <section className="py-10 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold uppercase text-slate-900 mb-8 md:mb-12 text-left tracking-tight">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayLocations.map((loc, index) => (
                        <div key={index} className="bg-gray-50 p-8 rounded-sm hover:shadow-lg transition-shadow border-t-4 border-brand-red">
                            <h3 className="text-xl font-bold uppercase text-slate-900 mb-4">{loc.name}</h3>
                            <div className="space-y-4 text-slate-600">
                                <p className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-brand-red shrink-0" />
                                    <span>{loc.address}</span>
                                </p>
                                <p className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-brand-red shrink-0" />
                                    <a href={`tel:${loc.phone}`} className="hover:text-brand-red transition-colors">{loc.phone}</a>
                                </p>
                                <p className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-brand-red shrink-0" />
                                    <a href={`mailto:${loc.email}`} className="hover:text-brand-red transition-colors">{loc.email}</a>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
