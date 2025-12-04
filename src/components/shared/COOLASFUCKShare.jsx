import React from 'react';
import { motion } from 'framer-motion';

/**
 * COOLASFUCK SHARE ICON
 * 8-bit style share/send icon
 * Warm colors, pixel aesthetic
 */

export const COOLASFUCKShare = ({ className = "", size = 24, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? {
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0]
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit paper airplane/share icon */}
            {/* Main body */}
            <rect x="4" y="4" width="2" height="2" fill="#06b6d4"/>
            <rect x="6" y="6" width="2" height="2" fill="#06b6d4"/>
            <rect x="8" y="8" width="2" height="2" fill="#0891b2"/>
            <rect x="10" y="10" width="2" height="2" fill="#0891b2"/>
            <rect x="12" y="12" width="2" height="2" fill="#0e7490"/>
            
            {/* Arrow point */}
            <rect x="14" y="10" width="2" height="2" fill="#f59e0b"/>
            <rect x="16" y="8" width="2" height="2" fill="#f59e0b"/>
            <rect x="18" y="6" width="2" height="2" fill="#fbbf24"/>
            <rect x="20" y="4" width="2" height="2" fill="#fbbf24"/>
            
            {/* Wings */}
            <rect x="6" y="10" width="2" height="2" fill="#06b6d4"/>
            <rect x="4" y="12" width="2" height="2" fill="#06b6d4"/>
            <rect x="10" y="6" width="2" height="2" fill="#06b6d4"/>
            <rect x="12" y="4" width="2" height="2" fill="#06b6d4"/>
            
            {/* Trail sparkles */}
            <rect x="2" y="8" width="2" height="2" fill="#fbbf24" opacity="0.6"/>
            <rect x="8" y="2" width="2" height="2" fill="#fbbf24" opacity="0.6"/>
        </Component>
    );
};

export default COOLASFUCKShare;