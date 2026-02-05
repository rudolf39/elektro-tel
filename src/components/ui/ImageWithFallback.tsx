"use client";

import { useState, DetailedHTMLProps, ImgHTMLAttributes } from "react";

interface ImageWithFallbackProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    fallbackSrc?: string;
    hideOnError?: boolean;
}

export function ImageWithFallback({ src, fallbackSrc, hideOnError = true, alt, className, loading, decoding, ...props }: ImageWithFallbackProps) {
    const [error, setError] = useState(false);

    if (error && hideOnError && !fallbackSrc) {
        return null;
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={error && fallbackSrc ? fallbackSrc : src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            loading={loading ?? "lazy"}
            decoding={decoding ?? "async"}
            {...props}
        />
    );
}
