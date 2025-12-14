import React from 'react';
import { motion } from 'framer-motion';

/**
 * PROF51 ICON - 8-bit COOLASFUCK
 * Graduation cap with "51" badge
 * For student co-manager tool
 */

export const Prof51Icon8Bit = ({ className = "", size = 64, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 64 64"
            className={className}
            animate={animate ? {
                y: [0, -4, 0],
                rotate: [0, 2, 0, -2, 0]
            } : {}}
            transition={animate ? {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
            style={{ imageRendering: 'pixelated' }}
        >
            {/* Graduation cap base (board) */}
            <rect x="8" y="28" width="48" height="4" fill="#06b6d4"/>
            <rect x="6" y="32" width="52" height="2" fill="#0891b2"/>
            
            {/* Cap top (mortarboard) */}
            <rect x="12" y="20" width="40" height="8" fill="#0ea5e9"/>
            <rect x="14" y="18" width="36" height="2" fill="#38bdf8"/>
            
            {/* Cap body (fez part) */}
            <rect x="20" y="34" width="24" height="12" fill="#0891b2"/>
            <rect x="22" y="34" width="20" height="2" fill="#06b6d4"/>
            
            {/* Tassel */}
            <rect x="50" y="22" width="4" height="4" fill="#fbbf24"/>
            <rect x="52" y="26" width="2" height="8" fill="#f59e0b"/>
            <rect x="50" y="34" width="6" height="2" fill="#fbbf24"/>
            <rect x="48" y="36" width="10" height="2" fill="#fbbf24"/>
            <rect x="46" y="38" width="14" height="2" fill="#f59e0b"/>
            
            {/* "51" BADGE - 8-bit style on cap */}
            <rect x="22" y="36" width="20" height="10" fill="#10b981"/>
            <rect x="24" y="38" width="16" height="6" fill="#059669"/>
            
            {/* "51" text in 8-bit */}
            {/* 5 */}
            <rect x="26" y="39" width="2" height="1" fill="#ffffff"/>
            <rect x="26" y="40" width="2" height="1" fill="#ffffff"/>
            <rect x="28" y="40" width="2" height="1" fill="#ffffff"/>
            <rect x="28" y="41" width="2" height="1" fill="#ffffff"/>
            <rect x="26" y="42" width="2" height="1" fill="#ffffff"/>
            
            {/* 1 */}
            <rect x="32" y="39" width="2" height="1" fill="#ffffff"/>
            <rect x="33" y="39" width="2" height="4" fill="#ffffff"/>
            <rect x="32" y="42" width="4" height="1" fill="#ffffff"/>
            
            {/* Brain circuits (AI intelligence) */}
            <rect x="14" y="24" width="2" height="2" fill="#ec4899" opacity="0.8"/>
            <rect x="18" y="24" width="2" height="2" fill="#ec4899" opacity="0.8"/>
            <rect x="44" y="24" width="2" height="2" fill="#ec4899" opacity="0.8"/>
            <rect x="48" y="24" width="2" height="2" fill="#ec4899" opacity="0.8"/>
            
            {/* Shine effect */}
            <rect x="16" y="22" width="2" height="2" fill="#38bdf8" opacity="0.6"/>
            <rect x="30" y="22" width="2" height="2" fill="#38bdf8" opacity="0.6"/>
            <rect x="44" y="22" width="2" height="2" fill="#38bdf8" opacity="0.6"/>
        </Component>
    );
};

export default Prof51Icon8Bit;