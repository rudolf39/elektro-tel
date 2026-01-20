"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

/**
 * AnimatedSection - Wrapper for async server components that adds scroll animations
 */
export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * AnimatedGrid - Stagger animation wrapper for grid children
 */
interface AnimatedGridProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function AnimatedGrid({ children, className = "", staggerDelay = 0.1 }: AnimatedGridProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * AnimatedGridItem - Child item for AnimatedGrid
 */
interface AnimatedGridItemProps {
    children: ReactNode;
    className?: string;
}

export function AnimatedGridItem({ children, className = "" }: AnimatedGridItemProps) {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
}

/**
 * FadeIn - Simple fade in animation wrapper
 */
interface FadeInProps {
    children: ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right" | "none";
    delay?: number;
    duration?: number;
}

export function FadeIn({
    children,
    className = "",
    direction = "up",
    delay = 0,
    duration = 0.5
}: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const directionOffset = {
        up: { y: 30 },
        down: { y: -30 },
        left: { x: -30 },
        right: { x: 30 },
        none: {}
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...directionOffset[direction] }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
