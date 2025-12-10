import React from 'react';
import { motion } from 'framer-motion';

/**
 * KINGDOM CROWN - 8-bit COOLASFUCK style
 * For Scott's Kingdom MGMT branding
 */

export const KingdomCrown8Bit = ({ className = "", size = 32, animate = true }) => {
    const Component = animate ? motion.svg : 'svg';
    
    return (
        <Component
            width={size}
            height={size}
            viewBox="0 0 32 32"
            className={className}
            animate={animate ? {
                y: [0, -3, 0],
                rotate: [0, 2, 0, -2, 0]
            } : {}}
            transition={animate ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
        >
            {/* 8-bit crown - gold/amber */}
            {/* Base */}
            <rect x="4" y="24" width="24" height="4" fill="#f59e0b"/>
            <rect x="6" y="28" width="20" height="2" fill="#d97706"/>
            
            {/* Crown body */}
            <rect x="6" y="20" width="20" height="4" fill="#fbbf24"/>
            
            {/* Left tower */}
            <rect x="6" y="12" width="4" height="8" fill="#f59e0b"/>
            <rect x="6" y="8" width="4" height="4" fill="#fbbf24"/>
            <rect x="8" y="6" width="2" height="2" fill="#fef3c7"/>
            
            {/* Center tower (tallest) */}
            <rect x="14" y="8" width="4" height="12" fill="#f59e0b"/>
            <rect x="14" y="4" width="4" height="4" fill="#fbbf24"/>
            <rect x="16" y="2" width="2" height="2" fill="#fef3c7"/>
            
            {/* Right tower */}
            <rect x="22" y="12" width="4" height="8" fill="#f59e0b"/>
            <rect x="22" y="8" width="4" height="4" fill="#fbbf24"/>
            <rect x="22" y="6" width="2" height="2" fill="#fef3c7"/>
            
            {/* Jewels */}
            <rect x="8" y="22" width="2" height="2" fill="#ec4899"/>
            <rect x="15" y="22" width="2" height="2" fill="#06b6d4"/>
            <rect x="22" y="22" width="2" height="2" fill="#10b981"/>
            
            {/* Shine effect */}
            <rect x="10" y="14" width="2" height="2" fill="#fef3c7" opacity="0.8"/>
            <rect x="16" y="10" width="2" height="2" fill="#fef3c7" opacity="0.8"/>
            <rect x="20" y="14" width="2" height="2" fill="#fef3c7" opacity="0.8"/>
        </Component>
    );
};

export default KingdomCrown8Bit;