import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COOLASFUCKHeart } from './COOLASFUCKIcon';

/**
 * OPTIMIZED IMAGE - FASTEST IMAGE LOADING ON EARTH
 * - Progressive loading
 * - Automatic fallbacks
 * - GPU accelerated
 * - Zero layout shift
 */
export default function OptimizedImage({ 
    src, 
    alt = "Image", 
    className = "",
    fallback = null,
    aspectRatio = "16/9",
    priority = false,
    ...props 
}) {
    const [status, setStatus] = useState('loading'); // loading, loaded, error
    const [imageSrc, setImageSrc] = useState(src);

    const handleLoad = () => {
        setStatus('loaded');
    };

    const handleError = () => {
        setStatus('error');
        // Try one more time with cache bust
        if (!imageSrc.includes('?retry')) {
            setImageSrc(`${src}?retry=${Date.now()}`);
        }
    };

    if (status === 'error') {
        return fallback || (
            <div 
                className={`w-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20 flex items-center justify-center ${className}`}
                style={{ aspectRatio }}
            >
                <COOLASFUCKHeart size={48} animate={true} />
            </div>
        );
    }

    return (
        <div className="relative" style={{ aspectRatio }}>
            {status === 'loading' && (
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-purple-900/10 animate-pulse"
                    style={{ aspectRatio }}
                />
            )}
            <motion.img
                src={imageSrc}
                alt={alt}
                className={className}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                onLoad={handleLoad}
                onError={handleError}
                initial={{ opacity: 0 }}
                animate={{ opacity: status === 'loaded' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    transform: 'translateZ(0)', // GPU acceleration
                    backfaceVisibility: 'hidden',
                }}
                {...props}
            />
        </div>
    );
}