/**
 * Props for the AboutBlock component.
 */
interface AboutProps {
    title: string;
    /** Markdown string for the body text */
    body: string;
    /** URL to the image displayed alongside text */
    image: string;
}

/**
 * AboutBlock Component
 * 
 * A simple two-column layout with text on the left and an image on the right.
 * The title features a red underline styling characteristic of the brand.
 */
export function AboutBlock({ title, body, image }: AboutProps) {
    return (
        <section className="py-10 md:py-20 bg-white">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold uppercase text-slate-900 mb-6 tracking-tight relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-brand-red">
                        {title}
                    </h2>
                    <div className="prose prose-lg text-slate-600 leading-relaxed whitespace-pre-line">
                        {body}
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden shadow-xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image} alt={title} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
}
