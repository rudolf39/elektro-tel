import { getAllPartners } from "@/lib/cms";
import Link from "next/link";

export async function PartnerGridBlock({ title }: { title: string }) {
    const partners = getAllPartners();

    return (
        <section className="py-10 md:py-20 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4 text-center">
                <Link href="/partner" className="group block w-fit mx-auto mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase text-slate-900 tracking-tight group-hover:text-brand-red transition-colors">{title}</h2>
                </Link>

                <div className="flex flex-nowrap overflow-x-auto snap-x md:grid md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-auto md:px-0">
                    {partners.length > 0 ? partners.map((partner: any, i: number) => (
                        <Link
                            key={i}
                            href="/partner"
                            className="flex-none w-[160px] md:w-auto aspect-[3/2] bg-white rounded shadow-sm hover:shadow-md transition-all flex items-center justify-center p-4 group grayscale hover:grayscale-0 overflow-hidden snap-start border border-gray-100"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {partner.logo ? (
                                <img src={partner.logo} alt={partner.title} className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <span className="text-sm font-bold text-slate-300">{partner.title}</span>
                            )}
                        </Link>
                    )) : (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="aspect-[3/2] bg-white rounded border border-gray-100 flex items-center justify-center text-slate-300 text-xs">
                                Partner Logoplaceholder
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
