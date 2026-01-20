"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * Animation variants for common scroll-triggered animations
 */
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 }
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

/**
 * Props for MotionWrapper component
 */
interface MotionWrapperProps {
    children: ReactNode;
    variants?: Variants;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
    amount?: number;
}

/**
 * MotionWrapper - Scroll-triggered animation wrapper
 * Triggers animation when element comes into view
 */
export function MotionWrapper({
    children,
    variants = fadeInUp,
    delay = 0,
    duration = 0.6,
    className = "",
    once = true,
    amount = 0.2
}: MotionWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{
                duration,
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
 * MotionContainer - For stagger animations on child elements
 */
interface MotionContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    once?: boolean;
}

export function MotionContainer({
    children,
    className = "",
    staggerDelay = 0.1,
    once = true
}: MotionContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.1
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * MotionItem - For items inside MotionContainer
 */
interface MotionItemProps {
    children: ReactNode;
    variants?: Variants;
    className?: string;
}

export function MotionItem({
    children,
    variants = fadeInUp,
    className = ""
}: MotionItemProps) {
    return (
        <motion.div
            variants={variants}
            transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * MotionText - For animating text elements
 */
interface MotionTextProps {
    children: ReactNode;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    className?: string;
    delay?: number;
}

export function MotionText({
    children,
    as = "p",
    className = "",
    delay = 0
}: MotionTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const Component = motion[as];

    return (
        <Component
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </Component>
    );
}
