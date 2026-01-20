/**
 * Displays key company statistics (Years of experience, project count, etc.).
 * Typically placed below the Hero section.
 */
export function TrustIndicatorsBlock() {
    const stats = [
        { value: "seit 1968", label: "Tradition" },
        { value: "50+", label: "Jahre Erfahrung" },
        { value: "1000+", label: "Kunden" },
        { value: "1000+", label: "Projekte" },
    ];

    return (
        <section className="py-12 bg-gray-50 border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, i) => (
                        <div key={i}>
                            <p className="text-3xl font-bold text-brand-red uppercase tracking-tight">{stat.value}</p>
                            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
