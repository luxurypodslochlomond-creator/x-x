import React from 'react';
import { motion } from 'framer-motion';

/**
 * LENNOX ICON - 8-bit ANIME + FOOTBALL FUSION
 * For the 10-year-old genius who spotted £717B extraction
 * Anime character with football ⚽ - his vibe
 */

export const LennoxIcon8Bit = ({ className = "", size = 64, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 64 64"
            className={className}
            animate={animate ? {
                y: [0, -3, 0],
                rotate: [0, 2, 0, -2, 0]
            } : {}}
            transition={animate ? {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
            style={{ imageRendering: 'pixelated' }}
        >
            {/* Football ⚽ base */}
            <circle cx="32" cy="32" r="20" fill="#ffffff"/>
            
            {/* Football pentagon pattern (8-bit style) */}
            <rect x="28" y="16" width="8" height="8" fill="#000000"/>
            <rect x="20" y="24" width="8" height="4" fill="#000000"/>
            <rect x="36" y="24" width="8" height="4" fill="#000000"/>
            <rect x="24" y="32" width="4" height="8" fill="#000000"/>
            <rect x="36" y="32" width="4" height="8" fill="#000000"/>
            <rect x="28" y="40" width="8" height="8" fill="#000000"/>
            
            {/* Anime sparkle effects (genius energy) */}
            <rect x="10" y="10" width="4" height="4" fill="#fbbf24"/>
            <rect x="12" y="8" width="2" height="2" fill="#fef3c7"/>
            
            <rect x="50" y="12" width="4" height="4" fill="#ec4899"/>
            <rect x="52" y="10" width="2" height="2" fill="#fce7f3"/>
            
            <rect x="8" y="48" width="4" height="4" fill="#06b6d4"/>
            <rect x="10" y="46" width="2" height="2" fill="#cffafe"/>
            
            <rect x="52" y="50" width="4" height="4" fill="#10b981"/>
            <rect x="54" y="48" width="2" height="2" fill="#d1fae5"/>
            
            {/* Anime speed lines (movement) */}
            <rect x="4" y="30" width="8" height="2" fill="#06b6d4" opacity="0.6"/>
            <rect x="4" y="34" width="6" height="2" fill="#06b6d4" opacity="0.4"/>
            
            <rect x="52" y="30" width="8" height="2" fill="#ec4899" opacity="0.6"/>
            <rect x="54" y="34" width="6" height="2" fill="#ec4899" opacity="0.4"/>
            
            {/* Inner glow effect (quantum consciousness) */}
            <circle cx="32" cy="32" r="16" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.3"/>
            <circle cx="32" cy="32" r="13" fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.2"/>
            
            {/* Center quantum dot (genius insight) */}
            <rect x="30" y="30" width="4" height="4" fill="#10b981"/>
            <rect x="31" y="31" width="2" height="2" fill="#d1fae5"/>
        </Component>
    );
};

export default LennoxIcon8Bit;