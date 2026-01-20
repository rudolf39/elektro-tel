"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

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
 * AboutBlock Component with Framer Motion Animations
 */
export function AboutBlock({ title, body, image }: AboutProps) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const textVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 30, scale: 0.95 },
        visible: { opacity: 1, x: 0, scale: 1 }
    };

    return (
        <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold uppercase text-slate-900 mb-4 sm:mb-5 md:mb-6 tracking-tight relative pb-3 sm:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 sm:after:w-16 after:h-1 after:bg-brand-red">
                        {title}
                    </h2>
                    <div className="prose prose-sm sm:prose-base md:prose-lg text-slate-600 leading-relaxed whitespace-pre-line max-w-none">
                        {body}
                    </div>
                </motion.div>

                <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative"
                >
                    <div className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden shadow-xl relative">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="hidden md:block absolute -bottom-4 -right-4 w-24 h-24 lg:w-32 lg:h-32 bg-brand-red/10 rounded-lg -z-10" />
                </motion.div>
            </div>
        </section>
    );
}
