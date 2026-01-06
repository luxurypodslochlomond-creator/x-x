import React from 'react';
import { motion } from 'framer-motion';

/**
 * CB51 CUSTOM 8-BIT ICON - COOLASFUCK STYLE
 * Citizen Band 51 • Zero stress • Unique identity
 */

export default function CB51Icon8Bit({ size = 32, animate = false }) {
    const Icon = (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 32 32" 
            fill="none"
            style={{ imageRendering: 'pixelated' }}
        >
            {/* CB51 Radio tower with waves */}
            
            {/* Base */}
            <rect x="14" y="26" width="4" height="4" fill="#06b6d4"/>
            <rect x="12" y="24" width="8" height="2" fill="#06b6d4"/>
            
            {/* Tower body */}
            <rect x="14" y="12" width="4" height="12" fill="#22d3ee"/>
            <rect x="12" y="14" width="2" height="8" fill="#06b6d4"/>
            <rect x="18" y="14" width="2" height="8" fill="#06b6d4"/>
            
            {/* Top antenna */}
            <rect x="14" y="8" width="4" height="4" fill="#a855f7"/>
            <rect x="15" y="6" width="2" height="2" fill="#ec4899"/>
            <rect x="15" y="4" width="2" height="2" fill="#f0abfc"/>
            
            {/* Signal waves - left */}
            <rect x="8" y="10" width="2" height="2" fill="#22d3ee" opacity="0.8"/>
            <rect x="6" y="12" width="2" height="2" fill="#22d3ee" opacity="0.6"/>
            <rect x="4" y="14" width="2" height="2" fill="#22d3ee" opacity="0.4"/>
            
            {/* Signal waves - right */}
            <rect x="22" y="10" width="2" height="2" fill="#22d3ee" opacity="0.8"/>
            <rect x="24" y="12" width="2" height="2" fill="#22d3ee" opacity="0.6"/>
            <rect x="26" y="14" width="2" height="2" fill="#22d3ee" opacity="0.4"/>
            
            {/* CB51 text pixels */}
            <rect x="10" y="20" width="2" height="2" fill="#10b981"/>
            <rect x="12" y="18" width="2" height="2" fill="#10b981"/>
            <rect x="12" y="22" width="2" height="2" fill="#10b981"/>
            
            <rect x="18" y="18" width="2" height="2" fill="#ec4899"/>
            <rect x="18" y="20" width="2" height="2" fill="#ec4899"/>
            <rect x="18" y="22" width="2" height="2" fill="#ec4899"/>
            <rect x="20" y="20" width="2" height="2" fill="#ec4899"/>
        </svg>
    );

    if (animate) {
        return (
            <motion.div
                animate={{
                    y: [0, -4, 0],
                    rotate: [0, 2, 0, -2, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {Icon}
            </motion.div>
        );
    }

    return Icon;
}