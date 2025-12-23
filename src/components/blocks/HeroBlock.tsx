import { RedContactBar } from "@/components/RedContactBar";

/**
 * Props for the HeroBlock component.
 */
interface HeroBlockProps {
    /** Main headline text */
    title: string;
    /** Subheadline text appearing below the title */
    subtitle: string;
    /** URL path to the background image */
    image: string;
}

import Image from "next/image";

// ... existing imports

/**
 * HeroBlock Component
// ...
 */
export function HeroBlock({ title, subtitle, image }: HeroBlockProps) {
    return (
        <section className="relative w-full overflow-hidden">
            <div className="relative h-[85vh] min-h-[500px] w-full bg-slate-900 overflow-hidden">
                {/* Responsive Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority
                        className="object-cover"
                        style={{ objectPosition: 'center 20%' }}
                        sizes="100vw"
                    />
                </div>
                {/* Gradient Overlay - Lighter as requested */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white pt-24 md:pt-20">
                    <p className="text-xs md:text-xl font-medium tracking-[0.1em] md:tracking-[0.2em] mb-4 md:mb-6 opacity-90 uppercase">
                        Winterthur | Tägerwilen | Schaffhausen
                    </p>
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl leading-[1.2] md:leading-[1.1] drop-shadow-lg">
                        {title}
                    </h1>
                    <p className="text-brand-red font-bold uppercase tracking-widest mt-4 md:mt-8 text-base md:text-2xl drop-shadow-md">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Red Contact Bar - Overlapping */}
            <RedContactBar />
        </section>
    );
}
