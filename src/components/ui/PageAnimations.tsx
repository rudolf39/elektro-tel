"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageAnimationWrapperProps {
    children: ReactNode;
}

/**
 * PageAnimationWrapper - Wraps page content with entrance animations
 */
export function PageAnimationWrapper({ children }: PageAnimationWrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

interface AnimatedHeroProps {
    children: ReactNode;
    className?: string;
}

/**
 * AnimatedHero - Hero section with stagger animations
 */
export function AnimatedHero({ children, className = "" }: AnimatedHeroProps) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.section>
    );
}

interface AnimatedContentProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

/**
 * AnimatedContent - Content that fades in on scroll
 */
export function AnimatedContent({ children, className = "", delay = 0 }: AnimatedContentProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

/**
 * StaggerContainer - Container for stagger animations on children
 */
export function StaggerContainer({ children, className = "", staggerDelay = 0.1 }: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
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

interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

/**
 * StaggerItem - Child item for StaggerContainer
 */
export function StaggerItem({ children, className = "", id }: StaggerItemProps) {
    return (
        <motion.div
            id={id}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface AnimatedImageWrapperProps {
    children: ReactNode;
    className?: string;
}

/**
 * AnimatedImageWrapper - Client component for animating images (scale/fade)
 */
export function AnimatedImageWrapper({ children, className = "" }: AnimatedImageWrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={className}
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
                className="relative w-full h-full"
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
